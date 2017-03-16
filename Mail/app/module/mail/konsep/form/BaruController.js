Ext.define('Docs.view.konsep.form.BaruController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.konsep-form-baru',
    init:function(){
    	me=this;
        me.getViewModel().set('id_penguna',Mail.LoggedInUser.data.id);
        me.getViewModel().set('id_jabatan',Mail.LoggedInUser.data.id_jabatan);

        me.lookupReference('id_jab_verifikator').setValue( Mail.LoggedInUser.data.id_atasan );
        //console.log(  me.lookupReference('id_jab_verifikator').getValue() );
        me.lookupReference('id_jab_pembuat').setValue( Mail.LoggedInUser.data.id_jabatan );
        me.lookupReference('created_by').setValue( Mail.LoggedInUser.data.username );
        me.lookupReference('init_by').setValue( Mail.LoggedInUser.data.id_jabatan );
        //var unique = me.lookupReference('uniquecode');

       /* Ext.Ajax.request({
            url: serverURL+'draft/uniquecode.json',
            method:'get',
            success: function( response, options ) {
                var result = Ext.decode( response.responseText );
                unique.setValue( result );
                //console.log(me.lookupReference('uniquecode'));
            },
            failure: function( response, options ) {
                Ext.Msg.alert( 'Perhatian', 'Kesalahan terjadi pada request kode unik' );
            }
        });*/
    	//console.log('id_penguna',Mail.LoggedInUser.data.id);
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
    onClickSimpan:function(){
        var me=this, 
        form = me.getView().getForm(),
        values = form.getValues();

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
                                        form.url = serverURL+'konsep/simpan';
                                        form.submit({
                                            headers: {'Content-Type': "multipart/form-data" },
                                            success: function(form, action) {
                                                //console.log(values);
                                                form.reset();
                                                me.init();
                                                //me.lookupReference('id_pengolah').setValue( Mail.LoggedInUser.data.id );
                                                Ext.Msg.show({
                                                    title:'Data tersimpan',
                                                    message: 'Konsep telah terkirim',
                                                    buttons: Ext.Msg.OK,
                                                    icon: Ext.Msg.INFO
                                                });

                                                if (Mail.LoggedInUser.data.type =='operator') {
                                                    Ext.globalEvents.fireEvent( 'refreshOprMenu' );
                                                }else if (Mail.LoggedInUser.data.type =='pengguna'){
                                                    Ext.globalEvents.fireEvent( 'refreshMenu' );
                                                }
                                                
                                            },
                                            failure: function(form, action) {
                                                console.log('gagal mengirim konsep');
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

       
    }
    
});
