Ext.define('Docs.view.reserve.form.ReservationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.reserve-form-reservation',
    init:function(){
		this.getViewModel().set('tanggal',new Date());
    },
    onCheckedNodesClick:function(){
    	me = this;
        //console.log('test');
        var cur_user = Mail.LoggedInUser.data.username;

                    //start process
                        var records = me.getView().down('#mytree').getChecked(),
                            names = [];
                                   
                        Ext.Array.each(records, function(rec){
                            names.push(rec.get('jenis')+':'+rec.get('unker')+':'+rec.get('jumlah'));
                            Ext.Ajax.request({
                                method:'post',
                                url: serverURL+'surat/simpan_reservasi.json',
                                params:{
                                    jenis:rec.get('jenis'),
                                    unker:rec.get('unker'),
                                    jumlah:rec.get('jumlah')
                                },
                                success:function(){
                                    Ext.MessageBox.show({
                                        title: 'Reservasi Sukses',
                                        msg: names.join('<br />'),
                                        icon: Ext.MessageBox.INFO
                                    });
                                },
                                failure:function(){
                                    Ext.MessageBox.show({
                                        title: 'Reservasi Gagal',
                                        msg: names.join('<br />'),
                                        icon: Ext.MessageBox.WARNING
                                    });
                                }
                            });
                        });

                        
                    //end process

        Ext.Ajax.request({
            url: serverURL+'login/index.json',
            success: function( response, options ) {
                var result = Ext.decode( response.responseText );
                if (result.success == true){
                    if( cur_user == result.user.username ) {
                   
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
