import { Schema, model, Types } from 'mongoose';

const commentSchema = new Schema({
    description: {
        type: String,
        required: true,
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
    discussionId: {
        type: Types.ObjectId,
        required: true,
        ref: 'Discussion',
    },
});

const Comment = model('Comment', commentSchema);

export { Comment };
