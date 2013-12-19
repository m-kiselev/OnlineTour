Ext.define('app.view.CentralPanel', {
    extend: 'Ext.form.Panel',
    alias : 'widget.centralpanel',
    anchor: '100% 100%',
    layout: 'anchor',
    items: [
        {xtype: 'centraltree', anchor: '100% 50%'}
    ]
});