Ext.define('Portal.view.admin.grid.PenggunaModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin-grid-pengguna',
    stores: {
       daftarjabatan:{
    		fields: [
         // `id`,  `username`,  `fullname`,  `passwd`,  `type`,  `id_jabatan`,  `id_unker`,  `active`,  
         // `login_terakhir`,  `login_machine`,  `created_on`,  `created_by`,  `edited_on`,  `edited_by`,  `deleted_on`,  `deleted_by`
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
                        create  : serverURL+'pengguna/daftar_admin',
                        update  : serverURL+'pengguna/daftar_admin',
                        destroy : serverURL+'pengguna/daftar_admin'
                },        
                url: serverURL+'pengguna/daftar_admin.json',
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
