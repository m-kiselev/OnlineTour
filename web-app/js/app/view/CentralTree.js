Ext.define('app.view.CentralTree', {
    extend: 'Ext.tree.Panel',
    alias : 'widget.centraltree',
    itemId: 'centraltree',
    rootVisible: false,
    listeners: {
        selectionchange: function(selModel, selections) {
            var deleteButton = this.down('#delete');
            if (deleteButton != null) {
                deleteButton.setDisabled(selections.length === 0);
            }
        }
    },

    initComponent: function() {
        // create toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            width   : 400,
            items   : [/*
               {xtype: 'combo', fieldLabel: 'Выбрать отель', name: 'hotelId', store: 'Hotels'
                   , displayField: 'name', valueField: 'id'
                   , width: 220, multiSelect: true
                   , allowBlank: false, editable:false
                   , listeners: {
                       beforerender: function(me) {
                           me.getStore().proxy.extraParams.id = getTourId();
                           me.getStore().load();
                       },
                       collapse: function(me){
                           console.log(me.getValue());
                           var store = me.up('centraltree').getStore();
                           console.log(store);
                           store.proxy.extraParams.hotelIds = me.getValue();
                           store.load();
                       }
                   }
               }*/
               // TODO: add filters
            ]
        });

        if (app.User.isAdmin()) {
           toolbar.add({
               text: 'Добавить',
               icon: 'images/add_menu.png',
               itemId: 'addMenu',
               menu: [
                  {xtype: 'hidden',   name: 'tourId'},
                  {xtype: 'menuitem', itemId: 'addHotel',icon: 'images/hotel.png',
                       text: 'Добавить отель', handler: function() {addEditItem(true, 'hotel');}},
                  {xtype: 'menuitem', itemId: 'addTI',   icon: 'images/times.png'  ,
                       text: 'Добавить время', handler:function() {addEditItem(true, 'TI');}},
                  {xtype: 'menuitem', itemId: 'addBR',   icon: 'images/document.png',
                       text: 'Добавить заявку',handler: function() {addEditItem(true, 'BR');}}
               ]},'-');
        } else {
           toolbar.add({
               text: 'Добавить',
               icon: 'images/add_menu.png',
               itemId: 'addMenu',
               menu: [
                  {xtype: 'hidden',   name: 'tourId'},
                  {xtype: 'menuitem', itemId: 'addBR',   icon: 'images/document.png',
                       text: 'Добавить заявку',handler: function() {addEditItem(true, 'BR');}}
               ]},'-');
        }

        toolbar.add({xtype: 'button', itemId: 'delete',text: 'Удалить', disabled: true, handler: deleteItem});

        // create store
        var store = getNewCentralTreeStore();
        Ext.apply(this, {
            store: store,
            tbar: toolbar,
            columns: [{
                xtype: 'treecolumn', //this is so we know which column will show the tree
                text: 'Название',
                flex: 2,
                sortable: false,
                dataIndex: 'name'
            }, {
                width: 55,
                menuDisabled: true,
                xtype: 'actioncolumn',
                tooltip: 'Редактировать',
                align: 'center',
                icon: 'images/edit.png',
                handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                    console.log(record.data);
                    var recordType = record.get('type');
                    var nodeId     = record.get('nodeId');
                    addEditItem(false, recordType, nodeId);
                },
                getClass: function(v, meta, rec) {
                    if(!rec.data.leaf && !app.User.isAdmin()) {
                        // Hide by conditions
                        return 'x-hide-display';
                    }
                }
            }]
        });

        this.callParent();
    }
});


function addEditItem(isAdd, type, itemId) {
    var modelName  = null;
    var winTitle   = null;
    var windowName = null;
    if (type == 'hotel') {
        modelName  = 'app.model.Hotel';
        winTitle   = "Редактирование отеля";
        windowName = 'app.view.HotelWindow';
    } else if (type == 'TI') {
        modelName  = 'app.model.TI';
        winTitle   = "Редактирование времени";
        windowName = 'app.view.TimesWindow';
    } else if (type == 'BR') {
        modelName  = 'app.model.BR';
        winTitle   = "Редактирование заяки";
        windowName = 'app.view.BRWindow';
    }

    var Model = Ext.ModelManager.getModel(modelName);

    var win = Ext.create(windowName);
    var form = win.down('form').getForm();
    form.findField('tourId').setValue(getTourId());

    if (!isAdd) {
        win.setTitle(winTitle);
        win.action = 'edit';

        Model.load(itemId, {
            success: function(item) {
                form.loadRecord(item);
            },
            failure: function(resp) {
                Ext.Msg.alert("Error", resp.message);
            }
        });
    } else {
        if (type == 'BR') {
            form.findField('userName').setValue(app.User.userName);
            form.findField('agencyName').setValue(app.User.agencyName);
            form.findField('phone').setValue(app.User.phone);
            form.findField('personName').setValue(app.User.personName);
            form.findField('email').setValue(app.User.email);
        }
    }

    win.show();
}

function deleteItem(deleteButton) {
    var grid = deleteButton.up('#centraltree');
    var selection = grid.getView().getSelectionModel().getSelection()[0];
    if (!app.User.isAdmin() && selection.data.type != 'BR') {
        Ext.Msg.alert("Инфо", "Вы имеете право удалять только заявки");
    } else {
        Ext.MessageBox.confirm('Подтверждение',
                'Вы уверены что хотите удалить элемент?',
                function(btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url : 'admin/deleteItem',
                            params : {id: selection.data.nodeId, type: selection.data.type},
                            success : function(response, opts) {
                                var resp = Ext.decode(response.responseText);
                                if (resp.success == true) {
                                    var selectedNode = grid.getSelectionModel().getSelection();
                                    selectedNode[0].remove();
                                } else {
                                    Ext.Msg.alert("Error", resp.message);
                                }
                            }
                        });
                    }
        });
    }
}