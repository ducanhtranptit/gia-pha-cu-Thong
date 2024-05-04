class PeopleController {
	async hellWorld(req, res) {
		res.send("This is human");
	}
}
module.exports = new PeopleController();
