# AWS Cost Monitoring Setup Guide

Setting up billing alerts is **CRITICAL** to avoid unexpected charges on your AWS account.

## 🚨 Why This Matters

AWS Free Tier has limits, and exceeding them can result in charges. Setting up alerts helps you:
- Monitor your usage
- Get notified before charges occur
- Stay within free tier limits
- Avoid surprise bills

---

## Step 1: Enable Billing Alerts

1. Sign in to AWS Console as **root user** (not IAM user)
2. Click your account name (top right) → **Account**
3. Scroll to **IAM user and role access to Billing information**
4. Click **Edit**
5. Check **Activate IAM Access**
6. Click **Update**

---

## Step 2: Set Up CloudWatch Billing Alarm

### Using AWS Console:

1. Go to **CloudWatch** service
2. In the left menu, click **Alarms** → **Billing**
3. Click **Create alarm**

### Configure Alarm:

1. **Select metric**:
   - Click **Select metric**
   - Choose **Billing** → **Total Estimated Charge**
   - Select **USD**
   - Click **Select metric**

2. **Set threshold**:
   - Threshold type: **Static**
   - Whenever EstimatedCharges is: **Greater**
   - Than: `5` (or your preferred threshold)

3. **Configure notification**:
   - Create new SNS topic
   - Topic name: `BillingAlert`
   - Email: `your-email@example.com`
   - Click **Create topic**

4. **Name and description**:
   - Alarm name: `BillingAlert-5USD`
   - Description: `Alert when charges exceed $5`

5. Click **Create alarm**

6. **Verify email**: Check your inbox and confirm SNS subscription

---

## Step 3: Set Multiple Thresholds (Recommended)

Create additional alarms for different amounts:

| Alarm Name | Threshold | Purpose |
|------------|-----------|---------|
| `BillingAlert-1USD` | $1 | Early warning |
| `BillingAlert-5USD` | $5 | Moderate alert |
| `BillingAlert-10USD` | $10 | Critical alert |

---

## Step 4: Monitor Your Usage

### Check Current Charges:

1. Go to **Billing Dashboard**
2. View **Month-to-Date Spend**
3. Check **Free Tier Usage**

### View Free Tier Details:

1. In Billing Dashboard, click **Free Tier**
2. See usage for:
   - EC2 hours
   - S3 storage
   - Data transfer
   - Elastic Beanstalk

---

## Step 5: Set Up Budget (Alternative Method)

AWS Budgets provide more detailed tracking:

1. Go to **AWS Budgets** in Billing console
2. Click **Create budget**
3. Choose **Cost budget**
4. Set budget amount: `$10/month`
5. Add alert thresholds:
   - 50% of budget ($5)
   - 80% of budget ($8)
   - 100% of budget ($10)
6. Enter email for notifications
7. Create budget

---

## 🎯 Recommended Alert Setup

```
Alert 1: $0.01   → "Any charges detected"
Alert 2: $5.00   → "Warning - Review usage"
Alert 3: $10.00  → "Critical - Take action"
```

---

## 💰 Expected AWS Free Tier Costs

### If Everything Stays in Free Tier: $0
- 1 EC2 t2.micro instance (750 hrs/month) = $0
- Elastic Beanstalk environment = $0
- Basic monitoring = $0

### Possible Charges (if exceeded):
- **EC2 t2.micro**: ~$8.50/month if you exceed 750 hours
- **Elastic Load Balancer**: $16-18/month (optional, can disable)
- **Data Transfer**: Usually free for first 15GB
- **S3 Storage**: Usually pennies

### Most Common Free Tier Violations:
1. Running 2+ EC2 instances simultaneously
2. Using instance types other than t2.micro/t3.micro
3. Enabling auto-scaling (creates multiple instances)
4. Using Application Load Balancer beyond free tier

---

## 🛡️ How to Stay Within Free Tier

### For Elastic Beanstalk:

1. **Use single instance**:
   ```powershell
   eb create myapp --single
   ```

2. **Use t2.micro or t3.micro**:
   ```powershell
   eb create myapp --instance-type t2.micro
   ```

3. **Disable auto-scaling**:
   - EB Console → Configuration → Capacity
   - Set Min: 1, Max: 1

4. **Stop environment when not needed**:
   ```powershell
   eb terminate myapp-env
   ```

5. **Use environment links** instead of load balancers

---

## 📊 Monthly Cost Checklist

Run this checklist monthly:

- [ ] Check Billing Dashboard
- [ ] Review Free Tier usage
- [ ] Verify only 1 EC2 instance running
- [ ] Confirm no unused resources
- [ ] Check S3 bucket sizes
- [ ] Review CloudWatch alarm status
- [ ] Terminate test environments

---

## 🚨 If You Get Charged Unexpectedly

1. **Stop all services immediately**:
   ```powershell
   eb terminate <environment-name>
   ```

2. **Check what's running**:
   - EC2 Dashboard → Instances
   - S3 → Buckets
   - RDS → Databases

3. **Contact AWS Support**:
   - First-time users can often get charges waived
   - Use AWS Support chat (available for all accounts)

4. **Set up billing alerts** (if not done already)

---

## 🎓 Cost Optimization Tips

1. **Development**: Use EB only when testing
2. **Production**: Keep GitHub Pages for free hosting
3. **Testing**: Terminate EB environment after demo
4. **Monitoring**: Check billing daily for first month
5. **Cleanup**: Delete unused S3 buckets and snapshots

---

## 📱 AWS Console Mobile App

Download the AWS Console app to monitor costs on the go:
- Available for iOS and Android
- Check billing anytime
- Get push notifications for alarms

---

## ✅ Verification Steps

After setup, verify:
1. [ ] Billing alerts are active
2. [ ] Email confirmed for SNS notifications
3. [ ] Test alarm by setting threshold to $0.01
4. [ ] Received test email
5. [ ] Reset threshold to desired amount

---

## 📞 Support Resources

- **AWS Free Tier FAQ**: https://aws.amazon.com/free/free-tier-faqs/
- **AWS Support**: https://console.aws.amazon.com/support/
- **Billing Help**: https://docs.aws.amazon.com/awsaccountbilling/

---

**Remember**: It's easier to prevent charges than to dispute them! 💡

Set up these alerts **NOW** before deploying anything to AWS.
