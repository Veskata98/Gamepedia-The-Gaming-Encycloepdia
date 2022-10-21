import { Discussion } from '../models/Discussion.js';
import { User } from '../models/User.js';

export const createDiscussion = async (title, description, creatorId) => {
    await Discussion.create({ title, description, creatorId });
};

export const getAllDiscussions = async () => {
    const discussions = await Discussion.find({}).lean();
    return discussions;
};

export const getDiscussionById = async (discussionId) => {
    const discussion = await Discussion.findById(discussionId).lean();

    const user = await User.findById(discussion.creatorId).lean();
    discussion.creatorUsername = user.username;

    return discussion;
};

export const updateDiscussionById = async (discussionId, title, description) => {
    await Discussion.findByIdAndUpdate(discussionId, {
        title,
        description,
    });
};

export const getMyDiscussions = async (userId) => {
    const discussions = await Discussion.find({ creatorId: userId }).lean();
    return discussions;
};

export const getLastTenDiscussions = async () => {
    const discussions = await Discussion.find().sort('-date').limit(10).lean();
    return discussions;
};
