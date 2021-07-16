export interface UserLogin {
  email: string,
  password: string
}

export interface User {
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
