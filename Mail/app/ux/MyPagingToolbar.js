Ext.define('Ux.MyPagingToolbar', {
	extend : 'Ext.toolbar.Paging',
	xtype: 'MyPagingToolbar',
    displayInfo: true,
    displayMsg:'{0} - {1} dari total {2}',
    emptyMsg:'Tidak ada data yang dapat ditampilkan',
    prevText : 'sebelumn',
    nextText : 'sesudah',
    firstText: 'pertama',
    lastText:'terakhir',
    beforePageText : 'hal',
    afterPageText : 'dari {0}'
})