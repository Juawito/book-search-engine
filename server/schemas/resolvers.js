const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id);
                return user;
            }
            throw new AuthenticationError('Not logged In');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            };
            const passCheck = await user.isCorrectPassword(password);
            if (!passCheck) {
                throw new AuthenticationError('Incorrect credentials');
            };

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            if (context.user) {
                const saveBookToUser = User.findByIdAndUpdate({ _id: context.user.id },
                    {
                        $addToSet: { savedBooks: args }
                    },
                    { new: true, runValidators: true }
                );
                return saveBookToUser;
            }
            throw new AuthenticationError('Not Logged In!');
        },
        removeBook: async (parent, args, context) => {
            if (context.user) {
                const removeBookFromUser = User.findByIdAndUpdate({ _id: context.user.id },
                    {
                        $pull: { savedBooks: { bookId: args } }
                    },
                    { new: true }
                );
                return removeBookFromUser;
            }
            throw new AuthenticationError('Not Logged In!')
        }
    }
};

module.exports = resolvers;