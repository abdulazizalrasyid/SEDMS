
Ext.define("Docs.view.surat.window.Keluar",{
    extend: "Ext.window.Window",
    requires:[
        "Docs.view.surat.window.KeluarController",
        "Docs.view.surat.window.KeluarModel",
        'Docs.view.base.DetailDisplayKeluar',
        'Docs.view.base.MetadataDisplayKeluar'
    ],
    controller: "surat-window-keluar",
    viewModel: {
        type: "surat-window-keluar"
    },
    xtype:"surat.window.Keluar",
    width:800,
    height:585,
    modal:true,
    resizable:false,
    listeners:{
        beforeclose:'beforeclose'
    },
    items:[
        {
            xtype:'tabpanel',
            items:[
                {
                    padding:5,
                    iconCls:'icon_read_16',
                    title:'Detail Surat',
                    xtype:'form',
                    layout: 'anchor',
                    itemId:'form_surat',
                    url:serverURL+'surat/update',
                    defaultType:'textfield',
                    reference:'fromstage1',
                    defaults:{
                        layout: 'anchor',
                        border:true,
                        defaults: {
                            anchor: '100%',
                            labelWidth:150,
                            padding:7
                        },
                        bodyStyle:{
                            backgroundColor:'#A0A8D5'
                        }
                    },
                    dockedItems:[
                        {
                            dock:'top',
                            xtype:'toolbar',
                            items:[
                               {
                                    reference:'id_surat',
                                    xtype:'hiddenfield',
                                    name:'id',
                                    listeners:{
                                        change:'initIdSurat'
                                    }
                                },{
                                    reference:'dibaca',
                                    xtype:'hiddenfield',
                                    name:'dibaca'
                                },'->',{
                                    text:'Cetak Pengantar',iconCls:'icon_print_16',
                                    listeners:{
                                        click:'onClickCetak'
                                    }
                                }
                            ]
                        }
                    ],
                    items:[
                        {
                            xtype:'base.MetadataDisplayKeluar'
                        },{
                            xtype:'base.DetailDisplayKeluar'
                        }
                    ]
                },{
                    iconCls:'ic_file_download_16',
                    title:'Berkas',
                    padding:5,
                    xtype:'form',
                    layout: 'anchor',
                    url:serverURL+'surat/simpan2',
                    defaultType:'textfield',
                    reference:'fromstage2',
                    defaults:{
                        layout: 'anchor',
                        border:true,
                        defaults: {
                            anchor: '100%',
                            labelWidth:150,
                            padding:10
                        },
                        bodyStyle:{
                            backgroundColor:'#A0A8D5'
                        }
                    },
                    items:[ 
                    {
                            xtype:'grid',
                            defaults: {
                                anchor: '100%',
                                padding:0
                            },
                            width:'100%',
                            reference:'gridfile',
                            bind:{
                                store:'{filesurat}'
                            },
                            listeners:{
                                itemdblclick:'downloadFile'
                            },
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
                                    flex:1
                                }
                            ]
                        }]
                }
            ]
        }
    ]
});
