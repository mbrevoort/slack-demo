import { DefineFunction, DefineDatastore, Manifest, Schema } from "deno-slack-sdk/mod.ts";

const NpsFunction = DefineFunction({
  callback_id: "nps",
  title: "NPS Survey",
  description: "Net promoter score survey",
  source_file: "functions/survey.ts",
  input_parameters: {
    properties: {
      user: {
        type: Schema.slack.types.user_id,
      },
      score: {
        type: Schema.types.string,
        description: "How likely are you to recommend? 0 = not likely, 10 = extremely likely",
        enum: ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0"],
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

const NpsScoresDatastore = DefineDatastore({
  name: "nps_scores",
  primary_key: "id",
  attributes: {
    id: {
      type: Schema.types.string
    },
    user: {
      type: Schema.slack.types.user_id
    },
    score: {
      type: Schema.types.string
    },
    created: {
      type:Schema.types.string
    }
  },
});

export default Manifest({
  name: "Teamwork",
  description: "Team work makes the dream work",
  icon: "assets/roo.png",
  functions: [NpsFunction],
  datastores: [NpsScoresDatastore],
  outgoingDomains: [],
  botScopes: ["commands", "users:read", "users:read.email"],
});
