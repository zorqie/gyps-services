// tickets-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const shortid = require('shortid');

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const tickets = new Schema({
	_id: 		{ type: String, 'default': shortid.generate},
	owner_id: 	{ type: String, ref: 'User' },
	gig_id: 	{ type: String, ref: 'Gig', required: true },
	status:		{ type: String, required: true},
	comment:	String,
  }, {
    timestamps: true
  });

  return mongooseClient.model('tickets', tickets);
};
