Ext.define('Docs.view.surat.grid.monitor.MasukController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.surat-grid-monitor-masuk',
    render:function(){
        me = this;
        makeInterval = setInterval(function(){
            me.getView().getStore().reload();    
        },60000);
    },
    activate:function(){
        me=this;
        me.getViewModel().getStore('daftar_suratmasuk').reload();
        me.lookupReference('searchfield').setStore(me.getView().getStore());
    },
    init:function(){
    	me=this;
        me.getViewModel().set('id_jabatan',Mail.LoggedInUser.data.id_atasan);
    },
    onItemClick:function(self, record, item, index, e, eOpts ){
    	var me = this;
    	if (me.getView().getSelectionModel().getSelection().length >0)
        {
            me.lookupReference('btRead').setVisible(true);
        } else {
            me.lookupReference('btRead').setVisible(false);
        }
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
        win = Ext.create('Docs.view.surat.window.MasukAtasan');
        form = win.down('#form_surat').getForm();
        tab = win.down('tabpanel');
        tab.setActiveItem(activeTab);
        
        //console.log(selectedRecord);
        form.loadRecord(selectedRecord);
        win.show();
    },
    onBtReadClick:function(self, e, eOpts){
        var me=this;
        var selectedData = me.getView().getSelectionModel().getSelection();
        me.openInmailView(selectedData[0],0);
    },
    onBtPrintPengantarClick:function(){
        console.log('print pengantar');
    },
    onBtPrintClick:function(){
        console.log('print')
    }
    
});
