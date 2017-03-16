Ext.define('Docs.view.arsip.window.JraController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.arsip-window-jra',
    beforeclose:function(){
        //console.log('before close');
        Ext.globalEvents.fireEvent( 'refreshGridJra' );
    },
    onClickSimpan:function(){
        //console.log('test simpan');

        var me=this, 
        form =  me.lookupReference('form_jra').getForm(),
        values = form.getValues();

        if (values.id == ''){
        	url = serverURL+'jra/simpan';
        } else {
        	url = serverURL+'jra/update';
        }

        if (values.active == undefined){
        	active = 0
        }else{
        	active = values.active
        }

        if (form.isValid()) {
            Ext.Msg.confirm('Konfirmasi', 'Apakah anda yakin akan menyimpan data ini?',
                function(btn) {
                    if (btn === 'yes') {
                        form.submit({
                            //headers: {'Content-Type': "multipart/form-data" },
                            params:{
                            	active:active
                            },
                            url:url,
                            success: function(form, action) {
                                //console.log(action.response.responseText);
                                var result = Ext.decode( action.response.responseText );
                                Ext.Msg.show({
                                    title:'Data tersimpan',
                                    message: 'Data telah tersimpan ke dalam database',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                                me.getView().close();
                            },
                            failure: function(form, action) {
                                console.log('gagal menyimpan data jabatan');
                            }
                        });
                    } else {
                        return false;
                    }
            }); 
        }
    }

    
});
