const { Sequelize } = require("sequelize");
const model = require("../models/index");
const People = model.People;
class PeopleActions {
	buildSearchConditions(filters) {
		const conditions = {};
		if (filters.name) {
			conditions.name = {
				[Sequelize.Op.like]: `%${filters.name}%`,
			};
		}
		if (filters.gender) {
			conditions.gender = filters.gender;
		}
		if (filters.yearBorn) {
			conditions.yearBorn = filters.yearBorn;
		}
		if (filters.spouseId) {
			conditions.spouseId = filters.spouseId;
		}
		if (filters.fatherId) {
			conditions.fatherId = filters.fatherId;
		}
		return conditions;
	}

	async transformArrayToJson(people) {
		const buildFamilyTree = (personId) => {
			const person = people.find((item) => item.id === personId);
			const children = people.filter((item) => item.fatherId === personId);
			const result = {
				name: person.name,
				spouse: person.spouseId ? people.find((item) => item.id === person.spouseId).name : null,
				children: [],
			};
			children.forEach((child) => {
				result.children.push(buildFamilyTree(child.id));
			});
			return result;
		};
		const rootPerson = people.find((item) => !item.fatherId);
		if (!rootPerson) {
			return null;
		}
		return buildFamilyTree(rootPerson.id);
	}

	async getAllPeopleOfFamilyTree() {
		const people = await People.findAll();
		const familyTree = await this.transformArrayToJson(people);
		return familyTree;
	}

	async getAllMalePeople(filters) {
		try {
			const conditions = this.buildSearchConditions(filters);
			conditions.gender = "male";
			const fathers = await People.findAll({
				where: conditions,
				attributes: ["id", "name"],
			});
			return fathers;
		} catch (error) {
			console.error("Error fetching male people:", error);
			throw error;
		}
	}
}

module.exports = new PeopleActions();
