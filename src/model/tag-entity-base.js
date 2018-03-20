
import {Entity} from 'atp-active-record';

export default class TagEntityBase extends Entity
{
    constructor() {
        super('tag', 'atptag_entity_tag');
    }
}
