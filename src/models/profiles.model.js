// profiles-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const shortid = require('shortid')

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const profiles = new Schema({
  	_id: { type: String, 'default': shortid.generate },
  	user_id: String,
  	displayName: String,
  	last_event_id: String,
  }, {
    timestamps: false
  });

  return mongooseClient.model('profiles', profiles);
};
