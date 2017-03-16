Ext.define('Docs.view.surat.grid.monitor.VerifikasiModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.surat-grid-monitor-verifikasi',
    stores:{
    	daftar_verifikasi:{
    		fields: [
 //SELECT  `id`,  `uniquecode`,  `verified`,  `verified_by`,  `verified_on`,  `verification_request_id_jab`,  `id_pengolah`,  `tipe_surat`,  `index`,  `tahun`,  `jenis`,  `no_urut`,  `no_registrasi_surat`,  `id_klasifikasi`,  LEFT(`ringkasan`, 256),  `tgl_terima`,  `tgl_kirim`,  `asal_surat`,  `id_jabatan_asal`,  `tujuan_surat`,  `id_jabatan`,  `tgl_surat`,  `nomor_surat`,  `perihal`,  LEFT(`catatan`, 256),  `tingkat_keamanan`,  `urgensi`,  `sifat`,  `ditanggapi`,  `didisposisi`,  `dibaca`,  `diarsipkan`,  `waktu_aktif`,  `waktu_inaktif`,  `created_at`,  `created_by`,  `edited_at`,  `edited_by`,  `deleted_at`,  `deleted_by` FROM `sedms`.`tu_surat` LIMIT 1000;
   		
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
	            	type:'verifikasi'
	            },
                timeout: 20000000,
                api: {
                        create  : serverURL+'surat/daftar',
                        update  : serverURL+'surat/daftar',
                        destroy : serverURL+'surat/daftar'
                },        
                url: serverURL+'surat/daftar.json',
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
