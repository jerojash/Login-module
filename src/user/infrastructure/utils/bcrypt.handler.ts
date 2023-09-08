import bcrypt, { compare } from 'bcrypt';

const encrypt = async (password: string) =>{
    const passwordHased = await bcrypt.hash(password,10);
    return passwordHased
};

const verified = async (pass: string, passHash: string) => {
    const isCorrect = await compare(pass,passHash);
    return isCorrect;
}

export {encrypt,verified}