Ext.define('Ux.MySearchField', {
    extend: 'Ext.form.field.Text',

    alias: 'widget.mysearchfield',

    triggers: {
        clear: {
            weight: 0,
            cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            hidden: true,
            handler: 'onClearClick',
            scope: 'this'
        },
        search: {
            weight: 1,
            cls: Ext.baseCSSPrefix + 'form-search-trigger',
            handler: 'onSearchClick',
            scope: 'this'
        }
    },

    hasSearch : false,
    paramName : 'query',

    initComponent: function() {
        var me = this,
            store=me.setStore(store),
            proxy;

        me.on('specialkey', function(f, e){
            if (e.getKey() == e.ENTER) {
                me.onSearchClick();
            }
        });
        
       
        me.callParent(arguments);
    },

    onClearClick : function(){
        var me = this;
        me.setValue('');
        me.getTrigger('clear').hide();
        me.updateLayout();
    },

    onSearchClick : function(){
        var me = this,
            value = me.getValue();

        if (value.length > 0) {
            me.getTrigger('clear').show();
            me.updateLayout();
        }
    },
    setStore:function(store){
        var me = this;
        me.store = store;
    }
});