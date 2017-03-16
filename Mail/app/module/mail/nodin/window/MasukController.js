Ext.define('Docs.view.nodin.window.MasukController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.nodin-window-masuk',
    downloadFile:function(me, record, item, index, e, eOpts){
        me = this;
        //console.log(record.data.nama_file);
        window.open(uploadURL+record.data.nama_file);
    },
    init:function(){
        me=this;
        me.getViewModel().set('id_jabatan',Mail.LoggedInUser.data.id_jabatan);
        me.getViewModel().set('id_atasan',Mail.LoggedInUser.data.id_atasan);
    },
    changeUniquecode:function(self, newValue, oldValue){
        me=this;
        //console.log(newValue);
        me.getViewModel().set('uniquecode',newValue);
    },
    changeId:function(self, newValue, oldValue){
        me = this;
        me.lookupReference('id_surat2').setValue(newValue);
        me.getViewModel().set('id_surat',newValue);
    },
    onBeforeClose:function(){
        Ext.globalEvents.fireEvent( 'refreshMenu' );
    },
    onClickCetak:function(){
        var me = this;
        var id_surat = me.lookupReference('id').getValue();
        window.open(serverURL+'cetak/notadinas/?id_surat='+id_surat);
    },
    onSendDisposisi:function(){
        
        var me=this;
        form = me.getView().down('#formdisposisi').getForm();
        values = form.getValues();

        var cur_user = Mail.LoggedInUser.data.username;
        Ext.Ajax.request({
            url: serverURL+'login/index.json',
            success: function( response, options ) {
                var result = Ext.decode( response.responseText );
                if (result.success == true){
                    if( cur_user == result.user.username ) {
                    //start process
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
                    //end process
                    }else{
                        Ext.globalEvents.fireEvent( 'doLogout' );
                    }
                }
            },
            failure: function( response, options ) {
                Ext.Msg.alert( 'Perhatian', 'Kesalahan terjadi pada request ini' );
            }
        });

        //console.log(values)
        
        //console.log(form.getForm().submit());

    } 
    
});
