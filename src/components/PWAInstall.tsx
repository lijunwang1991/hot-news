import React from 'react';
import { motion } from 'framer-motion';
import { Download, Bell, Check, X } from 'lucide-react';
import { usePWA, usePushNotification } from '../hooks/usePWA';

const PWAInstall: React.FC = () => {
  const { isInstallable, isInstalled, installApp } = usePWA();
  const { isSupported, isSubscribed, subscribe, unsubscribe } = usePushNotification();

  const handleInstall = async () => {
    await installApp();
  };

  const handleSubscribe = async () => {
    if (isSubscribed) {
      await unsubscribe();
    } else {
      await subscribe();
    }
  };

  if (!isInstallable && isInstalled) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 mb-6 text-white"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">安装应用到手机</h3>
            <p className="text-sm text-white/80">添加到主屏幕，随时获取新闻推送</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isInstallable && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleInstall}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium text-sm"
            >
              安装
            </motion.button>
          )}
        </div>
      </div>

      {isInstalled && isSupported && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5" />
              <span className="text-sm">每日新闻推送</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubscribe}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 ${
                isSubscribed
                  ? 'bg-green-500 text-white'
                  : 'bg-white/20 text-white'
              }`}
            >
              {isSubscribed ? (
                <>
                  <Check className="w-4 h-4" />
                  已开启
                </>
              ) : (
                '开启推送'
              )}
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PWAInstall;
