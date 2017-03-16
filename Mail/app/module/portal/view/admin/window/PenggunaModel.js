Ext.define('Portal.view.admin.window.PenggunaModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin-window-pengguna',
    stores:{
    	jabatan:{
            fields: [
                {name: 'id', type:'auto'},
                {name: 'id_jabatan', type:'auto'},
                {name: 'jabatan', type:'auto'}
            ],
            autoLoad:true,
            pageSize:7,
            proxy: {
                type: 'rest',
                timeout: 20000000,
                autoSync:true,
                autoSave: true,
                api: {
                        create  : serverURL+'referensi/jabatan',
                        update  : serverURL+'referensi/jabatan',
                        destroy : serverURL+'referensi/jabatan'
                },        
                url: serverURL+'referensi/jabatan.json',
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
