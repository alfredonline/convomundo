import { Link } from 'react-router';

interface Topic {
    _id: string;
    title: string;
    language?: string;
    questions?: string[];
}

const PopularTopicsCard = ({
    topic,
}: {
    topic: Topic;
}) => {
    return (
        <Link
            key={topic._id}
            to={`/topic/${encodeURIComponent(topic.language || 'english')}/${topic._id}`}
            className="block p-3 rounded-lg border border-slate-200 hover:border-brand-orange-500 hover:bg-brand-blue-50 transition-colors duration-200 group"
        >
            <h4 className="font-semibold text-slate-900 group-hover:text-slate-700 mb-1">
                {topic.title}
            </h4>
            <p className="text-xs text-slate-500">
                {topic.questions?.length || 0} questions
            </p>
        </Link>
    )
}

export default PopularTopicsCard