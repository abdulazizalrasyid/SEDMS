
Ext.define("Docs.view.surat.grid.OprKeluar",{
    extend: "Ext.grid.Panel",
    requires:[
        "Docs.view.surat.grid.OprKeluarController",
        "Docs.view.surat.grid.OprKeluarModel"
    ],
    controller: "surat-grid-oprkeluar",
    viewModel: {
        type: "surat-grid-oprkeluar"
    },
    title:'Surat Keluar',
    xtype:"surat.grid.OprKeluar",
    iconCls:'icon_outmail_16',
    reference:'OprKeluar',
    bind:{
        store:'{daftar_suratkeluar}'
    },
    viewConfig:{
        loadMask:false
    },
    hideHeaders:true,
    dockedItems:[
        {
            dock:'bottom',
            xtype:'MyPagingToolbar',
            reference:'paging_suratkeluar'
            /*bind:{
                store:'{daftar_suratkeluar}'
            }*/
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
                    reference:'searchkeluar'
                    
                }
            ]
        }
    ],
    listeners:{
        itemclick:'onItemClick',
        itemdblclick:'onItemDblClick',
        itemcontextmenu:'onItemContextMenu',
        containerclick:'onContainerClick',
        activate:'activate',
        render:'render',
        afterrender:'afterrender'
    },
    columns: [
       {
            width:24,menuDisabled:true,resizable:false,
            renderer:function(value, metadata, record, rowIndex,colIndex, store)
            {

                    var urgensi;
                    if (record.data.urgensi == 'penting'){
                        urgensi = "<img src='resources/icons/ic_important_12px.png' />"
                    } else if (record.data.urgensi == 'sangatpenting'){
                        urgensi = "<img src='resources/icons/ic_v_important_12px.png' />"
                    }else{
                        urgensi = " "
                    }
                    return urgensi;
            }
       },
       {
            dataIndex:'tujuan_surat',flex:1,
            renderer:function(value, metadata, record, rowIndex,colIndex, store){
                if (record.data.dibaca == 0){
                    metadata.style = 'font-weight:bold'
                }
                metadata.tdAttr='data-qtip="'+record.data.history+'" data-qtitle="Riwayat" data-qwidth="500"';

                return value;
            }
        },
        {
            dataIndex:'nomor_surat',flex:4,
            renderer:function(value, metadata, record, rowIndex,colIndex, store){
                if (record.data.dibaca == 0){
                    metadata.style = 'font-weight:bold'
                }

                dataShow = "<div> No.:"+record.data.nomor_surat+" | "+record.data.perihal+" | Tgl:"+Ext.util.Format.date(record.data.tgl_surat,'d-m-Y')+"</div><div>"+record.data.ringkasan+"</div>"
                metadata.tdAttr='data-qtip="'+record.data.history+'" data-qtitle="Riwayat" data-qwidth="500"';

                return dataShow;
            }
        }/*,
        {
            width:45,menuDisabled:true,resizable:false,
            renderer:function(value, metadata, record, rowIndex,colIndex, store){
                var didisposisi;
                if (record.data.didisposisi == 0){
                    didisposisi = "<img src='resources/icons/ic_disposisi_0_12.png' />"
                }else{
                    didisposisi = "<img src='resources/icons/ic_disposisi_1_12.png' />"
                }                
                return didisposisi;
            }
        }*/
    ]
});
