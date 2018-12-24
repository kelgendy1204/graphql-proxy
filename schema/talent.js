export const typeDefs = `
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
`;
