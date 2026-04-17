import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, TrendingUp, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NewsItem } from '../types';

const mockHotNews: NewsItem[] = [
  {
    id: '1',
    title: '全球科技峰会开幕，AI技术成焦点',
    summary: '来自世界各地的科技领袖齐聚一堂，探讨人工智能的未来发展方向...',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
    category: '科技',
    source: '科技日报',
    author: '张明',
    publishedAt: '2024-01-15T08:30:00Z',
    views: 12500,
    likes: 890,
    isHot: true,
    isDaily: true
  },
  {
    id: '2',
    title: '新能源汽车销量创新高',
    summary: '本月新能源汽车销量突破历史记录，市场渗透率持续提升...',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400',
    category: '财经',
    source: '财经网',
    author: '李华',
    publishedAt: '2024-01-15T07:00:00Z',
    views: 8900,
    likes: 560,
    isHot: true,
    isDaily: true
  }
];

const mockRecommendNews: NewsItem[] = [
  {
    id: '3',
    title: '健康生活方式：每天运动30分钟的好处',
    summary: '研究表明，每天保持30分钟运动可以显著改善身体健康...',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400',
    category: '健康',
    source: '健康时报',
    author: '王医生',
    publishedAt: '2024-01-14T18:00:00Z',
    views: 5600,
    likes: 420,
    isHot: false,
    isDaily: false
  },
  {
    id: '4',
    title: '2024年最值得期待的10部电影',
    summary: '从科幻大片到文艺佳作，今年电影市场精彩纷呈...',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
    category: '娱乐',
    source: '娱乐周刊',
    author: '影评人',
    publishedAt: '2024-01-14T15:30:00Z',
    views: 7800,
    likes: 650,
    isHot: false,
    isDaily: false
  }
];

const categories = [
  { id: 'tech', name: '科技', icon: 'fa-microchip', color: 'bg-blue-500' },
  { id: 'finance', name: '财经', icon: 'fa-chart-line', color: 'bg-green-500' },
  { id: 'sports', name: '体育', icon: 'fa-basketball-ball', color: 'bg-orange-500' },
  { id: 'entertainment', name: '娱乐', icon: 'fa-film', color: 'bg-purple-500' },
  { id: 'health', name: '健康', icon: 'fa-heartbeat', color: 'bg-red-500' },
  { id: 'travel', name: '旅游', icon: 'fa-plane', color: 'bg-cyan-500' }
];

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">欢迎回来</h1>
          <p className="text-blue-100">今日已为您精选 24 条热门资讯</p>
          <div className="flex gap-6 mt-6">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5" />
              <span>12 条热点</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>实时更新</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-bold text-gray-800">每日热点</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {mockHotNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
              >
                <img src={news.imageUrl} alt={news.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">热点</span>
                    <span className="text-gray-500 text-xs">{news.category}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{news.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{news.summary}</p>
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <span>{news.source}</span>
                    <span>{news.views.toLocaleString()} 阅读</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-800">推荐资讯</h2>
          </div>
          <div className="space-y-4">
            {mockRecommendNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex gap-4 cursor-pointer"
              >
                <img src={news.imageUrl} alt={news.title} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-xs text-blue-600 font-medium">{news.category}</span>
                  <h3 className="font-semibold text-gray-800 mb-1">{news.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{news.summary}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>{news.source}</span>
                    <span>{news.likes} 赞</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">快速分类</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 text-center cursor-pointer"
              >
                <Link to={`/categories?cat=${cat.id}`}>
                  <div className={`w-12 h-12 ${cat.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <i className={`fas ${cat.icon} text-white text-xl`}></i>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
