Ext.define('Docs.view.laporan.form.PanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.laporan-form-panel',
    onIdKlasifikasiFokus:function( self, event, eOpts ){
        self.getStore().reload();
    },
    onIdKlasifikasiSelect:function(self, records, eOpts){
        //console.log(records);
        me = this;
       /* if (records[0].data.kode.length < 8 ){
            Ext.Msg.show({
                title:'ERROR',
                message: 'Cek lagi pilihan klasifikasi <br/> <i>kode klasifikasi minimal 6 digit</i>',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            me.lookupReference('id_klasifikasi').reset();
        }*/
    },
    onClickExportExcel:function(){
        var me = this;
        //console.log(me.lookupReference('dari').getSubmitValue());

        window.open(serverURL
            +'laporan/operator?pengirim='+me.lookupReference('pengirim').getValue()
            +'&penerima='+me.lookupReference('penerima').getValue()
            +'&perihal='+me.lookupReference('perihal').getValue()
            +'&index='+me.lookupReference('index').getValue()
            //+'&id_jenis='+me.lookupReference('id_jenis').getValue()
            //+'&id_klasifikasi='+me.lookupReference('id_klasifikasi').getValue()
            +'&dari='+me.lookupReference('dari').getSubmitValue()
            +'&sampai='+me.lookupReference('sampai').getSubmitValue()
            );
    },
    onClickExportExcel2:function(){
        var me = this;
        //console.log(me.lookupReference('dari').getSubmitValue());

        window.open(serverURL
            +'laporan/rekapoperator'
            //+'laporan/rekapoperator?bulan='+'&bulan='+me.lookupReference('bulan').getValue()
        );
    },
    onClickExportExcel3:function(){
        var me = this;
        //console.log(me.lookupReference('dari').getSubmitValue());

        window.open(serverURL
            +'laporan/rekapoperator2?pengirim='+'&dari='+me.lookupReference('dari2').getSubmitValue()
            +'&sampai='+me.lookupReference('sampai2').getSubmitValue()
        );
    }
    
});


