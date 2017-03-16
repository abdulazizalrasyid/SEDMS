/**
 * Overrides.form.field.Tag
 */
Ext.define('Overrides.form.field.Tag', {
    override: 'Ext.form.field.Tag',


    initComponent: function() {
        var me = this,
            typeAhead = me.typeAhead,
            delimiter = me.delimiter;


        // <debug>
        if (typeAhead && !me.editable) {
            Ext.Error.raise('If typeAhead is enabled the combo must be editable: true -- please change one of those settings.');
        }
        // </debug>


        me.typeAhead = false;


        // Refresh happens upon select.
        me.listConfig = Ext.apply({
            refreshSelmodelOnRefresh: false
        }, me.listConfig);


        // Create the selModel before calling parent, we need it to be available
        // when we bind the store.
        me.selectionModel = new Ext.selection.Model({
            mode: 'MULTI',
            // OVERRIDE
            //lastFocused: null,
            onSelectChange: function(record, isSelected, suppressEvent, commitFn) {
                commitFn();
            }
        });


        me.callParent();


        me.typeAhead = typeAhead;


        if (delimiter && me.multiSelect) {
            me.delimiterRegexp = new RegExp(Ext.String.escapeRegex(delimiter));
        }
    },
    
    findRecord: function(field, value) {
        var store = this.store,
            matches;


        if (store) {
            matches = store.queryBy(function(rec) {
                return rec.isEqual(rec.get(field), value);
            });
        }


        // OVERRIDE
        return matches.length ? matches[0] : false;
    },
    
    setValue: function(value, doSelect, skipLoad) {
        var me = this,
            valueStore = me.valueStore,
            valueField = me.valueField,
            unknownValues = [],
            record, len, i, valueRecord, cls;


        if (Ext.isEmpty(value)) {
            value = null;
        }
        if (Ext.isString(value) && me.multiSelect) {
            value = value.split(me.delimiter);
        }
        value = Ext.Array.from(value, true);


        for (i = 0, len = value.length; i < len; i++) {
            record = value[i];
            if (!record || !record.isModel) {
                valueRecord = valueStore.findExact(valueField, record);
                if (valueRecord >= 0) {
                    value[i] = valueStore.getAt(valueRecord);
                } else {
                    valueRecord = me.findRecord(valueField, record);
                    // ADDED
                    var modelExists = false;
                    if (!valueRecord) {
                        if (me.forceSelection) {
                            unknownValues.push(record);
                        } else {
                            valueRecord = {};
                            valueRecord[me.valueField] = record;
                            valueRecord[me.displayField] = record;

                            cls = me.valueStore.getModel();
                            // OVERRIDE
                            if (cls) {
                                // ADDED
                                modelExists = true;
                                valueRecord = new cls(valueRecord);
                            }
                        }
                    }
                    // OVERRIDE
                    if (valueRecord && modelExists) {
                        value[i] = valueRecord;
                    }
                }
            }
        }

        if ((skipLoad !== true) && (unknownValues.length > 0) && (me.queryMode === 'remote')) {
            var params = {};
            params[me.valueParam || me.valueField] = unknownValues.join(me.delimiter);
            me.store.load({
                params: params,
                callback: function() {
                    if (me.itemList) {
                        me.itemList.unmask();
                    }
                    me.setValue(value, doSelect, true);
                    me.autoSize();
                    me.lastQuery = false;
                }
            });
            return false;
        }

        if (!me.multiSelect && (value.length > 0)) {
            for (i = value.length - 1; i >= 0; i--) {
                if (value[i].isModel) {
                    value = value[i];
                    break;
                }
            }
            if (Ext.isArray(value)) {
                value = value[value.length - 1];
            }
        }

        // OVERRIDE
        return me.callSuper([value, doSelect]);
    },
    
    onKeyDown: function(e) {
        var me = this,
            key = e.getKey(),
            inputEl = me.inputEl,
            rawValue = inputEl.dom.value,
            valueStore = me.valueStore,
            selModel = me.selectionModel,
            stopEvent = false,
            lastSelectionIndex;

        if (me.readOnly || me.disabled || !me.editable) {
            return;
        }

        if (me.isExpanded && key === e.A && e.ctrlKey) {
            
            me.select(me.getStore().getRange());
            // OVERRIDE
            // selModel.setLastFocused(null);
            selModel.deselectAll();
            me.collapse();
            inputEl.focus();
            stopEvent = true;
        }
        else if ((valueStore.getCount() > 0) &&
                ((rawValue === '') || ((me.getCursorPosition() === 0) && !me.hasSelectedText()))) {
            
            // OVERRIDE
            lastSelectionIndex = (selModel.getCount() > 0) ? valueStore.indexOf(selModel.getLastSelected()) : -1;


            
            if (key === e.BACKSPACE || key === e.DELETE) {
                if (lastSelectionIndex > -1) {
                    if (selModel.getCount() > 1) {
                        lastSelectionIndex = -1;
                    }
                    valueStore.remove(selModel.getSelection());
                } else {
                    valueStore.remove(valueStore.last());
                }
                selModel.clearSelections();
                me.setValue(valueStore.getRange());
                if (lastSelectionIndex > 0) {
                    selModel.select(lastSelectionIndex - 1);
                }
                stopEvent = true;
            }
            
            else if (key === e.RIGHT || key === e.LEFT) {
                if (lastSelectionIndex === -1 && key === e.LEFT) {
                    selModel.select(valueStore.last());
                    stopEvent = true;
                } else if (lastSelectionIndex > -1) {
                    if (key === e.RIGHT) {
                        if (lastSelectionIndex < (valueStore.getCount() - 1)) {
                            selModel.select(lastSelectionIndex + 1, e.shiftKey);
                            stopEvent = true;
                        } else if (!e.shiftKey) {
                            // OVERRIDE
                            // selModel.setLastFocused(null);
                            selModel.deselectAll();
                            stopEvent = true;
                        }
                    } else if (key === e.LEFT && (lastSelectionIndex > 0)) {
                        selModel.select(lastSelectionIndex - 1, e.shiftKey);
                        stopEvent = true;
                    }
                }
            }
            
            else if (key === e.A && e.ctrlKey) {
                selModel.selectAll();
                stopEvent = e.A;
            }
            inputEl.focus();
        }


        if (stopEvent) {
            me.preventKeyUpEvent = stopEvent;
            e.stopEvent();
            return;
        }


        
        if (me.isExpanded && key === e.ENTER && me.picker.highlightedItem) {
            me.preventKeyUpEvent = true;
        }


        if (me.enableKeyEvents) {
            me.callParent(arguments);
        }


        if (!e.isSpecialKey() && !e.hasModifier()) {
            // OVERRIDE
            // selModel.setLastFocused(null);
            selModel.deselectAll();
            inputEl.focus();
        }
    },
    
    onItemListClick: function(evt) {
        var me = this,
            selectionModel = me.selectionModel,
            itemEl = evt.getTarget('.' + Ext.baseCSSPrefix + 'tagfield-item'),
            closeEl = itemEl ? evt.getTarget('.' + Ext.baseCSSPrefix + 'tagfield-item-close') : false;


        if (me.readOnly || me.disabled) {
            return;
        }


        evt.stopPropagation();


        if (itemEl) {
            if (closeEl) {
                me.removeByListItemNode(itemEl);
                if (me.valueStore.getCount() > 0) {
                    me.fireEvent('select', me, me.valueStore.getRange());
                }
            } else {
                me.toggleSelectionByListItemNode(itemEl, evt.shiftKey);
            }
            // If not using touch interactions, focus the input
            if (!Ext.supports.TouchEvents) {
                me.inputEl.focus();
            }
        } else {
            if (selectionModel.getCount() > 0) {
                // OVERRIDE
                // selectionModel.setLastFocused(null);
                selectionModel.deselectAll();
            }
            if (me.triggerOnClick) {
                me.onTriggerClick();
            }
        }
    },
    
    toggleSelectionByListItemNode: function(itemEl, keepExisting) {
        var me = this,
            rec = me.getRecordByListItemNode(itemEl),
            selModel = me.selectionModel;


        if (rec) {
            if (selModel.isSelected(rec)) {
                // OVERRIDE
                // if (selModel.isFocused(rec)) {
                //     selModel.setLastFocused(null);
                // }
                selModel.deselect(rec);
            } else {
                selModel.select(rec, keepExisting);
            }
        }
    }
});