
import {Entity} from 'atp-active-record';

export default class TagEntityType extends Entity
{
    constructor() {
        super('tag', 'atptag_entity_type');
    }

    getType(type) {
        return new TagEntityType().insertIgnore({type}).then(() => {
            return this.getByIndex('type', type);
        });
    }
}
