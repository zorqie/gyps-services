// venues-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const shortid = require('shortid');

module.exports = function (app) {
	const mongooseClient = app.get('mongooseClient');
	const { Schema } = mongooseClient;
	const venues = new Schema({
		_id:    	{ type: String, 'default': shortid.generate},
		name:		{ type: String, required: '{PATH} is required' },
		description:	String,
		capacity:	{ 
			type: Number, 
			required: true, 
			min: [0, "Don't be negative"] 
		},
		type: String,
		parent: { type: String, ref: 'Venue' }, //should be parent_id, no?
		owner: { type: String, ref: 'User' }
	}, {
		timestamps: true
  	});

	return mongooseClient.model('venues', venues);
};
