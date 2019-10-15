import mongoose, { Collection, Document } from "mongoose";
import { ObjectId } from "bson";

export default abstract class BaseRepository<T extends Document> {

    public readonly _collection: Collection;

    constructor(collectionName: string) {
        this._collection = mongoose.connection.collection(collectionName);
    }

    public async create(item: T) {
        try {
            return await this._collection.insertOne(item);
        } catch (error) {
            return {message: error};
        }
    }

    public async update(id: string, item: T) {
        try {
            return await this._collection.updateOne({_id: new ObjectId(id)}, item);
        } catch (error) {
            return {message: error};
        }
      }
    public async delete(id: string) {
         try {
            return await this._collection.findOneAndDelete({_id: new ObjectId(id)});
         } catch (error) {
             return {message: error};
         }

      }
    public async find(item?: T) {
        try {
            if (!item)
                return await this._collection.find().toArray();
            return await this._collection.find(item).toArray();
        } catch (error) {
            return {message: error};
        }
      }
    public async findOne(id: string) {
        try {
            return await this._collection.findOne({_id: new ObjectId(id)});
        } catch (error) {
            return {message: error};
        }
      }
}
