Ext.define('app.model.BR', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',   type: 'int', mapping: 'nodeId'},
        {name: 'name', type: 'string'},
        {name: 'origName', type: 'string'}
        // TODO: add fields
    ],
    proxy: {
        type: 'rest',
        url : 'bookingRequest/getInfo'
    }
});