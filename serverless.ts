import type { AWS } from "@serverless/typescript";
import functions from "./resources/functions";

const serverlessConfiguration: AWS = {
  service: "rielj-serverless",
  frameworkVersion: "2",
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: "${opt:stage, 'dev'}",
    region: "ap-southeast-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      REGION: "${self:custom.region}",
      STAGE: "${self:custom.stage}",
      OTTER_TABLE: "${self:custom.otter_table}",
      IMAGE_BUCKET_NAME: "${self:custom.otterImageBucketName}",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["dynamodb:*", "s3:*"],
            Resource: [{ "Fn::GetAtt": ["OtterTable", "Arn"] }],
          },
        ],
      },
    },
    lambdaHashingVersion: "20201221",
  },
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
    region: "${opt:region, self:provider.region}",
    stage: "${opt:stage, self:provider.stage}",
    otter_table:
      "${self:service}-otter-table-${opt:stage, self:provider.stage}",
    otterImageBucketName: "otter-images-bucket",
    table_throughputs: {
      prod: 5,
      default: 1,
    },
    table_throughput:
      "${self:custom.table_throughputs.${self:custom.stage}, self:custom.table_throughputs.default}",
    dynamodb: {
      stages: ["dev"],
      start: {
        dbPath: "./",
        port: 8000,
        inMemory: true,
        heapInitial: "200m",
        heapMax: "1g",
      },
    },
    ["serverless-offline"]: {
      httpPort: 3000,
      babelOptions: {
        presets: ["env"],
      },
    },
  },
  plugins: [
    "serverless-webpack",
    "serverless-dynamodb-local",
    "serverless-offline",
    "serverless-dotenv-plugin",
  ],
  package: {
    individually: true,
  },
  // import the function via paths
  functions,
  resources: {
    Resources: {
      OtterImageBucket: {
        Type: "AWS::S3::Bucket",
        Properties: {
          BucketName: "${self.provider.environment.IMAGE_BUCKET_NAME}",
          AccessControl: "PublicRead",
        },
      },
      OtterTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "${self:provider.environment.OTTER_TABLE}",
          AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
          KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
          BillingMode: "PAY_PER_REQUEST",
        },
      },
      GatewayResponseDefault4XX: {
        Type: "AWS::ApiGateway::GatewayResponse",
        Properties: {
          ResponseParameters: {
            "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
            "gatewayresponse.header.Access-Control-Allow-Headers":
              "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
            "gatewayresponse.header.Access-Control-Allow-Methods":
              "'GET,OPTIONS'",
          },
          ResponseType: "DEFAULT_4XX",
          RestApiId: {
            Ref: "ApiGatewayRestApi",
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
