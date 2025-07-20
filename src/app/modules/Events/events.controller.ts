import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { EventServices } from "./events.service";

const createEvent = catchAsync(async (req, res) => {
  const result = await EventServices.createEventIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Event is created successfully",
    data: result,
  });
});

const getAllEvents = catchAsync(async (req, res) => {
  const result = await EventServices.getAllEventsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Events are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleEvent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await EventServices.getSingleEventFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event is retrieved successfully",
    data: result,
  });
});

const updateEvent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await EventServices.updateEventIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event is updated successfully",
    data: result,
  });
});

const deleteEvent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await EventServices.deleteEventFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event is deleted successfully",
    data: result,
  });
});

const archiveEvent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await EventServices.archiveEventFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event is archived successfully",
    data: result,
  });
});

export const EventControllers = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  archiveEvent,
};
