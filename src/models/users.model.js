const shortid = require('shortid');

module.exports = function (app) {
	const mongooseClient = app.get('mongooseClient');
	const users = new mongooseClient.Schema({
		_id: {
			type: String,
			'default': shortid.generate,
		}, 

		displayName: { type: String },
		email: {type: String, unique: true},
		password: { type: String },
		roles: [String],
	
		googleId: { type: String },
	
		facebookId: { type: String },
	
	}, {
		timestamps: true
	});

	return mongooseClient.model('users', users);
};
