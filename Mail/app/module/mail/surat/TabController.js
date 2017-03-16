Ext.define('Docs.view.surat.TabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.surat-tab',
    render:function(){
    	var me = this;
    	 if (Mail.LoggedInUser.data.kode_jabatan == 'K.LSN') {
    	 	me.getView().add({xtype:'surat.grid.Masuk'});
    	 	me.getView().add({xtype:'surat.grid.Keluar'});
    	 }else{
			me.getView().add({xtype:'surat.grid.Masuk'});
    	 	me.getView().add({xtype:'surat.grid.Keluar'});
    	 	me.getView().add({xtype:'surat.grid.Verifikasi'});
    	 }
    }
    
});
