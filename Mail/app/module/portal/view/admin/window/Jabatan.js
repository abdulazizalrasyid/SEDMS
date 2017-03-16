
Ext.define("Portal.view.admin.window.Jabatan",{
    extend: "Ext.window.Window",
	requires:[
    	'Portal.view.admin.window.JabatanController',
    	'Portal.view.admin.window.JabatanModel'
    ],
    controller: "admin-window-jabatan",
    viewModel: {
        type: "admin-window-jabatan"
    },
    width:450,
    height:300,
    modal:true,
    layout:'fit',
    bodyStyle:{
        backgroundColor:'#f5f5f5'
    },
    listeners:{
        beforeclose:'beforeclose'
    },
    iconCls:'icon_setting_36',
    title:'Jabatan',
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
            itemId:'form_jabatan',
            reference:'form_jabatan',
            //url:serverURL+'jabatan/simpan',
            dockedItems:[
                        {
                            dock:'top',
                            xtype:'toolbar',
                            items:[
                               {
                                    boxLabel : 'Aktif',
                                    name : 'active',
                                    inputValue: 1,
                                    //id : 'verifikasi',
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
                }/*,{
                    name:'id_atasan',
                    xtype:'hiddenfield'
                }*/,{
                    name:'kode_jabatan',
                    fieldLabel:'Kode Jabatan',
                    allowBlank:false
                },{
                    name:'jabatan',
                    fieldLabel:'Jabatan',
                    allowBlank:false
                },{
                    flex: 1,
                    xtype:'combobox',
                    fieldLabel:'Atasan',
                    reference:'atasan',
                    name:'id_atasan',
                    forceSelection:true,
                    bind:{
                        store:'{jabatan}'
                    },
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '{jabatan}',
                        '</tpl>'
                    ),
                    typeAhead: false,
                    hideTrigger:true,
                    valueField: 'id',
                    queryMode:'remote',
                    minChars:1,
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
                    }
                },{
                        flex: 1,
                        xtype:'combobox',
                        fieldLabel:'Unit Kerja',
                        reference:'kode_unker',
                        name:'kode_unker',
                        forceSelection:true,
                        displayTpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                                '{kode}:{unitkerja}',
                            '</tpl>'
                        ),
                        typeAhead: false,
                        hideTrigger:true,
                        valueField: 'kode',
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
                                    '{kode}:{unitkerja}',
                                '</div>'
                            ]
                        }
                    },
            ]
        }
    ]
});
