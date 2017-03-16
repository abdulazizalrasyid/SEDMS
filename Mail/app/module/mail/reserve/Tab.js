
Ext.define("Docs.view.reserve.Tab",{
    extend: "Ext.tab.Panel",
    requires:[
        "Docs.view.reserve.TabController",
        "Docs.view.reserve.TabModel",
        "Docs.view.reserve.grid.Blank",
        "Docs.view.reserve.form.Reservation"
    ],
    controller: "reserve-tab",
    viewModel: {
        type: "reserve-tab"
    },
    xtype:"reserve.Tab",
    items:[
        {xtype:'reserve.form.Reservation'},
        {xtype:'reserve.grid.Blank'}
    ]
});
