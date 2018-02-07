const { authenticate } = require('@feathersjs/authentication').hooks;

const { disableMultiItemChange, populate } = require('feathers-hooks-common');

const schema = {
  service: 'acts',
  include: [
    {
      service: 'gigs',
      nameAs: 'gigs',
      asArray: true,
      parentField: '_id',
      childField: 'act_id',
      // query: { public: true },
      query: { $sort: {start: 1} },
    },
  ]
}

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [populate({schema})],
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
