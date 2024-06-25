import ApiSender from "./config/index.js";

class PeopleAPI {
	getFamilyTree() {
		const url = "/people/family-tree";
		return ApiSender.get(url);
	}

	getAllPeople(query) {
		const url = "/people/get-all-people";
		return ApiSender.get(url, query);
	}

	updatePerson(id, data) {
		const url = `/people/update-person/${id}`;
		return ApiSender.put(url, data);
	}

	deletePerson(id) {
		const url = `/people/delete-person/${id}`;
		return ApiSender.delete(url);
	}

	createPerson(data) {
		const url = `/people/create-person`;
		return ApiSender.post(url, data);
	}

	getAllFather() {
		const url = `/people/get-all-father`;
		return ApiSender.get(url);
	}

	getOnePerson(id) {
		const url = `/people/get-one-person/${id}`;
		return ApiSender.get(url);
	}
}

export default new PeopleAPI();
