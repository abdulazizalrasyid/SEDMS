Ext.define('Docs.view.arsip.grid.JraController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.arsip-grid-jra',
    onItemClick:function(self, record, item, index, e, eOpts){
        //console.log('clicked');
    },
    onItemDblClick:function(self, record, item, index, e, eOpts ){
    	var me =this;
    	me.openEditWindow(record);
    },
    onItemContextMenu:function(self, record, item, index, e, eOpts){

    },
    onContainerClick:function(self, e, eOpts){

    },
    openEditWindow:function(selectedRecord){
    	//console.log(selectedRecord);
    	var me = this;

        var win = Ext.create('Docs.view.arsip.window.Jra');
        form = win.down('#form_jra').getForm();
        //tab = win.down('tabpanel');
        //tab.setActiveItem(activeTab);
        //console.log(selectedRecord);

        form.loadRecord(selectedRecord);
        //console.log(win);
        win.show();
    },
    openAddWindow:function(){
        var me = this;
        var win = Ext.create('Docs.view.arsip.window.Jra');
        form = win.down('#form_jra').getForm();
        win.show();
    }
    
});
