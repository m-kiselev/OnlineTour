Ext.define('app.view.UserManagementPanel', {
    extend: 'Ext.form.Panel',
    alias : 'widget.usermanagementpanel',
    title: 'Панель управления пользователями',
    anchor: '100% 100%',
    layout: 'anchor',
    items: [
        {xtype: 'userbrowser', title: 'Активные пользователи', anchor: '100% 50%', isActive: true},
        {xtype: 'userbrowser', title: 'Заявки', anchor: '100% 50%', isActive: false}
    ]
});