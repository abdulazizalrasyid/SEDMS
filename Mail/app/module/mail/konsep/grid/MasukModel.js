Ext.define('Docs.view.konsep.grid.MasukModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.konsep-grid-masuk',
    stores:{
		datasurat:{
    		fields: [
                //`id`,  `uniquecode`,  `id_jab_verifikator`,  `id_jab_pembuat`,  `perihal`,  `pengantar`
                {name: 'id_jab_pembuat', type:'auto'},
                {name: 'id', type:'auto'},
                {name: 'uniquecode', type:'auto'},
                {name: 'id_jab_verifikator', type:'auto'},
                {name: 'perihal', type:'auto'},
                {name: 'pengantar', type:'auto'},
                {name: 'kode_jab_pembuat', type:'auto'},
                {name: 'jab_pembuat', type:'auto'}
            ],

            autoLoad:true,
            pageSize:10,
            proxy: {
                type: 'rest',
                extraParams:{
	            	id_jabatan : '{id_jabatan}',
                    type:'masuk'
	            },
                timeout: 20000000,
                autoSync:true,
                autoSave: true,
                api: {
                        create  : serverURL+'konsep/daftar',
                        update  : serverURL+'konsep/daftar',
                        destroy : serverURL+'konsep/daftar'
                },        
                url: serverURL+'konsep/daftar.json',
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
