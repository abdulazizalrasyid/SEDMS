Ext.define('Docs.view.menu.MenuOprController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menu-menuopr',
    init:function(){
        this.reloadMenu();
    },
    on_register_surat_masuk:function(){
		this.redirectTo('regsuratmasuk');
	},
	on_register_surat_keluar:function(){
		this.redirectTo('regsuratkeluar');
	},
	on_surat_operator:function(){
		this.redirectTo('suratopr');
	},
	on_laporan_operator:function(){
		this.redirectTo('laporanOpr');
	},
	on_disposisi:function(){
		this.redirectTo('disposisi');
	},
	/*on_surat_keluar_operator:function(){
		this.redirectTo('SuratKeluarOpr');
	},*/
	on_draft:function(){
		this.redirectTo('draft');
	},
	on_notadinas:function(){
		this.redirectTo('notadinas');
	},
	atasan_surat:function(){
		this.redirectTo('suratMntr');
	},
	atasan_nodin:function(){
		this.redirectTo('nodinMntr');
	},
	atasan_draft:function(){
		this.redirectTo('draftMntr');
	},
	atasan_disposisi:function(){
		this.redirectTo('disposisiMntr');
	},
    reloadMenu:function(){
        me=this;
        //me.getView().removeAll();
        /*me.lookupReference('menu_atasan').removeAll();
        Ext.Ajax.request({
            url: serverURL+'notifikasi/menu_atasan.json',
            method:'get',
            params:{
                id_atasan:Mail.LoggedInUser.data.id_atasan
            },
            success: function( response, options ) {
                var result = Ext.decode( response.responseText );
                Ext.Array.each(result, function (record, index, array) {
                    me.lookupReference('menu_atasan').add(record);
                });
            },
            failure: function( response, options ) {
                Ext.Msg.alert( 'Perhatian', 'Kesalahan terjadi pada request ini' );
            }
        });*/

        me.lookupReference('menu_pribadi').removeAll();
        Ext.Ajax.request({
            url: serverURL+'notifikasi/menu_operator.json',
            method:'get',
            params:{
                id_jabatan:Mail.LoggedInUser.data.id_jabatan
            },
            success: function( response, options ) {
                var result = Ext.decode( response.responseText );
                Ext.Array.each(result, function (record, index, array) {
                    me.lookupReference('menu_pribadi').add(record);
                });
            },
            failure: function( response, options ) {
                Ext.Msg.alert( 'Perhatian', 'Kesalahan terjadi pada request ini' );
            }
        });
    }
    
});
