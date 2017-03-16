
Ext.define("Mail.view.layout.North",{
    extend: "Ext.panel.Panel",
    requires:[
        "Mail.view.layout.NorthController",
        "Mail.view.layout.NorthModel"
    ],
    controller: "layout-north",
    viewModel: {
        type: "layout-north"
    },
    xtype:"layout.North",
    
    height:73,
    layout:   {
        type: 'hbox'
        //align: 'stretch'
    },
    bodyStyle:{
        backgroundColor:'#3f51b5',
        color:'#fff'
    },
    items:[
        {html: '<div id=\"header\"></div>',flex: 7,xtype:'container'},
        {
            layout:{
                type:'vbox'
            },
            flex: 4,
            defaults:{
                width:'100%'
            },
            bodyStyle:{
                backgroundColor:'#3f51b5',
                color:'#fff'
            },
            items:[
                {
                    xtype:'container',
                    reference:'nama'
                },{
                    xtype:'toolbar',
                    componentCls:{
                        backgroundColor:'transparent'
                    },
                    items:['->',{
                        xtype:'button',
                        itemId:'btChPassword',
                        text:'Ganti Password',
                        //margin:'30 0 0 0',
                        listeners:{
                            click:'changePassword'
                        },
                        iconAlign:'right',
                        iconCls:'icon_chpassword_16'
                    },{
                        xtype:'button',
                        itemId:'btLogout',
                        text:'logout',
                        //margin:'30 0 0 0',
                        iconAlign:'right',
                        iconCls:'icon_logout'
                    }]
                }
            ]
            
        }

    ]
});
