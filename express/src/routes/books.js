import express from 'express';
import authenticate from '../middlewares/authenticate';
import request from 'request-promise';
import { parseString } from 'xml2js';

const router = express.Router();

router.use(authenticate);

router.get('/search', (req, res) => {
  request
    .get(
      `https://www.goodreads.com/search/index.xml?key=${
        process.env.GOODREADS_KEY
      }&q=${req.query.q}`
    )
    .then(result => {
      parseString(result, (err, goodreadsResult) => {
        let books = goodreadsResult.GoodreadsResponse.search[0].results[0].work;

        res.status(200).json(
          books.map(work => ({
            goodreadsId: work.best_book[0].id[0]._,
            title: work.best_book[0].title[0],
            authors: work.best_book[0].author[0].name,
            covers: work.best_book[0].image_url[0]
          }))
        );
      });
    });
  // res.status(200).json([
  //   {
  //     goodreadsId: 1,
  //     title: '1984',
  //     authors: 'Orwell',
  //     covers: 'https://images.gr-assets.com/books/1348990566l/5470.jpg',
  //     pages: 198
  //   },
  //   {
  //     goodreadsId: 2,
  //     title: 'Three Men in a Boat',
  //     authors: 'Jerome K. Jerome',
  //     covers: 'https://images.gr-assets.com/books/1392791656l/4921.jpg',
  //     pages: 256
  //   }
  // ]);
});

export default router;
