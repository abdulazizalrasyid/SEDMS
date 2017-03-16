
Ext.define("Docs.view.surat.window.Verifikasi",{
    extend: "Ext.window.Window",
    requires:[
        "Docs.view.surat.window.VerifikasiController",
        "Docs.view.surat.window.VerifikasiModel",
        'Docs.view.base.DetailMasuk',
        'Docs.view.base.MetadataMasuk'
    ],
    controller: "surat-window-verifikasi",
    viewModel: {
        type: "surat-window-verifikasi"
    },
    xtype:"surat.window.Verifikasi",
    width:800,
    height:585,
    modal:true,
    resizable:false,
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
                                },{
                                    boxLabel : 'Verifikasi',
                                    name : 'verified',
                                    inputValue: '1',
                                    id : 'verifikasi',
                                    reference : 'verifikasi',
                                    xtype : 'checkboxfield',
                                    
                                },'->',{
                                    fieldLabel:'Pejabat Verifikasi',
                                    name:'verification_request_id_jab',
                                    reference:'verification_request_id_jab',
                                    xtype:'combobox',
                                    //flex:1,
                                    width:400,
                                    forceSelection:true,
                                    //displayField: 'klasifikasi',
                                    displayTpl: Ext.create('Ext.XTemplate',
                                        '<tpl for=".">',
                                            '{jabatan}',
                                        '</tpl>'
                                    ),
                                    typeAhead: false,
                                    hideTrigger:true,
                                    labelWidth:120,
                                    valueField: 'id',
                                    queryMode:'remote',
                                    minChars:1,
                                    //allowBlank:false,
                                    blankText: 'Harus diisi',
                                    bind:{
                                        store:'{tujuan_verifikasi}',
                                        hidden: '{verifikasi.checked}'
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
                                    text:'Cetak Pengantar',iconCls:'icon_print_16',
                                    listeners:{
                                        click:'onClickCetak'
                                    }
                                },{
                                    text:'Kirim',iconCls:'icon_send_16',
                                    itemId:'btSend',
                                    bind:{
                                        hidden: '{!verifikasi.checked}'
                                    },                                    
                                    listeners:{
                                        click:'onClickVerifikasi'
                                    }
                                },{
                                    text:'Kirim (verifikasi)',iconCls:'icon_send_16',
                                    itemId:'btSend2',
                                    bind:{
                                        hidden: '{verifikasi.checked}'
                                    },                                    
                                    listeners:{
                                        click:'onClickSimpan'
                                    }
                                }/*,{
                                    text:'Arsipkan',iconCls:'icon_arsip_16',
                                    itemId:'btArchive',
                                    bind:{
                                        hidden: '{verifikasi.checked}'
                                    },
                                    listeners:{
                                        click:'onClickArsipkan'
                                    }
                                }*//*,{
                                    text:'Cetak Pengantar',iconCls:'icon_print_16px',
                                    listeners:{
                                        click:'onCetakPengantar'
                                    }
                               },*//*,{
                                    text:'Hapus',iconCls:'icon_del_16',
                                    reference:'btHapus',
                                    //hidden:true,
                                    listeners:{
                                        click:'onDelete',
                                    }
                                },*//*{
                                    text:'Simpan Draft',iconCls:'icon_save_16px',
                                    listeners:{
                                        click:'onClickSimpan'
                                    }
                                }*/
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
    ],
    listeners:{
        beforeclose:'beforeclose'
    }
});
