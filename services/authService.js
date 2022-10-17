import { User } from '../models/User.js';
import bcrypt from 'bcrypt';

const login = async (username, password) => {
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Incorrect username or password');
    }

    const passCompare = await bcrypt.compare(password, user.hashedPassword);

    if (!passCompare) {
        throw new Error('Incorrect username or password');
    }

    return {
        userId: user._id.toString(),
        username: user.username,
    };
};

const register = async (username, password) => {
    const existing = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if (existing) {
        throw new Error('Username already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, hashedPassword });

    return {
        userId: user._id.toString(),
        username: user.username,
    };
};

export { login, register };
