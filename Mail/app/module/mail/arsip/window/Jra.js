
Ext.define("Docs.view.arsip.window.Jra",{
    extend: "Ext.window.Window",
	requires:[
    	'Docs.view.arsip.window.JraController',
    	'Docs.view.arsip.window.JraModel'
    ],
    controller: "arsip-window-jra",
    viewModel: {
        type: "arsip-window-jra"
    },
    width:700,
    height:320,
    modal:true,
    layout:'fit',
    bodyStyle:{
        backgroundColor:'#f5f5f5'
    },
    iconCls:'icon_setting_36',
    title:'Jadwal Retensi Arsip',
    listeners:{
        beforeclose:'beforeclose'
    },
    items:[
        {
            layout: 'anchor',
            defaultType:'textfield',
            padding:10,
            defaults: {
                anchor: '100%',
                labelWidth:120,
                padding:5
            },
            bodyStyle:{
                backgroundColor:'#A0A8D5'
            },
            xtype:'form',
            itemId:'form_jra',
            reference:'form_jra',
            //url:serverURL+'jabatan/simpan',
            dockedItems:[
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
                    ],
            items:[
            // `id`,  `kode`,  `klasifikasi`,  `active`,  `waktu_aktif`,  `waktu_inaktif`,  
            //LEFT(`keterangan`, 256),  `created_on`,  `created_by`,  `edited_on`,  `edited_by`,  `deleted_on`,  `deleted_by`
                {
                    name:'id',
                    xtype:'hiddenfield'
                },{
                    name:'kode',
                    fieldLabel:'Kode',
                    allowBlank:false
                },{
                    name:'klasifikasi',
                    fieldLabel:'Klasifikasi',
                    allowBlank:false
                },{
                    name:'waktu_aktif',
                    fieldLabel:'Waktu Aktif',
                    allowBlank:false,
                    xtype:'numberfield',anchor: '60%',
                    hideTrigger:true
                },{
                    name:'waktu_inaktif',
                    fieldLabel:'Waktu Inaktif',
                    allowBlank:false,
                    xtype:'numberfield',anchor: '60%',
                    hideTrigger:true
                },{
                    name:'keterangan',
                    fieldLabel:'Keterangan',
                    allowBlank:false,
                    xtype:'textarea',
                    height:80
                }
            ]
        }
    ]
});
