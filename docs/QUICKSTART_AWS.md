# 🚀 AWS Deployment - Quick Start Guide

This is a **simplified, step-by-step guide** to deploy your React app to AWS. Follow these steps in order.

---

## 📋 Prerequisites

Before you begin, make sure you have:
- ✅ AWS Free Tier account created and verified
- ✅ Email access (for AWS verification)
- ✅ Your React app running locally

---

## 🎯 Fastest Path: 5 Simple Steps

### Step 1: Install AWS CLI

**On Windows PowerShell:**
```powershell
# Download and install
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

# After installation, restart PowerShell and verify
aws --version
```

Expected output: `aws-cli/2.x.x ...`

---

### Step 2: Install Elastic Beanstalk CLI

```powershell
pip install awsebcli

# Verify
eb --version
```

Expected output: `EB CLI 3.x.x ...`

---

### Step 3: Configure AWS Credentials

```powershell
aws configure
```

You'll need to provide:

1. **AWS Access Key ID**: 
   - Go to AWS Console → IAM → Users → Your Username → Security credentials
   - Click "Create access key" → Choose "CLI" → Create
   - Copy the Access Key ID

2. **AWS Secret Access Key**: 
   - Copy this immediately (shown only once!)
   
3. **Default region name**: 
   - Type: `us-east-1` (recommended)
   
4. **Default output format**: 
   - Type: `json`

---

### Step 4: Initialize and Create EB Environment

**Navigate to your project:**
```powershell
cd \\wsl.localhost\Ubuntu\home\christo\Learning\Docker\frontend
```

**Initialize Elastic Beanstalk:**
```powershell
eb init
```

Follow the prompts:
- Region: `us-east-1` (or your choice)
- Application name: `docker-react-app`
- Platform: `Docker`
- Platform branch: `Docker running on 64bit Amazon Linux 2`
- CodeCommit: `n`
- SSH: `y` (recommended)

**Create environment and deploy:**
```powershell
eb create docker-react-env
```

This will:
- Create an EC2 instance
- Set up the environment
- Deploy your Docker container
- Give you a URL

⏱️ **Wait 5-10 minutes** for deployment to complete.

---

### Step 5: Open Your Application

```powershell
eb open
```

Your app will open in the browser! 🎉

**Your AWS URL will be something like:**
`http://docker-react-env.us-east-1.elasticbeanstalk.com`

---

## 🔄 Making Updates

Whenever you change your code:

```powershell
# 1. Make your changes to the code

# 2. Deploy to AWS
eb deploy

# 3. Wait 2-3 minutes

# 4. Open to see changes
eb open
```

---

## 📊 Useful Commands

### Check status
```powershell
eb status
```

### View logs
```powershell
eb logs
```

### Check health
```powershell
eb health
```

### List environments
```powershell
eb list
```

### Open in browser
```powershell
eb open
```

---

## 🛑 Stop/Terminate Environment (To Avoid Charges)

When you're done testing and want to stop AWS to avoid charges:

```powershell
eb terminate docker-react-env
```

Type `docker-react-env` to confirm.

---

## 💰 Cost Check

To make sure you're not being charged:

1. Go to AWS Console → Billing Dashboard
2. Check "Month-to-Date Spend"
3. Should show $0 if within free tier

**Set up billing alerts!** See `AWS_COST_MONITORING.md`

---

## 🎯 Deployment Summary

After following these steps:

| Deployment | URL | Branch | Status |
|------------|-----|--------|--------|
| GitHub Pages | `christocdas0.github.io/docker-react` | `master` | ✅ Active |
| AWS Elastic Beanstalk | `docker-react-env.us-east-1.elasticbeanstalk.com` | `dev` | ✅ Active |

Both deployments work independently! 🎉

---

## 🆘 Troubleshooting

### Problem: "aws: command not found"
**Solution**: Restart PowerShell after AWS CLI installation

### Problem: "pip: command not found"
**Solution**: 
```powershell
# Install Python first
choco install python

# Then install EB CLI
pip install awsebcli
```

### Problem: "The security token included in the request is invalid"
**Solution**: Run `aws configure` again with correct credentials

### Problem: "Application health is Red"
**Solution**: 
```powershell
eb logs
```
Check logs for errors. Usually a port or build issue.

### Problem: "CNAME already exists"
**Solution**: Choose a different environment name that's globally unique

---

## ✅ Success Checklist

After deployment, verify:
- [ ] `eb status` shows "Green" health
- [ ] `eb open` opens your app in browser
- [ ] App loads correctly
- [ ] All features work
- [ ] AWS Billing shows $0 (if in free tier)
- [ ] Billing alerts are set up

---

## 📚 Next Steps

1. **Set up billing alerts** → See `AWS_COST_MONITORING.md`
2. **Automate with GitHub Actions** → See `GITHUB_SECRETS_SETUP.md`
3. **Custom domain** → Use Route 53 or your domain provider
4. **SSL certificate** → Enable HTTPS in EB configuration

---

## 🎓 Learning Resources

- **Full Guide**: See `AWS_DEPLOYMENT.md`
- **Cost Guide**: See `AWS_COST_MONITORING.md`
- **CI/CD Setup**: See `GITHUB_SECRETS_SETUP.md`
- **AWS Documentation**: https://docs.aws.amazon.com/elasticbeanstalk/

---

## 🎉 Congratulations!

Your React app is now deployed to AWS! 

**What you've achieved:**
✅ Professional AWS deployment  
✅ Docker containerization in production  
✅ Scalable infrastructure  
✅ Free tier usage  
✅ Multiple deployment targets  

---

**Need help?** Check the detailed guides or ask for assistance!
