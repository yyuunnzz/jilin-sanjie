import { useState, useRef, useEffect, useCallback } from 'react';
import { mapNodes } from '@/data/mapNodes';
import type { MapNode } from '@/data/mapNodes';
import InfoPanel from '@/components/InfoPanel';
import VRView from '@/components/VRView';
import { ScrollText, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, MapPin, Glasses, Eye } from 'lucide-react';

export default function App() {
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
  const [vrNode, setVrNode] = useState<MapNode | null>(null);
  const [scale, setScale] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(true);

  const handleNodeClick = useCallback((node: MapNode) => {
    setSelectedNode(node);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleEnterVR = useCallback((node: MapNode) => {
    setSelectedNode(null);
    setVrNode(node);
  }, []);

  const handleCloseVR = useCallback(() => {
    setVrNode(null);
  }, []);

  const zoomIn = () => setScale((s) => Math.min(s + 0.15, 2.5));
  const zoomOut = () => setScale((s) => Math.max(s - 0.15, 0.5));
  const resetZoom = () => setScale(1);

  // 自动隐藏提示
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // 键盘导航
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (vrNode) setVrNode(null);
        else if (selectedNode) setSelectedNode(null);
      }
      if (e.key === 'ArrowLeft' && scrollRef.current) {
        scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      }
      if (e.key === 'ArrowRight' && scrollRef.current) {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [vrNode, selectedNode]);

  // 滚动按钮
  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' });

  // 区域的背景色
  const regionBands = [
    { name: '吉林故里', x: 0, width: 28, color: '#E8F4F0' },
    { name: '东北幕府', x: 28, width: 28, color: '#FDF8E8' },
    { name: '北京晚年', x: 56, width: 24, color: '#F0E8F4' },
    { name: '江南游历', x: 80, width: 20, color: '#E8F0F8' },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#1a1510]">

      {/* ========== 顶部标题栏 ========== */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 bg-gradient-to-b from-[#1a1510] via-[#1a1510]/90 to-transparent pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#8B6914]/30 border border-[#C4A852]/40 flex items-center justify-center">
            <ScrollText className="w-5 h-5 text-[#C4A852]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#F5F0E1] tracking-wider">
              「吉林三杰」数字文旅行迹图
            </h1>
            <p className="text-xs text-[#C4A852]/60">
              宋小濂 · 成多禄 · 徐鼐霖 | 横卷浏览 · 点击标记 · 沉浸VR
            </p>
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button onClick={zoomOut} className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 text-white/70 hover:bg-white/20 flex items-center justify-center transition">
            <ZoomOut className="w-4 h-4" />
          </button>
          <button onClick={resetZoom} className="px-3 h-9 rounded-lg bg-white/10 border border-white/10 text-white/70 hover:bg-white/20 text-sm font-medium transition">
            {Math.round(scale * 100)}%
          </button>
          <button onClick={zoomIn} className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 text-white/70 hover:bg-white/20 flex items-center justify-center transition">
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========== 横向滚动容器 ========== */}
      <div
        ref={scrollRef}
        className="w-full h-full overflow-x-auto overflow-y-hidden scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div
          className="relative h-full origin-top-left transition-transform"
          style={{
            width: `${100 * scale}vw`,
            minWidth: '1400px',
            transform: `scale(${scale})`,
            transformOrigin: '0 0',
          }}
        >
          {/* 底图背景层 */}
          <div
            className="absolute inset-0 bg-cover bg-left"
            style={{
              backgroundImage: 'url(/images/vintage_map.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* 区域半透明色带 */}
          {regionBands.map((r) => (
            <div
              key={r.name}
              className="absolute top-0 h-full opacity-20"
              style={{
                left: `${r.x}%`,
                width: `${r.width}%`,
                background: r.color,
              }}
            />
          ))}

          {/* 区域标签 */}
          {regionBands.map((r) => (
            <div
              key={r.name}
              className="absolute top-20 px-4 py-2 rounded-full border backdrop-blur-sm"
              style={{
                left: `${r.x + r.width / 2}%`,
                transform: 'translateX(-50%)',
                borderColor: r.color,
                background: r.color + '30',
              }}
            >
              <span className="text-sm font-bold" style={{ color: r.color }}>{r.name}</span>
            </div>
          ))}

          {/* 路线 SVG 层（虚线连接） */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            {/* 宋小濂路线 */}
            <path
              d="M 15,35 C 22,28 28,22 30,20 C 42,18 48,18 55,15 C 58,18 60,22 62,24 C 65,26 68,30 72,50"
              fill="none"
              stroke="#C25E3A"
              strokeWidth="2.5"
              strokeDasharray="10,6"
              opacity="0.6"
            />
            {/* 成多禄路线 */}
            <path
              d="M 22,30 C 26,26 30,22 32,20 C 36,18 38,20 42,18 C 44,20 46,24 48,28 C 52,34 56,40 60,48 C 65,52 70,54 75,55 C 80,60 84,68 88,75"
              fill="none"
              stroke="#2E8B78"
              strokeWidth="2.5"
              strokeDasharray="10,6"
              opacity="0.6"
            />
            {/* 徐鼐霖路线 */}
            <path
              d="M 28,38 C 29,32 30,26 32,20 C 40,18 50,22 60,30 C 68,38 72,45 78,52"
              fill="none"
              stroke="#4A6FA5"
              strokeWidth="2.5"
              strokeDasharray="10,6"
              opacity="0.6"
            />
          </svg>

          {/* 热点节点层 */}
          {mapNodes.map((node) => (
            <MapNodeHotspot key={node.id} node={node} onClick={handleNodeClick} />
          ))}

          {/* 底部横向时间轴 */}
          <div className="absolute bottom-0 left-0 right-0 h-14 flex items-center px-8 gap-1">
            {mapNodes.map((node) => (
              <button
                key={node.id}
                onClick={() => {
                  handleNodeClick(node);
                  // 滚动到节点位置
                  if (scrollRef.current) {
                    const containerW = scrollRef.current.clientWidth;
                    const targetX = (node.x / 100) * containerW * scale - containerW / 2;
                    scrollRef.current.scrollTo({ left: targetX, behavior: 'smooth' });
                  }
                }}
                className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105 border"
                style={{
                  background: node.color + '25',
                  borderColor: node.color + '50',
                  color: node.color,
                }}
              >
                {node.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========== 左右滚动按钮 ========== */}
      <button
        onClick={scrollLeft}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/40 backdrop-blur border border-white/20 text-white/70 hover:text-white hover:bg-black/60 flex items-center justify-center transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollRight}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/40 backdrop-blur border border-white/20 text-white/70 hover:text-white hover:bg-black/60 flex items-center justify-center transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* ========== 滚动提示 ========== */}
      {showHint && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 px-6 py-3 rounded-xl bg-black/60 backdrop-blur border border-white/20 text-white/80 flex items-center gap-3 animate-pulse">
          <RotateCcw className="w-5 h-5" />
          <span className="text-sm">← 横向滚动浏览卷轴 →</span>
          <Eye className="w-5 h-5" />
        </div>
      )}

      {/* ========== 左下角图例 ========== */}
      <div className="fixed bottom-20 left-6 z-40 p-4 rounded-xl bg-black/50 backdrop-blur border border-white/10 space-y-2 max-w-[200px]">
        <p className="text-white/70 text-sm font-bold mb-2">三杰行迹</p>
        <div className="flex items-center gap-2">
          <span className="w-6 h-1 rounded bg-[#C25E3A]" />
          <span className="text-white/50 text-xs">宋小濂</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-1 rounded bg-[#2E8B78]" />
          <span className="text-white/50 text-xs">成多禄</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-1 rounded bg-[#4A6FA5]" />
          <span className="text-white/50 text-xs">徐鼐霖</span>
        </div>
      </div>

      {/* ========== 弹窗层 ========== */}
      <InfoPanel node={selectedNode} onClose={handleClosePanel} onEnterVR={handleEnterVR} />
      <VRView node={vrNode} onClose={handleCloseVR} />
    </div>
  );
}

/* ========== 热点组件 ========== */
function MapNodeHotspot({ node, onClick }: { node: MapNode; onClick: (n: MapNode) => void }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="absolute"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: hover ? 30 : 20,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* 脉冲环 */}
      <div
        className="absolute rounded-full animate-ping"
        style={{
          width: 48,
          height: 48,
          left: -16,
          top: -16,
          background: node.color,
          opacity: 0.25,
        }}
      />

      {/* 热点按钮 */}
      <button
        onClick={() => onClick(node)}
        className="relative w-9 h-9 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform hover:scale-125"
        style={{
          background: node.color,
          boxShadow: `0 4px 20px ${node.color}70`,
        }}
      >
        <MapPin className="w-4 h-4 text-white" />
      </button>

      {/* 悬停大字卡片 */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none ${
          hover ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
        style={{ top: 40, width: 'max-content' }}
      >
        <div
          className="px-4 py-3 rounded-xl border-2 shadow-2xl backdrop-blur-md"
          style={{
            background: 'rgba(255,255,255,0.95)',
            borderColor: node.color,
          }}
        >
          <p className="text-lg font-bold text-stone-800">{node.name}</p>
          <p className="text-sm font-medium mt-0.5" style={{ color: node.color }}>
            {node.subtitle}
          </p>
          {node.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {node.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold text-white"
                  style={{ background: node.color }}
                >
                  {tag.includes('VR') && <Glasses className="w-3 h-3" />}
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-2 w-0 h-0"
          style={{
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: `10px solid ${node.color}`,
          }}
        />
      </div>
    </div>
  );
}
