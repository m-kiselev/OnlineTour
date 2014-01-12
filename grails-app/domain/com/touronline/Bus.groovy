package com.touronline

import java.util.Set;

class Bus {
//		Set<String> defaultSeats =  new HashSet<String>()
//		Set<String> busySeats =  new HashSet<String>()
		
		def Bus() {
			this.defaultSeats = ["A","B", "C", "D",
				"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
				"13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24",
				"25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36",
				"37", "38", "39", "40", "41"]
		}
		static hasMany = [defaultSeats:String, busySeats: String]
		
		static constraints = {
		}

		public Set<String> getAvailableSeats() {
			Set<String> result = new HashSet<String>();
			for(String i : defaultSeats) {
				if(!busySeats.contains(i)) {
					result.add(i);
				}
			}
			return result;
		}
		
		public void updateSeats(Set<String> oldSeats, Set<String> newSeats) {
			println oldSeats
			println newSeats
			println busySeats
			if (oldSeats != null && busySeats != null) {
				busySeats.removeAll(oldSeats)
			}
			busySeats.addAll(newSeats)
		}
}
