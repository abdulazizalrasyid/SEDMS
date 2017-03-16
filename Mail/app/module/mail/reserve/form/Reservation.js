
Ext.define("Docs.view.reserve.form.Reservation",{
    extend: "Ext.form.Panel",
    requires:[
        "Docs.view.reserve.form.ReservationController",
        "Docs.view.reserve.form.ReservationModel"
    ],
    controller: "reserve-form-reservation",
    viewModel: {
        type: "reserve-form-reservation"
    },
    xtype:"reserve.form.Reservation",
    iconCls: "icon_date_16",
    title:'Reservasi Nomor',
    bodyPadding: 10,
    autoScroll : true,
    items:[
        {
            xtype:'treepanel',
            rootVisible: false,
            useArrows: true,
            itemId:'mytree',
            hideHeaders:true,
            autoScroll : true,
            plugins: {ptype: 'cellediting', clicksToEdit: 1},
            tbar: [{
                //text: 'Simpan reservasi tanggal ',
                bind:{
                    text:'{btReservasiText}'
                },
                scope: this,
                listeners: {
                    click:'onCheckedNodesClick'
                }
            }],
            store: new Ext.data.TreeStore({
                root: {
                    expanded: true,
                    children: [
                        { jenis:'KEP', text: "Keputusan", expanded: false,
                            children:[
                                {jenis:'KEP',unker:'LSN', text: "LSN",jumlah:0,checked:false, leaf: true}
                            ]
                        },
                        { jenis:'PED', text: "Pedoman", expanded: false,
                            children:[
                                {jenis:'PED', unker:'LSN', text: "LSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'PED', unker:'SU', text: "SU",jumlah:0,checked:false, leaf: true},
                                {jenis:'PED', unker:'STSN', text: "STSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'PED', unker:'PUSDIKLAT', text: "PUSDIKLAT",jumlah:0,checked:false, leaf: true},
                                {jenis:'PED', unker:'INS', text: "INS",jumlah:0,checked:false, leaf: true},
                                {jenis:'PED', unker:'D1', text: "D1",jumlah:0,checked:false, leaf: true},
                                {jenis:'PED', unker:'D2', text: "D2",jumlah:0,checked:false, leaf: true},
                                {jenis:'PED', unker:'D3', text: "D3",jumlah:0,checked:false, leaf: true}
                            ] 
                        },
                        { jenis:'PER', text: "Peraturan", expanded: false,
                            children:[
                                {jenis:'PER', unker:'LSN', text: "LSN",jumlah:0,checked:false, leaf: true}
                            ] 
                        },
                        { jenis:'INS', text: "Instruksi", expanded: false,
                            children:[
                                {jenis:'INS', unker:'LSN', text: "LSN",jumlah:0,checked:false, leaf: true}
                            ] 
                        },
                        { jenis:'JUK', text: "Petunjuk Pelaksanaan", expanded: false,
                            children:[
                                {jenis:'JUK', unker:'SU', text: "SU",jumlah:0,checked:false, leaf: true},
                                {jenis:'JUK', unker:'STSN', text: "STSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'JUK', unker:'PUSDIKLAT', text: "PUSDIKLAT",jumlah:0,checked:false, leaf: true},
                                {jenis:'JUK', unker:'INS', text: "INS",jumlah:0,checked:false, leaf: true},
                                {jenis:'JUK', unker:'D1', text: "D1",jumlah:0,checked:false, leaf: true},
                                {jenis:'JUK', unker:'D2', text: "D2",jumlah:0,checked:false, leaf: true},
                                {jenis:'JUK', unker:'D3', text: "D3",jumlah:0,checked:false, leaf: true}
                            ] 
                        },
                        { jenis:'TUG', text: "Surat Perintah/Surat Tugas", expanded: false,
                            children:[
                                {jenis:'TUG', unker:'LSN', text: "LSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'TUG', unker:'SU', text: "SU",jumlah:0,checked:false, leaf: true},
                                {jenis:'TUG', unker:'STSN', text: "STSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'TUG', unker:'PUSDIKLAT', text: "PUSDIKLAT",jumlah:0,checked:false, leaf: true},
                                {jenis:'TUG', unker:'INS', text: "INS",jumlah:0,checked:false, leaf: true},
                                {jenis:'TUG', unker:'D1', text: "D1",jumlah:0,checked:false, leaf: true},
                                {jenis:'TUG', unker:'D2', text: "D2",jumlah:0,checked:false, leaf: true},
                                {jenis:'TUG', unker:'D3', text: "D3",jumlah:0,checked:false, leaf: true}
                            ]
                        },
                        { jenis:'SDK', text: "Surat Dinas ditandatangani Kepala Lembaga Sandi Negara", expanded: false,
                            children:[
                                {jenis:'SDK',unker:'LSN', text: "LSN",jumlah:0,checked:false, leaf: true}
                            ] 
                        },
                        { jenis:'SDP', text: "Surat Dinas ditandatangani Pejabat Lain", expanded: false,
                            children:[
                                {jenis:'SDP', unker:'SU', text: "SU",jumlah:0,checked:false, leaf: true},
                                {jenis:'SDP', unker:'STSN', text: "STSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'SDP', unker:'PUSDIKLAT', text: "PUSDIKLAT",jumlah:0,checked:false, leaf: true},
                                {jenis:'SDP', unker:'INS', text: "INS",jumlah:0,checked:false, leaf: true},
                                {jenis:'SDP', unker:'D1', text: "D1",jumlah:0,checked:false, leaf: true},
                                {jenis:'SDP', unker:'D2', text: "D2",jumlah:0,checked:false, leaf: true},
                                {jenis:'SDP', unker:'D3', text: "D3",jumlah:0,checked:false, leaf: true}
                            ] 
                        },
                        { jenis:'ND', text: "Nota Dinas/Memorandum", expanded: false,
                            children:[
                                {jenis:'PER', unker:'LSN', text: "LSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'SU', text: "SU",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'STSN', text: "STSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'PUSDIKLAT', text: "PUSDIKLAT",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'INS', text: "INS",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D1', text: "D1",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D2', text: "D2",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D3', text: "D3",jumlah:0,checked:false, leaf: true}
                            ] },
                        { jenis:'PERJ', text: "Surat Perjanjian", expanded: false,
                            children:[
                                {jenis:'PER', unker:'LSN', text: "LSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'SU', text: "SU",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'STSN', text: "STSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'PUSDIKLAT', text: "PUSDIKLAT",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'INS', text: "INS",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D1', text: "D1",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D2', text: "D2",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D3', text: "D3",jumlah:0,checked:false, leaf: true}
                            ] },
                        { jenis:'SKU', text: "Surat Kuasa", expanded: false,
                            children:[
                                {jenis:'PER', unker:'LSN', text: "LSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'SU', text: "SU",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'STSN', text: "STSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'PUSDIKLAT', text: "PUSDIKLAT",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'INS', text: "INS",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D1', text: "D1",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D2', text: "D2",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D3', text: "D3",jumlah:0,checked:false, leaf: true}
                            ] },
                        { jenis:'BA', text: "Berita Acara", expanded: false,
                            children:[
                                {jenis:'PER', unker:'LSN', text: "LSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'SU', text: "SU",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'STSN', text: "STSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'PUSDIKLAT', text: "PUSDIKLAT",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'INS', text: "INS",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D1', text: "D1",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D2', text: "D2",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D3', text: "D3",jumlah:0,checked:false, leaf: true}
                            ] },
                        { jenis:'KET', text: "Surat Keterangan", expanded: false,
                            children:[
                                {jenis:'PER', unker:'LSN', text: "LSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'SU', text: "SU",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'STSN', text: "STSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'PUSDIKLAT', text: "PUSDIKLAT",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'INS', text: "INS",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D1', text: "D1",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D2', text: "D2",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D3', text: "D3",jumlah:0,checked:false, leaf: true}
                            ] },
                        { jenis:'SPN', text: "Surat Pengantar", expanded: false,
                            children:[
                                {jenis:'PER', unker:'LSN', text: "LSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'SU', text: "SU",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'STSN', text: "STSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'PUSDIKLAT', text: "PUSDIKLAT",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'INS', text: "INS",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D1', text: "D1",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D2', text: "D2",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D3', text: "D3",jumlah:0,checked:false, leaf: true}
                            ]},
                        { jenis:'PENG', text: "Pengumuman", expanded: false,
                            children:[
                                {jenis:'PER', unker:'LSN', text: "LSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'SU', text: "SU",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'STSN', text: "STSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'PUSDIKLAT', text: "PUSDIKLAT",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'INS', text: "INS",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D1', text: "D1",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D2', text: "D2",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D3', text: "D3",jumlah:0,checked:false, leaf: true}
                            ]},
                        { jenis:'LAP', text: "Laporan", expanded: false,
                            children:[
                                {jenis:'PER', unker:'LSN', text: "LSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'SU', text: "SU",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'STSN', text: "STSN",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'PUSDIKLAT', text: "PUSDIKLAT",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'INS', text: "INS",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D1', text: "D1",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D2', text: "D2",jumlah:0,checked:false, leaf: true},
                                {jenis:'PER', unker:'D3', text: "D3",jumlah:0,checked:false, leaf: true}
                            ] }
                    ]
                }
            }),
            columns: [{
                xtype: 'treecolumn',
                text: 'Uraian',
                dataIndex: 'text',
                flex: 1
                //sortable: true
            },{
                text: 'Jumlah',
                dataIndex:'jumlah',
                editor: {
                    xtype: 'numberfield',
                    //allowBlank: false,
                    minValue: 0,
                    maxValue: 99
                }
            }]
        }
    ]

});
