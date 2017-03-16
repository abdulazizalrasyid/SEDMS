
Ext.define("Portal.view.login.Window",{
    requires:[
    	'Portal.view.login.WindowController',
    	'Portal.view.login.WindowModel'
    ],
    extend: "Ext.window.Window",
    controller: "portal-login-window",
    viewModel: {
        type: "portal-login-window"
    },
    xtype:'login.Window',
    resizable:false,
    draggable:false,
    closable:false,
    shadow:false,
    modal:true,
    bodyStyle:{
        background:'#3F51B5'
    },
    width:799,
    height:270,
    defaultFocus : 'username',
    layout:'border',
    listeners:{
        show:'onShow'
    },
    items:[
        {
            region:'east',
            width:300,
            xtype:'form',
            reference:'frmLogin',
            fieldDefaults: {
                //labelAlign: 'top',
                height:50,
                style: {
                    backgroundColor:'#fff'
                }
            },

            maskOnDisable:false,
            
            url: serverURL+'login/check.json',

            defaultType: 'textfield',

            bodyStyle:{
                background:'#3F51B5'
            },

            margin:'20 0 0 0',
            padding:10,

            layout: 'anchor',
            items: [{
                    emptyText:'Nama Pengguna',
                    name: 'username',
                    reference:'username',
                    itemId:'username',
                    anchor:'100%',
                    margin:'20 0 0 0',
                    listeners: {
                        specialkey: 'onUnameEnter'
                    }
                },{
                    emptyText:'Password',
                    name: 'passwd',
                    reference:'passwd',
                    inputType: 'password',
                    anchor:'100%',
                    margin:'20 0 20 0',
                    listeners: {
                        specialkey: 'onPasswordEnter'
                    }
                },{
                    xtype:'button',
                    text: 'Login',
                    height:50,
                    anchor:'100%',
                    reference:'btLogin',
                    listeners:{
                        click:'onBtLoginClick'
                    }
            }]                
            
        },{
            region:'center',
            xtype:'image',
            src:'resources/login-img.jpg'
        }
    ]    
});
