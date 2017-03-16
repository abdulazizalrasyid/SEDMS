Ext.define('Mail.controller.Portal', {
    extend: 'Mail.controller.Base',
    requires:[
        //'Portal.view.admin.Menu',
        'Docs.view.menu.MenuAdm',

        'Portal.view.admin.grid.Jabatan',
        'Portal.view.admin.grid.Jdisposisi',
        'Portal.view.admin.grid.Jdokumen',
        'Portal.view.admin.grid.Karsip',
        'Portal.view.admin.grid.Pengguna',

        'Docs.view.reserve.Tab',
        'Docs.view.arsip.Tab',
        'Docs.view.arsip.DraftTab',

        'Portal.view.admin.window.Jabatan',
        'Portal.view.admin.window.Jdisposisi',
        'Portal.view.admin.window.Jdokumen',
        'Portal.view.admin.window.Karsip',
        'Portal.view.admin.window.Pengguna'

    ],
    routes : {
        'home':'home',
        'adminpengguna':'adminpengguna',
        'adminjabatan':'adminjabatan',
        'adminjdisposisi':'adminjdisposisi',
        'adminjdokumen':'adminjdokumen',
        'adminklasifikasiarsip':'adminklasifikasiarsip',
        'adminlogpengguna':'adminlogpengguna',
        'adminlogaktifitas':'adminlogaktifitas',
        'adminreserve':'adminreserve',
        'adminarchive':'adminarchive',
        'draftarchive':'draftarchive'
    },
    refs: [/*{
         ref: 'list',
         selector: '[xtype=main]'
     }*/],
     
     listen : {
        controller : {
            '*' : {
                setCenter : 'addContentToCenterRegion'
            }
        },
        component : {
               /* '[xtype=surat.window.VerMasuk] #btSend': {
                    click : 'updateVerified'
                },
                '[xtype=surat.window.VerKeluar] #btSend': {
                    click : 'updateVerifiedOutmail'
                }*/

            }
    },
    draftarchive:function(){
        this.fireEvent('setCenter', {xtype:'arsip.DraftTab'});
    },
    home:function(){
        //console.log('home');
    },
    adminreserve:function(){
        //console.log('reg surat masuk processed');
        this.fireEvent('setCenter', {xtype:'reserve.Tab'});
    },
    adminarchive:function(){
        //console.log('reg surat masuk processed');
        this.fireEvent('setCenter', {xtype:'arsip.Tab'});
    }, 
    adminpengguna:function(){
        //console.log('reg surat masuk processed');
        this.fireEvent('setCenter', {xtype:'admin.grid.Pengguna'});
    },
    adminjabatan:function(){
        //console.log('reg surat masuk processed');
        this.fireEvent('setCenter', {xtype:'admin.grid.Jabatan'});
    },
    adminjdisposisi:function(){
        //console.log('reg surat masuk processed');
        this.fireEvent('setCenter', {xtype:'admin.grid.Jdisposisi'});
    },
    adminjdokumen:function(){
        //console.log('reg surat masuk processed');
        this.fireEvent('setCenter', {xtype:'admin.grid.Jdokumen'});
    },
    adminklasifikasiarsip:function(){
        //console.log('reg surat masuk processed');
        this.fireEvent('setCenter', {xtype:'admin.grid.Karsip'});
    },
    adminlogpengguna:function(){
        //console.log('reg surat masuk processed');
        this.fireEvent('setCenter', {xtype:'surat.form.Masuk'});
    },
    adminlogaktifitas:function(){
        //console.log('reg surat masuk processed');
        this.fireEvent('setCenter', {xtype:'surat.form.Masuk'});
    }
});
