const { Sequelize } = require("sequelize");
const model = require("../models/index");
const People = model.People;
class PeopleActions {
	static buildSearchConditions(filters) {
		const conditions = {};
		conditions.fatherId = {
			[Sequelize.Op.not]: null
		};
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

	static async transformArrayToJson(people) {
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
		const rootPerson = people.find((item) => item.note === "rootPerson");
		if (!rootPerson) {
			return null;
		}
		return buildFamilyTree(rootPerson.id, people);
	}

	async getAllPeopleOfFamilyTree() {
		const people = await People.findAll();
		const familyTree = await PeopleActions.transformArrayToJson(people);
		return familyTree;
	}

	async getAllPeople(filters) {
		const conditions = PeopleActions.buildSearchConditions(filters);
		const malePeople = await People.findAll({
			where: conditions,
			attributes: ["id", "name"],
		});
		return malePeople;
	}

	async createPersonAndTheirSpouse(person, spouse) {
        const newPerson = await People.create(person);
        if (spouse) {
            spouse.spouseId = newPerson.id;
            const newSpouse = await People.create(spouse);
            await People.update({ spouseId: newSpouse.id }, { where: { name: newPerson.name } });
        }
    }
}

module.exports = new PeopleActions();
