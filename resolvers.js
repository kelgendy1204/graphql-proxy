import createAPI, { talentUrl } from './helpers/api';
require('dotenv').config();

const api = createAPI('https://api2.basharsys.com');

export default {
    Query: {
        talent: () => {
            return api.get(talentUrl).then(data => {
                const user = data.included.find(elem => {
                    return elem.type === 'user' && elem.id === data.data.relationships.user.data.id;
                });

                const workExperienceYears = data.included.find(elem => {
                    return (
                        elem.type === 'workExperienceYears' &&
                        elem.id === data.data.relationships.workExperienceYears.data.id
                    );
                });

                const educationalDegree = data.included.find(elem => {
                    return (
                        elem.type === 'educationalDegree' &&
                        elem.id === data.data.relationships.educationalDegree.data.id
                    );
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
                            cvDownload: { href: cvHref, meta: cvMeta }
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
                        ...user,
                        included: data.included
                    },
                    workExperienceYears,
                    educationalDegree
                };
            });
        }
    },
    Talent: {
        user(talent) {
            const { user } = talent;

            const residenceCity = user.included.find(elem => {
                return elem.type === 'city' && elem.id === user.relationships.residenceCity.data.id;
            });

            const residenceCountry = user.included.find(elem => {
                return (
                    elem.type === 'country' &&
                    elem.id === user.relationships.residenceCountry.data.id
                );
            });

            const residenceArea = user.included.find(elem => {
                return elem.type === 'area' && elem.id === user.relationships.residenceArea.data.id;
            });

            const homeCountry = user.included.find(elem => {
                return (
                    elem.type === 'country' && elem.id === user.relationships.homeCountry.data.id
                );
            });

            const status = user.included.find(elem => {
                return (
                    elem.type === 'userAccountStatus' &&
                    elem.id === user.relationships.status.data.id
                );
            });

            return {
                id: user.id,
                type: user.type,
                email: user.attributes.email,
                middleName: user.attributes.middleName,
                firstName: user.attributes.firstName,
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
                lastLogin: user.attributes.lastLogin,
                residenceCity,
                residenceArea,
                homeCountry,
                residenceCountry,
                status
            };
        },
        educationalDegree(talent) {
            const { educationalDegree } = talent;
            return {
                id: educationalDegree.id,
                type: educationalDegree.type,
                name: educationalDegree.attributes.name,
                translations: educationalDegree.attributes.translations
            };
        },
        workExperienceYears(talent) {
            const { workExperienceYears } = talent;
            return {
                id: workExperienceYears.id,
                type: workExperienceYears.type,
                years: workExperienceYears.attributes.years,
                translations: workExperienceYears.attributes.translations
            };
        }
    },
    User: {
        residenceArea(user) {
            if (user.residenceArea) {
                return {
                    id: user.residenceArea.id,
                    type: user.residenceArea.type,
                    ...user.residenceArea.attributes
                };
            }
            return;
        },
        residenceCity(user) {
            if (user.residenceCity) {
                return {
                    id: user.residenceCity.id,
                    type: user.residenceCity.type,
                    ...user.residenceCity.attributes
                };
            }
            return;
        },
        residenceCountry(user) {
            if (user.residenceCountry) {
                return {
                    id: user.residenceCountry.id,
                    type: user.residenceCountry.type,
                    ...user.residenceCountry.attributes
                };
            }
            return;
        },
        homeCountry(user) {
            if (user.homeCountry) {
                return {
                    id: user.homeCountry.id,
                    type: user.homeCountry.type,
                    ...user.homeCountry.attributes
                };
            }
            return;
        },
        status(user) {
            if (user.status) {
                return {
                    id: user.status.id,
                    type: user.status.type,
                    ...user.status.attributes
                };
            }
            return;
        }
    }
};
