import DatabaseService from "../services/dynamodb.service";
import { Otter } from "../../graphql/types/types";
type PutItemOutput = AWS.DynamoDB.DocumentClient.PutItemOutput;
type GetItemOutput = AWS.DynamoDB.DocumentClient.GetItemOutput;
type QueryItemOutput = AWS.DynamoDB.DocumentClient.QueryOutput;

export default class OtterRepository extends DatabaseService {
  table_name: string = process.env.OTTER_TABLE as string;

  async createOtter(attributes: Otter): Promise<PutItemOutput> {
    const params = {
      TableName: this.table_name,
      Item: {
        ...attributes,
      },
    };
    const data = await this._create(params);
    return data;
  }

  async getOtter(id: string): Promise<GetItemOutput> {
    const params = {
      TableName: this.table_name,
      Key: {
        id: id,
      },
    };
    const data = await this._get(params);
    return data;
  }

  async getOtterList(): Promise<QueryItemOutput> {
    const params = {
      TableName: this.table_name,
    };

    const data = await this._scan(params);
    return data;
  }
}
