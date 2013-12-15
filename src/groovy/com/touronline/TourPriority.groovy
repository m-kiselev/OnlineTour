/**
 * 
 */
package com.touronline;

public enum TourPriority {
	HIGH("HIGH"),
	NORMAL("NORMAL"),
	LOW("LOW")
	
	final String value
	TourPriority(String value) { this.value = value }
	String toString() { value }
	
	static TourPriority fromString( type ) {
		TourPriority.values().find { it.value == type }
	}

}

