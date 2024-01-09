export class User {
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
