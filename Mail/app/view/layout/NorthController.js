Ext.define('Mail.view.layout.NorthController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.layout-north',
    init:function(){
    	me=this;
    	//console.log(Mail.LoggedInUser.data);
    	//me.lookupReference('nameshow').setHtml('<span style="color:#fff"><strong>'+Mail.LoggedInUser.data.nama_lengkap+'</strong> <br />'+Mail.LoggedInUser.data.jabatan+'</span>');
    	if(Mail.LoggedInUser.data.type == 'administrator'){
    		me.lookupReference('nama').setHtml('<div align=right style="font-weight:bold;color:#fff;font-size:13px;padding:20px 10px 0 0">'+Mail.LoggedInUser.data.nama_lengkap);
    	}else{
			me.lookupReference('nama').setHtml('<div align=right style="font-weight:bold;color:#fff;font-size:13px;padding:10px 10px 0 0">'+Mail.LoggedInUser.data.nama_lengkap+'</div><div align=right style="color:#fff;padding:0px 10px 0 0;">'+Mail.LoggedInUser.data.jabatan+'</div>');
    	}
    	
    },
    changePassword:function(){
        var me = this;
        win = Ext.create('Portal.view.login.Chpasswd');
        win.show();
    }
    
});
