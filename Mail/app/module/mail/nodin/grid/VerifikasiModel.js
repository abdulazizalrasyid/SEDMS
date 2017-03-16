Ext.define('Docs.view.nodin.grid.VerifikasiModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nodin-grid-verifikasi',
    stores:{
   		nodinkeluar:{			
    		fields: [
                {name: 'id', type:'auto'},
                {name: 'id_jab_pengirim', type:'auto'},
                {name: 'id_jab_penerima', type:'auto'},
                {name: 'tujuan_notadinas', type:'auto'},
                {name: 'kode_tujuan', type:'auto'},
                {name: 'jabatan_tujuan', type:'auto'},
                {name: 'tanggal_notadinas', type:'date'},
                {name: 'perihal', type:'auto'},
                {name: 'urgensi', type:'auto'},
                {name: 'tingkat_keamanan', type:'auto'},
                {name: 'nomor_surat', type:'auto'},
                {name: 'isi_nota', type:'auto'},
                {name: 'tgl_surat', type:'date'}
            ],

            autoLoad:true,
            pageSize:10,
            proxy: {
                type: 'rest',
              extraParams:{
	            	id_jabatan : '{id_jabatan}',
                type:'verifikasi'
	            },
                timeout: 20000000,
                api: {
                        create  : serverURL+'notadinas/daftar',
                        update  : serverURL+'notadinas/daftar',
                        destroy : serverURL+'notadinas/daftar'
                },        
                url: serverURL+'notadinas/daftar.json',
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
