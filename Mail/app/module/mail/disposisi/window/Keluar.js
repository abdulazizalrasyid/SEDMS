
Ext.define("Docs.view.disposisi.window.Keluar",{
    extend: "Ext.window.Window",
    requires:[
        "Docs.view.disposisi.window.KeluarController",
        "Docs.view.disposisi.window.KeluarModel"
    ],
    controller: "disposisi-window-keluar",
    viewModel: {
        type: "disposisi-window-keluar"
    },
    xtype:"disposisi.window.Keluar",
    html: "Hello, World!!",
    width:800,
    height:585,
    modal:true,
    resizable:false,
    layout:'fit',
    listeners:{
        //beforeclose:'beforeclose'
    },
    items:[
        {
            xtype:'tabpanel',
            items:[
               {
                    padding:10,
                    iconCls:'icon_read_16',
                    title:'Detail Surat',
                    xtype:'form',
                    layout: 'anchor',
                    itemId:'form_disposisi',
                    defaultType:'textfield',
                    defaults: {
                        anchor: '100%',
                        labelWidth:150,
                        padding:5,
                        layout: 'anchor',
                        defaults:{
                            anchor: '100%',
                            labelWidth:150,
                            padding:5
                        }
                    },
                    items:[
                        {
                            xtype:'fieldset',
                            title: 'Disposisi',
                            collapsible: false,
                            defaultType:'displayfield',
                            //reference:'firstContainer',
                            items:[
                            {
                                name: 'id_surat',
                                xtype:'hiddenfield',
                                bind:{
                                    value:'{id_surat}'
                                },
                                listeners:{
                                    change:'initIdSurat'
                                }
                            },{
                                name: 'uniquecode',
                                xtype:'hiddenfield',
                                /*bind:{
                                    value:'{uniquecode}'
                                },*/
                                listeners:{
                                    change:'initUniquecode'
                                }
                            },{
                                name: 'id_jab_pengirim',
                                xtype:'hiddenfield',
                                bind:{
                                    value:'{id_jabatan}'
                                }
                            },{
                                name: 'jabatan',
                                //xtype:'textfield',
                                fieldLabel: 'Tujuan Disposisi'
                            },{
                                name: 'jns_disposisi_long',
                                //xtype:'textfield',
                                fieldLabel: 'Disposisi'
                            }/*,               
                            {
                                xtype: 'tagfield',
                                
                                name:'jns_disposisi[]',
                                bind:{
                                    store:'{jns_disposisi}'
                                },
                                reference: 'disposisi',
                                displayField: 'disposisi',
                                fieldLabel: 'Disposisi',
                                valueField: 'id',
                                hideTrigger:true,
                                //filterPickList: true,
                                queryMode: 'remote',
                                publishes: 'value'
                            }*/,{
                                fieldLabel : 'Keterangan',
                                //xtype:'textarea',
                                name:'isi_disposisi',
                                height:60
                            }
                            ]
                        },{
                            xtype:'fieldset',
                            title: 'Detail Surat',
                            collapsible: false,
                            defaultType:'textfield',
                            reference:'secondContainer',
                            items:[
                                {
                                    fieldLabel:'Perihal',
                                    name:'perihal',
                                    xtype:'displayfield'
                                },{
                                    flex: 1,
                                    xtype:'displayfield',
                                    labelWidth:150,
                                    fieldLabel:'Dari',
                                    name:'asal_surat'
                                },{
                                    flex: 1,
                                    xtype:'displayfield',
                                    labelWidth:150,
                                    fieldLabel:'Kepada',
                                    name:'tujuan_surat'
                                },/*{
                                    flex: 1,
                                    xtype:'combo',
                                    labelWidth:150,
                                    fieldLabel:'Kepada',
                                    name:'tujuan_surat',
                                    disabled:true,
                                    //margin:'0 0 0 5px',
                                    forceSelection:true,
                                    bind:{
                                        store:'{alamatsurat}'
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
                                    minChars:2,
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
                                        select:'onTujuanSelect'
                                    }
                                },*/{
                                    xtype:'hiddenfield',
                                    name:'id_jabatan',
                                    reference:'id_jabatan'
                                },{
                                xtype:'fieldcontainer',
                                layout:'hbox',
                                items:[{
                                    flex: 1,
                                    name: 'tgl_surat',
                                    xtype:'displayfield',
                                    fieldLabel:'Tanggal Surat',
                                    anchor: '50%',
                                    labelWidth:150,
                                    renderer:function(value){
                                        return Ext.util.Format.date(value,'d/m/Y')
                                    }
                                }/*{
                                    
                                    xtype:'textfield',
                                    labelWidth:150,
                                    fieldLabel:'Tanggal Surat',
                                    name:'tgl_surat',
                                    xtype:'datefield',
                                    anchor: '50%',
                                    submitFormat:'Y/m/d',
                                    format:'d  F  Y',
                                    disabledDays:  [0, 6],
                                    allowBlank:false,
                                    invalidText: 'Tanggal tidak valid',
                                    blankText: 'Harus diisi'
                                }*/,{
                                    flex: 1,
                                    xtype:'displayfield',
                                    labelWidth:150,
                                    name:'nomor_surat',
                                    fieldLabel:'Nomor Surat',
                                    margin:'0 0 0 5px',
                                    allowBlank:false,
                                    blankText: 'Harus diisi'
                                }]
                            },{
                                xtype      : 'fieldcontainer',
                                fieldLabel : 'Urgensi',
                                defaultType: 'radiofield',
                                anchor:'100%',
                                disabled:true,
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
                                disabled:true,
                                anchor:'100%',
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
                                        inputValue: 'rahasia'
                                    },{
                                        boxLabel  : 'Sangat Rahasia',
                                        name      : 'sifat',
                                        inputValue: 'sangatrahasia'
                                    }
                                ]
                            },{
                                fieldLabel : 'Isi Ringkas',
                                xtype:'displayfield',
                                name:'ringkasan',
                                height:40
                            },{
                                fieldLabel : 'Catatan',
                                xtype:'displayfield',
                                name:'catatan',
                                height:40
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
                     /*dockedItems:[
                        {
                            dock:'top',
                            xtype:'toolbar',
                            items:[
                               '->',{
                                    text:'Unggah Berkas',iconCls:'icon_save_16px',
                                    listeners:{
                                        click:'onClickUnggah'
                                    }
                                }
                            ]
                        }
                    ],*/
                    items:[ 
                    /*{
                        xtype:'fieldset',
                        title: 'Berkas',
                        //margin:20,
                        collapsible: false,
                        //defaultType:'hiddenfield',
                        reference:'thirdContainer',
                        items:[
                        {
                            reference:'id_surat2',
                            xtype:'hiddenfield',
                            name:'id'
                        },/*{
                            fieldLabel:'Catatan',
                            name:'catatan',
                            xtype:'textarea',
                            height:50
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
                            }
                            ]
                        }
                        ]
                    },*/{
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
                },{
                    iconCls:'icon_disposisi_16',
                    title:'Disposisi',
                    padding:5,
                    items:[
                    {
                        xtype:'grid',
                        //reference:'grid_daftar',
                        width:'100%',
                        bind:{
                            store:'{daftardisposisi2}'
                        },
                        height:'200px',
                        columns: [
                            /*{width:24,menuDisabled:true,resizable:false,
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
                            },*/
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
