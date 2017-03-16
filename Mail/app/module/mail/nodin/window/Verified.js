
Ext.define("Docs.view.nodin.window.Verified",{
    extend: "Ext.window.Window",
    requires:[
        "Docs.view.nodin.window.VerifiedController",
        "Docs.view.nodin.window.VerifiedModel"
    ],
    controller: "nodin-window-verified",
    viewModel: {
        type: "nodin-window-verified"
    },
    xtype:"nodin.window.Verified",
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
                    xtype:'form',
                    iconCls:'icon_read_16',
                    title:'Detail Nota',
                    itemId:'form_nodin',   
                    reference:'theform',                 
                    layout:'fit',
                    items:[
                        {
                            padding:5,
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
                            dockedItems:[
                                {
                                    dock:'top',
                                    xtype:'toolbar',
                                    items:[
                                       {
                                            boxLabel : 'Verifikasi',
                                            name : 'verified',
                                            inputValue: '1',
                                            id : 'verifikasi',
                                            reference : 'verifikasi',
                                            xtype : 'checkboxfield'
                                        },{
                                            xtype:'hiddenfield',
                                            name:'type',
                                            value:'updateverifikasi'
                                        },
                                       '->',{
                                        xtype:'hiddenfield',
                                        name:'id',
                                        reference:'id'
                                       },{
                                        xtype:'hiddenfield',
                                        name:'uniquecode',
                                        listeners:{
                                            change:'changeUniquecode'
                                        }
                                       },
                                       {
                                            fieldLabel:'Pejabat Verifikasi',
                                            name:'verification_request_id_jab',
                                            reference:'verification_request_id_jab',
                                            hidden:true,
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
                                                store:'{pengguna}'
                                            },
                                           /* listeners:{
                                                show:'onCbVerifikasi'
                                            },*/
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
                                            text:'Kirim Nota Dinas',iconCls:'icon_send_16',
                                            bind:{
                                                hidden: '{!verifikasi.checked}'
                                            },
                                            listeners:{
                                                click:'onClickSimpan'
                                            }
                                        }
                                    ]
                                }
                            ],
                            items:[
                            /*{
                                xtype:'hiddenfield',
                                reference:'nomor_surat',
                                name: 'nomor_surat',
                            },*/{
                                xtype:'displayfield',
                                labelWidth:150,
                                fieldLabel:'Pengirim',
                                reference:'id_jab_pengirim',
                                name: 'jabatan_pengirim'
                            },{
                                xtype:'displayfield',
                                labelWidth:150,
                                fieldLabel:'Penerima',
                                reference:'id_jab_penerima',
                                name: 'jabatan_penerima'
                            },{
                                flex: 1,
                                xtype:'textfield',
                                labelWidth:150,
                                fieldLabel:'Perihal',
                                name:'perihal',
                                allowBlank:false,
                                blankText: 'Harus diisi'                
                            },{
                                xtype:'fieldcontainer',
                                layout:'hbox',
                                items:[
                                {
                                    flex: 1,
                                    xtype:'displayfield',
                                    name:'nomor_surat',
                                    labelWidth:150,
                                    fieldLabel:'Nomor Nota Dinas'              
                                },/*{
                                    xtype:'displayfield',
                                    name:'tgl_surat',
                                    flex: 1,
                                    labelWidth:150,//margin:'0 0 0 5px',
                                    fieldLabel:'Tanggal'
                                }*/
                                {
                                    flex: 1,
                                    labelWidth:150,//margin:'0 0 0 5px',
                                    name: 'tgl_surat',
                                    reference:'tgl_surat',
                                    fieldLabel:'Tanggal',
                                    xtype:'datefield',
                                    anchor: '50%',
                                    submitFormat:'Y/m/d',
                                    format:'d  F  Y',
                                    //disabledDays:  [0, 6],
                                    allowBlank:false,
                                    invalidText: 'Tanggal tidak valid',
                                    blankText: 'Harus diisi'
                                }
                                ]
                            },{
                                flex: 1,
                                xtype:'htmleditor',
                                labelWidth:150,
                                height:225,
                                fieldLabel:'Isi Nota Dinas',
                                name:'isi_nota',
                                allowBlank:false,
                                blankText: 'Harus diisi',
                                enableFont:false                
                            }

                            ]
                            
                        }
                    ]
                },{
                    iconCls:'ic_file_download_16',
                    title:'Lampiran',
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
                            store:'{filenodin}'
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
