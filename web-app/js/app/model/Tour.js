Ext.define('app.model.Tour', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',         type: 'int'},
        {name: 'name',       type: 'string'},
        {name: 'description',type: 'string'},
        {name: 'priority'}
    ]
});