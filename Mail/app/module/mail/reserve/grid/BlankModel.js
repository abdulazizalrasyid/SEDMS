Ext.define('Docs.view.reserve.grid.BlankModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reserve-grid-blank',
    stores:{
    	daftar_suratblank:{
    		fields: [ 		
                {name: 'id', type:'auto'}
            ],
            autoLoad:true,
            pageSize:10,
            proxy: {
                type: 'rest',
                extraParams:{
	            	type:'reservasi'
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
