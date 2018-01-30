'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const mongooseClient = require('../mongoose');

const users = require('./users/users.service');
const acts = require('./acts/acts.service.js');
const events = require('./events/events.service.js');
const fans = require('./fans/fans.service.js');
const gigs = require('./gigs/gigs.service.js');
const messages = require('./messages/messages.service.js');
const tickets = require('./tickets/tickets.service.js');
const venues = require('./venues/venues.service.js');

module.exports = function(app) {
	app.configure(mongooseClient);
  app.configure(users);
  app.configure(acts);
  app.configure(venues);
  app.configure(gigs);
  app.configure(events);
  app.configure(fans);
  app.configure(tickets);
  app.configure(messages);
};
