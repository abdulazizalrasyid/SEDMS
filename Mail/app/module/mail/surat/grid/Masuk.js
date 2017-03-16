
Ext.define("Docs.view.surat.grid.Masuk",{
    extend: "Ext.grid.Panel",
    requires:[
        "Docs.view.surat.grid.MasukController",
        "Docs.view.surat.grid.MasukModel"
    ],
    controller: "surat-grid-masuk",
    viewModel: {
        type: "surat-grid-masuk"
    },
    title:'Surat Masuk',
    xtype:"surat.grid.Masuk",
    iconCls:'icon_inmail_16',
    bind:{
        store:'{daftar_suratmasuk}'
    },
    viewConfig:{
        loadMask:false
    },
    hideHeaders:true,
    dockedItems:[
        {
            dock:'bottom',
            xtype:'MyPagingToolbar',
            reference:'paging_suratmasuk',
            bind:{
                store:'{daftar_suratmasuk}'
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
                },'->'/*,{
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
                }*/,{
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
                    reference:'masuksearch',
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
        activate:'activate',
        render:'render'
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
            dataIndex:'asal_surat',flex:1,
            renderer:function(value, metadata, record, rowIndex,colIndex, store){
                if (record.data.dibaca == 0){
                    metadata.style = 'font-weight:bold'
                }
                
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

                return dataShow;
            }
        },
        {
            width:45,menuDisabled:true,resizable:false,
            renderer:function(value, metadata, record, rowIndex,colIndex, store){
                var didisposisi;
                if (record.data.didisposisi == 0){
                    didisposisi = "<img src='resources/icons/ic_disposisi_0_16.png' />"
                }else{
                    didisposisi = "<img src='resources/icons/ic_disposisi_1_16.png' />"
                }                
                return didisposisi;
            }
        }
    ]
});
