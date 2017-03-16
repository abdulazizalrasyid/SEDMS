
Ext.define("Mail.view.layout.Center",{
    extend: "Ext.panel.Panel",
    requires:[
        "Mail.view.layout.CenterController",
        "Mail.view.layout.CenterModel"
    ],
    controller: "layout-center",
    viewModel: {
        type: "layout-center"
    },
    xtype:"layout.Center",
    layout:'border',
    mixins: [
         'Ext.mixin.Responsive'
    ],
    responsiveFormulas: {
         small: 'width < 600',
         medium: 'width >= 600 && width < 800',
         large: 'width >= 800'
    },
    items:[
        {
            xtype:'layout.Menu'
        },{
           region:'center',
           itemId: 'center',
           layout:'fit'
        }
    ]
});
