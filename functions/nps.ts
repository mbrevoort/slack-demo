import type { FunctionHandler } from "deno-slack-sdk/types.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";

// deno-lint-ignore no-explicit-any
const nps: FunctionHandler<any, any> = async ({ inputs, token }) => {
  const { user, score } = inputs;

  const client = SlackAPI(token, {});

  // look up the users name and email address
  const result: any = await client.apiCall('users.info', { user });
  const name = result.user.real_name;

  return await {
    outputs: {
      confirmation: `${name} reported a Net Promoter Score (NPS) of ${score}`,
    },
  };
};

export default nps;
