Ext.define('Docs.view.disposisi.grid.KeluarModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.disposisi-grid-keluar',
    stores:{
		disposisi_keluar:{
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
	            	id_jabatan : '{id_jabatan}',
	            	type:'keluar'
	            },
                timeout: 20000000,
                api: {
                        create  : serverURL+'disposisi/daftar_2',
                        update  : serverURL+'disposisi/daftar_2',
                        destroy : serverURL+'disposisi/daftar_2'
                },        
                url: serverURL+'disposisi/daftar_2.json',
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
