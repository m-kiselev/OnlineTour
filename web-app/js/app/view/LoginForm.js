/**
 * 
 */
Ext.define('app.view.LoginForm', {
    extend: 'Ext.form.Panel',
    alias : 'widget.loginform',
    method :'POST',
    url: 'j_spring_security_check',
    title: 'Please login',
    frame: true,
    cls: 'my-form-class',
    width: 350,
    items: [
        {xtype: 'textfield',fieldLabel: 'Login',name: 'j_username'},
        {xtype: 'textfield',inputType: 'password',fieldLabel: 'Password',name: 'j_password'}
//        , 
//        {xtype: 'checkbox',fieldLabel: 'Remember Me?',name: '_spring_security_remember_me',checked: false}
    ],
    buttons: [
       {id: 'lf.btn.login', text: 'Войти',    handler: fnLoginForm},
       {id: 'lf.btn.reset', text: 'Сбросить', handler: fnResetForm},
       {id: 'lf.btn.logon', text: 'Зарегистрироваться', handler: fnLogon}
     ]
});

function fnLoginForm(btn)
{
    var loginForm = btn.up('form');

    Ext.Ajax.request({
        url: 'j_spring_security_check',
        params: loginForm.getValues(),
        success: function(form, action) {
            Ext.Ajax.request({
                url: 'user/getUserInfo',
                params: {
                    username: loginForm.getValues().j_username
                },
                success: function(response) {
                        var data = Ext.decode(response.responseText);
                        console.log(data);
                        if (data.userName) {
                            // instantiate user info in global scope for easy referencing
                            app.User = Ext.create("app.user.Profile", {
                                userName: data.userName,
                                userRole: data.userRole
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
 
function fnResetForm(btn)
{
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