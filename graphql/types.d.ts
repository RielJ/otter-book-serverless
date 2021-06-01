import { ReadStream } from "fs";

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: Upload;
};

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): ReadStream;
}
export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE",
}

export type CreateOtterInput = {
  name: Scalars["String"];
  location: Scalars["String"];
  about: Scalars["String"];
  imageFile: Scalars["Upload"];
};

export type GetOtterInput = {
  id: Scalars["ID"];
};

export type Mutation = {
  __typename?: "Mutation";
  createOtter?: Maybe<Otter>;
};

export type MutationCreateOtterArgs = {
  input?: Maybe<CreateOtterInput>;
};

export type Otter = {
  __typename?: "Otter";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  location?: Maybe<Scalars["String"]>;
  about?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  getOtter?: Maybe<Otter>;
  getOtterList?: Maybe<Array<Maybe<Otter>>>;
};

export type QueryGetOtterArgs = {
  input?: Maybe<GetOtterInput>;
};
