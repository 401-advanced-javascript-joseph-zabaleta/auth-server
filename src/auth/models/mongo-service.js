'use strict';

class MongoService {

    constructor(schema) {
        this.schema = schema;
    };


    /**
     * Creates a new record within the database.
     * @param {*} record Object formated to match the schema for the database.
     */
    create(record) {
        let newRecord = new this.schema(record);
        return newRecord.save();
    };


    /**
     * Retreives a single record if an ID is provided or All records if no id is provided.
     * @param {*} id Optional ID of a record
     */
    get(_id) {
        let query = _id ? { _id } : {};
        return this.schema.find(query);
    };


    /**
     * Updates a record within the database
     * @param {*} _id ID of target record
     * @param {*} body JSON object formatted to proper schema requirements
     */
    update(_id, body) {
        return this.schema.updateOne( {_id }, body);
    };


    /**
     * Deletes a record within the database
     * @param {*} _id ID of target record
     */
    delete(_id) {
        return this.schema.findByIdAndDelete(_id);
    };

}
