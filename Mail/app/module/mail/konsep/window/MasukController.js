Ext.define('Docs.view.konsep.window.MasukController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.konsep-window-masuk',
    initIdSurat:function(self, newValue, oldValue, eOpts ){
    	var me=this;
        me.getViewModel().set('id_surat',newValue);
        me.lookupReference('last_id_surat_kembali').setValue( newValue );
        me.lookupReference('last_id_surat_terus').setValue( newValue );
        me.lookupReference('last_id_surat_final').setValue( newValue );
        if ((Mail.LoggedInUser.data.type == 'operator') || (Mail.LoggedInUser.data.type =='staf') || (Mail.LoggedInUser.data.type == 'arsip')){
            me.lookupReference('final').setVisible(false);
            me.lookupReference('kembali').setVisible(false);
        }
    },
    beforeclose:function(){
        Ext.globalEvents.fireEvent( 'refresGridKonsepMasuk' );
         if (Mail.LoggedInUser.data.type =='operator') {
            Ext.globalEvents.fireEvent( 'refreshOprMenu' );
        }else if(Mail.LoggedInUser.data.type =='pengguna'){
            Ext.globalEvents.fireEvent( 'refreshMenu' );
        }
    },
    initIdJabPembuat:function(self, newValue, oldValue, eOpts ){
    	var me=this;
    	me.lookupReference('id_jab_kembali').setValue( newValue );
    	me.lookupReference('id_jab_verifikator_terus').setValue( Mail.LoggedInUser.data.id_atasan );
    	me.lookupReference('penandatangan').setValue( Mail.LoggedInUser.data.id_jabatan );
    },
    initUniquecode:function(self, newValue, oldValue, eOpts ){
    	var me=this;

        me.getViewModel().set('uniquecode',newValue)

        me.lookupReference('uniquecode_kembali').setValue( newValue );
        me.lookupReference('id_jab_pembuat_kembali').setValue( Mail.LoggedInUser.data.id_jabatan );
        me.lookupReference('created_by_kembali').setValue( Mail.LoggedInUser.data.username );
    	
    	me.lookupReference('uniquecode_terus').setValue( newValue );
        me.lookupReference('id_jab_pembuat_terus').setValue( Mail.LoggedInUser.data.id_jabatan );
        me.lookupReference('created_by_terus').setValue( Mail.LoggedInUser.data.username );
        
    	me.lookupReference('uniquecode_final').setValue( newValue );
        me.lookupReference('id_jab_pembuat_final').setValue( Mail.LoggedInUser.data.id_jabatan );
        me.lookupReference('created_by_final').setValue( Mail.LoggedInUser.data.username );

    },
    downloadFile:function(me, record, item, index, e, eOpts){
        me = this;
        //console.log(record.data.nama_file);
        window.open(uploadURL+record.data.nama_file);
    },
    filehistory:function(){
        me = this;
        me.lookupReference('filegrid').setBind({store:'{filehistory}'});
    },
    onClickSimpanKembali:function(){
        var me=this, 
        form = me.lookupReference('sendBackContainer').getForm(),
        values = form.getValues();
        init = me.lookupReference('init_by').getValue();

        var cur_user = Mail.LoggedInUser.data.username;
        Ext.Ajax.request({
            url: serverURL+'login/index.json',
            success: function( response, options ) {
                var result = Ext.decode( response.responseText );
                if (result.success == true){
                    if( cur_user == result.user.username ) {
                    //start process
                        if (form.isValid()) {
                            if (me.lookupReference('filekembali').value == ''){

                                 selection = me.lookupReference('filegrid').getSelectionModel().getSelection();

                                if (selection.length>0){
                                    i = 0;
                                    var str = '';
                                    var arr = '';
                                    Ext.Array.forEach(selection, function(theArray, index) {
                                        //console.log( 'file yg dikirim '+theArray.data.nama_file);
                                        //a[i] = theArray.data.nama_file;
                                        
                                        if (str ==''){
                                            str = theArray.data.nama_file;
                                        }else{
                                            str = str +', '+theArray.data.nama_file;
                                        }

                                        if (arr ==''){
                                            arr = theArray.data.nama_file;
                                        }else{
                                            arr = arr +';'+theArray.data.nama_file;
                                        }
                                
                                        i=i+1;
                                    });

                                    Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan mengirim konsep ini <br />dengan mempergunakan yang terpilih? ('+str+')',
                                        function(btn) {
                                            if (btn === 'yes') {
                                                form.url = serverURL+'konsep/simpan_use_selectedfile';
                                                form.submit({
                                                    params: {
                                                        perihal: me.lookupReference('perihal').getValue(),
                                                        file : arr,
                                                        init_by: init
                                                    },
                                                    success: function(form, action) {
                                                        me.getView().close();
                                                        Ext.Msg.show({
                                                            title:'Data tersimpan',
                                                            message: 'Konsep telah terkirim',
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
                                    Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan mengirim konsep ini <br />dengan mempergunakan file sebelumnya?',
                                        function(btn) {
                                            if (btn === 'yes') {
                                                form.url = serverURL+'konsep/simpan_use_lastfile';
                                                form.submit({
                                                    params: {
                                                        perihal: me.lookupReference('perihal').getValue(),
                                                        init_by: init
                                                    },
                                                    success: function(form, action) {
                                                        me.getView().close();
                                                        Ext.Msg.show({
                                                            title:'Data tersimpan',
                                                            message: 'Konsep telah terkirim',
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

                                
                            }else{
                                Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan mengirim konsep ini?',
                                function(btn) {
                                    if (btn === 'yes') {
                                        form.url = serverURL+'konsep/simpan_newfile';
                                        form.submit({
                                            params: {
                                                perihal: me.lookupReference('perihal').getValue(),
                                                init_by: init
                                            },
                                            headers: {'Content-Type': "multipart/form-data" },
                                            success: function(form, action) {
                                                console.log('sukses');
                                                //form.reset();
                                                me.getView().close();
                                                //me.lookupReference('id_pengolah').setValue( Mail.LoggedInUser.data.id );
                                                Ext.Msg.show({
                                                    title:'Data tersimpan',
                                                    message: 'Konsep telah terkirim',
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
    onClickSimpanTeruskan:function(){
        console.log('simpan teruskan');
        var me=this;
        //console.log(me.lookupReference('sendContainer'));
        form = me.lookupReference('sendContainer').getForm(),
        values = form.getValues();
        console.log(form.values);
        init = me.lookupReference('init_by').getValue();

        var cur_user = Mail.LoggedInUser.data.username;
        Ext.Ajax.request({
            url: serverURL+'login/index.json',
            success: function( response, options ) {
                var result = Ext.decode( response.responseText );
                if (result.success == true){
                    if( cur_user == result.user.username ) {
                    //start process
                        if (form.isValid()) {
                            if (me.lookupReference('fileteruskan').value == ''){

                                selection = me.lookupReference('filegrid').getSelectionModel().getSelection();

                                if (selection.length>0){
                                    i = 0;
                                    var str = '';
                                    var arr = '';
                                    Ext.Array.forEach(selection, function(theArray, index) {
                                        //console.log( 'file yg dikirim '+theArray.data.nama_file);
                                        //a[i] = theArray.data.nama_file;
                                        
                                        if (str ==''){
                                            str = theArray.data.nama_file;
                                        }else{
                                            str = str +', '+theArray.data.nama_file;
                                        }

                                        if (arr ==''){
                                            arr = theArray.data.nama_file;
                                        }else{
                                            arr = arr +';'+theArray.data.nama_file;
                                        }
                                
                                        i=i+1;
                                    });
                                    Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan mengirim konsep ini <br />dengan mempergunakan yang terpilih? ('+str+')',
                                        function(btn) {
                                            if (btn === 'yes') {
                                                form.url = serverURL+'konsep/simpan_use_selectedfile';
                                                form.submit({
                                                    params: {
                                                        perihal: me.lookupReference('perihal').getValue(),
                                                        file : arr,
                                                        init_by: init
                                                    },
                                                    success: function(form, action) {
                                                        me.getView().close();
                                                        Ext.Msg.show({
                                                            title:'Data tersimpan',
                                                            message: 'Konsep telah terkirim',
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
                                    Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan menyimpan mengirim konsep ini <br />dengan mempergunakan file sebelumnya?',
                                        function(btn) {
                                            if (btn === 'yes') {
                                                form.url = serverURL+'konsep/simpan_use_lastfile';
                                                form.submit({
                                                    params: {
                                                        perihal: me.lookupReference('perihal').getValue(),
                                                        init_by: init
                                                    },
                                                    success: function(form, action) {
                                                        me.getView().close();
                                                        Ext.Msg.show({
                                                            title:'Data tersimpan',
                                                            message: 'Konsep telah terkirim',
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
                                
                            }else{
                                Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan mengirim konsep ini?',
                                function(btn) {
                                    if (btn === 'yes') {
                                        form.url = serverURL+'konsep/simpan_newfile';
                                        form.submit({
                                            headers: {'Content-Type': "multipart/form-data" },
                                            params: {
                                                perihal: me.lookupReference('perihal').getValue(),
                                                init_by: init
                                            },
                                            success: function(form, action) {
                                                console.log('sukses');
                                                //form.reset();
                                                me.getView().close();
                                                //me.lookupReference('id_pengolah').setValue( Mail.LoggedInUser.data.id );
                                                Ext.Msg.show({
                                                    title:'Data tersimpan',
                                                    message: 'Konsep telah terkirim',
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
    onClickSimpanFinal:function(){
        console.log('simpan final');
        var me = this;
        form = me.lookupReference('saveContainer').getForm(),
        values = form.getValues();
        //console.log(values);
        init = me.lookupReference('init_by').getValue();

        var cur_user = Mail.LoggedInUser.data.username;
        Ext.Ajax.request({
            url: serverURL+'login/index.json',
            success: function( response, options ) {
                var result = Ext.decode( response.responseText );
                if (result.success == true){
                    if( cur_user == result.user.username ) {
                    //start process
                        if (form.isValid()) {
                            if (me.lookupReference('filefinal').value == ''){

                                selection = me.lookupReference('filegrid').getSelectionModel().getSelection();

                                if (selection.length>0){

                                    //a = [];
                                    i = 0;
                                    var str = '';
                                    var arr = '';
                                    Ext.Array.forEach(selection, function(theArray, index) {
                                        //console.log( 'file yg dikirim '+theArray.data.nama_file);
                                        //a[i] = theArray.data.nama_file;
                                        
                                        if (str ==''){
                                            str = theArray.data.nama_file;
                                        }else{
                                            str = str +', '+theArray.data.nama_file;
                                        }

                                        if (arr ==''){
                                            arr = theArray.data.nama_file;
                                        }else{
                                            arr = arr +';'+theArray.data.nama_file;
                                        }
                                
                                        i=i+1;
                                    });

                                    //console.log(a);


                                    Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan menyimpan mengirim konsep ini <br />dengan mempergunakan yang terpilih? ('+str+')',
                                        function(btn) {
                                            if (btn === 'yes') {
                                                form.url = serverURL+'konsep/simpan_use_selectedfile_final';
                                                form.submit({
                                                    params: {
                                                        perihal: me.lookupReference('perihal').getValue(),
                                                        file : arr, 
                                                        init_by: init
                                                    },
                                                    success: function(form, action) {
                                                        me.getView().close();
                                                        Ext.Msg.show({
                                                            title:'Data tersimpan',
                                                            message: 'Konsep telah terkirim',
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
                                    Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan menyimpan mengirim konsep ini <br />dengan mempergunakan file sebelumnya?',
                                        function(btn) {
                                            if (btn === 'yes') {
                                                form.url = serverURL+'konsep/simpan_use_lastfile_final';
                                                form.submit({
                                                    params: {
                                                        perihal: me.lookupReference('perihal').getValue(),
                                                        init_by: init
                                                    },
                                                    success: function(form, action) {
                                                        me.getView().close();
                                                        Ext.Msg.show({
                                                            title:'Data tersimpan',
                                                            message: 'Konsep telah terkirim',
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
                            }else{
                                Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan mengirim konsep ini?',
                                function(btn) {
                                    if (btn === 'yes') {
                                        form.url = serverURL+'konsep/simpan_newfile_final';
                                        form.submit({
                                            headers: {'Content-Type': "multipart/form-data" },
                                            params: {
                                                perihal: me.lookupReference('perihal').getValue(),
                                                init_by: init
                                            },
                                            success: function(form, action) {
                                                console.log('sukses');
                                                me.getView().close();
                                                Ext.Msg.show({
                                                    title:'Data tersimpan',
                                                    message: 'Konsep telah terkirim',
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
    }
    
});
