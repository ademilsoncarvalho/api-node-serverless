class UserRespostoy {
    constructor(dynamoClient) {
        this.dynamoClient = dynamoClient;
        this.tableName = "USERS";
    }

    async findById(id) {
        let params = this.getDefaultParamTableName();
        let data = await this.dynamoClient.get({
            ...params,
            Key: {
                userId: id
            }
        }).promise();
        return data;
    }

    async findAll() {
        let params = this.getDefaultParamTableName();
        let data = await this.dynamoClient.scan(params).promise();
        return data;
    }

    async save(userData) {
        let params = this.getDefaultParamTableName();
        await this.dynamoClient.put({
            ...params,
            Item: userData
        }).promise();
        return userData;
    }

    async update(id, userData) {
        let params = this.getDefaultParamTableName();
        await this.dynamoClient.update({
            ...params,
            Key: {
                userId: id
            },
            ConditionExpression: "attribute_exists(userId)",
            UpdateExpression: "set userName = :userName, email= :email ",
            ExpressionAttributeValues: {
                ":userName": userData.userName,
                ":email": userData.email
            }
        }).promise();

        return userData;
    }

    async delete(id) {
        let params = this.getDefaultParamTableName();
        await this.dynamoClient.delete({
            ...params,
            Key: {
                userId: id
            },
            ConditionExpression: "attribute_exists(userId)"
        }).promise();

        return true;
    }

    getDefaultParamTableName() {
        return { "TableName": this.tableName };
    }
}

module.exports = UserRespostoy;