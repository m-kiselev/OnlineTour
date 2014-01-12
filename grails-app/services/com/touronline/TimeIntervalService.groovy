package com.touronline

import java.text.SimpleDateFormat

class TimeIntervalService {

	def getList(params) {
		def hotel = Hotel.get(params.get("id"))
		def result = TimeInterval.findAllByHotel(hotel)

		return result.collect {[
			nodeId :  it.id,
			name   :  it.name,
			iconCls: 'times-icon',
			type   : 'TI'
		]}
	}

	def getInfo(params) {
		TimeInterval ti = TimeInterval.get(params.get("id"))
		return [
			'success'  : true,
			nodeId     : ti.id,
			hotelId    : ti.hotel.id,
			name       : ti.name,
			origName   : ti.name,
			startDate  : ti.startDate,
			endDate    : ti.endDate
		]
	}

	def getAvailableSeats(params) {
		TimeInterval ti = TimeInterval.get(params.get("tiId"))
		return ti.bus.getAvailableSeats().sort().collect() {[
			name: it
		]}
	}

	def setParameters(TimeInterval ti, params) {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy")
		ti.startDate = sdf.parse(params.startDate)
		ti.endDate   = sdf.parse(params.endDate)
		ti.name      = TimeInterval.buildName(sdf.parse(params.startDate), sdf.parse(params.endDate))
		ti.hotel     = Hotel.findById(params.hotelId)
	}

	def addTimeInterval(params) {
		TimeInterval ti = new TimeInterval()
		setParameters(ti, params)

		def msg
		try {
			if (!ti.save()){
				msg = ['success': false, 'message': 'Временной интервал не сохранен!'];
			} else {
				msg = ['success': true, nodeId: ti.id];
			}
		} catch (Exception e) {
			msg = ['success': false, 'message': 'Error: ' + e.message]
		} finally {
			return msg;
		}
	}

	def editTimeInterval(params) {
		TimeInterval ti = TimeInterval.get(params.get("id"))
		setParameters(ti, params)
		def msg
		try {
			if (!ti.save()){
				msg = ['success': false, 'message': 'Временной интервал не сохранен!'];
			} else {
				msg = ['success': true, name: ti.name];
			}
		} catch (Exception e) {
			msg = ['success': false, 'message': 'Error: ' + e.message]
		} finally {
			return msg;
		}
	}

	def delete(params) {
		TimeInterval ti = TimeInterval.get(params.get("id"));
		def msg
		try {
			if (ti.delete()){
				msg = ['success': false, 'message': 'Временной интервал не удален!'];
			} else {
				msg = ['success': true];
			}
		} catch (Exception e) {
			msg = ['success': false, 'message': 'Error: ' + e.message]
		} finally {
			return msg;
		}
	}
}
