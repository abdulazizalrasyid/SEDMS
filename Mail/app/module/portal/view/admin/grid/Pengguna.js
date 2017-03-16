
Ext.define("Portal.view.admin.grid.Pengguna",{
    extend: "Ext.grid.Panel",
 	requires:[
    	'Portal.view.admin.grid.PenggunaController',
    	'Portal.view.admin.grid.PenggunaModel'
    ],
    controller: "admin-grid-pengguna",
    viewModel: {
        type: "admin-grid-pengguna"
    },
	iconCls:'icon_setting_36',
    title:' Daftar Pengguna',
    xtype:'admin.grid.Pengguna',
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
    // `id`,  `username`,  `fullname`,  `passwd`,  `type`,  `id_jabatan`,  `id_unker`,  `active`, 
    // `login_terakhir`,  `login_machine`,  `created_on`,  `created_by`,  `edited_on`,  `edited_by`,  `deleted_on`,  `deleted_by`
       	{ text: 'Nama Pengguna',  dataIndex: 'username', flex: 1},
        { text: 'Nama Lengkap', dataIndex: 'fullname', flex: 2 },
        { text: 'Tipe', dataIndex: 'type' , flex: 1},
        { text: 'Jabatan', dataIndex: 'jabatan' , flex: 2},
        { text: 'Login Terakhir', dataIndex: 'login_terakhir' , flex: 1},
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
