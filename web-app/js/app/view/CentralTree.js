    Ext.define('app.model.CentralTreeModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'name', type: 'string'}
        ]
    });    

Ext.define('app.store.CentralTreeStore', {
        extend: 'Ext.data.TreeStore',
        model: 'app.model.CentralTreeModel',
        root: {
            expanded: true
        },
        autoLoad: false,
        proxy: {
            type: "ajax",
            url : "hotel/getList",
            extraParams: {
                mode: 'getTree'
            }
//        ,
//            paramOrder: ['node']
        },
        listeners: {
            beforeexpand: function( me, eOpts ) {
                console.log("===beforeexpand==============");
                console.log(me);
                me.store.treeStore.proxy.extraParams.name = me.data.name;
            }
        }
    });

    Ext.define('app.view.CentralTree', {
        extend: 'Ext.tree.Panel',
        alias : 'widget.centraltree',
        height: 350,
        width: 600,
        title: 'Tree Sample',
        rootVisible: false,
        
        initComponent: function() {
            this.width = 600;
            
            Ext.apply(this, {
                store: Ext.create('app.store.CentralTreeStore'),
                columns: [{
                    xtype: 'treecolumn', //this is so we know which column will show the tree
                    text: 'Название',
                    flex: 2,
                    sortable: true,
                    dataIndex: 'name'
                }, {
                    text: 'Edit',
                    width: 55,
                    menuDisabled: true,
                    xtype: 'actioncolumn',
                    tooltip: 'Edit task',
                    align: 'center',
                    icon: 'images/edit.png',
                    handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                        Ext.Msg.alert('Editing' + (record.get('name') ? ' completed task' : '') , record.get('name'));
                    }
//                ,
                    // Only leaf level tasks may be edited
//                    isDisabled: function(view, rowIdx, colIdx, item, record) {
//                        return !record.data.leaf;
//                    }
                }]
            });
            this.callParent();
        }
//    ,
        
//        listenters: {
//            beforerender: function(me) {
//                var newStore = Ext.create('app.store.CentralTreeStore');
//                me.store = newStore;
//            }
//        }
    });