
import {Entity} from 'atp-active-record';

export default class Tag extends Entity
{
    constructor() {
        super('tag', 'atptag_tag');
    }

    getTag(tag) {
        return new Tag().insertIgnore({tag}).then(() => {
            return this.getByIndex('tag', tag);
        });
    }
}
