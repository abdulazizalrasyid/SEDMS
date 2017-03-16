Ext.define('Docs.view.nodin.window.OprMasukController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.nodin-window-oprmasuk',
     init:function(){
        me=this;
        me.getViewModel().set('id_jabatan',Mail.LoggedInUser.data.id_jabatan);
        me.getViewModel().set('id_atasan',Mail.LoggedInUser.data.id_atasan);;
        //me.lookupReference('verification_request_id_jab').setHidden( false );
    },
    downloadFile:function(me, record, item, index, e, eOpts){
        me = this;
        //console.log(record.data.nama_file);
        window.open(uploadURL+record.data.nama_file);
    },
    changeUniquecode:function(self, newValue, oldValue){
        me=this;
        console.log(newValue);
        me.getViewModel().set('uniquecode',newValue);
    },
    beforeclose:function(){
        //Ext.globalEvents.fireEvent( 'refreshGridKlasifikasinodin' );
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
    onClickCetak:function(){
        var me = this;
        var id_surat = me.lookupReference('id_surat').getValue();
        window.open(serverURL+'cetak/notadinas/?id_surat='+id_surat);
    },
    onClickSimpan:function(){
        var me = this; 
        
        form = me.lookupReference('myFieldContainers').getForm(),
        values = form.getValues();
        //console.log(values);

        var cur_user = Mail.LoggedInUser.data.username;
        Ext.Ajax.request({
            url: serverURL+'login/index.json',
            success: function( response, options ) {
                var result = Ext.decode( response.responseText );
                if (result.success == true){
                    if( cur_user == result.user.username ) {
                    //start process
                        if (form.isValid()) {
                            Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan menyimpan Nota dinas ini?',
                            function(btn) {
                                if (btn === 'yes') {
                                    form.url = serverURL+'notadinas/update';
                                    form.submit({
                                        success: function(form, action) {
                                            Ext.Msg.show({
                                                title:'Data tersimpan',
                                                message: 'Data telah tersimpan ke dalam database',
                                                buttons: Ext.Msg.OK,
                                                icon: Ext.Msg.INFO
                                            });
                                            me.getView().close();
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
    }
    
});
