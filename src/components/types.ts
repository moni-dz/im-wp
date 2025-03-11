export interface User {
  username: string;
  isLoggedIn: boolean;
}

export interface Employee {
  id: number;
  person_id: number;
  status: string;
  skills: string;
  date_contracted: string;
}

export interface Client {
  id: number;
  name: string;
  location: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'completed';
  startDate: string;
  endDate?: string;
  progress: number;
  client_id?: number;
  client?: Client;
  teamMembers?: TeamMember[];

}

export interface TeamMember { // project-specific, info can be taken from employee / reference to employee entity
  name: string;
  role: string;
  id: number;
}

import { InferInsertModel, InferSelectModel, InferSelectViewModel } from 'drizzle-orm'
import { contractfullview, contractemployeedata, document, clientdata, location } from '@/db/schema';

export type ContractDetails = InferSelectViewModel<typeof contractfullview>;
export type EmployeeData = InferSelectViewModel<typeof contractemployeedata>;
export type Document = InferInsertModel<typeof document>;
export type ClientData = InferSelectViewModel<typeof clientdata>;
export type Location = InferSelectModel<typeof location>;