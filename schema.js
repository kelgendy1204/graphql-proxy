export default `
    type Query {
        talent: Talent!
    }

    type Talent {
        type: String!
        id: ID!
        tagLine: String!
        militaryStatus: String!
        maritalStatus: String!
        numDependants: Int!
        hasDrivingLicence: Boolean!
        hasCar: Boolean!
        otherAchievements: String!
        numOfProfileViews: Int!
        profileMeter: Int!
        cvUploadDate: String!
        hasCv: Boolean!
        cvHref: String!
        cvMeta: String!
        user: User!
        workExperienceYears: WorkExperienceYears!
        educationalDegree: EducationalDegree!
    }

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

    type City {
        type: String!
        id: ID!
        latitude: String
        longitude: String
        name: String!
        translations: String
        browsePage: String
    }

    type Area {
        type: String!
        id: ID!
        latitude: String
        longitude: String
        name: String!
        translations: String
        browsePage: String
    }

    type Country {
        type: String!
        id: ID!
        iso2Code: String
        name: String
        translations: String
    }

    type UserAccountStatus {
        type: String!
        id: ID!
        status: String!
    }

    type WorkExperienceYears {
        type: String!
        id: ID!
        years: String
        translations: String
    }

    type EducationalDegree {
        type: String!
        id: ID!
        name: String!
        translations: String!
    }
`;
