// Initializes the `acts` service on path `/acts`
const createService = require('feathers-mongoose');
const createModel = require('../../models/acts.model');
const hooks = require('./acts.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'acts',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/acts', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('acts');

  service.hooks(hooks);
};
