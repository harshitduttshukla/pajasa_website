import { z } from 'zod';

export const bookingSearchSchema = z.object({
  city: z.string().min(1, 'Please select a destination city'),
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  guests: z.number().min(1, 'At least 1 guest required').max(10, 'Max 10 guests'),
});

export type BookingSearchFormValues = z.infer<typeof bookingSearchSchema>;

export const propertyBookingSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number'),
  companyName: z.string().optional(),
  checkIn: z.string().min(1, 'Check-in date required'),
  checkOut: z.string().min(1, 'Check-out date required'),
  guests: z.number().min(1),
  specialRequests: z.string().optional(),
});

export type PropertyBookingFormValues = z.infer<typeof propertyBookingSchema>;

export const newsletterSchema = z.object({
  email: z.string().email('Enter a valid corporate email'),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export const reviewSchema = z.object({
  authorName: z.string().min(2, 'Name is required'),
  authorCompany: z.string().min(2, 'Company name is required'),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'Review must be at least 10 characters long'),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
