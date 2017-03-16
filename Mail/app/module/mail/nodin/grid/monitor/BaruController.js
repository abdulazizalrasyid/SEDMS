Ext.define('Docs.view.nodin.grid.monitor.BaruController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.nodin-grid-monitor-baru',
    init:function(){
        me=this;
        me.getViewModel().set('id_jabatan',Mail.LoggedInUser.data.id_jabatan);
        me.getViewModel().set('id_atasan',Mail.LoggedInUser.data.id_atasan);
        me.lookupReference('verification_request_id_jab').setValue(Mail.LoggedInUser.data.id_jabatan);
        me.lookupReference('penandatangan').setValue(Mail.LoggedInUser.data.jabatan);
        me.lookupReference('verified').setValue(1);
        me.lookupReference('kode_jab_pengirim').setValue( Mail.LoggedInUser.data.kode_jabatan );
        me.lookupReference('id_jab_pengirim').setValue( Mail.LoggedInUser.data.id_jabatan );
        me.lookupReference('verification_request_id_jab').setHidden( true );
    },
    setNomorSurat:function(){
        var me=this;
        //console.log('set nomor surat');
        var tahun = Ext.Date.format(new Date(), 'Y'); 
        var bulan = Ext.Date.format(new Date(), 'm'); 
        
        Ext.Ajax.request({
            url: serverURL+'notadinas/tentative.json',
            method:'get',
            params:{
                tahun: tahun,
                id_jabatan:me.lookupReference('id_jab_pengirim').getValue()
            },
            success: function( response, options ) {
                var result = Ext.decode( response.responseText );
                nomor = result;
                me.lookupReference('no_urut').setValue(nomor);
                me.lookupReference('tahun').setValue(tahun);
                me.lookupReference('nomor_surat_fake').setValue(nomor+'/'+me.lookupReference('kode_jab_pengirim').getValue()+/*'/'+ me.lookupReference('kode_klasifikasi').getValue()+*/'/'+bulan+'/'+tahun);
                me.lookupReference('nomor_surat').setValue(nomor+'/'+me.lookupReference('kode_jab_pengirim').getValue()+/*'/'+ me.lookupReference('kode_klasifikasi').getValue()+*/'/'+bulan+'/'+tahun);
                
            },
            failure: function( response, options ) {
                Ext.Msg.alert( 'Perhatian', 'Kesalahan terjadi pada request nomor urut' );
            }
        }); 
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
    onTgl_Change:function(field, value){
        var tahun = Ext.util.Format.date(value,'Y');
        this.lookupReference('tahun_hidden').setValue( tahun );
    },
    onTujuanSelect:function(me, records, eOpts){
        this.lookupReference('id_jab_penerima').setValue( records[0].data.id_jabatan);
    },
    onClickSimpan:function(){
        var me = this; 
        form = me.getView().getForm(),
        values = form.getValues();

        if (form.isValid()) {
            if (me.lookupReference('filename').value == ''){
                Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan menyimpan mengirim Nota dinas ini <br />tanpa berkas lampiran?',
                function(btn) {
                    if (btn === 'yes') {
                        form.url = serverURL+'notadinas/simpan';
                        //form.url = serverURL+'notadinas/check';
                        form.submit({
                            success: function(form, action) {
                                form.reset();
                                me.init();
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
            }else{
                Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan mengirim nota dinas ini?',
                function(btn) {
                    if (btn === 'yes') {
                        //form.url = serverURL+'notadinas/check';
                        form.url = serverURL+'notadinas/simpan2';
                        form.submit({
                            headers: {'Content-Type': "multipart/form-data" },
                            success: function(form, action) {
                                console.log('sukses');
                                form.reset();
                                me.init();
                                //form.reset();
                                //me.getView().close();
                                //me.lookupReference('id_pengolah').setValue( Mail.LoggedInUser.data.id );
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
            
        }
    },
    expand:function(f){
        me=this;
        //console.log(f);
        me.lookupReference('teruskan').getStore().reload();
    },
    changePengirim:function(me, records){
        me=this;
        me.getViewModel().set('id_jabatan',records[0].data.id_jabatan);
        me.getViewModel().set('id_atasan',records[0].data.id_atasan);
        me.lookupReference('teruskan').clearValue( );
        //console.log(records);
       // console.log(Mail.LoggedInUser.data.id_jabatan);

        if ( records[0].data.id_jabatan != Mail.LoggedInUser.data.id_jabatan){
            me.lookupReference('verified').setValue(0);
            me.lookupReference('verification_request_id_jab').setValue(records[0].data.id_jabatan);

            me.lookupReference('verification_request_id_jab').setVisible( true );
        }else{
            me.lookupReference('verified').setValue(1);
            me.lookupReference('verification_request_id_jab').setValue(records[0].data.id_jabatan);
            me.lookupReference('verification_request_id_jab').setHidden( true );
        }
        me.lookupReference('kode_jab_pengirim').setValue( records[0].data.kode_jabatan );
        me.lookupReference('id_jab_pengirim').setValue( records[0].data.id_jabatan );

        me.setNomorSurat();
    }
});
