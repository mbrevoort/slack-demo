import type { FunctionHandler } from "deno-slack-sdk/types.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";

const nps: FunctionHandler<any, any> = async ({ inputs, token }) => {
  const { user, score } = inputs;

  // save the score
  const client = SlackAPI(token, {}); 
  await client.apiCall("apps.datastore.put", {
    datastore: "nps_scores",
    item: {
      user,
      score,
      created: Date.now(),
    },
  });  

  return await {
    outputs: {
      confirmation: `Reportd a Net Promoter Score (NPS) of ${score}`,
    },
  };
};

export default nps;
