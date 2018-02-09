const { authenticate } = require('@feathersjs/authentication').hooks;

const hooks = require('feathers-hooks-common');

const schema = {
  service: 'venues',
  include: [{
    service: 'gigs',
    nameAs: 'gigs',
    asArray: true,
    query: { $sort: {start: 1} },
    parentField: '_id',
    childField: 'venue_id',
  }]  
}


module.exports = {
  before: {
    all: [  ],
    find: [],
    get: [],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [hooks.populate({schema})],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
