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
       {id: 'lf.btn.login', text: 'Войти', handler: function(me) {
           var loginForm = me.up('panel');
           fnLoginForm(loginForm);
        }},
       {id: 'lf.btn.reset', text: 'Сбросить', handler: function(me) {
           var loginForm = me.up('panel');
           fnResetForm(loginForm);
       }},
        {id: 'lf.btn.logon', text: 'Зарегистрироваться', handler: function(me) {
            var loginForm = me.up('panel');
            fnLogon(loginForm);
        }}
     ]
});

function fnLoginForm(loginForm)
{
    var username = loginForm.down('textfield[name=j_username]').getValue();
    console.log("username: " + username);
    loginForm.getForm().submit({
        success: function(form, action) {
            Ext.Ajax.request({
                url: 'user/getUserInfo',
                params: {
                    username: username
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

//                            Ext.Msg.alert("Login Successful",
//                                  Ext.String.format("Welcome {0} {1}",
//                                      app.User.getUserName(),
//                                      app.User.getUserRole())
//                            );

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
 
function fnResetForm(theForm)
{
    theForm.getForm().reset();
}

function fnLogon(loginForm) {
    var viewport = loginForm.up('viewport');
    loginForm.destroy();
    var logonFrom = Ext.create('app.view.LogonForm');
    viewport.add(logonFrom);
}