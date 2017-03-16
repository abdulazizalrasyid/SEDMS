Ext.define('Docs.view.surat.window.VerifikasiModel', {
    extend: 'Docs.view.base.BaseModel',
    alias: 'viewmodel.surat-window-verifikasi',
    stores: {
       tujuan_verifikasi:{
            fields: [
                {name: 'id', type:'auto'},
                {name: 'id_jabatan', type:'auto'},
                {name: 'fullname', type:'auto'},
                {name: 'jabatan', type:'auto'},
                {name: 'kode_jabatan', type:'auto'},
                {name: 'id_atasan', type:'auto'}
            ],
            autoLoad:true,
            //pageSize:7,
            proxy: {
                type: 'rest',
                timeout: 20000000,
                extraParams:{
                  tipe_request : 'tujuan_verifikasi'
                },
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
