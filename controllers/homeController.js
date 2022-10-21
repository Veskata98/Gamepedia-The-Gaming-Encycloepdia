import { Router } from 'express';
import { getLastTenDiscussions } from '../services/discussionService.js';
import { getNews } from '../services/newsService.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    try {
        // const gamingNews = (await getNews()).slice(0, -1);

        const gamingNews = [
            {
                title: 'There’s An Elden Ring Jazz Concert Coming Up But You Can’t Go (Or Afford It)',
                date: 'Tue, 18 Oct 2022 04:52:13 +0000',
                description:
                    'It’s been a year of video game concerts, hasn’t it? Nintendo’s been going hard on live concerts featuring some of...',
                image: 'https://www.kotaku.com.au/wp-content/uploads/sites/3/2022/10/18/elden-ring-malenia-cover.jpg?quality=80=1280,720',
                link: 'https://www.kotaku.com.au/2022/10/theres-an-elden-ring-jazz-concert-coming-up-but-you-cant-go-or-afford-it/',
            },
            {
                title: 'There’s An Elden Ring Jazz Concert Coming Up But You Can’t Go (Or Afford It)',
                date: 'Tue, 18 Oct 2022 04:52:13 +0000',
                description:
                    'It’s been a year of video game concerts, hasn’t it? Nintendo’s been going hard on live concerts featuring some of...',
                image: 'https://www.kotaku.com.au/wp-content/uploads/sites/3/2022/10/18/elden-ring-malenia-cover.jpg?quality=80=1280,720',
                link: 'https://www.kotaku.com.au/2022/10/theres-an-elden-ring-jazz-concert-coming-up-but-you-cant-go-or-afford-it/',
            },
            {
                title: 'There’s An Elden Ring Jazz Concert Coming Up But You Can’t Go (Or Afford It)',
                date: 'Tue, 18 Oct 2022 04:52:13 +0000',
                description:
                    'It’s been a year of video game concerts, hasn’t it? Nintendo’s been going hard on live concerts featuring some of...',
                image: 'https://www.kotaku.com.au/wp-content/uploads/sites/3/2022/10/18/elden-ring-malenia-cover.jpg?quality=80=1280,720',
                link: 'https://www.kotaku.com.au/2022/10/theres-an-elden-ring-jazz-concert-coming-up-but-you-cant-go-or-afford-it/',
            },
        ];

        gamingNews.forEach((x) => {
            x.date = x.date.toLocaleString();
        });

        const lastDiscussions = await getLastTenDiscussions();

        lastDiscussions.forEach((x) => {
            x.date = x.date.toLocaleString();
        });

        const mainNewsArticle = gamingNews.shift();

        res.render('home', { title: 'Gamepedia', mainNewsArticle, news: gamingNews, discussions: lastDiscussions });
    } catch (error) {
        res.render('home', { title: 'Gamepedia' });
    }
});

export { homeController };
