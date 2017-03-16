Ext.define('Docs.view.base.DetailMasukController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.base-detail-masuk',
    onTujuanSelect:function(self, records, eOpts){
    	//console.log(records[0].data.id_jabatan);
    	this.lookupReference('id_jabatan').setValue( records[0].data.id_jabatan);
    },
    onNomorBlur:function(){
    	me = this;

    	Ext.Ajax.request({
            url: serverURL+'surat/checknumber.json',
            method:'get',
           	params:{
                nomor_surat: me.lookupReference('nomor_surat').getValue()
            },
            success: function( response, options ) {
            	var result = Ext.decode( response.responseText );
               	if (result > 0){
               		Ext.Msg.show({
			            title:'Perhatian',
			            message: 'Ada surat dengan nomor yang sama',
			            buttons: Ext.Msg.OK,
			            icon: Ext.Msg.WARNING
			        });
			        me.lookupReference('nomor_surat').reset();
               	}
            },
            failure: function( response, options ) {
                Ext.Msg.alert( 'Perhatian', 'Kesalahan terjadi pada request ini' );
            }
        });

        
        //me.lookupReference('id_klasifikasi').reset();

    }
    
});
