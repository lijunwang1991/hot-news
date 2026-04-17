import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Clock, Flame } from 'lucide-react';
import type { NewsItem } from '../types';

const mockDailyNews: NewsItem[] = [
  {
    id: '1',
    title: '全球科技峰会召开，AI技术成焦点',
    summary: '来自世界各地的科技领袖齐聚一堂，探讨人工智能的未来发展方向...',
    content: '',
    imageUrl: '',
    category: '科技',
    source: '科技日报',
    author: '张明',
    publishedAt: '2024-01-15T08:00:00Z',
    views: 125000,
    likes: 3200,
    isHot: true,
    isDaily: true
  },
  {
    id: '2',
    title: '新能源汽车销量创新高',
    summary: '本月新能源汽车销量突破历史记录，市场渗透率持续提升...',
    content: '',
    imageUrl: '',
    category: '财经',
    source: '财经网',
    author: '李华',
    publishedAt: '2024-01-15T10:30:00Z',
    views: 98000,
    likes: 2100,
    isHot: true,
    isDaily: true
  },
  {
    id: '3',
    title: '国际气候大会达成新协议',
    summary: '各国代表经过多轮谈判，就碳排放目标达成共识...',
    content: '',
    imageUrl: '',
    category: '国际',
    source: '环球时报',
    author: '王芳',
    publishedAt: '2024-01-15T14:00:00Z',
    views: 87000,
    likes: 1800,
    isHot: false,
    isDaily: true
  },
  {
    id: '4',
    title: '新款智能手机发布引发热议',
    summary: '搭载最新处理器和创新摄像技术，售价引发消费者讨论...',
    content: '',
    imageUrl: '',
    category: '科技',
    source: '数码之家',
    author: '赵强',
    publishedAt: '2024-01-15T16:45:00Z',
    views: 156000,
    likes: 4500,
    isHot: true,
    isDaily: true
  },
  {
    id: '5',
    title: '股市今日收盘点评',
    summary: '三大指数全线上涨，科技股表现亮眼，成交量明显放大...',
    content: '',
    imageUrl: '',
    category: '财经',
    source: '证券时报',
    author: '刘洋',
    publishedAt: '2024-01-15T18:00:00Z',
    views: 76000,
    likes: 1200,
    isHot: false,
    isDaily: true
  }
];

const DailyDigest: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
          <Flame className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">每日热点</h2>
          <p className="text-sm text-gray-500">今日最重要的 5 条新闻</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-300 via-red-300 to-gray-200" />
        
        <div className="space-y-4">
          {mockDailyNews.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-12"
            >
              <div className="absolute left-2 top-2 w-4 h-4 bg-white border-2 border-orange-400 rounded-full" />
              
              <motion.div
                className="bg-gray-50 rounded-xl p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleExpand(news.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                        {news.category}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(news.publishedAt)}
                      </span>
                      {news.isHot && (
                        <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          热
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 leading-tight">
                      {news.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedId === news.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {expandedId === news.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 text-sm mt-3 pt-3 border-t border-gray-200">
                        {news.summary}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                        <span>来源: {news.source}</span>
                        <span>阅读: {(news.views / 1000).toFixed(1)}k</span>
                        <span>点赞: {news.likes}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyDigest;
