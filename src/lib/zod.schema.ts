/**
 * Schemas for validating different data in the application
 * @remarks
 * These schemas are used to validate data sent in the request body
 * and to ensure that the data is in the correct format.
 */
import { z } from "zod";

/**
 * Schema for validating education data
 * @remarks
 * The data must contain the following fields: instituteName, degreeName, startDate and endDate
 * The startDate and endDate must be in the correct format (YYYY-MM-DD)
 */
export const addEducationSchema = z
  .object({
    instituteName: z
      .string({ required_error: "Institute name is required" })
      .nonempty({ message: "Institute name is required" }),
    degreeName: z
      .string({ required_error: "Degree name is required" })
      .nonempty({ message: "Degree name is required" }),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
  })
  .strict();

/**
 * Schema for validating experience data
 * @remarks
 * The data must contain the following fields: companyName, position, startDate and endDate
 * The startDate and endDate must be in the correct format (YYYY-MM-DD)
 */
export const addExperienceSchema = z
  .object({
    companyName: z
      .string({ required_error: "Company name is required" })
      .nonempty({ message: "Company name is required" }),
    position: z
      .string({ required_error: "Position is required" })
      .nonempty({ message: "Position is required" }),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
  })
  .strict();

/**
 * Schema for validating edited experience data
 * @remarks
 * The data must contain the following fields: companyName, position, startDate and endDate
 * The startDate and endDate must be in the correct format (YYYY-MM-DD)
 */
export const editExperienceSchema = z
  .object({
    companyName: z
      .string({ required_error: "Company name is required" })
      .nonempty({ message: "Company name is required" }),
    position: z
      .string({ required_error: "Position is required" })
      .nonempty({ message: "Position is required" }),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
  })
  .strict();

/**
 * Schema for validating edited education data
 * @remarks
 * The data must contain the following fields: instituteName, degreeName, startDate and endDate
 * The startDate and endDate must be in the correct format (YYYY-MM-DD)
 */
export const editEducationSchema = z
  .object({
    instituteName: z
      .string({ required_error: "Institute name is required" })
      .nonempty({ message: "Institute name is required" }),
    degreeName: z
      .string({ required_error: "Degree name is required" })
      .nonempty({ message: "Degree name is required" }),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
  })
  .strict();

/**
 * Schema for validating user update data
 * @remarks
 * The data must contain the following fields: name, displayEmail, phone, location, designation, dob, photo, locationLink and bio
 * The displayEmail must be a valid email
 * The dob must be in the correct format (YYYY-MM-DD)
 * The photo and locationLink are optional
 */
export const updateUserSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .nonempty({ message: "Name is required" }),
  displayEmail: z
    .string({ required_error: "Email is required" })
    .nonempty({ message: "Email is required" })
    .email({ message: "Please provide a valid email" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .nonempty({ message: "Phone is required" }),
  location: z
    .string({ required_error: "Location is required" })
    .nonempty({ message: "Location is required" }),
  designation: z
    .string({ required_error: "Designation is required" })
    .nonempty({ message: "Designation is required" }),
  dob: z.date({ required_error: "Date of birth is required" }),
  photo: z.any().optional(),
  locationLink: z
    .string({ required_error: "Location link is required" })
    .nonempty({ message: "Location link is required" }),
  bio: z
    .string({ required_error: "Bio is required" })
    .nonempty({ message: "Bio is required" }),
});

/**
 * Schema for validating portfolio data
 * @remarks
 * The data must contain the following fields: title, category, description, technologiesUsed, features, livePreview, sourceCode, startDate and endDate
 * The startDate and endDate must be in the correct format (YYYY-MM-DD)
 * The technologiesUsed and features must be arrays of strings
 * The livePreview and sourceCode must be valid URLs
 */
export const portfolioSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .nonempty({ message: "Title is required" }),
  category: z
    .string({ required_error: "Category is required" })
    .nonempty({ message: "Category is required" }),
  description: z
    .string({ required_error: "Description is required" })
    .nonempty({ message: "Description is required" }),
  technologiesUsed: z
    .array(z.string())
    .min(1, { message: "At least one technology is required" }),
  features: z
    .array(z.string())
    .min(1, { message: "At least one feature is required" }),
  livePreview: z
    .string({ required_error: "Live preview is required" })
    .nonempty({ message: "Live preview is required" })
    .url(),
  sourceCode: z
    .string({ required_error: "Source code is required" })
    .nonempty({ message: "Source code is required" }),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date().optional(),
  currentlyWorking: z.boolean().optional(),
});

/**
 * Schema for validating skill data
 * @remarks
 * The data must contain the following fields: skill, level and photo
 * The level must be a number between 1 and 5
 * The photo is optional
 */
export const skillSchema = z.object({
  skill: z
    .string({ required_error: "Skill is required" })
    .nonempty({ message: "Skill is required" }),
  level: z
    .number({ required_error: "Level is required" })
    .min(1, { message: "Level must be at least 1" }),
  photo: z.any().optional(),
});

/**
 * Schema for validating user registration data
 * @remarks
 * The data must contain the following fields: name, email, password, phone and location
 * The name must be at least 3 characters long
 * The email must be a valid email
 * The password must be at least 6 characters long
 * The phone must be a valid phone number
 * The location must be a valid location
 */
export const registerUserSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .nonempty({ message: "Email is required" })
    .email({ message: "Please provide a valid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  // phone: z
  //   .string({ required_error: "Phone is required" })
  //   .nonempty({ message: "Phone is required" }),
  // location: z
  //   .string({ required_error: "Location is required" })
  //   .nonempty({ message: "Location is required" }),
});

/**
 * Schema for validating user login data
 * @remarks
 * The data must contain the following fields: email and password
 * The email must be a valid email
 * The password must be at least 6 characters long
 */
export const loginUserSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .nonempty({ message: "Email is required" })
    .email({ message: "Please provide a valid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

/**
 * Schema for validating client data
 */


/**
 * Schema for validating client data
 * @remarks
 * The data must contain the following fields: photo
 * The photo is optional
 */
export const clientSchema = z.object({
  photo: z.any().optional(),
});

/**
 * Schema for validating work data
 * @remarks
 * The data must contain the following fields: title, description and photo
 * The title and description must not be empty
 * The photo is optional
 */
export const workSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .nonempty({ message: "Title is required" }),
  description: z
    .string({ required_error: "Description is required" })
    .nonempty({ message: "Description is required" }),
  photo: z.any().optional(),
});

