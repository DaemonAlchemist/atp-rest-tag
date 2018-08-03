
import {basicController, NOT_IMPLEMENTED, NOT_SUPPORTED} from 'atp-rest';
import {createCrudPermissions} from "atp-rest-uac";
import Tag from "../model/tag";
import TagEntity from "../model/tag-entity";
import {map, remove} from "atp-pointfree";

const model = Tag;
const permissions = createCrudPermissions('tag', 'tag');
const idField = 'tagId';

const crud = basicController.entity.crud({
    model, permissions, idField,
});

export default {
    ...crud,
    post: NOT_SUPPORTED,
    [":" + idField]: {
        ...crud[":" + idField],
        get: NOT_SUPPORTED,
        put: NOT_SUPPORTED,
        patch: NOT_SUPPORTED,
        entity: {
            get: basicController.entity.collection({
                model: TagEntity, permission: permissions.view,
                filter: req => req.params,
                processResults: results => ({
                    results: map(remove(['id', 'entityTypeId']))(results)
                })
            }),
            post: NOT_SUPPORTED
        }
    }
};
