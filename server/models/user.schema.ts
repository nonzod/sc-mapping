import { defineMongooseModel } from '#nuxt/mongoose'
import { Types } from 'mongoose'
var timesRun = 0;
export const modelUser = defineMongooseModel('User', {
  username: { type: 'string'},
  email: { type: 'string' },
  password: { type: 'string'},
  status: { type: 'string'},
  role: { type: 'string'},
  consent: { type: JSON },
  one_time_token: { type: 'string' },
  created: { type: Number },
  last_login: { type: Number },
}, {

}, (schema) => {
  /*schema.post('save', function(doc, next) {
    timesRun += 1;
    console.log("IN CALLBACK", timesRun);
    next();
  });*/
})