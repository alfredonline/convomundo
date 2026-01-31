import { useLoaderData, Link } from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'
import { development_api_url, production_api_url } from '../constants/api';

const images = [
  {
    language: 'English',
    image: 'https://res.cloudinary.com/damqrrryq/image/upload/v1769680640/marcin-nowak-iXqTqC-f6jI-unsplash_khs38v.jpg',
  },
  {
    language: 'Spanish',
    image: 'https://res.cloudinary.com/damqrrryq/image/upload/v1769680753/jorge-fernandez-salas-ChSZETOal-I-unsplash_2_qrj8r2.jpg',
  },
  {
    language: 'French',
    image: 'https://res.cloudinary.com/damqrrryq/image/upload/v1769680687/chris-karidis-nnzkZNYWHaU-unsplash_lnc5al.jpg',
  },
  {
    language: 'Italian',
    image: 'https://res.cloudinary.com/damqrrryq/image/upload/v1769680720/sergey-omelchenko-_D6ttEOqGgo-unsplash_dd0p1d.jpg',
  },
]

/** Look up image URL by language name (matches API language string). */
function getImageForLanguage(language: string): string | undefined {
  const entry = images.find((img) => img.language === language);
  return entry?.image;
}

export const languagesLoader = async ({}: LoaderFunctionArgs) => {
  const apiUrl = production_api_url || development_api_url;
  const url = `${apiUrl}/api/languages`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Response(`Failed to fetch languages: ${response.statusText}`, {
        status: response.status,
      });
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Response('Invalid response format: expected array', { status: 500 });
    }
    
    // Sort languages alphabetically
    const sortedLanguages = data.sort((a, b) => a.localeCompare(b));
    
    return sortedLanguages as string[];
  } catch (error) {
    console.error('Fetch error:', error);
    
    if (error instanceof Response) {
      throw error;
    }
    
    throw new Response(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`, {
      status: 500,
    });
  }
};

const languages = () => {
  const languages = useLoaderData() as string[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-slate-700 text-6xl font-bold leading-relaxed mb-4">
            Available Languages
          </h1>
          <p className="text-slate-600 text-lg max-w-3xl">
            Explore conversation topics and questions in different languages. Select a language to view all available topics.
          </p>
        </div>

        {/* Languages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {languages.map((language) => {
            const imageUrl = getImageForLanguage(language);
            return (
              <Link
                key={language}
                to={`/?lang=${encodeURIComponent(language)}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-brand-orange-500 overflow-hidden group"
              >
                <div className="aspect-[4/3] w-full bg-slate-100 relative overflow-hidden">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={`${language} topics`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-orange-500 to-brand-orange-600">
                      <span className="text-white font-bold text-4xl">
                        {language.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand-orange-500 transition-colors">
                      {language}
                    </h2>
                    <svg
                      className="w-5 h-5 text-slate-400 group-hover:text-brand-orange-500 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-600">
                    View topics
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {languages.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 border border-slate-200 text-center mt-8">
            <p className="text-slate-600 text-lg">
              No languages available yet.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default languages