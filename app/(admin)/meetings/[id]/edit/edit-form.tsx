"use client";

import { useActionState } from "react";
import { updateMeetingAction, type ActionState } from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

const initialState: ActionState = null;

export default function EditMeetingForm({
  meeting,
}: {
  meeting: SacramentMeeting;
}) {
  const boundAction = updateMeetingAction.bind(null, meeting.id);
  const [state, formAction, isPending] = useActionState(
    boundAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-5 max-w-xl">
      {state?.message && (
        <p
          role="alert"
          aria-live="polite"
          className="rounded bg-red-50 border border-red-300 px-3 py-2 text-red-800 text-sm"
        >
          {state.message}
        </p>
      )}

      <Field
        id="date"
        label="Date (YYYY-MM-DD)"
        type="date"
        defaultValue={meeting.date}
        errors={state?.errors?.date}
      />
      <MeetingTypeField
        defaultValue={meeting.meetingType}
        errors={state?.errors?.meetingType}
      />
      <Field
        id="presiding"
        label="Presiding"
        defaultValue={meeting.presiding}
        errors={state?.errors?.presiding}
      />
      <Field
        id="conducting"
        label="Conducting"
        defaultValue={meeting.conducting}
        errors={state?.errors?.conducting}
      />
      <Field
        id="openingPrayer"
        label="Opening Prayer"
        defaultValue={meeting.openingPrayer}
        errors={state?.errors?.openingPrayer}
      />
      <Field
        id="closingPrayer"
        label="Closing Prayer"
        defaultValue={meeting.closingPrayer}
        errors={state?.errors?.closingPrayer}
      />

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-blue-700 text-white px-4 py-2 font-medium hover:bg-blue-800 disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  defaultValue,
  errors,
}: {
  id: string;
  label: string;
  type?: string;
  defaultValue?: string;
  errors?: string[];
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-800">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        defaultValue={defaultValue}
        aria-describedby={`${id}-error`}
        className="mt-1 w-full rounded border px-3 py-2"
      />
      <p
        id={`${id}-error`}
        aria-live="polite"
        className="mt-1 text-sm text-red-600 min-h-[1.25rem]"
      >
        {errors?.[0] ?? ""}
      </p>
    </div>
  );
}

function MeetingTypeField({
  defaultValue,
  errors,
}: {
  defaultValue?: string;
  errors?: string[];
}) {
  return (
    <div>
      <label
        htmlFor="meetingType"
        className="block text-sm font-medium text-gray-800"
      >
        Meeting Type
      </label>
      <select
        id="meetingType"
        name="meetingType"
        defaultValue={defaultValue ?? "regular"}
        aria-describedby="meetingType-error"
        className="mt-1 w-full rounded border px-3 py-2"
      >
        <option value="regular">Regular</option>
        <option value="testimony">Testimony</option>
        <option value="stake">Stake</option>
        <option value="general">General</option>
        <option value="special">Special</option>
      </select>
      <p
        id="meetingType-error"
        aria-live="polite"
        className="mt-1 text-sm text-red-600 min-h-[1.25rem]"
      >
        {errors?.[0] ?? ""}
      </p>
    </div>
  );
}