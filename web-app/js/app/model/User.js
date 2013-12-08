Ext.define('app.model.User', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',             type: 'int'},
        {name: 'username',       type: 'string'},
        {name: 'role',           type: 'string'},
        {name: 'lowCompanyName', type: 'string'},
        {name: 'realCompanyName',type: 'string'},
        {name: 'companyAdress',  type: 'string'},
        {name: 'phone',          type: 'string'},
        {name: 'personName',     type: 'string'},
        {name: 'email',          type: 'string'}
    ]
});