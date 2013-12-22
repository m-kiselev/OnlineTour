package com.touronline;

public enum RoomCategory {
	ROOM_WITOUT_AMENITIES("ROOM_WITOUT_AMENITIES"),
	ROOM_FLOОR_AMENITIES("ROOM_FLOОR_AMENITIES"),
	ROOM_BLOCK_AMENITIES("ROOM_BLOCK_AMENITIES"),
	ROOM_AMENITIES("ROOM_AMENITIES"),
	JUNIOR_LUXE("JUNIOR_LUXE"),
	LUXE("LUXE")
	
	final String value
	RoomCategory(String value) { this.value = value }
	String toString() { value }
	
	static RoomCategory fromString( type ) {
		RoomCategory.values().find { it.value == type }
	}
}
