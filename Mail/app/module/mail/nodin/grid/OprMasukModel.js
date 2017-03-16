Ext.define('Docs.view.nodin.grid.OprMasukModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nodin-grid-oprmasuk',
    stores:{
		datasurat:{			
    		fields: [
                {name: 'id', type:'auto'},
                {name: 'id_jab_pengirim', type:'auto'},
                {name: 'id_jab_penerima', type:'auto'},
                {name: 'tujuan_notadinas', type:'auto'},
                {name: 'tanggal_notadinas', type:'date'},
                {name: 'perihal', type:'auto'},
                {name: 'urgensi', type:'auto'},
                {name: 'tingkat_keamanan', type:'auto'},
                {name: 'nomor_surat', type:'auto'},
                {name: 'isi_nota', type:'auto'}
            ],

            autoLoad:true,
            pageSize:10,
            proxy: {
                type: 'rest',
                extraParams:{
	            	id_pengguna : '{id_pengguna}'
	            },
                timeout: 20000000,
                api: {
                        create  : serverURL+'notadinas/daftar_pengolah',
                        update  : serverURL+'notadinas/daftar_pengolah',
                        destroy : serverURL+'notadinas/daftar_pengolah'
                },        
                url: serverURL+'notadinas/daftar_pengolah.json',
                reader: {
                      type: 'json',
                      rootProperty: 'data',
                      totalProperty: 'total'
                },
                writer: {
                      //encode: true,
                      type: 'json',
                      rootProperty: 'data'
                }
             }
    	}
    }

});
