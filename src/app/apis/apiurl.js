export const mode = 'production'
let domainUrl = ''

switch (mode) {
  case 'local':
    domainUrl = 'http://localhost:8000'
    break;
  case 'dev':
    domainUrl = 'https://walkie-backend.herokuapp.com'
    break;
    case 'production':
      domainUrl = 'https://walkie-backend-production.up.railway.app'
      break;
    default: domainUrl = 'http://localhost:8000';
    break;
}

const apiUrl = {
  rootUrl: domainUrl,
  signUpUrl: domainUrl + '/api/auth/signup',
  signinUrl: domainUrl + '/api/auth/sign-in',
  reset_token: domainUrl + '/api/auth/reset-token',
  userurl: domainUrl + '/api/app/user',
  roomInfo: domainUrl + '/api/app/room-info'
}
export default apiUrl
