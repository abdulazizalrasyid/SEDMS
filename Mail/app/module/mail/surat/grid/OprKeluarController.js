Ext.define('Docs.view.surat.grid.OprKeluarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.surat-grid-oprkeluar',
    render:function(){
        makeInterval = setInterval(function(){
            me.getView().getStore().reload();    
        },60000);
    },
    afterrender:function(){
        var me =this;

    },
    activate:function(){
        me=this;
        me.getView().getStore().reload();
        me.lookupReference('paging_suratkeluar').setStore(me.getView().getStore());
        me.lookupReference('searchkeluar').setStore(me.getView().getStore());
    },
    init:function(){
    	var me=this;
        me.getViewModel().set('id_pengguna',Mail.LoggedInUser.data.id);
    },
    onItemClick:function(self, record, item, index, e, eOpts ){
    	var me = this;
    	if (me.getView().getSelectionModel().getSelection().length >0)
        {
            me.lookupReference('btRead').setVisible(true);
        } else {
            me.lookupReference('btRead').setVisible(false);
        }

        /*var view = me.getView();
        Ext.tip.QuickTipManager.register({
            target: view.getEl(), // Target button's ID
            title : 'Riwayat',  // QuickTip Header
            text  : 'My Button has a QuickTip' // Tip content  
        });*/

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
        win = Ext.create('Docs.view.surat.window.OprKeluar');
        form = win.down('#form_surat').getForm();
        tab = win.down('tabpanel');
        tab.setActiveItem(activeTab);

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
