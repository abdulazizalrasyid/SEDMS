Ext.define('Docs.view.surat.window.OprKeluarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.surat-window-oprkeluar',
    init:function(){
        me=this;
        me.getViewModel().set('id_jabatan',Mail.LoggedInUser.data.id_jabatan);
        me.lookupReference('created_by').setValue( Mail.LoggedInUser.data.username );
        me.lookupReference('id_pengolah').setValue( Mail.LoggedInUser.data.id );
    },
    onIdKlasifikasiFokus:function( self, event, eOpts ){
        self.getStore().reload();
    },
    onCodeChange:function(self, newValue, oldValue, eOpts){
        //console.log(newValue);
        this.getViewModel().set('primer_code',newValue);
        this.getViewModel().getStore('klasifikasi').reload();
        this.lookupReference('id_klasifikasi').setValue("");
    },
    initIdSurat:function(self, newValue, oldValue, eOpts ){
    	var me=this;
    	me.getViewModel().set('id_surat',newValue);
        me.lookupReference('id_surat2').setValue(newValue);
    }, 
    onClickCetak:function(){
        var me = this;
        var id_surat = me.lookupReference('id_surat').getValue();
        window.open(serverURL+'cetak/pengantar/?id_surat='+id_surat);
    },
    downloadFile:function(me, record, item, index, e, eOpts){
        me = this;
        //console.log(record.data.nama_file);
        window.open(uploadURL+record.data.nama_file);
    },
    beforeclose:function(){
        Ext.globalEvents.fireEvent( 'refreshGridOprKeluar' );
    },
    addFileField:function(){
        var me = this;

        me.lookupReference('thirdContainer').add(
                {
                    xtype:'fieldcontainer',
                    layout: 'hbox',
                    items:[
                    {
                        xtype:'filefield',
                        flex:1,
                        name:'myfile[]',
                        //buttonOnly: true,
                        hideLabel: true,
                        buttonText: 'Pilih File'
                    },{
                        xtype:'button',
                        iconCls:'icon_add_16',
                        margin:'0 0 0 2px',
                        listeners:{
                            click:'addFileField'
                        }
                        //width:20,height:20
                    }
                    ]
                }
            )
        //console.log('test');
    },
    onClickSimpan:function(){

        var me=this, 
        form =  me.lookupReference('fromstage1').getForm(),
        values = form.getValues();
        var tanggal_surat = me.lookupReference('tgl_surat').getValue();
        var tahunmasuk = Ext.Date.format(tanggal_surat, 'Y');


        if (form.isValid()) {
            Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan menyimpan data ini?',
                function(btn) {
                    if (btn === 'yes') {
                        form.url = serverURL+'surat/update';
                        form.submit({
                            params: {
                                tahun: tahunmasuk,
                                tipe_surat:'K',
                                verified_by:Mail.LoggedInUser.data.username,
                                verified_on:new Date()
                            },
                            //headers: {'Content-Type': "multipart/form-data" },
                            success: function(form, action) {
                                //console.log(action.response.responseText);
                                var result = Ext.decode( action.response.responseText );
                                //form.reset();
                                Ext.Msg.show({
                                    title:'Data tersimpan',
                                    message: 'Data telah tersimpan ke dalam database',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                                //console.log(result.id_surat);
                                //me.lookupReference('id').setValue(result.id_surat);
                            },
                            failure: function(form, action) {
                                console.log('gagal mengirim surat masuk');
                            }
                        });

                    } else {
                        return false;
                    }
            }); 
        }
    },
    onClickSimpan2:function(){
        var me=this, 
        form =  me.lookupReference('fromstage2').getForm(),
        values = form.getValues();
        //console.log(me.lookupReference('filename'));

        if (form.isValid()) {
            if( me.lookupReference('filename').getValue() == ''){
                Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan menyimpan data ini tanpa file?<br />File dapat anda masukkan dengan menu edit',
                function(btn) {
                    if (btn === 'yes') {
                        form.url = serverURL+'surat/simpan_2';
                        form.submit({
                            headers: {'Content-Type': "multipart/form-data" },
                            success: function(form, action) {
                                //console.log('sukses');
                                form.reset();
                                Ext.Msg.show({
                                    title:'Data tersimpan',
                                    message: 'Data telah tersimpan ke dalam database',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                                me.lookupReference('fromstage1').setVisible(true);
                                me.lookupReference('fromstage2').setVisible(false);

                            },
                            failure: function(form, action) {
                                console.log('gagal mengirim surat masuk');
                            }
                        });
                    } else {
                        return false;
                    }
            });
            }else{
                Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan menyimpan data ini?',
                function(btn) {
                    if (btn === 'yes') {
                        form.url = serverURL+'surat/simpan_2';
                        form.submit({
                            headers: {'Content-Type': "multipart/form-data" },
                            success: function(form, action) {
                                //console.log('sukses');
                                //form.reset();
                                Ext.Msg.show({
                                    title:'Data tersimpan',
                                    message: 'Data telah tersimpan ke dalam database',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                                me.lookupReference('gridfile').getStore().reload();

                            },
                            failure: function(form, action) {
                                var result = Ext.decode( action.response.responseText );
                                Ext.Msg.show({
                                    title:'ERROR : File belum tersimpan',
                                    message: result.error,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.ERROR
                                });
                            }
                        });
                    } else {
                        return false;
                    }
            });
            }
            
        }

    },
    onAsalSelect:function(me, records, eOpts){
        this.lookupReference('id_jabatan').setValue( records[0].data.id_jabatan);
        this.lookupReference('kode_jabatan').setValue( records[0].data.kode_jabatan);
        //this.setNomorSurat();
    },
    onKlasifikasiSelect:function(me, records, eOpts){
        console.log(records);
        this.lookupReference('kode_klasifikasi').setValue( records[0].data.kode);
        //this.setNomorSurat();
    }
    
});
