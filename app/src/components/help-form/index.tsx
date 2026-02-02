import { useForm, ValidationError } from '@formspree/react';

export default function HelpForm() {
  const [state, handleSubmit] = useForm('maqblqao');

  if (state.succeeded) {
    return (
      <div className="p-6 rounded-lg bg-brand-blue-50 border border-brand-blue-200 text-center">
        <p className="text-slate-800 font-semibold">
          Thanks for your suggestion!
        </p>
        <p className="text-slate-600 text-sm mt-2">
          We&apos;ll review your topic or question idea and get back to you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="help-form-email" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Email address
        </label>
        <input
          id="help-form-email"
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange-500 focus:border-transparent"
        />
        <div className="text-red-600 text-sm mt-1">
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
      </div>
      <div>
        <label htmlFor="help-form-message" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Your topic or question idea
        </label>
        <textarea
          id="help-form-message"
          name="message"
          required
          rows={5}
          placeholder="E.g. a conversation topic you'd like to see on ConvoMundo, or specific questions you use in class that we could add..."
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange-500 focus:border-transparent resize-y min-h-[120px]"
        />
        <div className="text-red-600 text-sm mt-1">
          <ValidationError prefix="Message" field="message" errors={state.errors} />
        </div>
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 bg-brand-orange-500 text-white font-semibold rounded-lg hover:bg-brand-orange-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {state.submitting ? 'Sending...' : 'Send suggestion'}
      </button>
    </form>
  );
}
