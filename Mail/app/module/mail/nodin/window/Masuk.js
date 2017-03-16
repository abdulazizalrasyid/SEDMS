
Ext.define("Docs.view.nodin.window.Masuk",{
    extend: "Ext.window.Window",
    requires:[
        "Docs.view.nodin.window.MasukController",
        "Docs.view.nodin.window.MasukModel"
    ],
    controller: "nodin-window-masuk",
    viewModel: {
        type: "nodin-window-masuk"
    },
    xtype:"nodin.window.Masuk",
    width:800,
    height:585,
    modal:true,
    resizable:false,
    layout:'fit',
    listeners:{
        beforeclose:'onBeforeClose'
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
                    padding:'2px 2px 2px 10px'
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
                        name: 'id_surat',
                        reference:'id_surat2',
                        xtype:'hiddenfield'
                    },{
                        name: 'jenis_surat',
                        reference:'jenis_surat',
                        xtype:'hiddenfield',
                        value:'nodin'
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
                                    '->',{
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
                        xtype:'grid',
                        width:'100%',
                        padding:5,
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
