import { Router } from 'express';

import { getAllDiscussions } from '../services/discussionService.js';

const forumController = Router();

forumController.get('/', async (req, res) => {
    try {
        let discussions = await getAllDiscussions();

        //Sorting discussions by date
        discussions = discussions.sort((a, b) => new Date(b.date) - new Date(a.date));

        //Parsing discussion dates to readable string
        discussions.map((x) => (x.date = x.date.toLocaleString()));

        const links = [];

        if (req.url == '/') {
            links.push(true, false);
        } else {
            links.push(false, true);
        }

        res.render('forum', { title: 'Forum - Gamepedia', discussions, links });
    } catch (error) {
        res.render('forum', { title: 'Forum - Gamepedia' });
    }
});

export { forumController };
