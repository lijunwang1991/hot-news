import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Bell, Check, Smartphone } from 'lucide-react';

const PWAInstall: React.FC = () => {
  const [showInstall, setShowInstall] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as any).standalone === true;

    const iOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOSDevice);

    if (!isStandalone) {
      setShowInstall(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (isIOS) {
      alert('请点击浏览器底部的"分享"按钮，然后选择"添加到主屏幕"');
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstall(false);
      }
      setDeferredPrompt(null);
    } else {
      alert('请使用浏览器菜单中的"添加到主屏幕"或"安装应用"选项');
    }
  };

  const handleDismiss = () => {
    setShowInstall(false);
  };

  if (!showInstall) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 mb-6 text-white relative"
    >
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-white/60 hover:text-white"
      >
        ×
      </button>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <Smartphone className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">安装应用到手机</h3>
          <p className="text-sm text-white/80">
            {isIOS
              ? '点击分享按钮，选择"添加到主屏幕"'
              : '添加到主屏幕，随时获取新闻推送'}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleInstall}
          className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium text-sm whitespace-nowrap"
        >
          {isIOS ? '查看方法' : '安装'}
        </motion.button>
      </div>

      {isIOS && (
        <div className="mt-3 pt-3 border-t border-white/20 text-sm text-white/90">
          <p>iOS用户安装步骤：</p>
          <ol className="list-decimal list-inside mt-1 space-y-1 text-white/80">
            <li>点击底部分享按钮 <span className="inline-block w-5 h-5 bg-white/20 rounded text-center leading-5">□</span></li>
            <li>向上滑动找到"添加到主屏幕"</li>
            <li>点击"添加"完成安装</li>
          </ol>
        </div>
      )}
    </motion.div>
  );
};

export default PWAInstall;
