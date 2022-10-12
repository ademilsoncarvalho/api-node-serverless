# API Serverless

## Description

Project to implement an API using Serverless Framework, basically it is a serverless API of CRUD users, using nodejs and DynamoDB as a database.

Project ready to publish deployment configurations already created to be published on AWS and use Lambda, Api Gateway and DynamoDB.
It is also configured to run local, in the following guidelines it will be explained.

## Requirements

* Aws CLI (Configured with your credentials)
* NodeJs v16
* Serverless framework

## Running Project

- **First install local DynamoDB**
    ```
    sls dynamodb install
    ```
- **Run server with Serverless Framework(init local server with routes and DynamoDB)**
    ```
    sls offline start
    ```
- **Case necessary, is possible invoke one function**
    ```
    sls invoke local -f listUsers
    ```
    - **With params**
    ```
    sls invoke local -f findUser -d '{"pathParameters":{"userId":"5"}}'
    ```

## Deploy Project
- **For deploy in aws**
    ```
    sls deploy
    ```
- **For information in aws**
    ```
    sls info
    ```
- **For remove stack in aws**
    ```
    serverless remove
    ```