
Ext.define("Docs.view.nodin.Tab",{
    extend: "Ext.tab.Panel",
    requires:[
        "Docs.view.nodin.TabController",
        "Docs.view.nodin.TabModel",
        "Docs.view.nodin.grid.Baru",
        "Docs.view.nodin.grid.Keluar",
        "Docs.view.nodin.grid.Masuk",
        "Docs.view.nodin.grid.Unclassified",
        "Docs.view.nodin.grid.Verifikasi"
    ],
    controller: "nodin-tab",
    tabBarHeaderPosition: 2,
    title:'Nota Dinas',
    viewModel: {
        type: "nodin-tab"
    },
    xtype:'nodin.Tab',
    //title:'Nota dinas',
    listeners:{
        render:'render'
    }
});
