
Ext.define("Docs.view.arsip.grid.UnarchivedDraft",{
    extend: "Ext.grid.Panel",
    requires:[
        "Docs.view.arsip.grid.UnarchivedDraftController",
        "Docs.view.arsip.grid.UnarchivedDraftModel",
        'Docs.view.arsip.window.UnarchivedDraft'
    ],
    controller: "arsip-grid-unarchiveddraft",
    viewModel: {
        type: "arsip-grid-unarchiveddraft"
    },
    viewConfig:{
        loadMask:false
    },
    xtype:"arsip.grid.UnarchivedDraft",
    title:'Konsep Belum diarsipkan',
    iconCls:'icon_unarchived_16',
    bind:{
        store:'{daftar_unarchived}'
    },
    hideHeaders:true,
    dockedItems:[
        {
            dock:'bottom',
            xtype:'MyPagingToolbar',
            reference:'paging_unarchived',
            bind:{
                store:'{daftar_unarchived}'
            }
        },
        {
            dock:'top',
            xtype:'toolbar',
            items:[
                {
                    reference:'btRead',
                    hidden:true,
                    plugins: 'responsive',
                    responsiveConfig: {
                         'width > 910': {
                             text:'Baca Detail',height:24,
                             width:100
                         },
                         'width <= 910': {
                             text:'',
                             width:34
                         }
                    },
                    iconCls:'icon_read_16',
                    listeners:{
                        click:'onBtReadClick'
                    }
                },'->',/*{
                    reference:'btPrint',
                    iconCls:'icon_print_16',
                    plugins: 'responsive',
                    responsiveConfig: {
                         'width > 910': {
                             text:'Cetak daftar',height:24,
                             width:130
                         },
                         'width <= 910': {
                             text:'',
                             width:34
                         }
                    },                    
                    listeners:{
                        click:'onBtPrintClick'
                    }
                },*/{
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
                        store:'{daftar_unarchived}'
                    }
                }
            ]
        }
    ],
    listeners:{
        itemclick:'onItemClick',
        itemdblclick:'onItemDblClick',
        itemcontextmenu:'onItemContextMenu',
        containerclick:'onContainerClick',
        beforeactivate:'onBeforeActivate',
        render:'onRender'
    },
    columns: [
       {
            dataIndex:'perihal',flex:2,
            renderer:function(value, metadata, record, rowIndex,colIndex, store){
                if (record.data.dibaca == 0){
                    metadata.style = 'font-weight:bold'
                }
                
                return value;
            }
        },
        {
            dataIndex:'nomor_surat',flex:3,
            renderer:function(value, metadata, record, rowIndex,colIndex, store){

                if (record.data.dibaca == 0){
                    metadata.style = 'font-weight:bold'
                }

                dataShow = "<div> Penandatangan.:"+record.data.penandatangan+" | Disetujui tgl:"+Ext.util.Format.date(record.data.created_on,'d-m-Y')+"</div>"

                return dataShow;
            }
        }
    ]
});
