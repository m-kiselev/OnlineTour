Ext.define('app.store.CentralTreeStore', {
    extend: 'Ext.data.TreeStore',
    model: 'app.model.CentralTreeModel',
    root: {
        expanded: true,
    },
    autoLoad: false,
    proxy: {
        type: "ajax",
        url : "admin/getList"
    },
    listeners: {
        beforeload: function(store, op){
            if (app.User == null)
                return false;
        },
        beforeexpand: function( me, eOpts ) {
            me.store.treeStore.proxy.extraParams.name = me.data.name;
            me.store.treeStore.proxy.extraParams.id   = me.data.nodeId;
            me.store.treeStore.proxy.extraParams.type = me.data.type;
        }
    }
});

function getNewCentralTreeStore() {
    var tourId = getTourId();
    return Ext.create('app.store.CentralTreeStore', {root: {id: "root_" + tourId, expanded: true}});
}