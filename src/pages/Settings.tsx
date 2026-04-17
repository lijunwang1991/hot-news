import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Flame, Bookmark, Globe, Trash2 } from 'lucide-react';

const categories = ['科技', '财经', '体育', '娱乐', '国际', '国内', '健康', '教育'];

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [hotNewsAlert, setHotNewsAlert] = useState(true);
  const [language, setLanguage] = useState('zh');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['科技', '财经']);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearCache = () => {
    alert('缓存已清除');
  };

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
        checked ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    >
      <motion.div
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
        animate={{ left: checked ? '26px' : '4px' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-2xl mx-auto"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-8">设置</h1>

      <div className="space-y-6">
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-500" />
            通知设置
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">启用通知</span>
              <ToggleSwitch checked={notifications} onChange={() => setNotifications(!notifications)} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                每日摘要
              </span>
              <ToggleSwitch checked={dailyDigest} onChange={() => setDailyDigest(!dailyDigest)} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                热门新闻提醒
              </span>
              <ToggleSwitch checked={hotNewsAlert} onChange={() => setHotNewsAlert(!hotNewsAlert)} />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">偏好分类</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                  selectedCategories.includes(cat)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-500" />
            语言设置
          </h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="zh">简体中文</option>
            <option value="en">English</option>
          </select>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">数据管理</h2>
          <button
            onClick={clearCache}
            className="flex items-center gap-2 px-4 py-2 text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            清除缓存
          </button>
        </section>
      </div>
    </motion.div>
  );
};

export default Settings;
