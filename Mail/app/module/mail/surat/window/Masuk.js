
Ext.define("Docs.view.surat.window.Masuk",{
    extend: "Ext.window.Window",
    requires:[
        "Docs.view.surat.window.MasukController",
        "Docs.view.surat.window.MasukModel",
        'Docs.view.base.DetailDisplayMasuk',
        'Docs.view.base.MetadataDisplayMasuk'
    ],
    controller: "surat-window-masuk",
    viewModel: {
        type: "surat-window-masuk"
    },
    xtype:"surat.window.Masuk",
    width:800,
    height:585,
    modal:true,
    resizable:false,
    layout:'fit',
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
                            xtype:'base.MetadataDisplayMasuk'
                        },{
                            xtype:'base.DetailDisplayMasuk'
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
                },{
                    title:'Disposisi',
                    iconCls:'icon_disposisi_16',
                    itemId:'formdisposisi',
                    xtype:'form',
                    //reference:'formdisposisi',
                    //url:serverURL+'disposisi/simpan',
                    layout:'anchor',
                    padding:10,
                    defaults: {
                        anchor: '100%',
                        labelWidth:150
                    },
                    items:[
                    {
                        name: 'jenis_surat',
                        reference:'jenis_surat',
                        xtype:'hiddenfield',
                        value:'surat'
                    },{
                        name: 'id_surat',
                        reference:'id_surat2',
                        xtype:'hiddenfield',
                        bind:{
                            value:'{id_surat}'
                        }
                    },{
                        name: 'id_jab_pengirim',
                        reference: 'id_jab_pengirim',
                        xtype:'hiddenfield',
                        bind:{
                            value:'{id_jabatan}'
                        }
                    },{
                        xtype:'container',
                        reference:'thefields',
                        layout:'anchor',
                        defaults: {
                            anchor: '100%',
                            labelWidth:150
                        },
                        items:[
                            {
                                xtype:'toolbar',margin:'0 0 10 0',
                                items:[
                                    '->',
                                    {
                                        text:'Kirim',iconCls:'icon_send_16',
                                        listeners:{
                                            click:'onSendDisposisi'
                                        }
                                    }
                                ]
                            },{
                                xtype: 'tagfield',
                                name:'diteruskan[]',
                                fieldLabel: 'Diteruskan kepada',
                                allowBlank:false,
                                /*store: {
                                    type: 'states'
                                },*/
                                bind:{
                                    store:'{bawahan}'
                                },
                                reference: 'teruskan',
                                displayField: 'jabatan',
                                valueField: 'id',
                                allowBlank:false,
                                //filterPickList: true,
                                queryMode: 'remote',
                                hideTrigger:true,
                                publishes: 'value'
                            },                    
                            {
                                xtype: 'tagfield',
                                fieldLabel: 'Disposisi',
                                allowBlank:false,
                                name:'jns_disposisi[]',
                                bind:{
                                    store:'{jns_disposisi}'
                                },
                                reference: 'disposisi',
                                displayField: 'disposisi',
                                valueField: 'id',
                                hideTrigger:true,
                                //filterPickList: true,
                                queryMode: 'remote',
                                publishes: 'value'
                            },{
                                fieldLabel : 'Keterangan',
                                xtype:'textarea',
                                allowBlank:false,
                                name:'isi_disposisi',
                                width:90
                            }
                        ]
                    },
                    {
                        xtype:'toolbar',
                        items:[
                            '->',{
                                text:'Cetak Disposisi',iconCls:'icon_print_16',
                                listeners:{
                                    click:'onCetakDisposisi'
                                }
                            }
                        ]
                    },
                    {
                        xtype:'grid',
                        width:'100%',
                        //padding:5,
                        //itemId:'gridDisposisi',
                        reference:'gridDisposisi',
                        bind:{
                            store:'{daftardisposisi}'
                        },
                        columns: [
                            {width:24,menuDisabled:true,resizable:false,
                                renderer:function(value, metadata, record, rowIndex,colIndex, store){
                                    //console.log(record.data.urgensi);
                                    var important;
                                    if (record.data.urgensi == 'penting'){
                                        important = "<img src='resources/icons/ic_important_12px.png' />"
                                    } else if (record.data.urgensi == 'sangatpenting'){
                                        important = "<img src='resources/icons/ic_v_important_12px.png' />"
                                    }else{
                                        important = ""
                                    }
                                    
                                    //important = "<img src='resources/icons/ic_v_important_12px.png' />"
                                    return important;
                                }
                            },
                            {text:'Asal Disposisi',dataIndex:'pengirim',flex:1,
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
                                    dataShow = "<div> Kepada :"+record.data.jabatan+" | Disposisi Tgl:"+Ext.util.Format.date(record.data.created_on,'d-m-Y')+"</div><div>disposisi:"+record.data.jns_disposisi_long+"</div><div>Keterangan:"+record.data.isi_disposisi+"</div>"

                                    return dataShow;
                            }}
                            
                        ]
                    }
                    ]
                }
            ]
        }
    ]
});
