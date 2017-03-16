
Ext.define("Docs.view.menu.MenuOpr",{
    extend: "Ext.panel.Panel",
    requires:[
        "Docs.view.menu.MenuOprController",
        "Docs.view.menu.MenuOprModel"
    ],
    controller: "menu-menuopr",
    viewModel: {
        type: "menu-menuopr"
    },
    xtype:"menu.MenuOpr",
    bodyStyle:{
        background:'transparent'
    },
    items:[
       {
            //xtype:'menu',
            title : 'Pribadi',
            margin:'0 5 0 5',
            items:{
                xtype:'menu',
                plain: true,
                floating: false,
                reference:'menu_pribadi',
                itemId:'menu_pribadi'
                /*items:[
                    {
                        iconCls:'icon_inmail_register_36',text:'Registrasi Surat Masuk',
                        listeners:{
                            click:'on_register_surat_masuk'
                        }
                    },{
                        iconCls:'icon_outmail_register_36',text:'Registrasi Surat Keluar',
                        //margin:'10px 0 0 0',
                        listeners:{
                            click:'on_register_surat_keluar'
                        }
                    },{
                        iconCls:'icon_inmail_36',text:'Surat yang diolah',
                        tooltip:'status surat yang diinput',
                        listeners:{
                            click:'on_surat_operator'
                        }
                    },{
                        iconCls:'icon_report_36',text:'Laporan',
                        tooltip:'membuat laporan dalam bentuk file spreadsheet',
                        margin:'0 0 10px 0',
                        listeners:{
                            click:'on_laporan_operator'
                        }
                    },{
                        iconCls:'icon_inmail_disposisi_36',text:'Disposisi',
                        tooltip:'Surat yang didisposisikan atasan',
                        
                        listeners:{
                            click:'on_disposisi'
                        }
                    },{
                        iconCls:'icon_innote_36',text:'Nota Dinas',
                        //margin:'10px 0 0 0',
                        tooltip:'Nota Dinas',
                        listeners:{
                            click:'on_nodin'
                        }
                    },{
                        iconCls:'icon_draft_36',text:'Konsep Surat',
                        //margin:'10px 0 0 0',
                        tooltip:'Konsep Surat',
                        listeners:{
                            click:'on_draft'
                        }
                    }
                ]*/
            }
            
       }/*, {
            //xtype:'menu',
            title:'Atasan',
            margin:'10 5 0 5',
            items:{
                xtype:'menu',
                plain: true,
                floating: false,
                reference:'menu_atasan',
                itemId:'menu_atasan'
            }  
       }*//*, {
            //xtype:'menu',
            title:'Atasan',
            margin:'10 5 0 5',
            items:{
                xtype:'menu',
                plain: true,
                floating: false,
                items:[
                   {
                        iconCls:'icon_inmail_36',text:' Surat',
                        tooltip:'status surat masuk yang diinput',
                        listeners:{
                            click:'atasan_surat'
                        }
                    },{
                        iconCls:'icon_innote_36',text:'Nota Dinas',
                        //margin:'10px 0 0 0',
                        tooltip:'Nota Dinas',
                        listeners:{
                            click:'atasan_nodin'
                        }
                    },{
                        iconCls:'icon_draft_36',text:'Konsep Surat',
                        //margin:'10px 0 0 0',
                        tooltip:'Konsep Surat',
                        listeners:{
                            click:'atasan_draft'
                        }
                    },{
                        iconCls:'icon_draft_36',text:'Disposisi',
                        //margin:'10px 0 0 0',
                        tooltip:'Disposisi',
                        listeners:{
                            click:'atasan_disposisi'
                        }
                    }
                ]
            }  
       }*/

    ]

});
