Ext.define('app.store.Tours', {
    extend: 'Ext.data.Store',
    model: 'app.model.Tour',
    proxy: {
        type: 'ajax',
        url : 'tour/getList',
        reader: {
            type: 'json',
            root: 'entities'
        }
    },
    autoLoad: true
});