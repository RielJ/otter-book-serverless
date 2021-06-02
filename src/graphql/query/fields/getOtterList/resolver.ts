import { Context } from "../../../config";

export default async function getOtterList(_: any, {}, context: Context) {
  const output = await context.db.otters.getOtterList();
  return output.Items;
}
