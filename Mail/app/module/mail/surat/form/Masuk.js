
Ext.define("Docs.view.surat.form.Masuk",{
    extend: "Ext.panel.Panel",
    requires:[
        "Docs.view.surat.form.MasukController",
        "Docs.view.surat.form.MasukModel",
        'Docs.view.base.DetailMasuk',
        'Docs.view.base.MetadataMasuk'
    ],
    controller: "surat-form-masuk",
    viewModel: {
        type: "surat-form-masuk"
    },
    xtype:"surat.form.Masuk",
    title:'Registrasi Surat Masuk',
    bodyPadding: 10,
    items:[
        {
            //hidden:true,
            xtype:'form',
            //url:serverURL+'surat/simpan1',
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
            //padding:10,
            dockedItems:[
                {
                    dock:'top',
                    xtype:'toolbar',
                    items:[
                        {
                            name: 'verified',
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
                            text:'Simpan dan lanjut ke unggah berkas',iconCls:'icon_send_16',
                            listeners:{
                                click:'onClickSimpan1'
                            }
                        }
                    ]
                }
            ],
            items:[ {
                xtype:'base.MetadataMasuk'
            },{
                xtype:'base.DetailMasuk'
            }]
        },{
            hidden:true,
            xtype:'form',
            padding:10,
            //url:serverURL+'surat/simpan_2',
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
            }]
        }
    ]
});
