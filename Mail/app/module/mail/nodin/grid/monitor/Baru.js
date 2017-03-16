
Ext.define("Docs.view.nodin.grid.monitor.Baru",{
    extend: "Ext.form.Panel",
    requires:[
        "Docs.view.nodin.grid.monitor.BaruController",
        "Docs.view.nodin.grid.monitor.BaruModel"
    ],
    controller: "nodin-grid-monitor-baru",
    viewModel: {
        type: "nodin-grid-monitor-baru"
    },
    xtype:"nodin.grid.monitor.Baru",
    title:"Tulis Nota Dinas",
    iconCls:'icon_nodin_new_16',
    viewConfig:{
        loadMask:false
    },
    items:[
        {
            padding:20,
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
                            listeners:{
                                click:'onClickSimpan'
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
                reference:'id_jab_pengirim',
                name: 'id_jabatan_asal',
                listeners:{
                    change:'setNomorSurat'
                }
            },{
                xtype:'hiddenfield',
                reference:'nomor_surat',
                name: 'nomor_surat'
            },{
                xtype:'hiddenfield',
                reference:'tipe_surat',
                name: 'tipe_surat',
                value:'N'
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
                reference:'created_by',
                name: 'created_by'
            },{
                flex: 1,
                xtype:'combobox',
                labelWidth:150,
                fieldLabel:'Dari',
                reference:'penandatangan',
                name:'asal_surat',
                forceSelection:true,
                bind:{
                    store:'{atasan}'
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
                    select:'changePengirim'
                }
            },{
                xtype: 'tagfield',flex: 1,labelWidth:150,
                name:'tujuan_notadinas[]',fieldLabel:'Kepada',
                bind:{
                    store:'{bawahan_2}'
                },
                reference: 'teruskan',
                displayField: 'jabatan',
                valueField: 'id',
                typeAhead:true,
                //minChars:2,
                filterPickList: true,
                queryMode: 'local',
                hideTrigger:true,
                hideTrigger:true,
                allowBlank:false,
                blankText: 'Harus diisi',
                publishes: 'value',
                listeners:{
                    expand:'expand'
                }
            },/*{
                xtype:'hiddenfield',
                reference:'id_jab_penerima',
                name: 'id_jab_penerima',
            },*/{
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
                    labelWidth:150,
                    fieldLabel:'Nomor Nota Dinas',             
                    reference:'nomor_surat_fake'               
                },{
                    flex: 1,
                    xtype:'textfield',
                    labelWidth:150,//margin:'0 0 0 5px',
                    name: 'tgl_surat',
                    reference:'tanggal_notadinas',
                    fieldLabel:'Tanggal',
                    xtype:'datefield',
                    anchor: '50%',
                    submitFormat:'Y/m/d',
                    format:'d  F  Y',
                    //disabledDays:  [0, 6],
                    allowBlank:false,
                    invalidText: 'Tanggal tidak valid',
                    blankText: 'Harus diisi',
                    value:new Date(), 
                    listeners:{
                        select:'onTgl_Change'
                    }
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
            },{
                xtype:'fieldset',
                title: 'Lampiran',
                margin:'0 10px 10px 10px',
                collapsible: false,
                //defaultType:'hiddenfield',
                reference:'thirdContainer',
                items:[
                {
                    name:'id',
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
            }

            ]
            
        }
    ]
});
