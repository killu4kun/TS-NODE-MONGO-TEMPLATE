interface IUser {
  id?: string;
  name: string;
  email: string;
  age: number;
  cpf: string;
  password: string;
}

export class UserDto {
  name: string;
  email: string;
  age: number;
  cpf: string;
  password: string;

  constructor(public user: IUser) {
    this.name = user.name;
    this.email = user.email;
    this.age = user.age;
    this.cpf = user.cpf;
    this.password = user.password;
  }
}
