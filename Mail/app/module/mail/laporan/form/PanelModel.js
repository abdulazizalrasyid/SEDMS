Ext.define('Docs.view.laporan.form.PanelModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.laporan-form-panel',
    stores: {
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
                /*extraParams:{
                  primer : '{primer_code}'
                },*/
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
    }

});
