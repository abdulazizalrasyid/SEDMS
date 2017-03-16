Ext.define('Docs.view.disposisi.grid.MasukModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.disposisi-grid-masuk',
    stores:{
		disposisi_masuk:{
			//`id`,  `id_surat`,  `id_jab_pengirim`,  `diteruskan`,  `jns_disposisi`,  LEFT(`isi_disposisi`, 256),  `dibaca`
    		fields: [
                {name: 'id', type:'auto'},
                {name: 'id_surat', type:'auto'},
                {name: 'jenis_surat', type:'auto'},
                {name: 'id_jab_pengirim', type:'auto'},
                {name: 'diteruskan', type:'date'},
                {name: 'jns_disposisi', type:'auto'},
                {name: 'jns_disposisi_long', type:'auto'},
                {name: 'isi_disposisi', type:'auto'},
                {name: 'dibaca', type:'auto'}
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
/*                api: {
                        create  : serverURL+'inmail/disposisi',
                        update  : serverURL+'inmail/disposisi',
                        destroy : serverURL+'inmail/disposisi'
                },        
                url: serverURL+'inmail/disposisi.json',*/
                api: {
                        create  : serverURL+'disposisi/daftar_2',
                        update  : serverURL+'disposisi/daftar_2',
                        destroy : serverURL+'disposisi/daftar_2'
                },        
                url: serverURL+'disposisi/daftar_2.json',
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
