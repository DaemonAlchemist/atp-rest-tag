
import {basicController} from 'atp-rest';
import {createCrudPermissions} from "atp-rest-uac";
import Tag from "../model/tag";

const model = Tag;
const permissions = createCrudPermissions('tag', 'tag');
const idField = 'tagId';

export default basicController.entity.crud({
    model, permissions, idField,
});
