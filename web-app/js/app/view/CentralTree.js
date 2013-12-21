Ext.define('app.view.CentralTree', {
    extend: 'Ext.tree.Panel',
    alias : 'widget.centraltree',
    itemId: 'centraltree',
    rootVisible: false,
    tbar: [{
        text: 'Добавить',
        icon: 'images/add_menu.png',
        menu: [
           {xtype: 'hidden',   name: 'tourId'},
           {xtype: 'menuitem', itemId: 'addHotel',icon: 'images/hotel.png',   
                text: 'Добавить отель', handler: function() {addEditHolel(true);}},
           {xtype: 'menuitem', itemId: 'addTI',   icon: 'images/times.png'  ,
                text: 'Добавить время', handler:function() {addEditTI(true);}},
           {xtype: 'menuitem', itemId: 'addBR',   icon: 'images/document.png',
                text: 'Добавить заявку',handler: function() {addEditBR(true);}}
        ]},
        ,'-',
        {xtype: 'button', itemId: 'delete',text: 'Удалить', disabled: true, handler: deleteItem}
    ],
    listeners: {
        selectionchange: function(selModel, selections) {
            var deleteButton = this.down('#delete');
            if (deleteButton != null) {
                deleteButton.setDisabled(selections.length === 0);
            }
        }
    },

    initComponent: function() {
        var store = getNewCentralTreeStore();
        Ext.apply(this, {
            store: store,
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
                    if (recordType == 'hotel') {
                        addEditHolel(false, nodeId);
                    } else if (recordType == 'TI') {
                        addEditTI(false, nodeId);
                    } else if (recordType == 'BR') {
                        addEditBR(false, nodeId);
                    }
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

function addEditHolel(isAdd, hotelId) {
    var win = Ext.create('app.view.HotelWindow');
    var form = win.down('form').getForm();
    form.findField('tourId').setValue(getTourId());

    if (!isAdd) {
        win.setTitle("Редактирование отель");
        win.action = 'edit';
        Ext.Ajax.request({
            url : 'hotel/getInfo',
            params : {id: hotelId},
            success : function(response, opts) {
                var resp = Ext.decode(response.responseText);
                if (resp.success == true) {
                    form.findField('id').setValue(resp.id);
                    form.findField('origName').setValue(resp.name);
                    form.findField('name').setValue(resp.name);
                    form.findField('description').setValue(resp.description);
                } else {
                    Ext.Msg.alert("Error", resp.message);
                }
            }
        });
    }

    win.show();
};

function addEditTI(isAdd, TIId) {
    var win = Ext.create('app.view.TimesWindow');
    var form = win.down('form').getForm();
    form.findField('tourId').setValue(getTourId());

    if (!isAdd) {
        win.setTitle("Редактирование времени");
        win.action = 'edit';
        Ext.Ajax.request({
            url : 'timeInterval/getInfo',
            params : {id: TIId},
            success : function(response, opts) {
                var resp = Ext.decode(response.responseText);
                if (resp.success == true) {
                    form.findField('id').setValue(resp.id);
                    form.findField('origName').setValue(resp.name);
                    form.findField('name').setValue(resp.name);
                    form.findField('startDate').setValue(resp.startDate);
                    form.findField('endDate').setValue(resp.endDate);
                } else {
                    Ext.Msg.alert("Error", resp.message);
                }
            }
        });
    }

    win.show();
};

function addEditBR(isAdd, BRId) {
    var win = Ext.create('app.view.BRWindow');
    var form = win.down('form').getForm();

    if (!isAdd) {
        win.setTitle("Редактирование заяки");
        win.action = 'edit';
        Ext.Ajax.request({
            url : 'bookingRequest/getInfo',
            params : {id: BRId},
            success : function(response, opts) {
                var resp = Ext.decode(response.responseText);
                if (resp.success == true) {
                    form.findField('id').setValue(resp.id);
//                    form.findField('name').setValue(resp.name);
//                    form.findField('description').setValue(resp.description);
                } else {
                    Ext.Msg.alert("Error", resp.message);
                }
            }
        });
    }

    win.show();
};

function deleteItem(deleteButton) {
    Ext.MessageBox.confirm('Подтверждение',
            'Вы уверены что хотите удалить элемент?',
            function(btn) {
                if (btn == 'yes') {
                    var grid = deleteButton.up('#centraltree');
                    var selection = grid.getView().getSelectionModel().getSelection()[0];
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