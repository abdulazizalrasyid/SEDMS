
Ext.define("Docs.view.arsip.grid.ArchivedDraft",{
    extend: "Ext.grid.Panel",
    requires:[
        "Docs.view.arsip.grid.ArchivedDraftController",
        "Docs.view.arsip.grid.ArchivedDraftModel",
        'Docs.view.arsip.window.ArchivedDraft'
    ],
    controller: "arsip-grid-archiveddraft",
    viewModel: {
        type: "arsip-grid-archiveddraft"
    },
    viewConfig:{
        loadMask:false
    },
    xtype:"arsip.grid.ArchivedDraft",
    title:'Arsip Konsep',
    iconCls:'icon_archived_16',
    bind:{
        store:'{daftar_archived}'
    },
    hideHeaders:true,
    dockedItems:[
        {
            dock:'bottom',
            xtype:'MyPagingToolbar',
            reference:'paging_archived',
            bind:{
                store:'{daftar_archived}'
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
                },'->',{
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
                        store:'{daftar_suratmasuk}'
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
        render:'render'
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
