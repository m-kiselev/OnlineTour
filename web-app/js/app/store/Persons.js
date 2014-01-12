Ext.define('app.store.Persons', {
    extend: 'Ext.data.Store',
    model: 'app.model.Person',
//    autoLoad: true,
//    autoSync: true,
    proxy: {
        type: 'ajax',
        api: {
            create  : 'person/addPerson',
            read    : 'person/getList',
            update  : 'person/editPerson',
            destroy : 'person/delete'
        },
        reader: {
            type: 'json',
            root: 'entities'
        },
		writer : {
			type : 'plainwriter'
		}
    }
});