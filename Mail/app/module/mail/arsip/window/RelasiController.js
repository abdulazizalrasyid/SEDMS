Ext.define('Docs.view.arsip.window.RelasiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.arsip-window-relasi',
    onRelationChange:function(self, newValue, oldValue, eOpts){
    	//console.log(newValue);
    	if (newValue == null){
			this.getViewModel().set('relationcode',"0");
		}else{
			this.getViewModel().set('relationcode',newValue);
		}
    	
    },
    beforeclose:function(){
        //console.log('before close');
        Ext.globalEvents.fireEvent( 'refreshGridRelasi' );
    },
    onChangePilih:function(){

    },
    onPilihFokus:function(){

    },
    updateRelation:function(){
    	//console.log('clicked');
        me = this;
        pilih = me.lookupReference('pilih').getValue();
        relationcode = me.lookupReference('relationcode').getValue();

        Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan merelasikan data ini?',
                function(btn) {
                    if (btn === 'yes') {
                        Ext.Ajax.request({
                            url: serverURL+'surat/update_rel.json',
                            method:'get',
                            params:{
                                id:pilih,
                                relationcode:relationcode
                            },
                            success: function(form, action) {
                                Ext.Msg.show({
                                    title:'Data tersimpan',
                                    message: 'Data telah terelasi',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                                me.lookupReference('gridRelasi').getStore().reload();
                            },
                            failure:function(){
                                Ext.Msg.show({
                                    title:'ERROR : File belum terelasi',
                                    message: result.error,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.ERROR
                                });
                            }
                        });
                    } else {
                        return false;
                    }
            });
        
    }

    
});
