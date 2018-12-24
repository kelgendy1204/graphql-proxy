export const typeDefs = `
    type User {
        type: String!
        id: ID!
        email: String
        firstName: String
        middleName: String
        lastName: String
        birthDate: String
        gender: String
        photo: String
        thumbnail: String
        postalCode: String
        primaryPhone: String
        otherPhone: String
        joinedAt: String
        lastLogin: String
        lastUpdate: String
        residenceArea: Area
        residenceCity: City
        residenceCountry: Country
        homeCountry: Country
        status: UserAccountStatus
    }
`;
