module.exports = {
  apps : [{
    name      : 'fe_seller',
    script    : './bin/www',
    output: './log/out.log',
    error: './log/error.log',
    log: './log/combined.outerr.log',
    log_date_format : "YYYY-MM-DD HH:mm Z",
    watch : true,
    env: {
      PORT: 3000,
      NODE_ENV: 'development'
    },
    env_production : {
      PORT: 80,
      NODE_ENV: 'production'
    }
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
