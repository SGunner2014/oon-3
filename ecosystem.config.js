module.exports = {
  apps : [{
    name: 'api-gateway',
    script: 'apiServe.js'
  }, {
    name: "service-auth",
    script: "./services/auth.js"
  }, {
    name: "service-posts",
    script: "./services/posts.js"
  }, {
    name: "service-web",
    script: "./webServer.js"
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
