/**
 * 
 */
Ext.define('app.view.LoginForm', {
    extend: 'Ext.form.Panel',
    alias : 'widget.loginform',
    method :'POST',
    title: 'Please login',
    frame: true,
    cls: 'my-form-class',
    width: 350,
    items: [
        {xtype: 'textfield',fieldLabel: 'Login',name: 'j_username'},
        {xtype: 'textfield',inputType: 'password',fieldLabel: 'Password',name: 'j_password'}
    ],
    buttons: [
       {id: 'lf.btn.login', text: 'Войти',    handler: fnLoginForm},
       {id: 'lf.btn.reset', text: 'Сбросить', handler: fnResetForm},
       {id: 'lf.btn.logon', text: 'Зарегистрироваться', handler: fnLogon}
     ]
});

function fnLoginForm(btn) {
    var loginForm = btn.up('form');

    loginForm.getForm().submit({
        url: 'j_spring_security_check',
        params: loginForm.getValues(),
        success: function(form, action) {
            Ext.Ajax.request({
                url: 'user/getUserInfo',
                params: {username: loginForm.getValues().j_username},
                success: function(response) {
                    var data = Ext.decode(response.responseText);
                    if (data.userName) {
                        // instantiate user info in global scope for easy referencing
                        app.User = Ext.create("app.user.Profile", {
                            userName  : data.userName,
                            userRole  : data.userRole,
                            agencyName: data.agencyName,
                            phone     : data.phone,
                            personName: data.personName,
                            email     : data.email
                        });

                        // destroy login form
                        loginForm.destroy();

                        // load main UI
                        Ext.create("app.view.Viewport");
                    }
                }
            });
        },
        failure: function(form, action) {
            Ext.Msg.alert('Warning', action.result.error);
        }
    });
} //end fnLoginForm
 
function fnResetForm(btn) {
    var form = btn.up('form').getForm();
    form.reset();
}

function fnLogon(btn) {
    var form = btn.up('form');
    var viewport = form.up('viewport');
    form.destroy();
    var logonFrom = Ext.create('app.view.LogonForm');
    viewport.add(logonFrom);
}