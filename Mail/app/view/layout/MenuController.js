Ext.define('Mail.view.layout.MenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.layout-menu',
    init:function(){
    	me=this;
    	
    	if (Mail.LoggedInUser.data.type == 'pengguna'){
            me.getView().add({xtype:'menu.MenuPengguna',padding:'10 0 0 0'});
    	} else if(Mail.LoggedInUser.data.type == 'operator'){
            me.getView().add({xtype:'menu.MenuOpr',padding:'10 0 0 0'});
        } else if(Mail.LoggedInUser.data.type == 'staf'){
            me.getView().add({xtype:'menu.MenuStaf',padding:'10 0 0 0'});
        } else if(Mail.LoggedInUser.data.type == 'administrator'){
            me.getView().add({xtype:'menu.MenuAdm',padding:'10 0 0 0'});
            //me.getView().add({html:'test'});
        } else if(Mail.LoggedInUser.data.type == 'arsip'){
            me.getView().add({xtype:'menu.MenuArsip',padding:'10 0 0 0'});
            //me.getView().add({html:'test'});
    	}
    }
    
});
