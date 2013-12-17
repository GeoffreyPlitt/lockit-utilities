
var debug = require('debug')('lockit-utils');
// lockit-login attaches username and email to req.session

// restrict routes to users who are logged in
exports.restrict = function(config) {
    
  // use empty object when no config provided
  config = config || {};
  
  // use default route when none specified
  var route = config.loginRoute || '/login';
  
  // simple restrict function from express auth example
  return function(req, res, next) {
    if (req.session.username && req.session.email) {
      debug('session found - username: %s, email: %s', req.session.username, req.session.email);
      next();
    } else {
      debug('no session found -> redirecting to %s', route);
      // redirect to login page but save url the user really wanted to visit
      // lockit-login will make use of this
      req.session.redirectUrlAfterLogin = req.url;
      // tell login route that user was redirected
      req.session.restrictCalled = true;
      // redirect user
      res.redirect(route);
    }
  };
  
};