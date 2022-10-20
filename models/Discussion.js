import { Schema, model, Types } from 'mongoose';

const discussionSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: [5, 'Title must be atleast 5 characters long'],
    },
    description: {
        type: String,
        required: true,
        minlength: [20, 'Description must be atleast 20 characters long'],
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    creatorId: {
        type: Types.ObjectId,
        required: true,
        ref: 'User',
    },
});

discussionSchema.index(
    { title: 1 },
    {
        unique: true,
        collation: {
            locale: 'en',
            strength: 2,
        },
    },
);

const Discussion = model('Discussion', discussionSchema);

export { Discussion };
