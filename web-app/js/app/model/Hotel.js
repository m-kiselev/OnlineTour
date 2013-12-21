Ext.define('app.model.Hotel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',          type: 'int', mapping: 'nodeId'},
        {name: 'name',        type: 'string'},
        {name: 'origName',    type: 'string'},
        {name: 'description', type: 'string'}
    ],
    proxy: {
        type: 'rest',
        url : 'hotel/getInfo'
    }
});