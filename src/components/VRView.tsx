import { useEffect, useRef, useState } from 'react';
import { X, Glasses, Headphones, RotateCcw } from 'lucide-react';
import type { MapNode } from '@/data/mapNodes';

interface VRViewProps {
  node: MapNode | null;
  onClose: () => void;
}

export default function VRView({ node, onClose }: VRViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewAngle, setViewAngle] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    if (!node) return;
    // Reset view angle when opening
    setViewAngle(0);
    setIsAudioPlaying(false);
  }, [node]);

  if (!node) return null;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    setViewAngle((x - 0.5) * 60);
  };

  const handleMouseLeave = () => {
    setViewAngle(0);
  };

  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      {/* VR 顶部栏 */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur">
            <Glasses className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{node.vrContent.title}</h3>
            <p className="text-white/60 text-sm">{node.vrContent.scene}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur hover:bg-white/30 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* VR 全景视窗 */}
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden cursor-move"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* 360度全景模拟 - 使用CSS渐变和动画模拟 */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            transform: `perspective(1000px) rotateY(${viewAngle}deg)`,
            background: `radial-gradient(circle at 50% 50%, ${node.color}30, #0a0a1a 80%)`,
          }}
        >
          {/* 场景层 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="absolute w-[200%] h-[200%] opacity-20"
              style={{
                background: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 100px,
                    ${node.color}20 100px,
                    ${node.color}20 101px
                  )
                `,
                transform: `rotateX(60deg) translateZ(-500px)`,
              }}
            />
          </div>

          {/* 天空/环境效果 */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(ellipse at 30% 20%, ${node.color}40 0%, transparent 50%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(ellipse at 70% 60%, #ffffff10 0%, transparent 40%)`,
              }}
            />
          </div>

          {/* 中央焦点内容 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-8 max-w-2xl">
              {/* 场景图标 */}
              <div
                className="mx-auto w-32 h-32 rounded-full flex items-center justify-center mb-8 border-4"
                style={{
                  borderColor: node.color + '60',
                  background: `radial-gradient(circle, ${node.color}30, transparent 70%)`,
                  boxShadow: `0 0 60px ${node.color}40`,
                }}
              >
                <span className="text-6xl">
                  {node.id.includes('mohe') ? '❄️' :
                    node.id.includes('suzhou') || node.id.includes('hanshansi') ? '🏮' :
                    node.id.includes('beijing') || node.id.includes('zhiyuan') || node.id.includes('danyuan') || node.id.includes('qiyuan') ? '🏯' :
                    node.id.includes('qiqihaer') ? '⚔️' :
                    '📜'}
                </span>
              </div>

              <h2 className="text-4xl font-bold text-white mb-4 tracking-wider">
                {node.vrContent.scene}
              </h2>

              {node.vrContent.poem && (
                <div className="mb-8 p-6 rounded-xl border border-white/20 bg-white/10 backdrop-blur">
                  <p className="text-2xl text-white/90 italic leading-relaxed tracking-wide">
                    「{node.vrContent.poem}」
                  </p>
                  <p className="text-white/50 mt-3 text-sm">—— {node.person}</p>
                </div>
              )}

              <p className="text-white/60 text-lg leading-relaxed">
                拖动鼠标探索全景空间 · 感受「{node.name}」的历史文化场景
              </p>
            </div>
          </div>

          {/* 地面网格 */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/3 opacity-10"
            style={{
              background: `linear-gradient(to top, ${node.color}30, transparent)`,
              transform: 'perspective(500px) rotateX(70deg)',
              transformOrigin: 'bottom center',
            }}
          />
        </div>

        {/* 十字准星 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 border border-white/30 rounded-full" />
          <div className="absolute w-1 h-4 bg-white/30" />
          <div className="absolute w-4 h-1 bg-white/30" />
        </div>

        {/* 视场角指示 */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-white/60 text-sm">
          <RotateCcw className="w-4 h-4" />
          <span>水平视场角: {Math.abs(viewAngle).toFixed(0)}°</span>
        </div>
      </div>

      {/* VR 底部控制栏 */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center justify-center gap-6">
          {/* 播放朗读 */}
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl backdrop-blur transition-all ${
              isAudioPlaying
                ? 'bg-white/30 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Headphones className="w-5 h-5" />
            <span className="font-medium">
              {isAudioPlaying ? '正在朗诵...' : '播放诗文朗诵'}
            </span>
          </button>

          {/* 返回地图 */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white/70 hover:bg-white/20 backdrop-blur transition-all"
          >
            <X className="w-5 h-5" />
            <span className="font-medium">退出 VR</span>
          </button>
        </div>
      </div>
    </div>
  );
}
