package com.touronline

class Person {
	String fio
	Date birthDate
	String passportData
	String phone
	String email

	static belongsTo = [bookingRequest: BookingRequest]

    static constraints = {
		 fio nullable: false, blank: false
		 birthDate    nullable: false, blank: false
		 passportData nullable: false, blank: false
		 email email:true
    }
}
