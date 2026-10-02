"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addMeeting,
  updateMeeting,
  deleteMeeting,
} from "@/lib/meetings-db";
import type { SacramentMeeting } from "@/lib/types";

export type ActionState = {
  message?: string;
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    openingPrayer?: string[];
    closingPrayer?: string[];
  };
} | null;

const MEETING_TYPES = [
  "testimony",
  "regular",
  "stake",
  "general",
  "special",
] as const;

const MeetingFormSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD format"),
  meetingType: z.enum(MEETING_TYPES),
  presiding: z.string().min(2, "Presiding is required"),
  conducting: z.string().min(2, "Conducting is required"),
  openingPrayer: z.string().min(2, "Opening prayer is required"),
  closingPrayer: z.string().min(2, "Closing prayer is required"),
});

export async function createMeeting(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    openingPrayer: formData.get("openingPrayer"),
    closingPrayer: formData.get("closingPrayer"),
  };

  const parsed = MeetingFormSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const data: Omit<SacramentMeeting, "id"> = {
    ...parsed.data,
    announcements: [],
    openingHymn: { number: 1, title: "TBD" },
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 1, title: "TBD" },
    speakers: [],
    closingHymn: { number: 1, title: "TBD" },
  };

  try {
    await addMeeting(data);
  } catch (err) {
    console.error("createMeeting failed:", err);
    return { message: "Something went wrong saving the meeting." };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function updateMeetingAction(
  id: number,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    openingPrayer: formData.get("openingPrayer"),
    closingPrayer: formData.get("closingPrayer"),
  };

  const parsed = MeetingFormSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await updateMeeting(id, parsed.data);
  } catch (err) {
    console.error("updateMeeting failed:", err);
    return { message: "Something went wrong updating the meeting." };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function deleteMeetingAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;

  try {
    await deleteMeeting(id);
  } catch (err) {
    console.error("deleteMeeting failed:", err);
    throw new Error("Could not delete the meeting.");
  }

  revalidatePath("/meetings");
}