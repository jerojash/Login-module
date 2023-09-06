export class Username{
    private constructor(
        private username: string
    ){}

    public getUsername(): string{
        return this.username
    };

    static create(username: string): Username{
        return new Username(username)
    }
}