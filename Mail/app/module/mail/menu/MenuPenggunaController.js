Ext.define('Docs.view.menu.MenuPenggunaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menu-menupengguna',
    init:function(){
		//.getViewModel().set('id_jabatan',Mail.LoggedInUser.data.id_jabatan);
		//this.refreshMenu();
        this.reloadMenu();

    },
	on_surat:function(){
		this.redirectTo('surat');
	},
	on_notadinas:function(){
		this.redirectTo('notadinas');
	},
	on_draft:function(){
		this.redirectTo('draft');
	},
	on_disposisi:function(){
		this.redirectTo('disposisi');
	},
    reloadMenu:function(){
        me=this;
        me.getView().removeAll();
        Ext.Ajax.request({
            url: serverURL+'notifikasi/menu.json',
            method:'get',
            params:{
                id_jabatan:Mail.LoggedInUser.data.id_jabatan
            },
            success: function( response, options ) {
                var result = Ext.decode( response.responseText );
                Ext.Array.each(result, function (record, index, array) {
                    me.getView().add(record);
                });
            },
            failure: function( response, options ) {
                Ext.Msg.alert( 'Perhatian', 'Kesalahan terjadi pada request ini' );
            }
        });
    }
	/*refreshMenu:function(){
		me=this;
		Ext.Ajax.request({
            url: serverURL+'notifikasi/daftar.json',
            method:'get',
            params:{
            	id_jabatan:Mail.LoggedInUser.data.id_jabatan
            },
            success: function( response, options ) {
                var result = Ext.decode( response.responseText );
                //console.log(result);
                if (parseInt(result.data.total_surat_masuk)+parseInt(result.data.total_surat_verifikasi)==0) {
                	me.getViewModel().set('textMnSurat','');
                }else{
                	me.getViewModel().set('textMnSurat', '('+parseInt(parseInt(result.data.total_surat_masuk)+parseInt(result.data.total_surat_verifikasi))+')');
                }

                if (parseInt(result.data.total_nodin)==0){
					me.getViewModel().set('textMnNodin','');
                }else{
                	me.getViewModel().set('textMnNodin','('+parseInt(result.data.total_nodin)+'}');
                }
                
                if (parseInt(result.data.total_disposisi)==0){
					me.getViewModel().set('textMnDisposisi','');
                }else{
                	me.getViewModel().set('textMnDisposisi','('+parseInt(result.data.total_disposisi)+')');
                }
                

            },
            failure: function( response, options ) {
                Ext.Msg.alert( 'Perhatian', 'Kesalahan terjadi pada request ini' );
            }
        });
	}*/
});
