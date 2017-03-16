Ext.define('Docs.view.konsep.window.FinalController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.konsep-window-final',
    initIdSurat:function(self, newValue, oldValue, eOpts ){
        var me=this;
        me.getViewModel().set('id_surat',newValue);
    },
    initIdUnique:function(self, newValue, oldValue, eOpts ){
    	var me=this;
        me.getViewModel().set('uniquecode',newValue);
    },
    downloadFile:function(me, record, item, index, e, eOpts){
        me = this;
        //console.log(record.data.nama_file);
        window.open(uploadURL+record.data.nama_file);
    },
    beforeclose:function(){
        //console.log('before close');
        Ext.globalEvents.fireEvent( 'refresGridKonsepFinal' );
        if (Mail.LoggedInUser.data.type =='operator') {
            Ext.globalEvents.fireEvent( 'refreshOprMenu' );
        }else if (Mail.LoggedInUser.data.type =='pengguna'){
            Ext.globalEvents.fireEvent( 'refreshMenu' );
        }
        
        
    },
    filehistory:function(){
        me = this;
        me.lookupReference('filegrid').setBind({store:'{filehistory}'});
        //me.lookupReference('filegrid').getStore().reload();
    },
    onClickProses:function(){
        me = this;
        if (me.lookupReference('selanjutnya').getValue() == 'surat_keluar'){
            Ext.Msg.show({
                title:'Proses',
                message: 'Konsep akan diproses menjadi surat <br/> Perhatian : Unduh terlebih dahulu file yang akan diproses untuk kemudian diunggah dalam form surat keluar',
                buttons: Ext.Msg.OKCANCEL,
                icon: Ext.Msg.WARNING,
                fn: function(btn) {
                    if (btn === 'ok') {
                        //me.redirectTo('regsuratkeluar');
                        Ext.Ajax.request({
                            method:'post',
                            url: serverURL+'konsep/update.json',
                            params:{
                                id:me.lookupReference('id_surat').getValue(),
                                diproses:1,
                                uniquecode:me.lookupReference('uniquecode').getValue()
                            }
                        });
                        me.getView().close();
                    }
                }
            });
        }else if (me.lookupReference('selanjutnya').getValue() == 'nota') {
            Ext.Msg.show({
                title:'Proses',
                message: 'Konsep akan diproses menjadi nota dinas <br/> Perhatian : Unduh terlebih dahulu file yang akan diproses untuk kemudian diunggah dalam form nota dinas',
                buttons: Ext.Msg.OKCANCEL,
                icon: Ext.Msg.WARNING,
                fn: function(btn) {
                    if (btn === 'ok') {
                        //me.redirectTo('notadinas');
                        Ext.Ajax.request({
                            method:'post',
                            url: serverURL+'konsep/update.json',
                            params:{
                                id:me.lookupReference('id_surat').getValue(),
                                diproses:1,
                                uniquecode:me.lookupReference('uniquecode').getValue()
                            }
                        });
                        me.getView().close();
                    }
                }
            });
        }
    }
    
});
