
Ext.define("Docs.view.konsep.grid.monitor.Masuk",{
    extend: "Ext.grid.Panel",
    requires:[
        "Docs.view.konsep.grid.monitor.MasukController",
        "Docs.view.konsep.grid.monitor.MasukModel"
    ],
    controller: "konsep-grid-monitor-masuk",
    viewModel: {
        type: "konsep-grid-monitor-masuk"
    },
    xtype:"konsep.grid.monitor.Masuk",
    title:'Konsep',
    iconCls:'icon_draft_36',
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
            reference:'paging',
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
                },*//*{
                    reference:'btDisposisi',
                    hidden:true,
                    iconCls:'icon_disposisi_1_16px',
                    plugins: 'responsive',
                    responsiveConfig: {
                         'width > 910': {
                             text:'Disposisi',height:24,
                             width:100
                         },
                         'width <= 910': {
                             text:'',
                             width:34
                         }
                    },
                    listeners:{
                        click:'onBtDisposisiClick'
                    }
                },{
                    reference:'btKomentar',
                    hidden:true,
                    plugins: 'responsive',
                    responsiveConfig: {
                         'width > 910': {
                             text:'Komentar',height:24,
                             width:100
                         },
                         'width <= 910': {
                             text:'',
                             width:34
                         }
                    },
                    iconCls:'icon_comment_1_16px',
                    listeners:{
                        click:'onBtKomentarClick'
                    }
                },{
                    reference:'btAgenda',
                    hidden:true,
                    iconCls:'icon_agenda_16px',
                    plugins: 'responsive',
                    responsiveConfig: {
                         'width > 910': {
                             text:'Agenda',height:24,
                             width:100
                         },
                         'width <= 910': {
                             text:'',
                             width:34
                         }
                    },                    
                    listeners:{
                        click:'onBtAgendaClick'
                    }
                },*/'->',/*{
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
        {text:'Asal Surat',dataIndex:'jab_pembuat',flex:1,
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
        beforeactivate:'onBeforeActivate'
    }
});
