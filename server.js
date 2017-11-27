//ger our requirement
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var searchTerm = require('./models/searchTerm');
app.use(bodyParser.json());
app.use(cors());

const GoogleImages = require('google-images');
const client = new GoogleImages('008883307022641305912:ack9yyubmgg', 'AIzaSyDXLCdnbeDbBvlhJ7vUSZLSvfxeAdrVjhw');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://bauhause:bau0099@ds121456.mlab.com:21456/edgar');

app.get('/api/recentsearches', (req,res, next)=>{
  searchTerm.find({}, (err,data)=>{
  res.send(data);
}).select({ "searchVal": 1, "searchDate" :1, "_id": 0}).sort('-searchDate').limit(10);
});

app.get('/api/imagesearch/:searchVal*', (req,res,next) =>{
  var { searchVal } = req.params;
  var { offset } = req.query;

var data = new searchTerm({
  searchVal,
  searchDate:new Date()
});
data.save(err =>{
  if (err){
    res.send('Error Saving to database');
  }
});
if(!offset){
  offset=0;
}
client.search(searchVal,{offset:offset})
    .then(images => {
      res.json(images);
        });
});

app.listen(process.env.PORT || 3000, ()=>{
  console.log('Port 3000 is Running');
});
