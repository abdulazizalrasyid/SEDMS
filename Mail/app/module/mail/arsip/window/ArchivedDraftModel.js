Ext.define('Docs.view.arsip.window.ArchivedDraftModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.arsip-window-archiveddraft',
	stores:{
    	daftar_riwayat:{
    		fields: [ 		
                {name: 'id', type:'auto'},
                {name: 'tanggal', type:'auto'},
                {name: 'uniquecode', type:'auto'},
                {name: 'aksi', type:'auto'}

            ],
            autoLoad:true,
            pageSize:10,
            proxy: {
                type: 'rest',
                extraParams:{
	            	uniquecode:'{uniquecode}'
	            },
                timeout: 20000000,
                api: {
                        create  : serverURL+'riwayat/daftar',
                        update  : serverURL+'riwayat/daftar',
                        destroy : serverURL+'riwayat/daftar'
                },        
                url: serverURL+'riwayat/daftar.json',
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
    	},
    	file: {
            pageSize:5,
            autoLoad:true,
            fields: [
                {name: 'id', type:'string'}, 
                {name: 'tu_surat_id', type:'string'},  
                {name: 'nama_file', type:'string'},  
                {name: 'stored', type:'string'},  
                {name: 'key', type:'string'},  
                {name: 'id_pengguna', type:'string'},  
                {name: 'lokasi', type:'string'},  
               
                {name: 'created_at', type:'date'},  
                {name: 'created_by', type:'string'},  
                {name: 'edited_at', type:'date'},  
                {name: 'edited_by', type:'string'},  
                {name: 'deleted_at', type:'date'},  
                {name: 'deleted_by', type:'string'}
            ],

            proxy: {
                type: 'rest',
                timeout: 20000000,
                extraParams:{
                    uniquecode:'{uniquecode}'
                },
                api: {
                        create  : serverURL+'konsep/daftar_file_history_distinc',
                        update  : serverURL+'konsep/daftar_file_history_distinc',
                        destroy : serverURL+'konsep/daftar_file_history_distinc'
                },        
                url: serverURL+'konsep/daftar_file_history_distinc.json',
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
