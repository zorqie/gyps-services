// acts-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const shortid = require('shortid');

module.exports = function (app) {
	const mongooseClient = app.get('mongooseClient');
	const { Schema } = mongooseClient;
	const acts = new Schema({
		_id: 		{ type: String, 'default': shortid.generate},
		name:		{ type: String, required: '{PATH} is required!' },
		description: String,
		poster_uri: String,
		avatar_uri: String, 
		user_id:	{ type: String, ref: 'User' }
	}, {
		timestamps: true
	});

	return mongooseClient.model('acts', acts);
};
