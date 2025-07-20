import { EventSearchableFields } from "./events.constant";
import { TEvent } from "./events.interface";
import { Event } from "./events.model";

// AI-like categorization keywords
const workKeywords = [
  "meeting",
  "project",
  "client",
  "work",
  "office",
  "business",
  "deadline",
  "presentation",
  "conference",
];
const personalKeywords = [
  "birthday",
  "family",
  "friend",
  "party",
  "dinner",
  "movie",
  "vacation",
  "holiday",
  "celebration",
];

// Categorize event based on title and notes
const categorizeEvent = (title: string, notes: string = ""): string => {
  const text = `${title} ${notes}`.toLowerCase();

  // Check for work keywords
  for (const keyword of workKeywords) {
    if (text.includes(keyword)) {
      return "Work";
    }
  }

  // Check for personal keywords
  for (const keyword of personalKeywords) {
    if (text.includes(keyword)) {
      return "Personal";
    }
  }

  // Default category
  return "Other";
};

const createEventIntoDB = async (payload: TEvent) => {
  const category = categorizeEvent(payload.title, payload.notes || "");
  const eventData = {
    ...payload,
    category,
    archived: false,
  };

  const result = await Event.create(eventData);
  console.log("this is create", result);
  return result;
};

const getAllEventsFromDB = async (query: Record<string, unknown>) => {
  // Get all non-archived events
  let events = await Event.find({ archived: { $ne: true } });

  // Search functionality
  const searchTerm = query.searchTerm as string;
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    events = events.filter((event) =>
      EventSearchableFields.some((field) =>
        event[field as keyof typeof event]
          ?.toString()
          .toLowerCase()
          .includes(searchLower)
      )
    );
  }

  // Sort by date and time
  events.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  // Pagination
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const result = events.slice(skip, skip + limit);
  const total = events.length;
  const totalPages = Math.ceil(total / limit);

  const meta = {
    page,
    limit,
    total,
    totalPages,
    totalPage: totalPages,
  };
  console.log(meta, result);
  return {
    meta,
    result,
  };
};

const getSingleEventFromDB = async (id: string) => {
  const result = await Event.findById(id);
  return result;
};

const updateEventIntoDB = async (id: string, payload: Partial<TEvent>) => {
  // If title or notes are being updated, recategorize
  if (payload.title || payload.notes) {
    const existingEvent = await Event.findById(id);
    if (existingEvent) {
      const newTitle = payload.title || existingEvent.title;
      const newNotes = payload.notes || existingEvent.notes || "";
      payload.category = categorizeEvent(newTitle, newNotes);
    }
  }

  const result = await Event.findOneAndUpdate(id, payload, { new: true });
  return result;
};

const deleteEventFromDB = async (id: string) => {
  const result = await Event.findByIdAndDelete(id);
  return result;
};

// Archive event (set archived status to true)
const archiveEventFromDB = async (id: string) => {
  const result = await Event.findOneAndUpdate(
    id,
    { archived: true },
    { new: true }
  );
  return result;
};

export const EventServices = {
  createEventIntoDB,
  getAllEventsFromDB,
  getSingleEventFromDB,
  updateEventIntoDB,
  deleteEventFromDB,
  archiveEventFromDB,
};
