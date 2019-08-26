// used for MongoDB schemas
const mongoose = require("mongoose");
const { Schema } = mongoose;

const urlSchema = new Schema({
  originalUrl: String, 
  shortUrl: String,
  urlCode: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model("UrlShortener", urlSchema);