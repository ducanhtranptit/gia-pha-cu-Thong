const PeopleActions = require("../actions/people.actions");
class PeopleController {
	async getAllPeople(req, res) {
		try {
			const people = await PeopleActions.getAllPeopleOfFamilyTree();
			return res.status(200).json({
				status: "success",
				data: people,
			});
		} catch (error) {
			console.error(error);
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
			console.error(error.message);
			return res.status(500).json({
				status: "Error",
				message: "Internal Server Error",
			});
		}
	}

	async createPerson(req, res) {
        try {
            const { person, spouse } = req.body;
            console.log(person, spouse);
            return res.status(200).json({
                status: "success",
                message: "Person created successfully",
            });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                status: "Error",
                message: "Internal Server Error",
            });
        }
    }
}
module.exports = new PeopleController();
