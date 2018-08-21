import {remove} from "atp-pointfree";

export default (entity, filters, entityType) => {
    const tags = [].concat(filters.tag || []);
    filters = remove("tag")(filters);

    if(tags.length > 0) {
        entity.where(`id in (select entityId from atptag_entity_tag_compiled where entityType="${entityType}" and tag in (${tags.map(tag => `"${tag}"`).join(",")}))`);
    }

    return filters;
}