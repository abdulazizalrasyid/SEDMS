Ext.define('Portal.view.admin.grid.JdisposisiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-grid-jdisposisi',
    onItemClick:function(self, record, item, index, e, eOpts){

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

        var win = Ext.create('Portal.view.admin.window.Jdisposisi');
        form = win.down('#form_disposisi').getForm();
        //tab = win.down('tabpanel');
        //tab.setActiveItem(activeTab);
        //console.log(selectedRecord);

        form.loadRecord(selectedRecord);
        //console.log(win);
        win.show();
    },
    openAddWindow:function(){
        var me = this;

        var win = Ext.create('Portal.view.admin.window.Jdisposisi');
        form = win.down('#form_disposisi').getForm();
        win.show();
    }
    
});
