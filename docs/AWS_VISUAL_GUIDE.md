# 🎯 AWS Deployment - Visual Workflow

This visual guide shows exactly what happens during AWS deployment.

---

## 📊 Deployment Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     YOUR DEVELOPMENT MACHINE                     │
│                                                                  │
│  ┌──────────────┐                                               │
│  │  Your Code   │                                               │
│  │  (Frontend)  │                                               │
│  └──────┬───────┘                                               │
│         │                                                        │
│         ├─── git push origin master ───┐                        │
│         │                               │                        │
│         └─── git push origin dev ───────┼────┐                  │
└─────────────────────────────────────────┼────┼──────────────────┘
                                          │    │
                    ┌─────────────────────┘    └──────────────────┐
                    │                                              │
                    ▼                                              ▼
      ┌─────────────────────────┐              ┌──────────────────────────┐
      │   GITHUB (master)       │              │   GITHUB (dev)           │
      │                         │              │                          │
      │  Triggers:              │              │  Triggers:               │
      │  gh-pages.yml           │              │  aws-deploy.yml          │
      └────────┬────────────────┘              └──────────┬───────────────┘
               │                                          │
               ▼                                          ▼
      ┌─────────────────────────┐              ┌──────────────────────────┐
      │  GITHUB ACTIONS         │              │  GITHUB ACTIONS          │
      │  (Workflow)             │              │  (Workflow)              │
      │                         │              │                          │
      │  1. npm install         │              │  1. npm install          │
      │  2. npm run build       │              │  2. npm run build        │
      │  3. Deploy to gh-pages  │              │  3. Create zip           │
      │                         │              │  4. Deploy to AWS EB     │
      └────────┬────────────────┘              └──────────┬───────────────┘
               │                                          │
               ▼                                          ▼
      ┌─────────────────────────┐              ┌──────────────────────────┐
      │  GITHUB PAGES           │              │  AWS ELASTIC BEANSTALK   │
      │  (Static Hosting)       │              │  (Docker Container)      │
      │                         │              │                          │
      │  URL:                   │              │  URL:                    │
      │  christocdas0.github.io │              │  docker-react-env.       │
      │  /docker-react          │              │  us-east-1.              │
      │                         │              │  elasticbeanstalk.com    │
      └─────────────────────────┘              └──────────────────────────┘
               │                                          │
               │                                          │
               ▼                                          ▼
      ┌─────────────────────────┐              ┌──────────────────────────┐
      │   END USERS             │              │   END USERS              │
      │   (Free Forever)        │              │   (Free for 12 months)   │
      └─────────────────────────┘              └──────────────────────────┘
```

---

## 🔄 Detailed AWS Deployment Steps

### Manual Deployment

```
YOU (Developer)
    |
    | $ eb init
    ▼
┌─────────────────────────┐
│ Elastic Beanstalk CLI   │  Creates .elasticbeanstalk/config.yml
└───────────┬─────────────┘
            |
            | $ eb create docker-react-env
            ▼
┌─────────────────────────┐
│ AWS Elastic Beanstalk   │  Provision Resources:
│ Service                 │  • Creates EC2 instance (t2.micro)
└───────────┬─────────────┘  • Sets up Security Groups
            |                • Configures Load Balancer
            |                • Creates S3 bucket for versions
            ▼
┌─────────────────────────┐
│ EC2 Instance            │  Install Docker & Dependencies
│ (Amazon Linux 2)        │  
└───────────┬─────────────┘
            |
            | Pull & Build
            ▼
┌─────────────────────────┐
│ Docker Container        │  1. FROM node:18-alpine
│ (Your App)              │  2. COPY package.json
└───────────┬─────────────┘  3. RUN npm install
            |                4. COPY source code
            |                5. RUN npm run build
            ▼                6. FROM nginx:alpine
┌─────────────────────────┐  7. COPY build/ to nginx
│ Nginx Web Server        │  8. EXPOSE 80
│ (Production)            │  9. START nginx
└───────────┬─────────────┘
            |
            | Port 80
            ▼
┌─────────────────────────┐
│ Application Load        │  Route traffic
│ Balancer (Optional)     │  Health checks
└───────────┬─────────────┘  SSL termination
            |
            ▼
        INTERNET
            |
            ▼
    ┌───────────┐
    │  USERS    │
    └───────────┘
```

---

## 🔧 Component Breakdown

### 1. Your Local Machine
```
├── Source Code (React)
├── Dockerfile.aws (Build instructions)
├── .elasticbeanstalk/ (EB config)
└── deploy-aws.ps1 (Deployment script)
```

### 2. AWS Elastic Beanstalk
```
Application: docker-react-app
    └── Environment: docker-react-env
            ├── EC2 Instance (t2.micro)
            ├── Security Group (Port 80)
            ├── S3 Bucket (App versions)
            └── CloudWatch (Logs & monitoring)
```

### 3. Docker Container
```
Container Running:
    ├── Nginx (Web server)
    ├── React Build (Static files)
    └── Health Check (AWS monitoring)
```

---

## 📡 Data Flow: User Request

```
User enters URL in browser
    ↓
DNS resolves to AWS
    ↓
Elastic Load Balancer (if configured)
    ↓
EC2 Instance (Security Group check)
    ↓
Docker Container (Port 80)
    ↓
Nginx serves request
    ↓
React App (index.html + assets)
    ↓
Response sent back to user
    ↓
Page renders in browser
```

---

## 💰 Cost Breakdown (Free Tier)

```
AWS Free Tier (12 months):
    ├── EC2 t2.micro: 750 hours/month  ──→ $0.00
    ├── Elastic Load Balancer: Limited ──→ $0.00 *
    ├── S3 Storage: 5GB               ──→ $0.00
    ├── Data Transfer: 15GB/month     ──→ $0.00
    └── CloudWatch: Basic monitoring   ──→ $0.00
                                           ─────
    Total: $0.00 (if within limits)

* Note: Application Load Balancer may incur charges
         Use --single flag to avoid it
```

---

## 🔐 Security Flow

```
AWS IAM User (You)
    ├── Access Key ID
    └── Secret Access Key
        ↓
    Stored in:
        ├── Local: ~/.aws/credentials
        └── GitHub: Repository Secrets
            ↓
        Used by:
            ├── AWS CLI
            ├── EB CLI
            └── GitHub Actions
                ↓
            Permissions Required:
                ├── AWSElasticBeanstalkFullAccess
                ├── AmazonEC2FullAccess
                └── AmazonS3FullAccess
```

---

## 🔄 Update Deployment Flow

```
You make code changes
    ↓
git add . && git commit -m "Updates"
    ↓
git push origin dev
    ↓
┌─────────────────────────┐
│ GitHub Actions Trigger  │ (Automatic)
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ Build Process           │ npm install + build
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ Create Deployment Zip   │ All files packaged
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ Upload to EB            │ New version created
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ EB Deploys New Version  │ Rolling deployment
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ Health Check            │ Verify app running
└───────────┬─────────────┘
            ▼
    Deployment Complete ✅
```

---

## 🎯 Branch Strategy

```
Repository: docker-react
    |
    ├── master branch
    │       ↓
    │   ┌─────────────────┐
    │   │ GitHub Actions  │
    │   │ (gh-pages.yml)  │
    │   └────────┬────────┘
    │            ▼
    │   ┌─────────────────┐
    │   │ GitHub Pages    │
    │   │ (Production)    │
    │   └─────────────────┘
    │
    └── dev branch
            ↓
        ┌─────────────────┐
        │ GitHub Actions  │
        │ (aws-deploy.yml)│
        └────────┬────────┘
                 ▼
        ┌─────────────────┐
        │ AWS EB          │
        │ (Testing/Demo)  │
        └─────────────────┘
```

**No conflicts! Each branch has its own deployment!**

---

## 📊 Monitoring & Logs

```
AWS CloudWatch
    ├── Application Logs
    │   └── /var/log/eb-engine.log
    │
    ├── Web Server Logs
    │   └── /var/log/nginx/access.log
    │
    ├── Docker Logs
    │   └── Container output
    │
    └── Metrics
        ├── CPU Utilization
        ├── Network In/Out
        ├── Request Count
        └── HTTP Status Codes
```

**Access via:**
- `eb logs` (CLI)
- AWS Console → CloudWatch
- EB Console → Logs

---

## 🆘 Troubleshooting Flow

```
Issue Detected
    ↓
Check: eb health
    ↓
Status: Red/Yellow?
    ↓
Get logs: eb logs
    ↓
Common Issues:
    ├── Port mismatch → Check Dockerfile (EXPOSE 80)
    ├── Build fails → Check npm build locally
    ├── Health check fails → Verify app starts
    └── Permission denied → Check IAM permissions
        ↓
Fix code/config
    ↓
Redeploy: eb deploy
    ↓
Verify: eb health
    ↓
Success! ✅
```

---

## 🎓 Learning Path Visual

```
Week 1: Manual Deployment
    ├── Day 1: Read QUICKSTART_AWS.md
    ├── Day 2: Install AWS CLI + EB CLI
    ├── Day 3: Deploy manually (eb init, eb create)
    ├── Day 4: Test updates (eb deploy)
    └── Day 5: Monitor costs

Week 2: Automation
    ├── Day 1: Read GITHUB_SECRETS_SETUP.md
    ├── Day 2: Configure GitHub secrets
    ├── Day 3: Test GitHub Actions
    ├── Day 4: Refine workflow
    └── Day 5: Full CI/CD pipeline

Week 3: Optimization
    ├── Day 1: Custom domain
    ├── Day 2: HTTPS/SSL
    ├── Day 3: Performance tuning
    ├── Day 4: Cost optimization
    └── Day 5: Documentation
```

---

## 🎉 Success Visualization

```
Before:
    └── GitHub Pages Only
            └── Limited to static hosting

After:
    ├── GitHub Pages (master)
    │       └── Production deployment
    │
    └── AWS Elastic Beanstalk (dev)
            ├── Docker support ✅
            ├── Professional infrastructure ✅
            ├── Cloud experience ✅
            ├── Portfolio piece ✅
            └── Scalable architecture ✅
```

---

## 📱 Quick Reference Commands

```powershell
# Setup
aws configure              # Configure AWS credentials
eb init                    # Initialize EB
eb create myapp           # Create environment

# Deploy
eb deploy                 # Deploy current code
eb open                   # Open app in browser

# Monitor
eb status                 # Check status
eb health                 # Check health
eb logs                   # View logs

# Manage
eb list                   # List environments
eb terminate myapp        # Delete environment
eb ssh                    # SSH into instance

# Info
aws --version            # Check AWS CLI version
eb --version             # Check EB CLI version
aws sts get-caller-identity  # Check AWS identity
```

---

This visual guide helps you understand:
- ✅ How components connect
- ✅ Where your code goes
- ✅ What AWS provisions
- ✅ How updates flow
- ✅ Where costs come from
- ✅ How to troubleshoot

**Ready to deploy?** Start with `QUICKSTART_AWS.md`! 🚀
