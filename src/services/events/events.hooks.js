const { authenticate } = require('@feathersjs/authentication').hooks;

const { disableMultiItemChange, populate } = require('feathers-hooks-common');

const actsJoin = {
  service: 'acts',
  nameAs: 'acts',
  asArray: true,
  query: { $select: ['name'] },
  parentField: 'act_id',
  childField: '_id',
}

const configJoin = {
  service: 'config',
  nameAs: 'config',
  parentField: '_id',
  childField: 'gig_id',
}

const venueJoin = {
  service: 'venues',
  nameAs: 'venue',
  parentField: 'venue_id',
  childField: '_id',
  query: { $select: ['name'] },
}

const schema = {
  service: 'events',
  query: { parent: { $exists: false } },
  include: [
    actsJoin,
    configJoin,
    {
      service: 'gigs',
      nameAs: 'gigs',
      asArray: true,
      parentField: '_id',
      childField: 'parent',
      // query: { public: true },
      query: { $sort: {start: 1} },
      include: [actsJoin, venueJoin],
    },
    venueJoin,
  ]  
}

module.exports = {
  before: {
    all: [  ],
    find: [],
    get: [],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [ authenticate('jwt'), disableMultiItemChange() ],
    remove: [ authenticate('jwt'), disableMultiItemChange() ]
  },

  after: {
    all: [],
    find: [populate({schema})],
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
