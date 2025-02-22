// Types that can be used across components
export interface User {
  username: string;
  isLoggedIn: boolean;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  date_added: string;
}

export interface Employee {
  id: number;
  person_id: number;
  status: string;
  skills: string;
  date_contracted: string;
}