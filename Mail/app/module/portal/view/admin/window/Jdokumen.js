
Ext.define("Portal.view.admin.window.Jdokumen",{
    extend: "Ext.window.Window",
	requires:[
    	'Portal.view.admin.window.JdokumenController',
    	'Portal.view.admin.window.JdokumenModel'
    ],
    controller: "admin-window-jdokumen",
    viewModel: {
        type: "admin-window-jdokumen"
    },
    width:450,
    height:300,
    modal:true,
    layout:'fit',
    bodyStyle:{
        backgroundColor:'#f5f5f5'
    },
    iconCls:'icon_setting_36',
    title:'Jabatan',
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
            itemId:'form_dokumen',
            reference:'form_dokumen',
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
            //`id`,  `kode_jabatan`,  `id_atasan`,  `jabatan`, 
            // `active`,  `created_on`,  `created_by`,  `edited_on`,  `edited_by`,  `deleted_on`,  `deleted_by`
                {
                    name:'id',
                    xtype:'hiddenfield'
                },{
                    name:'kode_jenis',
                    fieldLabel:'Kode',
                    allowBlank:false
                },{
                    name:'jenis',
                    fieldLabel:'Jenis',
                    allowBlank:false
                }
            ]
        }
    ]
});
