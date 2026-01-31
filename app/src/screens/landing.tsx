import { useLoaderData, useSearchParams } from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'
import TopicCard from '../components/topic-card'
import SidebarRight from '../components/sidebar-right';
import PopularTopicsCard from '../components/popular-topics-card';
import StatsCard from '../components/stats-card';
import { production_api_url, development_api_url } from '../constants/api';

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

export const landingLoader = async ({ request }: LoaderFunctionArgs) => {
  // Get API URL and ensure it has the correct format
  let apiUrl = production_api_url || development_api_url;
  console.log('apiUrl', apiUrl);

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
      const errorText = await response.text();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        url: fetchUrl,
      });
      throw new Response(`Failed to fetch topics: ${response.statusText} (${response.status})`, {
        status: response.status,
      });
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error('Expected array but got:', typeof data, data);
      throw new Response('Invalid response format: expected array', { status: 500 });
    }

    return data as Topic[];
  } catch (error) {
    console.error('Fetch error details:', {
      error,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      url: fetchUrl,
    });

    if (error instanceof Response) {
      throw error;
    }
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
      throw new Response(`Cannot connect to API at ${fetchUrl}. Check if the server is running and CORS is configured correctly.`, {
        status: 503,
      });
    }

    throw new Response(`Network error: ${errorMessage}`, {
      status: 500,
    });
  }
};

const landing = () => {
  const topics = useLoaderData() as Topic[];
  const [searchParams] = useSearchParams();

  // Get current language from URL query params or default to English
  const currentLanguage = searchParams.get('lang') || 'English';

  // Calculate dynamic stats
  const totalQuestions = topics.reduce((sum, topic) => sum + (topic.questions?.length || 0), 0);
  const totalVocabulary = topics.reduce((sum, topic) => sum + (topic.vocabulary?.length || 0), 0);
  const featuredTopic = topics.length > 0 ? topics[0] : null;
  const popularTopics = topics.slice(0, 3); // Top 3 topics as "popular"

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue-50 to-slate-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-slate-700 text-6xl font-bold leading-relaxed">
            Topics in <span className="text-brand-orange-500">{currentLanguage}</span>
          </p>
        </div>

        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Topics Grid - Left Side */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {topics.map((topic) => (
                <TopicCard key={topic._id} topic={topic} />
              ))}
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              {/* Featured Topic */}


              {/* Stats Card */}
              <StatsCard
                totalTopics={topics.length}
                totalQuestions={totalQuestions}
                totalVocabulary={totalVocabulary}
              />
              {featuredTopic && featuredTopic.images && featuredTopic.images.length > 0 && (
                <SidebarRight
                  imageUrl={featuredTopic.images[0]}
                  title={`Featured: ${featuredTopic.title}`}
                  description={featuredTopic.summary || `Explore ${featuredTopic.questions?.length || 0} conversation questions about ${featuredTopic.title.toLowerCase()}.`}
                  linkUrl={`/topic/${featuredTopic.language || 'english'}/${featuredTopic._id}`}
                  linkText="Explore Topic"
                  isFeatured={true}
                />
              )}


              {/* Popular Topics */}
              {popularTopics.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Popular Topics</h3>
                  <div className="space-y-3">
                    {popularTopics.map((topic) => (
                      <PopularTopicsCard
                        key={topic._id}
                        topic={topic}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default landing