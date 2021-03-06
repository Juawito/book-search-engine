const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        savedBooks: [Book]
    }
    type Book {
        bookId: String
        authors: [String]
        description: String
        image: String
        title: String
        link: String
    }
    type Auth {
        token: ID
        user: User
    }
    input BookInput {
        authors: [String]
        bookId: String
        description: String
        image: String
        title: String
        link: String
    }
    type Query {
       me: User 
    }
    type Mutation {
        login(email:String!, password:String!): Auth
        addUser(email:String!, password:String!, username:String!): Auth
        saveBook(authors: [String]!, description: String!, title: String!, bookId: String!, image: String, link: String): User
        removeBook(bookId: String!): User
    }


`;

module.exports = typeDefs;