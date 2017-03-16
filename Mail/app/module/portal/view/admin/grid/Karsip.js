
Ext.define("Portal.view.admin.grid.Karsip",{
    extend: "Ext.grid.Panel",
 	requires:[
    	'Portal.view.admin.grid.KarsipController',
    	'Portal.view.admin.grid.KarsipModel'
    ],
    controller: "admin-grid-karsip",
    viewModel: {
        type: "admin-grid-karsip"
    },
	iconCls:'icon_setting_36',
    title:' Daftar Klasifikasi Arsip',
    xtype:'admin.grid.Karsip',
    bind:{
		store:'{daftarjabatan}'
    },
    viewConfig:{
        loadMask:false
    },
      dockedItems:[
        {
            dock:'bottom',
            xtype:'MyPagingToolbar',
            bind:{
                store:'{daftarjabatan}'
            }
        },
        {
            dock:'top',
            xtype:'toolbar',
            items:[
                {
                    reference:'btAdd',
                    hidden:false,
                    plugins: 'responsive',
                    responsiveConfig: {
                         'width > 910': {
                             text:'Tambah Data',height:24,
                             width:150
                         },
                         'width <= 910': {
                             text:'',
                             height:36,
                             width:34
                         }
                    },
                    iconCls:'icon_read_24px',
                    listeners:{
                        click:'openAddWindow'
                    }
                },'->',{
                    reference:'btPrint',
                    iconCls:'icon_print_16px',
                    plugins: 'responsive',
                    responsiveConfig: {
                         'width > 910': {
                             text:'Cetak daftar',height:24,
                             width:130
                         },
                         'width <= 910': {
                             text:'',
                             height:36,
                             width:34
                         }
                    },                    
                    listeners:{
                        click:'onBtPrintClick'
                    }
                },{
                    plugins: 'responsive',
                    responsiveConfig: {
                         'width > 1100': {
                             width: 300
                         },
                         'width <= 1100': {
                             width: 150
                         }
                    },                    
                    name:'query',
                    labelWidth: 50,
                    xtype: 'searchfield',
                    reference:'searchfield',
                    bind:{
                        store:'{datasurat}'
                    }
                }
            ]
        }
    ],
    columns: [
// `id`,  `kode`,  `klasifikasi`,  `active`,  `waktu_aktif`,  `waktu_inaktif`,  
//LEFT(`keterangan`, 256),  `created_on`,  `created_by`,  `edited_on`,  `edited_by`,  `deleted_on`,  `deleted_by`
        { text: 'Kode', dataIndex: 'kode', flex: 1 },
        { text: 'Klasifikasi', dataIndex: 'klasifikasi', flex: 3 },
       /* { text: 'Waktu Aktif(th)', dataIndex: 'waktu_aktif', flex: 1 },
        { text: 'Waktu Inaktif(th)', dataIndex: 'waktu_inaktif', flex: 1 },*/
        { text: 'Keterangan', dataIndex: 'keterangan', flex: 3 },
        { text: 'Aktif', dataIndex: 'active', width:75,
            renderer:function(value, metadata, record, rowIndex,colIndex, store)
            {
                    var checked;
                    if (record.data.active == 1){
                        checked = "<img src='resources/icons/icon_checked.png' />"
                    } else {
                        checked = ""
                    }
                    return checked
            }
        }
     ],
     listeners:{
        itemclick:'onItemClick',
        itemdblclick:'onItemDblClick',
        itemcontextmenu:'onItemContextMenu',
        containerclick:'onContainerClick'
    }
});
