Ext.define("Docs.view.base.DetailMasuk",{
    extend: "Ext.form.FieldSet",
    requires:[
        "Docs.view.base.DetailMasukController"
    ],
    controller: "base-detail-masuk",
    xtype:"base.DetailMasuk",
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
                xtype:'textfield',
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
                xtype:'fieldcontainer',
                layout:'hbox',
                items:[{
                    flex: 1,
                    xtype:'textfield',
                    labelWidth:150,
                    name:'nomor_surat',
                    reference:'nomor_surat',
                    fieldLabel:'Nomor Surat',
                    allowBlank:false,
                    blankText: 'Harus diisi',
                    listeners:{
                        blur:'onNomorBlur'
                    }
                },{
                    flex: 1,
                    xtype:'textfield',
                    margin:'0 0 0 5px',
                    labelWidth:150,
                    fieldLabel:'Tanggal Surat',
                    name:'tgl_surat',
                    xtype:'datefield',
                    anchor: '50%',
                    submitFormat:'Y/m/d',
                    format:'d  F  Y',
                    //disabledDays:  [0, 6],
                    allowBlank:false,
                    invalidText: 'Tanggal tidak valid',
                    blankText: 'Harus diisi'
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
});