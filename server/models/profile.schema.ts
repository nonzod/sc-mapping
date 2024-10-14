import { defineMongooseModel } from '#nuxt/mongoose'
import { Types } from 'mongoose'
var timesRun = 0;
export const modelProfile = defineMongooseModel('Profile', {
  authorId: { type: Types.ObjectId, ref: modelUser },
  CustomisationUIHeader: {
    devices: {
      keyboard: [{ _instance: { type: Number } }],
      mouse: [{ _instance: { type: Number } }],
      gamepad: [{ _instance: { type: Number } }],
      joystick: [{ _instance: { type: Number } }],
    },
    categories: {
      category: [{ _label: { type: String } }]
    },
    _label: { type: String },
    _description: { type: String },
    _image: { type: String }
  },
  deviceoptions: [{
    option: [{
      _input: { type: String },
      _deadzone: { type: String }
    }],
    _name: { type: String }
  }],
  options: [{ type: Object }],
  modifiers: [{ type: Object }],
  actionmap: [{
    action: [{
      rebind: [{
        _input: { type: String },
        _activationMode: { type: String },
        _multiTap: { type: Number }
      }],
      _name: { type: String }
    }],
    _name: { type: String }
  }],
  appDevice: [{
    name: { type: String },
    prefix: { type: String },
    instance: { type: Number },
    buttons: [{
      name: { type: String },
      actions: [{
        name: { type: String },
        section: { type: String },
        activationMode: { type: String },
        multiTap: { type: Number }
      }]
    }],
    canvas: {
      grid: { type: Object },
      settings: { type: Object }
    }
  }],
  _version: { type: Number },
  _optionsVersion: { type: Number },
  _rebindVersion: { type: Number },
  _profileName: { type: String }
}, {

}, (schema) => {
  /*schema.post('save', function(doc, next) {
    timesRun += 1;
    console.log("IN CALLBACK", timesRun);
    next();
  });*/
})