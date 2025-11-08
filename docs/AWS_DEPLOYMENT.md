# AWS Deployment Guide for React Application

This guide will help you deploy your React application to AWS using **AWS Elastic Beanstalk** with Docker. This is the easiest and most cost-effective option for AWS free tier.

---

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ AWS Free Tier account (active)
- ✅ AWS CLI installed on your machine
- ✅ Git installed
- ✅ Your React application running locally

---

## 🎯 Deployment Options for AWS Free Tier

### Option 1: AWS Elastic Beanstalk (Recommended) ⭐
**Best for**: Full-stack applications with Docker support  
**Free Tier**: 750 hours/month of t2.micro or t3.micro instance

### Option 2: AWS Amplify
**Best for**: Static sites and JAMstack apps  
**Free Tier**: 1000 build minutes/month, 15GB storage

### Option 3: Amazon S3 + CloudFront
**Best for**: Static websites only  
**Free Tier**: 5GB storage, 20,000 GET requests/month

---

## 🚀 Method 1: AWS Elastic Beanstalk Deployment (RECOMMENDED)

This method uses your existing Dockerfile and is perfect for containerized applications.

### Step 1: Install AWS CLI

**Windows (PowerShell):**
```powershell
# Download and install AWS CLI
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
```

**Or using Chocolatey:**
```powershell
choco install awscli
```

**Verify installation:**
```powershell
aws --version
```

### Step 2: Install Elastic Beanstalk CLI

```powershell
pip install awsebcli
```

**Verify installation:**
```powershell
eb --version
```

### Step 3: Configure AWS Credentials

```powershell
aws configure
```

You'll be prompted to enter:
- **AWS Access Key ID**: (Get from AWS Console → IAM → Users → Security credentials)
- **AWS Secret Access Key**: (Generated with Access Key)
- **Default region name**: `us-east-1` (or your preferred region)
- **Default output format**: `json`

### Step 4: Initialize Elastic Beanstalk

Navigate to your project directory:
```powershell
cd \\wsl.localhost\Ubuntu\home\christo\Learning\Docker\frontend
```

Initialize EB:
```powershell
eb init
```

Follow the prompts:
1. **Select a region**: Choose `us-east-1` or your preferred region
2. **Application name**: `docker-react-app` (or your preferred name)
3. **Platform**: Select `Docker`
4. **Platform branch**: `Docker running on 64bit Amazon Linux 2`
5. **CodeCommit**: `n` (No)
6. **SSH**: `y` (Yes, for debugging) - Optional

### Step 5: Create Environment

```powershell
eb create docker-react-env
```

Options during creation:
- **Environment name**: `docker-react-env` (or press Enter for default)
- **DNS CNAME prefix**: Your app URL prefix (must be unique globally)
- **Load balancer type**: `application` (press Enter for default)

This will:
- Create an EC2 instance (t2.micro/t3.micro for free tier)
- Set up security groups
- Configure load balancer
- Deploy your application
- Provide you with a URL

**⏱️ This takes 5-10 minutes.**

### Step 6: Access Your Application

Once deployment completes, you'll see:
```
INFO: Successfully launched environment: docker-react-env
INFO: Application available at: docker-react-env.us-east-1.elasticbeanstalk.com
```

Open the URL:
```powershell
eb open
```

---

## 🔄 Updating Your Application

Whenever you make changes:

```powershell
# Commit your changes
git add .
git commit -m "Updated features"

# Deploy to AWS
eb deploy
```

---

## 📊 Monitoring and Management

### Check Environment Status
```powershell
eb status
```

### View Logs
```powershell
eb logs
```

### SSH into Instance (if configured)
```powershell
eb ssh
```

### Check Health
```powershell
eb health
```

---

## 🚀 Method 2: AWS Amplify Deployment

AWS Amplify is great for static React apps and integrates directly with GitHub.

### Step 1: Login to AWS Console

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **"Get Started"** under "Deliver"

### Step 2: Connect Repository

1. Select **GitHub** as your repository provider
2. Authenticate with GitHub
3. Select repository: `christocdas0/docker-react`
4. Select branch: `dev` or `master`

### Step 3: Configure Build Settings

Amplify will auto-detect your React app. The build settings should be:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: build
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Step 4: Review and Deploy

1. Click **"Save and deploy"**
2. Amplify will build and deploy your app
3. You'll get a URL like: `https://dev.d1234567890.amplifyapp.com`

### Step 5: Continuous Deployment

Every push to your connected branch will automatically trigger a new deployment!

---

## 🌐 Method 3: S3 + CloudFront (Static Hosting)

Perfect for production builds hosted as static files.

### Step 1: Build Your Application

```powershell
npm run build
```

### Step 2: Create S3 Bucket

```powershell
# Create bucket (name must be globally unique)
aws s3 mb s3://your-unique-bucket-name

# Enable static website hosting
aws s3 website s3://your-unique-bucket-name --index-document index.html --error-document index.html
```

### Step 3: Upload Build Files

```powershell
aws s3 sync build/ s3://your-unique-bucket-name --acl public-read
```

### Step 4: Configure Bucket Policy

Create a file `bucket-policy.json`:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-unique-bucket-name/*"
    }
  ]
}
```

Apply policy:
```powershell
aws s3api put-bucket-policy --bucket your-unique-bucket-name --policy file://bucket-policy.json
```

### Step 5: Access Your Site

Your site will be available at:
```
http://your-unique-bucket-name.s3-website-us-east-1.amazonaws.com
```

### Step 6: (Optional) Add CloudFront CDN

1. Go to CloudFront console
2. Create distribution
3. Origin: Your S3 bucket
4. Default root object: `index.html`
5. Get CloudFront URL

---

## 🔧 GitHub Actions for Automated AWS Deployment

A separate workflow file has been created: `.github/workflows/aws-deploy.yml`

This workflow will:
- Deploy to AWS Elastic Beanstalk on push to `dev` branch
- Not interfere with your existing GitHub Pages deployment (which runs on `master` branch)

### Required GitHub Secrets

Add these secrets to your repository:
`Settings → Secrets and variables → Actions → New repository secret`

1. **AWS_ACCESS_KEY_ID**: Your AWS access key
2. **AWS_SECRET_ACCESS_KEY**: Your AWS secret key
3. **AWS_REGION**: `us-east-1` (or your region)
4. **EB_APPLICATION_NAME**: `docker-react-app`
5. **EB_ENVIRONMENT_NAME**: `docker-react-env`

---

## 💰 AWS Free Tier Limits

### Elastic Beanstalk
- **EC2**: 750 hours/month of t2.micro (enough for 1 instance 24/7)
- **Elastic Load Balancer**: 750 hours/month
- **After 12 months**: ~$15-25/month if you keep running

### Amplify
- **Build time**: 1000 minutes/month
- **Storage**: 15 GB/month
- **Data transfer**: 15 GB/month
- **Free forever** for these limits

### S3 + CloudFront
- **S3 Storage**: 5 GB/month (12 months)
- **S3 Requests**: 20,000 GET, 2,000 PUT
- **CloudFront**: 50 GB data transfer out/month (12 months)

---

## ⚠️ Important Notes

1. **Cost Monitoring**: Set up billing alerts in AWS Console
   - Go to CloudWatch → Billing → Create Alarm
   - Set threshold to $5 or $10

2. **Auto-Scaling**: Disable auto-scaling to stay in free tier
   - EB environments default to 1 instance

3. **Terminate When Not Needed**:
   ```powershell
   eb terminate docker-react-env
   ```

4. **Multiple Deployments**: Your app can run on:
   - GitHub Pages (master branch) - FREE
   - AWS Elastic Beanstalk (dev branch) - FREE TIER
   - Both work independently!

---

## 🆘 Troubleshooting

### Issue: "Insufficient IAM permissions"
**Solution**: Ensure your IAM user has these policies:
- AWSElasticBeanstalkFullAccess
- AmazonEC2FullAccess
- AmazonS3FullAccess

### Issue: "Application health is Red"
**Solution**: 
```powershell
eb logs
```
Check for port conflicts. Nginx in Docker should expose port 80.

### Issue: "CNAME already exists"
**Solution**: Choose a different DNS CNAME prefix (it must be globally unique)

---

## 📚 Additional Resources

- [AWS Elastic Beanstalk Docs](https://docs.aws.amazon.com/elasticbeanstalk/)
- [AWS Amplify Docs](https://docs.amplify.aws/)
- [AWS Free Tier Details](https://aws.amazon.com/free/)
- [EB CLI Commands](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html)

---

## ✅ Quick Start Summary

**Fastest Method (Elastic Beanstalk):**
```powershell
# 1. Install tools
pip install awsebcli

# 2. Configure AWS
aws configure

# 3. Initialize EB
eb init

# 4. Create and deploy
eb create docker-react-env

# 5. Open your app
eb open
```

**That's it!** Your app is now on AWS! 🎉

---

## 🔄 Deployment Comparison

| Feature | GitHub Pages | AWS EB | AWS Amplify | S3+CloudFront |
|---------|--------------|--------|-------------|---------------|
| Cost | FREE | FREE (12mo) | FREE tier | FREE (12mo) |
| Docker Support | ❌ | ✅ | ❌ | ❌ |
| CI/CD | ✅ | ✅ | ✅ | Manual |
| Custom Domain | ✅ | ✅ | ✅ | ✅ |
| SSL Certificate | ✅ | ✅ | ✅ | ✅ |
| Backend Support | ❌ | ✅ | Limited | ❌ |

---

Need help? Feel free to ask! 🚀
