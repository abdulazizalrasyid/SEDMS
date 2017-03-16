
Ext.define("Docs.view.surat.Tab",{
    extend: "Ext.tab.Panel",
    requires:[
        "Docs.view.surat.TabController",
        "Docs.view.surat.TabModel",
        'Docs.view.surat.grid.Keluar',
        'Docs.view.surat.grid.Masuk',
        'Docs.view.surat.grid.Verifikasi'
    ],
    controller: "surat-tab",
    tabBarHeaderPosition: 2,
    title:'Surat',
    viewModel: {
        type: "surat-tab"
    },
    xtype:"surat.Tab",
    /*items:[
        {xtype:'surat.grid.Masuk'},
        {xtype:'surat.grid.Keluar'},
        {xtype:'surat.grid.Verifikasi'}
    ],*/
    listeners:{
        render:'render'
    }
});
