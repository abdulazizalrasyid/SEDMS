/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */

//Setpath to modules and ux
Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        Docs: "app/module/mail",
        Portal:"app/module/portal",
        Ux:"app/ux"
    }
});

Ext.application({
    name: 'Mail',
    extend: 'Mail.Application'
    
    //autoCreateViewport: 'Mail.view.main.Main'
	
    //-------------------------------------------------------------------------
    // Most customizations should be made to Mail.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});
