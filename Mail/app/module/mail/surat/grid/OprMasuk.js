
Ext.define("Docs.view.surat.grid.OprMasuk",{
    extend: "Ext.grid.Panel",
    requires:[
        "Docs.view.surat.grid.OprMasukController",
        "Docs.view.surat.grid.OprMasukModel"
    ],
    controller: "surat-grid-oprmasuk",
    viewModel: {
        type: "surat-grid-oprmasuk"
    },
    title:'Surat Masuk',
    xtype:"surat.grid.OprMasuk",
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
                    reference:'search',
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
            dataIndex:'asal_surat',flex:2,
            renderer:function(value, metadata, record, rowIndex,colIndex, store){
                if (record.data.dibaca == 0){
                    metadata.style = 'font-weight:bold'
                }
                metadata.tdAttr='data-qtip="'+record.data.history+'" data-qtitle="Riwayat" data-qwidth="500"';
                return "Dari : "+record.data.asal_surat+"<br />Kepada :"+record.data.tujuan_surat;
            }
        },
        {
            dataIndex:'nomor_surat',flex:5,
            renderer:function(value, metadata, record, rowIndex,colIndex, store){

                if (record.data.dibaca == 0){
                    metadata.style = 'font-weight:bold'
                }

                dataShow = "<div> No.:"+record.data.nomor_surat+" | "+record.data.perihal+" | Tgl:"+Ext.util.Format.date(record.data.tgl_surat,'d-m-Y')+"</div><div>"+record.data.ringkasan+"</div>"
                metadata.tdAttr='data-qtip="'+record.data.history+'" data-qtitle="Riwayat" data-qwidth="500"';

                return dataShow;
            }
        },
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
    ]
});
