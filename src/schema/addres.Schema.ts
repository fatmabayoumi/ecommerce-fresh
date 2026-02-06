
import * as z from "zod";

export const addressScheme = z
  .object({

    city: z.string(),
    details:z.string(),
    phone:z.string()
      
  
  })
 
export type addressSchemeForm = z.infer<typeof addressScheme>;
