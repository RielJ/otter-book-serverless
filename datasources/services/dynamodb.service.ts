import * as AWS from "aws-sdk";
import { Upload } from "../../graphql/types";
import { extname } from "path";

interface IConfig {
  region: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  endpoint?: string;
}

// Put
type PutItem = AWS.DynamoDB.DocumentClient.PutItemInput;
type PutItemOutput = AWS.DynamoDB.DocumentClient.PutItemOutput;

// Batch write
type BatchWrite = AWS.DynamoDB.DocumentClient.BatchWriteItemInput;
type BatchWriteOutPut = AWS.DynamoDB.DocumentClient.BatchWriteItemOutput;

// Update
type UpdateItem = AWS.DynamoDB.DocumentClient.UpdateItemInput;
type UpdateItemOutPut = AWS.DynamoDB.DocumentClient.UpdateItemOutput;

// Query
type QueryItem = AWS.DynamoDB.DocumentClient.QueryInput;
type QueryItemOutput = AWS.DynamoDB.DocumentClient.QueryOutput;

// Get
type GetItem = AWS.DynamoDB.DocumentClient.GetItemInput;
type GetItemOutput = AWS.DynamoDB.DocumentClient.GetItemOutput;

// Scan
type ScanItem = AWS.DynamoDB.DocumentClient.ScanInput;
type ScanItemOutput = AWS.DynamoDB.DocumentClient.ScanOutput;

// Delete
type DeleteItem = AWS.DynamoDB.DocumentClient.DeleteItemInput;
type DeleteItemOutput = AWS.DynamoDB.DocumentClient.DeleteItemOutput;

// type Item = { [index: string]: string };
const config: IConfig = { region: process.env.REGION || "ap-southeast-1" };
if (process.env.STAGE === process.env.DYNAMODB_LOCAL_STAGE) {
  config.accessKeyId = process.env.DYNAMODB_LOCAL_ACCESS_KEY_ID;
  config.secretAccessKey = process.env.DYNAMODB_LOCAL_SECRET_ACCESS_KEY;
  config.endpoint = process.env.DYNAMODB_LOCAL_ENDPOINT;
}
AWS.config.update(config);

const documentClient = new AWS.DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://localhost:8000",
});
const s3 = new AWS.S3();

export default class DatabaseService {
  _upload = async (imageFile: Upload, id: string): Promise<string> => {
    try {
      const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedMimes.includes(imageFile.mimetype)) {
        throw Error("File Type Error");
      }

      const key = `${id}.${extname(imageFile.filename)}`;

      console.log(`writing image to bucket called ${key}`);

      const { Location } = await s3
        .upload({
          Body: imageFile.createReadStream(),
          Key: key,
          ContentType: imageFile.mimetype,
          Bucket: process.env.IMAGE_BUCKET_NAME,
          ACL: "public-read",
        })
        .promise();

      return Location;
    } catch (error) {
      console.log("error", error);
      throw error("failed to upload image");
    }
  };
  _create = async (params: PutItem): Promise<PutItemOutput> => {
    try {
      return await documentClient.put(params).promise();
    } catch (error) {
      console.log(error);
      throw new Error("Create Error");
    }
  };

  _batchCreate = async (params: BatchWrite): Promise<BatchWriteOutPut> => {
    try {
      return await documentClient.batchWrite(params).promise();
    } catch (error) {
      console.log(error);
      throw new Error("Batch Create Error");
    }
  };

  _update = async (params: UpdateItem): Promise<UpdateItemOutPut> => {
    try {
      return await documentClient.update(params).promise();
    } catch (error) {
      console.log(error);
      throw new Error("Update Error");
    }
  };

  _query = async (params: QueryItem): Promise<QueryItemOutput> => {
    try {
      return await documentClient.query(params).promise();
    } catch (error) {
      console.log(error);
      throw new Error("Query Error");
    }
  };

  _get = async (params: GetItem): Promise<GetItemOutput> => {
    try {
      return await documentClient.get(params).promise();
    } catch (error) {
      console.log(error);
      throw new Error("Get Error");
    }
  };

  _scan = async (params: ScanItem): Promise<ScanItemOutput> => {
    try {
      return await documentClient.scan(params).promise();
    } catch (error) {
      console.log(error);
      throw new Error("Get Error");
    }
  };

  _delete = async (params: DeleteItem): Promise<DeleteItemOutput> => {
    try {
      return await documentClient.delete(params).promise();
    } catch (error) {
      console.log(error);
      throw new Error("Delete Error");
    }
  };
}
