// location-form-schema.ts
import { z } from "zod";

export const locationFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  lat: z.number({ invalid_type_error: "Latitude must be a number" }),
  long: z.number({ invalid_type_error: "Longitude must be a number" }),
});

export type LocationFormValues = z.infer<typeof locationFormSchema>;
