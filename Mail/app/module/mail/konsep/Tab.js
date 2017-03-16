
Ext.define("Docs.view.konsep.Tab",{
    extend: "Ext.tab.Panel",
    requires:[
        "Docs.view.konsep.TabController",
        "Docs.view.konsep.TabModel",
        'Docs.view.konsep.form.Baru',
        'Docs.view.konsep.grid.Final',
        'Docs.view.konsep.grid.Masuk'
    ],
    controller: "konsep-tab",
    viewModel: {
        type: "konsep-tab"
    },
    tabBarHeaderPosition: 2,
    title:'Konsep Surat',
    xtype:"konsep.Tab",
    items:[
        {xtype:'konsep.form.Baru'},
        {xtype:'konsep.grid.Final'},
        {xtype:'konsep.grid.Masuk'}
    ]
});
