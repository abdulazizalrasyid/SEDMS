Ext.define("Docs.view.base.MetadataMasuk",{
    extend: "Ext.form.FieldSet",
    xtype:"base.MetadataMasuk",
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
                },
                /*{
                    xtype:'textfield',
                    name:'index',
                    reference:'index',
                    labelWidth:150,
                    flex: 1,
                    fieldLabel:'Index'
                },*/{
                    flex: 1,
                    xtype:'textfield',
                    labelWidth:150,margin:'0 0 0 5px',
                    name: 'tgl_terima',
                    reference:'tgl_terima',
                    fieldLabel:'Tanggal Terima',
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
                        select:'onTgl_terimaChange'
                    }
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
                },
                listeners:{
                    focus:'onIdKlasifikasiFokus',
                    select:'onIdKlasifikasiSelect'
                }
            },
            {
                fieldLabel:'Isi Ringkas',
                name:'ringkasan',
                xtype:'textarea',
                height:50
            },{
                fieldLabel:'Catatan',
                name:'catatan',
                xtype:'textarea',
                height:50
            }
    ]
});
