Ext.define('Docs.view.surat.window.OprMasukController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.surat-window-oprmasuk',
    init:function(){
        me=this;
        me.getViewModel().set('id_jabatan',Mail.LoggedInUser.data.id_jabatan);
    },
    initIdSurat:function(self, newValue, oldValue, eOpts ){
    	var me=this;
        me.getViewModel().set('id_surat',newValue);
    	me.lookupReference('id_surat2').setValue(newValue);
    },
    downloadFile:function(me, record, item, index, e, eOpts){
        me = this;
        //console.log(record.data.nama_file);
        window.open(uploadURL+record.data.nama_file);
    },
    onIdKlasifikasiFokus:function( self, event, eOpts ){
        self.getStore().reload();
    }, 
    onClickCetak:function(){
        var me = this;
        var id_surat = me.lookupReference('id_surat').getValue();
        window.open(serverURL+'cetak/pengantar/?id_surat='+id_surat);
    },
    onClickCetakDisposisi:function(){
        var me = this;
        var id_surat = me.lookupReference('id_surat').getValue();
        window.open(serverURL+'cetak/disposisi/?id_surat='+id_surat);
    },
    onCodeChange:function(self, newValue, oldValue, eOpts){
        //console.log(newValue);
        this.getViewModel().set('primer_code',newValue);
        this.getViewModel().getStore('klasifikasi').reload();
        this.lookupReference('id_klasifikasi').setValue("");
    },
    beforeclose:function(){
        Ext.globalEvents.fireEvent( 'refreshGridOprMasuk' );
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
                    }/*,{
                        xtype:'button',
                        iconCls:'icon_del_16',
                        margin:'0 0 0 2px'
                        //width:20,height:20
                    }*/
                    ]
                }
            )
        //console.log('test');
    },
    onTgl_terimaChange:function(field, value){
        var tahun = Ext.util.Format.date(value,'Y');
        //console.log(tahun);
        this.lookupReference('tahun_hidden').setValue( tahun );
    },
    onTujuanSelect:function(me, records, eOpts){
        this.lookupReference('id_jabatan').setValue( records[0].data.id_jabatan);
    },
    onCbVerifikasi:function(){
        //me.lookupReference('verification_request_id_jab').setValue(11);
        //console.log(me.lookupReference('verification_request_id_jab').getValue());
    },
     onClickSimpan1:function(){
            var me=this, 
            form =  me.lookupReference('fromstage1').getForm(),
            values = form.getValues();
            var tanggal_surat = me.lookupReference('tgl_terima').getValue();
            var tahunmasuk = Ext.Date.format(tanggal_surat, 'Y');
            
            if (form.isValid()) {
                Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan menyimpan data ini?',
                    function(btn) {
                        if (btn === 'yes') {
                            form.url = serverURL+'surat/update';
                            form.submit({
                                params: {
                                    tahun: tahunmasuk,
                                    tipe_surat:'M'
                                },
                                //headers: {'Content-Type': "multipart/form-data" },
                                success: function(form, action) {
                                    //console.log(action.response.responseText);
                                    var result = Ext.decode( action.response.responseText );
                                    Ext.Msg.show({
                                        title:'Data tersimpan',
                                        message: 'Data telah tersimpan ke dalam database',
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.INFO
                                    });

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
                            //headers: {'Content-Type': "multipart/form-data" },
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
                                //me.lookupReference('fromstage2').setVisible(false);
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

    }
    
});
