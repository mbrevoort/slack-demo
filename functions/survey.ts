import type { FunctionHandler } from "deno-slack-sdk/types.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";

const nps: FunctionHandler<any, any> = async ({ inputs, token }) => {
  return await {
    outputs: {},
  };
};

export default nps;
