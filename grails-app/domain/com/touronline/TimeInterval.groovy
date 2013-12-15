package com.touronline

class TimeInterval {

	Date startDate
	Date endDate
	String name

    static constraints = {
		startDate nullable:false
		endDate   nullable:false
		name      nullable:false, unique: true
    }
	
//	public TimeInterval() {}
//
//	public TimeInterval(Date startDate, Date endDate, Hotel hotel) {
//		this.startDate = startDate
//		this.endDate = endDate
////		this.name = startDate.toString() + "-" + endDate.toString()
//		this.hotel = hotel
//	}

	static hasMany = [bookingRequests: BookingRequest]
	static belongsTo = [hotel: Hotel]
	
	static String buildName(Date date1, Date date2) {
		return date1.toString() + "-" + date2.toString()
	}
}
