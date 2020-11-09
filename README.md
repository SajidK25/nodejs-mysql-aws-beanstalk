# nodejs-mysql-aws-beanstalk

An example NodeJS-ExpressJS-MySQL CRUD application deployable to AWS Elastic Beanstalk. 

**See the main repository at [DigiPie/nodejs-mysql-cloudformation](https://github.com/DigiPie/nodejs-mysql-cloudformation).**

## GitHubAction

For GitHub Action, see [.github/workflows/main.yml.example](.github/workflows/main.yml.example). It uses the GitHub Action: [beanstalk-deploy](https://github.com/marketplace/actions/beanstalk-deploy). You will need to rename the file as `main.yml`, and set the secrets: `AWS_ACCESS_KEY`, `AWS_SECRET_KEY`, `APP_NAME`, `ENV_NAME` and `AWS_REGION`.

Make sure your AWS user have sufficient permissions. See this [StackOverflow thread](https://stackoverflow.com/questions/12086198/error-while-deploying-web-application-to-amazon-elastic-beanstalk).

See [Yashwardhan Pauranik's Medium article on 'Deploy to Beanstalk using GitHub Actions'](https://medium.com/commutatus/deploy-to-beanstalk-using-github-actions-20c03e094bf9) for more information.