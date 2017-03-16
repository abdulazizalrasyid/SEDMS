Ext.define("Docs.view.base.MetadataDisplayKeluar",{
    extend: "Ext.form.FieldSet",
    xtype:"base.MetadataDisplayKeluar",
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
                items:[{
                    xtype:'displayfield',
                    name:'index',
                    reference:'index',
                    labelWidth:150,
                    flex: 1,
                    fieldLabel:'Index'
                },{
                    flex: 1,
                    xtype:'displayfield',
                    labelWidth:150,margin:'0 0 0 5px',
                    name: 'tgl_kirim',
                    reference:'tgl_kirim',
                    fieldLabel:'Tanggal Kirim',
                    renderer:function(value){
                        return Ext.util.Format.date(value,'d/m/Y')
                    }
                }]
            },{
                    flex: 1,
                    xtype:'displayfield',
                    labelWidth:150,margin:'0 0 0 5px',
                    name: 'full_klasifikasi',
                    reference:'full_klasifikasi',
                    fieldLabel:'Klasifikasi Dokumen'
            },/*{
                fieldLabel:'Klasifikasi Dokumen',
                name:'id_klasifikasi',
                xtype:'combobox',
                forceSelection:true,
                disabled:true,
                displayTpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">',
                        '{kode} : {klasifikasi}',
                    '</tpl>'
                ),
                typeAhead: false,
                hideTrigger:true,
                valueField: 'id',
                queryMode:'remote',
                minChars:2,
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
                }
            },*/
            {
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
});