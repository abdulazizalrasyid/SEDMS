
Ext.define("Docs.view.surat.window.OprMasuk",{
    extend: "Ext.window.Window",
    requires:[
        "Docs.view.surat.window.OprMasukController",
        "Docs.view.surat.window.OprMasukModel",
        'Docs.view.base.DetailMasuk',
        'Docs.view.base.MetadataMasuk'
    ],
    controller: "surat-window-oprmasuk",
    viewModel: {
        type: "surat-window-oprmasuk"
    },
    xtype:"surat.window.OprMasuk",
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
                               '->',
                               {
                                    fieldLabel:'Pejabat Verifikasi',
                                    name:'verification_request_id_jab',
                                    reference:'verification_request_id_jab',
                                    xtype:'combobox',
                                    //padding:'30px 5px 30px 5px',
                                    //anchor:'70%',
                                    width:400,
                                    labelWidth:120,
                                    forceSelection:true,
                                    //displayField: 'klasifikasi',
                                    displayTpl: Ext.create('Ext.XTemplate',
                                        '<tpl for=".">',
                                            '{jabatan}',
                                        '</tpl>'
                                    ),
                                    typeAhead: false,
                                    hideTrigger:true,
                                    valueField: 'id',
                                    queryMode:'remote',
                                    minChars:1,
                                    //allowBlank:false,
                                    blankText: 'Harus diisi',
                                    bind:{
                                        store:'{tujuan_verifikasi}'
                                    },
                                    listeners:{
                                        show:'onCbVerifikasi'
                                    },
                                    listConfig: {
                                            loadingText: 'Mencari...',
                                            emptyText: 'Tidak ditemukan',
                                            itemSelector: '.select-item',
                                            // Custom rendering template for each item
                                            itemTpl: [
                                                '<div class="select-item">',
                                                    '{jabatan}',
                                                '</div>'
                                            ]
                                        }
                                },{
                                    hidden:true,
                                    text:'Cetak',iconCls:'icon_print_16px',
                                    listeners:{
                                        click:'onClickCetak'
                                    }
                                },{
                                    text:'Simpan',iconCls:'icon_send_16',
                                    listeners:{
                                        click:'onClickSimpan1'
                                    }
                                },{
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
                                },{
                                    reference:'verified',
                                    xtype:'hiddenfield',
                                    name:'verified'
                                },'->',{
                                    text:'Disposisi',iconCls:'icon_print_16',
                                    listeners:{
                                        click:'onClickCetakDisposisi'
                                    }
                                },{
                                    text:'Pengantar',iconCls:'icon_print_16',
                                    listeners:{
                                        click:'onClickCetak'
                                    }
                                }
                            ]
                        }
                    ],
                    items:[
                       {
                            xtype:'base.MetadataMasuk'
                        },{
                            xtype:'base.DetailMasuk'
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
                    dockedItems:[
                        {
                            dock:'top',
                            xtype:'toolbar',
                            items:[
                               '->',
                               {
                                    text:'Unggah Berkas',iconCls:'icon_save_16',
                                    listeners:{
                                        click:'onClickSimpan2'
                                    }
                                }
                            ]
                        }
                    ],
                    items:[{
                        xtype:'fieldset',
                        title: 'Berkas',
                        //margin:20,
                        collapsible: false,
                        //defaultType:'hiddenfield',
                        reference:'thirdContainer',
                        items:[
                        {
                            name:'tu_surat_id',
                            reference:'id_surat2',
                            xtype:'hiddenfield'
                        },{
                            xtype:'fieldcontainer',
                            layout: 'hbox',
                            items:[
                            {
                                xtype:'filefield',
                                flex:1,
                                name:'myfile[]',
                                reference:'filename',
                                //buttonOnly: true,
                                hideLabel: true,
                                buttonText: 'Pilih File'
                                //allowBlank:false
                            },{
                                xtype:'button',
                                iconCls:'icon_add_16',
                                margin:'0 0 0 2px',
                                listeners:{
                                    click:'addFileField'
                                }

                            }/*,{
                                xtype:'button',
                                iconCls:'icon_del_16',
                                margin:'0 0 0 2px'
                                //width:20,height:20
                            }*/
                            ]
                        }
                        ]
                    },
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
