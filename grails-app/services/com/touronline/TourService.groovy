package com.touronline

class TourService {

	def getList(params) {
		def result
		if (params.pattern) {
			def persentPatterns = "%" + params.pattern + "%"
			result = Tour.findAllByNameIlike(persentPatterns)
		} else {
			result = Tour.findAll()
		}

		return result.collect {[
			id:       it.id,
			name:     it.name,
			priority: it.priority
		]}
	}

	def getInfo(params) {
		Tour tour = Tour.get(params.get("id"))
		return [
			'success'  : true,
			id         : tour.id,
			name       : tour.name,
			priority   : tour.priority,
			description: tour.description
		]
	}

	def setParameters(Tour tour, params) {
		tour.name = params.name
		tour.priority = TourPriority.fromString(params.priority)
		tour.description = params.description
	}

	def addTour(params) {
		Tour tour = new Tour()
		setParameters(tour, params)

		def msg
		try {
			if (!tour.save()){
				msg = ['success': false, 'message': 'Тур не сохранен!'];
			} else {
				msg = ['success': true];
			}
		} catch (Exception e) {
			msg = ['success': false, 'message': 'Error: ' + e.message]
		} finally {
			return msg;
		}
	}

	def editTour(params) {
		println params
		Tour tour = Tour.get(params.get("id"))
		setParameters(tour, params)
		def msg
		try {
			if (!tour.save()){
				msg = ['success': false, 'message': 'Тур не сохранен!'];
			} else {
				msg = ['success': true];
			}
		} catch (Exception e) {
			msg = ['success': false, 'message': 'Error: ' + e.message]
		} finally {
			return msg;
		}
	}

	def deleteTour(params) {
		Tour tour = Tour.get(params.get("id"));
		def msg
		try {
			if (tour.delete()){
				msg = ['success': false, 'message': 'Тур не удален!'];
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
