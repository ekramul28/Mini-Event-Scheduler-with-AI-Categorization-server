import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { EventControllers } from "./events.controller";
import { EventValidation } from "./events.validation";

const router = express.Router();

// POST /events - Create a new event
router.post(
  "/",
  validateRequest(EventValidation.createEventValidationSchema),
  EventControllers.createEvent
);

// GET /events - Retrieve all events, sorted by date and time
router.get("/", EventControllers.getAllEvents);

// GET /events/:id - Get single event
router.get("/:id", EventControllers.getSingleEvent);

// PATCH /events/:id - Update an event
router.patch(
  "/:id",
  validateRequest(EventValidation.updateEventValidationSchema),
  EventControllers.updateEvent
);

// PUT /events/:id - Archive an event (set archived status to true)
router.put("/:id", EventControllers.archiveEvent);

// DELETE /events/:id - Delete an event
router.delete("/:id", EventControllers.deleteEvent);

export const EventRoutes = router;
