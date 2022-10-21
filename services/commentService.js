import { Comment } from '../models/Comment.js';
import { User } from '../models/User.js';

export const createComment = async (description, creatorId, discussionId) => {
    const comment = await Comment.create({ description, creatorId, discussionId });

    console.log(comment);
};

export const getAllCommentsForDiscussion = async (discussionId) => {
    const comments = await Comment.find({ discussionId }).populate('creatorId', 'username').lean();

    return comments;
};
