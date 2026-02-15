# 🚀 Frontend Deployment Troubleshooting

## 📋 Common Deployment Errors & Solutions

### **❌ Error 1: "Build Failed"**
**Solution:**
```bash
# Use production build
npm run build:prod

# Check if all dependencies are installed
npm install

# Clear cache
npm run build -- --force
```

### **❌ Error 2: "Assets Not Found (404)"**
**Fixed:** Added `base: '/'` to vite.config.ts

### **❌ Error 3: "Environment Variables Missing"**
**Solution:** Add these to your deployment platform:

#### **Vercel Environment Variables:**
```
VITE_API_BASE_URL=https://principulse-website.onrender.com/api/v1
VITE_APP_NAME=Principulse
VITE_APP_ENV=production
```

#### **Netlify Environment Variables:**
```
VITE_API_BASE_URL=https://principulse-website.onrender.com/api/v1
VITE_APP_NAME=Principulse
VITE_APP_ENV=production
```

### **❌ Error 4: "CORS Issues"**
**Backend already has CORS configured** ✅

### **❌ Error 5: "Blank Page"**
**Solution:**
```bash
# Check console for errors
# Ensure assets are loading correctly
# Verify API calls are working
```

## 🔧 Deployment Steps

### **For Vercel:**
1. **Push to GitHub**
2. **Connect Vercel to GitHub**
3. **Build Command**: `npm run build:prod`
4. **Output Directory**: `dist`
5. **Add Environment Variables**

### **For Netlify:**
1. **Push to GitHub**
2. **Connect Netlify to GitHub**
3. **Build Command**: `npm run build:prod`
4. **Publish Directory**: `dist`
5. **Add Environment Variables**

### **For Render:**
1. **Push to GitHub**
2. **Create New Web Service**
3. **Build Command**: `npm run build:prod`
4. **Start Command**: `npm start`
5. **Add Environment Variables**

## 🎯 Quick Deploy Commands

```bash
# 1. Test build locally
npm run build:prod

# 2. Test preview locally
npm run preview:prod

# 3. Push to GitHub
git add .
git commit -m "Fix deployment issues"
git push

# 4. Deploy on platform
# (Vercel/Netlify/Render will auto-deploy)
```

## ✅ Pre-Deployment Checklist

- [x] **Build works locally**: `npm run build:prod`
- [x] **Environment variables set**: `.env.production`
- [x] **API endpoint correct**: `https://principulse-website.onrender.com/api/v1`
- [x] **Base path configured**: `vite.config.ts`
- [x] **Build scripts updated**: `package.json`

## 🚨 If Still Failing

### **Check These:**
1. **Node version**: Use Node 18+ 
2. **Dependencies**: All installed correctly
3. **Environment variables**: Correct format
4. **Build output**: Check `dist/` folder
5. **Platform logs**: Read error messages carefully

### **Debug Commands:**
```bash
# Check build output
ls -la dist/

# Test locally
npm run preview:prod

# Check environment
echo $VITE_API_BASE_URL
```

## 🎉 Your Frontend is Ready!

**Build Status**: ✅ Working  
**Environment**: ✅ Configured  
**API**: ✅ Connected  
**Deployment**: ✅ Ready

**Push to GitHub and deploy!** 🚀
