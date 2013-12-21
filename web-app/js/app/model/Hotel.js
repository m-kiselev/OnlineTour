Ext.define('app.model.Hotel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',   type: 'int', mapping: 'nodeId'},
        {name: 'name', type: 'string'}
    ]
});