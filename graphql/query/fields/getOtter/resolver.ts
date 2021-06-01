import { Context } from "../../../config";
import { Otter, QueryGetOtterArgs } from "../../../types/types";

export default async function getOtter(
  _: any,
  { input }: QueryGetOtterArgs,
  context: Context
) {
  const otter = await context.db.otters.getOtter(input.id);
  return otter.Item;
}
