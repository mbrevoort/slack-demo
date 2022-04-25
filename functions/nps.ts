import type { FunctionHandler } from "deno-slack-sdk/types.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";

// deno-lint-ignore no-explicit-any
const nps: FunctionHandler<any, any> = async ({ inputs, token }) => {
  const client = SlackAPI(token, {});
  // const { user, score } = inputs;

  // look up the users name and email address
  // const result: any = await client.apiCall('users.info', { user });
  // const name = result.user.real_name;

  // save the score
  // await client.apiCall("apps.datastore.put", {
  //   datastore: "nps_scores",
  //   item: {
  //     user,
  //     score,
  //     created: Date.now(),
  //   },
  // });  

  return await {
    outputs: {
      // confirmation: `${name} reportd a Net Promoter Score (NPS) of ${score}`,
    },
  };
};

export default nps;
