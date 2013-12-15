Ext.define('app.view.AddNewTourWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.newtour',
	title: 'Новый тур',
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
		items: [
		    {xtype: 'hidden', name: 'id'},
		    {xtype: 'textfield', fieldLabel: 'Название', name: 'name', allowBlank: false},
		    {xtype: 'combo',     fieldLabel: 'Приоритет отображения', name: 'priority', store: 'EnumTourPriority',
		    	displayField: 'name', valueField: 'id', editable: false},
		    {xtype: 'textareafield', grow: true, name: 'description', fieldLabel: 'Описание', anchor: '100%'},
		    {xtype: 'button', text: 'Сохранить', handler: addEditTour}
		]
	}]
});

function addEditTour(btn) {
	var addParams = btn.up('form').getValues();
	var win = btn.up('window');

	var url = 'tour/addTour';
	if (win.action == 'edit') {
		url = 'tour/editTour';
	}

	Ext.Ajax.request({
		url : url,
		params : addParams,
		success : function(response, opts) {
			var resp = Ext.decode(response.responseText);
			if (resp.success == true) {
				var tourbrowser = Ext.ComponentQuery.query('#tourbrowser')[0];
				tourbrowser.getStore().reload();
				win.close();
			} else {
				Ext.Msg.alert(resp.message);
			}
		}
	});
}
