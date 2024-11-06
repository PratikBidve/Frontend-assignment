import { z } from 'zod';

export const fieldSchema = z.object({
  label: z.string().min(1, { message: 'Field label is required' }),
  size: z.enum(['small', 'medium', 'large', 'extra-large']),
});

export const rowSchema = z.object({
  fields: z.array(fieldSchema).min(1, { message: 'At least one field is required' }),
});

export const sectionSchema = z.object({
  label: z.string().min(1, { message: 'Section label is required' }),
  rows: z.array(rowSchema).min(1, { message: 'At least one row is required' }),
});

export const formSchema = z.object({
  label: z.string().min(1, { message: 'Form label is required' }),
  viewType: z.enum(['Create', 'Edit', 'View']),
  sections: z.array(sectionSchema).min(1, { message: 'At least one section is required' }),
});

export type FormValues = z.infer<typeof formSchema>;
