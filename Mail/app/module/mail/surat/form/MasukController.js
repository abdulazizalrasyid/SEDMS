Ext.define('Docs.view.surat.form.MasukController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.surat-form-masuk',
    init:function(){
        me=this;
        //console.log(Mail.LoggedInUser.data.id_atasan);
        me.lookupReference('created_by').setValue( Mail.LoggedInUser.data.username );
        me.lookupReference('id_pengolah').setValue( Mail.LoggedInUser.data.id );
        me.lookupReference('verification_request_id_jab').setValue(Mail.LoggedInUser.data.id_atasan);
        me.getViewModel().set('primer_code',"");

    },
    initIdSurat:function(self, newValue, oldValue, eOpts ){
        var me=this;
        me.getViewModel().set('id_surat',newValue);
    },
    onIdKlasifikasiFokus:function( self, event, eOpts ){
        self.getStore().reload();
    },
    onIdKlasifikasiSelect:function(self, records, eOpts){
        //console.log(records);
        me = this;
        if (records[0].data.kode.length < 8 ){
            Ext.Msg.show({
                title:'ERROR',
                message: 'Cek lagi pilihan klasifikasi <br/> <i>kode klasifikasi minimal 6 digit</i>',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            me.lookupReference('id_klasifikasi').reset();
        }
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
    onCodeChange:function(self, newValue, oldValue, eOpts){
        //console.log(newValue);
        this.getViewModel().set('primer_code',newValue);
        this.getViewModel().getStore('klasifikasi').reload();
        this.lookupReference('id_klasifikasi').setValue("");
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
        var cur_user = Mail.LoggedInUser.data.username;
        
        Ext.Ajax.request({
            url: serverURL+'login/index.json',
            success: function( response, options ) {
                var result = Ext.decode( response.responseText );
                //console.log(result);
                if (result.success == true){
                    if( cur_user == result.user.username ) {
                        
                        if (form.isValid()) {
                            Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan menyimpan data ini?',
                                function(btn) {
                                    if (btn === 'yes') {
                                        form.url = serverURL+'surat/simpan_1';
                                        form.submit({
                                            params: {
                                                tahun: tahunmasuk,
                                                tipe_surat:'M'
                                            },
                                            //headers: {'Content-Type': "multipart/form-data" },
                                            success: function(form, action) {
                                                //console.log(action.response.responseText);
                                                var result = Ext.decode( action.response.responseText );
                                                form.reset();
                                                me.lookupReference('created_by').setValue( Mail.LoggedInUser.data.username );
                                                me.lookupReference('id_pengolah').setValue( Mail.LoggedInUser.data.id );
                                                me.lookupReference('verification_request_id_jab').setValue(Mail.LoggedInUser.data.id_atasan);
                                                me.lookupReference('tgl_terima').setValue(new Date());
                                                Ext.Msg.show({
                                                    title:'Data tersimpan',
                                                    message: 'Data telah tersimpan ke dalam database',
                                                    buttons: Ext.Msg.OK,
                                                    icon: Ext.Msg.INFO
                                                });
                                                //console.log(result.id_surat);
                                                me.lookupReference('id').setValue(result.id_surat);
                                                me.lookupReference('fromstage1').setVisible(false);
                                                me.lookupReference('fromstage2').setVisible(true);

                                                me.lookupReference('menu_atasan').removeAll();
                                                Ext.Ajax.request({
                                                    url: serverURL+'notifikasi/menu_atasan.json',
                                                    method:'get',
                                                    params:{
                                                        id_atasan:Mail.LoggedInUser.data.id_atasan
                                                    },
                                                    success: function( response, options ) {
                                                        var result = Ext.decode( response.responseText );
                                                        Ext.Array.each(result, function (record, index, array) {
                                                            me.lookupReference('menu_atasan').add(record);
                                                        });
                                                    },
                                                    failure: function( response, options ) {
                                                        Ext.Msg.alert( 'Perhatian', 'Kesalahan terjadi pada request ini' );
                                                    }
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
                    }else{
                        Ext.globalEvents.fireEvent( 'doLogout' );
                    }
                }
            },
            failure: function( response, options ) {
                Ext.Msg.alert( 'Perhatian', 'Kesalahan terjadi pada request ini' );
            }
        }); 
    }, 
    onClickSimpan2:function(){
    	var me=this, 
    	form =  me.lookupReference('fromstage2').getForm(),
    	values = form.getValues();
        //console.log(me.lookupReference('filename'));
        var cur_user = Mail.LoggedInUser.data.username;

        Ext.Ajax.request({
            url: serverURL+'login/index.json',
            success: function( response, options ) {
                var result = Ext.decode( response.responseText );
                //console.log(result);
                if (result.success == true){
                    if( cur_user == result.user.username ) {
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
                    }else{
                        Ext.globalEvents.fireEvent( 'doLogout' );
                    }
                }
            },
            failure: function( response, options ) {
                Ext.Msg.alert( 'Perhatian', 'Kesalahan terjadi pada request ini' );
            }
        }); 

    }
    
});
