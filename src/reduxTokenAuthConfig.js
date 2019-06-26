import { generateAuthActions } from 'redux-token-auth'

const loc = 'http://localhost:3002/api/v1/auth'
const her = 'https://being-stockholm.herokuapp.com/api/v1/auth'

const config = {
  authUrl: her,
  userAttributes: {
    uid: 'uid',
    id: 'id',
    admin: 'admin'
  },
  userRegistrationAttributes: {
    password_confirmation: 'password_confirmation',
    level: 'level'
  },
}

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
}