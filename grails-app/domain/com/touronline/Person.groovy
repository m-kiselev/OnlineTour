package com.touronline

class Person {
	String FIO
	Date birthDate
	String passportData
	String phone
	String email

	static belongsTo = [bookingRequest: BookingRequest]

    static constraints = {
		// TODO: need to add
    }
}
