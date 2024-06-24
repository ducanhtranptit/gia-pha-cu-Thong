const { Sequelize, where } = require("sequelize");
const { Op } = require("sequelize");
const model = require("../models/index");
const People = model.People;
class PeopleActions {
	static buildSearchConditions(filters) {
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
		conditions.fatherId = { [Sequelize.Op.not]: null };
		const malePeople = await People.findAll({
			where: conditions,
			attributes: ["id", "name"],
		});
		return malePeople;
	}
	async getAllPeopleOfManagerByFilters(filters) {
        const conditions = PeopleActions.buildSearchConditions(filters);
        console.log(conditions);
		const people = await People.findAll({
			where: conditions,
		});
        console.log(people.length   );
		return people;
	}
	async getAllFather() {
		const fathers = await People.findAll({
			where: {
				[Op.and]: [{ name: { [Op.like]: "Trần%" } }, { gender: "male" }],
			},
		});
		return fathers;
	}
	async deletePerson(id) {
        console.log('9999999999');
		const person = await People.findByPk(id);

		if (person.note === "rootPerson") {
			throw new Error("Person with note 'rootPerson' cannot be deleted.");
		}

		const spouse = await People.findByPk(person.spouseId);

		const childrenByFather = await People.findAll({
			where: { fatherId: person.id },
		});
		for (const child of childrenByFather) {
			const childSpouse = await People.findByPk(child.spouseId);
			if (childSpouse) {
				await childSpouse.destroy();
			}
			await child.destroy();
		}

		if (spouse) {
			const childrenBySpouse = await People.findAll({
				where: { fatherId: spouse.id },
			});
			for (const child of childrenBySpouse) {
				const childSpouse = await People.findByPk(child.spouseId);
				if (childSpouse) {
					await childSpouse.destroy();
				}
				await child.destroy();
			}
			await spouse.destroy();
		}

		await person.destroy();
	}

	async updateDataPerson(id, dataPerson) {
		console.log(dataPerson);
		const person = await People.findByPk(id);
		if (person) {
			const personUpdate = await person.update(dataPerson);
			return personUpdate;
		}
		return null;
	}
	async createPersonAndTheirSpouse(person, spouse) {
		const newPerson = await People.create(person);
		if (spouse) {
			spouse.spouseId = newPerson.id;
			const newSpouse = await People.create(spouse);
			await People.update({ spouseId: newSpouse.id }, { where: { name: newPerson.name } });
		}
	}

	async findOneForProfilePage(filters) {
		const conditions = PeopleActions.buildSearchConditions(filters);
		const person = await People.findOne({ where: conditions });
		const spouse = await People.findOne({
			where: { spouseId: person.id },
			attributes: ["name"],
		});
		const father = await People.findOne({
			where: { id: person.fatherId },
			attributes: ["name"],
		});
		let children = await People.findAll({
			where: { fatherId: person.id },
			attributes: ["name"],
		});
		if (children.length === 0 && person.spouseId !== null) {
			children = await People.findAll({
				where: { fatherId: person.spouseId },
				attributes: ["name"],
			});
		}
		const result = {
			person: person,
			father: father,
			spouse: spouse,
			children: children,
		};
		return result;
	}
}

module.exports = new PeopleActions();
