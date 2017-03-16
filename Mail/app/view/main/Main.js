/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Mail.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'Mail.view.main.MainController',
        'Mail.view.main.MainModel',
        'Mail.view.layout.North',
        'Mail.view.layout.Center',
        'Mail.view.layout.Menu'
    ],
    xtype: 'app-main',
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    layout: {
        type: 'border'
    },
    plugins: 'viewport',
    listeners:{
        render:'mainRender'
    },
    items:[
        {
             region:'north',
             xtype:'layout.North'
        },{
             region:'center',
             xtype:'layout.Center'
        }
    ]
});
