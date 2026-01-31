const Topic = require('../schemas/Topic');

const getTopics = async (req, res) => {
    try {
        const { lang } = req.query;
                
        const filter = {};
        if (lang) {
            filter.language = { $regex: new RegExp(`^${lang}$`, 'i') };
        }
        
        const topics = await Topic.find(filter);
        res.json(topics);
    } catch (error) {
        console.error('GET /api/topics - Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const getTopicById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Topic ID is required' });
        }
        const topic = await Topic.findById(id);
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }
        res.json(topic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLanguages = async (_, res) => {
    try {
        const languages = await Topic.distinct('language');
        res.json(languages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTopics, getTopicById, getLanguages };