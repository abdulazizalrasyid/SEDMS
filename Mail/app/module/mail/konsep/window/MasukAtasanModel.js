Ext.define('Docs.view.konsep.window.MasukAtasanModel', {
    extend: 'Docs.view.base.BaseModel',
    alias: 'viewmodel.konsep-window-masukatasan',
    stores: {
      filesurat: {
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
          autoSync:true,
          autoSave: true,
          extraParams:{
            tu_draft_id:'{id_surat}'
          },
          api: {
            create  : serverURL+'konsep/daftarfile',
            update  : serverURL+'konsep/daftarfile',
            destroy : serverURL+'konsep/daftarfile'
          },        
          url: serverURL+'konsep/daftarfile.json',
          reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
          },
          writer: {
            type: 'json',
            rootProperty: 'data'
            //encode: true,
          }
        }/*,
            filters: [{
                property: 'tu_surat_id',
                value: '{id_surat}'
            }]*/
        },
      filehistory: {
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
          autoSync:true,
          autoSave: true,
          extraParams:{
            uniquecode:'{uniquecode}'
          },
          api: {
            create  : serverURL+'konsep/daftar_file_history',
            update  : serverURL+'konsep/daftar_file_history',
            destroy : serverURL+'konsep/daftar_file_history'
          },        
          url: serverURL+'konsep/daftar_file_history.json',
          reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
          },
          writer: {
            type: 'json',
            rootProperty: 'data'
            //encode: true,
          }
        }/*,
            filters: [{
                property: 'tu_surat_id',
                value: '{id_surat}'
            }]*/
        }
    }
});
