# Bajaj Hackathon - Deployment Guide

## 🚀 Getting Your Public Webhook URL

The hackathon requires a public URL like: `https://your-webhook-endpoint.com/api/hackrx/run`

Here are **3 quick deployment options** to get your public URL:

## Option 1: Render.com (Recommended - Free)

1. **Create account**: Go to [render.com](https://render.com) and sign up
2. **Connect GitHub**: Link your GitHub account
3. **Push code**: Push this project to a GitHub repository
4. **Deploy**: 
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Render will auto-detect the `render.yaml` file
   - Click "Deploy"

**Your URL will be**: `https://bajaj-hackathon-api.onrender.com/api/v1/hackrx/run`

## Option 2: Railway.app (Fast)

1. Go to [railway.app](https://railway.app)
2. Click "Deploy from GitHub"
3. Connect your repo
4. Railway auto-deploys

**Your URL will be**: `https://your-app-name.up.railway.app/api/v1/hackrx/run`

## Option 3: Heroku (Classic)

1. Install Heroku CLI
2. Run these commands:
```bash
heroku create bajaj-hackathon-api
git add .
git commit -m "Deploy hackathon project"
git push heroku main
```

**Your URL will be**: `https://bajaj-hackathon-api.herokuapp.com/api/v1/hackrx/run`

## 🧪 Testing Your Deployed API

Once deployed, test your public endpoint:

```bash
curl -X POST "https://YOUR-DEPLOYED-URL/api/v1/hackrx/run" \
  -H "Authorization: Bearer 7e3d7d4298f67b2d8e7a6c9e7e4a3f9d09f5e8d4de6e7d5f" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Does this policy cover knee surgery, and what are the conditions?",
    "documents": ["policy_id_123"],
    "options": {
      "include_reasoning": true,
      "max_sources": 5,
      "confidence_threshold": 0.7
    }
  }'
```

## 📋 Submission Checklist

✅ **Backend deployed** with public URL  
✅ **API endpoint working**: `/api/v1/hackrx/run`  
✅ **Authentication working**: Bearer token accepted  
✅ **JSON responses**: Structured format returned  
✅ **All requirements met**: Document processing, semantic search, explainable AI  

## 🎯 Final Submission Format

Submit this URL format to the hackathon:
```
https://your-deployed-app.onrender.com/api/v1/hackrx/run
```

**Authentication Token**: `7e3d7d4298f67b2d8e7a6c9e7e4a3f9d09f5e8d4de6e7d5f`

The judges will test this endpoint with their own queries and evaluate based on the response quality, speed, and structure.