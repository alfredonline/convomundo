const NativeSpeakerVerifiedCard = ({ language }: { language: string }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-brand-blue-200 overflow-hidden">
        <div className="p-6">
              <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
                <span className="text-sm text-brand-green-500">Verified by a native speaker of {language}</span>
            </div>
        </div>
    </div>
  )
}

export default NativeSpeakerVerifiedCard