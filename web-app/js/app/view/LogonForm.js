/**
 * 
 */
Ext.define('app.view.LogonForm', {
    extend: 'Ext.form.Panel',
    alias : 'widget.logonform',
    title: 'Регистрация нового агентства в системе',
    frame: true,
    cls: 'my-form-class',
    width: 450,
    monitorValid: true,
    defaults: {
        width: 400
    },
    items: [
        {xtype: 'textfield', fieldLabel: 'Юридическое название компании',name: 'lowCompanyName',  allowBlank:false},
        {xtype: 'textfield', fieldLabel: 'Фактическое название компании',name: 'realCompanyName', allowBlank:false},
        {xtype: 'textfield', fieldLabel: 'Фактический адрес компании',   name: 'companyAdress',   allowBlank:false},
        {xtype: 'textfield', fieldLabel: 'Контактный телефон',           name: 'phone',      allowBlank:false},
        {xtype: 'textfield', fieldLabel: 'Контактное лицо',              name: 'personName', allowBlank:false},
        {xtype: 'textfield', fieldLabel: 'Логин',                        name: 'loginName',  allowBlank:false},
        {xtype: 'textfield', fieldLabel: 'Пароль',                       name: 'pass', id: 'pass', allowBlank:false, inputType: 'password', emptyText: "********", vtype: 'password'},
        {xtype: 'textfield', fieldLabel: 'Подтверждение пароля',         name: 'pass-cfrm', allowBlank:false,        inputType: 'password', emptyText: "********", vtype: 'password', initialPassField: 'pass'},
        {xtype: 'textfield', fieldLabel: 'Электронная почта',            name: 'email',     allowBlank:false, vtype: 'email'},
        {xtype: 'button',    text: 'Зарегистрироваться', action: 'logon', width: 150, formBind: true},
        {xtype: 'button',    text: 'Вернуться',          action: 'return',width: 150}
    ]
});

Ext.apply(Ext.form.field.VTypes, {
    password: function(val, field) {
        if (field.initialPassField) {
            var pwd = field.up('form').down('#' + field.initialPassField);
            return (val == pwd.getValue());
        }
        return true;
    },

    passwordText: 'Passwords do not match'
});