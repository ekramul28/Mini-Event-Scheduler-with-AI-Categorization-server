import { z } from "zod";

const createEventValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: "Event title must be string",
        required_error: "Event title is required",
      })
      .min(1, "Title cannot be empty")
      .max(100, "Title cannot exceed 100 characters"),
    date: z
      .string({
        invalid_type_error: "Event date must be string",
        required_error: "Event date is required",
      })
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    time: z
      .string({
        invalid_type_error: "Event time must be string",
        required_error: "Event time is required",
      })
      .regex(
        /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Time must be in HH:MM format (24-hour)"
      ),
    notes: z
      .string({
        invalid_type_error: "Event notes must be string",
      })
      .optional()
      .refine(
        (val) => !val || val.length <= 500,
        "Notes cannot exceed 500 characters"
      ),
  }),
});

const updateEventValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: "Event title must be string",
      })
      .min(1, "Title cannot be empty")
      .max(100, "Title cannot exceed 100 characters")
      .optional(),
    date: z
      .string({
        invalid_type_error: "Event date must be string",
      })
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
      .optional(),
    time: z
      .string({
        invalid_type_error: "Event time must be string",
      })
      .regex(
        /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Time must be in HH:MM format (24-hour)"
      )
      .optional(),
    notes: z
      .string({
        invalid_type_error: "Event notes must be string",
      })
      .optional()
      .refine(
        (val) => !val || val.length <= 500,
        "Notes cannot exceed 500 characters"
      ),
    archived: z
      .boolean({
        invalid_type_error: "Archived status must be boolean",
      })
      .optional(),
    category: z
      .string({
        invalid_type_error: "Event category must be string",
      })
      .optional(),
  }),
});

export const EventValidation = {
  createEventValidationSchema,
  updateEventValidationSchema,
};
