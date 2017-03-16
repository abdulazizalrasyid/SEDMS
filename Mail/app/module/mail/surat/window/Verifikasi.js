
Ext.define("Docs.view.surat.window.Verifikasi",{
    extend: "Ext.window.Window",
    requires:[
        "Docs.view.surat.window.VerifikasiController",
        "Docs.view.surat.window.VerifikasiModel",
        'Docs.view.base.DetailMasuk',
        'Docs.view.base.MetadataMasuk'
    ],
    controller: "surat-window-verifikasi",
    viewModel: {
        type: "surat-window-verifikasi"
    },
    xtype:"surat.window.Verifikasi",
    width:800,
    height:585,
    modal:true,
    resizable:false,
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
                                    boxLabel : 'Verifikasi',
                                    name : 'verified',
                                    inputValue: '1',
                                    id : 'verifikasi',
                                    reference : 'verifikasi',
                                    xtype : 'checkboxfield',

                                },'->',{
                                  name:'verification_request_id_jab',
                                  xtype:'hiddenfield'
                                },{
                                    text:'Cetak Pengantar',iconCls:'icon_print_16',
                                    listeners:{
                                        click:'onClickCetak'
                                    }
                                },{
                                    text:'Kirim',iconCls:'icon_send_16',
                                    itemId:'btSend',
                                    bind:{
                                        hidden: '{!verifikasi.checked}'
                                    },
                                    listeners:{
                                        click:'onClickVerifikasi'
                                    }
                                }
                            ]
                        }
                    ],
                    items:[
                        {
                            xtype:'fieldset',
                            title: 'Metadata Surat',
                            //margin:20,
                            collapsible: false,
                            defaultType:'hiddenfield',
                            items:[
                               /* {
                                    name: 'tipe_surat',
                                    value:'M'
                                },*/{
                                    name: 'id_pengolah',
                                    reference:'id_pengolah'
                                },{
                                    name: 'created_by',
                                    reference:'created_by'
                                },{
                                    name: 'tahun',
                                    reference:'tahun_hidden'
                                },{
                                    name: 'no_urut',
                                    reference:'no_urut'
                                },{
                                        xtype:'fieldcontainer',
                                        layout:'hbox',
                                        items:[
                                        {
                                          fieldLabel:'Kode',
                                          name:'prefix_kode_klasifikasi',
                                          xtype:'displayfield',
                                          flex: 1,labelWidth:150
                                        },{
                                            flex: 1,
                                            xtype:'displayfield',
                                            labelWidth:150,margin:'0 0 0 5px',
                                            name: 'tgl_terima',
                                            fieldLabel:'Tanggal Terima',
                                            anchor: '50%',
                                            renderer:Ext.util.Format.dateRenderer('d F Y')
                                        }]
                                    },{
                                      name:'id_klasifikasi'
                                    },{
                                      fieldLabel:'Klasifikasi Dokumen',
                                      name:'kode_klasifikasi',
                                      xtype:'displayfield'
                                    },{
                                        fieldLabel:'Isi Ringkas',
                                        name:'ringkasan',
                                        xtype:'displayfield',
                                        height:50
                                    },{
                                        fieldLabel:'Catatan',
                                        name:'catatan',
                                        xtype:'displayfield',
                                        height:50
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
                                        name:'asal_surat',
                                        allowBlank:false,
                                        blankText: 'Harus diisi'
                                    },{
                                        flex: 1,
                                        xtype:'combo',
                                        labelWidth:150,
                                        fieldLabel:'Kepada',
                                        name:'tujuan_surat',
                                        //margin:'0 0 0 5px',
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
                                            select:'onTujuanSelect'
                                        }
                                    },{
                                        xtype:'hiddenfield',
                                        name:'id_jabatan',
                                        reference:'id_jabatan'
                                    },{
                                        flex: 1,
                                        xtype:'displayfield',
                                        labelWidth:150,
                                        name:'nomor_surat',
                                        reference:'nomor_surat',
                                        fieldLabel:'Nomor Surat'
                                    },{
                                        flex: 1,
                                        margin:'0 0 0 5px',
                                        labelWidth:150,
                                        fieldLabel:'Tanggal Surat',
                                        name:'tgl_surat',
                                        xtype:'displayfield',
                                        renderer:Ext.util.Format.dateRenderer('d F Y')
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
                                                inputValue: 'rahasia'
                                            },{
                                                boxLabel  : 'Sangat Rahasia',
                                                name      : 'sifat',
                                                inputValue: 'sangatrahasia'
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
    ],
    listeners:{
        beforeclose:'beforeclose'
    }
});
