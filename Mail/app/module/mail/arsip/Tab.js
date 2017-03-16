
Ext.define("Docs.view.arsip.Tab",{
    extend: "Ext.tab.Panel",
    requires:[
        "Docs.view.arsip.TabController",
        "Docs.view.arsip.TabModel",
        "Docs.view.arsip.grid.Archived",
        "Docs.view.arsip.grid.Unarchived"
    ],
    controller: "arsip-tab",
    viewModel: {
        type: "arsip-tab"
    },
    tabBarHeaderPosition: 2,
    title:'Arsip',
    xtype:"arsip.Tab",
    items:[
        {
            xtype:'arsip.grid.Unarchived'
        },{
            xtype:'arsip.grid.Archived'
        }
    ]
});
