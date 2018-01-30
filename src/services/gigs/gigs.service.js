// Initializes the `gigs` service on path `/gigs`
const createService = require('feathers-mongoose');
const createModel = require('../../models/gigs.model');
const hooks = require('./gigs.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'gigs',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/gigs', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('gigs');
  service.hooks(hooks);
};
