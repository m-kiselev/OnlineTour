/**
 * 
 */
Ext.define("app.view.MainToolbar", {
        extend: 'Ext.toolbar.Toolbar',
        alias: 'widget.maintoolbar',
        requires: ['Ext.toolbar.TextItem'],

        initComponent: function() {
            var items = [{
                    xtype: 'tbtext',
                    text: 'Cистемa online бронирования туров Грин-Тур'
            }, {
                    xtype: 'tbfill'
            }];

            if (app.User.isAdmin()) {
                items.push({
                    xtype  : 'button',
                    itemId : 'umButton',
                    text   : 'Управление пользователями',
                    handler: addUserManagementPanel
                });
            }

            items.push({
                xtype: 'button',
                text: 'Выход',
                handler: function() {
                    window.location.href = 'logout';
                }
            });

            Ext.apply(this, {items: items});
            this.callParent(arguments);
        }
});

function addUserManagementPanel(button) {
    button.disable();
    var viewport = button.up('viewport');
    var infoPanel = viewport.down('panel[name=InfoPanel]');
    // Remove user management panel if exist
    var centralPanel = viewport.down('centralpanel');
    if (typeof centralPanel != 'undefined' && centralPanel != null) {
        centralPanel.destroy();
    }

    var umPanel = Ext.create('app.view.UserManagementPanel', {height: '600'});
    infoPanel.add(umPanel);
};