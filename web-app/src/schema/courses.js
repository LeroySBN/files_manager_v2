import { schema, normalize } from 'normalizr';

const courseSchema = new schema.Entity('courses');

const coursesNormalizer = (data) => normalize(data, [courseSchema]);

export { courseSchema, coursesNormalizer }
