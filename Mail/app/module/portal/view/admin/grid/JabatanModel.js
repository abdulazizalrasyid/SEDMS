Ext.define('Portal.view.admin.grid.JabatanModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin-grid-jabatan',
    stores: {
       daftarjabatan:{
    		fields: [
        //`id`,  `kode_jabatan`,  `id_atasan`,  `jabatan`,  `active`,  
        //`created_on`,  `created_by`,  `edited_on`,  `edited_by`,  `deleted_on`,  `deleted_by`
                {name: 'id', type:'auto'},
                {name:'kode_jabatan', type:'auto'},
                {name:'id_atasan', type:'auto'},
                {name:'atasan', type:'auto'},
                {name:'jabatan', type:'auto'},
                {name:'active', type:'auto'}
            ],
            autoLoad:true,
            pageSize:17,
            proxy: {
                type: 'rest',
                timeout: 20000000,
                autoSync:true,
                autoSave: true,
                api: {
                        create  : serverURL+'jabatan/daftar',
                        update  : serverURL+'jabatan/daftar',
                        destroy : serverURL+'jabatan/daftar'
                },        
                url: serverURL+'jabatan/daftar.json',
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
