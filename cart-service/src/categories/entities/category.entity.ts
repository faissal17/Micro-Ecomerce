export class Category {
    name: string;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(partial: any) {
        Object.assign(this, partial);
    }
}
