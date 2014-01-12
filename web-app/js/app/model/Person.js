Ext.define('app.model.Person', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',          type: 'int', useNull: true},
        {name: 'brId',        type: 'int'},
        {name: 'fio',         type: 'string'},
        {name: 'passportData',type: 'string'},
        {name: 'phone',       type: 'string'},
        {name: 'email',       type: 'string'},
        {name: 'birthDate',   type: 'date',
            serialize: function(val, record) {
                return Ext.Date.format(val, 'd/m/Y');
            }
        }
    ],
    validations: [
        {type: 'length',field: 'fio',min: 1},
        {type: 'length',field: 'passportData', min: 1},
        {type: 'length',field: 'phone',min: 1},
        {type: 'presence', field: 'birthDate'},
        {type: 'length',field: 'email',min: 1}
    ]
});