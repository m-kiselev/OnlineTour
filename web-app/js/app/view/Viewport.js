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
        title: 'Список туров',
        split: true,
        width: '20%',
        minWidth: 100,
        minHeight: 140,
        html: 'Здесь будет список туров'
    },{
        region: 'center',
        plain: true,
        layout: 'anchor',
        items:[{
        	xtype: 'panel',
        	name: 'InfoPanel',
            title: 'Информационая панель',
            layout: 'anchor',
            anchor: '100% 100%'
        }]
    }]
});