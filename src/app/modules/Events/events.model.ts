import { Schema, model } from "mongoose";
import { TEvent } from "./events.interface";

const eventSchema = new Schema<TEvent>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    date: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^\d{4}-\d{2}-\d{2}$/.test(v);
        },
        message: "Date must be in YYYY-MM-DD format",
      },
    },
    time: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
        },
        message: "Time must be in HH:MM format (24-hour)",
      },
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ["Work", "Personal", "Other"],
      default: "Other",
    },
  },
  {
    timestamps: true,
  }
);

export const Event = model<TEvent>("Event", eventSchema);
