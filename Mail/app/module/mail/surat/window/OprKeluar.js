
Ext.define("Docs.view.surat.window.OprKeluar",{
    extend: "Ext.window.Window",
    requires:[
        "Docs.view.surat.window.OprKeluarController",
        "Docs.view.surat.window.OprKeluarModel",
        'Docs.view.base.DetailDisplayKeluar',
        'Docs.view.base.MetadataDisplayKeluar'
    ],
    controller: "surat-window-oprkeluar",
    viewModel: {
        type: "surat-window-oprkeluar"
    },
    xtype:"surat.window.OprKeluar",
    width:800,
    height:595,
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
                                    //hidden:true,
                                    text:'Cetak',iconCls:'icon_print_16px',
                                    listeners:{
                                        click:'onClickCetak'
                                    }
                                },{
                                    text:'Simpan',iconCls:'icon_send_16',
                                    listeners:{
                                        click:'onClickSimpan'
                                    }
                                }
                            ]
                        }
                    ],
                    items:[{
                        xtype:'fieldset',
                        title: 'Metadata Surat',
                        //margin:20,
                        collapsible: false,
                        defaultType:'hiddenfield',
                        reference:'firstContainer',
                        items:[
                           /* {
                                name: 'tipe_surat',
                                value:'M'
                            },*/{
                                name:'kode_klasifikasi',
                                reference:'kode_klasifikasi',
                                submitValue:false,
                                disabled:true,
                                listeners:{
                                    //change:'setNomorSurat'
                                }
                            },{
                                name: 'tahun',
                                reference:'tahun_hidden'
                            },{
                                name: 'id_pengolah',
                                reference:'id_pengolah'
                            },{
                                name: 'created_by',
                                reference:'created_by'
                            },{
                                name: 'verified',
                                value:1
                            },/*{
                                name: 'tahun',
                                reference:'tahun_hidden'
                            },*/{
                                name: 'no_urut',
                                reference:'no_urut'
                            },{
                                name:'kode_jabatan',
                                reference:'kode_jabatan',
                                submitValue:false
                            },{
                                flex: 1,
                                //anchor: '50%',
                                labelWidth:150,
                                name: 'jenis',
                                reference: 'jenis',
                                fieldLabel:'Jenis Surat',
                                xtype:'combobox',
                                forceSelection:true,
                                //displayField: 'klasifikasi',
                                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                        '{kode_jenis} : {jenis}',
                                    '</tpl>'
                                ),
                                typeAhead: false,
                                hideTrigger:true,
                                valueField: 'kode_jenis',
                                queryMode:'remote',
                                minChars:1,
                                allowBlank:false,
                                disabled:true,
                                listeners:{
                                        //change:'setNomorSurat'
                                    },
                                blankText: 'Harus diisi',
                                bind:{
                                    store:'{jenisDokumen}'
                                },
                                listConfig: {
                                    loadingText: 'Mencari...',
                                    emptyText: 'Tidak ditemukan',
                                    itemSelector: '.select-item',
                                    // Custom rendering template for each item
                                    itemTpl: [
                                        '<div class="select-item">',
                                            '{kode_jenis} : {jenis}',
                                        '</div>'
                                    ]
                                }
                            },{
                                    xtype:'fieldcontainer',
                                    layout:'hbox',
                                    items:[{
                                        fieldLabel:'Kode',
                                        name:'prefix_kode_klasifikasi',
                                        xtype:'combobox',
                                        flex: 1,labelWidth:150,
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
                                            store:'{klasifikasi_short}'
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
                                        },
                                        listeners:{
                                            change:'onCodeChange'
                                        },
                                        disabled:true
                                    },{
                                        flex: 1,
                                        margin:'0 0 0 5px',
                                        labelWidth:150,
                                        fieldLabel:'Tanggal Kirim',
                                        name:'tgl_kirim',
                                        reference:'tgl_kirim',
                                        xtype:'datefield',
                                        anchor: '50%',
                                        submitFormat:'Y/m/d',
                                        format:'d  F  Y',
                                        //disabledDays:  [0, 6],
                                        allowBlank:false,
                                        invalidText: 'Tanggal tidak valid',
                                        blankText: 'Harus diisi'
                                    }]
                                },{
                                    fieldLabel:'Klasifikasi Dokumen',
                                    name:'id_klasifikasi',
                                    reference:'id_klasifikasi',
                                    xtype:'combobox',
                                    forceSelection:true,
                                    //displayField: 'klasifikasi',
                                    displayTpl: Ext.create('Ext.XTemplate',
                                        '<tpl for=".">',
                                            '{kode} : {klasifikasi}',
                                        '</tpl>'
                                    ),
                                    typeAhead: false,
                                    hideTrigger:true,
                                    valueField: 'id',
                                    queryMode:'remote',
                                    minChars:1,
                                    listeners:{
                                        select:'onKlasifikasiSelect',
                                        focus:'onIdKlasifikasiFokus'
                                    },
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
                                    },
                                    disabled:true
                                },{
                                    fieldLabel:'Isi Ringkas',
                                    name:'ringkasan',
                                    xtype:'textarea',
                                    height:50
                                },{
                                    fieldLabel:'Catatan',
                                    name:'catatan',
                                    xtype:'textarea',
                                    height:50
                                }

                        ]
                    },{
                        xtype:'fieldset',
                        title: 'Detail Surat',
                        //margin:20,
                        collapsible: false,
                        defaultType:'textfield',
                        reference:'secondContainer',
                        items:[
                            {
                                fieldLabel:'Perihal',
                                name:'perihal'
                            },{
                                flex: 1,
                                xtype:'combobox',
                                labelWidth:150,
                                fieldLabel:'Penandatangan Surat',
                                reference:'penandatangan',
                                name:'asal_surat',
                                disabled:true,
                                forceSelection:true,
                                bind:{
                                    store:'{pengguna}'
                                },
                                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                        '{jabatan}',
                                    '</tpl>'
                                ),
                                typeAhead: false,
                                hideTrigger:true,
                                valueField: 'jabatan',
                                queryMode:'remote',
                                minChars:1,
                                allowBlank:false,
                                blankText: 'Harus diisi',
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
                                },
                                listeners:{
                                    select:'onAsalSelect'
                                }
                            },{
                                flex: 1,
                                xtype:'textfield',
                                labelWidth:150,
                                fieldLabel:'Kepada',
                                name:'tujuan_surat',
                                //margin:'0 0 0 5px',
                                allowBlank:false,
                                blankText: 'Harus diisi'
                            },{
                                xtype:'hiddenfield',
                                name:'id_jabatan_asal',
                                reference:'id_jabatan'
                            },{
                                xtype:'hiddenfield',
                                name:'no_registrasi_surat',
                                reference:'no_registrasi_surat'
                            },{
                                xtype:'fieldcontainer',
                                layout:'hbox',
                                items:[{
                                    flex: 1,
                                    xtype:'textfield',
                                    
                                    labelWidth:150,
                                    fieldLabel:'Tanggal Surat',
                                    name:'tgl_surat',
                                    reference:'tgl_surat',
                                    xtype:'datefield',
                                    anchor: '50%',
                                    submitFormat:'Y/m/d',
                                    format:'d  F  Y',
                                    //disabledDays:  [0, 6],
                                    allowBlank:false,
                                    invalidText: 'Tanggal tidak valid',
                                    blankText: 'Harus diisi',
                                    disabled:true,
                                    listeners:{
                                        //change:'setNomorSurat'
                                    }
                                },{
                                    flex: 1,
                                    margin:'0 0 0 5px',
                                    xtype:'textfield',
                                    labelWidth:150,
                                    name:'nomor_surat',
                                    reference:'nomor_surat',
                                    fieldLabel:'Nomor Surat',
                                    allowBlank:false,
                                    blankText: 'Harus diisi',
                                    disabled:true
                                }]
                            },{
                                xtype      : 'fieldcontainer',
                                fieldLabel : 'Urgensi',
                                defaultType: 'radiofield',
                                anchor:'70%',
                                defaults: {
                                    flex: 1
                                },
                                layout: 'hbox',
                                items: [
                                    {
                                        boxLabel  : 'Biasa',
                                        name      : 'urgensi',
                                        inputValue: 'biasa'
                                    }, {
                                        boxLabel  : 'Segera',
                                        name      : 'urgensi',
                                        inputValue: 'segera'
                                    }, {
                                        boxLabel  : 'Sangat Segera',
                                        name      : 'urgensi',
                                        inputValue: 'sangatsegera'
                                    }
                                ]
                            },{
                                xtype      : 'fieldcontainer',
                                fieldLabel : 'Keamanan',
                                defaultType: 'radiofield',
                                anchor:'70%',
                                defaults: {
                                    flex: 1
                                },
                                layout: 'hbox',
                                items: [
                                    {
                                        boxLabel  : 'Biasa',
                                        name      : 'sifat',
                                        inputValue: 'biasa'
                                    },{
                                        boxLabel  : 'Rahasia',
                                        name      : 'sifat',
                                        reference : 'sifat',
                                        inputValue: 'rahasia',
                                        listeners:{
                                            //change:'setNomorSurat'
                                        }
                                    },{
                                        boxLabel  : 'Sangat Rahasia',
                                        name      : 'sifat',
                                        reference : 'sifat2',
                                        inputValue: 'sangatrahasia',
                                        listeners:{
                                            //change:'setNomorSurat'
                                        }
                                    }
                                ]
                            }
                        ]
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
