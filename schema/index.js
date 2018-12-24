import { typeDefs as user } from './user';
import { typeDefs as educationalDegree } from './educationalDegree';
import { typeDefs as workExperienceYears } from './workExperienceYears';
import { typeDefs as userAccountStatus } from './userAccountStatus';
import { typeDefs as talent } from './talent';
import { typeDefs as country } from './country';
import { typeDefs as city } from './city';
import { typeDefs as area } from './area';
import { typeDefs as query } from './query';

export default [
    query,
    user,
    talent,
    userAccountStatus,
    area,
    country,
    city,
    workExperienceYears,
    educationalDegree
];
