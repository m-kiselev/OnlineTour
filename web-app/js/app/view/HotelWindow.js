Ext.define('app.view.HotelWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.hotelwindow',
	title: 'Новый отель',
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
		    {xtype: 'hidden', name: 'tourId'},
		    {xtype: 'hidden', name: 'origName'},
		    {xtype: 'textfield', fieldLabel: 'Название', name: 'name', allowBlank: false},
		    {xtype: 'textareafield', grow: true, name: 'description', fieldLabel: 'Описание', anchor: '100%'},
		    {xtype: 'button', text: 'Сохранить', handler: handleAddEditHotel}
		]
	}]
});

function handleAddEditHotel(btn) {
	var addParams = btn.up('form').getValues();
	var win = btn.up('window');

	var url = 'hotel/addHotel';
	if (win.action == 'edit') {
		url = 'hotel/editHotel';
	}

	Ext.Ajax.request({
		url : url,
		params : addParams,
		success : function(response, opts) {
			var resp = Ext.decode(response.responseText);
			if (resp.success == true) {
				var centraltree = Ext.ComponentQuery.query('#centraltree')[0];
				if (win.action == 'edit') {
					var editedNode = centraltree.getRootNode().findChild('name', addParams.origName);
					editedNode.name = addParams.name;
				} else {
					centraltree.getRootNode().appendChild({
	                    name  : addParams.name,
	                    icon  : 'images/hotel.png',
	                    type  : 'hotel',
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
