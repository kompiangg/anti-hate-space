import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    require: [true, "isiin prompt cuy"],
  },
  tag: {
    type: String,
    require: [true, "isiin tag cuy"],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
