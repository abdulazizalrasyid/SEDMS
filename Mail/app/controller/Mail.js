Ext.define('Mail.controller.Mail', {
    extend: 'Mail.controller.Base',

    requires:[
        'Ext.data.proxy.Rest',
    	'Ext.window.Window',
        'Ext.tab.Panel',
        'Ext.form.field.Date',
        'Ext.form.FieldContainer',
        'Ext.form.field.File',

/*        'Ux.MyLine',
        'Ux.MyFileField',  */
        'Ux.MyPagingToolbar',
        'Ux.MySearchField',

        'Ext.form.field.ComboBox',
        'Ext.ux.form.SearchField',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Hidden',
        'Ext.form.field.Tag',
        'Ext.form.field.HtmlEditor',
        'Ext.form.field.Radio',
        'Ext.form.FieldSet',
        
        'Docs.view.menu.MenuOpr',
        'Docs.view.menu.MenuPengguna',
        'Docs.view.menu.MenuArsip',
        'Docs.view.menu.MenuStaf',

        'Docs.view.surat.form.Masuk',
        'Docs.view.surat.form.Keluar',
        'Docs.view.surat.form.Keluar2',

        'Docs.view.surat.window.Verifikasi',
        'Docs.view.surat.window.Masuk',
        'Docs.view.surat.window.Keluar',
        'Docs.view.surat.window.OprKeluar',
        'Docs.view.surat.window.OprMasuk',

        'Docs.view.disposisi.window.Masuk',
        'Docs.view.disposisi.window.Keluar',

        'Docs.view.surat.Tab',
        'Docs.view.surat.OprTab',
        'Docs.view.disposisi.Tab',
        'Docs.view.nodin.Tab',
        'Docs.view.konsep.Tab',

        'Docs.view.nodin.window.Keluar',
        'Docs.view.nodin.window.Unclassified',
        'Docs.view.nodin.window.Verified',
        'Docs.view.nodin.window.Masuk',
        'Docs.view.nodin.window.OprMasuk',


        'Docs.view.konsep.window.Masuk',

        'Docs.view.disposisi.grid.monitor.Keluar',
        'Docs.view.disposisi.grid.monitor.Masuk',

        'Docs.view.konsep.grid.monitor.Final',
        'Docs.view.konsep.grid.monitor.Masuk',

        'Docs.view.konsep.window.Final',

        'Docs.view.nodin.grid.monitor.Baru',
        'Docs.view.nodin.grid.monitor.Keluar',
        'Docs.view.nodin.grid.monitor.Masuk',
        'Docs.view.nodin.grid.monitor.Verifikasi',
        'Docs.view.nodin.grid.OprMasuk',

        'Docs.view.surat.grid.monitor.Keluar',
        'Docs.view.surat.grid.monitor.Masuk',
        'Docs.view.surat.grid.monitor.Verifikasi',

        'Docs.view.arsip.grid.Jra',
        'Docs.view.arsip.window.Jra',
        'Docs.view.arsip.grid.Relasi',

        'Docs.view.laporan.form.Panel'


    ],
    routes : {
       'regsuratmasuk':'regsuratmasuk',
       'regsuratkeluar':'regsuratkeluar',
       'regsuratkeluar2/:id': {
            action     : 'regsuratkeluar2',
            conditions : {
                ':id' : '([0-9]+)'
            }
        },
       'suratopr':'suratopr',
       'draft':'draft',
       'notadinasopr':'notadinasopr',
       'suratMntr':'suratMntr',
       'draftMntr':'draftMntr',
       'nodinMntr':'nodinMntr',
       'disposisiMntr':'disposisiMntr',
       'surat':'surat',
       'notadinas':'notadinas',
       'draft':'draft',
       'disposisi':'disposisi',
       'jra':'jra',
       'relasi':'relasi',
       'laporanOpr':'laporanOpr'
    },
    listen : {
        controller : {
            '*' : {
                setCenter : 'addContentToCenterRegion'
            }
        },
        component : {
            /*'[xtype=surat.grid.Verifikasi] #btSend': {
                click : 'updateVerified'
            },
            '[xtype=surat.window.VerKeluar] #btSend': {
                click : 'updateVerifiedOutmail'
            }*/
        }
    },
    refs: [{
         ref: 'FormKeluar2',
         selector: '[xtype=surat.form.Keluar2]'
     }],
    laporanOpr:function(){
        this.fireEvent('setCenter', {xtype:'laporan.form.Panel'});
    },
    relasi:function(){
        this.fireEvent('setCenter', {xtype:'arsip.grid.Relasi'});
    },
    regsuratmasuk:function(){
        this.fireEvent('setCenter', {xtype:'surat.form.Masuk'});
    },
    regsuratkeluar:function(){
        this.fireEvent('setCenter', {xtype:'surat.form.Keluar'});
    },
    regsuratkeluar2:function(id){
        this.fireEvent('setCenter', {xtype:'surat.form.Keluar2'});
        var me = this;
         Ext.Ajax.request({
                method:'get',
                url: serverURL+'surat/reserved.json',
                params:{
                    id:id
                },
                success: function(response){
                    var result = Ext.decode( response.responseText );
                    //console.log(result);
                    //console.log(me.getFormKeluar2());
                    me.getFormKeluar2().lookupReference('id_register').setValue(result.id);
                    me.getFormKeluar2().lookupReference('no_registrasi_surat').setValue(result.nomor_urut);
                    me.getFormKeluar2().lookupReference('jenis').setValue(result.jenis);
                    me.getFormKeluar2().lookupReference('jenis2').setValue(result.jenis);
                    //me.getFormKeluar2().lookupReference('penandatangan').select(result.penandatangan_lengkap);
                    //me.getFormKeluar2().lookupReference('penandatangan2').setValue(result.penandatangan);
                    //me.getFormKeluar2().lookupReference('id_jabatan').setValue(result.id_jabatan_asal);
                    me.getFormKeluar2().lookupReference('unit_pemrakarsa').setValue(result.unit_pemrakarsa);
                    me.getFormKeluar2().lookupReference('unit_pemrakarsa2').setValue(result.unit_pemrakarsa);
                    me.getFormKeluar2().lookupReference('tgl_surat').setValue(new Date(result.created_on));
                    me.getFormKeluar2().lookupReference('tgl_surat2').setValue(Ext.util.Format.date(result.created_on,'Y/m/d'));
                    //me.getFormKeluar2().lookupReference('kode_jabatan').setValue(result.penandatangan);

                    // process server response here
                },
                failure:function(response){
                    Ext.Msg.alert( 'Perhatian', 'Kesalahan terjadi pada request ini' );
                }
            });
        
    },
    suratopr:function(){
        this.fireEvent('setCenter', {xtype:'surat.OprTab'});
    },
    draft:function(){
        this.fireEvent('setCenter', {xtype:'surat.form.Masuk'});
    },
    notadinasopr:function(){
        this.fireEvent('setCenter', {xtype:'surat.form.Masuk'});
    },
    suratMntr:function(){
        this.fireEvent('setCenter', {xtype:'surat.grid.monitor.Masuk'});
    },
    draftMntr:function(){
        this.fireEvent('setCenter', {xtype:'konsep.grid.monitor.Masuk'});
    },
    disposisiMntr:function(){
        this.fireEvent('setCenter', {xtype:'disposisi.grid.monitor.Masuk'});
    },
    nodinMntr:function(){
        this.fireEvent('setCenter', {xtype:'nodin.grid.monitor.Masuk'});
    },
    surat:function(){
        this.fireEvent('setCenter', {xtype:'surat.Tab'});
    },
    notadinas:function(){
        this.fireEvent('setCenter', {xtype:'nodin.Tab'});
    },
    draft:function(){
        this.fireEvent('setCenter', {xtype:'konsep.Tab'});
    },
    disposisi:function(){
        this.fireEvent('setCenter', {xtype:'disposisi.Tab'});
    },
    jra:function(){
        //console.log('test');
        this.fireEvent('setCenter', {xtype:'arsip.grid.Jra'});
    }
});
