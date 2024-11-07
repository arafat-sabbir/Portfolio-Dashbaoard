import { z } from "zod";

export const addEducationSchema = z.object({
  instituteName: z.string({ required_error: "Institute name is required" }),
  degreeName: z.string({ required_error: "Degree name is required" }),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
});

export const addExperienceSchema = z.object({
  companyName: z.string({ required_error: "Company name is required" }),
  position: z.string({ required_error: "Position is required" }),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
});

export const editExperienceSchema = z.object({
  companyName: z.string().optional(),
  position: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const editEducationSchema = z.object({
  instituteName: z.string().optional(),
  degreeName: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  displayEmail: z.string().email().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  designation: z.string().optional(),
  dob: z.any().optional(),
  photo: z.any().optional(),
});

export const portfolioSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  category: z.string({ required_error: "Category is required" }),
  description: z.string({ required_error: "Description is required" }),
  technologiesUsed: z
    .array(z.string())
    .min(1, { message: "At least one technology is required" }),
  features: z
    .array(z.string())
    .min(1, { message: "At least one feature is required" }),
  livePreview: z.string().url().optional(),
  sourceCode: z.string({ required_error: "Source code is required" }),
  startDate: z.any().optional(),
  endDate: z.any().optional(),
  currentlyWorking: z.boolean().optional(),
});

export const skillSchema = z.object({
  skill: z.string({ required_error: "Skill is required" }),
  level: z.number({ required_error: "Level is required" }),
  photo: z.any().optional(),
});

export const registerUserSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3, {
    message: "Name must be at least 3 characters",
  }),
  email: z.string({ required_error: "Email is required" }).email({
    message: "Please Provide A Valid Email",
  }),
  password: z.string({ required_error: "Password is required" }).min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export const loginUserSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please Provide A Valid Email" }),
  password: z.string({ required_error: "Password is required" }).min(6, {
    message: "Password must be at least 6 characters",
  }),
});
