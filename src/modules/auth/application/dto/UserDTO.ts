export interface UserDTO {
  id: string;
  name: string;
  email: string;
  photo?: string;
  birthdate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RegisterRequestDTO {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  user: UserDTO;
  token: string;
}
