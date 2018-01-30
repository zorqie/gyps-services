const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('winston');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');


const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const mongoose = require('./mongoose');


const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(mongoose);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

const { secret } = app.get('authentication')


// TODO: consider updating online here
app.on('login', (result, meta) => {
	// console.log("LOGIN:\n\tRESULT:\n\t\t", result)
	// console.log("SECRET", secret)
	console.log("Logging in:\t", meta.provider)
	// app.passport.verifyJWT(result.accessToken, {secret})
	// .then(jwt => {
	// 	// console.log("WHAT: ", jwt)
	// 	return app.service('users').get(jwt.userId)
	// })
	// .then(user => {
	// 	app.set('user', user)
	// 	console.log("LOGGED IN: ", user)
	// })
	// .catch(error => console.error)
})
app.on('logout', (result, meta) => {
	// app.passport.verifyJWT(result.accessToken, {secret})
	// .then(jwt => {
	// 	// console.log("WHAT: ", jwt)
	// 	// console.log("LOGIN:\n\tMETA:\n\t\t", meta.provider)
	// 	return app.service('users').get(jwt.userId)
	// })
	// .then(user => {
	// 	app.set('user', null)
	// 	console.log("LOGGOUTED: ", user)
	// })
	// .catch(error => console.error)
	// console.log("LOG OUT:\n\tRESULT:\n\t\t", result)
	console.log("LOGING OUT:\t", meta.provider)
})

// Configure a middleware for 404s and the error handler
// app.use(express.notFound());
app.use(function (req, res, next) {
  console.log("NOT FOUND: ", req.url);
  res.status(404).send("Sorry can't find that!" + req);
})
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
