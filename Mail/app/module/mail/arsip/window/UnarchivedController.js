Ext.define('Docs.view.arsip.window.UnarchivedController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.arsip-window-unarchived',
    onActivate:function(){
        me=this;
        //me.lookupReference('riwayat_dokumen')
        me.lookupReference('riwayat_dokumen').getStore().reload();
        me.lookupReference('paging_suratkeluar').setStore(me.lookupReference('riwayat_dokumen').getStore());
    },
    onBeforeClose:function(){
        Ext.globalEvents.fireEvent( 'refreshGridUnarchived' );
    },
    onIdJraFokus:function( self, event, eOpts ){
        self.getStore().reload();
    },
    onChangeJra:function(self, newValue, oldValue, eOpts){
        me = this;

        Ext.Ajax.request({
            method:'get',
            url: serverURL+'jra/klasifikasi.json',
            params:{
                id_klasifikasi:newValue
            },
            success: function(response) {
                //var result = Ext.decode( action );
                var text = Ext.decode( response.responseText ); 
                //me.lookupReference('klasifikasi').setValue(text.kode+' : '+text.klasifikasi);  
                me.lookupReference('waktu_aktif').setValue(text.waktu_aktif+' tahun');
                me.lookupReference('waktu_inaktif').setValue(text.waktu_inaktif+' tahun'); 
                
                var tgl_surat = me.lookupReference('tgl_surat').getValue();
                var newTglAktif =  Ext.Date.add(new Date(tgl_surat),Ext.Date.YEAR, parseInt(text.waktu_aktif));
                var newTglNonAktif =  Ext.Date.add(new Date(tgl_surat),Ext.Date.YEAR, parseInt(text.waktu_inaktif));

                me.lookupReference('waktu_aktif2').setValue(newTglAktif);
                me.lookupReference('waktu_inaktif2').setValue(newTglNonAktif);


                //me.lookupReference('keterangan').setValue(text.keterangan); 
            },
            failure: function(form, action) {
                console.log('gagal pada request klasifikasi');
            }
        });
    },
    onChangeKlasifikasi:function(self, newValue, oldValue, eOpts){
    	me = this;

    	Ext.Ajax.request({
            method:'get',
            url: serverURL+'karsip/klasifikasi.json',
            params:{
                id_klasifikasi:newValue
            },
            success: function(response) {
                //var result = Ext.decode( action );
                var text = Ext.decode( response.responseText ); 
                me.lookupReference('klasifikasi').setValue(text.kode+' : '+text.klasifikasi);  
               /* me.lookupReference('waktu_aktif').setValue(text.waktu_aktif+' tahun');
                me.lookupReference('waktu_inaktif').setValue(text.waktu_inaktif+' tahun'); 
                
                var tgl_surat = me.lookupReference('tgl_surat').getValue();
                var newTglAktif =  Ext.Date.add(new Date(tgl_surat),Ext.Date.YEAR, parseInt(text.waktu_aktif));
                var newTglNonAktif =  Ext.Date.add(new Date(tgl_surat),Ext.Date.YEAR, parseInt(text.waktu_inaktif));

                me.lookupReference('waktu_aktif2').setValue(newTglAktif);
                me.lookupReference('waktu_inaktif2').setValue(newTglNonAktif);
*/

                //me.lookupReference('keterangan').setValue(text.keterangan); 
            },
            failure: function(form, action) {
                console.log('gagal pada request klasifikasi');
            }
        });
    },
    onChangeUniquecode:function(self, newValue, oldValue, eOpts){
    	var me = this;
    	me.getViewModel().set('uniquecode',newValue);
        //console.log('uniquecode '+newValue)
    },
    downloadFile:function(me, record, item, index, e, eOpts){
        me = this;
        //console.log(record.data.nama_file);
        window.open(uploadURL+record.data.nama_file);
    },
    onSimpanArsip:function(){
    	var me = this;

    	form = me.lookupReference('form_surat').getForm(),
        values = form.getValues();

        if (form.isValid()) {
                Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan mengarsip dokumen ini?',
                function(btn) {
                    if (btn === 'yes') {
                        form.url = serverURL+'surat/arsip';
                        //form.url = serverURL+'notadinas/check';
                        form.submit({
                            success: function(form, action) {
                                me.getView().close();
                                Ext.Msg.show({
                                    title:'Data tersimpan',
                                    message: 'Pengarsipan sukses',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                            },
                            failure: function(form, action) {
                                console.log('gagal mengirim surat masuk');
                            }
                        });
                    } else {
                        return false;
                    }
            });  
        }
    }
    
});
