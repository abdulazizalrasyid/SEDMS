
Ext.define("Docs.view.menu.MenuArsip",{
    extend: "Ext.menu.Menu",
    requires:[
        "Docs.view.menu.MenuArsipController",
        "Docs.view.menu.MenuArsipModel"
    ],
    controller: "menu-menuarsip",
    viewModel: {
        type: "menu-menuarsip"
    },
    xtype:'menu.MenuArsip',
    plain: true,
    floating: false,
    modal:true,
    items:[
       {
            margin:'5px 0 0 0',
            iconCls:'icon_archive_36',text:'Jadwal Retensi Arsip',
            listeners:{
                click:'on_jra'
            }
        },{
            margin:'5px 0 0 0',
            iconCls:'icon_archive_36',text:'Arsip Surat',
            listeners:{
                click:'on_archive'
            }
        },{
            margin:'5px 0 0 0',
            iconCls:'icon_archive_36',text:'Arsip Konsep',
            listeners:{
                click:'on_draftarchive'
            }
        },{
            margin:'5px 0 0 0',
            iconCls:'icon_archive_36',text:'Relasi Arsip',
            listeners:{
                click:'on_relasi'
            }
        }
    ]
});
