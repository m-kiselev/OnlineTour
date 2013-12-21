Ext.define('app.model.TI', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',         type: 'int', mapping: 'nodeId'},
        {name: 'name',       type: 'string'},
        {name: 'startDate',  type: 'date'},
        {name: 'endDate',    type: 'date'}
    ]
});