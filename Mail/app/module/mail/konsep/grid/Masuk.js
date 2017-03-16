
Ext.define("Docs.view.konsep.grid.Masuk",{
    extend: "Ext.grid.Panel",
    requires:[
        "Docs.view.konsep.grid.MasukController",
        "Docs.view.konsep.grid.MasukModel"
    ],
    controller: "konsep-grid-masuk",
    viewModel: {
        type: "konsep-grid-masuk"
    },
    xtype:"konsep.grid.Masuk",
    title:'Masuk',
    iconCls:'icon_draft_in_16',
    bind:{
        store:'{datasurat}'
    },
    viewConfig:{
        loadMask:false
    },
    hideHeaders:true,
    dockedItems:[
        {
            dock:'bottom',
            xtype:'MyPagingToolbar',
            reference:'paging_masuk',
            bind:{
                store:'{datasurat}'
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
                    iconCls:'icon_read_24px',
                    listeners:{
                        click:'onBtReadClick'
                    }
                },'->',/*{
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
                        store:'{datasurat}'
                    }
                }
            ]
        }
    ],
    columns: [
        {text:'Asal Surat',dataIndex:'jab_pembuat',flex:1,
                renderer:function(value, metadata, record, rowIndex,colIndex, store){

                if (record.data.dibaca == 0){
                    metadata.style = 'font-weight:bold'
                }
                dataShow = '<div>'+record.data.pembuat+'</div><div>'+record.data.jab_pembuat+'</div>'
                return dataShow;
        }},
        {text:'Pengirim',dataIndex:'nomor_surat',flex:3,
            renderer:function(value, metadata, record, rowIndex,colIndex, store){

                if (record.data.dibaca == 0){
                    metadata.style = 'font-weight:bold'
                }

                dataShow = "<div>Perihal : "+record.data.perihal+" | Tgl:"+Ext.util.Format.date(record.data.created_on,'d-m-Y')+"</div><div>"+record.data.pengantar+"</div>"

                return dataShow;
        }}
        /*{text:'Status',width:45,menuDisabled:true,resizable:false,
            renderer:function(value, metadata, record, rowIndex,colIndex, store){
                var didisposisi;
                if (record.data.didisposisi == 0){
                    didisposisi = "<img src='resources/icons/ic_disposisi_0_12.png' />"
                }else{
                    didisposisi = "<img src='resources/icons/ic_disposisi_1_12.png' />"
                }                

                var ditanggapi;
                if (record.data.ditanggapi == 0){
                    ditanggapi = "<img src='resources/icons/ic_comment_0_12.png' />"
                }else{
                    ditanggapi = "<img src='resources/icons/ic_comment_1_12.png' />"
                }
                return didisposisi+' '+ditanggapi;
            }
        }*/

    ],
    listeners:{
        itemclick:'onItemClick',
        itemdblclick:'onItemDblClick',
        itemcontextmenu:'onItemContextMenu',
        containerclick:'onContainerClick',
        beforeactivate:'onBeforeActivate',
        render:'render'
    }
});
