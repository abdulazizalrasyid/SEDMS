
Ext.define("Docs.view.menu.MenuPengguna",{
    extend: "Ext.menu.Menu",
    requires:[
        "Docs.view.menu.MenuPenggunaController",
        "Docs.view.menu.MenuPenggunaModel"
    ],
    controller: "menu-menupengguna",
    viewModel: {
        type: "menu-menupengguna"
    },
    xtype:"menu.MenuPengguna",
    plain: true,
    floating: false,
    modal:true,
    layout:'vbox'
    /*items:[
        {
            iconCls:'icon_inmail_36',
            bind:{
                text:'Surat {textMnSurat}'
            },
            references:'mnSurat',
            tooltip:'Surat masuk',
            listeners:{
                click:'on_surat'
            }
        },{
            iconCls:'icon_innote_36',
             bind:{
                text:'Nota Dinas {textMnNodin}'
            },
            references:'mnNodin',
            tooltip:'Nota Dinas',
            listeners:{
                click:'on_notadinas'
            }
        },{
            iconCls:'icon_draft_36',
            text:'Konsep Surat',
            references:'mnKonsep',
            tooltip:'Konsep Surat',
            listeners:{
                click:'on_draft'
            }
        },{
            iconCls:'icon_inmail_disposisi_36',
             bind:{
                text:'Disposisi {textMnDisposisi}'
            },
            references:'mnDisposisi',
            tooltip:'Surat yang didisposisikan atasan',
            padding:'0 0 10px 0',
            listeners:{
                click:'on_disposisi'
            }
        }
    ]*/
});
