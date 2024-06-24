import ApiSender from "./config/index.js";

class PeopleAPI {
	getAllPeopleForFamilyTree() {
		const url = `/people/family-tree`;
		return ApiSender.get(url);
	}

    getPeopleByFilter(query) {
        const url = `/people`
        return ApiSender.get(url, query)
    }

    getPersonInfo(query) {
        const url = `/people/person-details?name=${query}`;
        return ApiSender.get(url)
    }
}

export default new PeopleAPI();
