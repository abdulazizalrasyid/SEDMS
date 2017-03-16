Ext.define('Docs.view.nodin.TabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.nodin-tab',
    render:function(){
    	var me = this;
    	if (Mail.LoggedInUser.data.type == 'operator'){
    		me.getView().add({xtype:'nodin.grid.Baru'});
    		me.getView().add({xtype:'nodin.grid.Masuk'});
            me.getView().add({xtype:'nodin.grid.Keluar'});
    		me.getView().add({xtype:'nodin.grid.Verifikasi'});
    		me.getView().add({xtype:'nodin.grid.Unclassified'});
    	}else{
    		me.getView().add({xtype:'nodin.grid.Baru'});
    		me.getView().add({xtype:'nodin.grid.Masuk'});
            me.getView().add({xtype:'nodin.grid.Keluar'});
    		me.getView().add({xtype:'nodin.grid.Verifikasi'});
    	}
        me.getView().setActiveItem(0);
    }
    
});
