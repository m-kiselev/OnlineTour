package com.touronline

class BookingRequestService {

	def getList(params) {
		def ti     = TimeInterval.get(params.get("id"))
		def result = BookingRequest.findAllByTimeInterval(ti)
		
		if (params.userName) {
			result.removeAll { it.requestCreator != User.findByUsername(params.userName) }
		}

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
			'success'     : true,
			nodeId        : br.id,
			dateCreated   : br.dateCreated,
			name          : br.name,
			origName      : br.name,
			sity          : br.sity,
			// user info
			userName      : br.requestCreator.username,
			agencyName    : br.requestCreator.userInfo.realCompanyName,
			phone         : br.requestCreator.userInfo.phone,
			personName    : br.requestCreator.userInfo.personName,
			email         : br.requestCreator.userInfo.email,

			// tour onfo
			hotelId       : br.timeInterval.hotel.id,
			timeId        : br.timeInterval.id,
			
			// details info
			roomCategory      : br.roomCategory.getValue(),
			feeding           : br.feeding.getValue(),
			numberTourist     : br.numberTourist,
			bedsInRoom        : br.bedsInRoom,
			additionalBeds    : br.additionalBeds,
			additionalBed     : br.additionalBed,
			excursions        : br.excursions,
			insurance         : br.insurance,
			addInsurance      : br.addInsurance,
			individualServices: br.individualServices,
			note              : br.note,
			
			// coast
			coast     : br.coast,
			commission: br.commission,
			finalCoast: br.finalCoast
		]
	}

	def setParameters(BookingRequest br, params) {
		println "setParameters: " + params

		// common
		br.name           = params.name
		br.sity           = params.sity
		br.requestCreator = User.findByUsername(params.userName)

		// tour
		br.timeInterval  = TimeInterval.findById(params.timeId)

		// details info
		br.roomCategory       = RoomCategory.fromString(params.roomCategory)
		br.feeding            = Feeding.fromString(params.feeding)
		br.numberTourist      = params.numberTourist  as Integer
		br.bedsInRoom         = params.bedsInRoom     as Integer
		br.additionalBeds     = params.additionalBeds ? params.additionalBeds as Integer : 0
		br.additionalBed      = params.additionalBed == 'on' ? true : false
		br.excursions         = params.excursions    == 'on' ? true : false
		br.insurance          = params.insurance     == 'on' ? true : false
		br.addInsurance       = params.addInsurance  == 'on' ? true : false
		br.individualServices = params.individualServices ? params.individualServices : ''
		br.note               = params.note ? params.note : ''

		// coast
		br.coast              = params.coast      as Integer
		br.commission         = params.commission as Integer
		br.finalCoast         = params.finalCoast as Integer
	}

	def addBookingRequest(params) {
		BookingRequest br = new BookingRequest()
		setParameters(br, params)

		def msg
		try {
			if (!br.save()){
				msg = ['success': false, 'message': 'Заяка не сохранена!'];
			} else {
				msg = ['success': true, id: br.id];
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
				msg = ['success': true, id: br.id];
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
