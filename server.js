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
                        cvMeta
                    };
                });
        }
    }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on localhost:4000'));

































// {
    // "data": {
        // "relationships": {
            // "user": {
                // "data": {
                    // "type": "user",
                    // "id": "33"
                // }
            // },
            // "workExperienceYears": {
                // "data": {
                    // "type": "workExperienceYears",
                    // "id": "8"
                // }
            // },
            // "educationalDegree": {
                // "data": {
                    // "type": "educationalDegree",
                    // "id": "7"
                // }
            // }
        // },
        // "links": {
            // "cvDownload": {
                // "href": "https:\/\/api2.basharsys.com\/talent\/cv\/download",
                // "meta": "downloud your cv from this link"
            // }
        // }
    // },
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
        // {
            // "type": "user",
            // "id": "33",
            // "attributes": {
                // "email": "Sherif.Mohamed.Medhat@gmail.com",
                // "firstName": "Sherifsherif",
                // "middleName": "Mohamedmohamed",
                // "lastName": "MedhatMedhatMohamed",
                // "birthDate": "01\/26\/1990 00:00:00",
                // "gender": "male",
                // "photo": "https:\/\/wuzzuf-testing.s3.eu-west-1.amazonaws.com\/files\/upload_pic\/326d145223ae64e06ba44de69a361e23.PNG",
                // "thumbnail": "https:\/\/wuzzuf-testing.s3.eu-west-1.amazonaws.com\/files\/upload_pic\/thumb_1cf64c50293cb1b3110bdfba2e52caf8.PNG",
                // "postalCode": "0020",
                // "primaryPhone": "01000110851",
                // "otherPhone": "01212548961",
                // "joinedAt": "12\/10\/2010 21:14:00",
                // "lastLogin": "12\/14\/2018 19:48:15",
                // "lastUpdate": "12\/12\/2018 13:58:29"
            // },
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
        // },
        // {
            // "type": "workExperienceYears",
            // "id": "8",
            // "attributes": {
                // "years": "6 years",
                // "translations": null
            // }
        // },
        // {
            // "type": "educationalDegree",
            // "id": "7",
            // "attributes": {
                // "name": "Master's Degree",
                // "translations": null
            // }
        // }
    // ]
// }

