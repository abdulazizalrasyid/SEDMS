Ext.define('Docs.view.reserve.grid.BlankController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.reserve-grid-blank',
    refs: [
        {
            ref: 'SuratKeluar2',
            selector: '[xtype=surat.form.Keluar2]'    
        }
    ],
    activate:function(){
        me=this;
        me.lookupReference('paging_suratblank').setStore(me.getView().getStore());
        me.getView().getStore().reload();
        //console.log(me.lookupReference('paging_suratblank').getStore().reload());
        //me.lookupReference('paging_suratblank').setStore(me.getView().getStore());
    },
    init:function(){
    	me=this;
        //me.getViewModel().set('id_jabatan',Mail.LoggedInUser.data.id_jabatan);
    },
    render:function(){
        me = this;
        makeInterval = setInterval(function(){
            me.getView().getStore().reload();    
        },60000);
    },
    onItemClick:function(self, record, item, index, e, eOpts ){
    	var me = this;
    },
    onItemDblClick:function(self, record, item, index, e, eOpts ){
    	me = this;
        me.openInmailView(record);
    },
    onItemContextMenu:function(self, record, item, index, e, eOpts ){
    	console.log('test item contex menu '+record.data.pengirim);
    	var me = this;
		e.stopEvent();
    },
    onContainerClick:function(self, e, eOpts){
		var me = this;
    },
    openInmailView:function(selectedRecord){
        var me = this;
        console.log('rec:')
        console.log(selectedRecord);
        this.redirectTo('regsuratkeluar2/'+selectedRecord.id);
    }
    
});
