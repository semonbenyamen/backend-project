const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phones: {
      type: [String],
      set: (values) => [...new Set(values)],
    },

    socialMedia: {
      type: [
        {
          platform: {
            type: String,
            enum: ["facebook", "linkedin"],
            required: true,
          },
          url: {
            type: String,
            required: true,
            trim: true,
          },
        },
      ],
      set: (values) =>
        Array.from(
          new Map(values.map((v) => [v.platform, v])).values()
        ),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);
