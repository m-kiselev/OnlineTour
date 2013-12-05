/**
 * 
 */
Ext.define('app.controller.MainController', {
    extend: 'Ext.app.Controller',
    requires: ['app.user.Profile'],
//    views: ['LoginForm','Viewport'],
    views: ['LoginForm', 'LogonForm'],
    init: function(application) {
        this.control({
            "logonform button[action=logon]": {
                click: function(button) {
                    var formParams = button.up('form').getValues();
                    Ext.Ajax.request({
                        url : 'logon',
                        method : 'GET',
                        params : formParams,
                        success : function(response, opts) {
                            Ext.Msg.alert("Ваша заявка принята на рассмотрение");
                        }
                    });
//                    window.location = "logon";
                }
            },
            "logonform button[action=return]": {
                click: function(button) {
                    var panel = button.up('panel');
                    var viewport = panel.up('viewport');
                    panel.destroy();

                    var loginFrom = Ext.create('app.view.LoginForm');
                    viewport.add(loginFrom);
                }
            }
        });
    }
/*
    onLogin: function(loginDialog,loginForm,loginCredentials) {
            console.log(loginCredentials);

            var me = this;

            // authenticate
            Ext.Ajax.request({
                    url: 'resources/sampledata/cred.json',
                    params: {
                            username: loginCredentials.username,
                            password: loginCredentials.password
                    },
                    success: function(response) {
                            
                            var data = Ext.decode(response.responseText);
                            
                            if (data.firstName) {

                                    // instantiate user info in global scope for easy referencing
                                    app.User = Ext.create("LoginAppDemo.user.Profile", {
                                            firstName: data.firstName,
                                            lastName: data.lastName,
                                            roles: data.roles
                                    });

                                    // destroy login dialog
                                    loginDialog.destroy();


                                    Ext.Msg.alert("Login Successful",
                                                              Ext.String.format("Welcome {0} {1}",
                                                                                                      LoginAppDemo.User.getFirstName(),
                                                                                                      LoginAppDemo.User.getLastName())
                                    );

                                    // load main UI
                                    Ext.create("LoginAppDemo.view.Viewport");
                            } else {
                                    Ext.Msg.alert("Invalid credentials","You entered invalid credentials.", function() {
                                            loginForm.getForm().reset();
                                    })
                            }
                    }
            });
    }*/
});