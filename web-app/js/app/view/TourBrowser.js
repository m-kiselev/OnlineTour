 var tourContextMenu = Ext.create('Ext.menu.Menu', {
    items: [
       {xtype: 'hidden', name: 'tourId'},
       {xtype: 'menuitem', itemId: 'add', icon: 'images/add.png', text: 'Добавить', handler: addEditTour},
       {xtype: 'menuitem', itemId: 'edit',icon: 'images/edit.png',text: 'Редактировать',  handler: addEditTour}
    ]
}); 
 
Ext.define('app.view.TourBrowser', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.tourbrowser',
    store: 'Tours',
    itemId: 'tourbrowser',
    stateful: true,
    anchor: '100% 100%',
    tbar: [{
        xtype: 'textfield',
        fieldLabel: 'Поиск',
        labelAlign: 'left',
        labelWidth: 50,
        width: 160,
        padding: '5 10 5 10',
        name: 'pattern',
        listeners: {
            change: function(me, newValue) {
                performTourSearch(me, newValue);
            }
        }
    }, '-'],
    bbar: {
        xtype: 'pagingtoolbar',
        store: 'Tours',
        displayInfo: true
    },
    columns: [
        {text: 'Название',  flex : 1, dataIndex: 'name'},
        {text: 'Приоритет', flex : 1, sortable : false, dataIndex: 'priority', renderer: priorityRenderer}
    ],
    listeners: {
        beforerender: function(me) {
            // sort tours by priority
            sortToursByPriority(me.getStore());

            var toolbar = me.down('toolbar');
            if (app.User.isAdmin()) {
                var buttons = [{
                    xtype: 'button',
                    itemId: 'add',
                    text: 'Добавить',
                    handler: addEditTour
                },'-',{
                    xtype: 'button',
                    itemId: 'delete',
                    text: 'Удалить',
                    disabled: true,
                    handler: deleteTour
                }];
                toolbar.add(buttons);
            }
        },
        selectionchange: function(selModel, selections) {
            var deleteButton = this.down('#delete');
            if (deleteButton != null) {
                deleteButton.setDisabled(selections.length === 0);
            }
        },
        select: function(me, record, index) {
            addTourToInfoPanel(this, record.data);
        },
        beforeitemcontextmenu: function(view, record, item, index, e) {
            if (app.User.isAdmin()) {
                e.stopEvent();
                console.log(record.data.id);
                tourContextMenu.down('hidden[name=tourId]').setValue(record.data.id);
                tourContextMenu.showAt(e.getXY());
            }
        }
    }
});

function addEditTour(btn) {
    var win = Ext.widget('newtour');
    var form = win.down('form').getForm();

    if (btn.itemId == 'add') {
        form.findField('priority').setValue('NORMAL');
    } else {
        win.setTitle("Редактировать направление");
        win.action = 'edit';
        var tourId = btn.up('menu').down('hidden[name=tourId]').getValue();
        Ext.Ajax.request({
            url : 'tour/getInfo',
            params : {id: tourId},
            success : function(response, opts) {
                var resp = Ext.decode(response.responseText);
                console.log(resp);
                if (resp.success == true) {
                    form.findField('id').setValue(tourId);
                    form.findField('name').setValue(resp.name);
                    form.findField('priority').setValue(resp.priority.name);
                    form.findField('description').setValue(resp.description);
                } else {
                    Ext.Msg.alert("Error", resp.message);
                }
            }
        });
    }

    win.show();
}

function deleteTour(deleteButton) {
    Ext.MessageBox.confirm('Подтверждение',
            'Вы уверены что хотите удалить направление?',
            function(btn) {
                if (btn == 'yes') {
                    var grid = deleteButton.up('grid');
                    var selection = grid.getView().getSelectionModel().getSelection()[0];
                    Ext.Ajax.request({
                        url : 'tour/deleteTour',
                        params : {id: selection.data.id},
                        success : function(response, opts) {
                            var resp = Ext.decode(response.responseText);
                            if (resp.success == true) {
                                grid.getStore().reload();
                            } else {
                                Ext.Msg.alert("Error", resp.message);
                            }
                        }
                    });
                }
    });
}

function performTourSearch(me, pattern) {
    var grid = me.up('grid');
    var store = Ext.create('app.store.Tours');

    store.getProxy().setExtraParam("pattern", pattern);
    store.load();
    sortToursByPriority(store);

    grid.reconfigure(store);
    grid.down('pagingtoolbar').bindStore(store);
}

function sortToursByPriority(store) {
    store.sort([{
        sorterFn: function(v1, v2) {
            var order = ['HIGH', 'NORMAL', 'LOW'],
                v1o = order.indexOf(v1.get('priority').name),
                v2o = order.indexOf(v2.get('priority').name);

            return v1o < v2o ? -1 : 1;; 
        }
    }]);
}

function addTourToInfoPanel(grid, tourData) {
    var viewport = grid.up('viewport');
    var infoPanel = viewport.down('panel[name=InfoPanel]');

    // Remove user management panel if exist
    var umPanel = viewport.down('usermanagementpanel');
    if (typeof umPanel != 'undefined' && umPanel != null) {
        umPanel.destroy();
        viewport.down('#umButton').enable(); // enable um button
    }
    // Remove already exist central panel
    var existCentralPanel = viewport.down('centralpanel');
    if (typeof existCentralPanel != 'undefined' && existCentralPanel != null) {
        existCentralPanel.destroy();
    }

    var centralPanel = Ext.create('app.view.CentralPanel');
    infoPanel.add(centralPanel);
}