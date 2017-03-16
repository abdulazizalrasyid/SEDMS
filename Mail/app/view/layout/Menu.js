
Ext.define("Mail.view.layout.Menu",{
    extend: "Ext.panel.Panel",
    requires:[
        "Mail.view.layout.MenuController",
        "Mail.view.layout.MenuModel"
    ],
    controller: "layout-menu",
    viewModel: {
        type: "layout-menu"
    },
    
    xtype:"layout.Menu",
    bodyStyle:{
        backgroundColor:'#a0a8d5',
        color:'#fff'
    },
    plugins: 'responsive',
    layout:{
        type:'vbox'
    },
    defaults:{
        width:'100%'
    },
    responsiveConfig : {
         small: {
             region:'east',
             width:60
         },
         medium: {
             region:'east',
             width:60
         },
         large: {
            region:'east',
            width:300
         }
    }
});
