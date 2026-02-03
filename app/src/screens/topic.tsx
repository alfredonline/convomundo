import { useState } from "react";
import { useLoaderData, useParams } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import Breadcrumbs from "../components/breadcrumbs";
import Seo from "../components/seo";
import { development_api_url, production_api_url } from "../constants/api";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { ClassroomModeModal } from "../components/classroom-mode-modal";
import AdSense from "../components/adsense";
import { FaBookOpen } from "react-icons/fa";

interface Topic {
    _id: string;
    title: string;
    summary?: string;
    language?: string;
    questions?: string[];
    vocabulary?: string[];
    images?: string[];
    exampleSentences?: string[];
    collocations?: string[];
    createdAt?: string;
}



export const topicLoader = async ({ params }: LoaderFunctionArgs) => {
    const apiUrl = import.meta.env.DEV ? development_api_url : production_api_url;
    const id = params.id;

    if (!id) {
        throw new Response('Topic ID is required', { status: 400 });
    }

    const response = await fetch(`${apiUrl}/api/topics/${id}`);

    if (!response.ok) {
        throw new Response(`Failed to fetch topic: ${response.statusText}`, {
            status: response.status,
        });
    }

    const data = await response.json();
    return data as Topic;
};

const Topic = () => {
    const topic = useLoaderData() as Topic;
    const params = useParams<{ language: string; id: string }>();
    const [isClassroomModeOpen, setIsClassroomModeOpen] = useState(false);

    useScrollToTop();

    const topicPath = params.language && params.id ? `/topic/${params.language}/${params.id}` : "";
    const ogImage = topic.images?.[0];

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-slate-100">
            <Seo
                title={topic.title}
                description={topic.summary ?? `Conversation topic: ${topic.title}. Questions, vocabulary, and example sentences for language teaching.`}
                path={topicPath}
                image={ogImage}
                schemaMarkup={{
                    "@context": "https://schema.org",
                    "@type": "Article",
                    headline: topic.title,
                    description: topic.summary ?? topic.title,
                    image: ogImage ? [ogImage] : undefined,
                }}
            />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumbs items={
                    [
                        { id: 1, label: 'Home', path: '/' },
                        { id: 1, label: 'Languages', path: '/languages' },
                        { id: 2, label: 'Topics', path: '/' },
                        { id: 3, label: topic.title, path: `/topic/${encodeURIComponent(topic.language || 'english')}/${topic._id}` },
                    ]
                } />

                {/* Header Section */}
                <div className="mb-8"> 
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                {topic.language && (
                                    <span className="px-3 py-1 text-sm font-semibold text-slate-700 bg-slate-100 rounded-full">
                                        {topic.language}
                                    </span>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setIsClassroomModeOpen(true)}
                                    className="inline-flex items-center justify-center px-4 py-2 bg-brand-orange-500 text-white font-semibold rounded-lg hover:bg-brand-orange-600 transition-colors duration-200"
                                >
                                    <FaBookOpen />
                                    <span className="ml-2">Classroom mode</span>
                                </button>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                                {topic.title}
                            </h1>
                            {topic.summary && topic.language !== "English" && (
                                <p className="text-lg text-slate-700 leading-relaxed max-w-3xl">
                                    {topic.summary}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <ClassroomModeModal
                    isOpen={isClassroomModeOpen}
                    onClose={() => setIsClassroomModeOpen(false)}
                    topicTitle={topic.title}
                    topicLanguage={topic.language}
                    summary={topic.summary}
                    questions={topic.questions}
                    vocabulary={topic.vocabulary}
                />

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content - Questions */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6 mb-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                        Conversation Questions
                                    </h2>
                                    <p className="text-slate-600">
                                        {topic.questions?.length || 0} questions to spark engaging discussions
                                    </p>
                                </div>
                            </div>

                            {topic.questions && topic.questions.length > 0 ? (
                                <div className="space-y-4">
                                    {topic.questions.map((question, index) => (
                                        <div
                                            key={index}
                                            className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors duration-200"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange-500 text-white flex items-center justify-center font-semibold text-sm">
                                                    {index + 1}
                                                </div>
                                                <p className="text-slate-900 text-base leading-relaxed flex-1 pt-1">
                                                    {question}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-slate-600 text-lg">
                                        No questions available for this topic yet.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Vocabulary, Sentences, Collocations */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Vocabulary Section */}
                        {topic.vocabulary && topic.vocabulary.length > 0 && (
                            <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-brand-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    Vocabulary
                                    <span className="text-sm font-normal text-slate-500">
                                        ({topic.vocabulary.length})
                                    </span>
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {topic.vocabulary.map((word, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-brand-blue-100 rounded-lg border border-brand-blue-200 hover:bg-brand-blue-200 transition-colors"
                                        >
                                            {word}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Example Sentences Section */}
                        {topic.exampleSentences && topic.exampleSentences.length > 0 && (
                            <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-brand-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                    Example Sentences
                                    <span className="text-sm font-normal text-slate-500">
                                        ({topic.exampleSentences.length})
                                    </span>
                                </h3>
                                <div className="space-y-3">
                                    {topic.exampleSentences.map((sentence, index) => (
                                        <div
                                            key={index}
                                            className="p-3 rounded-lg bg-brand-blue-50 border-l-4 border-brand-blue-300"
                                        >
                                            <p className="text-slate-700 text-sm leading-relaxed italic">
                                                &quot;{sentence}&quot;
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Collocations Section */}
                        {topic.collocations && topic.collocations.length > 0 && (
                            <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-brand-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Collocations
                                    <span className="text-sm font-normal text-slate-500">
                                        ({topic.collocations.length})
                                    </span>
                                </h3>
                                <div className="space-y-2">
                                    {topic.collocations.map((collocation, index) => (
                                        <div
                                            key={index}
                                            className="p-2.5 rounded-lg bg-brand-green-50 border border-brand-green-200 hover:bg-brand-green-100 transition-colors"
                                        >
                                            <p className="text-slate-700 text-sm font-medium">
                                                {collocation}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quick Stats */}
                        <div className="bg-gradient-to-br from-brand-orange-500 to-brand-orange-600 rounded-lg shadow-md border border-slate-200 p-6 text-white">
                            <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-white/90">Questions</span>
                                    <span className="text-2xl font-bold">{topic.questions?.length || 0}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/90">Vocabulary</span>
                                    <span className="text-2xl font-bold">{topic.vocabulary?.length || 0}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/90">Examples</span>
                                    <span className="text-2xl font-bold">{topic.exampleSentences?.length || 0}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/90">Collocations</span>
                                    <span className="text-2xl font-bold">{topic.collocations?.length || 0}</span>
                                </div>
                            </div>
                        </div>

                        {/* Ad unit */}
                        <AdSense className="min-h-[100px]" />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Topic;