"use client";

import { useForm, ValidationError } from "@formspree/react";
import { FORMSPREE_FORM_ID } from "@/lib/constants";

export function HelpForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  if (state.succeeded) {
    return (
      <div className="rounded-lg border border-brand-blue-200 bg-brand-blue-50 p-6 text-center">
        <p className="font-semibold text-slate-800">Thanks for your suggestion!</p>
        <p className="mt-2 text-sm text-slate-600">
          We&apos;ll review your topic or question idea and get back to you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="help-form-email" className="mb-1.5 block text-sm font-semibold text-slate-700">
          Email address
        </label>
        <input
          id="help-form-email"
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-brand-orange-500 focus:outline-none"
        />
        <div className="mt-1 text-sm text-red-600">
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
      </div>

      <div>
        <label htmlFor="help-form-message" className="mb-1.5 block text-sm font-semibold text-slate-700">
          Your topic or question idea
        </label>
        <textarea
          id="help-form-message"
          name="message"
          required
          rows={5}
          placeholder="E.g. a conversation topic you'd like to see on ConvoMundo, or specific questions you use in class that we could add..."
          className="min-h-[120px] w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-brand-orange-500 focus:outline-none"
        />
        <div className="mt-1 text-sm text-red-600">
          <ValidationError prefix="Message" field="message" errors={state.errors} />
        </div>
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="inline-flex w-full items-center justify-center rounded-lg bg-brand-orange-500 px-5 py-3 font-semibold text-white transition-colors duration-200 hover:bg-brand-orange-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {state.submitting ? "Sending..." : "Send suggestion"}
      </button>
    </form>
  );
}
