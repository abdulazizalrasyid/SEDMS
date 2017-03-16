
Ext.define("Docs.view.disposisi.grid.Masuk",{
    extend: "Ext.grid.Panel",
    requires:[
        "Docs.view.disposisi.grid.MasukController",
        "Docs.view.disposisi.grid.MasukModel"
    ],
    controller: "disposisi-grid-masuk",
    viewModel: {
        type: "disposisi-grid-masuk"
    },
    xtype:"disposisi.grid.Masuk",
    title:'Masuk',
    iconCls:'icon_disposisi_in_16',
    bind:{
        store:'{disposisi_masuk}'
    },
    viewConfig:{
        loadMask:false
    },
    hideHeaders:true,
    dockedItems:[
        {
            dock:'bottom',
            xtype:'MyPagingToolbar',
            bind:{
                store:'{disposisi_masuk}'
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
                    iconCls:'icon_read_16',
                    listeners:{
                        click:'onBtReadClick'
                    }
                },/*{
                    reference:'btPrintPengantar',
                    hidden:true,
                    iconCls:'icon_print_16px',
                    plugins: 'responsive',
                    responsiveConfig: {
                         'width > 910': {
                             text:'Cetak Pengantar',height:24,
                             width:150
                         },
                         'width <= 910': {
                             text:'',
                             height:36,
                             width:34
                         }
                    },                    
                    listeners:{
                        click:'onBtPrintPengantarClick'
                    }
                },*/{
                    reference:'btDisposisi',
                    hidden:true,
                    iconCls:'icon_disposisi_16',
                    plugins: 'responsive',
                    responsiveConfig: {
                         'width > 910': {
                             text:'Disposisi',height:24,
                             width:100
                         },
                         'width <= 910': {
                             text:'',
                             height:36,
                             width:34
                         }
                    },
                    listeners:{
                        click:'onBtDisposisiClick'
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
                        store:'{disposisi_masuk}'
                    }
                }
            ]
        }
    ],
    columns: [
        {text:'Alamat Surat',dataIndex:'pengirim',flex:1,
                renderer:function(value, metadata, record, rowIndex,colIndex, store){

                if (record.data.dibaca == 0){
                    metadata.style = 'font-weight:bold'
                }
                
                return value;
        }},
        {text:'Keterangan',dataIndex:'nomor_surat',flex:5,
            renderer:function(value, metadata, record, rowIndex,colIndex, store){

                if (record.data.dibaca == 0){
                    metadata.style = 'font-weight:bold'
                }
                dataShow = "<div>Tgl:"+Ext.util.Format.date(record.data.created_on,'d-m-Y')+"</div><div>Disposisi:"+record.data.jns_disposisi_long+"</div><div>Keterangan:"+record.data.isi_disposisi+"</div>"

                return dataShow;
        }},
        {text:'Keterangan',flex:2,
            renderer:function(value, metadata, record, rowIndex,colIndex, store){

                if (record.data.dibaca == 0){
                    metadata.style = 'font-weight:bold'
                }
                dataShow = "<div>No. Surat :"+record.data.nomor_surat+" </div><div>Asal surat:"+record.data.asal_surat+"</div><div> Perihal:"+record.data.perihal+"</div>"

                return dataShow;
        }}
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
