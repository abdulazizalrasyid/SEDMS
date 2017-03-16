Ext.define('Docs.view.arsip.grid.JraModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.arsip-grid-jra',
    stores: {
       daftarjra:{
    		fields: [
// `id`,  `kode`,  `klasifikasi`,  `active`,  `waktu_aktif`,  `waktu_inaktif`,  
//LEFT(`keterangan`, 256),  `created_on`,  `created_by`,  `edited_on`,  `edited_by`,  `deleted_on`,  `deleted_by`
                {name: 'id', type:'auto'},
                {name:'kode', type:'auto'},
                {name:'klasifikasi', type:'auto'},
                {name:'waktu_aktif', type:'auto'},
                {name:'waktu_inaktif', type:'auto'},
                {name:'keterangan', type:'auto'},
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
                        create  : serverURL+'jra/daftar',
                        update  : serverURL+'jra/daftar',
                        destroy : serverURL+'jra/daftar'
                },        
                url: serverURL+'jra/daftar.json',
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
