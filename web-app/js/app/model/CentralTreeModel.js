Ext.define('app.model.CentralTreeModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'nodeId', type: 'int'},
        {name: 'name',   type: 'string'},
        {name: 'type',   type: 'string'}
    ]
});