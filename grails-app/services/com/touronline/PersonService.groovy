package com.touronline

import java.text.SimpleDateFormat

import com.sun.mail.imap.protocol.Item;

class PersonService {

	def getList(params) {
		def br     = BookingRequest.get(params.get("brId"))
		def result = Person.findAllByBookingRequest(br)
		
		return result.collect {[
			id     :  it.id,
			fio    :  it.fio,
			birthDate   :  it.birthDate,
			passportData:  it.passportData,
			phone  :  it.phone,
			email  :  it.email,
			brId   :  it.bookingRequest.id,
			type   : 'person'
		]}
	}
//
//	def getInfo(params) {
//		Hotel hotel = Hotel.get(params.get("id"))
//		return [
//			'success'  : true,
//			nodeId     : hotel.id,
//			origName   : hotel.name,
//			name       : hotel.name,
//			description: hotel.description
//		]
//	}

	def setParameters(Person person, params) {
		println "person setParameters: " + params
		person.fio = params.fio
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy")
		person.birthDate = sdf.parse(params.birthDate)
		person.passportData = params.passportData
		person.phone = params.phone
		person.email = params.email
		person.bookingRequest = BookingRequest.findById(params.brId)
	}

	def addPerson(params) {
		Person person = new Person()
		setParameters(person, params)

		def msg
		try {
			if (!person.save()){
				msg = ['success': false, 'message': 'Турист не сохранен!'];
			} else {
				msg = ['success': true, nodeId: person.id];
			}
		} catch (Exception e) {
			msg = ['success': false, 'message': 'Error: ' + e.message]
		} finally {
			return msg;
		}
	}

	def editPerson(params) {
		Person person = Person.get(params.get("id"))
		setParameters(person, params)
		def msg
		try {
			if (!person.save()){
				msg = ['success': false, 'message': 'Турист не сохранен!'];
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
		Person person = Person.get(params.get("id"))
		def msg
		try {
			if (person.delete()){
				msg = ['success': false, 'message': 'Турист не удален!'];
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
