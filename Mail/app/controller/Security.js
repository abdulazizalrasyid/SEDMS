Ext.define('Mail.controller.Security', {
    extend: 'Mail.controller.Base',
    requires:[
    	'Portal.view.login.Window',
    	'Portal.view.login.Chpasswd',
    	'Mail.crypto.SHA1',
    	'Mail.model.User',
    	'Mail.view.main.Main'
    ],
    refs: [
    	{
    		ref: 'Main',
			selector: '[xtype=app-main]'	
    	},
    	{
			ref: 'LoginWindow',
			selector: '[xtype=login.Window]'
		},
		{
			ref: 'Viewport',
			selector: '[xtype=app-main]'
		},
		{
            ref: 'GridVerifikasi',
            selector: '[xtype=surat.grid.Verifikasi]'
        },
        {
            ref: 'GridOprKeluar',
            selector: '[xtype=surat.grid.OprKeluar]'
        },
        {
            ref: 'GridOprMasuk',
            selector: '[xtype=surat.grid.OprMasuk]'
        },
        {
            ref: 'GridKeluar',
            selector: '[xtype=surat.grid.Keluar]'
        },
        {
            ref: 'GridMasuk',
            selector: '[xtype=surat.grid.Masuk]'
        },
        {
            ref: 'GridNodinVerifikasi',
            selector: '[xtype=nodin.grid.Verifikasi]'
        },
        {
            ref: 'GridNodiKlasifikasi',
            selector: '[xtype=nodin.grid.Unclassified]'
        },
        {
            ref: 'GridKonsepFinal',
            selector: '[xtype=konsep.grid.Final]'
        },
        {
            ref: 'GridKonsepMasuk',
            selector: '[xtype=konsep.grid.Masuk]'
        },
        {
            ref: 'GridJabatanAdmin',
            selector: '[xtype=admin.grid.Jabatan]'
        },
        {
            ref: 'GridDisposisiAdmin',
            selector: '[xtype=admin.grid.Jdisposisi]'
        },
        {
            ref: 'GridJdokumenAdmin',
            selector: '[xtype=admin.grid.Jdokumen]'
        },
        {
            ref: 'GridKarsipAdmin',
            selector: '[xtype=admin.grid.Karsip]'
        },
        {
            ref: 'GridPenggunaAdmin',
            selector: '[xtype=admin.grid.Pengguna]'
        },
        {
            ref: 'GridDisposisiMasuk',
            selector: '[xtype=disposisi.grid.Masuk]'
        },
        {
            ref: 'GridDisposisiKeluar',
            selector: '[xtype=disposisi.grid.Keluar]'
        },
        {
            ref: 'GridJra',
            selector: '[xtype=arsip.grid.Jra]'
        },
        {
            ref: 'GridRelasi',
            selector: '[xtype=arsip.grid.Relasi]'
        },
        {
            ref: 'GridUnarchived',
            selector: '[xtype=arsip.grid.Unarchived]'
        },
        {
            ref: 'GridArchived',
            selector: '[xtype=arsip.grid.Archived]'
        },
        {
            ref: 'MenuPengguna',
            selector: '[xtype=menu.MenuPengguna]'
        },
        {
            ref: 'MenuOpr',
            selector: '[xtype=menu.MenuOpr]  #menu_pribadi'
        },
        {
            ref: 'MenuAtasan',
            selector: '[xtype=menu.MenuOpr]  #menu_atasan'
        },
        {
            ref: 'GridArchivedDraft',
            selector: '[xtype=arsip.grid.ArchivedDraft]'
        },
        {
            ref: 'GridUnarchivedDraft',
            selector: '[xtype=arsip.grid.UnarchivedDraft]'
        }


	],
	init: function() {
		this.listen({
			component:{
				'[xtype=layout.North] #btLogout': {
					click: this.doLogout
				}
			},
			global: {
				refreshMenu: this.refreshMenu,
				refreshOprMenu: this.refreshOprMenu,
				processLogIn: this.processLogIn,
				afterValidateLoggedIn: this.setupApplication,
				showLogin:this.showLogin,
				doLogin:this.doLogin,
				doLogout:this.doLogout,
                refreshGridVerifikasi: this.refreshGridVerifikasi,
                refreshGridSuratMasuk: this.refreshGridSuratMasuk,
                refreshGridSuratKeluar: this.refreshGridSuratKeluar,
                refreshGridOprKeluar: this.refreshGridOprKeluar,
                refreshGridOprMasuk: this.refreshGridOprMasuk,
                refreshGridVerifikasinodin: this.refreshGridVerifikasinodin,
                refreshGridKlasifikasinodin:this.refreshGridKlasifikasinodin,
                refresGridKonsepFinal:this.refresGridKonsepFinal,
                refresGridKonsepMasuk:this.refresGridKonsepMasuk,
                refreshGridPengguna:this.refreshGridPengguna,
                refreshGridJabatan:this.refreshGridJabatan,
                refreshGridJdisposisi:this.refreshGridJdisposisi,
                refreshGridJdokumen:this.refreshGridJdokumen,
                refreshGridKlasifikasi:this.refreshGridKlasifikasi,
                refreshGridDisposisiMasuk:this.refreshGridDisposisiMasuk,
                refreshGridDisposisiKeluar:this.refreshGridDisposisiKeluar,
                refreshGridJra:this.refreshGridJra,
                refreshGridRelasi:this.refreshGridRelasi,
                refreshGridUnarchived:this.refreshGridUnarchived,
                refreshGridArchived:this.refreshGridArchived,
                refreshGridArchivedDraft:this.refreshGridArchivedDraft,
                refreshGridUnarchivedDraft:this.refreshGridUnarchivedDraft
			}
		});
	},
	refreshMenu:function(){
		me=this;
        me.getMenuPengguna().removeAll();
        Ext.Ajax.request({
            url: serverURL+'notifikasi/menu.json',
            method:'get',
            params:{
                id_jabatan:Mail.LoggedInUser.data.id_jabatan
            },
            success: function( response, options ) {
                var result = Ext.decode( response.responseText );
                Ext.Array.each(result, function (record, index, array) {
                    me.getMenuPengguna().add(record);
                });
            },
            failure: function( response, options ) {
                Ext.Msg.alert( 'Perhatian', 'Kesalahan terjadi pada request ini' );
            }
        });
	},

	refreshOprMenu:function(){
        me=this;
        //me.getView().removeAll();
        //me.lookupReference('menu_atasan').removeAll();
        //console.log(me.getMenuOpr());
        /*me.getMenuAtasan().removeAll();
        Ext.Ajax.request({
            url: serverURL+'notifikasi/menu_atasan.json',
            method:'get',
            params:{
                id_atasan:Mail.LoggedInUser.data.id_atasan
            },
            success: function( response, options ) {
                var result = Ext.decode( response.responseText );
                Ext.Array.each(result, function (record, index, array) {
                    me.getMenuAtasan().add(record);
                });
            },
            failure: function( response, options ) {
                Ext.Msg.alert( 'Perhatian', 'Kesalahan terjadi pada request ini' );
            }
        });*/

        //me.lookupReference('menu_pribadi').removeAll();
        me.getMenuOpr().removeAll();
        Ext.Ajax.request({
            url: serverURL+'notifikasi/menu_operator.json',
            method:'get',
            params:{
                id_jabatan:Mail.LoggedInUser.data.id_jabatan
            },
            success: function( response, options ) {
                var result = Ext.decode( response.responseText );
                Ext.Array.each(result, function (record, index, array) {
                    me.getMenuOpr().add(record);
                });
            },
            failure: function( response, options ) {
                Ext.Msg.alert( 'Perhatian', 'Kesalahan terjadi pada request ini' );
            }
        });
    },
    refreshGridArchived:function(){
        this.getGridArchived().getStore().reload();
    },
	refreshGridArchivedDraft:function(){
        this.getGridArchivedDraft().getStore().reload();
    },
    refreshGridUnarchivedDraft:function(){
		this.getGridUnarchivedDraft().getStore().reload();
	},
	refreshGridUnarchived:function(){
		this.getGridUnarchived().getStore().reload();
	},
	refreshGridRelasi:function(){
		this.getGridRelasi().getStore().reload();
	},
	refreshGridJra:function(){
		this.getGridJra().getStore().reload();
	},
	refreshGridDisposisiMasuk:function(){
		this.getGridDisposisiMasuk().getStore().reload();
	},
	refreshGridDisposisiKeluar:function(){
		this.getGridDisposisiKeluar().getStore().reload();
	},
	refreshGridPengguna:function(){
		this.getGridPenggunaAdmin().getStore().reload();
	},
	refreshGridJabatan:function(){
		this.getGridJabatanAdmin().getStore().reload();
	},
	refreshGridJdisposisi:function(){
		this.getGridDisposisiAdmin().getStore().reload();
	},
	refreshGridJdokumen:function(){
		this.getGridJdokumenAdmin().getStore().reload();
	},
	refreshGridKlasifikasi:function(){
		this.getGridKarsipAdmin().getStore().reload();
	},
	refreshGridKlasifikasinodin:function(){
		this.getGridNodiKlasifikasi().getStore().reload();
	},
	refreshGridVerifikasinodin:function(){
		this.getGridNodinVerifikasi().getStore().reload();
	},
	refreshGridVerifikasi:function(){
        this.getGridVerifikasi().getStore().reload();
    },
    refreshGridOprKeluar:function(){
        this.getGridOprKeluar().getStore().reload();
    },
    refreshGridOprMasuk:function(){
        this.getGridOprMasuk().getStore().reload();
    },
    refreshGridSuratMasuk:function(){
		this.getGridMasuk().getStore().reload();
    },
    refreshGridSuratKeluar:function(){
		this.getGridKeluar().getStore().reload();
    },
    refresGridKonsepFinal:function(){
		this.getGridKonsepFinal().getStore().reload();

    },
    refresGridKonsepMasuk:function(){
		this.getGridKonsepMasuk().getStore().reload();
    },
	processLogIn: function() {
		var me = this;
		//console.log('login');
		Ext.Ajax.request({
			url: serverURL+'login/index.json',
			success: function( response, options ) {
				//console.log(response);
				var result = Ext.decode( response.responseText );
				if( result.success == true ) {
					Mail.LoggedInUser = Ext.create('Mail.model.User',result.user);
			        Ext.globalEvents.fireEvent( 'afterValidateLoggedIn' );

				}else{
					Ext.globalEvents.fireEvent( 'showLogin' );
				}
			},
			failure: function( response, options ) {
				Ext.Msg.alert( 'Perhatian', 'Kesalahan terjadi pada request ini' );
			}
		});		
	},
	setupApplication:function(){
		if (this.getViewport() == undefined)  {
			Ext.create('Mail.view.main.Main');
			this.redirectTo('home');
		}else{
			this.getViewport().destroy();
			Ext.create('Mail.view.main.Main');
			this.redirectTo('home');
		}
	},
	showLogin:function(){
		Ext.widget( 'login.Window' ).show();
	},
	doLogin:function(){
		var me=this,
		form = me.getLoginWindow().down('form').getForm(),
		values = form.getValues(),
		win = me.getLoginWindow();

		if( Ext.isEmpty( values.username ) || Ext.isEmpty( values.passwd ) ) {
			Ext.Msg.alert( 'Perhatian', 'Lengkapi form login yang tersedia' );
			return false;
		}

		Ext.Ajax.request({
			url: serverURL+'login',
			method:'post',
			params: {
				username: values.username,
				passwd: Mail.crypto.SHA1.hash( values.passwd )
			},
			success: function( response, options ) {
				var result = Ext.decode( response.responseText );
				if( result.success == true ) {
					Mail.LoggedInUser = Ext.create('Mail.model.User',result.user);
			        Ext.globalEvents.fireEvent( 'afterValidateLoggedIn' );
			        win.close();
				}else{
					form.reset();
					Ext.Msg.alert( 'Perhatian', '<strong>Login gagal</strong><br />ulangi proses login kembali atau kontak admin' );
				}
			},
			failure: function( response, options ) {
			Ext.Msg.alert( 'Perhatian', 'Error terjadi pada request ini' );
			}
		});		

	},
	doLogout:function(){
		var me = this;
		Ext.Ajax.request({
			url: serverURL+'login/logout',
			success: function( response, options ) {
				var result = Ext.decode( response.responseText );
				if( result.success == true) {
					//me.getViewport().setVisible( false );
					Mail.LoggedInUser.destroy();
					
					me.getMain().removeAll();
					//me.getMain().hide();
					Ext.widget( 'login.Window' ).show();
					//Ext.globalEvents.fireEvent( 'processLogIn' );
				}else{
					Ext.Msg.alert( 'Perhatian', 'Logout Gagal' );
				}
					
			},
			failure: function( response, options ) {
				Ext.Msg.alert( 'Perhatian', 'Error terjadi pada request ini' );
			}
		});	
	}
});
