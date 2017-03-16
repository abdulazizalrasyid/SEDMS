
Ext.define("Docs.view.nodin.window.Unclassified",{
    extend: "Ext.window.Window",
    requires:[
        "Docs.view.nodin.window.UnclassifiedController",
        "Docs.view.nodin.window.UnclassifiedModel"
    ],
    controller: "nodin-window-unclassified",
    viewModel: {
        type: "nodin-window-unclassified"
    },
    xtype:"nodin.window.Unclassified",
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
                title:'Detail Nota',
                xtype:'form',
                itemId:'form_nodin',
                layout: 'anchor',
                defaultType:'textfield',
                reference:'myFieldContainers',
                border:true,
                defaults: {
                    anchor: '100%',
                    labelWidth:150,
                    padding:2
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
                                xtype:'hiddenfield',
                                name:'id',
                                reference:'id_surat'
                            },{
                                xtype:'hiddenfield',
                                name:'type',
                                value:'updateklasifikasi'
                            },'->',{
                                fieldLabel:'Klasifikasi Dokumen',
                                name:'kode_klasifikasi',
                                xtype:'combobox',
                                width:600,
                                labelWidth:150,
                                forceSelection:true,
                                //displayField: 'klasifikasi',
                                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                        '{kode} : {klasifikasi}',
                                    '</tpl>'
                                ),
                                typeAhead: false,
                                hideTrigger:true,
                                valueField: 'kode',
                                queryMode:'remote',
                                minChars:1,
                                allowBlank:false,
                                blankText: 'Harus diisi',
                                bind:{
                                    store:'{klasifikasi}'
                                },
                                listConfig: {
                                    loadingText: 'Mencari...',
                                    emptyText: 'Tidak ditemukan',
                                    itemSelector: '.select-item',
                                    // Custom rendering template for each item
                                    itemTpl: [
                                        '<div class="select-item">',
                                            '{kode} : {klasifikasi}',
                                        '</div>'
                                    ]
                                }
                            },{
                                text:'Simpan',iconCls:'icon_save_16',
                                listeners:{
                                    click:'onClickSimpan'
                                }
                            }
                        ]
                    }
                ],
                items:[
                    {
                        flex: 1,
                        xtype:'displayfield',
                        //labelWidth:150,
                        fieldStyle:{
                            "text-align":'center'
                        },
                        //fieldLabel:'No.',             
                        //reference:'nomor_surat',
                        name:'nomor_surat',
                        padding:'0 0 20px 0',
                        renderer:function(value){
                            return 'NOTA DINAS <br />No. '+value
                        }          
                    },{
                        flex: 1,
                        xtype:'displayfield',
                        labelWidth:150,
                        fieldLabel:'Kepada',
                        name:'jabatan_penerima',
                        allowBlank:false,
                        blankText: 'Harus diisi'                
                    },{
                        flex: 1,
                        xtype:'displayfield',
                        labelWidth:150,
                        fieldLabel:'Dari',
                        name:'jabatan_pengirim',
                        allowBlank:false,
                        blankText: 'Harus diisi'                
                    },{
                        flex: 1,
                        xtype:'displayfield',
                        labelWidth:150,
                        fieldLabel:'Hal',
                        name:'perihal',
                        allowBlank:false,
                        blankText: 'Harus diisi'                
                    },{
                        flex: 1,
                        xtype:'displayfield',
                        labelWidth:150,
                        name:'tgl_surat',
                        fieldLabel:'Tanggal',
                        renderer:function(value){
                             return Ext.util.Format.date(value,'d/m/Y')
                        }        
                    },{
                        flex: 1,
                        xtype:'displayfield',
                        labelAlign:'top',
                        labelWidth:150,
                        height:225,
                        //fieldLabel:'Isi Nota Dinas',
                        name:'isi_nota',
                        allowBlank:false,
                        blankText: 'Harus diisi',
                        enableFont:false                
                    }
                ]
            },{
                    iconCls:'ic_file_download_16',
                    title:'Lampiran',
                    padding:5,
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
                                store:'{filenodin}'
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
                                    flex:1
                                }
                            ]
                        }]
            }
        ]
    }
    ]
});
