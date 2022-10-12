const { v4: uuidv4 } = require('uuid');

class UserService {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async findAllUsers() {
        let users = await this.userRepository.findAll();
        return users;
    }

    async findUserById(userId) {
        let user = await this.userRepository.findById(userId);
        if (!user || !user.Item) {
            throw TypeError(`User ${userId} not found !!!`);
        }
        return user;
    }

    async saveUser(userData) {

        if (!userData.userName || !userData.email) {
            throw new Error("userName and email required params !!!");
        }

        let user = {
            userId: uuidv4(),
            userName: userData.userName,
            email: userData.email,
        };
        user = await this.userRepository.save(user);
        return user;
    }

    async updateUser(userId, userData) {
        try {

            if (!userData.userName && !userData.email) {
                throw new Error("userName or e-mail required params !!!");
            }

            let user = {
                userName: userData.userName,
                email: userData.email,
            };
            await this.userRepository.update(userId, user);
        } catch (error) {
            if (error.name == "ConditionalCheckFailedException") {
                throw TypeError(`User ${userId} not found !!!`);
            }
            throw error;
        }
    }

    async deleteUser(userId) {
        try {
            await this.userRepository.delete(userId);
        } catch (error) {
            if (error.name == "ConditionalCheckFailedException") {
                throw TypeError(`User ${userId} not found !!!`);
            }
            throw error;
        }
    }
};

module.exports = UserService;