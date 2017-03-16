
Ext.define("Docs.view.konsep.window.MasukAtasan",{
    extend: "Ext.window.Window",
    requires:[
        "Docs.view.konsep.window.MasukAtasanController",
        "Docs.view.konsep.window.MasukAtasanModel"
    ],
    controller: "konsep-window-masukatasan",
    viewModel: {
        type: "konsep-window-masukatasan"
    },
    xtype:"konsep.window.MasukAtasan",
    width:600,
    modal:true,
    //height:400,
    iconCls:'icon_draft_36',
    listeners:{
        beforeclose:'beforeclose'
    },
    title:'Konsep',
    layout:'fit',
    items:[
        {
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
            items:[
                {
                    xtype:'form',
                    url:serverURL+'draft/simpan',
                    itemId:'draft',
                    width:'100%',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%',
                        labelWidth:150
                        //padding:5
                    },
                    bodyStyle:{
                        backgroundColor:'#A0A8D5'
                    },
                    items:[
                        {
                            xtype:'hiddenfield',
                            reference:'id_jab_pembuat',
                            name:'id_jab_pembuat',
                            listeners:{
                                change:'initIdJabPembuat'
                            }
                        },{
                            xtype:'hiddenfield',
                            reference:'uniquecode',
                            name:'uniquecode',
                            listeners:{
                                change:'initUniquecode'
                            }
                        },{
                            reference:'id_surat',
                            xtype:'hiddenfield',
                            itemId:'id_surat',
                            name:'id',
                            listeners:{
                                change:'initIdSurat'
                            }
                        },{
                            xtype:'hiddenfield',
                            reference:'created_by',
                            name:'created_by'
                        },{
                            xtype:'hiddenfield',
                            reference:'init_by',
                            name:'init_by'
                        },{
                            fieldLabel:'Dikirim Oleh',
                            xtype:'displayfield',
                            name:'jab_pembuat'
                        },{
                            fieldLabel:'Perihal',
                            name:'perihal',
                            reference:'perihal',
                            xtype:'displayfield',
                        },{
                            fieldLabel:'Pengantar',
                            name:'pengantar',
                            xtype:'displayfield',
                            height:50
                        }
                    ]
                },{
                    xtype:'container',
                    layout: 'hbox',
                    items:[
                        {
                            flex:1,
                            xtype:'grid',
                            width:'100%',
                            reference:'filegrid',
                            bind:{
                                store:'{filesurat}'
                            },
                            //selType: 'checkboxmodel',
                            allowDeselect:true,
                            multiSelect: true,
                            listeners:{
                                itemdblclick:'downloadFile'
                            },
                            hideHeaders:true,
                            columns:[
                                {
                                        xtype:'actioncolumn',
                                        width:50,
                                        items: [{
                                            // Url is just for example (not working)
                                            icon: 'resources/icons/ic_file_download_12px.png',  // Use a URL in the icon config
                                            handler: function(grid, rowIndex, colIndex) {
                                                var rec = grid.getStore().getAt(rowIndex);
                                                // do your functionality here...
                                            }
                                        }]
                                }/*,{
                                    width:30,
                                    renderer:function(value, metadata, record, rowIndex,colIndex, store){
                                        var dibaca;
                                        dibaca = "<img src='resources/icons/ic_file_download_12px.png' />";
                                        return dibaca;
                                    }
                                }*/,{
                                    text:'File Lampiran',dataIndex:'nama_file',
                                    flex:3
                                },{
                                    text:'Oleh',dataIndex:'jab_pembuat',
                                    flex:1
                                },{
                                    text:'Tanggal',dataIndex:'created_on',
                                    flex:1,
                                    renderer:function(value){
                                          return Ext.util.Format.date(value,'d/m/Y')
                                    }
                                }
                            ]
                        },{
                            xtype:'button',
                            iconCls:'icon_history_16',
                            margin:'0 0 0 2px',
                            //text:'File sejarah konsep',
                            tooltip:'Lihat sejarah file konsep',
                            listeners:{
                                click:'filehistory'
                            }
                        }
                    ]
                },{    
                    xtype      : 'fieldcontainer',
                    //fieldLabel : 'Aksi',
                    defaultType: 'radiofield',
                    hidden:true,
                    anchor:'100%',
                    defaults: {
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel  : 'Kembali',
                            name      : 'aksi',
                            reference : 'kembali',
                            inputValue: 'kembali'
                        }, {
                            boxLabel  : 'Teruskan',
                            name      : 'aksi',
                            inputValue: 'teruskan',
                            reference : 'teruskan'
                        }, {
                            boxLabel  : 'setuju',
                            name      : 'aksi',
                            inputValue: 'final',
                            reference : 'final'
                        }
                    ] 
                },{
                    xtype:'form',
                    //url:serverURL+'konsep/simpan_newfile',
                    bodyStyle:{
                        backgroundColor:'transparent'
                    },
                    anchor:'100%',
                    reference:'sendBackContainer',
                    layout: 'anchor',
                    defaults:{
                        anchor:'100%',
                        labelWidth:150
                    },
                    bind:{
                        hidden: '{!kembali.checked}',
                        disabled:'{!kembali.checked}'
                    },
                    hidden:true,
                    dockedItems:[
                        {
                            dock:'bottom',
                            xtype:'toolbar',
                            items:[
                               '->',{
                                    text:'Kirim',iconCls:'icon_send_16',
                                    //hidden:true,
                                    listeners:{
                                        click:'onClickSimpanKembali'
                                    }
                                }
                            ]
                        }
                    ],
                    items:[
                    {
                        xtype:'hiddenfield',
                        name:'uniquecode',
                        reference:'uniquecode_kembali'
                    },{
                        xtype:'hiddenfield',
                        name:'aksi',
                        value:'kembali'
                    },{
                        xtype:'hiddenfield',
                        name:'last_id',
                        reference:'last_id_surat_kembali'
                    },{
                        xtype:'hiddenfield',
                        reference:'id_jab_pembuat_kembali',
                        name:'id_jab_pembuat'
                    },{
                        xtype:'hiddenfield',
                        reference:'created_by_kembali',
                        name:'created_by'
                    },{
                            flex: 1,
                            xtype:'combobox',
                            //hidden:true,
                            labelWidth:150,
                            fieldLabel:'Kirim konsep kepada',
                            name:'id_jab_verifikator',
                            reference:'id_jab_kembali',
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
                                reference:'filekembali',
                                name:'myfile[]',
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
                },{
                    xtype:'form',
                    //url:serverURL+'konsep/simpan_newfile',
                    bodyStyle:{
                        backgroundColor:'transparent'
                    },  
                    anchor:'100%',
                    reference:'sendContainer',
                    layout: 'anchor',
                    defaults:{
                        anchor:'100%',
                        labelWidth:150
                    },
                    bind:{
                        hidden: '{!teruskan.checked}',
                        disabled:'{!teruskan.checked}'
                    },
                    hidden:true,
                    dockedItems:[
                        {
                            dock:'bottom',
                            xtype:'toolbar',
                            items:[
                               '->',{
                                    text:'Kirim',iconCls:'icon_send_16',
                                    //hidden:true,
                                    listeners:{
                                        click:'onClickSimpanTeruskan'
                                    }
                                }
                            ]
                        }
                    ],
                    items:[
                        {
                            xtype:'hiddenfield',
                            name:'uniquecode',
                            reference:'uniquecode_terus'
                        },{
                            xtype:'hiddenfield',
                            name:'last_id',
                            reference:'last_id_surat_terus'
                        },{
                            xtype:'hiddenfield',
                            reference:'id_jab_pembuat_terus',
                            name:'id_jab_pembuat'
                        },{
                            xtype:'hiddenfield',
                            reference:'created_by_terus',
                            name:'created_by'
                        },{
                            xtype:'hiddenfield',
                            name:'aksi',
                            value:'teruskan'
                        },{
                            flex: 1,
                            xtype:'combobox',
                            //hidden:true,
                            labelWidth:150,
                            fieldLabel:'Kirim konsep kepada',
                            name:'id_jab_verifikator',
                            reference:'id_jab_verifikator_terus',
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
                                reference:'fileteruskan',
                                hideLabel: true,
                                buttonText: 'Pilih File'
                                
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
                },{
                    xtype:'form',
                    //url:serverURL+'konsep/simpanfinal',
                    bodyStyle:{
                        backgroundColor:'transparent'
                    },  
                    anchor:'100%',
                    reference:'saveContainer',
                    layout: 'anchor',
                    defaults:{
                        anchor:'100%',
                        labelWidth:150
                    },
                    bind:{
                        hidden: '{!final.checked}',
                        disabled:'{!final.checked}'
                    },
                    hidden:true,
                    dockedItems:[
                        {
                            dock:'bottom',
                            xtype:'toolbar',
                            items:[
                               '->',{
                                    text:'Simpan',iconCls:'icon_save_16px',
                                    //hidden:true,
                                    listeners:{
                                        click:'onClickSimpanFinal'
                                    }
                                }
                            ]
                        }
                    ],
                    items:[{
                        xtype:'hiddenfield',
                        name:'final',
                        value:1
                    },{
                        xtype:'hiddenfield',
                        name:'last_id',
                        reference:'last_id_surat_final'
                    },{
                        xtype:'hiddenfield',
                        name:'uniquecode',
                        reference:'uniquecode_final'
                    },{
                        xtype:'hiddenfield',
                        name:'aksi',
                        value:'final'
                    },{
                        xtype:'hiddenfield',
                        reference:'id_jab_pembuat_final',
                        name:'id_jab_pembuat'
                    },{
                        xtype:'hiddenfield',
                        reference:'created_by_final',
                        name:'created_by'
                    },{
                        flex: 1,
                        xtype:'combobox',
                        //hidden:true,
                        labelWidth:150,
                        fieldLabel:'Pejabat Penanda tangan',
                        name:'penandatangan',
                        reference:'penandatangan',
                        
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
                        fieldLabel:'Pengantar',
                        name:'pengantar',
                        xtype:'textarea',
                        height:50
                    },
                    {    
                        xtype      : 'fieldcontainer',
                        fieldLabel : 'Jenis Surat',
                        defaultType: 'radiofield',
                        anchor:'100%',
                        defaults: {
                            flex: 1
                        },
                        layout: 'hbox',
                        items: [
                            {
                                boxLabel  : 'Non Nota Dinas',
                                name      : 'selanjutnya',
                                reference : 'surat',
                                inputValue: 'surat_keluar'
                            }, {
                                boxLabel  : 'Nota Dinas',
                                name      : 'selanjutnya',
                                inputValue: 'nota',
                                reference : 'nota_dinas'
                            }
                        ] 
                    },{
                            xtype:'fieldcontainer',
                            layout: 'hbox',
                            items:[
                            {
                                xtype:'filefield',
                                flex:1,
                                reference:'filefinal',
                                name:'myfile[]',
                                //buttonOnly: true,
                                hideLabel: true,
                                buttonText: 'Pilih File'
                                
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
