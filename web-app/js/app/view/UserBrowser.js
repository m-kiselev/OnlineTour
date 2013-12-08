Ext.define('app.view.UserBrowser', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.userbrowser',
    store: 'Users',
    stateful: true,
    columns: [
        {text: 'Логин', flex : 1, sortable : false, dataIndex: 'username'},
        {text: 'Роль', flex : 1, sortable : false,  dataIndex: 'role'},
        {text: 'Юр. название', flex : 1, sortable : false, dataIndex: 'lowCompanyName'},
        {text: 'Реальное название', flex : 1, sortable : false, dataIndex: 'realCompanyName'},
        {text: 'Адрес компании', flex : 1, sortable : false, dataIndex: 'companyAdress'},
        {text: 'Телефон', flex : 1, sortable : false, dataIndex: 'phone'},
        {text: 'Контактное лицо', flex : 1, sortable : false, dataIndex: 'personName'},
        {text: 'email', flex : 1, sortable : false, dataIndex: 'email'}
    ],
    listeners: {
        beforerender: function(me) {
            var store = Ext.create('app.store.Users');
            // load store
            store.load({
                params:{
                    active: me.isActive
                }
            });
            // Action column for active users
            var activeColumns = [
                 {
                    xtype: 'actioncolumn',
                    width: 50,
                    items: [{
                        icon: 'images/delete.png',
                        tooltip: 'удалить из системы',
                        handler: deleteActiveUser
                    }]
                }
            ];
            // Action column for disabled users
            var nonActiveColumns = [
                {
                    xtype: 'actioncolumn',
                    width: 50,
                    items: [{
                        icon: 'images/accept.png',
                        // Use a URL in the icon config
                        tooltip: 'одобрить',
                        handler: acceptDisabledUser
                    }, {
                        icon: 'images/delete.png',
                        tooltip: 'отказ',
                        handler: deleteDisabledUser
                    }]
                }
            ];
            if (me.isActive) {
                me.headerCt.insert(me.columns.length, activeColumns);
                me.getView().refresh();
            } else {
                me.headerCt.insert(me.columns.length, nonActiveColumns);
                me.getView().refresh();
            }
            // reconfigure store
            me.reconfigure(store);
        }
    }
});

function deleteActiveUser(grid, rowIndex, colIndex) {
    var rec = grid.getStore().getAt(rowIndex);
    var role = rec.get('role');

    if (role != 'ROLE_ADMIN') {
        Ext.MessageBox.confirm('Подтверждение',
                'Вы уверены что хотите удалить действующего пользователя?',
                function(btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url : 'user/deleteActiveUser',
                            method : 'GET',
                            params : {userId: rec.get('id')},
                            success : function(response, opts) {
                                Ext.Msg.alert("Инфо", "Пользователь успешно удален.");
                                grid.getStore().reload();
                            },
                            failure: function(response, opts) {
                                Ext.Msg.alert("Ошибка", "Повторите попытку.");
                            }
                        });
                    }
        });
    } else {
        Ext.Msg.alert("Инфо", "Нельзя удалить пользователя c правами администратора");
    }
}

function acceptDisabledUser(grid, rowIndex, colIndex) {
    var rec = grid.getStore().getAt(rowIndex);
    console.log(rec.data);

    Ext.Ajax.request({
        url : 'user/acceptUser',
        method : 'GET',
        params : {userId: rec.get('id')},
        success : function(response, opts) {
            Ext.Msg.alert("Инфо", "Пользователь добавлен в систему");
            grid.getStore().reload();
            var activeGrid = grid.up('usermanagementpanel').down('grid[isActive=true]');
            console.log(activeGrid);
            activeGrid.getStore().reload();
        },
        failure: function(response, opts) {
            Ext.Msg.alert("Ошибка", "Повторите попытку.");
        }
    });
}

function deleteDisabledUser(grid, rowIndex, colIndex) {
    var rec = grid.getStore().getAt(rowIndex);
    console.log(rec.data);
    Ext.MessageBox.confirm('Подтверждение',
            'Вы уверены что хотите удалить действующего пользователя?',
            function(btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url : 'user/deleteDisabledUser',
                        method : 'GET',
                        params : {userId: rec.get('id')},
                        success : function(response, opts) {
                            Ext.Msg.alert("Инфо", "Заявка удалена, письмо с отказом выслано");
                            grid.getStore().reload();
                        },
                        failure: function(response, opts) {
                            Ext.Msg.alert("Ошибка", "Повторите попытку.");
                        }
                    });
                }
    });
}