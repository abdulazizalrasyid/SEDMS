Ext.define('Docs.view.disposisi.TabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.disposisi-tab',
    render:function(){
    	var me = this;
    	 if (Mail.LoggedInUser.data.kode_jabatan == 'K.LSN') {
    	 	me.getView().add({xtype:'disposisi.grid.Keluar',title:'Disposisi'});
    	 }else if(Mail.LoggedInUser.data.type == 'staf' || Mail.LoggedInUser.data.type == 'operator'){
            me.getView().add({xtype:'disposisi.grid.Masuk'});
         } else{
			me.getView().add({xtype:'disposisi.grid.Masuk'});
    	 	me.getView().add({xtype:'disposisi.grid.Keluar'});
    	 }
    }
    
});
