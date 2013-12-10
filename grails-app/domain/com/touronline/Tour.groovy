package com.touronline

class Tour {

	String name
	String description
	TourPriority priority

    static constraints = {
		name blank: false, unique: true
		description nullable: true
		priority nullable: false
    }
	
	static hasMany = [hotels: Hotel]
}
