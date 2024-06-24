import ApiSender from "./config/index.js";

class PeopleAPI {
	getFamilyTree() {
		const url = "/people/family-tree";
		return ApiSender.get(url);
	}

	getAllPeople(query) {
		console.log(query);
		const url = "/people/get-all-people";
		return ApiSender.get(url, query);
	}

	updatePerson(id, data) {
		console.log("999999999");
		const url = `/people/update-person/${id}`;
		return ApiSender.put(url, data);
	}

	deletePerson(id) {
		const url = `/people/delete-person/${id}`;
		return ApiSender.delete(url);
	}
}

export default new PeopleAPI();
