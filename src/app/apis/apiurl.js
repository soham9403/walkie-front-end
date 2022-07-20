export const mode = 'dev'
let domainUrl = ''

switch (mode) {
  case 'local':
    domainUrl = 'http://localhost:8000'
    break
  case 'dev':
    domainUrl = 'https://walkie-backend.herokuapp.com'
    break
}

export default {
  rootUrl: domainUrl,
  signUpUrl: domainUrl + '/api/auth/signup',
  signinUrl: domainUrl + '/api/auth/sign-in',
  reset_token: domainUrl + '/api/auth/reset-token',
  userurl: domainUrl + '/api/app/user'
}
