Ext.define('app.model.BR', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',      type: 'int', mapping: 'nodeId'},
        {name: 'hotelId', type: 'int'},
        {name: 'timeId',  type: 'int'},
        {name: 'name',    type: 'string'},
        {name: 'userName',    type: 'string'},
        {name: 'origName',type: 'string'},
        {name: 'sity',    type: 'string'},
        {name: 'agencyName', type: 'string'},
        {name: 'phone',      type: 'string'},
        {name: 'personName', type: 'string'},
        {name: 'email',      type: 'string'},
        {name: 'numberTourist', type: 'int'},
        {name: 'bedsInRoom',    type: 'int'},
        {name: 'additionalBeds',type: 'int'},
        {name: 'additionalBed', type: 'boolean'},
        {name: 'roomCategory'},
        {name: 'feeding'},
        {name: 'excursions',         type: 'boolean'},
        {name: 'individualServices', type: 'string'},
        {name: 'insurance',          type: 'boolean'},
        {name: 'addInsurance',       type: 'boolean'},
        {name: 'note',               type: 'string'},
        {name: 'coast',              type: 'int'},
        {name: 'commission',         type: 'int'},
        {name: 'finalCoast',         type: 'int'}
    ],
    proxy: {
        type: 'rest',
        url : 'bookingRequest/getInfo'
    }
});