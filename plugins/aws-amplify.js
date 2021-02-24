import Vue from 'vue'
import '@aws-amplify/ui-vue'
import Amplify, {
  Auth
} from 'aws-amplify'
Amplify.configure({
  Auth: {
    region: 'EU-WEST-1',
    userPoolId: process.env.userPoolId,
    userPoolWebClientId: process.env.userPoolWebClientId,
    mandatorySignIn: false,
    oauth: {
      scope: ['email', 'openid'],
      redirectSignIn: `https://${process.env.rootDomain}/`,
      redirectSignOut: `https://${process.env.rootDomain}/`,
      responseType: 'code'
    }
  },
  API: {
    endpoints: [{
      name: 'UserAPI',
      endpoint: `https://${process.env.userApiDomain}`,
      custom_header: async () => {
        return {
          Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
        }
      }
    }]
  }
})
Vue.prototype.$Amplify = Amplify
