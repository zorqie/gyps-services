const { authenticate } = require('@feathersjs/authentication').hooks;
const { 
  queryWithCurrentUser, 
  associateCurrentUser 
} = require('feathers-authentication-hooks');

const hooks = require('feathers-hooks-common');

const schema = {
  service: 'tickets',
  include: [{
    service: 'gigs',
    nameAs: 'gig',
    parentField: 'gig_id',
    childField: '_id',
    include: [{
      service: 'venues',
      nameAs: 'venue',
      parentField: 'venue_id',
      childField: '_id'
    }]
  }]  
}


module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [queryWithCurrentUser({ as: 'owner_id' })],
    get: [],
    create: [associateCurrentUser({ as: 'owner_id' })],
    update: [associateCurrentUser({ as: 'owner_id' })],
    patch: [associateCurrentUser({ as: 'owner_id' })],
    remove: []
  },

  after: {
    all: [],
    find: [hooks.populate({schema})],
    get: [hooks.populate({schema})],
    create: [hooks.populate({schema})],
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
