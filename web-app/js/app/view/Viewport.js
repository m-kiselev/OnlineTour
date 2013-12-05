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
        type: 'border'
    },

    items: [{
        region: 'north',
        xtype: 'maintoolbar',
        height: 35
    },{
        region: 'center',
        plain: true,
        xtype: 'tabpanel',
        items:[{
            title: 'Welcome!'
        }]
    }]
});