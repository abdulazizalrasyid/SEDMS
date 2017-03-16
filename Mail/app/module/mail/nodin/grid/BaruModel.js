Ext.define('Docs.view.nodin.grid.BaruModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nodin-grid-baru',
   	stores:{
   		atasan: {
            //type: 'inmail.FileSurat',
            fields: [
                {name: 'id', type:'auto'},
                {name: 'id_jabatan', type:'auto'},
                {name: 'fullname', type:'auto'},
                {name: 'jabatan', type:'auto'},
                {name: 'kode_jabatan', type:'auto'},
                {name: 'id_atasan', type:'auto'},
                {name: 'kode_unker', type:'auto'}
            ],
            autoLoad:true,
            proxy: {
                type: 'rest',
                extraParams:{
                    id_jabatan:'{id_jabatan}',
                    tipe_request : 'atasan'
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
        },
        unit_pemrakarsa:{
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
        bawahan_2: {
            //type: 'inmail.FileSurat',
            fields: [
                {name: 'id', type:'auto'},
                {name: 'id_jabatan', type:'auto'},
                {name: 'id_pengguna', type:'auto'},
                {name: 'nama_lengkap', type:'auto'},
                {name: 'kode_unker', type:'auto'}
            ],
            autoLoad:false,
            proxy: {
                type: 'rest',
                extraParams:{
                    id_jabatan:'{id_jabatan}',
                    //id_atasan:'{id_atasan}',
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
