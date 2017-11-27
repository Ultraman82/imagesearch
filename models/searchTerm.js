var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var searchTermSchema = new Schema(
  {
    searchVal: String,
    searchDate: Date
  },
  {timestamps: true}
);

const ModelClass = mongoose.model('searchTerm', searchTermSchema);

module.exports = ModelClass;
