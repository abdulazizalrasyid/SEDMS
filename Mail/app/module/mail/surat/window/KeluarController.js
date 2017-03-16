Ext.define('Docs.view.surat.window.KeluarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.surat-window-keluar',
    init:function(){
        me=this;
        me.getViewModel().set('id_jabatan',Mail.LoggedInUser.data.id_jabatan);
    },
    initIdSurat:function(self, newValue, oldValue, eOpts ){
    	var me=this;
    	me.getViewModel().set('id_surat',newValue);
    },
    onIdKlasifikasiFokus:function( self, event, eOpts ){
        self.getStore().reload();
    },
    onCodeChange:function(self, newValue, oldValue, eOpts){
        //console.log(newValue);
        this.getViewModel().set('primer_code',newValue);
        this.getViewModel().getStore('klasifikasi').reload();
        this.lookupReference('id_klasifikasi').setValue("");
    },
    onClickCetak:function(){
        var me = this;
        var id_surat = me.lookupReference('id_surat').getValue();
        window.open(serverURL+'cetak/pengantar/?id_surat='+id_surat);
    },
    downloadFile:function(me, record, item, index, e, eOpts){
        me = this;
        //console.log(record.data.nama_file);
        window.open(uploadURL+record.data.nama_file);
    },
    beforeclose:function(){
        //console.log('before close');
        Ext.globalEvents.fireEvent( 'refreshGridSuratKeluar' );
    },
    onSendDisposisi:function(){
        
        var me=this;
        form = me.getView().down('#formdisposisi').getForm();
        values = form.getValues();

        //console.log(values)
        form.url =serverURL+'disposisi/simpan'

        if (form.isValid()) {
            Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan mengirim disposisi ini?',
                function(btn) {
                    if (btn === 'yes') {
                        form.submit({
                            success: function(theform, action) {
                                console.log(form);
                                
                                Ext.Msg.show({
                                    title:'Data tersimpan',
                                    message: 'Disposisi telah terkirim',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                                form.reset();
                                me.lookupReference('thefields').setVisible(false);
                                me.lookupReference('gridDisposisi').getStore().reload();
                            },
                            failure: function(theform, action) {
                                console.log('gagal mengirim disposisi');
                            }
                        });
                    } else {
                        return false;
                    }
            }); 
        } 
        //console.log(form.getForm().submit());

    } 
    
});
