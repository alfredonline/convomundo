import { Link, useLoaderData, useSearchParams } from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'
import { useState, useEffect } from 'react'
import TopicCard from '../components/topic-card'
import SidebarRight from '../components/sidebar-right';
import PopularTopicsCard from '../components/popular-topics-card';
import StatsCard from '../components/stats-card';
import SearchBar from '../components/searchbar';
import AdSense from '../components/adsense';
import Seo from '../components/seo';
import { production_api_url, development_api_url } from '../constants/api';
import { SITE_NAME } from '../constants/branding';
import NativeSpeakerVerifiedCard from '../components/native-speaker-verified-card';

const verifiedLanguages = [
  "English",
  "Spanish"
] // temporary but later on we will add this is a field in the schema. // TODO: Alfie, fix this. 

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
}

interface LandingLoaderData {
  topics: Topic[];
  didFetchSucceed: boolean;
  fetchErrorMessage?: string;
}

export const landingLoader = async ({ request }: LoaderFunctionArgs) => {
  // Get API URL and ensure it has the correct format
  const apiUrl = import.meta.env.DEV ? development_api_url : production_api_url;

  // Get language from URL query parameters, default to 'English'
  // request.url might be relative, so we need to construct a full URL
  const requestUrl = new URL(request.url, 'http://localhost');
  const langParam = requestUrl.searchParams.get('lang');
  const language = langParam || 'English';

  // Build API URL with language query parameter
  const apiUrlWithLang = new URL(`${apiUrl}/api/topics`);
  apiUrlWithLang.searchParams.set('lang', language);

  const fetchUrl = apiUrlWithLang.toString();

  try {
    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return {
        topics: [],
        didFetchSucceed: false,
        fetchErrorMessage: `Failed to fetch topics: ${response.statusText} (${response.status})`,
      } satisfies LandingLoaderData;
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error('Expected array but got:', typeof data, data);
      return {
        topics: [],
        didFetchSucceed: false,
        fetchErrorMessage: 'Invalid response format: expected an array of topics',
      } satisfies LandingLoaderData;
    }

    return {
      topics: data as Topic[],
      didFetchSucceed: true,
    } satisfies LandingLoaderData;
  } catch (error) {
    console.error('Fetch error details:', {
      error,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      url: fetchUrl,
    });

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    const humanMessage =
      errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')
        ? `We're having trouble getting topics right now, but you can still explore the site.`
        : `Network error: ${errorMessage}`;

    return {
      topics: [],
      didFetchSucceed: false,
      fetchErrorMessage: humanMessage,
    } satisfies LandingLoaderData;
  }
};

function topicMatchesSearch(topic: Topic, query: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  const title = (topic.title ?? '').toLowerCase();
  const summary = (topic.summary ?? '').toLowerCase();
  return title.includes(q) || summary.includes(q);
}

const landing = () => {
  const { topics, didFetchSucceed, fetchErrorMessage } = useLoaderData() as LandingLoaderData;
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current language from URL query params or default to English
  const currentLanguage = searchParams.get('lang') || 'English';

  // Search query synced with URL ?q=
  const urlQuery = searchParams.get('q') ?? '';
  const [searchQuery, setSearchQuery] = useState(urlQuery);

  useEffect(() => {
    setSearchQuery(urlQuery);
  }, [urlQuery]);

  const updateSearch = (value: string) => {
    setSearchQuery(value);
    const next = new URLSearchParams(searchParams);
    if (value.trim()) {
      next.set('q', value);
    } else {
      next.delete('q');
    }
    setSearchParams(next, { replace: true });
  };

  const filteredTopics = topics.filter((topic) => topicMatchesSearch(topic, searchQuery));

  // Stats and sidebar derived from filtered list
  const totalQuestions = filteredTopics.reduce((sum, topic) => sum + (topic.questions?.length || 0), 0);
  const totalVocabulary = filteredTopics.reduce((sum, topic) => sum + (topic.vocabulary?.length || 0), 0);
  const featuredTopic = filteredTopics.length > 0 ? filteredTopics[0] : null;
  const popularTopics = filteredTopics.slice(0, 3);

  const canonicalPath = searchParams.toString() ? `/?${searchParams.toString()}` : "/";

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue-50 to-slate-50">
      <Seo
        title={`Topics in ${currentLanguage}`}
        description={`Browse conversation topics in ${currentLanguage}. Find questions, vocabulary, and example sentences for language teaching.`}
        path={canonicalPath}
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `Topics in ${currentLanguage} - ${SITE_NAME}`,
          description: `Conversation topics in ${currentLanguage} for language learners and teachers.`,
        }}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg border border-brand-blue-200 overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                <div className="lg:col-span-7">
                  <h1 className="mt-5 text-slate-900 text-4xl md:text-5xl font-bold leading-tight">
                    Teach through conversation with <span className="text-brand-orange-500">{SITE_NAME}</span>
                  </h1>

                  <p className="mt-4 text-slate-700 text-lg leading-relaxed max-w-2xl">
                    Find ready-to-use topics, questions, vocabulary, and example sentences to keep your lessons flowing.
                    Browse by language and pick a topic in seconds.
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/languages"
                      className="inline-flex items-center justify-center px-5 py-3 bg-brand-orange-500 text-white font-semibold rounded-lg hover:bg-brand-orange-600 transition-colors duration-200"
                    >
                      Browse languages
                    </Link>
                    <Link
                      to={`/` + `?lang=${encodeURIComponent(currentLanguage)}`}
                      className="inline-flex items-center justify-center px-5 py-3 bg-white text-brand-orange-500 font-semibold rounded-lg border border-brand-orange-200 hover:bg-brand-blue-50 transition-colors duration-200"
                    >
                      Explore topics in {currentLanguage}
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="bg-brand-blue-50 border border-brand-blue-200 rounded-lg p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-slate-900 text-lg font-bold">
                          Topics in <span className="text-brand-orange-500">{currentLanguage}</span>
                        </h2>
                        <p className="mt-1 text-slate-700 text-sm leading-relaxed">
                          Use the sidebar stats and popular topics to find a great lesson fast.
                        </p>
                      </div>
                      <Link
                        to="/work-with-us"
                        className="inline-flex items-center justify-center px-3 py-2 bg-white text-slate-700 font-semibold rounded-lg border border-brand-blue-200 hover:bg-brand-blue-50 transition-colors duration-200 whitespace-nowrap"
                      >
                        Contribute
                      </Link>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      <div className="bg-white border border-brand-blue-200 rounded-lg p-3">
                        <div className="text-slate-900 text-xl font-bold">{topics.length}</div>
                        <div className="text-slate-600 text-xs font-semibold uppercase tracking-wide">Topics</div>
                      </div>
                      <div className="bg-white border border-brand-blue-200 rounded-lg p-3">
                        <div className="text-slate-900 text-xl font-bold">{totalQuestions}</div>
                        <div className="text-slate-600 text-xs font-semibold uppercase tracking-wide">Questions</div>
                      </div>
                      <div className="bg-white border border-brand-blue-200 rounded-lg p-3">
                        <div className="text-slate-900 text-xl font-bold">{totalVocabulary}</div>
                        <div className="text-slate-600 text-xs font-semibold uppercase tracking-wide">Words</div>
                      </div>
                    </div>


                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-brand-blue-200 text-slate-700 text-sm font-semibold">
                        Conversation questions
                      </span>
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-brand-blue-200 text-slate-700 text-sm font-semibold">
                        Key vocabulary
                      </span>
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-brand-blue-200 text-slate-700 text-sm font-semibold">
                        Example sentences
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search - filters topics below */}
        {topics.length > 0 && (
          <SearchBar onSearch={updateSearch} value={searchQuery} placeholder="Search topics..." />
        )}

        {/* Main Content with Sidebar */}
        {topics.length === 0 ? (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">No topics to show</h3>
              <p className="text-slate-700">
                {!didFetchSucceed
                  ? `We couldn't load topics right now. ${fetchErrorMessage ?? ''}`.trim()
                  : 'There are no topics for this language yet.'}
              </p>
            </div>
          </div>
        ) : filteredTopics.length === 0 ? (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">No topics match your search</h3>
              <p className="text-slate-700">
                No topics match &quot;{searchQuery}&quot;. Try a different search or clear the search to see all topics.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            {/* Topics Grid - Left Side */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {filteredTopics.map((topic) => (
                  <TopicCard key={topic._id} topic={topic} />
                ))}
              </div>
            </div>

            {/* Sidebar - Right Side */}
            <div className="lg:col-span-4">
              <div className="space-y-6">
                {/* Stats Card */}
                <StatsCard
                  totalTopics={filteredTopics.length}
                  totalQuestions={totalQuestions}
                  totalVocabulary={totalVocabulary}
                />
                {featuredTopic && featuredTopic.images && featuredTopic.images.length > 0 && (
                  <SidebarRight
                    imageUrl={featuredTopic.images[0]}
                    title={`Featured: ${featuredTopic.title}`}
                    description={
                      featuredTopic.summary ||
                      `Explore ${featuredTopic.questions?.length || 0} conversation questions about ${featuredTopic.title.toLowerCase()}.`
                    }
                    linkUrl={`/topic/${encodeURIComponent(featuredTopic.language || 'english')}/${featuredTopic._id}`}
                    linkText="Explore Topic"
                    isFeatured={true}
                  />
                )}
                {verifiedLanguages.includes(currentLanguage) && (
                  <div className="lg:col-span-1 mt-5">
                    <NativeSpeakerVerifiedCard language={currentLanguage} />
                  </div>
                )}

                {/* Popular Topics */}
                {popularTopics.length > 0 && (
                  <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Popular Topics</h3>
                    <div className="space-y-3">
                      {popularTopics.map((topic) => (
                        <PopularTopicsCard key={topic._id} topic={topic} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Ad unit */}
                <AdSense className="min-h-[100px]" />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default landing