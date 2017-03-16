Ext.define("Docs.view.base.DetailDisplayMasuk",{
    extend: "Ext.form.FieldSet",
   /* requires:[
        "Docs.view.base.DetailMasukController"
    ],*/
    //controller: "base-detail-masuk",
    xtype:"base.DetailDisplayMasuk",
    title: 'Detail Surat',
    //margin:20,
    collapsible: false,
    defaultType:'displayfield',
    reference:'secondContainer',
    items:[
            {
                fieldLabel:'Perihal',
                name:'perihal'
            },{
                flex: 1,
                //xtype:'textfield',
                labelWidth:150,
                fieldLabel:'Dari',
                name:'asal_surat',
                allowBlank:false,
                blankText: 'Harus diisi'
            },{
                flex: 1,
                //xtype:'textfield',
                labelWidth:150,
                fieldLabel:'Kepada',
                name:'tujuan_surat',
                allowBlank:false,
                blankText: 'Harus diisi'
            },{
                xtype:'hiddenfield',
                name:'id_jabatan',
                reference:'id_jabatan'
            },{
                xtype:'fieldcontainer',
                layout:'hbox',
                items:[{
                    flex: 1,
                    xtype:'displayfield',
                    labelWidth:150,
                    name:'nomor_surat',
                    fieldLabel:'Nomor Surat',
                    allowBlank:false,
                    blankText: 'Harus diisi'
                },{
                    flex: 1,
                    margin:'0 0 0 5px',
                    labelWidth:150,
                    fieldLabel:'Tanggal Surat',
                    name:'tgl_surat',
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