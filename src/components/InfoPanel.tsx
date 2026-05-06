import { X, MapPin, User, BookOpen, Glasses, Headphones, MessageSquare, ChevronRight } from 'lucide-react';
import type { MapNode } from '@/data/mapNodes';

interface InfoPanelProps {
  node: MapNode | null;
  onClose: () => void;
  onEnterVR: (node: MapNode) => void;
}

export default function InfoPanel({ node, onClose, onEnterVR }: InfoPanelProps) {
  if (!node) return null;

  const getTagIcon = (tag: string) => {
    if (tag.includes('VR')) return <Glasses className="w-4 h-4" />;
    if (tag.includes('听诗') || tag.includes('导览')) return <Headphones className="w-4 h-4" />;
    if (tag.includes('AI') || tag.includes('对话')) return <MessageSquare className="w-4 h-4" />;
    if (tag.includes('AR') || tag.includes('展馆')) return <BookOpen className="w-4 h-4" />;
    return <ChevronRight className="w-4 h-4" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}>
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border-2 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #FAF6F0 0%, #F5F0E6 100%)',
          borderColor: node.color,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部装饰条 */}
        <div className="h-2 w-full" style={{ background: node.color }} />

        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 hover:bg-white transition-colors border border-stone-200"
        >
          <X className="w-5 h-5 text-stone-600" />
        </button>

        {/* 头部 */}
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-full text-white text-xl font-bold shadow-lg"
              style={{ background: node.color }}
            >
              {node.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-stone-800">{node.name}</h2>
              <p className="text-lg text-stone-500 mt-1">{node.subtitle}</p>
            </div>
          </div>

          {/* 人物标签 */}
          <div className="flex items-center gap-2 mt-4">
            <User className="w-4 h-4 text-stone-400" />
            <span
              className="px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ background: node.color }}
            >
              {node.person}
            </span>
          </div>

          {/* 技术标签 */}
          {node.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {node.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border"
                  style={{
                    borderColor: node.color + '40',
                    background: node.color + '15',
                    color: node.color,
                  }}
                >
                  {getTagIcon(tag)}
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 分隔线 */}
        <div className="mx-8 h-px bg-stone-200" />

        {/* 内容 */}
        <div className="p-8 pt-6 space-y-6">
          {/* 简介 */}
          <div>
            <h3 className="text-lg font-bold text-stone-700 mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5" style={{ color: node.color }} />
              人物简介
            </h3>
            <p className="text-stone-600 leading-relaxed text-base">{node.description}</p>
          </div>

          {/* 详情 */}
          <div>
            <h3 className="text-lg font-bold text-stone-700 mb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5" style={{ color: node.color }} />
              地点详情
            </h3>
            <p className="text-stone-600 leading-relaxed text-base">{node.detail}</p>
          </div>

          {/* VR 预览卡片 */}
          <div
            className="rounded-xl p-6 border"
            style={{
              borderColor: node.color + '30',
              background: `linear-gradient(135deg, ${node.color}10, ${node.color}05)`,
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Glasses className="w-6 h-6" style={{ color: node.color }} />
              <h4 className="text-lg font-bold text-stone-700">VR 沉浸体验</h4>
            </div>
            <p className="text-stone-600 mb-4">
              <span className="font-medium">{node.vrContent.title}</span> — 步入
              <span className="font-medium">「{node.vrContent.scene}」</span>
              ，身临其境感受历史的温度。
            </p>
            {node.vrContent.poem && (
              <div
                className="mb-4 p-4 rounded-lg border-l-4 text-stone-700 italic text-lg leading-relaxed"
                style={{
                  borderColor: node.color,
                  background: 'rgba(255,255,255,0.6)',
                }}
              >
                「{node.vrContent.poem}」
              </div>
            )}
            <button
              onClick={() => onEnterVR(node)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              style={{ background: node.color }}
            >
              <Glasses className="w-5 h-5" />
              进入 VR 全景体验
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 底部装饰 */}
        <div className="h-3 w-full opacity-30" style={{ background: node.color }} />
      </div>
    </div>
  );
}
