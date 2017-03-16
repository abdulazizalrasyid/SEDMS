
Ext.define("Docs.view.konsep.grid.Final",{
    extend: "Ext.grid.Panel",
    requires:[
        "Docs.view.konsep.grid.FinalController",
        "Docs.view.konsep.grid.FinalModel"
    ],
    controller: "konsep-grid-final",
    viewModel: {
        type: "konsep-grid-final"
    },
    xtype:"konsep.grid.Final",
    html: "Hello, World!!",
    title:'Final',
    iconCls:'icon_draft_final_16',
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
            reference:'paging_final',
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
                             height:36,
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
                             height:36,
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
                        store:'{nodinkeluar}'
                    }
                }
            ]
        }
    ],
    columns: [
        {width:24,menuDisabled:true,resizable:false,
            renderer:function(value, metadata, record, rowIndex,colIndex, store){
                //console.log(record.data.urgensi);
                var checked;
                if (record.data.diproses == 1){
                    checked = "<img src='resources/icons/icon_checked.png' />"
                } else {
                    checked = ""
                }
                return checked;
            }
        },
        {text:'Pengirim',dataIndex:'jab_pembuat',flex:1,
                renderer:function(value, metadata, record, rowIndex,colIndex, store){
                if (record.data.diproses == 0 || record.data.diproses == null){
                    metadata.style = 'font-weight:bold'
                }
                metadata.tdAttr='data-qtip="'+record.data.history+'" data-qtitle="Riwayat" data-qwidth="500"';
                var tampil = record.data.pembuat+"</br>"+record.data.jab_pembuat; 
                return tampil;
        }},
       {text:'Detail',dataIndex:'nomor_surat',flex:4,
            renderer:function(value, metadata, record, rowIndex,colIndex, store){
                //console.log(record.data.diproses);
                if (record.data.diproses == 0 || record.data.diproses == null){
                    metadata.style = 'font-weight:bold'
                }

                dataShow = "<div> Perihal:"+record.data.perihal+" | Nota Tgl:"+Ext.util.Format.date(record.data.created_on,'d-m-Y')+"</div><div>"+record.data.pengantar+"</div>"
                
                metadata.tdAttr='data-qtip="'+record.data.history+'" data-qtitle="Riwayat" data-qwidth="500"';

                return dataShow;
        }}/*,
        {text:'Status',width:45,menuDisabled:true,resizable:false,
            renderer:function(value, metadata, record, rowIndex,colIndex, store){
                         

                var dibaca;
                if (record.data.dibaca == null){
                    dibaca = "<img src='resources/icons/ic_read_0_12.png' />"
                }else{
                    dibaca = "<img src='resources/icons/ic_read_1_12.png' />"
                }
                return dibaca;
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
