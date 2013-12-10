package com.touronline

class TimeInterval {

	Date startDate
	Date endDate
	String period

    static constraints = {
		startDate nullable:false
		endDate   nullable:false
		period    nullable:false
    }
	
	static hasMany = [bookingRequests: BookingRequest]
	static belongsTo = [hotel: Hotel]

	String getPeriodValue() {
		return startDate.toString() + "-" + endDate.toString()
	} 
}
