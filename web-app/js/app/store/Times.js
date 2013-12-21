Ext.define('app.store.Times', {
    extend: 'Ext.data.Store',
    model: 'app.model.TI',
    proxy: {
        type: 'ajax',
        url : 'timeInterval/getList',
        reader: {
            type: 'json',
            root: 'entities'
        }
    }
});