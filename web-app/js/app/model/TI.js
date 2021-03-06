Ext.define('app.model.TI', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',         type: 'int', mapping: 'nodeId'},
        {name: 'hotelId',    type: 'int'},
        {name: 'name',       type: 'string'},
        {name: 'origName',   type: 'string'},
        {name: 'startDate',  type: 'date'},
        {name: 'endDate',    type: 'date'}
    ],
    proxy: {
        type: 'rest',
        url : 'timeInterval/getInfo'
    }
});