
Ext.define("Docs.view.konsep.window.Final",{
    extend: "Ext.window.Window",
    requires:[
        "Docs.view.konsep.window.FinalController",
        "Docs.view.konsep.window.FinalModel"
    ],
    controller: "konsep-window-final",
    viewModel: {
        type: "konsep-window-final"
    },
    xtype:"konsep.window.Final",
    width:600,
    modal:true,
    //height:400,
    iconCls:'icon_draft_36',
    title:'Konsep Final',
    layout:'fit',
    listeners:{
        beforeclose:'beforeclose'
    },
    items:[
        {
            layout: 'anchor',
            defaultType:'textfield',
            reference:'myFieldContainers',
            border:true,
            defaults: {
                anchor: '100%',
                labelWidth:150,
                padding:5
            },
            bodyStyle:{
                backgroundColor:'#A0A8D5'
            },
            items:[
                {
                    xtype:'form',
                    url:serverURL+'draft/simpan',
                    itemId:'draft',
                    width:'100%',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%',
                        labelWidth:150,
                        padding:0
                    },
                    bodyStyle:{
                        backgroundColor:'#A0A8D5'
                    },                    
                    dockedItems:[
                        {
                            dock:'top',
                            xtype:'toolbar',
                            items:[
                                {
                                    boxLabel : 'Sudah diproses',
                                    name : 'diproses',
                                    inputValue: '1',
                                    id : 'proses',
                                    reference : 'diproses',
                                    xtype : 'checkboxfield'
                                },{
                                    xtype:'displayfield',
                                    reference:'selanjutnya',
                                    name:'selanjutnya',
                                    renderer:function(value){
                                        if (value = 'surat_keluar'){
                                            return 'Surat Keluar'
                                        }else if (value = 'nota'){
                                            return 'Nota Dinas'
                                        }
                                    }
                                },'->',
                                {
                                    text:'Simpan',iconCls:'icon_send_16',  
                                    bind:{
                                        hidden: '{!diproses.checked}'
                                    },                               
                                    listeners:{
                                        click:'onClickProses'
                                    }
                                }
                            ]
                        }
                    ],
                    items:[
                        {
                            xtype:'hiddenfield',
                            reference:'id_jab_pembuat',
                            name:'id_jab_pembuat'
                            
                        },{
                            xtype:'hiddenfield',
                            reference:'uniquecode',
                            name:'uniquecode',
                            listeners:{
                                change:'initIdUnique'
                            }
                        },{
                            reference:'id_surat',
                            xtype:'hiddenfield',
                            itemId:'id_surat',
                            name:'id',
                            listeners:{
                                change:'initIdSurat'
                            }
                        },{
                            xtype:'hiddenfield',
                            reference:'created_by',
                            name:'created_by'
                        },{
                            xtype:'hiddenfield',
                            reference:'init_by',
                            name:'init_by'
                        },{
                            fieldLabel:'Dikirim Oleh',
                            xtype:'displayfield',
                            name:'pembuat_plus_jab'
                        },{
                            fieldLabel:'Perihal',
                            name:'perihal',
                            reference:'perihal',
                            xtype:'displayfield'
                        },{
                            fieldLabel:'Penandatangan',
                            name:'jab_penandatangan',
                            reference:'jab_penandatangan',
                            xtype:'displayfield'
                        },{
                            fieldLabel:'Pengantar',
                            name:'pengantar',
                            xtype:'displayfield',
                            height:50
                        }
                    ]
                },{
                    xtype:'container',
                    layout: 'hbox', 
                    items:[
                        {
                            xtype:'grid',
                            flex:1,
                            reference:'filegrid',
                            bind:{
                                store:'{filesurat}'
                            },
                            listeners:{
                                itemdblclick:'downloadFile'
                            },
                            hideHeaders:true,
                            columns:[
                                {
                                    width:30,
                                    renderer:function(value, metadata, record, rowIndex,colIndex, store){
                                        var dibaca;
                                        dibaca = "<img src='resources/icons/ic_file_download_12px.png' />";
                                        return dibaca;
                                    }
                                },{
                                    text:'File Lampiran',dataIndex:'nama_file',
                                    flex:3
                                },{
                                    text:'Oleh',dataIndex:'jab_pembuat',
                                    flex:1,
                                    renderer:function(value, metadata, record, rowIndex,colIndex, store){
                                        return record.data.pembuat_plus_jab;
                                    }
                                },{
                                    text:'Tanggal',dataIndex:'created_on',
                                    flex:1,
                                    renderer:function(value){
                                          return Ext.util.Format.date(value,'d/m/Y')
                                    }
                                }
                            ]
                        },{
                            xtype:'button',
                            iconCls:'icon_history_16',
                            margin:'0 0 0 2px',
                            //text:'File sejarah konsep',
                            tooltip:'Lihat sejarah file konsep',
                            listeners:{
                                click:'filehistory'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
