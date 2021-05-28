export default class User {
  constructor(
    id: number,
    login: string,
    name: string,
    surname: string,
    isBanker: boolean,
    password: string,
  ) {}

  id!: number;

  login!: string;

  name!: string;

  surname!: string;

  isBanker!: boolean;

  password!: string;
}
