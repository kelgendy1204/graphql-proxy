import { GraphQLServer } from 'graphql-yoga';
import createAPI, { talentUrl } from './api';
require('dotenv').config();

const api = createAPI('https://api2.basharsys.com');

const typeDefs = `
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
        city: City
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

const resolvers = {
    Query: {
        talent: () => {
            return api
                .get(talentUrl)
                .then(data => {
                    const user = data.included.find(elem => {
                        return elem.type === 'user' && elem.id === data.data.relationships.user.data.id;
                    });

                    const workExperienceYears = data.included.find(elem => {
                        return elem.type === 'workExperienceYears' && elem.id === data.data.relationships.workExperienceYears.data.id;
                    });

                    const educationalDegree = data.included.find(elem => {
                        return elem.type === 'educationalDegree' && elem.id === data.data.relationships.educationalDegree.data.id;
                    });

                    const {
                        data: {
                            id,
                            type,
                            attributes: {
                                tagLine,
                                militaryStatus,
                                maritalStatus,
                                numDependants,
                                hasDrivingLicence,
                                hasCar,
                                otherAchievements,
                                numOfProfileViews,
                                profileMeter,
                                cvUploadDate,
                                hasCv
                            },
                            links: {
                                cvDownload: {
                                    href: cvHref,
                                    meta: cvMeta
                                }
                            }
                        }
                    } = data;
                    return {
                        id,
                        type,
                        tagLine,
                        militaryStatus,
                        maritalStatus,
                        numDependants,
                        hasDrivingLicence,
                        hasCar,
                        otherAchievements,
                        numOfProfileViews,
                        profileMeter,
                        cvUploadDate,
                        hasCv,
                        cvHref,
                        cvMeta,
                        user: {
                            id: user.id,
                            type: user.type,
                            email: user.attributes.email,
                            firstName: user.attributes.firstName,
                            middleName: user.attributes.middleName,
                            lastName: user.attributes.lastName,
                            birthDate: user.attributes.birthDate,
                            gender: user.attributes.gender,
                            photo: user.attributes.photo,
                            thumbnail: user.attributes.thumbnail,
                            postalCode: user.attributes.postalCode,
                            primaryPhone: user.attributes.primaryPhone,
                            otherPhone: user.attributes.otherPhone,
                            joinedAt: user.attributes.joinedAt,
                            lastUpdate: user.attributes.lastUpdate,
                            lastLogin: user.attributes.lastLogin
                        },
                        workExperienceYears: {
                            id: workExperienceYears.id,
                            type: workExperienceYears.type,
                            years: workExperienceYears.attributes.years,
                            translations: workExperienceYears.attributes.translations
                        },
                        educationalDegree: {
                            id: educationalDegree.id,
                            type: educationalDegree.type,
                            name: educationalDegree.attributes.name,
                            translations: educationalDegree.attributes.translations
                        }
                    };
                });
        }
    }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on localhost:4000'));

































// {
    // "included": [
        // {
            // "type": "city",
            // "id": "1540",
            // "attributes": {
                // "name": "Alexandria",
                // "translations": null,
                // "latitude": "31.21170300",
                // "longitude": "29.91916800"
            // },
            // "links": {
                // "browsePage": "a\/Jobs-in-Alexandria"
            // }
        // },
        // {
            // "type": "area",
            // "id": "89",
            // "attributes": {
                // "name": "Abu Qir",
                // "translations": null,
                // "latitude": "31.31408000",
                // "longitude": "30.06057000"
            // },
            // "relationships": {
                // "city": {
                    // "data": {
                        // "type": "city",
                        // "id": "1540"
                    // }
                // }
            // },
            // "links": {
                // "browsePage": "a\/Jobs-in-Abu-Qir"
            // }
        // },
        // {
            // "type": "country",
            // "id": "56",
            // "attributes": {
                // "name": "Egypt",
                // "iso2Code": "EG",
                // "translations": null
            // }
        // },
        // {
            // "type": "country",
            // "id": "57",
            // "attributes": {
                // "name": "El Salvador",
                // "iso2Code": "SV",
                // "translations": null
            // }
        // },
        // {
            // "type": "userAccountStatus",
            // "id": "2",
            // "attributes": {
                // "status": "Active"
            // }
        // },
        // { user
            // "relationships": {
                // "residenceArea": {
                    // "data": {
                        // "type": "area",
                        // "id": "89"
                    // }
                // },
                // "residenceCity": {
                    // "data": {
                        // "type": "city",
                        // "id": "1540"
                    // }
                // },
                // "residenceCountry": {
                    // "data": {
                        // "type": "country",
                        // "id": "56"
                    // }
                // },
                // "homeCountry": {
                    // "data": {
                        // "type": "country",
                        // "id": "57"
                    // }
                // },
                // "status": {
                    // "data": {
                        // "type": "userAccountStatus",
                        // "id": "2"
                    // }
                // }
            // }
        // }
    // ]
// }

