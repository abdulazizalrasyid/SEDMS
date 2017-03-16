Ext.define('Docs.view.reserve.form.ReservationModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reserve-form-reservation',
    data:{
    	btReservasiText:'Simpan reservasi tanggal ' + Ext.Date.format(new Date, 'd-m-Y')
    }

});
