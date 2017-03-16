Ext.define('Docs.view.nodin.grid.monitor.BaruModel', {
    extend: 'Docs.view.base.BaseModel',
    alias: 'viewmodel.nodin-grid-monitor-baru',
   	stores:{
   		bawahan_2: {
            //type: 'inmail.FileSurat',
            fields: [
                {name: 'id', type:'auto'},
                {name: 'id_jabatan', type:'auto'},
                {name: 'id_pengguna', type:'auto'},
                {name: 'nama_lengkap', type:'auto'}
            ],
            autoLoad:true,
            proxy: {
                type: 'rest',
                extraParams:{
                    id_jabatan:'{id_jabatan}',
                    id_atasan:'{id_atasan}',
                    tipe_request : 'bawahan_2'
                },
                timeout: 20000000,
                api: {
                        create  : serverURL+'pengguna/daftar',
                        update  : serverURL+'pengguna/daftar',
                        destroy : serverURL+'pengguna/daftar'
                },        
                url: serverURL+'pengguna/daftar.json',
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
