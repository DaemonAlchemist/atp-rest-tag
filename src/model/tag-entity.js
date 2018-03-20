
import {Entity} from 'atp-active-record';

export default class TagEntity extends Entity
{
    constructor() {
        super('tag', 'atptag_entity_tag_compiled');
    }
}
