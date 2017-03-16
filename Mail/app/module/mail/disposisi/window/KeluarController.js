Ext.define('Docs.view.disposisi.window.KeluarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.disposisi-window-keluar',
    init:function(){
        var me=this;
        me.getViewModel().set('id_jabatan',Mail.LoggedInUser.data.id_jabatan);
        //me.getViewModel().set('id_jabatan',Mail.LoggedInUser.data.id_jabatan);
        //console.log(MailDoc.LoggedInUser.data.id_jabatan);
    },
    initIdSurat:function(self, newValue, oldValue, eOpts ){
    	var me=this;
    	me.getViewModel().set('id_surat',newValue);
    }, 
    initUniquecode:function(self, newValue, oldValue, eOpts ){
        var me=this;
        me.getViewModel().set('uniquecode',newValue);
        //me.lookupReference('uniquecode2').setValue(newValue);
    },
    beforeclose:function(){
        Ext.globalEvents.fireEvent( 'refreshGridDisposisiKeluar' );
    },
    onSendDisposisi:function(){

        var me=this, 
        form = me.lookupReference('formdisposisi'),
        values = form.getValues();

        if (form.isValid()) {
            Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan mengirim disposisi ini?',
                function(btn) {
                    if (btn === 'yes') {
                        form.submit({
                            success: function(form, action) {
                                //console.log('sukses');
                                //me.lookupReference('grid_daftar').getStore().reload();
                                Ext.Msg.show({
                                    title:'Data tersimpan',
                                    message: 'Disposisi telah terkirim',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                            },
                            failure: function(form, action) {
                                console.log('gagal mengirim disposisi');
                            }
                        });
                    } else {
                        return false;
                    }
            }); 
        } 
        //console.log(form.getForm().submit());

    },
    downloadFile:function(me, record, item, index, e, eOpts){
        me = this;
        //console.log(record.data.nama_file);
        window.open(uploadURL+record.data.nama_file);
    }
    
});
