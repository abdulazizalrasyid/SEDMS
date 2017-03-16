
Ext.define("Docs.view.menu.MenuAdm",{
    extend: "Ext.menu.Menu",
    requires:[
        "Docs.view.menu.MenuAdmController",
        "Docs.view.menu.MenuAdmModel"
    ],
    controller: "menu-menuadm",
    viewModel: {
        type: "menu-menuadm"
    },
    xtype:'menu.MenuAdm',
    plain: true,
    floating: false,
    modal:true,
    items:[
        {
            iconCls:'icon_setting_36',text:'Pengguna',
            listeners:{
                click:'on_pengguna'
            }
        }, {
            iconCls:'icon_setting_36',text:'Jabatan',
            listeners:{
                click:'on_jabatan'
            }
        },{
            iconCls:'icon_setting_36',text:'Jenis Disposisi',
            tooltip:'status surat masuk yang diinput',
            listeners:{
                click:'on_jenis_disposisi'
            }
        },{
            iconCls:'icon_setting_36',text:' Jenis Dokumen',
            listeners:{
                click:'on_jenis_dokumen'
            }
        },{
            iconCls:'icon_setting_36',text:' Klasifikasi Arsip',
            listeners:{
                click:'on_klasifikasi_arsip'
            }
        },{
            iconCls:'icon_archive_36',text:'Jadwal Retensi Arsip',
            listeners:{
                click:'on_jra'
            }
        },{
            margin:'5px 0 0 0',
            iconCls:'icon_date_36',text:'Reservasi Nomor Surat',
            listeners:{
                click:'on_reservasi_nomor'
            }
        },{
            iconCls:'icon_inmail_36',text:'Surat yang diolah',
            tooltip:'status surat yang diinput',
            listeners:{
                click:'on_surat_operator'
            }
        }
    ]
});
