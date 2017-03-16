
Ext.define("Portal.view.admin.window.Pengguna",{
    extend: "Ext.window.Window",
	requires:[
    	'Portal.view.admin.window.PenggunaController',
    	'Portal.view.admin.window.PenggunaModel'
    ],
    controller: "admin-window-pengguna",
    viewModel: {
        type: "admin-window-pengguna"
    },
    width:450,
    height:320,
    modal:true,
    layout:'fit',
    bodyStyle:{
        backgroundColor:'#f5f5f5'
    },
    iconCls:'icon_setting_36',
    title:'Pengguna',
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
            itemId:'form_pengguna',
            reference:'form_pengguna',
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
                                },'->', {
                                    boxLabel : 'Set Password',
                                    //name : 'active',
                                    reference : 'resetpwd',
                                    xtype : 'checkboxfield',
                                    submitValue:false
                                },{
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
            // `id`,  `username`,  `fullname`,  `passwd`,  `type`,  `id_jabatan`,  `id_unker`,  `active`, 
            // `login_terakhir`,  `login_machine`,  `created_on`,  `created_by`,  `edited_on`,  `edited_by`,  `deleted_on`,  `deleted_by`
                {
                    name:'id',
                    xtype:'hiddenfield'
                },{
                    name:'id_jabatan',
                    reference:'id_jabatan',
                    xtype:'hiddenfield',
                    listeners:{
                        change:'onIdJabatanChange'
                    }
                },{
                    name:'username',
                    fieldLabel:'Nama Pengguna',
                    allowBlank:false
                },{
                    name:'fullname',
                    fieldLabel:'Nama Lengkap',
                    allowBlank:false
                },/*{
                    name:'jabatan',
                    fieldLabel:'Jabatan',
                    allowBlank:false
                },*/
                {
                    name:'type',
                    fieldLabel:'Tipe Pengguna',
                    xtype:'combobox',
                    allowBlank:false,
                    queryMode:'local',
                    valueField: 'tipe',
                    displayField:'display',
                    store:Ext.create('Ext.data.Store', {
                        fields: ['abbr', 'name'],
                        data : [
                            {"tipe":"administrator", "display":"Administrator"},
                            {"tipe":"pengguna", "display":"Pengguna"},
                            {"tipe":"staf", "display":"Staf"},
                            {"tipe":"operator", "display":"Operator"},
                            {"tipe":"arsip", "display":"Arsip"}
                        ]
                    })
                },
                {
                    xtype:'container',
                    layout: 'hbox',
                    items:[
                        {
                            flex: 1,
                            xtype:'combobox',
                            fieldLabel:'Jabatan',
                            labelWidth:120,
                            reference:'atasan',
                            name:'jabatan2',
                            submitValue:false,
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
                            },
                            listeners:{
                                select:'onJabatanChange',
                                focus:'onJabatanFocus'
                            }
                        },{
                            xtype:'button',
                            iconCls:'icon_release_jab',
                            margin:'0 0 0 2px',
                            //text:'File sejarah konsep',
                            tooltip:'Hapus Jabatan',
                            listeners:{
                                click:'release_jab'
                            }
                        }
                    ]
                },{
                    xtype:'fieldset',
                    margin:5,
                    //hidden:'true',
                    bind:{
                        hidden: '{!resetpwd.checked}'
                    },
                    defaults: {
                        anchor: '100%',
                        labelWidth:115
                    },
                    layout: 'anchor',
                    title:'Reset Password',
                    defaultType: 'textfield',
                    items :[{
                        fieldLabel: 'Password Baru',
                        name: 'pwd1',
                        inputType: 'password'
                    }, {
                        fieldLabel: 'Password(confirm)',
                        inputType: 'password',
                        name: 'pwd2'
                    }]
                }
            ]
        }
    ]
});
