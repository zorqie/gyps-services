// config-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const shortid = require('shortid')

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const config = new Schema({
  	_id: { type: String, 'default': shortid.generate },
  	ticket_rules: { type: [Schema.Types.Mixed] },
  	user_profile: { type: [Schema.Types.Mixed] },
    gig_id: { type: String, required: true }
  }, {
    timestamps: false
  });

  return mongooseClient.model('gig_conf', config);
};
