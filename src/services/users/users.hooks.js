const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const { disableMultiItemChange, populate } = require('feathers-hooks-common');

const schema = {
  service: 'users',
  include: [
    {
      service: 'profiles',
      nameAs: 'profiles',
      asArray: true,
      parentField: '_id',
      childField: 'user_id',
      // query: { public: true },
    },
    {
      service: 'tickets',
      nameAs: 'event_tickets',
      asArray: true,
      query: { type: 'Event' },
      parentField: '_id',
      childField: 'user_id',
    },
  ]  
}

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword() ],
    update: [ hashPassword(),  authenticate('jwt') ],
    patch: [ hashPassword(),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
