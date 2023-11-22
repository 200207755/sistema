export const environment = {
  production: true,
  // apiUrl: 'link prod',
  // tokenAllowedDomains: [ /link prod sem https/ ],
  // tokenDisallowedRoutes: [/\/oauth\/token/],

  apiUrl: 'http://localhost:8080',
  tokenAllowedDomains: [/localhost:8080/],
  tokenDisallowedRoutes: [/\/oauth\/token/],
};