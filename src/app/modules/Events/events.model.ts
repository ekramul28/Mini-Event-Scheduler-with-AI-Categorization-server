import { TEvent } from "./events.interface";

// In-memory storage for events (since we're not using a database)
let events: (TEvent & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
})[] = [];
let nextId = 1;

const create = async (eventData: TEvent) => {
  const newEvent = {
    _id: nextId.toString(),
    ...eventData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  events.push(newEvent);
  nextId++;
  return newEvent;
};

const find = async (query?: any) => {
  let filteredEvents = events;

  // Filter by archived status if specified
  if (query && query.archived) {
    filteredEvents = events.filter(
      (event) => event.archived === query.archived.$ne
    );
  } else {
    // Default: return non-archived events
    filteredEvents = events.filter((event) => !event.archived);
  }

  return filteredEvents;
};

const findById = async (id: string) => {
  return events.find((event) => event._id === id) || null;
};

const findOneAndUpdate = async (
  id: string,
  updateData: Partial<TEvent>,
  options?: any
) => {
  const eventIndex = events.findIndex((event) => event._id === id);
  if (eventIndex === -1) return null;

  events[eventIndex] = {
    ...events[eventIndex],
    ...updateData,
    updatedAt: new Date(),
  };

  return options?.new ? events[eventIndex] : events[eventIndex];
};

const findByIdAndDelete = async (id: string) => {
  const eventIndex = events.findIndex((event) => event._id === id);
  if (eventIndex === -1) return null;

  const deletedEvent = events[eventIndex];
  events.splice(eventIndex, 1);
  return deletedEvent;
};

const countDocuments = async (query?: any) => {
  let filteredEvents = events;

  if (query && query.archived) {
    filteredEvents = events.filter(
      (event) => event.archived === query.archived.$ne
    );
  } else {
    filteredEvents = events.filter((event) => !event.archived);
  }

  return filteredEvents.length;
};

export const Event = {
  create,
  find,
  findById,
  findOneAndUpdate,
  findByIdAndDelete,
  countDocuments,
};
