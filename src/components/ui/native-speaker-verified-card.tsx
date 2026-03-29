export function NativeSpeakerVerifiedCard({ language }: { language: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-brand-blue-200 bg-white shadow-lg">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-brand-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-brand-green-500">
            Verified by a native speaker of {language}
          </span>
        </div>
      </div>
    </div>
  );
}
