
// export interface User {
//   userName: string;
//   userEmail: string;
//   userPassword: string;
//   role: string;

// }

export interface User{
  userId:string,
  userName:string,
  userEmail:string,
  userPassword:string,
  role:string
}

export interface RegisterUserRequest {
  userPhone: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  profilePic: string;
}

export interface LoginUserRequest {
  userEmail: string;
  userPassword: string;
  role: string;
  userId: string;
  profilePic: string;
}