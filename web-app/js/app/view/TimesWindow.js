Ext.define('app.view.TimesWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.timeswindow',
    title: 'Новое время',
    modal: true,
    bodyPadding: 5,
    width: 300,
    layout: 'fit',
    action: 'add',
    items: [{
        xtype: 'form',
        cls: 'touronline-bg',
        border: 0,
        defaults: {labelWidth: 120},
        monitorValid: true,
        items: [
            {xtype: 'hidden', name: 'id'},
            {xtype: 'hidden', name: 'tourId'},
            {xtype: 'hidden', name: 'origName'},
            {xtype: 'combo', fieldLabel: 'Отель', name: 'hotelId', store: 'Hotels'
                , displayField: 'name', valueField: 'id'
                , allowBlank: false, editable:false
                , listeners: {
                    beforerender: function(me) {
                        var tourId =  me.up('form').down('hidden[name=tourId]').getValue();
                        me.getStore().proxy.extraParams.id = tourId;
                        me.getStore().load();
                    }
                }
            },
            {xtype: 'textfield', fieldLabel: 'название', name: 'name', readOnly: true},
            {xtype: 'datefield', fieldLabel: 'начало',   name: 'startDate', editable:false, allowBlank: false, format: 'd/m/Y'},
            {xtype: 'datefield', fieldLabel: 'окончание',name: 'endDate'  , editable:false, allowBlank: false, format: 'd/m/Y'},
            {xtype: 'button', text: 'Сохранить', formBind: true, handler: handleAddEditTI}
        ]
    }],
    listeners: {
        beforerender: function(me) {
            if (me.action == 'edit') {
                me.down('combo[name=hotelId]').readOnly = true;
            }
        }
    }
});

function handleAddEditTI(btn) {
    var addParams = btn.up('form').getValues();
    var win = btn.up('window');

    var url = 'timeInterval/addTimeInterval';
    if (win.action == 'edit') {
        url = 'timeInterval/editTimeInterval';
    }

    function test(action, url, addParams) {};

    Ext.Ajax.request({
        url : url,
        params : addParams,
        success : function(response, opts) {
            var resp = Ext.decode(response.responseText);
            if (resp.success == true) {
                var centraltree = Ext.ComponentQuery.query('#centraltree')[0];
                if (win.action == 'edit') {
                    var editedNode = centraltree.getRootNode().findChild('name', addParams.origName, true);
                    editedNode.data.name = resp.name;
                } else {
                	// TODO: implement unique name
//                    var hotelNode = centraltree.getRootNode().findChild('name', addParams.origName, true);
                    hotelNode.appendChild({
                        name  : addParams.name,
                        icon  : 'images/times.png',
                        type  : 'TI',
                        nodeId: resp.nodeId
                    });
                }
                centraltree.getView().refresh(); 
                win.close();
            } else {
                Ext.Msg.alert(resp.message);
            }
        }
    });
}