Ext.define('Docs.view.nodin.grid.monitor.MasukController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.nodin-grid-monitor-masuk',
    render:function(){
        me = this;
        makeInterval = setInterval(function(){
            me.getView().getStore().reload();    
        },60000);
    },
    activate:function(){
        me=this;
        me.getView().getStore().reload();
        //me.lookupReference('pagingnodinmasuk').setStore(me.getView().getStore());
        me.lookupReference('searchfield').setStore(me.getView().getStore());
    },
    init:function(){
    	me=this;
        me.getViewModel().set('id_jabatan',Mail.LoggedInUser.data.id_atasan);
    	//console.log('id_penguna',Mail.LoggedInUser.data);
    },
    onItemClick:function(self, record, item, index, e, eOpts ){
    	var me = this;
    	if (me.getView().getSelectionModel().getSelection().length >0)
        {
            me.lookupReference('btRead').setVisible(true);
            //me.lookupReference('btKomentar').setVisible(true);
            //me.lookupReference('btDisposisi').setVisible(true);
            //me.lookupReference('btDownload').setVisible(true);
            //me.lookupReference('btAgenda').setVisible(true);
        } else {
            me.lookupReference('btRead').setVisible(false);
            //me.lookupReference('btKomentar').setVisible(false);
            //me.lookupReference('btDisposisi').setVisible(false);
            //me.lookupReference('btDownload').setVisible(false);
            //me.lookupReference('btAgenda').setVisible(false);
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
            //me.lookupReference('btKomentar').setVisible(true);
            //me.lookupReference('btDisposisi').setVisible(true);
            //me.lookupReference('btDownload').setVisible(true);
            //me.lookupReference('btAgenda').setVisible(true);
        } else {
            me.lookupReference('btRead').setVisible(false);
            //me.lookupReference('btKomentar').setVisible(false);
            //me.lookupReference('btDisposisi').setVisible(false);
            //me.lookupReference('btDownload').setVisible(false);
            //me.lookupReference('btAgenda').setVisible(false);
        }
    },
    openInmailView:function(selectedRecord,activeTab){
       var me = this;
        console.log(selectedRecord);
        var win = Ext.create('Docs.view.nodin.window.MasukAtasan');
        form = win.down('#form_nodin').getForm();
        
        form.loadRecord(selectedRecord);
        //console.log(win);
        win.show();
    },
    onBtReadClick:function(self, e, eOpts){
        var me=this;
        var selectedData = me.getView().getSelectionModel().getSelection();
        me.openInmailView(selectedData[0],0);
    }
    
});
