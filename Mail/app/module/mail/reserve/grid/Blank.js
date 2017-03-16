
Ext.define("Docs.view.reserve.grid.Blank",{
    extend: "Ext.grid.Panel",
    requires:[
        "Docs.view.reserve.grid.BlankController",
        "Docs.view.reserve.grid.BlankModel"
    ],
    controller: "reserve-grid-blank",
    viewModel: {
        type: "reserve-grid-blank"
    },
    xtype:"reserve.grid.Blank",
    iconCls: "icon_date_16",
    title:'Daftar Reservasi',
    bind:{
        store:'{daftar_suratblank}'
    },
    viewConfig:{
        loadMask:false
    },
    dockedItems:[
        {
            dock:'bottom',
            xtype:'MyPagingToolbar',
            reference:'paging_suratblank',
            bind:{
                store:'{daftar_suratblank}'
            }
        }
    ],
    listeners:{
        itemclick:'onItemClick',
        itemdblclick:'onItemDblClick',
        itemcontextmenu:'onItemContextMenu',
        containerclick:'onContainerClick',
        activate:'activate'
        //render:'render'
    },
    columns: [
        {dataIndex:'nomor_urut',flex:1,text:'No Surat'},
        {dataIndex:'jenis_lengkap',flex:3, text:'Jenis Surat'},
        {dataIndex:'unit_pemrakarsa',flex:2, text:'Unit Kerja Pemrakarsa'},
        {dataIndex:'created_on',flex:2, text:'Tanggal',
        renderer:function(value){
            return Ext.util.Format.date(value,'d/m/Y')
        }}
    ]
});
