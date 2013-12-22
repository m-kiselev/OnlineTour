package com.touronline;

public enum Feeding {
	NO_FOOD("NO_FOOD"),
	BREAKFAST("BREAKFAST"),
	BREAKFAST_DINNER("BREAKFAST_DINNER"),
	BREAKFAST_LUNCH("BREAKFAST_LUNCH"),
	LUNCH_DINNER("LUNCH_DINNER"),
	THREE_X("THREE_X"),
	FOUR_X("FOUR_X"),
	BUFFET_BREAKFAST("BUFFET_BREAKFAST")
	
	final String value
	Feeding(String value) { this.value = value }
	String toString() { value }
	
	static Feeding fromString( type ) {
		Feeding.values().find { it.value == type }
	}
}
