import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { HelpForm } from "@/components/ui/help-form";

export const metadata: Metadata = {
  title: "Work With Us",
  description:
    "Contribute to ConvoMundo, an open-source project for language teachers and learners. Help create conversation topics, vocabulary, and teaching resources.",
  alternates: {
    canonical: "/work-with-us",
  },
};

export default function WorkWithUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { id: 1, label: "Home", path: "/" },
            { id: 2, label: "Work With Us", path: "/work-with-us" },
          ]}
        />

        <div className="mb-8">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              <h1 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl lg:text-6xl">
                Work With Us
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-700">
                ConvoMundo is an open-source project, and we&apos;d love your help to make it even better. Join our community of contributors and help create valuable resources for language teachers and learners worldwide.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="mb-2 flex items-center gap-3 text-2xl font-bold text-slate-900 md:text-3xl">
                    <svg className="h-6 w-6 text-brand-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Open Source Project
                  </h2>
                  <p className="text-slate-600">Freely available code for the community</p>
                </div>
              </div>
              <p className="mb-4 leading-relaxed text-slate-700">
                ConvoMundo is proudly open source, meaning our code is freely available for anyone to view, use, and contribute to. We believe in the power of community collaboration to create better educational resources for language learners and teachers worldwide.
              </p>
              <p className="leading-relaxed text-slate-700">
                By making ConvoMundo open source, we&apos;re committed to transparency, continuous improvement, and giving back to the educational community.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="mb-2 flex items-center gap-3 text-2xl font-bold text-slate-900 md:text-3xl">
                    <svg className="h-6 w-6 text-brand-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    How to Contribute
                  </h2>
                  <p className="text-slate-600">Multiple ways to get involved</p>
                </div>
              </div>
              <p className="mb-6 leading-relaxed text-slate-700">
                We welcome contributions from developers, educators, and language enthusiasts! Whether you&apos;re fixing bugs, adding new features, improving documentation, or suggesting new conversation topics, your contributions help make ConvoMundo better for everyone.
              </p>
              <div className="space-y-3">
                {[
                  "Report bugs or suggest improvements",
                  "Add new conversation topics and questions",
                  "Improve code quality and documentation",
                  "Help translate content into different languages",
                  "Share feedback and ideas for new features",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-lg border border-slate-200 p-4 transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange-500 text-sm font-semibold text-white">
                        {index + 1}
                      </div>
                      <p className="flex-1 pt-1 text-base leading-relaxed text-slate-900">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-md">
              <div className="mb-6">
                <h2 className="mb-2 flex items-center gap-3 text-2xl font-bold text-slate-900 md:text-3xl">
                  <svg className="h-6 w-6 text-brand-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  Suggest a topic or question
                </h2>
                <p className="text-slate-600">Not a developer? No problem.</p>
              </div>
              <p className="mb-6 leading-relaxed text-slate-700">
                If you&apos;re a teacher or contributor and would like to add a conversation topic or questions to ConvoMundo without using GitHub, use the form below. Tell us your idea and we&apos;ll help get it onto convomundo.com.
              </p>
              <HelpForm />
            </div>
          </div>

          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-brand-orange-500 to-brand-orange-600 p-6 text-white shadow-md">
              <div className="mb-6">
                <svg className="mx-auto mb-4 h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="mb-2 text-center text-xl font-bold">Get Involved</h3>
                <p className="mb-6 text-center text-sm text-white/90">
                  Visit our GitHub repository to explore the codebase and contribute.
                </p>
              </div>
              <a
                href="https://github.com/alfredonline/convomundo"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center rounded-lg bg-white px-4 py-3 font-semibold text-brand-orange-500 transition-all duration-200 hover:bg-brand-blue-50"
              >
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                View Repository
                <svg className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-md">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
                <svg className="h-5 w-5 text-brand-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Why Contribute?
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                    title: "Build Your Portfolio",
                    desc: "Showcase your coding skills and contribute to a real-world project.",
                  },
                  {
                    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                    title: "Join a Community",
                    desc: "Connect with developers and educators passionate about language learning.",
                  },
                  {
                    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                    title: "Learn & Grow",
                    desc: "Gain experience with modern web technologies and best practices.",
                  },
                  {
                    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                    title: "Make a Difference",
                    desc: "Help create valuable resources for language teachers and students.",
                  },
                ].map((benefit) => (
                  <div key={benefit.title} className="rounded-lg border border-brand-blue-200 bg-brand-blue-50 p-4">
                    <h4 className="mb-2 flex items-center gap-2 text-base font-semibold text-slate-900">
                      <svg className="h-4 w-4 text-brand-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon} />
                      </svg>
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-slate-700">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
