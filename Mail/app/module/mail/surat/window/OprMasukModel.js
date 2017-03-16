Ext.define('Docs.view.surat.window.OprMasukModel', {
    extend: 'Docs.view.base.BaseModel',
    alias: 'viewmodel.surat-window-oprmasuk',
    stores:{
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
        },
        daftardisposisi:{
          fields: [
                {name: 'id', type:'auto'},
                {name: 'verified', type:'auto'},
                {name: 'verified_by', type:'auto'},
                {name: 'verified_on', type:'date'},
                {name: 'verification_request_id_jab', type:'auto'},
                {name: 'tipe_surat', type:'auto'},
                {name: 'tahun', type:'auto'},
                {name: 'no_registrasi', type:'auto'},
                {name: 'indeks', type:'auto'},
                {name: 'no_urut', type:'auto'},
                {name: 'id_klasifikasi', type:'auto'},
                {name: 'ringkasan', type:'auto'},
                {name: 'tgl_surat', type:'date'},
                {name: 'tgl_terima', type:'date'},
                {name: 'nomor_surat', type:'auto'},
                {name: 'perihal', type:'auto'},
                {name: 'no_urut', type:'auto'},
                {name: 'catatan', type:'auto'}
            ],

            autoLoad:true,
            pageSize:10,
            proxy: {
                type: 'rest',
                extraParams:{
                  id_surat : '{id_surat}'
                },
                timeout: 20000000,
                api: {
                        create  : serverURL+'disposisi/daftar',
                        update  : serverURL+'disposisi/daftar',
                        destroy : serverURL+'disposisi/daftar'
                },        
                url: serverURL+'disposisi/daftar.json',
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