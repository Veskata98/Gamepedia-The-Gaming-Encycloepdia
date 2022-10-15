import mongoose from 'mongoose';

const mondoDBConnString = 'mongodb://127.0.0.1:27017/gamepedia';

const databaseConfig = async (app) => {
    try {
        await mongoose.connect(mondoDBConnString, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('Database Connected!');
    } catch (error) {
        console.error('Error initializing database!');
        process.exit(1);
    }
};

export { databaseConfig };
