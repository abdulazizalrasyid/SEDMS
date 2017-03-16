
Ext.define("Docs.view.arsip.window.Unarchived",{
    extend: "Ext.window.Window",
    requires:[
        "Docs.view.arsip.window.UnarchivedController",
        "Docs.view.arsip.window.UnarchivedModel"
    ],
    controller: "arsip-window-unarchived",
    viewModel: {
        type: "arsip-window-unarchived"
    },
    xtype:"arsip.window.Unarchived",
    width:600,
    //height:400,
    modal:true,
    layout:'fit',
    listeners:{
        beforeclose:'onBeforeClose',
        activate:'onActivate'
    },
    items:{
        xtype:'tabpanel',
        defaults:{
            margin:5
        },
        items:[{
            iconCls:'icon_archived_16',
            title:'Form Pengarsipan',
            xtype:'form',
            itemId:'form_surat',
            reference:'form_surat',
            layout: 'anchor',
           
            defaults:{
                layout: 'anchor',
                border:true,
                defaults: {
                    anchor: '100%',
                    padding:'0 5px 0 5px'
                },
                bodyStyle:{
                    backgroundColor:'#A0A8D5'
                }
            },
            dockedItems:[
                {
                    xtype:'toolbar',
                    items:[
                        '->',{
                            text:'Simpan',
                            iconCls:'icon_save_16',
                            listeners:{
                                click:'onSimpanArsip'
                            }
                        }
                    ]   
                }
            ],
            items:[
                {
                    xtype:'hiddenfield',
                    name:'id_klasifikasi',
                    submitValue:false,
                    listeners:{
                        change:'onChangeKlasifikasi'
                    }
                },{
                    xtype:'hiddenfield',
                    name:'id'
                }, {
                    xtype:'hiddenfield',
                    name:'uniquecode',
                    listeners:{
                        change:'onChangeUniquecode'
                    }
                },{
                    border:true,
                    xtype:'panel',
                    margin:'5px 0 0 0',
                    items:[
                         {
                            xtype:'displayfield',
                            fieldLabel:'Klasifikasi',
                            reference:'klasifikasi'
                        },{
                            fieldLabel:'Perihal',
                            name:'perihal',
                            xtype:'displayfield'
                        },{
                            flex: 1,
                            xtype:'displayfield',
                            fieldLabel:'Dari',
                            name:'asal_surat',
                            allowBlank:false,
                            blankText: 'Harus diisi'
                        },{
                            flex: 1,
                            xtype:'displayfield',
                            fieldLabel:'Kepada',
                            name:'tujuan_surat',
                            allowBlank:false,
                            blankText: 'Harus diisi'
                        },{
                            xtype:'fieldcontainer',
                            layout:'hbox',
                            items:[{
                                flex: 1,
                                xtype:'displayfield',
                                name:'nomor_surat',
                                fieldLabel:'Nomor Surat',
                                allowBlank:false,
                                blankText: 'Harus diisi'
                            },{
                                flex: 1,
                                margin:'0 0 0 5px',
                                fieldLabel:'Tanggal Surat',
                                name:'tgl_surat',
                                reference:'tgl_surat',
                                xtype:'displayfield',
                                renderer:function(value){
                                    return Ext.util.Format.date(value,'d/m/Y')
                                }
                                
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
                                    name      : 'urgensi',submitValue:false,
                                    inputValue: 'biasa'
                                }, {
                                    boxLabel  : 'Segera',
                                    name      : 'urgensi',submitValue:false,
                                    inputValue: 'segera'
                                }
                            ]
                        },{
                            xtype      : 'fieldcontainer',
                            fieldLabel : 'Keamanan',
                            defaultType: 'radiofield',
                            anchor:'100%',
                            defaults: {
                                flex: 1
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel  : 'Biasa',
                                    name      : 'sifat',submitValue:false,
                                    inputValue: 'biasa'
                                },{
                                    boxLabel  : 'Rahasia',
                                    name      : 'sifat',submitValue:false,
                                    inputValue: 'rahasia'
                                },{
                                    boxLabel  : 'Sangat Rahasia',submitValue:false,
                                    name      : 'sifat',
                                    inputValue: 'sangatrahasia'
                                }
                            ]
                        }
                    ]
                },/*{
                    border:true,
                    xtype:'panel',
                    margin:'5px 0 0 0',
                    items:[
                       {
                            xtype:'fieldcontainer',
                            layout:'hbox',
                            items:[
                                {
                                    xtype:'displayfield',
                                    fieldLabel:'Waktu Aktif',
                                    reference:'waktu_aktif',
                                    flex:1
                                },{
                                    xtype:'displayfield',
                                    fieldLabel:'Waktu Nonaktif',
                                    reference:'waktu_inaktif',
                                    flex:1
                                },{
                                }
                            ]
                        },{
                            xtype:'displayfield',
                            fieldLabel:'Keterangan',
                            reference:'keterangan'
                        }
                    ]
                },*/          
                {
                    border:true,
                    xtype:'panel',
                    margin:'5px 0 0 0',
                    defaults:{
                        padding:'2px 5px 0 5px'
                    },
                    items:[
                        {
                            fieldLabel:'Kode JRA',
                            name:'id_jra',
                            reference:'id_jra',
                            anchor:'100%',
                            xtype:'combobox',
                            labelWidth:150,
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
                            allowBlank:false,
                            blankText: 'Harus diisi',
                            bind:{
                                store:'{jra}'
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
                                focus:'onIdJraFokus',
                                change:'onChangeJra'

                            }
                        },{
                            xtype:'fieldcontainer',
                            layout:'hbox',
                            fieldLabel:'',
                            labelWidth:150,
                            items:[
                                {
                                    xtype:'displayfield',
                                    fieldLabel:'Waktu Aktif',
                                    reference:'waktu_aktif',
                                    flex:1
                                },{
                                    xtype:'displayfield',
                                    fieldLabel:'Waktu Inaktif',
                                    reference:'waktu_inaktif',
                                    flex:1
                                },{
                                }
                            ]
                        },{

                            fieldLabel:'Waktu Aktif',
                            reference:'waktu_aktif2',
                            name:'waktu_aktif',
                            labelWidth:150,
                            xtype:'datefield',
                            anchor: '70%',
                            submitFormat:'Y/m/d',
                            format:'d  F  Y',
                            allowBlank:false,
                            invalidText: 'Tanggal tidak valid',
                            blankText: 'Harus diisi'
                        },{

                            labelWidth:150,
                            fieldLabel:'Waktu Inaktif',
                            name:'waktu_inaktif',
                            reference:'waktu_inaktif2',
                            xtype:'datefield',
                            anchor: '70%',
                            submitFormat:'Y/m/d',
                            format:'d  F  Y',
                            allowBlank:false,
                            invalidText: 'Tanggal tidak valid',
                            blankText: 'Harus diisi'
                        },{
                            labelWidth:150,
                            name:'lokasi_arsip',
                            fieldLabel:'Lokasi Arsip',
                            xtype:'textfield',
                            anchor: '100%',
                        },{
                            labelWidth:150,
                            name:'index',
                            fieldLabel:'Index',
                            xtype:'textfield',
                            anchor: '100%',
                            padding:'2px 5px 5px 5px'
                        }  
                    ]
                }   
            ]            
        },{
            iconCls:'icon_history_16',
            title:'Riwayat Dokumen',
            xtype:'grid',
            reference:'riwayat_dokumen',
            listeners:{
                //activate:'activate'
            },
            hideHeaders:true,
            bind:{
                store:'{daftar_riwayat}'
            },
            dockedItems:[
                {
                    dock:'bottom',
                    xtype:'MyPagingToolbar',
                    reference:'paging_suratkeluar',
                    bind:{
                        store:'{daftar_riwayat}'
                    }
                }
            ],
            columns: [
                {
                    width:100,menuDisabled:true,resizable:false,dataIndex: 'tanggal',
                    renderer:function(value, metadata, record, rowIndex,colIndex, store){
                        dataShow = Ext.util.Format.date(record.data.tanggal,'d-m-Y')
                        return dataShow;
                    }
                },{
                    menuDisabled:true,resizable:false,dataIndex: 'aksi' ,flex:1
                }
            ]
        },{
                    iconCls:'ic_file_download_16',
                    title:'Berkas',
                    //padding:5,
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
                                store:'{file}'
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
            }
        ]
    }

});
