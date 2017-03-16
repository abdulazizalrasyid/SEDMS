
Ext.define("Docs.view.disposisi.Tab",{
    extend: "Ext.tab.Panel",
    requires:[
        "Docs.view.disposisi.TabController",
        "Docs.view.disposisi.TabModel",
        'Docs.view.disposisi.grid.Keluar',
        'Docs.view.disposisi.grid.Masuk'
    ],
    controller: "disposisi-tab",
    viewModel: {
        type: "disposisi-tab"
    },
    tabBarHeaderPosition: 2,
    title:'Disposisi',
    xtype:"disposisi.Tab",
    listeners:{
        render:'render'
    }
    /*items:[
        {xtype:'disposisi.grid.Masuk'},
        {xtype:'disposisi.grid.Keluar'}
    ]*/
});
