// Initializes the `fans` service on path `/fans`
const createService = require('feathers-mongoose');
const createModel = require('../../models/fans.model');
const hooks = require('./fans.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'fans',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/fans', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('fans');

  service.hooks(hooks);
};
