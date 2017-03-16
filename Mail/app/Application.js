/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('Mail.Application', {
    extend: 'Ext.app.Application',
    
    requires:[
        'Ext.layout.container.Border',
        'Ext.form.Panel',
        'Ext.Img',
        'Ext.plugin.Viewport'
    ],

    defaultToken : 'home',

    name: 'Mail',
	
	controllers:[
    	'Security','Mail','Portal'
    ],

    stores: [
        // TODO: add global / shared stores here
    ],
    
    init: function () {
       splashscreen = Ext.getBody().mask('Memulai aplikasi ..')
    },

    launch: function () {
        // TODO - Launch the application
        var task = new Ext.util.DelayedTask(function(){
            splashscreen.fadeOut({
                duration:2000,
                remove:true
            })
        });
        splashscreen.next().fadeOut({
            duration:1000,
            remove:true
        });
        task.delay(1000);

        Ext.globalEvents.fireEvent( 'processLogIn' );
    }
});
