package com.touronline

class HotelService {

	def getList(params) {
		def result
		if (params.pattern) {
			def persentPatterns = "%" + params.pattern + "%"
			result = Hotel.findAllByNameIlike(persentPatterns)
		} else {
			result = Hotel.findAll()
		}

		return result.collect {[
			id:       it.id,
			name:     it.name,
			priority: it.priority
		]}
	}

	def getInfo(params) {
		Hotel hotel = Hotel.get(params.get("id"))
		return [
			'success'  : true,
			id         : hotel.id,
			name       : hotel.name,
			description: hotel.description
		]
	}

	def setParameters(Hotel hotel, params) {
		hotel.name = params.name
		hotel.description = params.description
	}

	def addHotel(params) {
		Hotel hotel = new Hotel()
		setParameters(hotel, params)

		def msg
		try {
			if (!hotel.save()){
				msg = ['success': false, 'message': 'Отель не сохранен!'];
			} else {
				msg = ['success': true];
			}
		} catch (Exception e) {
			msg = ['success': false, 'message': 'Error: ' + e.message]
		} finally {
			return msg;
		}
	}

	def editHotel(params) {
		Hotel hotel = Hotel.get(params.get("id"))
		setParameters(hotel, params)
		def msg
		try {
			if (!hotel.save()){
				msg = ['success': false, 'message': 'Отель не сохранен!'];
			} else {
				msg = ['success': true];
			}
		} catch (Exception e) {
			msg = ['success': false, 'message': 'Error: ' + e.message]
		} finally {
			return msg;
		}
	}

	def deleteHotel(params) {
		Hotel hotel = Hotel.get(params.get("id"));
		def msg
		try {
			if (hotel.delete()){
				msg = ['success': false, 'message': 'Отель не удален!'];
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
