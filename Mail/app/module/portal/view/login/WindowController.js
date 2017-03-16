Ext.define('Portal.view.login.WindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portal-login-window',
    onShow:function(){
    	this.lookupReference('username').focus();
    },
    onUnameEnter:function(field, e){
    	if (e.getKey() == e.ENTER) {
            this.lookupReference('passwd').focus();
        }
    },
    onPasswordEnter:function(field, e){
    	if (e.getKey() == e.ENTER) {
            this.lookupReference('btLogin').focus();
        }
    },
    onBtLoginClick:function(){
    	//console.log('login process');
    	Ext.globalEvents.fireEvent( 'doLogin' );
    }
});
