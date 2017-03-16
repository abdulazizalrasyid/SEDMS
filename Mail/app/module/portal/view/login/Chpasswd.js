
Ext.define("Portal.view.login.Chpasswd",{
    extend: "Ext.window.Window",
    requires:[
        "Portal.view.login.ChpasswdController",
        "Portal.view.login.ChpasswdModel"
    ],
    controller: "login-chpasswd",
    viewModel: {
        type: "login-chpasswd"
    },
    xtype:"login.Chpasswd",
    width:400,
    height:167,
    modal:true,
    resizeable:false,
    title:'Ganti Password',
    items:[
        {
            xtype:'form',
            layout: 'anchor',
            defaults: {
                anchor: '100%',
                labelWidth:150,
                padding:5
            },
            bodyStyle:{
                background:'#E8EAF6'
            },
            defaultType: 'textfield',
            dockedItems:[
                        {
                            dock:'top',
                            xtype:'toolbar',
                            items:[
                               '->',{
                                    text:'Simpan',iconCls:'icon_verified_16',
                                    reference:'simpan',
                                    listeners:{
                                        click:'onClickSimpan'
                                    }
                                }
                            ]
                        }
                    ],
            items:[
                {
                    fieldLabel:'Password Lama',
                    name:'oldpass',
                    reference:'oldpass',
                    inputType:'password',
                    listeners: {
                        specialkey: 'onOldPwdEnter'
                    }
                },{
                    fieldLabel:'Password Baru',
                    name:'newpass',
                    reference:'newpass',
                    inputType:'password',
                    listeners: {
                        specialkey: 'onNewPwdEnter'
                    }
                },{
                    fieldLabel:'Password Baru (ulangi)',
                    name:'newpass2',
                    reference:'newpass2',
                    padding:'5 5 10 5',
                    inputType:'password',
                    listeners: {
                        specialkey: 'onNewPwd2Enter'
                    }
                }
            ]
        }
    ]
});
