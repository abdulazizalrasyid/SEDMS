Ext.define('Mail.controller.Base', {
    extend: 'Ext.app.Controller',
    init: function() {
        this.addRef([{
            ref: 'main',
            selector: '[xtype=app-main]'
        }]);
        this.callParent();
    },
    addContentToCenterRegion: function( config ) {
        //console.log(this.getMain());
        var view = this.getMain();
        if (view == undefined){
            this.redirectTo('home');
        }else{
            center = view.down( '#center' ),
            cmp = center.down( '[xtype=' + config.xtype + ']' )
            
            // check if the current view is the target view
            if( !cmp ) {
                // remove all content
                center.removeAll();
                // add content
                cmp = center.add( config );
            }
            //console.log(config.xtype);
            return cmp;
        }
    }
});
