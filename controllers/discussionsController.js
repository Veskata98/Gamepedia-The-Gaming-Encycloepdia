import { Router } from 'express';

import { hasUser } from '../middlewares/guards.js';
import { body, validationResult } from 'express-validator';
import { errorParser, isOwner } from '../utils/utils.js';

import {
    createDiscussion,
    getAllDiscussions,
    getDiscussionById,
    getMyDiscussions,
    updateDiscussionById,
} from '../services/discussionService.js';
import { createComment, getAllCommentsForDiscussion } from '../services/commentService.js';

const discussionsController = Router();

//My Discussions

discussionsController.get('/myDiscussions', hasUser, async (req, res) => {
    const userId = req.user.userId;
    try {
        let discussions = await getMyDiscussions(userId);

        //Sorting discussions by date
        discussions = discussions.sort((a, b) => new Date(b.date) - new Date(a.date));

        //Parsing discussion dates to readable string
        discussions.map((x) => (x.date = x.date.toLocaleString()));
        res.render('myDiscussions', { title: 'My Discussions - Gamepedia', discussions });
    } catch (error) {
        res.render('myDiscussions', { title: 'My Discussions - Gamepedia' });
    }
});

//Discussion Create

discussionsController.get('/create', hasUser, async (req, res) => {
    res.render('createDiscussion', { title: 'Create Discussion - Gamepedia' });
});

discussionsController.post('/create', hasUser, async (req, res) => {
    const title = req.body.title.trim();
    const description = req.body.description.trim();

    try {
        if (title == '' || description == '') {
            throw new Error('All fields are required');
        }

        const creatorId = req.user.userId;
        await createDiscussion(req.body.title, req.body.description, creatorId);
        res.redirect('/forum');
    } catch (error) {
        const errorMessages = errorParser(error);
        res.render('createDiscussion', {
            title: 'Create Discussion - Gamepedia',
            errorMessages,
            discussionTitle: title,
            discussionDescription: description,
        });
    }
});

//Edit discussion

discussionsController.get('/:id/edit', hasUser, async (req, res) => {
    const discussionId = req.params.id;
    try {
        const discussion = await getDiscussionById(discussionId);

        if (!isOwner(discussion.creatorId, req, res)) {
            return res.redirect('/forum');
        }

        res.render('editDiscussion', { title: `${discussion.title} - Edit Discussions - Gamepedia`, discussion });
    } catch (error) {
        res.render('404', {
            title: `Page Not Found - Gamepedia`,
        });
    }
});

discussionsController.post(
    '/:id/edit',
    hasUser,
    body('title').trim().isLength({ min: 5 }).withMessage('Title must be atleast 5 characters long'),
    body('description').trim().isLength({ min: 20 }).withMessage('Description must be atleast 20 characters long'),
    async (req, res) => {
        const discussionId = req.params.id;

        const newTitle = req.body.title.trim();
        const newDescription = req.body.description.trim();

        try {
            const discussion = await getDiscussionById(discussionId);

            if (!isOwner(discussion.creatorId, req, res)) {
                return res.redirect('/forum');
            }

            if (newTitle == '' || newDescription == '') {
                throw new Error('All fields are required');
            }

            const errors = validationResult(req)
                .array()
                .map((x) => x.msg)
                .join('\n');

            if (errors) {
                throw new Error(errors);
            }

            await updateDiscussionById(discussionId, newTitle, newDescription);
            res.redirect('/forum');
        } catch (error) {
            const errorMessages = errorParser(error);
            res.render('editDiscussion', {
                title: 'Edit Discussion - Gamepedia',
                errorMessages,
                discussion: {
                    title: newTitle,
                    description: newDescription,
                },
            });
        }
    },
);

//View one discussion
discussionsController.get('/:id', async (req, res) => {
    const discussionId = req.params.id;

    try {
        const discussion = await getDiscussionById(discussionId);
        discussion.date = discussion.date.toLocaleString();

        const comments = await getAllCommentsForDiscussion(discussionId);
        comments.map((x) => (x.date = x.date.toLocaleString()));

        isOwner(discussion.creatorId, req, res);

        res.render('oneDiscussion', { title: `${discussion.title} - Discussions - Gamepedia`, discussion, comments });
    } catch (error) {
        res.redirect('/forum');
    }
});

discussionsController.post('/:id/postComment', hasUser, async (req, res) => {
    const discussionId = req.params.id;
    const description = req.body.description.trim();
    if (description) {
        try {
            await createComment(description, req.user.userId, discussionId);
            res.redirect(`/forum/discussions/${discussionId}`);
        } catch (error) {
            console.log(error);
            res.render('404', { title: 'Page Not Found - Gamepedia' });
        }
    } else {
        res.redirect(`/forum/discussions/${discussionId}`);
    }
});

export { discussionsController };
