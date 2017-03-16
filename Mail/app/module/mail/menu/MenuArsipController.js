Ext.define('Docs.view.menu.MenuArsipController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menu-menuarsip',
    on_archive:function(){
        this.redirectTo('adminarchive');
    },
    on_draftarchive:function(){
        this.redirectTo('draftarchive');
    },
    on_jra:function(){
        this.redirectTo('jra');
    },
    on_relasi:function(){
        this.redirectTo('relasi');
    }    
});
