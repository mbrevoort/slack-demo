import { updateAvailability } from "../lib/availability.ts";
import type { FunctionHandler } from "deno-slack-sdk/types.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";

// deno-lint-ignore no-explicit-any
const update_availability: FunctionHandler<any, any> = async ({ inputs, token }) => {
  const { person, when, status } = inputs;
  const client = SlackAPI(token, {});

  // look up the users name and email address
  const result: any = await client.apiCall('users.info', { user: person });
  const email = result.user.profile.email;
  const name = result.user.real_name;

  // makes an API call to the availability service
  await updateAvailability(email, when, status);

  return await {
    outputs: {
      unavailability: `${name} has ${status}, ${when}`,
    },
  };
};

export default update_availability;
