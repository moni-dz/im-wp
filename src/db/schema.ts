import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, int, decimal, date, varchar, text, unique, mysqlView, mediumtext, boolean } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const client = mysqlTable("client", {
	id: int().autoincrement().primaryKey(),
	personId: int("person_id").notNull().references(() => person.id, { onDelete: "cascade", onUpdate: "restrict" } ),
},
(table) => [
	index("index_1").on(table.id),
]);

export const contract = mysqlTable("Contract", {
	id: int().autoincrement().primaryKey(),
	projectId: int("project_id").notNull().references(() => project.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	clientId: int("client_id").notNull().references(() => client.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	locationId: int("location_id").notNull().references(() => location.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	engineerId: int("engineer_id").notNull().references(() => engineer.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	contractAmount: decimal("contract_amount").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date({ mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateStart: date("date_start", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateEnd: date("date_end", { mode: 'string' }).default(sql`NULL`),
	remarks: varchar({ length: 500 }).notNull(),
	status: varchar({ length: 500 }).notNull(),
});

export const document = mysqlTable("Document", {
	id: int().autoincrement().primaryKey(),
	title: varchar({ length: 500 }).notNull(),
	description: text().default(sql`NULL`),
	completed: boolean().default(false).notNull(),
	// Warning: Can't parse longblob from database
	// longblobType: longblob("file"),
},
(table) => [
	index("index_1").on(table.id),
]);

export const employee = mysqlTable("Employee", {
	id: int().autoincrement().primaryKey(),
	personId: int("person_id").notNull().references(() => person.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	status: text().default(sql`NULL`),
	skills: text().default(sql`NULL`),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateContracted: date("date_contracted", { mode: 'string' }).notNull(),
},
(table) => [
	index("index_1").on(table.id),
]);

export const employeedesignation = mysqlTable("employeedesignation", {
	id: int().autoincrement().primaryKey(),
	contractId: int("contract_id").default(sql`NULL`).references(() => contract.id, { onDelete: "set null", onUpdate: "restrict" } ),
	employeeId: int("employee_id").notNull().references(() => employee.id, { onDelete: "cascade", onUpdate: "restrict" } ),
	roleId: int("role_id").notNull().references(() => role.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	remarks: text().default(sql`NULL`),
});

export const engineer = mysqlTable("Engineer", {
	id: int().autoincrement().primaryKey(),
	personId: int("person_id").notNull().references(() => person.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	username: varchar({ length: 500 }).notNull(),
	password: varchar({ length: 500 }).notNull(),
},
(table) => [
	index("index_1").on(table.id),
]);

export const location = mysqlTable("Location", {
	id: int().autoincrement().primaryKey(),
	street: varchar({ length: 500 }).notNull(),
	barangay: varchar({ length: 500 }).notNull(),
	city: varchar({ length: 500 }).notNull(),
	province: varchar({ length: 500 }).notNull(),
});

export const person = mysqlTable("Person", {
	id: int().autoincrement().primaryKey(),
	locationId: int("location_id").default(sql`NULL`).references(() => location.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	name: varchar({ length: 500 }).notNull(),
	gender: varchar({ length: 500 }).notNull(),
	email: varchar({ length: 500 }).notNull(),
	contactNumber: varchar("contact_number", { length: 500 }).notNull(),
});

export const project = mysqlTable("Project", {
	id: int().autoincrement().primaryKey(),
	name: varchar({ length: 500 }).notNull(),
	description: text().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateAdded: date("date_added", { mode: 'string' }).notNull(),
},
(table) => [
	index("index_1").on(table.id),
]);

export const requirements = mysqlTable("Requirements", {
	id: int().autoincrement().primaryKey(),
	contractId: int("contract_id").notNull().references(() => contract.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	documentId: int("document_id").notNull().references(() => document.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	permitNumber: text("permit_number").default(sql`NULL`),
});

export const role = mysqlTable("Role", {
	id: int().autoincrement().primaryKey(),
	name: varchar({ length: 500 }).notNull(),
},
(table) => [
	unique("name").on(table.name),
]);
export const clientdata = mysqlView("clientdata", {
	clientId: int("client_id").default(0).notNull(),
	personName: varchar("person_name", { length: 500 }).notNull(),
	personGender: varchar("person_gender", { length: 500 }).notNull(),
	personEmail: varchar("person_email", { length: 500 }).notNull(),
	personContactNumber: varchar("person_contact_number", { length: 500 }).notNull(),
	personLocationId: int("person_location_id").default(sql`NULL`),
	projectIds: mediumtext("project_ids").default(sql`NULL`),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`c\`.\`id\` AS \`client_id\`,\`p\`.\`name\` AS \`person_name\`,\`p\`.\`gender\` AS \`person_gender\`,\`p\`.\`email\` AS \`person_email\`,\`p\`.\`contact_number\` AS \`person_contact_number\`,\`p\`.\`location_id\` AS \`person_location_id\`,json_arrayagg(\`proj\`.\`id\`) AS \`project_ids\` from (((\`db_imwp\`.\`client\` \`c\` join \`db_imwp\`.\`person\` \`p\` on(\`c\`.\`person_id\` = \`p\`.\`id\`)) join \`db_imwp\`.\`contract\` \`con\` on(\`con\`.\`client_id\` = \`c\`.\`id\`)) join \`db_imwp\`.\`project\` \`proj\` on(\`con\`.\`project_id\` = \`proj\`.\`id\`)) group by \`c\`.\`id\`,\`p\`.\`name\`,\`p\`.\`gender\`,\`p\`.\`email\`,\`p\`.\`contact_number\`,\`p\`.\`location_id\``);

export const contractfullview = mysqlView("contractfullview", {
	contractId: int("contract_id").default(0).notNull(),
	contractProjectId: int("contract_project_id").notNull(),
	contractClientId: int("contract_client_id").notNull(),
	contractLocationId: int("contract_location_id").notNull(),
	contractEngineerId: int("contract_engineer_id").notNull(),
	contractAmount: decimal("contract_amount").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date({ mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateStart: date("date_start", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateEnd: date("date_end", { mode: 'string' }).default(sql`NULL`),
	remarks: varchar({ length: 500 }).notNull(),
	status: varchar({ length: 500 }).notNull(),
	projectId: int("project_id").default(0).notNull(),
	projectName: varchar("project_name", { length: 500 }).notNull(),
	projectDescription: text("project_description").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	projectDateAdded: date("project_date_added", { mode: 'string' }).notNull(),
	locationId: int("location_id").default(0).notNull(),
	locationStreet: varchar("location_street", { length: 500 }).notNull(),
	locationBarangay: varchar("location_barangay", { length: 500 }).notNull(),
	locationCity: varchar("location_city", { length: 500 }).notNull(),
	locationProvince: varchar("location_province", { length: 500 }).notNull(),
	clientTableId: int("client_table_id").default(0).notNull(),
	clientPersonId: int("client_person_id").notNull(),
	clientPersonDbId: int("client_person_db_id").default(0).notNull(),
	clientPersonLocationId: int("client_person_location_id").default(sql`NULL`),
	clientName: varchar("client_name", { length: 500 }).notNull(),
	clientGender: varchar("client_gender", { length: 500 }).notNull(),
	clientEmail: varchar("client_email", { length: 500 }).notNull(),
	clientContactNumber: varchar("client_contact_number", { length: 500 }).notNull(),
	engineerTableId: int("engineer_table_id").default(0).notNull(),
	engineerPersonId: int("engineer_person_id").notNull(),
	engineerPersonDbId: int("engineer_person_db_id").default(0).notNull(),
	engineerPersonLocationId: int("engineer_person_location_id").default(sql`NULL`),
	engineerName: varchar("engineer_name", { length: 500 }).notNull(),
	engineerGender: varchar("engineer_gender", { length: 500 }).notNull(),
	engineerEmail: varchar("engineer_email", { length: 500 }).notNull(),
	engineerContactNumber: varchar("engineer_contact_number", { length: 500 }).notNull(),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`c\`.\`id\` AS \`contract_id\`,\`c\`.\`project_id\` AS \`contract_project_id\`,\`c\`.\`client_id\` AS \`contract_client_id\`,\`c\`.\`location_id\` AS \`contract_location_id\`,\`c\`.\`engineer_id\` AS \`contract_engineer_id\`,\`c\`.\`contract_amount\` AS \`contract_amount\`,\`c\`.\`date\` AS \`date\`,\`c\`.\`date_start\` AS \`date_start\`,\`c\`.\`date_end\` AS \`date_end\`,\`c\`.\`remarks\` AS \`remarks\`,\`c\`.\`status\` AS \`status\`,\`p\`.\`id\` AS \`project_id\`,\`p\`.\`name\` AS \`project_name\`,\`p\`.\`description\` AS \`project_description\`,\`p\`.\`date_added\` AS \`project_date_added\`,\`loc\`.\`id\` AS \`location_id\`,\`loc\`.\`street\` AS \`location_street\`,\`loc\`.\`barangay\` AS \`location_barangay\`,\`loc\`.\`city\` AS \`location_city\`,\`loc\`.\`province\` AS \`location_province\`,\`cl\`.\`id\` AS \`client_table_id\`,\`cl\`.\`person_id\` AS \`client_person_id\`,\`cp\`.\`id\` AS \`client_person_db_id\`,\`cp\`.\`location_id\` AS \`client_person_location_id\`,\`cp\`.\`name\` AS \`client_name\`,\`cp\`.\`gender\` AS \`client_gender\`,\`cp\`.\`email\` AS \`client_email\`,\`cp\`.\`contact_number\` AS \`client_contact_number\`,\`e\`.\`id\` AS \`engineer_table_id\`,\`e\`.\`person_id\` AS \`engineer_person_id\`,\`ep\`.\`id\` AS \`engineer_person_db_id\`,\`ep\`.\`location_id\` AS \`engineer_person_location_id\`,\`ep\`.\`name\` AS \`engineer_name\`,\`ep\`.\`gender\` AS \`engineer_gender\`,\`ep\`.\`email\` AS \`engineer_email\`,\`ep\`.\`contact_number\` AS \`engineer_contact_number\` from ((((((\`db_imwp\`.\`contract\` \`c\` join \`db_imwp\`.\`project\` \`p\` on(\`c\`.\`project_id\` = \`p\`.\`id\`)) join \`db_imwp\`.\`location\` \`loc\` on(\`c\`.\`location_id\` = \`loc\`.\`id\`)) join \`db_imwp\`.\`client\` \`cl\` on(\`c\`.\`client_id\` = \`cl\`.\`id\`)) join \`db_imwp\`.\`person\` \`cp\` on(\`cl\`.\`person_id\` = \`cp\`.\`id\`)) join \`db_imwp\`.\`engineer\` \`e\` on(\`c\`.\`engineer_id\` = \`e\`.\`id\`)) join \`db_imwp\`.\`person\` \`ep\` on(\`e\`.\`person_id\` = \`ep\`.\`id\`))`);

export const contractemployeedata = mysqlView("contractemployeedata", {
	contractId: int("contract_id").default(sql`NULL`),
	employeeId: int("employee_id").default(0).notNull(),
	employeePersonId: int("employee_person_id").notNull(),
	employeeStatus: text("employee_status").default(sql`NULL`),
	employeeSkills: text("employee_skills").default(sql`NULL`),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	employeeDateContracted: date("employee_date_contracted", { mode: 'string' }).notNull(),
	personName: varchar("person_name", { length: 500 }),
	personEmail: varchar("person_email", { length: 500 }),
	personContactNumber: varchar("person_contact_number", { length: 500 }),
	roleId: int("role_id").default(0).notNull(),
	roleName: varchar("role_name", { length: 500 }).notNull(),
	employeeDesignationId: int("employee_designation_id").default(0).notNull(),
	designationRemarks: text("designation_remarks").default(sql`NULL`),
}).algorithm("undefined").sqlSecurity("definer").as(sql`select \`ed\`.\`contract_id\` AS \`contract_id\`,\`e\`.\`id\` AS \`employee_id\`,\`e\`.\`person_id\` AS \`employee_person_id\`,\`e\`.\`status\` AS \`employee_status\`,\`e\`.\`skills\` AS \`employee_skills\`,\`e\`.\`date_contracted\` AS \`employee_date_contracted\`,\`p\`.\`name\` AS \`person_name\`,\`p\`.\`email\` AS \`person_email\`,\`p\`.\`contact_number\` AS \`person_contact_number\`,\`r\`.\`id\` AS \`role_id\`,\`r\`.\`name\` AS \`role_name\`,\`ed\`.\`id\` AS \`employee_designation_id\`,\`ed\`.\`remarks\` AS \`designation_remarks\` from (((\`db_imwp\`.\`employeedesignation\` \`ed\` join \`db_imwp\`.\`employee\` \`e\` on(\`ed\`.\`employee_id\` = \`e\`.\`id\`)) join \`db_imwp\`.\`role\` \`r\` on(\`ed\`.\`role_id\` = \`r\`.\`id\`)) left join \`db_imwp\`.\`person\` \`p\` on(\`e\`.\`person_id\` = \`p\`.\`id\`))`);