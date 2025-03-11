import { relations } from "drizzle-orm/relations";
import { person, client, contract, engineer, location, project, employee, employeedesignation, role, requirements, document } from "./schema";

export const clientRelations = relations(client, ({one, many}) => ({
	person: one(person, {
		fields: [client.personId],
		references: [person.id]
	}),
	contracts: many(contract),
}));

export const personRelations = relations(person, ({one, many}) => ({
	clients: many(client),
	employees: many(employee),
	engineers: many(engineer),
	location: one(location, {
		fields: [person.locationId],
		references: [location.id]
	}),
}));

export const contractRelations = relations(contract, ({one, many}) => ({
	client: one(client, {
		fields: [contract.clientId],
		references: [client.id]
	}),
	engineer: one(engineer, {
		fields: [contract.engineerId],
		references: [engineer.id]
	}),
	location: one(location, {
		fields: [contract.locationId],
		references: [location.id]
	}),
	project: one(project, {
		fields: [contract.projectId],
		references: [project.id]
	}),
	employeedesignations: many(employeedesignation),
	requirements: many(requirements),
}));

export const engineerRelations = relations(engineer, ({one, many}) => ({
	contracts: many(contract),
	person: one(person, {
		fields: [engineer.personId],
		references: [person.id]
	}),
}));

export const locationRelations = relations(location, ({many}) => ({
	contracts: many(contract),
	people: many(person),
}));

export const projectRelations = relations(project, ({many}) => ({
	contracts: many(contract),
}));

export const employeeRelations = relations(employee, ({one, many}) => ({
	person: one(person, {
		fields: [employee.personId],
		references: [person.id]
	}),
	employeedesignations: many(employeedesignation),
}));

export const employeedesignationRelations = relations(employeedesignation, ({one}) => ({
	contract: one(contract, {
		fields: [employeedesignation.contractId],
		references: [contract.id]
	}),
	employee: one(employee, {
		fields: [employeedesignation.employeeId],
		references: [employee.id]
	}),
	role: one(role, {
		fields: [employeedesignation.roleId],
		references: [role.id]
	}),
}));

export const roleRelations = relations(role, ({many}) => ({
	employeedesignations: many(employeedesignation),
}));

export const requirementsRelations = relations(requirements, ({one}) => ({
	contract: one(contract, {
		fields: [requirements.contractId],
		references: [contract.id]
	}),
	document: one(document, {
		fields: [requirements.documentId],
		references: [document.id]
	}),
}));

export const documentRelations = relations(document, ({many}) => ({
	requirements: many(requirements),
}));