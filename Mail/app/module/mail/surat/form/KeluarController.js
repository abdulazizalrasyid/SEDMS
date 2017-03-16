Ext.define('Docs.view.surat.form.KeluarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.surat-form-keluar',
    init:function(){
        me=this;
        me.lookupReference('created_by').setValue( Mail.LoggedInUser.data.username );
        me.lookupReference('id_pengolah').setValue( Mail.LoggedInUser.data.id );
        this.lookupReference('unit_pemrakarsa').setStore(this.getViewModel().getStore('unit_pemrakarsa'));
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
    addFileField:function(){
    	var me = this;
    	me.lookupReference('myFieldContainers').add(
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

        var cur_user = Mail.LoggedInUser.data.username;
        
        Ext.Ajax.request({
            url: serverURL+'login/index.json',
            success: function( response, options ) {
                var result = Ext.decode( response.responseText );
                if (result.success == true){
                    if( cur_user == result.user.username ) {
                    //start process
                        if (form.isValid()) {
                            Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan menyimpan data ini?',
                                function(btn) {
                                    if (btn === 'yes') {
                                        form.url = serverURL+'surat/simpan_3';
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
                                                form.reset();
                                                me.lookupReference('created_by').setValue( Mail.LoggedInUser.data.username );
                                                me.lookupReference('id_pengolah').setValue( Mail.LoggedInUser.data.id );
                                                //me.lookupReference('verification_request_id_jab').setValue(Mail.LoggedInUser.data.id_atasan);
                                                me.lookupReference('tgl_kirim').setValue(new Date());
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
                    //end process
                    }else{
                        Ext.globalEvents.fireEvent( 'doLogout' );
                    }
                }
            },
            failure: function( response, options ) {
                Ext.Msg.alert( 'Perhatian', 'Kesalahan terjadi pada request ini' );
            }
        }); 

        /*
        var cur_user = Mail.LoggedInUser.data.username;
        Ext.Ajax.request({
            url: serverURL+'login/index.json',
            success: function( response, options ) {
                var result = Ext.decode( response.responseText );
                if (result.success == true){
                    if( cur_user == result.user.username ) {
                    //start process

                    //end process
                    }else{
                        Ext.globalEvents.fireEvent( 'doLogout' );
                    }
                }
            },
            failure: function( response, options ) {
                Ext.Msg.alert( 'Perhatian', 'Kesalahan terjadi pada request ini' );
            }
        });
        */
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
                if (result.success == true){
                    if( cur_user == result.user.username ) {
                    //start process
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
                    //end process
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
    /*onAsalSelect:function(me, records, eOpts){
        this.lookupReference('id_jabatan').setValue( records[0].data.id_jabatan);
        this.lookupReference('kode_jabatan').setValue( records[0].data.kode_jabatan);
        this.setNomorSurat();
        
    },*/
    onKlasifikasiSelect:function(me, records, eOpts){
        //console.log(records);
        this.lookupReference('kode_klasifikasi').setValue( records[0].data.kode);
        if (records[0].data.kode.length < 8 ){
            Ext.Msg.show({
                title:'ERROR',
                message: 'Cek lagi pilihan klasifikasi <br/> <i>kode klasifikasi minimal 6 digit</i>',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            this.lookupReference('id_klasifikasi').reset();
        }
        this.setNomorSurat();
    },
    onPenandatanganSelect:function(me, records, eOpts){
        //this.lookupReference('unit_pemrakarsa').setStore(this.getViewModel().getStore('unit_pemrakarsa').reload())
        //console.log(records[0].data);
        this.lookupReference('id_jabatan').setValue(records[0].data.id_jabatan);
        this.lookupReference('kode_jabatan').setValue( records[0].data.kode_jabatan);
        this.lookupReference('unit_pemrakarsa').setValue(records[0].data.kode_unker);
        this.setNomorSurat();
    },
    setNomorSurat:function(){
        var me = this;
        form = me.lookupReference('fromstage1');
        values = form.getValues();
        
        //nomor = 'x';
        //var no_registrasi_surat = me.lookupReference('no_registrasi_surat').setValue(result);
        var tgl_surat = me.lookupReference('tgl_surat').getValue();
        var kode_jabatan = me.lookupReference('kode_jabatan').getValue();
        var unit_pemrakarsa = me.lookupReference('unit_pemrakarsa').getValue();
        var id_jabatan_asal = me.lookupReference('id_jabatan').getValue();
        var tahun = Ext.Date.format(tgl_surat, 'Y'); 
        var bulan = Ext.Date.format(tgl_surat, 'm');

        me.lookupReference('tahun_hidden').setValue( tahun );
                
        var klasifikasi  = me.lookupReference('kode_klasifikasi').getValue();
        var jenis  = me.lookupReference('jenis').getValue();

        if (( tahun != '') && ( id_jabatan_asal != '') && ( unit_pemrakarsa != null) && ( jenis != '')){

            Ext.Ajax.request({
                url: serverURL+'surat/tentative.json',
                method:'get',
                params:{
                    tahun: tahun,
                    jenis: jenis,
                    unit_pemrakarsa:unit_pemrakarsa
                },
                success: function( response, options ) {
                    var result = Ext.decode( response.responseText );
                    nomor = result;
                    if (jenis == 'KEP'){
                        me.lookupReference('penandatangan').select('Kepala Lembaga Sandi Negara');
                        me.lookupReference('id_jabatan').setValue(me.lookupReference('penandatangan').selection.data.id);
                        me.lookupReference('unit_pemrakarsa').setValue('LSN');
                        composed = nomor+' Tahun '+tahun;
                        //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
                         //console.log(  me.lookupReference('penandatangan').selection.data.id);
                         //console.log( me.lookupReference('id_jabatan').getValue());
                    }else if (jenis == 'PED'){
                        me.lookupReference('penandatangan').select('Kepala Lembaga Sandi Negara');
                        me.lookupReference('id_jabatan').setValue(me.lookupReference('penandatangan').selection.data.id);
                        composed = nomor+' Tahun '+tahun;
                        me.lookupReference('unit_pemrakarsa').setValue('LSN');
                        //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
                         //console.log(  me.lookupReference('penandatangan').selection.data.id);
                         //console.log( me.lookupReference('id_jabatan').getValue());
                    }else if (jenis == 'TUG'){
                        composed = nomor+'/'+unit_pemrakarsa+'/'+bulan+'/'+tahun;
                        //me.lookupReference('penandatangan').setFieldLabel('Unit Kerja');
                         //me.lookupReference('penandatangan').select('Kepala Lembaga Sandi Negara');
                    }else if (jenis == 'SDK'){
                        me.lookupReference('penandatangan').select('Kepala Lembaga Sandi Negara');
                        me.lookupReference('id_jabatan').setValue(me.lookupReference('penandatangan').selection.data.id);
                        //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
                        //console.log(  me.lookupReference('penandatangan').selection.data.id);
                        //console.log( me.lookupReference('id_jabatan').getValue());
                        me.lookupReference('unit_pemrakarsa').setValue('LSN');
                        sifat = me.lookupReference('sifat').getValue();
                        sifat2 = me.lookupReference('sifat2').getValue();
                        //console.log(sifat);
                        if (sifat==true) {
                            composed = 'R-'+nomor+'/K.LSN/'+klasifikasi+'/'+bulan+'/'+tahun;
                        } else if (sifat2==true) {
                            composed = 'R-'+nomor+'/K.LSN/'+klasifikasi+'/'+bulan+'/'+tahun;
                        } else {
                            composed = nomor+'/K.LSN/'+klasifikasi+'/'+bulan+'/'+tahun;
                        }
                    }else if (jenis == 'SDP'){
                        composed = nomor+'/LSN/'+unit_pemrakarsa+'/'+klasifikasi+'/'+bulan+'/'+tahun;
                        //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
                    }else if (jenis == 'ND'){
                        composed = nomor+'/'+unit_pemrakarsa+'/'+klasifikasi+'/'+bulan+'/'+tahun;
                        //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
                    }else if (jenis == 'PERJ'){
                        composed = jenis+'.'+nomor+'/'+unit_pemrakarsa+'/'+klasifikasi+'/'+bulan+'/'+tahun;
                        //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
                    }else if (jenis == 'SKU'){
                        composed = jenis+'.'+nomor+'/'+unit_pemrakarsa+'/'+klasifikasi+'/'+bulan+'/'+tahun;
                        //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
                    }else if (jenis == 'BA'){
                        composed = jenis+'.'+nomor+'/'+unit_pemrakarsa+'/'+klasifikasi+'/'+bulan+'/'+tahun;
                        //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
                    }else if (jenis == 'KET'){
                        composed = jenis+'.'+nomor+'/'+unit_pemrakarsa+'/'+klasifikasi+'/'+bulan+'/'+tahun;
                        //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
                    }else if (jenis == 'SPN'){
                        composed = jenis+'.'+nomor+'/'+unit_pemrakarsa+'/'+klasifikasi+'/'+bulan+'/'+tahun;
                        //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
                    }else if (jenis == 'PENG'){
                        composed = jenis+'.'+nomor+'/'+unit_pemrakarsa+'/'+klasifikasi+'/'+bulan+'/'+tahun;
                        //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
                    }else if (jenis == 'LAP'){
                        composed = jenis+'.'+nomor+'/'+unit_pemrakarsa+'/'+klasifikasi+'/'+bulan+'/'+tahun;
                        //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
                    }else if (jenis == 'PER'){
                        composed = nomor+' Tahun '+tahun;
                        me.lookupReference('unit_pemrakarsa').setValue('LSN');
                        //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
                    }else if (jenis == 'INS'){
                        composed = nomor+' Tahun '+tahun;
                        me.lookupReference('unit_pemrakarsa').setValue('LSN');
                        //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
                    }else if (jenis == 'JUK'){
                        composed = nomor+' Tahun '+tahun;
                        //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
                    }else{
                        composed = ''
                    }

                    me.lookupReference('nomor_surat').setValue( composed );
                },
                failure: function( response, options ) {
                    Ext.Msg.alert( 'Perhatian', 'Kesalahan terjadi pada request nomor urut' );
                }
            });

        }else{
            nomor = 'x';
            if (jenis == 'KEP'){
                me.lookupReference('penandatangan').select('Kepala Lembaga Sandi Negara');
                me.lookupReference('id_jabatan').setValue(me.lookupReference('penandatangan').selection.data.id);
                composed = nomor+' Tahun '+tahun;
                me.lookupReference('unit_pemrakarsa').setValue('LSN');
                //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
                 //console.log(  me.lookupReference('penandatangan').selection.data.id);
                 //console.log( me.lookupReference('id_jabatan').getValue());
            }else if (jenis == 'PED'){
                me.lookupReference('penandatangan').select('Kepala Lembaga Sandi Negara');
                me.lookupReference('id_jabatan').setValue(me.lookupReference('penandatangan').selection.data.id);
                composed = nomor+' Tahun '+tahun;
                me.lookupReference('unit_pemrakarsa').setValue('LSN');
                //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
                 //console.log(  me.lookupReference('penandatangan').selection.data.id);
                 //console.log( me.lookupReference('id_jabatan').getValue());
            }else if (jenis == 'TUG'){
                composed = nomor+'/'+unit_pemrakarsa+'/'+bulan+'/'+tahun;
                //me.lookupReference('penandatangan').setFieldLabel('Unit Kerja');
                 //me.lookupReference('penandatangan').select('Kepala Lembaga Sandi Negara');
            }else if (jenis == 'SDK'){
                me.lookupReference('penandatangan').select('Kepala Lembaga Sandi Negara');
                me.lookupReference('id_jabatan').setValue(me.lookupReference('penandatangan').selection.data.id);
                //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
                //console.log(  me.lookupReference('penandatangan').selection.data.id);
                //console.log( me.lookupReference('id_jabatan').getValue());
                me.lookupReference('unit_pemrakarsa').setValue('LSN');
                sifat = me.lookupReference('sifat').getValue();
                sifat2 = me.lookupReference('sifat2').getValue();
                //console.log(sifat);
                if (sifat==true) {
                    composed = 'R-'+nomor+'/K.LSN/'+klasifikasi+'/'+bulan+'/'+tahun;
                } else if (sifat2==true) {
                    composed = 'R-'+nomor+'/K.LSN/'+klasifikasi+'/'+bulan+'/'+tahun;
                } else {
                    composed = nomor+'/K.LSN/'+klasifikasi+'/'+bulan+'/'+tahun;
                }
            }else if (jenis == 'SDP'){
                composed = nomor+'/LSN/'+unit_pemrakarsa+'/'+klasifikasi+'/'+bulan+'/'+tahun;
                //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
            }else if (jenis == 'ND'){
                composed = nomor+'/'+unit_pemrakarsa+'/'+klasifikasi+'/'+bulan+'/'+tahun;
                //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
            }else if (jenis == 'PERJ'){
                composed = jenis+'.'+nomor+'/'+unit_pemrakarsa+'/'+klasifikasi+'/'+bulan+'/'+tahun;
                //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
            }else if (jenis == 'SKU'){
                composed = jenis+'.'+nomor+'/'+unit_pemrakarsa+'/'+klasifikasi+'/'+bulan+'/'+tahun;
                //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
            }else if (jenis == 'BA'){
                composed = jenis+'.'+nomor+'/'+unit_pemrakarsa+'/'+klasifikasi+'/'+bulan+'/'+tahun;
                //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
            }else if (jenis == 'KET'){
                composed = jenis+'.'+nomor+'/'+unit_pemrakarsa+'/'+klasifikasi+'/'+bulan+'/'+tahun;
                //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
            }else if (jenis == 'SPN'){
                composed = jenis+'.'+nomor+'/'+unit_pemrakarsa+'/'+klasifikasi+'/'+bulan+'/'+tahun;
                //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
            }else if (jenis == 'PENG'){
                composed = jenis+'.'+nomor+'/'+unit_pemrakarsa+'/'+klasifikasi+'/'+bulan+'/'+tahun;
                //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
            }else if (jenis == 'LAP'){
                composed = jenis+'.'+nomor+'/'+unit_pemrakarsa+'/'+klasifikasi+'/'+bulan+'/'+tahun;
                //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
            }else if (jenis == 'PER'){
                this.lookupReference('unit_pemrakarsa').setValue('LSN');
                composed = nomor+' Tahun '+tahun;
                //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
            }else if (jenis == 'INS'){
                composed = nomor+' Tahun '+tahun;
                me.lookupReference('unit_pemrakarsa').setValue('LSN');
                //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
            }else if (jenis == 'JUK'){
                composed = nomor+' Tahun '+tahun;
                //me.lookupReference('penandatangan').setFieldLabel('Penandatangan');
            }else{
                composed = ''
            }

            me.lookupReference('nomor_surat').setValue( composed );
        }

        //console.log(jenis);    
    }
    
});
