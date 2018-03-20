
import {basicController, NOT_IMPLEMENTED, NOT_SUPPORTED} from 'atp-rest';
import {createCrudPermissions} from "atp-rest-uac";
import TagEntity from "../model/tag-entity";
import TagEntityBase from "../model/tag-entity-base";
import TagEntityType from "../model/tag-entity-type";
import Tag from "../model/tag";
import {map, remove} from 'atp-pointfree';

const model = TagEntity;
const permissions = createCrudPermissions('tag', 'tag');
const idField = 'tagEntityId';

const crud = basicController.entity.crud({
    model, permissions, idField,
    validateCollectionFilters: (v, req) => v
        //TODO:  Why aren't these sub-checks working?
        // .check("type").if("basic")
            .required(req.query.entityType, "Entity type")
            .isAlphaNumeric(req.query.entityType, "Entity type")
        // .check("id").if("basic")
            .required(req.query.entityId, "Entity id")
            .isInteger(req.query.entityId, "Entity id")
        // .check("final").if(["type", "id"])
    ,processCollectionFilters: ({entityType, entityId}) => new TagEntityType()
        .getType(entityType)
        .then(type => ({entityTypeId: type.id, entityId})),
    processCollectionResults: results => ({
        results: map(remove(['entityTypeId', 'tagId']))(results)
    }),
    preInsert: data =>
        Promise.all([
            new Tag().getTag(data.tag),
            new TagEntityType().getType(data.entityType)
        ]).then(([tag, entityType]) => ({
            tagId: tag.id,
            entityTypeId: entityType.id,
            entityId: data.entityId
        }))
});

export default {
    ...crud,
    [":" + idField]: {
        get: NOT_SUPPORTED,
        put: NOT_SUPPORTED,
        patch: NOT_SUPPORTED,
        delete: basicController.entity.delete({
            model: TagEntityBase,
            permission: permissions.delete,
            idField
        })
    }
};
