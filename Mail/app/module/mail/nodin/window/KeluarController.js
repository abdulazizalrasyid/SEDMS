Ext.define('Docs.view.nodin.window.KeluarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.nodin-window-keluar',
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
        console.log(newValue);
        me.getViewModel().set('uniquecode',newValue);
    },
    onClickCetak:function(){
        var me = this;
        var id_surat = me.lookupReference('id_surat').getValue();
        window.open(serverURL+'cetak/notadinas/?id_surat='+id_surat);
    }
    
});
