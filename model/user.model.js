const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON } = require('./plugin');



const userSchema = mongoose.Schema(
  {
    // roles: {type: String, enum : ['user','client'],required: true},
    // user: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: user,
	// },

    Name: {type: String, required:isName, trim: true, default:""},
    Email: {type: String, required:isEmail ,trim: true, lowercase: true, default:""},
    Mobile: {type: String, required: isMobile ,trim: true, default:""},

    Address: {type: String,trim: true},
    status: {type: String,trim: true, },
    err_log: {type: String,trim: true, },
   
  },


  {
    timestamps: true,
  }
);

function isEmail () {
    return typeof this.Email === 'string'? false : true
}
function isMobile () {
  return typeof this.Mobile === 'string'? false : true
}
function isName () {
  return typeof this.Name === 'string'? false : true
}


// userSchema.Types.String.checkRequired(v => v != null);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);


userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};


userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});


userSchema.pre("findOneAndUpdate", function (next) {
  const user = this;
  if (user.getUpdate().password !== undefined) {
    bcrypt.hash(user.getUpdate().password, 8, (err, hash) => {
      if (err) return next(err);
      user.getUpdate().password = hash;
      return next();
    });
  } else {
    return next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
