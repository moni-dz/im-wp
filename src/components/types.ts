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
