package com.touronline

class TimeIntervalService {

	def getList(params) {
		def result
		if (params.pattern) {
			def persentPatterns = "%" + params.pattern + "%"
			result = TimeInterval.findAllByNameIlike(persentPatterns)
		} else {
			result = TimeInterval.findAll()
		}

		return result.collect {[
			id:       it.id,
			name:     it.name
		]}
	}

	def getInfo(params) {
		TimeInterval ti = TimeInterval.get(params.get("id"))
		return [
			'success'  : true,
			id         : ti.id,
			name       : ti.name
		]
	}

	def setParameters(TimeInterval ti, params) {
		ti.startDate = params.startDate
		ti.endDate   = params.endDate
		ti.name      = TimeInterval.buildName(params.startDate, params.endDate)
	}

	def addTimeInterval(params) {
		TimeInterval ti = new TimeInterval()
		setParameters(ti, params)

		def msg
		try {
			if (!ti.save()){
				msg = ['success': false, 'message': 'Временной интервал не сохранен!'];
			} else {
				msg = ['success': true];
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
				msg = ['success': true];
			}
		} catch (Exception e) {
			msg = ['success': false, 'message': 'Error: ' + e.message]
		} finally {
			return msg;
		}
	}

	def deleteTimeInterval(params) {
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
