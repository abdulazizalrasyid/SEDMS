
Ext.define("Docs.view.surat.OprTab",{
    extend: "Ext.tab.Panel",
    requires:[
        "Docs.view.surat.OprTabController",
        "Docs.view.surat.OprTabModel",
        'Docs.view.surat.grid.OprKeluar',
        'Docs.view.surat.grid.OprMasuk'
    ],
    controller: "surat-oprtab",
    tabBarHeaderPosition: 2,
    title:'Surat yang diolah',
    viewModel: {
        type: "surat-oprtab"
    },
    xtype:"surat.OprTab",
    items:[
        {xtype:'surat.grid.OprMasuk'},
        {xtype:'surat.grid.OprKeluar'},
        {
            xtype:'konsep.grid.Final',
            title:'Konsep Final'
        },
        {
            xtype:'nodin.grid.OprMasuk',
            title:'Nota Dinas'
        }
    ]
});
