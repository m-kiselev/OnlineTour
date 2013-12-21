package com.touronline

class BookingRequestService {

	def getList(params) {
		def ti     = TimeInterval.get(params.get("id"))
		def result = BookingRequest.findAllByTimeInterval(ti)

		return result.collect {[
			nodeId : it.id,
			name   : it.name,
			iconCls: 'document-icon',
			type   : 'BR',
			leaf   : true
		]}
	}

	def getInfo(params) {
		BookingRequest br = BookingRequest.get(params.get("id"))
		return [
			'success'  : true,
			id         : br.id,
			name       : br.name,
		]
	}

	def setParameters(BookingRequest br, params) {
//		tour.name = params.name
//		tour.priority = TourPriority.fromString(params.priority)
//		tour.description = params.description
	}

	def addBookingRequest(params) {
		BookingRequest br = new BookingRequest()
		setParameters(br, params)

		def msg
		try {
			if (!br.save()){
				msg = ['success': false, 'message': 'Заяка не сохранена!'];
			} else {
				msg = ['success': true];
			}
		} catch (Exception e) {
			msg = ['success': false, 'message': 'Error: ' + e.message]
		} finally {
			return msg;
		}
	}

	def editBookingRequest(params) {
		BookingRequest br = BookingRequest.get(params.get("id"))
		setParameters(br, params)
		def msg
		try {
			if (!br.save()){
				msg = ['success': false, 'message': 'Заяка не сохранена!'];
			} else {
				msg = ['success': true];
			}
		} catch (Exception e) {
			msg = ['success': false, 'message': 'Error: ' + e.message]
		} finally {
			return msg;
		}
	}

	def delete(params) {
		BookingRequest br = BookingRequest.get(params.get("id"));
		def msg
		try {
			if (br.delete()){
				msg = ['success': false, 'message': 'Заяка не удалена!'];
			} else {
				msg = ['success': true];
			}
		} catch (Exception e) {
			msg = ['success': false, 'message': 'Error: ' + e.message]
		} finally {
			return msg;
		}
	}
}
