Ext.define('Portal.view.login.ChpasswdController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login-chpasswd',
    onOldPwdEnter:function(field, e){

    	if (e.getKey() == e.ENTER) {
            this.lookupReference('newpass').focus();
        }
    },
    onNewPwdEnter:function(field, e){
    	if (e.getKey() == e.ENTER) {
            this.lookupReference('newpass2').focus();
        }
    },
    onNewPwd2Enter:function(field, e){
    	if (e.getKey() == e.ENTER) {
            this.lookupReference('simpan').focus();
        }
    },
    onClickSimpan:function(){
    	var me=this,
		form = me.getView().down('form').getForm(),
		values = form.getValues(),
		win = me.getView();

		if( Ext.isEmpty( values.oldpass ) || Ext.isEmpty( values.newpass ) || Ext.isEmpty( values.newpass2 ) ) {
			Ext.Msg.alert( 'Perhatian', 'Lengkapi form yang tersedia' );
			return false;
		}

		if( values.newpass != values.newpass2 ) {
			Ext.Msg.alert( 'Perhatian', 'Password baru tidak sama' );
			return false;
		}

		Ext.Ajax.request({
			url: serverURL+'login/chpassword',
			method:'post',
			params: {
				oldpass: Mail.crypto.SHA1.hash( values.oldpass ),
				newpass: Mail.crypto.SHA1.hash( values.newpass ),
				newpass2: Mail.crypto.SHA1.hash( values.newpass2 )
			},
			success: function( response, options ) {
				var result = Ext.decode( response.responseText );
				if( result.success == true ) {
			        win.close();
				}else{
					form.reset();
					Ext.Msg.alert( 'Perhatian', '<strong>Ganti password gagal</strong><br />ulangi proses login kembali atau kontak admin' );
				}
			},
			failure: function( response, options ) {
			Ext.Msg.alert( 'Perhatian', 'Error terjadi pada request ini' );
			}
		});
    }
    
});
