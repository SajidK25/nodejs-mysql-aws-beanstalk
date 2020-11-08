# nodejs-mysql-crud

Node.js, Express & MySQL: Simple Add, Edit, Delete, View (CRUD)

A simple and basic CRUD application (Create, Read, Update, Delete) using Node.js, Express, MySQL & EJS Templating Engine.

Read more at: [Node.js, Express & MySQL: Simple Add, Edit, Delete, View (CRUD)](http://blog.chapagain.com.np/node-js-express-mysql-simple-add-edit-delete-view-crud/).

## Launch using AWS Cloudformation

To create an Elastic Beanstalk app on AWS using this code and Cloudformation:

1. Launch the `vpc.cfn.yml`, `bastion.cfn.yml`, and `db.cfn.yml` stacks in [iac-2-tier-example](https://github.com/DigiPie/iac-2-tier-example).

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
6. Launch the `elastic-beanstalk.cfn.yml` stack in [iac-2-tier-example](https://github.com/DigiPie/iac-2-tier-example), and fill in parameters as follows:

      - Pick a relevant stack name.
      - For `AppS3Bucket`, enter the name of the S3 bucket that contains your zip file.
      - For `AppS3Key`, enter the name of your zip file (by default: `nodejs-mysql-crud.zip`).
      - For `NetworkStackName`, enter the name of the `vpc.cfn.yml` stack you created.
      - For `DatabaseStackName` enter the name of the `db.cfn.yml` stack you created.
      - IMPORTANT: before clicking the Create button in the CloudFormation console, go to the Capabilities section just above the button, and be sure you have checked the checkbox acknowledging that IAM resources will be created.

7. IMPORTANT: Your code will NOT deploy successfully because you have yet to configure the required environment variables. Go to your created `Elastic Beanstalk > Environment > Configuration > Software` and add the following environment variables:

      - `DB_HOST`: Corresponds to `RdsDbURL` of your `db.cfn.yml` stack's Output
      - `DB_USER`: Corresponds to `DbUser` of your `db.cfn.yml` stack's Output
      - `DB_PASSWORD`: Corresponds to `DbPassword` of your `db.cfn.yml` stack's Output
      - `DB_PORT`: Optional, default value of 3306
      - `DB_SCHEMA`: Optional, default value of 'test'

8. After setting these environment variables, go to `Elastic Beanstalk > Application` and re-deploy the uploaded application version.
