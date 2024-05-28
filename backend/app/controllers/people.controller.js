const PeopleActions = require("../actions/people.actions");
const { SuccessResponse, ErrorResponse } = require("../core/ApiResponse.js");

class PeopleController {
	async getAllPeople(req, res) {
		try {
			const people = await PeopleActions.getAllPeopleOfFamilyTree();
			return new SuccessResponse().send(req, res, people);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}

	async getAllMalePeopleByFilter(req, res) {
		try {
			const filters = req.query;
			const malePeople = await PeopleActions.getAllPeople(filters);
			return new SuccessResponse().send(req, res, malePeople);
		} catch (error) {
			console.error(error.message);
			return new ErrorResponse().send(req, res);
		}
	}

	async createPerson(req, res) {
		try {
			const { person, spouse } = req.body;
			return new SuccessResponse().send(req, res);
		} catch (error) {
			console.error(error.message);
			return new ErrorResponse().send(req, res);
		}
	}

	async getPersonDetails(req, res) {
		try {
            const filters = req.query
            const person = await PeopleActions.findOneForProfilePage(filters)
            return new SuccessResponse().send(req, res, person);
		} catch (error) {
			console.error(error.message);
			return new ErrorResponse().send(req, res);
		}
	}
}

module.exports = new PeopleController();
