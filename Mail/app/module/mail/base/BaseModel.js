Ext.define('Docs.view.base.BaseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.base-base',
    stores:{
    	klasifikasi_short:{
            fields:[
                {name:'id',type:'auto'},
                {name:'kode',type:'auto'},
                {name:'klasifikasi',type:'auto'},
                {name:'active',type:'auto'},
                {name:'waktu_aktif',type:'auto'},
                {name:'waktu_inaktif',type:'auto'},
                {name:'keterangan',type:'auto'}
            ],
            autoLoad:true,
            pageSize:7,
            proxy:{
                type:'rest',
                api: {
                        create  : serverURL+'referensi/klasifikasi_short',
                        update  : serverURL+'referensi/klasifikasi_short',
                        destroy : serverURL+'referensi/klasifikasi_short'
                },        
                url: serverURL+'referensi/klasifikasi_short.json',
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
        klasifikasi:{
    		fields:[
    			{name:'id',type:'auto'},
    			{name:'kode',type:'auto'},
    			{name:'klasifikasi',type:'auto'},
    			{name:'active',type:'auto'},
    			{name:'waktu_aktif',type:'auto'},
    			{name:'waktu_inaktif',type:'auto'},
    			{name:'keterangan',type:'auto'}
    		],
    		autoLoad:true,
    		pageSize:7,
    		proxy:{
    			type:'rest',
                extraParams:{
                  primer : '{primer_code}'
                },
                api: {
                        create  : serverURL+'referensi/klasifikasi',
                        update  : serverURL+'referensi/klasifikasi',
                        destroy : serverURL+'referensi/klasifikasi'
                },        
                url: serverURL+'referensi/klasifikasi.json',
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
    	jenisDokumen:{
    		fields: [
                {name: 'id', type:'auto'},
                {name: 'kode_jenis', type:'auto'},
                {name: 'jenis', type:'auto'},
                {name: 'active', type:'auto'}
            ],
            autoLoad:true,
            pageSize:7,
            proxy: {
                type: 'rest',
                timeout: 20000000,
                api: {
                        create  : serverURL+'referensi/jenis',
                        update  : serverURL+'referensi/jenis',
                        destroy : serverURL+'referensi/jenis'
                },        
                url: serverURL+'referensi/jenis.json',
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
    	pengguna:{
            fields: [
                {name: 'id', type:'auto'},
                {name: 'id_jabatan', type:'auto'},
                {name: 'fullname', type:'auto'},
                {name: 'jabatan', type:'auto'},
                {name: 'kode_jabatan', type:'auto'},
                {name: 'id_atasan', type:'auto'}
            ],
            autoLoad:true,
            pageSize:7,
            proxy: {
                type: 'rest',
                timeout: 20000000,
                extraParams:{
                  tipe_request : 'all'
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
        pengguna_ttd:{
            fields: [
                {name: 'id', type:'auto'},
                {name: 'id_jabatan', type:'auto'},
                {name: 'fullname', type:'auto'},
                {name: 'jabatan', type:'auto'},
                {name: 'kode_jabatan', type:'auto'},
                {name: 'id_atasan', type:'auto'}
            ],
            autoLoad:true,
            pageSize:10,
            proxy: {
                type: 'rest',
                timeout: 20000000,
                extraParams:{
                  tipe_request : 'penandatangan'
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
        filesurat: {
            pageSize:5,
            autoLoad:true,
            fields: [
                {name: 'id', type:'string'}, 
                {name: 'tu_surat_id', type:'string'},  
                {name: 'nama_file', type:'string'},  
                {name: 'stored', type:'string'},  
                {name: 'key', type:'string'},  
                {name: 'id_pengguna', type:'string'},  
                {name: 'lokasi', type:'string'},  
               
                {name: 'created_at', type:'date'},  
                {name: 'created_by', type:'string'},  
                {name: 'edited_at', type:'date'},  
                {name: 'edited_by', type:'string'},  
                {name: 'deleted_at', type:'date'},  
                {name: 'deleted_by', type:'string'}
            ],

            proxy: {
                type: 'rest',
                timeout: 20000000,
                extraParams:{
                    tu_surat_id:'{id_surat}'
                },
                api: {
                        create  : serverURL+'surat/filesurat',
                        update  : serverURL+'surat/filesurat',
                        destroy : serverURL+'surat/filesurat'
                },        
                url: serverURL+'surat/filesurat.json',
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
            }/*,
            filters: [{
                property: 'tu_surat_id',
                value: '{id_surat}'
            }]*/
        },
        bawahan: {
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
                    tipe_request : 'bawahan_3'
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
        atasan_nama: {
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
                    tipe_request : 'atasan_nama'
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
        jns_disposisi: {
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
                
                timeout: 20000000,
                api: {
                        create  : serverURL+'referensi/jnsdisposisi',
                        update  : serverURL+'referensi/jnsdisposisi',
                        destroy : serverURL+'referensi/jnsdisposisi'
                },        
                url: serverURL+'referensi/jnsdisposisi.json',
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
