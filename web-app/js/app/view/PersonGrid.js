Ext.define('app.view.PersonGrid', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.persongrid',
    store: 'Persons',
    itemId: 'persongrid',
    stateful: true,
    height: 200,
    anchor: '100% 100%',
	plugins: [{
		ptype:'cellediting',
		clicksToEdit: 1
	}],
    columns: [
    {
        text: 'ФИО',
        flex: 1,
        sortable: true,
        dataIndex: 'fio',
        editor: {
            xtype: 'textfield'
        }
    }, {
    	text: 'Дата рождения',
    	flex: 1,
    	sortable: true,
    	dataIndex: 'birthDate',
    	xtype:'datecolumn', format:'d.m.Y',
    	editor:{xtype:'datefield', format:'d.m.Y'}
    }, {
    	text: 'Паспортные данные',
    	flex: 1,
    	sortable: true,
    	dataIndex: 'passportData',
    	editor: {
    		xtype: 'textfield'
    	}
    }, {
        header: 'Телефон',
        width: 80,
        sortable: true,
        dataIndex: 'phone',
        editor: {
            xtype: 'textfield'
        }
    }, {
        text: 'email',
        width: 80,
        sortable: true,
        dataIndex: 'email',
        editor: {
            xtype: 'textfield'
        }
    }],
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Добавить',
            icon: 'images/add.png',
            handler: function(me){
            	var grid = me.up('grid');
                // empty record
            	grid.getStore().insert(0, Ext.create("app.model.Person"));
            }
        }, '-', {
            itemId: 'delete',
            text: 'Удалить',
            icon: 'images/delete.png',
            disabled: true,
            handler: function(me){
            	var grid = me.up('grid');
                var selection = grid.getView().getSelectionModel().getSelection()[0];
                if (selection) {
                	grid.getStore().remove(selection);
                }
            }
        }]
    }],
    listeners: {
        afterrender: function(me) {
        	var brId = me.up('window').brId;
        	if (brId != null && brId != '') {
        		var store = Ext.create('app.store.Persons');
                store.proxy.extraParams = {'brId': brId};
        		store.load();
        		me.reconfigure(store);
        	}
        },
        selectionchange: function(selModel, selections) {
            var deleteButton = this.down('#delete');
            if (deleteButton != null) {
                deleteButton.setDisabled(selections.length === 0);
            }
        }
    }
});