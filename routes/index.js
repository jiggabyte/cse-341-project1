const routes = require('express').Router();
const contact = require('./contact');

routes.use('/', require('./swagger'));

routes.use('/contact', contact);
routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: './api-docs',
    };
    res.send(docData);
  })
);

module.exports = routes;
