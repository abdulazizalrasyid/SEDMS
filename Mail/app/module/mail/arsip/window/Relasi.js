
Ext.define("Docs.view.arsip.window.Relasi",{
    extend: "Ext.window.Window",
	requires:[
    	'Docs.view.arsip.window.RelasiController',
    	'Docs.view.arsip.window.RelasiModel'
    ],
    controller: "arsip-window-relasi",
    viewModel: {
        type: "arsip-window-relasi"
    },
    width:700,
    height:320,
    modal:true,
    layout:'fit',
    bodyStyle:{
        backgroundColor:'#f5f5f5'
    },
    iconCls:'icon_setting_36',
    title:'Relasi Arsip',
    listeners:{
        beforeclose:'beforeclose'
    },
    items:[
        {
            layout: 'anchor',
            defaultType:'textfield',
            //padding:10,
            defaults: {
                anchor: '100%',
                labelWidth:120,
                padding:5
            },
            bodyStyle:{
                backgroundColor:'#A0A8D5'
            },
            xtype:'form',
            itemId:'form_relasi',
            reference:'form_relasi',
            //url:serverURL+'jabatan/simpan',
            /*dockedItems:[
                {
                    dock:'top',
                    xtype:'toolbar',
                    items:[
                       {
                            boxLabel : 'Aktif',
                            name : 'active',
                            inputValue: '1',
                            //id : 'verifikasi',
                            reference : 'active',
                            xtype : 'checkboxfield'
                        },'->',{
                            text:'Simpan',iconCls:'icon_send_16',
                            itemId:'btSend2',                                    
                            listeners:{
                                click:'onClickSimpan'
                            }
                        }
                    ]
                }
            ],*/
            items:[
            // `id`,  `kode`,  `klasifikasi`,  `active`,  `waktu_aktif`,  `waktu_inaktif`,  
            //LEFT(`keterangan`, 256),  `created_on`,  `created_by`,  `edited_on`,  `edited_by`,  `deleted_on`,  `deleted_by`
                {
                    name:'id',
                    xtype:'hiddenfield'
                },{
                    name:'relationcode',
                    xtype:'hiddenfield',
                    reference:'relationcode',
                    listeners:{
                        change:'onRelationChange'
                    }
                },{
                    name:'nomor_surat',
                    fieldLabel:'Nomor Surat',
                    allowBlank:false,
                    xtype:'displayfield'
                },{
                    name:'tgl_surat',
                    fieldLabel:'Tanggal Surat',
                    xtype:'displayfield',
                    renderer:function(value){
                        return Ext.util.Format.date(value,'d/m/Y')
                    }
                },{
                    fieldLabel:'Pilih Surat',
                    name:'pilih',
                    reference:'pilih',
                    anchor:'100%',
                    xtype:'combobox',
                    //labelWidth:150,
                    forceSelection:true,
                    //displayField: 'klasifikasi',
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '{nomor_surat} : {perihal}',
                        '</tpl>'
                    ),
                    typeAhead: false,
                    //hideTrigger:true,
                    triggers: {
                        test: {
                            cls: 'my-set-trigger',
                            handler: 'updateRelation'
                        }
                    },
                    valueField: 'id',
                    queryMode:'remote',
                    minChars:1,
                    allowBlank:false,
                    blankText: 'Harus diisi',
                    bind:{
                        store:'{daftarsurat}'
                    },
                    listConfig: {
                        loadingText: 'Mencari...',
                        emptyText: 'Tidak ditemukan',
                        itemSelector: '.select-item',
                        // Custom rendering template for each item
                        itemTpl: [
                            '<div class="select-item">',
                                '{nomor_surat} : {perihal}',
                            '</div>'
                        ]
                    },
                    listeners:{
                        focus:'onPilihFokus',
                        change:'onChangePilih'
                    }
                },{
                    xtype:'grid', 
                    reference:'gridRelasi',
                    bind:{
                        store:'{daftarrelasi}'
                    },
                    hideHeaders:true,
                    columns: [
                        //{width:24,menuDisabled:true,resizable:false,},
                        {dataIndex:'nomor_surat',flex:1},
                        {dataIndex:'perihal',flex:2}
                        //{width:45,menuDisabled:true,resizable:false}
                    ],
                }
            ]
        }
    ]
});
