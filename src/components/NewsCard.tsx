import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { NewsItem } from '../types';

interface NewsCardProps {
  news: NewsItem;
  onClick?: (news: NewsItem) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onClick }) => {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer"
      whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick?.(news)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-full object-cover"
        />
        {news.isHot && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            热门
          </div>
        )}
        {news.isDaily && (
          <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            日报
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {news.category}
          </span>
          <span className="text-xs text-gray-500">{news.source}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {news.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {news.summary}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {formatDistanceToNow(new Date(news.publishedAt), { locale: zhCN, addSuffix: true })}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={12} />
              {news.views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Heart size={12} />
              {news.likes.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
