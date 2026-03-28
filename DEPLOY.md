# Deployment Guide — Suritargets

## Prerequisites
- Node.js 20+ on server
- PM2: `npm install -g pm2`
- Nginx installed and configured
- MariaDB running with database created

## First Deploy

1. **Clone and install**
   ```bash
   git clone <repo> /var/www/suritargets
   cd /var/www/suritargets
   npm ci --production=false
   ```

2. **Environment**
   ```bash
   cp .env.example .env.local
   nano .env.local   # fill in all values
   ```

3. **Database migration**
   ```bash
   npm run migrate
   ```

4. **Build**
   ```bash
   npm run build
   ```

   Copy static files for standalone output:
   ```bash
   cp -r public .next/standalone/
   cp -r .next/static .next/standalone/.next/
   ```

5. **PM2**
   Update `cwd` in `ecosystem.config.js` to `/var/www/suritargets`, then:
   ```bash
   pm2 start ecosystem.config.js --env production
   pm2 save
   pm2 startup
   ```

6. **Nginx**
   ```bash
   sudo cp nginx.conf.example /etc/nginx/sites-available/suritargets
   sudo nano /etc/nginx/sites-available/suritargets  # update paths
   sudo ln -s /etc/nginx/sites-available/suritargets /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```

## Updates

```bash
git pull
npm ci --production=false
npm run build
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
pm2 restart suritargets
```

## Logs

```bash
pm2 logs suritargets
pm2 monit
```
