const { authenticate } = require('@feathersjs/authentication').hooks;

const { disableMultiItemChange, populate } = require('feathers-hooks-common');

const schema = {
  service: 'gigs',
  include: [{
      service: 'acts',
      nameAs: 'acts',
      asArray: true,
      parentField: 'act_id',
      childField: '_id',
    },
    {
      service: 'venues',
      nameAs: 'venue',
      parentField: 'venue_id',
      childField: '_id',
    }
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
