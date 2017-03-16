Ext.define('Docs.view.disposisi.grid.KeluarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.disposisi-grid-keluar',
    render:function(){
        makeInterval = setInterval(function(){
            me.getView().getStore().reload();    
        },60000);
    },
    onBeforeActivate:function(){
        me=this;
        me.getView().getStore().reload();
        me.lookupReference('searchfield').setStore(me.getView().getStore());
        me.lookupReference('searchfield').setStore(me.getView().getStore());
        //me.lookupReference('paging_suratkeluar').setStore(me.getView().getStore());
    },
    deactivate:function(){
        console.log('deactivate');
    },
    init:function(){
    	me=this;
        me.getViewModel().set('id_penguna',Mail.LoggedInUser.data.id);
        me.getViewModel().set('id_jabatan',Mail.LoggedInUser.data.id_jabatan);
    	//console.log('id_penguna',Mail.LoggedInUser.data.id);
    },
    onItemClick:function(self, record, item, index, e, eOpts ){
    	var me = this;
    	if (me.getView().getSelectionModel().getSelection().length >0)
        {
            me.lookupReference('btRead').setVisible(true);
            // me.lookupReference('btKomentar').setVisible(true);
            // me.lookupReference('btAgenda').setVisible(true);
        } else {
            me.lookupReference('btRead').setVisible(false);
            // me.lookupReference('btKomentar').setVisible(false);
            // me.lookupReference('btAgenda').setVisible(false);
        }
        //me.getViewModel().set('id_surat',record.data.id);
    },
    onItemDblClick:function(self, record, item, index, e, eOpts ){
    	me = this;
        me.openOutmailView2(record,0);
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
            // me.lookupReference('btKomentar').setVisible(true);
            // me.lookupReference('btAgenda').setVisible(true);
        } else {
            me.lookupReference('btRead').setVisible(false);
            // me.lookupReference('btKomentar').setVisible(false);
            //me.lookupReference('btDisposisi').setVisible(false);
            //me.lookupReference('btDownload').setVisible(false);
            // me.lookupReference('btAgenda').setVisible(false);
        }
    },
    openOutmailView2:function(selectedRecord,activeTab){
        var me = this;
        //console.log(selectedRecord);
        var win = Ext.create('Docs.view.disposisi.window.Keluar');
        form = win.down('#form_disposisi').getForm();
        tab = win.down('tabpanel');
        tab.setActiveItem(activeTab);
        //console.log(selectedRecord);

        form.loadRecord(selectedRecord);
        //console.log(win);
        win.show();
    },
    onBtReadClick:function(self, e, eOpts){
        var me=this;
        var selectedData = me.getView().getSelectionModel().getSelection();
        me.openOutmailView2(selectedData[0],0);
    },
    onBtKomentarClick:function(){
         var me=this;
        var selectedData = me.getView().getSelectionModel().getSelection();
        me.openOutmailView2(selectedData[0],1);
    },
    onBtAgendaClick:function(){
        var me=this;
        var selectedData = me.getView().getSelectionModel().getSelection();
        me.openOutmailView2(selectedData[0],2);
    },  
    onBtPrintPengantarClick:function(){
        console.log('print pengantar');
    },
    onBtPrintClick:function(){
        console.log('print')
    }
    
});
