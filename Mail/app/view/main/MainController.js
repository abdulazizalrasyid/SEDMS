/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Mail.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    mainRender:function(){
        //makeInterval = setInterval(function(){
            var cur_user = Mail.LoggedInUser.data.username;
        	Ext.Ajax.request({
				url: serverURL+'login/index.json',
				success: function( response, options ) {
					var result = Ext.decode( response.responseText );
					if (result.success == true){
						if( cur_user != result.user.username ) {
							Ext.globalEvents.fireEvent( 'doLogout' );
						}
					}
				},
				failure: function( response, options ) {
					Ext.Msg.alert( 'Perhatian', 'Kesalahan terjadi pada request ini' );
				}
			});	

        //},10000);
    },
});
