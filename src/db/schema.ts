import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, int, decimal, date, varchar, text, varbinary, unique } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const client = mysqlTable("Client", {
	id: int().autoincrement().notNull(),
	personId: int("person_id").notNull().references(() => person.id, { onDelete: "restrict", onUpdate: "restrict" } ),
},
(table) => [
	index("index_1").on(table.id),
]);

export const contract = mysqlTable("Contract", {
	id: int().autoincrement().notNull(),
	projectId: int("project_id").notNull().references(() => project.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	clientId: int("client_id").notNull().references(() => client.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	locationId: int("location_id").notNull().references(() => location.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	engineerId: int("engineer_id").notNull().references(() => engineer.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	contractAmount: decimal("contract_amount").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date({ mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateStart: date("date_start", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateEnd: date("date_end", { mode: 'string' }).default('NULL'),
	remarks: varchar({ length: 500 }).notNull(),
	status: varchar({ length: 500 }).notNull(),
});

export const document = mysqlTable("Document", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 500 }).notNull(),
	description: text().default('NULL'),
},
(table) => [
	index("index_1").on(table.id),
]);

export const employee = mysqlTable("Employee", {
	id: int().autoincrement().notNull(),
	personId: int("person_id").notNull().references(() => person.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	status: text().default('NULL'),
	skills: text().default('NULL'),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateContracted: date("date_contracted", { mode: 'string' }).notNull(),
},
(table) => [
	index("index_1").on(table.id),
]);

export const employeeDesignation = mysqlTable("EmployeeDesignation", {
	id: int().autoincrement().notNull(),
	contractId: int("contract_id").notNull().references(() => contract.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	employeeId: int("employee_id").notNull().references(() => employee.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	roleId: int("role_id").notNull().references(() => role.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	remarks: text().default('NULL'),
});

export const engineer = mysqlTable("Engineer", {
	id: int().autoincrement().notNull(),
	personId: int("person_id").notNull().references(() => person.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	username: varchar({ length: 500 }).notNull(),
	password: varchar({ length: 500 }).notNull(),
},
(table) => [
	index("index_1").on(table.id),
]);

export const location = mysqlTable("Location", {
	id: int().autoincrement().notNull(),
	street: varchar({ length: 500 }).notNull(),
	province: varchar({ length: 500 }).notNull(),
	barangay: varchar({ length: 500 }).notNull(),
	city: varchar({ length: 500 }).notNull(),
});

export const person = mysqlTable("Person", {
	id: int().autoincrement().notNull(),
	locationId: int("location_id").notNull().references(() => location.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	name: varchar({ length: 500 }).notNull(),
	gender: varchar({ length: 500 }).notNull(),
	email: varchar({ length: 500 }).notNull(),
	contactNumber: varchar("contact_number", { length: 500 }).notNull(),
});

export const project = mysqlTable("Project", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 500 }).notNull(),
	description: text().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateAdded: date("date_added", { mode: 'string' }).notNull(),
},
(table) => [
	index("index_1").on(table.id),
]);

export const requirements = mysqlTable("Requirements", {
	id: int().autoincrement().notNull(),
	contractId: int("contract_id").notNull().references(() => contract.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	documentId: int("document_id").notNull().references(() => document.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	permitNumber: text("permit_number").default('NULL'),
});

export const role = mysqlTable("Role", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 500 }).notNull(),
},
(table) => [
	unique("name").on(table.name),
]);
