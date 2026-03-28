module.exports = {
  apps: [
    {
      name: 'suritargets',
      script: '.next/standalone/server.js',
      cwd: '/path/to/app',         // Update to actual path on server
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // Keep alive
      watch: false,
      max_memory_restart: '512M',
      error_file: 'logs/pm2-error.log',
      out_file: 'logs/pm2-out.log',
      log_file: 'logs/pm2-combined.log',
      time: true,
    },
  ],
}
