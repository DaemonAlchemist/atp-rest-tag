
import tag from './routes/tag';
import tagEntity from './routes/tag-entity';
import filterOnTags from "./util/filter";

//import validators from "./validators/index";

export default ({
    routes: {tag, tagEntity},
    config: {
        //validators
    }
});

export {filterOnTags};