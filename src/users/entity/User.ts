interface UserProps {
  id?: number;
  email: string;
  name: string;
  password: string;
}

export class User {
  public id?: number;
  public email: string;
  public name: string;
  public password: string;

  constructor(props: UserProps) {
    this.id = props.id;
    this.email = props.email;
    this.name = props.name;
    this.password = props.password;
  }
}