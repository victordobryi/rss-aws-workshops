# Computing Solutions

## **Overview**

Increase the size of an Amazon EC2 Instance to provide better application performance

## **Learn**

### 1. In this solution, you can connect to your Amazon EC2 instance in multiple ways, such as using EC2 Instance Connect from the AWS Management Console.

### 2. You can alse connect to your EC2 instance by using Session Manager, a capability of AWS Systems Manager.

### 3. You can configure the instance metadata service and specify commands in the user-data field to run after the instance launches. This way, you can view metadata details in a web browser.

### 4. EC2 Instances are also accessible through SSH clients by using terminal software on your local device.

### 5. To meet a greater compute performance nned, you can change the EC2 instance size to a larger instance type.

![Alt text](image.png)

## **Practice**

### 1. In the AWS Console interface

- Find EC2
- Select EC2

### 2. In the EC2 interface, select Instances

- Select the instance named AWS Computing Solutions
- Select Details
- View instance details

### 3. In the EC2 interface

- Select Instance Types
- In turn choose:
  - t3.large
  - c5.large
  - r5.large
- Select AWS Computing Solutions instance
- In Details, copy Public IPv4 address

### 4. Open the browser

- Paste Public IPv4 address
- Then get the detailed result about the instance

### 5. In the EC2 interface

- Select Connect
- View Public IP address
- Select Session Manager

![Alt text](image-1.png)

- View Session Manager usage
- Select SSH client
- View information and connect steps
- Select EC2 Instance Connect
- Select Connect

![Alt text](image-2.png)

- After Connect

![Alt text](image-3.png)

### 6. In Command Prompt

Enter cd sample_app
Enter ls
Type tail - lf aws_copute_solutions.log

### 7. In the EC2 interface

- Select Actions
- Select Instance settings
- Select Edit user data
- View information about User data currently associated with this instance
- Select Cancel

![Alt text](image-4.png)

### 8. Return to Amazon EC2 instances interface

- Select Instances
- Select Instance state
- Select Stop instance
- Select Stop
- See Instance state show Stopped
- Select Instance state
- Select Start instance

### 9. In the EC2 interface

- View instance details

## **DIY**

### 1. For this DIY, we do To change the instance type for a new instance configuration

- Go to the AWS Console page, find and select EC2

### 2. In EC2 interface

- Select Instances
- Select Launch instances

### 3. In Choose an Amazon Machine Image (AMI)

- Select Amazon Linux 2 AMI (HVM) - Kernel 5.10, SSD
- Volume Type
- Select Select

### 4. In Choose an Instance Type

- Select m4.large
- Then, select Next: Configure Instance Details

### 5. In Configure Instance Details

- Select VPC
- Select subnet
- Select Next: Add Storage

### 6. In Add Storage, select Next: Add Tags

### 7. In Add Tags, Select Next: Configure Security Group

### 8. In Configure Security Group

- Select Select an existing security group
- Select Security Group ID
- Select Review and Launch

### 9. In Review Instance Launch

- Check again and select Launch

### 10. In Select an existing key pair or create a new key pair

- Select Proceed without a key pair
- Select I acknowledge…
- Select Launch Instances

### 11. Select View Instances

### 12. Copy Instance ID

Congratulations on completing this workshop
