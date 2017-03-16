Ext.define('Docs.view.surat.window.VerifikasiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.surat-window-verifikasi',
    initIdSurat:function(self, newValue, oldValue, eOpts ){
    	var me=this;
    	me.getViewModel().set('id_surat',newValue);
    },
    downloadFile:function(me, record, item, index, e, eOpts){
        me = this;
        //console.log(record.data.nama_file);
        window.open(uploadURL+record.data.nama_file);
    },
    onIdKlasifikasiFokus:function( self, event, eOpts ){
        self.getStore().reload();
    },

    onIdKlasifikasiSelect:function(self, records, eOpts){
        me = this;
        if (records[0].data.kode.length < 8 ){
            Ext.Msg.show({
                title:'ERROR',
                message: 'Cek lagi pilihan klasifikasi <br/> <i>kode klasifikasi minimal 6 digit</i>',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            me.lookupReference('id_klasifikasi').reset();
        }
    },
    onCodeChange:function(self, newValue, oldValue, eOpts){
        //console.log(newValue);
        this.getViewModel().set('primer_code',newValue);
        this.getViewModel().getStore('klasifikasi').reload();
        this.lookupReference('id_klasifikasi').setValue("");
    },
    beforeclose:function(){
        //console.log('before close');
        Ext.globalEvents.fireEvent( 'refreshGridVerifikasi' );
        Ext.globalEvents.fireEvent( 'refreshMenu' );
        
    }, 
    onClickCetak:function(){
        var me = this;
        var id_surat = me.lookupReference('id_surat').getValue();
        window.open(serverURL+'cetak/pengantar/?id_surat='+id_surat);
    },
    onClickSimpan:function(){
        var me=this, 
        form =  me.lookupReference('fromstage1').getForm(),
        values = form.getValues();
        win = me.getView();
        /*var tanggal_surat = me.lookupReference('tgl_terima').getValue();
        var tahunmasuk = Ext.Date.format(tanggal_surat, 'Y');*/

        //console.log(form);

        if (form.isValid()) {
            Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan menyimpan data ini?',
                function(btn) {
                    if (btn === 'yes') {
                        form.submit({
                            params: {
                                verified:0
                            },
                            success: function(form, action) {

                                var result = Ext.decode( action.response.responseText );
                                Ext.Msg.show({
                                    title:'Data tersimpan',
                                    message: 'Data telah tersimpan ke dalam database',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                                win.close();
                                

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

    },
    onClickVerifikasi:function(){
        var me=this, 
        form =  me.lookupReference('fromstage1').getForm(),
        values = form.getValues();
        username = Mail.LoggedInUser.data.username;
        win = me.getView();
        /*var tanggal_surat = me.lookupReference('tgl_terima').getValue();
        var tahunmasuk = Ext.Date.format(tanggal_surat, 'Y');*/

        //console.log(form);

        if (form.isValid()) {
            Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan menyimpan data ini?',
                function(btn) {
                    if (btn === 'yes') {
                        form.submit({
                            params: {
                                verified_by:username,
                                verified_on:Ext.Date.format(new Date(), 'Y/m/d H:i')
                            },
                            //headers: {'Content-Type': "multipart/form-data" },
                            success: function(form, action) {
                                //console.log(action.response.responseText);
                                var result = Ext.decode( action.response.responseText );
                                Ext.Msg.show({
                                    title:'Data tersimpan',
                                    message: 'Data telah tersimpan ke dalam database',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                                win.close();
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
