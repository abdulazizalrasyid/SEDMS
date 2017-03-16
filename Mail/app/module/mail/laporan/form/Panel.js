
Ext.define("Docs.view.laporan.form.Panel",{
    extend: "Ext.form.Panel",
    requires:[
        "Docs.view.laporan.form.PanelController",
        "Docs.view.laporan.form.PanelModel"
    ],
    controller: "laporan-form-panel",
    viewModel: {
        type: "laporan-form-panel"
    },
    xtype:"laporan.form.Panel",
    title:'Pilihan Laporan',
    bodyPadding: 10,
    items:[
    {

            xtype:'fieldset',
            //layout:'vbox',
            title:'Filter Laporan',
            defaults:{
                anchor:'70%',
                labelWidth:150 
            },
            items:[
                {
                    xtype:'textfield',
                    fieldLabel:'Pengirim',
                    reference:'pengirim',
                    name:'pengirim'
                },
                {
                    xtype:'textfield',
                    fieldLabel:'Penerima',
                    reference:'penerima',
                    name:'penerima'
                },{
                    xtype:'textfield',
                    fieldLabel:'Perihal',
                    reference:'perihal',
                    name:'perihal'
                },{
                    xtype:'textfield',
                    fieldLabel:'Index',
                    reference:'index',
                    name:'index'
                },/*{
                        name: 'id_jenis',
                        reference: 'id_jenis',
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
                        valueField: 'id',
                        queryMode:'remote',
                        minChars:1,
                        //allowBlank:false,
                        //listeners:{
                        //    change:'setNomorSurat'
                        //},
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
                    //allowBlank:false,
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
                    listeners:{
                        focus:'onIdKlasifikasiFokus',
                        select:'onIdKlasifikasiSelect'
                    }
                },*/{
                    xtype:'fieldcontainer',
                    layout:'hbox',
                    //anchor:'80%',
                    items:[
                        {

                            fieldLabel:'Dari tanggal',
                            reference:'dari',
                            labelWidth:150 ,
                            name:'dari',
                            xtype:'datefield',
                            submitFormat:'Y/m/d',
                            format:'d  F  Y',
                            invalidText: 'Tanggal tidak valid',
                            blankText: 'Harus diisi'
                        },{
                            fieldLabel:'sampai tanggal',
                            name:'sampai',
                            margin:'0 0 0 3px',
                            reference:'sampai',
                            xtype:'datefield',
                            submitFormat:'Y/m/d',
                            format:'d  F  Y',
                            invalidText: 'Tanggal tidak valid',
                            blankText: 'Harus diisi'
                        }
                    ]
                },{
                    xtype:'button',
                    width:200,
                    text:'Export file spreadsheet',
                    iconCls:'icon_excel_16',
                    listeners:{
                        click:'onClickExportExcel'
                    }
                }
            ]
    },{

            xtype:'fieldset',
            //layout:'vbox',
            title:'Rekapitulasi Bulanan Tahun Ini',
            defaults:{
                anchor:'70%',
                labelWidth:150 
            },
            items:[
           /* {

                fieldLabel:'Bulan',
                reference:'bulan',
                labelWidth:150 ,
                name:'bulan',
                xtype:'monthpicker',
                submitFormat:'Y/m/d',
                format:'d  F  Y',
                invalidText: 'Tanggal tidak valid',
                blankText: 'Harus diisi',
                showButtons: false
            },*/{
                    xtype:'button',
                    width:200,
                    text:'Export file spreadsheet',
                    iconCls:'icon_excel_16',
                    margin:'5px 0 0 0',
                    listeners:{
                        click:'onClickExportExcel2'
                    }
                }
            ]
    }/*,{

            xtype:'fieldset',
            //layout:'vbox',
            title:'Rekapitulasi Laporan',
            defaults:{
                anchor:'70%',
                labelWidth:150 
            },
            items:[
               {
                    xtype:'fieldcontainer',
                    layout:'hbox',
                    //anchor:'80%',
                    items:[
                        {

                            fieldLabel:'Dari tanggal',
                            reference:'dari2',
                            labelWidth:150 ,
                            name:'dari2',
                            xtype:'datefield',
                            submitFormat:'Y/m/d',
                            format:'d  F  Y',
                            invalidText: 'Tanggal tidak valid',
                            blankText: 'Harus diisi'
                        },{
                            fieldLabel:'sampai tanggal',
                            name:'sampai2',
                            margin:'0 0 0 3px',
                            reference:'sampai2',
                            xtype:'datefield',
                            submitFormat:'Y/m/d',
                            format:'d  F  Y',
                            invalidText: 'Tanggal tidak valid',
                            blankText: 'Harus diisi'
                        }
                    ]
                },{
                    xtype:'button',
                    width:200,
                    text:'Export file spreadsheet',
                    iconCls:'icon_excel_16',
                    listeners:{
                        click:'onClickExportExcel3'
                    }
                }
            ]
    }, */
    ]
});
