
// Request OpenStreetMap credentials for the user
// @param options {optional} 
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
function requestCredential(options, credentialRequestCompleteCallback) {
  
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }
  const config = ServiceConfiguration.configurations.findOne({service: 'openstreetmap'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError());
    return;
  }

  const credentialToken = Random.secret();   
  const loginStyle = OAuth._loginStyle('openstreetmap', config, options);

  // internal url: get request token and redirect to authorization
  const loginPath = '_oauth/openstreetmap/?requestTokenAndRedirect=true'
    + '&state=' + OAuth._stateParam(loginStyle, credentialToken, 
          options && options.redirectUrl);
  const loginUrl = Meteor.absoluteUrl(loginPath);
  
  OAuth.launchLogin({
    loginService: "openstreetmap",
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken 
  });

}

export const OpenStreetMap = { 
  requestCredential,
}
