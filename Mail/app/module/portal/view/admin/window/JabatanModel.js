Ext.define('Portal.view.admin.window.JabatanModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin-window-jabatan',
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
    	},kode_unker:{
            fields: [
                {name: 'id', type:'auto'},
                {name: 'kode', type:'auto'},
                {name: 'unitkerja', type:'auto'},
                {name: 'eselon', type:'auto'},
                {name: 'induk', type:'auto'}
            ],
            autoLoad:true,
            pageSize:25,
            proxy: {
                type: 'rest',
                timeout: 20000000,
                api: {
                        create  : serverURL+'unker/daftar',
                        update  : serverURL+'unker/daftar',
                        destroy : serverURL+'unker/daftar'
                },        
                url: serverURL+'unker/daftar.json',
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
    }

});
