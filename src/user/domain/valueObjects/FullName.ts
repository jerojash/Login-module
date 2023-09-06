export class FullName{
    private constructor(
        private first_name: string,
        private last_name: string
    ){}

    public getFirstName(): string{
        return this.first_name
    };

    public getLastName(): string{
        return this.last_name
    }

    static create(first_name: string, last_name: string): FullName{
        return new FullName(first_name,last_name)
    }
}