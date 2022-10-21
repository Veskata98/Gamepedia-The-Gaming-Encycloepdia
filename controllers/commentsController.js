import { Router } from 'express';

const commentsController = Router();

commentsController.post('/myDiscussions', hasUser, async (req, res) => {
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

export { commentsController };
