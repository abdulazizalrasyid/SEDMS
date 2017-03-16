Ext.define('Docs.view.arsip.grid.RelasiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.arsip-grid-relasi',
    onItemClick:function(self, record, item, index, e, eOpts){
        //console.log('clicked');
    },
    onItemDblClick:function(self, record, item, index, e, eOpts ){
    	var me =this;
    	me.openEditWindow(record);
    },
    onBeforeActivate:function(){
        var me=this;
        me.lookupReference('searchfield').setStore(me.getView().getStore());
    },
    onItemContextMenu:function(self, record, item, index, e, eOpts){

    },
    onContainerClick:function(self, e, eOpts){

    },
    openEditWindow:function(selectedRecord){
    	//console.log(selectedRecord);
    	var me = this;

        var win = Ext.create('Docs.view.arsip.window.Relasi');
        form = win.down('#form_relasi').getForm();
        //tab = win.down('tabpanel');
        //tab.setActiveItem(activeTab);
        //console.log(selectedRecord);

        form.loadRecord(selectedRecord);
        //console.log(win);
        win.show();
    }
    
});
