Ext.define('Mail.model.User', {
	extend: 'Ext.data.Model',

	fields: [
		{
			name: 'id',
			type: 'int',
			persist: false
		},
		{
			name: 'username',
			type: 'string',
			persist: false
		},{
			name: 'nama_lengkap',
			type: 'string',
			persist: false
		},{
			name: 'type',
			type: 'string',
			persist: false
		},
		{
			name: 'id_jabatan',
			type: 'string',
			persist: false
		},		
		{
			name: 'kode_jabatan',
			type: 'string',
			persist: false
		},
		{
			name: 'id_unker',
			type: 'string',
			persist: false
		},
		{
			name: 'jabatan',
			type: 'string',
			persist: false
		},
		{
			name:'id_atasan',
			type:'string',
			persist:false
		},{
			name:'jabatan_atasan',
			type:'string',
			persist:false
		},
		{
			name: 'kode_unker',
			type: 'string',
			persist: false
		}
	]
})