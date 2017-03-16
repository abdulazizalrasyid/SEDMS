
Ext.define("Docs.view.nodin.window.MasukAtasan",{
    extend: "Ext.window.Window",
    requires:[
        "Docs.view.nodin.window.MasukAtasanController",
        "Docs.view.nodin.window.MasukAtasanModel"
    ],
    controller: "nodin-window-masukatasan",
    viewModel: {
        type: "nodin-window-masukatasan"
    },
    xtype:"nodin.window.MasukAtasan",
    width:800,
    height:585,
    modal:true,
    resizable:false,
    layout:'fit',
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
                                name: 'verified',
                                reference: 'verified',
                                value:0,
                                xtype:'hiddenfield'
                            },
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
                                hidden:true,
                                minChars:1,
                                //allowBlank:false,
                                blankText: 'Harus diisi',
                                bind:{
                                    store:'{pengguna}'
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
                                text:'Cetak Nota Dinas',iconCls:'icon_print_16',
                                listeners:{
                                    click:'onClickCetak'
                                }
                            }
                        ]
                    }
                ],
                items:[
                    {
                        xtype:'hiddenfield',
                        reference:'kode_jab_pengirim',
                        name: 'kode_jab_pengirim'
                    },{
                        xtype:'hiddenfield',
                        reference:'id',
                        name: 'id',
                        listeners:{
                            change:'changeId'
                        }
                    },{
                        xtype:'hiddenfield',
                        reference:'id_jab_pengirim2',
                        name: 'id_jab_pengirim'
                    },{
                        xtype:'hiddenfield',
                        reference:'uniquecode',
                        name: 'uniquecode',
                        listeners:{
                            change:'changeUniquecode'
                        }
                    },{
                        xtype:'hiddenfield',
                        reference:'kode_klasifikasi',
                        name: 'kode_klasifikasi'
                    },{
                        xtype:'hiddenfield',
                        reference:'no_urut',
                        name: 'no_urut'
                    },{
                        xtype:'hiddenfield',
                        reference:'tahun',
                        name: 'tahun'
                    },{
                        xtype:'hiddenfield',
                        name: 'id_jab_pengirim'
                    },{
                        xtype:'hiddenfield',
                        name: 'id_jab_penerima'
                    },{
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
