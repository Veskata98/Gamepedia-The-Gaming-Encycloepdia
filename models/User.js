import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: [5, 'Username must be atleast 5 characters long'],
    },
    hashedPassword: { type: String, required: true },
});

userSchema.index(
    { username: 1 },
    {
        unique: true,
        collation: {
            locale: 'en',
            strength: 2,
        },
    },
);

const User = model('User', userSchema);

export { User };
