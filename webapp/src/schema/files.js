import { normalize, schema } from 'normalizr';
import { fromJS, Map } from 'immutable';

const fileSchema = new schema.Entity('files');

const filesArray = new schema.Array(fileSchema);

export const filesNormalizer = (data) => {
    const normalizedData = normalize(data, filesArray);
    const files = normalizedData.entities.files || {};

    const home = Object.values(files).filter((file) => file.parentId === 0);
    const myFiles = Object.values(files).filter((file) => file.type === 'file');
    const photos = Object.values(files).filter((file) => file.type === 'image');
    const shared = Object.values(files).filter((file) => file.isPublic === true);

    return fromJS({
        entities: normalizedData.entities,
        lists: {
            home: home.map((file) => file.id),
            files: myFiles.map((file) => file.id),
            photos: photos.map((file) => file.id),
            shared: shared.map((file) => file.id),
        },
    });
};
