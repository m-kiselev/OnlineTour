/**
 * 
 */
Ext.define('app.controller.MainController', {
    extend: 'Ext.app.Controller',
    requires: ['app.user.Profile'],
    views:  ['Viewport','LoginForm', 'LogonForm', 'UserBrowser', 'UserManagementPanel',
             'TourBrowser', 'TourWindow', 'HotelWindow', 'TimesWindow', 'BRWindow',
             'CentralPanel', 'CentralTree', 'DescriptionPanel'],
    stores: ['Users', 'Tours', 'Hotels', 'Times', 'EnumTourPriority', 'EnumFeeding',
             'EnumRoomCategory', 'CentralTreeStore'],
    models: ['User', 'Tour', 'Hotel', 'TI', 'BR', 'CentralTreeModel'],
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
                            Ext.Msg.alert("Инфо", "Ваша заявка принята на рассмотрение");
                            returnToLoginForm(button);
                        }
                    });
                }
            },
            "logonform button[action=return]": {
                click: function(button) {
                	returnToLoginForm(button);
                }
            }
        });
    }
});

function returnToLoginForm(button) {
    var panel = button.up('panel');
    var viewport = panel.up('viewport');
    panel.destroy();

    var loginFrom = Ext.create('app.view.LoginForm');
    viewport.add(loginFrom);
}