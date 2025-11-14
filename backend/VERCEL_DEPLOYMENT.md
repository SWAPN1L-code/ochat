# Vercel Deployment Guide for Backend

## Important Notes ⚠️

**Socket.io Limitations**: Vercel uses serverless functions which have limitations with WebSocket connections. Real-time features (Socket.io) may not work properly on Vercel's free tier. For full Socket.io support, consider using:
- Railway
- Render
- Heroku
- AWS Elastic Beanstalk
- DigitalOcean App Platform

## Deployment Steps

### Option 1: Deploy from Backend Directory (Recommended)

1. **Install Vercel CLI** (if not installed):
   ```bash
   npm install -g vercel
   ```

2. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

3. **Login to Vercel**:
   ```bash
   vercel login
   ```

4. **Deploy**:
   ```bash
   vercel
   ```
   
   For production deployment:
   ```bash
   vercel --prod
   ```

5. **Set Environment Variables**:
   After first deployment, go to Vercel Dashboard → Your Project → Settings → Environment Variables
   
   Add all required variables:
   - `NODE_ENV` = `production`
   - `PORT` = (Vercel will set this automatically, but you can set a default)
   - `JWT_SECRET_KEY` = (your secret key)
   - `DB_URL` = (your MongoDB connection string)
   - `DB_NAME` = `ZenChat`
   - `CORS_URL` = (your frontend URL, e.g., `https://your-frontend.vercel.app`)
   - `SERVER_URL` = (your Vercel backend URL after deployment)
   - `TOKEN_ISSUER` = `api.zenchat.com`
   - `TOKEN_AUDIENCE` = `zenchat.com`
   - `ACCESS_TOKEN_VALIDITY_SEC` = `182800`
   - `REFRESH_TOKEN_VALIDITY_SEC` = `604800`
   - `COOKIE_VALIDITY_SEC` = `172800`

### Option 2: Deploy via GitHub Integration

1. **Push your code to GitHub** (if not already)

2. **Go to Vercel Dashboard** → New Project

3. **Import your repository**

4. **Configure Project**:
   - **Root Directory**: Select `backend` folder
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables** (same as above)

6. **Deploy**

## Configuration Files

- `vercel.json`: Already configured for your Express app
- Environment variables should be set in Vercel Dashboard

## Post-Deployment

1. **Update CORS_URL**: Make sure your `CORS_URL` includes your frontend domain
2. **Update SERVER_URL**: Set this to your Vercel backend URL
3. **Test the API**: Visit `https://your-backend.vercel.app/health` to verify deployment

## Troubleshooting

- **Build Fails**: Check that all dependencies are in `package.json`
- **Environment Variables**: Ensure all required variables are set in Vercel Dashboard
- **Socket.io Not Working**: This is expected - use an alternative deployment platform for full WebSocket support
- **Port Issues**: Vercel automatically sets PORT, you don't need to configure it

## Alternative Deployment Options

If you need full Socket.io support, consider:
1. **Railway** (recommended for Socket.io)
2. **Render** (free tier available)
3. **Heroku** (paid plans)
4. **DigitalOcean App Platform**
5. **AWS EC2/Elastic Beanstalk**

