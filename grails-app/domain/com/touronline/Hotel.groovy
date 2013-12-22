package com.touronline

class Hotel {

	String name
	String description

	static constraints = {
		name nullable: false, blank: false, unique: ['tour']
		description nullable: true
    }

	static hasMany = [timeIntervals: TimeInterval]
	static belongsTo = [tour: Tour]
}
