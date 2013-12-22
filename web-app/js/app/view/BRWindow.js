Ext.define('app.view.BRWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.brwindow',
    title: 'Новая заявка',
    modal: true,
    bodyPadding: 5,
    width: 800,
    height: 500,
    x: 66,
    y: 66,
    layout: 'fit',
    action: 'add',
    items: [{
        xtype: 'form',
        cls: 'touronline-bg',
        border: 0,
        monitorValid: true,
        items: [
            {xtype: 'hidden', name: 'id'},
            {xtype: 'hidden', name: 'tourId'},
            {xtype: 'hidden', name: 'origName'},
            {xtype: 'hidden', name: 'userName'},
            {
                layout: 'column',border:0,cls:'touronline-bg',
                defaults:{columnWidth:.5,labelWidth: 140,padding:5},
                items:[
                   {xtype: 'datefield', fieldLabel: 'Запрос бронирования от',   name: 'dateCreated', value: new Date(), readOnly: true, labelWidth: 170,
                       afterLabelTextTpl: '<img src="images/info.png" class="info_image" data-qtip="Это поле заполняется автоматически"></img>'},
                   {xtype: 'button', text: 'Сохранить', columnWidth:.1, formBind:true, width: 180, handler: handleAddEditBR, cls: 'x-right-button'}
                   ]
            },
            {
                title: 'Общие сведения о заявке',
                xtype:'fieldset',
                items: [{
                    layout: 'column',border:0,cls:'touronline-bg',
                    defaults:{columnWidth:.5,labelWidth: 140,padding:5},
                    items:[
                        {xtype: 'textfield', fieldLabel: 'Название', name: 'name', allowBlank: false, afterLabelTextTpl: markFieldRequired/*, readOnly: true*/},
                        {xtype: 'textfield', fieldLabel: 'Город',    name: 'sity', labelWidth: 80},
                     ]
                },{
                    layout: 'column', border:0, cls:'touronline-bg',
                    defaults:{columnWidth:.5,labelWidth: 140, padding:5},
                    items: [
                        {xtype: 'textfield', fieldLabel: 'Название агенства',name: 'agencyName', readOnly: true},
                        {xtype: 'textfield', fieldLabel: 'Телефон',          name: 'phone',        labelWidth: 80, readOnly: true},
                        {xtype: 'textfield', fieldLabel: 'Контактное лицо',  name: 'personName', readOnly: true},
                        {xtype: 'textfield', fieldLabel: 'email',            name: 'email',     labelWidth: 80, readOnly: true},
                    ]
                }]
            },
            {
                autoScroll:true,
                cls:'touronline-bg',
                border:0,
                anchor:'100% -190',
                autoHeight:true,
                bodyPadding:5,
                items:[
                    {
                        title: 'Тур',
                        xtype:'fieldset',
                        items: [{
                            layout: 'column',border:0, cls:'touronline-bg',
                            defaults:{columnWidth:.5,labelWidth: 80, padding: 5},
                            items:[
                                {xtype: 'combo', fieldLabel: 'Отель', name: 'hotelId', store: 'Hotels'
                                    , displayField: 'name', valueField: 'id'
                                    , allowBlank: false, editable:false
                                    , afterLabelTextTpl: markFieldRequired
                                    , listeners: {
                                        beforerender: function(me) {
                                            var tourId =  me.up('form').down('hidden[name=tourId]').getValue();
                                            me.getStore().proxy.extraParams.id = tourId;
                                            me.getStore().load();
                                        },
                                        change: function(me) {
                                            var timesCombo = me.up('form').down('combo[name=timeId]');
                                            var hotelId = me.getValue();
                                            timesCombo.getStore().proxy.extraParams.id = hotelId;
                                            timesCombo.getStore().load();

                                            // expand hotel node
                                            var centraltree = Ext.ComponentQuery.query('#centraltree')[0];
                                            var hotelName = me.up('form').down('combo[name=hotelId]').getRawValue();
                                            var hotelNode = centraltree.getRootNode().findChild('name', hotelName, true);
                                            if (!hotelNode.isExpanded()) {
                                                hotelNode.expand();
                                            }
                                        }
                                    }
                                },
                                {xtype: 'combo', fieldLabel: 'Время', name: 'timeId', store: 'Times'
                                    , displayField: 'name', valueField: 'id'
                                    , allowBlank: false, editable:false
                                    , afterLabelTextTpl: markFieldRequired,
                                    beforerender: function(me) {
                                        var timeId =  me.getValue();
                                        if (timeId != null) {
                                            me.getStore().proxy.extraParams.id = tourId;
                                            me.getStore().load();
                                        }
                                    },
                                }
                            ]
                        }]
                    },
                    {
                        title: 'Детальная информация',
                        xtype:'fieldset',
                        items: [{
                            layout: 'column', border:0, cls:'touronline-bg',
                            defaults:{columnWidth:.5, labelWidth: 160, padding: 5},
                            items:[
                                {xtype: 'combo', fieldLabel: 'Категория номера', name: 'roomCategory', store: 'EnumRoomCategory', allowBlank: false,
                                    displayField: 'name', valueField: 'id', editable: false, afterLabelTextTpl: markFieldRequired},
                                   {xtype: 'combo', fieldLabel: 'Питание', name: 'feeding', store: 'EnumFeeding', allowBlank: false,
                                    displayField: 'name', valueField: 'id', editable: false, afterLabelTextTpl: markFieldRequired},
                                {xtype: 'numberfield', fieldLabel: 'Кол-во туристов',name: 'numberTourist',
                                    maxValue: 6, minValue: 1, allowBlank: false, afterLabelTextTpl: markFieldRequired},
                                {xtype: 'numberfield', fieldLabel: 'Кол-во основных мест в номере',
                                    name: 'bedsInRoom', maxValue: 4, minValue: 1, allowBlank: false, afterLabelTextTpl: markFieldRequired},
                                {xtype: 'numberfield', fieldLabel: 'Кол-во дополнительных мест в номере',
                                    name: 'additionalBeds', maxValue: 2, minValue: 0},
                                {xtype: 'checkbox', fieldLabel: 'Дополн./кровать', name: 'additionalBed'}
                            ]
                        },
                        {
                            layout: 'column', border:0, cls:'touronline-bg',
                            defaults:{columnWidth:.3, labelWidth: 160, padding: 5},
                            items:[
                                   {xtype: 'checkbox', fieldLabel: 'Страховка от несчастного случая', name: 'insurance'},
                                   {xtype: 'checkbox', fieldLabel: 'Доп. Мед. страхование', name: 'addInsurance'},
                                   {xtype: 'checkbox', fieldLabel: 'Экскурсии', name: 'excursions', labelWidth: 80}
                            ]
                        },
                        {
                            layout: 'column', border:0, cls:'touronline-bg',
                            defaults:{columnWidth: '100%',labelWidth: 160,padding: 5},
                            items:[
                                   {xtype: 'textareafield', grow: true, fieldLabel: 'Дополнительные оплаченные услуги',
                                    name: 'individualServices', anchor: '100%'},
                                {xtype: 'textareafield', grow: true, name: 'note', fieldLabel: 'Примечание', anchor: '100%'},
                            ]
                        }]
                    },
                    {
                        title: 'Стоимость',
                        xtype:'fieldset',
                        items: [{
                            layout: 'column',border:0,cls:'touronline-bg',
                            defaults:{columnWidth:.3,labelWidth: 90, padding:5},
                            items:[
                               {xtype: 'numberfield', fieldLabel: 'Стоимость', name: 'coast', allowBlank: false, afterLabelTextTpl: markFieldRequired,
                                   listeners: {
                                           change: function(me) {
                                            fillFinalCoast(me);
                                        }
                                   }
                               },
                               {xtype: 'numberfield', fieldLabel: 'Коммисия',name: 'commission', allowBlank: false, afterLabelTextTpl: markFieldRequired,
                                   listeners: {
                                           change: function(me) {
                                               fillFinalCoast(me);
                                        }
                                   }
                               },
                               {xtype: 'numberfield', fieldLabel: 'К оплате',name: 'finalCoast', readOnly: true,
                                   allowBlank: false, afterLabelTextTpl: markFieldRequired},
                            ]
                        }]
                    }]
            }
        ]
    }],
    listeners: {
        beforerender: function(me) {
            if (me.action == 'edit') {
                me.down('combo[name=hotelId]').readOnly = true;
                me.down('combo[name=timeId]').readOnly  = true;
            }
        }
    }
});

function handleAddEditBR(btn) {
    var addParams = btn.up('form').getValues();
    var win = btn.up('window');

    var url = 'bookingRequest/addBookingRequest';
    if (win.action == 'edit') {
        url = 'bookingRequest/editBookingRequest';
    }

    Ext.Ajax.request({
        url : url,
        params : addParams,
        success : function(response, opts) {
            var resp = Ext.decode(response.responseText);
            if (resp.success == true) {
                var centraltree = Ext.ComponentQuery.query('#centraltree')[0];
                if (win.action == 'edit') {
                	console.log(addParams.origName);
                    var editedNode = centraltree.getRootNode().findChild('name', addParams.origName, true);
                    editedNode.data.name = addParams.name;
                } else {
                    var hotelName = win.down('combo[name=hotelId]').getRawValue();
                    var timeName  = win.down('combo[name=timeId]').getRawValue();
                    var hotelNode = centraltree.getRootNode().findChild('name', hotelName, true);
                    var timeNode  = hotelNode.findChild('name', timeName, true);
                    if (timeNode.isExpanded()) {
                        hotelNode.appendChild({
                            name  : addParams.name,
                            icon  : 'images/document.png',
                            type  : 'BR',
                            nodeId: resp.nodeId
                        });
                    } else {
                        timeNode.expand();
                    }
                }
                centraltree.getView().refresh(); 
                win.close();
            } else {
                Ext.Msg.alert(resp.message);
            }
        }
    });
}

function fillFinalCoast(me) {
    var form = me.up('form');
    var coastValue      = form.down('numberfield[name=coast]').getValue();
    var commissionValue = form.down('numberfield[name=commission]').getValue();
    
    if (coastValue != null || commissionValue != null) {
        var finalCoastValue = coastValue + commissionValue;
        form.down('numberfield[name=finalCoast]').setValue(finalCoastValue);
    }
}