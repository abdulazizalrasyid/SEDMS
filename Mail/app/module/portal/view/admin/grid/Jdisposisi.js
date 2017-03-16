
Ext.define("Portal.view.admin.grid.Jdisposisi",{
    extend: "Ext.grid.Panel",
 	requires:[
    	'Portal.view.admin.grid.JdisposisiController',
    	'Portal.view.admin.grid.JdisposisiModel'
    ],
    controller: "admin-grid-jdisposisi",
    viewModel: {
        type: "admin-grid-jdisposisi"
    },
	iconCls:'icon_setting_36',
    title:' Daftar Jenis Disposisi',
    xtype:'admin.grid.Jdisposisi',
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

        { text: 'Jenis Disposisi', dataIndex: 'disposisi', flex: 1 },
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
