// client/src/components/ui/BannerTicker.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function BannerTicker({
  items = [
    "Welcome to Vaccination System !", 
    "Keep your schedule on time.", 
    "Protect Yourself and Your Community.", 
    "Stronger Together with Every Shot."
    ],
  gap = 48,          // 每条之间的间距
  pxPerSec = 90,     // 速度：每秒移动像素
}) {
  const wrapRef = useRef(null);
  const groupRef = useRef(null);
  const [copies, setCopies] = useState(4);   // 会根据测量动态调整
  const [distance, setDistance] = useState(800); // 单次动画移动距离（px）

  const base = useMemo(() => items.filter(Boolean), [items]);

  // 测量：计算“最小需要的副本数”，保证至少铺满容器 2 倍宽
  useEffect(() => {
    const measure = () => {
      if (!wrapRef.current || !groupRef.current) return;
      const wrapW = wrapRef.current.clientWidth;
      const groupW = groupRef.current.scrollWidth; // 一组内容的宽度
      if (groupW === 0) return;

      // 需要的副本：让“半程宽度”（用于无缝循环）≥ 容器宽；再 +1 防抖
      const needHalf = Math.ceil(wrapW / groupW) + 1;
      const totalCopies = Math.max(2, needHalf * 2); // 总副本数(偶数)，一半作为动画的“半程”
      setCopies(totalCopies);

      // 动画每次移动“半程”的宽度（即 totalCopies/2 组的宽度）
      setDistance((totalCopies / 2) * groupW);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    if (groupRef.current) ro.observe(groupRef.current);
    return () => ro.disconnect();
  }, [base, gap]);

  const duration = distance > 0 ? distance / pxPerSec : 30; // 秒

  // 生成 N 份副本（第一份挂 ref 以便测量）
  const groups = Array.from({ length: copies }, (_, i) => (
    <TrackGroup
      key={i}
      ref={i === 0 ? groupRef : undefined}
      items={base}
      gap={gap}
    />
  ));

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        overflow: "hidden",
        whiteSpace: "nowrap",
        borderTop: "1px solid rgba(255,255,255,.08)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
        background: "var(--bg,#0f1115)",
        padding: "6px 0",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          willChange: "transform",
          animation: `ticker-move ${duration}s linear infinite`,
        }}
      >
        {groups}
      </div>

      <style>{`
        @keyframes ticker-move {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${distance}px); }
        }
      `}</style>
    </div>
  );
}

const TrackGroup = React.forwardRef(function TrackGroup({ items, gap }, ref) {
  return (
    <div ref={ref} style={{ display: "inline-flex", gap, paddingRight: gap }}>
      {items.map((t, i) => (
        <span
          key={i}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            color: "var(--text,#d6d9e0)",
            fontSize: 14,
            opacity: .95,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 6,
              background: "var(--accent,#6ea8fe)",
              flex: "0 0 6px",
            }}
          />
          {t}
        </span>
      ))}
    </div>
  );
});
