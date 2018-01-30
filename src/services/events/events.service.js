// Initializes the `gigs` service on path `/gigs`
const createService = require('feathers-mongoose');
const hooks = require('./events.hooks');

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const Model = mongooseClient.model('gigs')
  const paginate = app.get('paginate');

  const options = {
    name: 'events',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/events', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('events');
  service.hooks(hooks);
};
