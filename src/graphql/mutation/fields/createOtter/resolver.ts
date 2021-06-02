import { v4 as UUID } from "uuid";
import { Context } from "../../../config";
import { MutationCreateOtterArgs } from "../../../types";

export default async function createOtter(
  _: any,
  { input }: MutationCreateOtterArgs,
  context: Context
) {
  try {
    const id = UUID();
    const attributes = {
      ...input,
      id,
    };
    await context.db.otters.createOtter(attributes);
    return { ...attributes };
  } catch (error) {
    console.log(error);
    return null;
  }
}
