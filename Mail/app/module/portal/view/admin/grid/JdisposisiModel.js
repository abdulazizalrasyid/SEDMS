Ext.define('Portal.view.admin.grid.JdisposisiModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin-grid-jdisposisi',
    stores: {
       daftarjabatan:{
    		fields: [
//`id`,  `disposisi`,  `active`,  `created_by`,  `created_on`,  `deleted_by`,  `deleted_on`
                {name: 'id', type:'auto'},
                {name:'disposisi', type:'auto'},
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
                        create  : serverURL+'jdisposisi/daftar',
                        update  : serverURL+'jdisposisi/daftar',
                        destroy : serverURL+'jdisposisi/daftar'
                },        
                url: serverURL+'jdisposisi/daftar.json',
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
