Ext.define('app.store.BusSeats', {
    extend: 'Ext.data.Store',
//    model: 'app.model.TI',
    fields: ['name'],
    proxy: {
        type: 'ajax',
        url : 'timeInterval/getAvailableSeats',
        reader: {
            type: 'json',
            root: 'entities'
        }
    }
});