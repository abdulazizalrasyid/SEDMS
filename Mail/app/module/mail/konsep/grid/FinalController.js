Ext.define('Docs.view.konsep.grid.FinalController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.konsep-grid-final',
    init:function(){
    	me=this;
        me.getViewModel().set('id_jabatan',Mail.LoggedInUser.data.id_jabatan);
    	me.getViewModel().set('id_penguna',Mail.LoggedInUser.data.id);
        //console.log('id_penguna',Mail.LoggedInUser.data);
    },
    render:function(){
        me = this;
        makeInterval = setInterval(function(){
            me.getView().getStore().reload();    
        },60000);
    },
    onBeforeActivate:function(){
        me=this;
        me.getView().getStore().reload();
        me.lookupReference('paging_final').setStore(me.getView().getStore());
        me.lookupReference('searchfield').setStore(me.getView().getStore());
    },
    onItemClick:function(self, record, item, index, e, eOpts ){
    	var me = this;
    	if (me.getView().getSelectionModel().getSelection().length >0)
        {
            me.lookupReference('btRead').setVisible(true);
        } else {
            me.lookupReference('btRead').setVisible(false);
        }
        //me.getViewModel().set('id_surat',record.data.id);
    },
    onItemDblClick:function(self, record, item, index, e, eOpts ){
    	me = this;
        me.openInmailView(record,0);
    },
    onItemContextMenu:function(self, record, item, index, e, eOpts ){
    	console.log('test item contex menu '+record.data.pengirim);
    	var me = this;
		e.stopEvent();
    },
    onContainerClick:function(self, e, eOpts){
		var me = this;
    	if (me.getView().getSelectionModel().getSelection().length >0)
        {
            me.lookupReference('btRead').setVisible(true);
        } else {
            me.lookupReference('btRead').setVisible(false);
        }
    },
    openInmailView:function(selectedRecord,activeTab){
        var me = this;
        //console.log(selectedRecord);
        win = Ext.create('Docs.view.konsep.window.Final');
        form = win.down('#draft').getForm();
        //console.log(selectedRecord);
        form.loadRecord(selectedRecord);
        
        win.show();
    },
    onBtReadClick:function(self, e, eOpts){
        var me=this;
        var selectedData = me.getView().getSelectionModel().getSelection();
        me.openInmailView(selectedData[0],0);
    },
    onBtPrintClick:function(){
        console.log('print')
    }
    
});
