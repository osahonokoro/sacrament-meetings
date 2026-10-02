"use client";

import { useActionState } from "react";
import { createMeeting, type ActionState } from "@/lib/actions";

const initialState: ActionState = null;

export default function NewMeetingPage() {
  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialState
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Create Meeting
      </h1>

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
          errors={state?.errors?.date}
        />
        <MeetingTypeField errors={state?.errors?.meetingType} />
        <Field
          id="presiding"
          label="Presiding"
          errors={state?.errors?.presiding}
        />
        <Field
          id="conducting"
          label="Conducting"
          errors={state?.errors?.conducting}
        />
        <Field
          id="openingPrayer"
          label="Opening Prayer"
          errors={state?.errors?.openingPrayer}
        />
        <Field
          id="closingPrayer"
          label="Closing Prayer"
          errors={state?.errors?.closingPrayer}
        />

        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-blue-700 text-white px-4 py-2 font-medium hover:bg-blue-800 disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Meeting"}
        </button>
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  errors,
}: {
  id: string;
  label: string;
  type?: string;
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

function MeetingTypeField({ errors }: { errors?: string[] }) {
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
        aria-describedby="meetingType-error"
        className="mt-1 w-full rounded border px-3 py-2"
        defaultValue="regular"
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