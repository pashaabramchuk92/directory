export interface User {
  email: string,
  password: string
}

export interface Worker {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
}

export interface UserBody {
  userName: string,
  job: string
}
