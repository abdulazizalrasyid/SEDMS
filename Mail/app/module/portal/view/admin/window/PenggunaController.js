Ext.define('Portal.view.admin.window.PenggunaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-window-pengguna',
    onIdJabatanChange:function(self, newValue){
        this.lookupReference('atasan').setValue(newValue);
    },
    onJabatanChange:function(sellf, records, eOpts){
        this.lookupReference('id_jabatan').setValue(records[0].data.id);
    },
    onJabatanFocus:function(){
        me = this;
        if (me.lookupReference('id_jabatan').getValue() == null){
           var store3 =  Ext.create('Ext.data.Store', {
                fields: [
                    {name: 'id', type:'auto'},
                    {name: 'id_jabatan', type:'auto'},
                    {name: 'jabatan', type:'auto'}
                ],
                autoLoad:true,
                pageSize:7,
                proxy: {
                    type: 'rest',
                    timeout: 20000000,
                    autoSync:true,
                    autoSave: true,
                    api: {
                            create  : serverURL+'referensi/jabatan3',
                            update  : serverURL+'referensi/jabatan3',
                            destroy : serverURL+'referensi/jabatan3'
                    },        
                    url: serverURL+'referensi/jabatan3.json',
                    reader: {
                          type: 'json',
                          rootProperty: 'data',
                          totalProperty: 'total'
                    },
                    writer: {
                          //encode: true,
                          type: 'json',
                          rootProperty: 'data'
                    }
                }    
            });
            me.lookupReference('atasan').setStore(store3);
            store3.load();

        } else {
            var store2 = Ext.create('Ext.data.Store',{
                fields: [
                    {name: 'id', type:'auto'},
                    {name: 'id_jabatan', type:'auto'},
                    {name: 'jabatan', type:'auto'}
                ],
                //autoLoad:true,
                pageSize:7,
                proxy: {
                    type: 'rest',
                    timeout: 20000000,
                    autoSync:true,
                    autoSave: true,
                    extraParams:{
                        current_jabatan : me.lookupReference('id_jabatan').getValue() 
                    },
                    api: {
                            create  : serverURL+'referensi/jabatan2',
                            update  : serverURL+'referensi/jabatan2',
                            destroy : serverURL+'referensi/jabatan2'
                    },        
                    url: serverURL+'referensi/jabatan2.json',
                    reader: {
                          type: 'json',
                          rootProperty: 'data',
                          totalProperty: 'total'
                    },
                    writer: {
                          //encode: true,
                          type: 'json',
                          rootProperty: 'data'
                    }
                }
            });
            me.lookupReference('atasan').setStore(store2);
            store2.load();
        }
        
    },
    beforeclose:function(){
        Ext.globalEvents.fireEvent( 'refreshGridPengguna' );
    },
    release_jab:function(){
        this.lookupReference('atasan').setValue('');
        this.lookupReference('id_jabatan').setValue('');
    },
    onClickSimpan:function(){
        var me=this, 
        form =  me.lookupReference('form_pengguna').getForm(),
        values = form.getValues();

        if (values.id == ''){
        	url = serverURL+'pengguna/simpan_admin';
        } else {
        	url = serverURL+'pengguna/update_admin';
        }

        if (values.active == undefined){
            active = 0
        }else{
            active = values.active
        }        

        if (values.pwd1 == ''){
            if (form.isValid()) {
            Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan menyimpan data ini?',
                function(btn) {
                    if (btn === 'yes') {

                        Ext.Ajax.request({
                            url: url,
                            method:'post',
                            params: {
                                active:active,
                                id:values.id,
                                username:values.username,
                                fullname:values.fullname,
                                type:values.type,
                                id_jabatan:values.id_jabatan,
                                passwd:''
                            },
                            success: function( response, options ) {
                                //var result = Ext.decode( action.response.responseText );
                                Ext.Msg.show({
                                    title:'Data tersimpan',
                                    message: 'Data telah tersimpan ke dalam database',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                                me.getView().close();
                            },
                            failure: function( response, options ) {
                            Ext.Msg.alert( 'Perhatian', 'Error terjadi pada request ini' );
                            console.log('gagal menyimpan pengguna');
                            }
                        }); 
                    } else {
                        return false;
                    }
            }); 
        }
        }else{
                if (values.pwd1 === values.pwd2){
                    if (form.isValid()) {
                    Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan menyimpan data ini?',
                        function(btn) {
                            if (btn === 'yes') {
                                Ext.Ajax.request({
                                    url: url,
                                    method:'post',
                                    params: {
                                        active:active,
                                        id:values.id,
                                        username:values.username,
                                        fullname:values.fullname,
                                        type:values.type,
                                        id_jabatan:values.id_jabatan,
                                        passwd: Mail.crypto.SHA1.hash( values.pwd1 )
                                    },
                                    success: function( response, options ) {
                                        //var result = Ext.decode( action.response.responseText );
                                        Ext.Msg.show({
                                            title:'Data tersimpan',
                                            message: 'Data telah tersimpan ke dalam database',
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.Msg.INFO
                                        });
                                        me.getView().close();
                                    },
                                    failure: function( response, options ) {
                                    Ext.Msg.alert( 'Perhatian', 'Error terjadi pada request ini' );
                                    console.log('gagal menyimpan pengguna');
                                    }
                                }); 
                            } else {
                                return false;
                            }
                    }); 
                }
            }else{
                Ext.Msg.show({
                        title:'Error',
                        message: 'Password tidak sama',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                });
            }

            
        }

       
    }

    
});
