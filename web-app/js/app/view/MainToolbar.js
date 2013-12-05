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
                    text: 'Login and Roles-Based Security Simulator'
            }, {
                    xtype: 'tbfill'
            }];

            if (app.User.isAdmin()) {
                items.push({
                    xtype: 'button',
                    text: 'For Admins'
                });
            } else {
                items.push({
                    xtype: 'button',
                    text: 'For  Users'
                });
            }

            Ext.apply(this, {items: items});
            this.callParent(arguments);
        }
})