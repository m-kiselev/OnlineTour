/**
 * 
 */
Ext.define('app.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'app.view.MainToolbar'
    ],

    layout: {
        type: 'border',
        padding: 5
    },

    items: [{
        region: 'north',
        xtype: 'maintoolbar',
        height: 35
    },{
        region: 'west',
        collapsible: true,
        title: 'Список направлений',
        split: true,
        width: '30%',
        minWidth: 100,
        minHeight: 140,
        layout: 'anchor',
        items: [{
        	xtype: 'tourbrowser',
            layout: 'anchor',
        }]
    },{
        region: 'center',
        plain: true,
        name: 'InfoPanel',
        layout: 'anchor'
    }]
});