# GitHub Secrets Configuration for AWS Deployment

To enable automated AWS deployment via GitHub Actions, you need to add the following secrets to your GitHub repository.

## How to Add Secrets

1. Go to your repository on GitHub: `https://github.com/christocdas0/docker-react`
2. Click on **Settings** (top navigation)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add each secret one by one

## Required Secrets

### 1. AWS_ACCESS_KEY_ID
- **Description**: Your AWS Access Key ID
- **How to get it**:
  1. Log in to AWS Console
  2. Go to **IAM** (Identity and Access Management)
  3. Click **Users** → Select your user → **Security credentials** tab
  4. Click **Create access key**
  5. Choose **Command Line Interface (CLI)**
  6. Copy the **Access key ID**

### 2. AWS_SECRET_ACCESS_KEY
- **Description**: Your AWS Secret Access Key
- **How to get it**:
  - This is shown only once when you create the access key
  - Copy it immediately after creating the access key
  - If you lost it, you need to create a new access key

### 3. AWS_REGION
- **Description**: The AWS region where your app will be deployed
- **Value**: `us-east-1` (or your preferred region)
- **Options**:
  - `us-east-1` (N. Virginia) - Most common
  - `us-west-2` (Oregon)
  - `eu-west-1` (Ireland)
  - `ap-south-1` (Mumbai)

### 4. EB_APPLICATION_NAME
- **Description**: Your Elastic Beanstalk application name
- **Value**: `docker-react-app` (or the name you chose during `eb init`)

### 5. EB_ENVIRONMENT_NAME
- **Description**: Your Elastic Beanstalk environment name
- **Value**: `docker-react-env` (or the name you chose during `eb create`)

## Quick Reference Table

| Secret Name | Example Value | Where to Find |
|-------------|---------------|---------------|
| `AWS_ACCESS_KEY_ID` | `AKIAIOSFODNN7EXAMPLE` | IAM → Users → Security credentials |
| `AWS_SECRET_ACCESS_KEY` | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` | Shown when creating access key |
| `AWS_REGION` | `us-east-1` | Your choice of region |
| `EB_APPLICATION_NAME` | `docker-react-app` | From `eb init` or EB Console |
| `EB_ENVIRONMENT_NAME` | `docker-react-env` | From `eb create` or EB Console |

## Important Security Notes

⚠️ **NEVER** commit secrets directly to your repository!  
⚠️ **NEVER** share your AWS Secret Access Key  
⚠️ **ALWAYS** use GitHub Secrets for sensitive information  

## Verification

After adding all secrets:
1. Go to **Actions** tab in your repository
2. You should see the workflow file listed
3. Push to `dev` branch to trigger automatic deployment

## IAM Permissions Required

Your AWS user needs these permissions:
- `AWSElasticBeanstalkFullAccess`
- `AmazonEC2FullAccess` (for EB instances)
- `AmazonS3FullAccess` (for EB storage)

To add permissions:
1. Go to IAM → Users → Your User
2. Click **Add permissions** → **Attach policies directly**
3. Search and attach the above policies

---

## Troubleshooting

### "AccessDenied" error in GitHub Actions
- Check if IAM user has required permissions
- Verify access keys are correct

### "Application not found" error
- Check `EB_APPLICATION_NAME` matches your EB application
- Run `eb list` locally to verify names

### "Environment not found" error
- Check `EB_ENVIRONMENT_NAME` matches your EB environment
- Ensure environment is created before running workflow

---

For more help, see `AWS_DEPLOYMENT.md`
