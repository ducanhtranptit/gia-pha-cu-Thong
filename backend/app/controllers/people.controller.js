const PeopleActions = require("../actions/people.actions");
class PeopleController {
	async hellWorld(req, res) {
		res.send("This is human");
	}

	async getAllPeople(req, res) {
		try {
			const people = await PeopleActions.getAllPeopleOfFamilyTree();
			return res.status(200).json({
				status: "success",
				data: people,
			});
		} catch (error) {
			console.log(error.message);
			return res.status(500).json({
				status: "Error",
				message: "Internal Server Error",
			});
		}
	}

	async getAllMalePeopleByFilter(req, res) {
		try {
			const filters = req.body;
			const malePeople = await PeopleActions.getAllMalePeople(filters);
			return res.status(200).json({
				status: "success",
				data: malePeople,
			});
		} catch (error) {
			console.log(error.message);
			return res.status(500).json({
				status: "Error",
				message: "Internal Server Error",
			});
		}
	}
}
module.exports = new PeopleController();
