
Ext.define("Docs.view.surat.form.Keluar",{
    extend: "Ext.panel.Panel",
    requires:[
        "Docs.view.surat.form.KeluarController",
        "Docs.view.surat.form.KeluarModel"
    ],
    controller: "surat-form-keluar",
    viewModel: {
        type: "surat-form-keluar"
    },
    xtype:"surat.form.Keluar",
    //iconCls:'icon_outmail_36',
    title:'Registrasi Surat Keluar',
    bodyPadding: 10,
    items:[
        {
            xtype:'form',
            //url:serverURL+'surat/simpankeluar',
            reference:'fromstage1',
            defaults:{
                layout: 'anchor',
                border:true,
                defaults: {
                    anchor: '100%',
                    labelWidth:150,
                    padding:8
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
                            hidden:true,
                            text:'Cetak',iconCls:'icon_print_16px',
                            listeners:{
                                click:'onClickCetak'
                            }
                        },{
                            text:'Simpan dan lanjut ke unggah berkas',iconCls:'icon_send_16',
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
                        listeners:{
                            change:'setNomorSurat'
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
                        listeners:{
                                change:'setNomorSurat'
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
                            items:[/*{
                                xtype:'textfield',
                                name:'index',
                                labelWidth:150,
                                flex: 1,
                                fieldLabel:'Index'
                            },*/
                            {
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
                                }
                            },{
                                flex: 1,
                                xtype:'textfield',
                                labelWidth:150,margin:'0 0 0 5px',
                                name: 'tgl_kirim',
                                reference:'tgl_kirim',
                                fieldLabel:'Tanggal Kirim',
                                xtype:'datefield',
                                anchor: '50%',
                                submitFormat:'Y/m/d',
                                format:'d  F  Y',
                                //disabledDays:  [0, 6],
                                allowBlank:false,
                                invalidText: 'Tanggal tidak valid',
                                blankText: 'Harus diisi',
                                value:new Date(),
                                /*listeners:{
                                    select:'onTgl_terimaChange'
                                }*/
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
                            }
                        },{
                            fieldLabel:'Isi Ringkas',
                            name:'ringkasan',
                            xtype:'textarea',
                            height:45
                        },{
                            fieldLabel:'Catatan',
                            name:'catatan',
                            xtype:'textarea',
                            height:45
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
                        forceSelection:true,
                        bind:{
                            store:'{pengguna_ttd}'
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
                            select:'onPenandatanganSelect'
                        }
                    },{
                        flex: 1,
                        xtype:'combobox',
                        labelWidth:150,
                        fieldLabel:'Unit Kerja Pemrakarsa',
                        reference:'unit_pemrakarsa',
                        name:'unit_pemrakarsa',
                        forceSelection:true,
                        displayTpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                                '{unitkerja}',
                            '</tpl>'
                        ),
                        typeAhead: false,
                        hideTrigger:true,
                        valueField: 'kode',
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
                                    '{unitkerja}',
                                '</div>'
                            ]
                        },
                        listeners:{
                            change:'setNomorSurat'
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
                            listeners:{
                                change:'setNomorSurat'
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
                            blankText: 'Harus diisi'
                        }]
                    },{
                        xtype      : 'fieldcontainer',
                        fieldLabel : 'Urgensi',
                        defaultType: 'radiofield',
                        anchor:'60%',
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
                            }/*, {
                                boxLabel  : 'Sangat Segera',
                                name      : 'urgensi',
                                inputValue: 'sangatsegera'
                            }*/
                        ]
                    },{
                        xtype      : 'fieldcontainer',
                        fieldLabel : 'Keamanan',
                        defaultType: 'radiofield',
                        anchor:'60%',
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
                                    change:'setNomorSurat'
                                }
                            },{
                                boxLabel  : 'Sangat Rahasia',
                                name      : 'sifat',
                                reference : 'sifat2',
                                inputValue: 'sangatrahasia',
                                listeners:{
                                    change:'setNomorSurat'
                                }
                            }
                        ]
                    }
                ]
            }
            ]
        },{
            hidden:true,
            xtype:'form',
            //url:serverURL+'surat/simpan2',
            reference:'fromstage2',
            defaults:{
                layout: 'anchor',
                border:true,
                defaults: {
                    anchor: '100%',
                    labelWidth:150,
                    padding:15
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
                    reference:'id',
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
                        buttonText: 'Pilih File',
                        listeners:{
                            afterrender:function(cmp){
                                cmp.fileInputEl.set({
                                    multiple:'multiple'
                                });
                            }
                        }
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
            }]
        }
    ]
});
