import { z } from "zod";

export const plantFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  weeklyWaterNeedML: z
    .number({ invalid_type_error: "Must be a number" })
    .min(1, "Water need must be positive"),
  expectedHumidty: z
    .number({ invalid_type_error: "Must be a number" })
    .min(0)
    .max(100),
  locationId: z.number().int().min(1, "Location is required"),
});

export type PlantFormValues = z.infer<typeof plantFormSchema>;
