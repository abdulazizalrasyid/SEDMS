
Ext.define("Portal.view.admin.window.Jdisposisi",{
    extend: "Ext.window.Window",
	requires:[
    	'Portal.view.admin.window.JdisposisiController',
    	'Portal.view.admin.window.JdisposisiModel'
    ],
    controller: "admin-window-jdisposisi",
    viewModel: {
        type: "admin-window-jdisposisi"
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
            itemId:'form_disposisi',
            reference:'form_disposisi',
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
                                    id : 'verifikasi',
                                    reference : 'active',
                                    xtype : 'checkboxfield'
                                },'->',{
                                    text:'Simpan',iconCls:'icon_send_16',
                                    itemId:'btSend2',                                    
                                    listeners:{
                                        click:'onClickSimpan'
                                    }
                                }/*,{
                                    text:'Arsipkan',iconCls:'icon_arsip_16',
                                    itemId:'btArchive',
                                    bind:{
                                        hidden: '{verifikasi.checked}'
                                    },
                                    listeners:{
                                        click:'onClickArsipkan'
                                    }
                                }*//*,{
                                    text:'Cetak Pengantar',iconCls:'icon_print_16px',
                                    listeners:{
                                        click:'onCetakPengantar'
                                    }
                               },*//*,{
                                    text:'Hapus',iconCls:'icon_del_16',
                                    reference:'btHapus',
                                    //hidden:true,
                                    listeners:{
                                        click:'onDelete',
                                    }
                                },*//*{
                                    text:'Simpan Draft',iconCls:'icon_save_16px',
                                    listeners:{
                                        click:'onClickSimpan'
                                    }
                                }*/
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
                    name:'disposisi',
                    fieldLabel:'Disposisi',
                    allowBlank:false
                }
            ]
        }
    ]
});
