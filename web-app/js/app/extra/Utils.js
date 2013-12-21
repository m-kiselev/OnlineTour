/* Contains all utils functions */
function priorityRenderer(value) {
	if (value != null) {
		if (value.name == 'HIGH')   return 'Высокий';
		if (value.name == 'NORMAL') return 'Средний';
		if (value.name == 'LOW')    return 'Низкий';
	}
}

function getTourId() {
	return Ext.ComponentQuery.query('#tourbrowser')[0].selectedTourId;
}