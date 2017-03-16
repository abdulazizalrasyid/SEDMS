Ext.define("Docs.view.base.DetailKeluar",{
    extend: "Ext.form.FieldSet",
    requires:[
        "Docs.view.base.DetailMasukController"
    ],
    controller: "base-detail-masuk",
    xtype:"base.DetailKeluar",
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
});