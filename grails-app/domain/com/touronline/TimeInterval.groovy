package com.touronline

import java.text.SimpleDateFormat

class TimeInterval {

	Date startDate
	Date endDate
	String name
	Bus bus

    static constraints = {
		startDate nullable:false
		endDate   nullable:false
		name      nullable:false, unique: ['hotel']
    }
	
	static hasMany = [bookingRequests: BookingRequest]
	static belongsTo = [hotel: Hotel]
	
	static String buildName(Date date1, Date date2) {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/M/yyyy");
		return sdf.format(date1) + "-" + sdf.format(date2)
	}
}
