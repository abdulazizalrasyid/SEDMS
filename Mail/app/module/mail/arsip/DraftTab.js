
Ext.define("Docs.view.arsip.DraftTab",{
    extend: "Ext.tab.Panel",
    requires:[
        "Docs.view.arsip.DraftTabController",
        "Docs.view.arsip.DraftTabModel",
        "Docs.view.arsip.grid.ArchivedDraft",
        "Docs.view.arsip.grid.UnarchivedDraft"
    ],
    controller: "arsip-drafttab",
    viewModel: {
        type: "arsip-drafttab"
    },
    tabBarHeaderPosition: 2,
    title:'Arsip Konsep',
    xtype:"arsip.DraftTab",
    items:[
        {
            xtype:'arsip.grid.UnarchivedDraft'
        },{
            xtype:'arsip.grid.ArchivedDraft'
        }
    ]
});
