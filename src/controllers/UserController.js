const dynamoDb = require('../database/dynamoClient');
const UserRepository = require('../model/repository/UserRepository');
const UserService = require('../service/UserService');

class UserController {

    constructor() {
        let userRepository = new UserRepository(dynamoDb);
        this.userService = new UserService(userRepository);
    }

    async findUsers() {
        try {
            let users = await this.userService.findAllUsers();
            return {
                statusCode: 200,
                body: JSON.stringify(users.Items),
            };
        } catch (error) {
            console.log(error)
            return {
                statusCode: 400,
                body: JSON.stringify({ "Error": 'Unknown error' }),
            };
        }
    }

    async findUserById(userId) {
        try {
            let user = await this.userService.findUserById(userId);
            return {
                statusCode: 200,
                body: JSON.stringify(user.Item),
            };
        } catch (error) {
            console.log(error)

            if (error instanceof TypeError) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ "Error": error.message }),
                };
            }

            return {
                statusCode: 400,
                body: JSON.stringify({ "Error": 'Unknown error' }),
            };
        }
    }

    async saveUser(userData) {
        try {
            let user = await this.userService.saveUser(userData);
            return {
                statusCode: 201,
                body: JSON.stringify(user),
            };
        } catch (error) {
            console.log(error)

            if (error instanceof Error) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ "Error": error.message }),
                };
            }

            return {
                statusCode: 400,
                body: JSON.stringify({ "Error": 'Unknown error' }),
            };
        }
    }

    async updateUser(userId, userData) {
        try {
            await this.userService.updateUser(userId, userData);
            return {
                statusCode: 204
            };
        } catch (error) {
            console.log(error)

            if (error instanceof Error) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ "Error": error.message }),
                };
            }

            if (error instanceof TypeError) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ "Error": error.message }),
                };
            }

            return {
                statusCode: 400,
                body: JSON.stringify({ "Error": 'Unknown error' }),
            };
        }
    }

    async deleteUser(userId) {
        try {
            await this.userService.deleteUser(userId);
            return {
                statusCode: 204
            };
        } catch (error) {
            console.log(error)

            if (error instanceof TypeError) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ "Error": error.message }),
                };
            }

            return {
                statusCode: 400,
                body: JSON.stringify({ "Error": 'Unknown error' }),
            };
        }
    }

}

module.exports = new UserController;