
Ext.define("Docs.view.nodin.grid.OprMasuk",{
    extend: "Ext.grid.Panel",
    requires:[
        "Docs.view.nodin.grid.OprMasukController",
        "Docs.view.nodin.grid.OprMasukModel"
    ],
    controller: "nodin-grid-oprmasuk",
    viewModel: {
        type: "nodin-grid-oprmasuk"
    },
    xtype:"nodin.grid.OprMasuk",
    iconCls:'icon_nodin_unverified_16',
    title:"Nota Dinas",
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
            reference:'pagingunclasified',
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
                        store:'{datasurat}'
                    }
                }
            ]
        }
    ],
    columns: [
       /* {width:24,menuDisabled:true,resizable:false,
            renderer:function(value, metadata, record, rowIndex,colIndex, store){
                //console.log(record.data.urgensi);
                var important;
                if (record.data.urgensi == 'penting'){
                    important = "<img src='resources/icons/ic_important_12px.png' />"
                } else if (record.data.urgensi == 'sangatpenting'){
                    important = "<img src='resources/icons/ic_v_important_12px.png' />"
                }else{
                    important = "<img src='resources/icons/ic_regular_12px.png' />"
                }
                
                //important = "<img src='resources/icons/ic_v_important_12px.png' />"
                return important;
            }
        },*/
        {text:'Pengirim',dataIndex:'kode_pengirim',flex:1,
                renderer:function(value, metadata, record, rowIndex,colIndex, store){

                if (record.data.dibaca == 0){
                    metadata.style = 'font-weight:bold'
                }
                
                metadata.tdAttr='data-qtip="'+record.data.history+'" data-qtitle="Riwayat" data-qwidth="500"';
                return value;
        }},
       {text:'Pengirim',dataIndex:'nomor_surat',flex:4,
            renderer:function(value, metadata, record, rowIndex,colIndex, store){

                if (record.data.dibaca == 0){
                    metadata.style = 'font-weight:bold'
                }

                metadata.tdAttr='data-qtip="'+record.data.history+'" data-qtitle="Riwayat" data-qwidth="500"';
                dataShow = "<div> Perihal:"+record.data.perihal+" | Nota Tgl:"+Ext.util.Format.date(record.data.tgl_surat,'d-m-Y')+"</div><div>"+record.data.isi_nota+"</div>"

                return dataShow;
        }},
        {
            width:45,menuDisabled:true,resizable:false,
            renderer:function(value, metadata, record, rowIndex,colIndex, store){
                var verified;
                if (record.data.verified == 0){
                    verified = "<img src='resources/icons/icon_unverified_16.png' />"
                }else{
                    verified = "<img src='resources/icons/icon_verified_16.png' />"
                }

                return verified;
            }
        }
    ],
    listeners:{
        itemclick:'onItemClick',
        itemdblclick:'onItemDblClick',
        itemcontextmenu:'onItemContextMenu',
        containerclick:'onContainerClick',
        activate:'activate',
        render:'render'
    }
});
