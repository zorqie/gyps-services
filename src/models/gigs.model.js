// gigs-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const shortid = require('shortid');

module.exports = function (app) {
	const mongooseClient = app.get('mongooseClient');
	const { Schema } = mongooseClient;
	const gigs = new Schema({
		_id:		{ type: String, 'default': shortid.generate},
		name: 		{ type: String, required: '{PATH} is required' },
		description:{ type: String },
		info: 		{ type: [Schema.Types.Mixed] },
		type: 		{ type: String, required: '{PATH} is required' },
		capacity: 	{ type: Number},
		attending: 	{ type: [String]}, 						//Array of ticket id's
		public: 	{ type: Boolean, 'default': false },
		mandatory: 	{ type: Boolean },
		start: 		{ type: Date, required: '{PATH} is required'},
		end:   		{ type: Date },
		
		poster_uri: {type: String},
		avatar_uri: {type: String},

		parent:   { type: String, ref: 'Gig' },
		venue_id: { type: String, ref: 'Venue' },
		act_id:   { type: [String], ref: 'Act' },

		owner: 		{ type: String, ref: 'User' } 
	}, {
		timestamps: true
	});

	return mongooseClient.model('gigs', gigs);
};
