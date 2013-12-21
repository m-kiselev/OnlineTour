Ext.define('app.store.Hotels', {
    extend: 'Ext.data.Store',
    model: 'app.model.Hotel',
    proxy: {
        type: 'ajax',
        url : 'hotel/getList',
        reader: {
            type: 'json',
            root: 'entities'
        }
    }
});