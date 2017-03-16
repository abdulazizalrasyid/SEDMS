
Ext.define("Docs.view.nodin.grid.monitor.Keluar",{
    extend: "Ext.grid.Panel",
    requires:[
        "Docs.view.nodin.grid.monitor.KeluarController",
        "Docs.view.nodin.grid.monitor.KeluarModel"
    ],
    controller: "nodin-grid-monitor-keluar",
    viewModel: {
        type: "nodin-grid-monitor-keluar"
    },
    xtype:"nodin.grid.monitor.Keluar",
    title:"Keluar",
    iconCls:'icon_nodin_out_16',
    bind:{
        store:'{nodinkeluar}'
    },
    viewConfig:{
        loadMask:false
    },
    hideHeaders:true,
    dockedItems:[
        {
            dock:'bottom',
            xtype:'MyPagingToolbar',
            reference:'pagingnodinkeluar',
            bind:{
                store:'{nodinkeluar}'
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
        /*{width:24,menuDisabled:true,resizable:false,
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
        {text:'Pengirim',dataIndex:'kode_penerima',flex:1,
                renderer:function(value, metadata, record, rowIndex,colIndex, store){

                if (record.data.dibaca == 0){
                    metadata.style = 'font-weight:bold'
                }
                
                return value;
        }},
       {text:'Pengirim',dataIndex:'nomor_surat',flex:4,
            renderer:function(value, metadata, record, rowIndex,colIndex, store){

                if (record.data.dibaca == 0){
                    metadata.style = 'font-weight:bold'
                }

                dataShow = "<div> Perihal:"+record.data.perihal+" | Nota Tgl:"+Ext.util.Format.date(record.data.tgl_surat,'d-m-Y')+"</div><div>"+record.data.isi_nota+"</div>"

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
        activate:'activate',
        render:'render'
    }
});
