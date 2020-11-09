# nodejs-mysql-aws-beanstalk

An example NodeJS-ExpressJS-MySQL CRUD application deployable to AWS Elastic Beanstalk. This repo has a sister repo is at [DigiPie/nodejs-mysql-cloudformation](https://github.com/DigiPie/nodejs-mysql-cloudformation).

Read more at: 

- [Node.js, Express & MySQL: Simple Add, Edit, Delete, View (CRUD)](http://blog.chapagain.com.np/node-js-express-mysql-simple-add-edit-delete-view-crud/).
- [amazon-archives/startup-kit-nodejs](https://github.com/amazon-archives/startup-kit-nodejs).

## Launch using AWS Cloudformation

To create an Elastic Beanstalk app on AWS using this code and Cloudformation:

1. Launch the `vpc.cfn.yml`, `bastion.cfn.yml`, and `db.cfn.yml` stacks in [DigiPie/nodejs-mysql-cloudformation](https://github.com/DigiPie/nodejs-mysql-cloudformation).

2. Connect to your RDS database with a database client. For an example of how to connect
to a database in a private subnet using a bastion host, see the following blog post:
https://aws.amazon.com/blogs/startups/building-a-vpc-with-the-aws-startup-kit/.

3. Then, execute the following script:
    ```sql
    create database test;

    use test;

    CREATE TABLE users (
      id int(11) NOT NULL auto_increment,
      name varchar(100) NOT NULL,
      age int(3) NOT NULL,
      email varchar(100) NOT NULL,
      PRIMARY KEY (id)
    );
    ```

4. Zip the code by running the following command inside the top level directory containing the source code:
    ```shell
    npm run zip
    ```

5. Create a S3 bucket and put your zip file on said bucket.
6. Launch the `elastic-beanstalk.cfn.yml` stack in [DigiPie/nodejs-mysql-cloudformation](https://github.com/DigiPie/nodejs-mysql-cloudformation), and fill in parameters as follows:

      - Pick a relevant stack name.
      - For `AppS3Bucket`, enter the name of the S3 bucket that contains your zip file.
      - For `AppS3Key`, enter the name of your zip file (by default: `nodejs-mysql-crud.zip`).
      - For `NetworkStackName`, enter the name of the `vpc.cfn.yml` stack you created.
      - For `DatabaseStackName` enter the name of the `db.cfn.yml` stack you created.
      - IMPORTANT: before clicking the Create button in the CloudFormation console, go to the Capabilities section just above the button, and be sure you have checked the checkbox acknowledging that IAM resources will be created.
7. Visit your application at `Output > EnvironmentURL`.

## CI/CD

To deploy your application to AWS Elastic Beanstalk automatically on push to `master`, see [.github/workflows/main.yml](.github/workflows/main.yml). You will need to set the secrets: `AWS_ACCESS_KEY`, `AWS_SECRET_KEY`, `APP_NAME`, `ENV_NAME` and `AWS_REGION`.

See [Yashwardhan Pauranik's Medium article on 'Deploy to Beanstalk using GitHub Actions'](https://medium.com/commutatus/deploy-to-beanstalk-using-github-actions-20c03e094bf9) for more information.