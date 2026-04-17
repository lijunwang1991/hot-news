import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Flame, Clock, TrendingUp, Eye, Heart } from 'lucide-react';
import { NewsItem } from '../types';

const mockHotNews: NewsItem[] = [
  { id: '1', title: '全球科技峰会开幕，AI技术成焦点', summary: '来自世界各地的科技领袖齐聚一堂...', content: '', imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400', category: '科技', source: '科技日报', author: '张明', publishedAt: '2024-01-15T08:00:00Z', views: 125000, likes: 8900, isHot: true, isDaily: true },
  { id: '2', title: '新能源汽车销量创新高', summary: '今年新能源汽车市场表现亮眼...', content: '', imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400', category: '汽车', source: '汽车周刊', author: '李华', publishedAt: '2024-01-15T06:30:00Z', views: 98000, likes: 6500, isHot: true, isDaily: true },
  { id: '3', title: '股市今日大涨，投资者信心回升', summary: '受利好消息影响，今日股市全线飘红...', content: '', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a9a?w=400', category: '财经', source: '财经网', author: '王强', publishedAt: '2024-01-15T04:00:00Z', views: 87000, likes: 5200, isHot: true, isDaily: false },
  { id: '4', title: '新款智能手机发布，功能惊艳', summary: '备受期待的旗舰手机终于亮相...', content: '', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', category: '科技', source: '数码世界', author: '赵敏', publishedAt: '2024-01-14T22:00:00Z', views: 76000, likes: 4800, isHot: true, isDaily: true },
  { id: '5', title: '世界杯预选赛精彩回顾', summary: '昨晚的比赛充满悬念和惊喜...', content: '', imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400', category: '体育', source: '体育报', author: '刘洋', publishedAt: '2024-01-14T20:00:00Z', views: 65000, likes: 4100, isHot: true, isDaily: false },
];

const trendData = [
  { time: '00:00', hot: 65 }, { time: '04:00', hot: 45 }, { time: '08:00', hot: 85 },
  { time: '12:00', hot: 95 }, { time: '16:00', hot: 78 }, { time: '20:00', hot: 88 }, { time: '23:59', hot: 72 },
];

type TimeFilter = '24h' | 'week' | 'month';

const HotNews: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('24h');

  const filteredNews = useMemo(() => {
    return mockHotNews.slice(0, 20);
  }, [timeFilter]);

  const formatNumber = (num: number) => {
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Flame className="w-7 h-7 text-orange-500" />
          热门新闻
        </h1>
        <p className="text-gray-400 mt-1">实时追踪全网最热门的新闻动态</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              热度趋势
            </h3>
            <div className="flex gap-2">
              {(['24h', 'week', 'month'] as TimeFilter[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    timeFilter === filter
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
                  }`}
                >
                  {filter === '24h' ? '24小时' : filter === 'week' ? '本周' : '本月'}
                </button>
              ))}
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Line type="monotone" dataKey="hot" stroke="#f97316" strokeWidth={2} dot={{ fill: '#f97316' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800 rounded-xl p-4"
          >
            <div className="text-gray-400 text-sm mb-1">今日总热度</div>
            <div className="text-3xl font-bold text-orange-500">2.8M</div>
            <div className="text-green-400 text-sm mt-1">+12.5% 较昨日</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800 rounded-xl p-4"
          >
            <div className="text-gray-400 text-sm mb-1">热门文章数</div>
            <div className="text-3xl font-bold text-blue-500">156</div>
            <div className="text-green-400 text-sm mt-1">+8 较昨日</div>
          </motion.div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNews.map((news, index) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-slate-800 rounded-xl p-4 hover:bg-slate-750 transition-colors cursor-pointer group"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-xl">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors line-clamp-1">
                      {news.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1 line-clamp-1">{news.summary}</p>
                  </div>
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-20 h-14 rounded-lg object-cover flex-shrink-0"
                  />
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(news.publishedAt).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {formatNumber(news.views)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {formatNumber(news.likes)}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-700 text-xs">{news.category}</span>
                  <span className="text-gray-400">{news.source}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HotNews;
