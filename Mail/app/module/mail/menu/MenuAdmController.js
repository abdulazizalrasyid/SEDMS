Ext.define('Docs.view.menu.MenuAdmController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menu-menuadm',
    on_pengguna:function(){
    	this.redirectTo('adminpengguna');
    },
    on_jabatan:function(){
    	this.redirectTo('adminjabatan');
    },
    on_jenis_disposisi:function(){
    	this.redirectTo('adminjdisposisi');
    },
    on_jenis_dokumen:function(){
		this.redirectTo('adminjdokumen');
    },
    on_klasifikasi_arsip:function(){
    	this.redirectTo('adminklasifikasiarsip');
    },
    on_log_pengguna:function(){
    	this.redirectTo('adminlogpengguna');
    },
    on_log_aktifitas:function(){
    	this.redirectTo('adminlogakrifitas');
    },
    on_reservasi_nomor:function(){
        this.redirectTo('adminreserve');
    },
    on_jra:function(){
        this.redirectTo('jra');
    },
    on_surat_operator:function(){
        this.redirectTo('suratopr');
    }
    
});
