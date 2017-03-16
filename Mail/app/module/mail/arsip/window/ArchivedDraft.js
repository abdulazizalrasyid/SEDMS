
Ext.define("Docs.view.arsip.window.ArchivedDraft",{
    extend: "Ext.window.Window",
    requires:[
        "Docs.view.arsip.window.ArchivedDraftController",
        "Docs.view.arsip.window.ArchivedDraftModel"
    ],
    controller: "arsip-window-archiveddraft",
    viewModel: {
        type: "arsip-window-archiveddraft"
    },
    xtype:"arsip.window.ArchivedDraft",
    width:600,
    height:400,
    modal:true,
    layout:'fit',
    
    listeners:{
        beforeclose:'onBeforeClose'
        //activate:'onActivate'
    },
    items:{
        xtype:'tabpanel',
        defaults:{
            margin:5
        },
        items:[{
            iconCls:'icon_archived_16',
            title:'Detail',
            xtype:'form',
            itemId:'form_surat',
            reference:'form_surat',
            layout: 'anchor',
            dockedItems:[
                {
                    dock:'top',
                    xtype:'toolbar',
                    items:[
                        {
                            boxLabel : 'Arsipkan',
                            name : 'archived',
                            inputValue: '1',
                            id : 'proses',
                            reference : 'archived',
                            xtype : 'checkboxfield'
                        },'->',
                        {
                            text:'Simpan',iconCls:'icon_send_16',  
                            bind:{
                                hidden: '{archived.checked}'
                            },                               
                            listeners:{
                                click:'onSimpanArsip'
                            }
                        }
                    ]
                }
            ],
            defaults:{
                layout: 'anchor',
                border:false,
                defaults: {
                    anchor: '100%',
                    padding:'0 5px 0 5px'
                }/*,
                bodyStyle:{
                    backgroundColor:'#A0A8D5'
                }*/
            },
            items:[
                {
                    xtype:'hiddenfield',
                    name:'id_klasifikasi',
                    submitValue:false,
                    listeners:{
                        change:'onChangeKlasifikasi'
                    }
                },{
                    xtype:'hiddenfield',
                    name:'id'
                }, {
                    xtype:'hiddenfield',
                    name:'uniquecode',
                    listeners:{
                        change:'onChangeUniquecode'
                    }
                },{
                    //border:true,
                    xtype:'panel',
                    margin:'5px 0 0 0',
                    defaults:{
                        labelWidth: 150,
                        padding:'2px 4px 2px 4px'
                    },
                    items:[
                        {
                            xtype:'displayfield',
                            fieldLabel:'Pembuat Draft',
                            name:'pembuat'
                        },{
                            fieldLabel:'Disetujui',
                            name:'pemfinal',
                            xtype:'displayfield'
                        },{
                            flex: 1,
                            xtype:'displayfield',
                            fieldLabel:'Penandatangan',
                            name:'penandatangan'
                        },{
                            flex: 1,
                            xtype:'displayfield',
                            fieldLabel:'Perihal',
                            name:'perihal'
                        },{
                            flex: 1,
                            margin:'0 0 0 5px',
                            fieldLabel:'Tanggal Disetujui',
                            name:'created_on',
                            reference:'created_on',
                            xtype:'displayfield',
                            renderer:function(value){
                                return Ext.util.Format.date(value,'d/m/Y')
                            }
                                
                        }
                    ]
                }   
            ]            
        },{
            iconCls:'icon_history_16',
            title:'Riwayat Konsep',
            xtype:'grid',
            reference:'riwayat_dokumen',
            listeners:{
                //activate:'activate'
            },
            hideHeaders:true,
            bind:{
                store:'{daftar_riwayat}'
            },
            dockedItems:[
                {
                    dock:'bottom',
                    xtype:'MyPagingToolbar',
                    reference:'paging_suratkeluar',
                    bind:{
                        store:'{daftar_riwayat}'
                    }
                }
            ],
            columns: [
                {
                    width:100,menuDisabled:true,resizable:false,dataIndex: 'tanggal',
                    renderer:function(value, metadata, record, rowIndex,colIndex, store){
                        dataShow = Ext.util.Format.date(record.data.tanggal,'d-m-Y')
                        return dataShow;
                    }
                },{
                    menuDisabled:true,resizable:false,dataIndex: 'aksi' ,flex:1
                }
            ]
        },{
                    iconCls:'ic_file_download_16',
                    title:'Berkas',
                    //padding:5,
                    //xtype:'form',
                    layout: 'anchor',
                    //url:serverURL+'surat/simpan2',
                    //defaultType:'textfield',
                    //reference:'fromstage2',
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
                                store:'{file}'
                            },
                            listeners:{
                                itemdblclick:'downloadFile',
                                activate:'onShow'
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
                                    flex:2
                                },{
                                    text:'Pembuat',dataIndex:'jab_pembuat',
                                    flex:1
                                }
                            ]
                        }]
            }
        ]
    }
});
