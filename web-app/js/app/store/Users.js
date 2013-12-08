Ext.define('app.store.Users', {
    extend: 'Ext.data.Store',
    model: 'app.model.User',
    proxy: {
        type: 'ajax',
        url : 'user/getUsers',
        reader: {
            type: 'json',
            root: 'users'
        }
    },
    autoLoad: false
});