
import {Entity} from 'atp-active-record';

export default class Tag extends Entity
{
    constructor() {
        super('tag', 'atptag_tag');
    }
}
