
Ext.define("Portal.view.admin.grid.Jabatan",{
    extend: "Ext.grid.Panel",
 	requires:[
    	'Portal.view.admin.grid.JabatanController',
    	'Portal.view.admin.grid.JabatanModel'
    ],
    controller: "admin-grid-jabatan",
    viewModel: {
        type: "admin-grid-jabatan"
    },
	iconCls:'icon_setting_36',
    title:' Daftar Jabatan',
    xtype:'admin.grid.Jabatan',
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
       	{ text: 'Kode',  dataIndex: 'kode_jabatan', width:200 },
        { text: 'Jabatan', dataIndex: 'jabatan', flex: 1 },
        { text: 'Atasan', dataIndex: 'atasan' , flex: 1},
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
