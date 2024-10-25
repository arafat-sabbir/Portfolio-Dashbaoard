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

