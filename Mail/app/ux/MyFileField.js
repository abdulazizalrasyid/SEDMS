Ext.define('Ux.MyFileField', {
    override: 'Ext.form.field.File',

    /**
     * @cfg {Object} fileInputAttributes
     * Extra attributes to add to the file input element.
     */
    fileInputAttributes: {
        accept: 'image/*,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword'
    },
    
    onRender: function() {
        var me = this,
            attr = me.fileInputAttributes,
            fileInputEl, name;

        me.callParent();
        fileInputEl = me.getTrigger('filebutton').component.fileInputEl.dom;
        for (name in attr) {
            fileInputEl.setAttribute(name, attr[name]);
        }
    }
});