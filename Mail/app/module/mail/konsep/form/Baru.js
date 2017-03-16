
Ext.define("Docs.view.konsep.form.Baru",{
    extend: "Ext.form.Panel",
    requires:[
        "Docs.view.konsep.form.BaruController",
        "Docs.view.konsep.form.BaruModel"
    ],
    controller: "konsep-form-baru",
    viewModel: {
        type: "konsep-form-baru"
    },
    xtype:"konsep.form.Baru",
    //html: "Hello, World!!",
    title:'Konsep Baru',
    iconCls:'icon_draft_new_16',
    items:[
        {
            padding:10,
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
                       '->', {
                            hidden:true,
                            text:'Cetak',iconCls:'icon_print_16px',
                            listeners:{
                                click:'onClickCetak'
                            }
                        },{
                            text:'Kirim Konsep',iconCls:'icon_send_16',
                            listeners:{
                                click:'onClickSimpan'
                            }
                        }
                    ]
                }
            ],
            items:[{
                xtype:'hiddenfield',
                reference:'id_jab_pembuat',
                name:'id_jab_pembuat'
            },{
                xtype:'hiddenfield',
                reference:'created_by',
                name:'created_by'
            },{
                xtype:'hiddenfield',
                reference:'init_by',
                name:'init_by'
            },{
                xtype:'hiddenfield',
                name:'aksi',
                value:'init'
            },{
                flex: 1,
                xtype:'combobox',
                labelWidth:150,
                fieldLabel:'Kirim konsep kepada',
                name:'id_jab_verifikator',
                reference:'id_jab_verifikator',
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
                valueField: 'id_jabatan',
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
                }
            },{
                fieldLabel:'Perihal',
                name:'perihal',
                xtype:'textfield',
                allowBlank:false
            },{
                fieldLabel:'Pengantar',
                name:'pengantar',
                xtype:'textarea',
                height:50,
                allowBlank:false
            },{
                    xtype:'fieldcontainer',
                    layout: 'hbox',
                    items:[
                    {
                        xtype:'filefield',
                        flex:1,
                        name:'myfile[]',
                        //buttonOnly: true,
                        hideLabel: true,
                        buttonText: 'Pilih File',
                        allowBlank:false
                        
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
});
