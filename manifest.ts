import { DefineFunction, Manifest, Schema } from "deno-slack-sdk/mod.ts";

const UpdateAvailabilityFunction = DefineFunction({
  callback_id: "update_availability",
  title: "Update Availability",
  description: "Updates a team members availability",
  source_file: "functions/update_availability.ts",
  input_parameters: {
    properties: {
      person: {
        type: Schema.slack.types.user_id,
        description: "Who will be unavailable",
      },
      when: {
        type: Schema.types.string,
        name: "When",
        description: "Provide a date like 4/20/2022",
      },
      status: {
        type: Schema.types.string,
        enum: ["PTO", "Busy"],
      },
    },
    required: ["person", "when", "status"],
  },
  output_parameters: {
    properties: {
      unavailability: {
        type: Schema.types.string,
        description: "Details of unavailability",
      },
    },
    required: ["unavailability"],
  },
});


const NpsFunction = DefineFunction({
  callback_id: "nps",
  title: "NPS",
  description: "Net promoter score survey",
  source_file: "functions/nps.ts",
  input_parameters: {
    properties: {
      user: {
        type: Schema.slack.types.user_id,
      },
      score: {
        type: Schema.types.string,
        description: "0 is not likely, 10 is extremely likely",
        enum: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      },
    },
    required: ["user", "score"],
  },
  output_parameters: {
    properties: {
      confirmation: {
        type: Schema.types.string,
      },
    },
    required: ["confirmation"],
  },
});

export default Manifest({
  name: "Teamwork",
  description: "Team work makes the dream work",
  icon: "assets/roo.png",
  functions: [UpdateAvailabilityFunction, NpsFunction],
  outgoingDomains: [],
  botScopes: ["commands", "users:read", "users:read.email"],
});
