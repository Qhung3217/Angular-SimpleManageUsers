export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public DOB: Date,
    public status: boolean,
    public socialLinks: [{ social: string; address: string }]
  ) {}
}
