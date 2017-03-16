Ext.define('Docs.view.arsip.window.ArchivedController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.arsip-window-archived',
    activate:function(){
        me=this;
        //me.getViewModel().getStore('daftar_riwayat').reload();
        me.lookupReference('paging_suratkeluar').setBind({
            store:'{daftar_riwayat}'
        });
    },
    onBeforeClose:function(){
        Ext.globalEvents.fireEvent( 'refreshGridArchived' );
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
                /*me.lookupReference('waktu_aktif').setValue(text.waktu_aktif+' tahun');
                me.lookupReference('waktu_inaktif').setValue(text.waktu_inaktif+' tahun'); 
                me.lookupReference('keterangan').setValue(text.keterangan); */
            },
            failure: function(form, action) {
                console.log('gagal pada request klasifikasi');
            }
        });
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
                me.lookupReference('kode_jra').setValue(text.kode+' : '+text.klasifikasi);  
/*                me.lookupReference('waktu_aktif').setValue(text.waktu_aktif+' tahun');
                me.lookupReference('waktu_inaktif').setValue(text.waktu_inaktif+' tahun'); */
                me.lookupReference('keterangan').setValue(text.keterangan);
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
