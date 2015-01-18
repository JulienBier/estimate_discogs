/*
 * Serve JSON to our AngularJS client
 */
var Discogs = require('disconnect').Client;
var _ = require('underscore');
var reqData;
var userAgent = 'EstimationTool/1.0 +https://github.com/JulienBier/estimate_discogs';
var discogsClient;

function createDiscogsClient () {
  // if (!discogsClient)
    discogsClient = new Discogs(userAgent, reqData);

  return discogsClient;
}

exports.collection = function (req, res) {
  var col = createDiscogsClient().user().collection();
  col.releases(req.params.name, 0, {page:1, per_page:75}, function(err, data){
    res.send(data);
  });
};

exports.users = function (req, res) {
  var user = createDiscogsClient().user();
  user.profile(req.params.name, function(err, data){
    res.send(data);
  });
};

exports.release = function (req, res) {
  var database = createDiscogsClient().database();
  database.release(req.params.name, function(err, data) {
    var r = {};
    r.artist = _.pluck(data.artists,'name').join(', ');
    r.title = data.title;
    res.send(r);
  });
};

exports.marketplace = function (req, res) {
  var marketplace = createDiscogsClient().marketplace();
  marketplace.suggestPrice(req.params.releaseid, function(err, data) {
    
  });
};

exports.authorize = function (req, res) {
  createDiscogsClient().getRequestToken(
      'vOXHIKrEiOqbdZGxILdc', 
      'oUiOyhqJuKIAIDQbVymPDNxoeVDYqqdn', 
      'http://127.0.0.1:3000/api/callback', 
      function(err, requestData){
        reqData = requestData;
        // Persist "requestData" here so that the callback handler can 
        // access it later after returning from the authorize url
        res.redirect(requestData.authorizeUrl);
      }
  );
};

exports.callback = function(req, res){
    var dis = createDiscogsClient();
    dis.getAccessToken(
        req.query.oauth_verifier, // Verification code sent back by Discogs
        function(err, accessData){
          console.log('accessData', accessData);
          // Persist "accessData" here for following OAuth calls 
          res.redirect('/home');
        }
    );
};