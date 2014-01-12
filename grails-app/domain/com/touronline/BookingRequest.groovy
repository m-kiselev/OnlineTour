package com.touronline

class BookingRequest {

	String name
	Date dateCreated
	String sity

	Long numberTourist
	
	// Number of beds in the room
	Long bedsInRoom
	Long additionalBeds
	boolean additionalBed
	RoomCategory roomCategory
	Feeding feeding
	
	String excursions
	String individualServices
	boolean insurance
	boolean addInsurance

	String note

	Integer coast
	Integer commission
	Integer finalCoast
	
	User requestCreator

	static hasMany = [persons: Person, busSeats: String]
	static belongsTo = [timeInterval: TimeInterval]

    static constraints = {
		name unique:['timeInterval'], nullable: false
		sity       nullable: true

		numberTourist  nullable: false
		bedsInRoom     nullable: false
		additionalBeds nullable: true
		additionalBed  nullable: true
		roomCategory   nullable: false
		feeding        nullable: false
		
		excursions         nullable: true
		individualServices nullable: true
		insurance          nullable: true
		addInsurance       nullable: true
		
		note nullable: true
		
		coast      nullable: false
		commission nullable: false
		finalCoast nullable: false
		
		requestCreator nullable: false
    }
}
