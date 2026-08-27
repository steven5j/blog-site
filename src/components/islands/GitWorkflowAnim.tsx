import { useEffect, useId, useState } from 'react';

export type GitWorkflowVariant =
  | 'gitflow'
  | 'github'
  | 'gitlab'
  | 'tbd'
  | 'practice';

interface Props {
  variant: GitWorkflowVariant;
}

const COPY: Record<
  GitWorkflowVariant,
  {
    title: string;
    steps: string[];
    legend: { color: string; label: string }[];
  }
> = {
  gitflow: {
    title: 'GitFlow 工作流程動畫',
    steps: [
      '從 develop 開 feature/login，開發後合回 develop',
      '從 develop 切 release/v2.0，hardening 後合進 main 與 develop',
      'hotfix 從 main 開，修完必須合回 main 與 develop',
    ],
    legend: [
      { color: '#2563eb', label: 'main（生產就緒）' },
      { color: '#059669', label: 'develop（整合）' },
      { color: '#7c3aed', label: 'feature' },
      { color: '#d97706', label: 'release' },
      { color: '#dc2626', label: 'hotfix' },
    ],
  },
  github: {
    title: 'GitHub Flow 工作流程動畫',
    steps: [
      '從永遠可部署的 main 開短期分支',
      '開 PR、通過審查與 CI 後合回 main',
      '合併後立即部署到 Production',
    ],
    legend: [
      { color: '#2563eb', label: 'main（永遠可部署）' },
      { color: '#7c3aed', label: '短期 feature' },
      { color: '#d97706', label: 'PR 審查' },
      { color: '#059669', label: '自動部署' },
    ],
  },
  gitlab: {
    title: 'GitLab Flow（環境分支）動畫',
    steps: [
      '功能從 main 開發，MR 合進 main（上游真相來源）',
      '同一批 commit 只往下游流：main → staging → production',
      'hotfix 先合 main，再 cherry-pick 到環境分支，避免線上修好、main 沒有',
    ],
    legend: [
      { color: '#2563eb', label: 'main（上游）' },
      { color: '#0d9488', label: 'staging' },
      { color: '#1d4ed8', label: 'production' },
      { color: '#7c3aed', label: 'feature' },
    ],
  },
  tbd: {
    title: 'Trunk-Based Development 動畫',
    steps: [
      '三人在同一主幹上密集提交，分支生命週期小於一天',
      '每次提交觸發 CI，並可持續部署到生產',
      'Feature Flag 關掉時使用者看不到半成品；週五才打開',
    ],
    legend: [
      { color: '#2563eb', label: 'trunk / main' },
      { color: '#db2777', label: 'Alice' },
      { color: '#0891b2', label: 'Bob' },
      { color: '#65a30d', label: 'Charlie' },
      { color: '#d97706', label: 'Feature Flag' },
    ],
  },
  practice: {
    title: '筆者團隊：環境優先動畫',
    steps: [
      '從 master 開 feature／bugfix，經 MR 合進 staging',
      '環境優先：測試／UAT 通過後，再 MR 合進 master 上正式',
      'hotfix 仍從 master 切；能先經 staging 就先經，來不及才先合 master 再補回 staging',
    ],
    legend: [
      { color: '#1d4ed8', label: 'master（正式）' },
      { color: '#0d9488', label: 'staging（測試／UAT）' },
      { color: '#7c3aed', label: 'feature / bugfix' },
      { color: '#dc2626', label: 'hotfix' },
    ],
  },
};

function Dot({
  x,
  y,
  color,
  delay,
  pulse,
}: {
  x: number;
  y: number;
  color: string;
  delay: number;
  pulse?: boolean;
}) {
  return (
    <circle
      className={pulse ? 'gwa-commit gwa-pulse' : 'gwa-commit'}
      cx={x}
      cy={y}
      style={{ color, animationDelay: `${delay}s` }}
    />
  );
}

function Lane({
  d,
  color,
  delay,
}: {
  d: string;
  color: string;
  delay: number;
}) {
  return (
    <path
      className="gwa-line gwa-draw"
      pathLength={1}
      d={d}
      style={{ stroke: color, animationDelay: `${delay}s` }}
    />
  );
}

function Merge({
  d,
  color,
  delay,
  markerId,
}: {
  d: string;
  color: string;
  delay: number;
  markerId: string;
}) {
  return (
    <path
      className="gwa-merge"
      pathLength={1}
      d={d}
      markerEnd={`url(#${markerId})`}
      style={{ color, animationDelay: `${delay}s` }}
    />
  );
}

function ArrowDef({ id }: { id: string }) {
  return (
    <marker
      id={id}
      markerUnits="userSpaceOnUse"
      markerWidth="9"
      markerHeight="9"
      refX="8"
      refY="4.5"
      orient="auto"
    >
      <polygon points="0 1.2, 9 4.5, 0 7.8" fill="currentColor" />
    </marker>
  );
}

function GitFlowSvg({ markerId }: { markerId: string }) {
  const main = '#2563eb';
  const develop = '#059669';
  const feature = '#7c3aed';
  const release = '#d97706';
  const hotfix = '#dc2626';

  return (
    <svg className="gwa-svg" viewBox="0 0 840 400" role="img" aria-hidden="true">
      <defs>
        <ArrowDef id={markerId} />
      </defs>
      <text x="118" y="26" className="gwa-time">
        週一
      </text>
      <text x="300" y="26" className="gwa-time">
        週三
      </text>
      <text x="500" y="26" className="gwa-time">
        週五
      </text>
      <text x="700" y="26" className="gwa-time">
        下週
      </text>

      <text x="16" y="94" className="gwa-label" fill={main}>
        main
      </text>
      <Lane d="M 88 90 H 820" color={main} delay={0} />
      <Dot x={130} y={90} color={main} delay={0.2} />
      <Dot x={220} y={90} color={main} delay={0.45} />
      <Dot x={560} y={90} color={main} delay={4.2} />
      <Dot x={760} y={90} color={main} delay={5.9} pulse />

      <text x="16" y="174" className="gwa-label" fill={develop}>
        develop
      </text>
      <Lane d="M 88 170 H 820" color={develop} delay={0.15} />
      <Dot x={150} y={170} color={develop} delay={0.35} />
      <Dot x={240} y={170} color={develop} delay={0.7} />
      <Dot x={360} y={170} color={develop} delay={2.35} />
      <Dot x={500} y={170} color={develop} delay={4.35} />
      <Dot x={700} y={170} color={develop} delay={6.15} />

      <text x="198" y="238" className="gwa-label" fill={feature}>
        feature/login
      </text>
      <Lane d="M 200 176 V 250 H 360" color={feature} delay={0.85} />
      <text x="268" y="272" className="gwa-icon" style={{ animationDelay: '1.15s' }}>
        👨‍💻
      </text>
      <Dot x={250} y={250} color={feature} delay={1.2} />
      <Dot x={310} y={250} color={feature} delay={1.7} pulse />
      <Dot x={360} y={250} color={feature} delay={2.1} />
      <Merge d="M 360 250 V 170" color={feature} delay={2.2} markerId={markerId} />

      <text x="438" y="298" className="gwa-label" fill={release}>
        release/v2.0
      </text>
      <Lane d="M 440 176 V 310 H 560" color={release} delay={2.7} />
      <Dot x={480} y={310} color={release} delay={3.15} />
      <Dot x={530} y={310} color={release} delay={3.55} />
      <Merge d="M 500 310 V 170" color={release} delay={3.85} markerId={markerId} />
      <Merge d="M 560 310 V 90" color={release} delay={4.05} markerId={markerId} />

      <text x="618" y="358" className="gwa-label" fill={hotfix}>
        hotfix
      </text>
      <text x="618" y="388" className="gwa-note" fill={hotfix}>
        從 main 開
      </text>
      <Lane d="M 640 96 V 370 H 760" color={hotfix} delay={4.7} />
      <Dot x={690} y={370} color={hotfix} delay={5.2} pulse />
      <Merge d="M 700 370 V 170" color={hotfix} delay={5.55} markerId={markerId} />
      <Merge d="M 760 370 V 90" color={hotfix} delay={5.75} markerId={markerId} />
    </svg>
  );
}

function GitHubSvg({ markerId }: { markerId: string }) {
  const main = '#2563eb';
  const feature = '#7c3aed';
  const checkout = '#0891b2';
  const ok = '#059669';
  const yMain = 100;
  const yFix = 178;
  const yCo = 250;
  const forkFix = 200;
  const mergeFix = 400;
  const forkCo = 420;
  const mergeCo = 720;

  return (
    <svg className="gwa-svg" viewBox="0 0 840 300" role="img" aria-hidden="true">
      <defs>
        <ArrowDef id={markerId} />
      </defs>
      <text x="100" y="26" className="gwa-time" textAnchor="middle">
        10:00
      </text>
      <text x="300" y="26" className="gwa-time" textAnchor="middle">
        10:30
      </text>
      <text x="500" y="26" className="gwa-time" textAnchor="middle">
        11:00
      </text>
      <text x="700" y="26" className="gwa-time" textAnchor="middle">
        11:30
      </text>

      <text x="16" y="104" className="gwa-label" fill={main}>
        main
      </text>
      <Lane d="M 88 100 H 820" color={main} delay={0} />
      <Dot x={120} y={yMain} color={main} delay={0.15} />
      <Dot x={forkFix} y={yMain} color={main} delay={0.35} />
      <Dot x={forkCo} y={yMain} color={main} delay={1.05} />
      <Dot x={mergeFix} y={yMain} color={main} delay={2.45} />
      <Dot x={mergeCo} y={yMain} color={main} delay={3.7} />
      <text
        x={mergeFix}
        y={76}
        className="gwa-icon"
        textAnchor="middle"
        style={{ animationDelay: '2.6s' }}
      >
        🚀
      </text>
      <text
        x={mergeCo}
        y={76}
        className="gwa-icon"
        textAnchor="middle"
        style={{ animationDelay: '3.85s' }}
      >
        🚀
      </text>

      <text x={forkFix + 10} y={yFix - 12} className="gwa-label" fill={feature}>
        fix-profile-upload
      </text>
      <Lane
        d={`M ${forkFix} ${yMain + 6} V ${yFix} H ${mergeFix}`}
        color={feature}
        delay={0.5}
      />
      <Dot x={280} y={yFix} color={feature} delay={0.9} />
      <Dot x={360} y={yFix} color={feature} delay={1.35} pulse />
      <Dot x={mergeFix} y={yFix} color={feature} delay={1.9} />
      <text
        x={280}
        y={yFix + 22}
        className="gwa-icon"
        textAnchor="middle"
        style={{ animationDelay: '1s' }}
      >
        👨‍💻
      </text>
      <rect
        x={226}
        y={yFix + 28}
        width="108"
        height="20"
        rx="4"
        className="gwa-badge"
        style={{ animationDelay: '1.55s' }}
      />
      <text
        x={280}
        y={yFix + 42}
        className="gwa-badge-text"
        textAnchor="middle"
        style={{ animationDelay: '1.55s' }}
      >
        📝 PR Review
      </text>
      <Merge
        d={`M ${mergeFix} ${yFix} V ${yMain}`}
        color={feature}
        delay={2.15}
        markerId={markerId}
      />

      <text x={forkCo + 10} y={yCo - 12} className="gwa-label" fill={checkout}>
        feature-checkout
      </text>
      <Lane
        d={`M ${forkCo} ${yMain + 6} V ${yCo} H ${mergeCo}`}
        color={checkout}
        delay={1.15}
      />
      <Dot x={460} y={yCo} color={checkout} delay={1.7} />
      <Dot x={560} y={yCo} color={checkout} delay={2.5} />
      <Dot x={640} y={yCo} color={checkout} delay={3.2} />
      <text
        x={460}
        y={yCo + 22}
        className="gwa-icon"
        textAnchor="middle"
        style={{ animationDelay: '1.9s' }}
      >
        👩‍💻
      </text>
      <text
        x={560}
        y={yCo + 22}
        className="gwa-note"
        textAnchor="middle"
        fill={ok}
        style={{ animationDelay: '2.3s' }}
      >
        ✓ CI Pass
      </text>
      <text
        x={640}
        y={yCo + 22}
        className="gwa-note"
        textAnchor="middle"
        fill={ok}
        style={{ animationDelay: '2.7s' }}
      >
        ✓ Tests OK
      </text>
      <Merge
        d={`M ${mergeCo} ${yCo} V ${yMain}`}
        color={checkout}
        delay={3.45}
        markerId={markerId}
      />
      <text
        x={mergeCo}
        y={56}
        className="gwa-note"
        textAnchor="middle"
        fill={ok}
        style={{ animationDelay: '3.8s' }}
      >
        合併後立即部署
      </text>
    </svg>
  );
}

function GitLabSvg({ markerId }: { markerId: string }) {
  return (
    <svg className="gwa-svg" viewBox="0 0 800 340" role="img" aria-hidden="true">
      <defs>
        <marker
          id={markerId}
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <polygon points="0 0, 8 4, 0 8" fill="currentColor" />
        </marker>
      </defs>
      <text x="60" y="26" className="gwa-time">
        開發
      </text>
      <text x="250" y="26" className="gwa-time">
        合進 main
      </text>
      <text x="440" y="26" className="gwa-time">
        staging
      </text>
      <text x="630" y="26" className="gwa-time">
        production
      </text>

      <path
        className="gwa-line gwa-draw"
        pathLength={1}
        d="M 50 80 H 760"
        style={{ stroke: '#1d4ed8', animationDelay: '2.8s' }}
      />
      <text x="50" y="70" className="gwa-label" fill="#1d4ed8">
        production
      </text>
      <Dot x={680} y={80} color="#1d4ed8" delay={4.2} pulse />

      <path
        className="gwa-line gwa-draw"
        pathLength={1}
        d="M 50 155 H 760"
        style={{ stroke: '#0d9488', animationDelay: '1.6s' }}
      />
      <text x="50" y="145" className="gwa-label" fill="#0d9488">
        staging
      </text>
      <Dot x={490} y={155} color="#0d9488" delay={3.2} />
      <Dot x={620} y={155} color="#0d9488" delay={3.6} />

      <path
        className="gwa-line gwa-draw"
        pathLength={1}
        d="M 50 230 H 760"
        style={{ stroke: '#2563eb', animationDelay: '0s' }}
      />
      <text x="50" y="220" className="gwa-label" fill="#2563eb">
        main
      </text>
      <Dot x={110} y={230} color="#2563eb" delay={0.2} />
      <Dot x={280} y={230} color="#2563eb" delay={1.8} />
      <Dot x={400} y={230} color="#2563eb" delay={2.2} />

      <path
        className="gwa-line gwa-draw"
        pathLength={1}
        d="M 140 230 C 150 230, 165 305, 190 305 H 250 C 270 305, 275 230, 280 230"
        style={{ stroke: '#7c3aed', animationDelay: '0.5s' }}
      />
      <text x="175" y="293" className="gwa-label" fill="#7c3aed">
        feature/*
      </text>
      <text x="200" y="328" className="gwa-icon" style={{ animationDelay: '0.9s' }}>
        👨‍💻
      </text>
      <Dot x={210} y={305} color="#7c3aed" delay={1} />
      <Dot x={245} y={305} color="#7c3aed" delay={1.4} />
      <path
        className="gwa-merge"
        pathLength={1}
        d="M 250 305 C 268 305, 276 250, 280 230"
        markerEnd={`url(#${markerId})`}
        style={{ color: '#7c3aed', animationDelay: '1.6s' }}
      />
      <rect
        x="288"
        y="198"
        width="52"
        height="18"
        rx="3"
        className="gwa-badge"
        style={{ animationDelay: '1.7s' }}
      />
      <text x="298" y="211" className="gwa-badge-text" style={{ animationDelay: '1.7s' }}>
        MR
      </text>

      <path
        className="gwa-merge"
        pathLength={1}
        d="M 400 230 C 430 230, 460 170, 490 155"
        markerEnd={`url(#${markerId})`}
        style={{ color: '#0d9488', animationDelay: '2.8s' }}
      />
      <text x="418" y="200" className="gwa-note" fill="#0d9488" style={{ animationDelay: '2.9s' }}>
        只往下游
      </text>
      <path
        className="gwa-merge"
        pathLength={1}
        d="M 620 155 C 640 155, 665 110, 680 80"
        markerEnd={`url(#${markerId})`}
        style={{ color: '#1d4ed8', animationDelay: '3.8s' }}
      />
      <text x="640" y="128" className="gwa-note" fill="#1d4ed8" style={{ animationDelay: '3.9s' }}>
        再晉升
      </text>
      <text x="300" y="338" className="gwa-note" fill="#6b6b6b">
        upstream first：修正先進 main，再 cherry-pick 到環境
      </text>
    </svg>
  );
}

function TbdSvg({ markerId }: { markerId: string }) {
  const trunk = '#2563eb';
  const alice = '#db2777';
  const bob = '#0891b2';
  const charlie = '#65a30d';
  const prod = '#059669';
  const flag = '#d97706';
  const yTrunk = 108;
  const yShort = 176;
  const yProd = 292;
  const days = [140, 300, 460, 620, 780] as const;
  const forkAlice = 180;
  const mergeAlice = 240;

  return (
    <svg className="gwa-svg" viewBox="0 0 900 348" role="img" aria-hidden="true">
      <defs>
        <ArrowDef id={markerId} />
      </defs>
      <text x={days[0]} y="26" className="gwa-time" textAnchor="middle">
        週一早上
      </text>
      <text x={days[1]} y="26" className="gwa-time" textAnchor="middle">
        週二
      </text>
      <text x={days[2]} y="26" className="gwa-time" textAnchor="middle">
        週三
      </text>
      <text x={days[3]} y="26" className="gwa-time" textAnchor="middle">
        週四
      </text>
      <text x={days[4]} y="26" className="gwa-time" textAnchor="middle">
        週五
      </text>

      <text x="16" y={yTrunk + 4} className="gwa-label" fill={trunk}>
        trunk
      </text>
      <Lane d={`M 108 ${yTrunk} H 860`} color={trunk} delay={0} />
      <Dot x={days[0]} y={yTrunk} color={trunk} delay={0.15} />
      <Dot x={forkAlice} y={yTrunk} color={alice} delay={0.45} />
      <Dot x={mergeAlice} y={yTrunk} color={alice} delay={1.1} />
      <Dot x={days[1]} y={yTrunk} color={bob} delay={1.4} />
      <Dot x={360} y={yTrunk} color={charlie} delay={1.7} />
      <Dot x={days[2]} y={yTrunk} color={alice} delay={2.1} />
      <Dot x={540} y={yTrunk} color={bob} delay={2.5} />
      <Dot x={days[3]} y={yTrunk} color={charlie} delay={2.9} />
      <Dot x={days[4]} y={yTrunk} color={trunk} delay={4.1} pulse />

      <Lane
        d={`M ${forkAlice} ${yTrunk + 6} V ${yShort - 16} Q ${forkAlice} ${yShort} ${forkAlice + 16} ${yShort} H ${mergeAlice - 16} Q ${mergeAlice} ${yShort} ${mergeAlice} ${yShort - 16}`}
        color={alice}
        delay={0.5}
      />
      <Dot x={210} y={yShort} color={alice} delay={0.8} />
      <text
        x={210}
        y={yShort - 14}
        className="gwa-label"
        textAnchor="middle"
        fill={alice}
      >
        {'< 1 天'}
      </text>
      <Merge
        d={`M ${mergeAlice} ${yShort - 16} V ${yTrunk}`}
        color={alice}
        delay={1.05}
        markerId={markerId}
      />

      <text
        x={210}
        y={208}
        className="gwa-icon"
        textAnchor="middle"
        style={{ animationDelay: '0.7s' }}
      >
        👨‍💻
      </text>
      <text
        x={210}
        y={224}
        className="gwa-note"
        textAnchor="middle"
        fill={alice}
        style={{ animationDelay: '0.7s', fontWeight: 600 }}
      >
        Alice
      </text>
      <text
        x={300}
        y={208}
        className="gwa-icon"
        textAnchor="middle"
        style={{ animationDelay: '1.45s' }}
      >
        👩‍💻
      </text>
      <text
        x={300}
        y={224}
        className="gwa-note"
        textAnchor="middle"
        fill={bob}
        style={{ animationDelay: '1.45s', fontWeight: 600 }}
      >
        Bob
      </text>
      <text
        x={360}
        y={208}
        className="gwa-icon"
        textAnchor="middle"
        style={{ animationDelay: '1.75s' }}
      >
        🧑‍💻
      </text>
      <text
        x={360}
        y={224}
        className="gwa-note"
        textAnchor="middle"
        fill={charlie}
        style={{ animationDelay: '1.75s', fontWeight: 600 }}
      >
        Charlie
      </text>
      <text
        x={210}
        y={240}
        className="gwa-note"
        textAnchor="middle"
        fill={prod}
        style={{ animationDelay: '1s' }}
      >
        CI✓
      </text>
      <text
        x={300}
        y={240}
        className="gwa-note"
        textAnchor="middle"
        fill={prod}
        style={{ animationDelay: '1.55s' }}
      >
        CI✓
      </text>
      <text
        x={360}
        y={240}
        className="gwa-note"
        textAnchor="middle"
        fill={prod}
        style={{ animationDelay: '1.85s' }}
      >
        CI✓
      </text>

      <rect
        x={638}
        y={198}
        width="196"
        height="50"
        rx="6"
        className="gwa-flag"
        style={{ animationDelay: '3.2s' }}
      />
      <text
        x={736}
        y={218}
        className="gwa-badge-text"
        textAnchor="middle"
        style={{ animationDelay: '3.2s' }}
      >
        🚩 Feature Flag
      </text>
      <text
        x={736}
        y={236}
        className="gwa-note"
        textAnchor="middle"
        fill={flag}
        style={{ animationDelay: '4s' }}
      >
        checkout_v2：週五 true ✓
      </text>

      <text x="16" y={yProd + 4} className="gwa-label" fill={prod}>
        Production
      </text>
      <Lane d={`M 108 ${yProd} H 860`} color={prod} delay={0.25} />
      <text
        x={mergeAlice}
        y={yProd - 14}
        className="gwa-icon"
        textAnchor="middle"
        style={{ animationDelay: '1.25s' }}
      >
        🚀
      </text>
      <text
        x={days[1]}
        y={yProd - 14}
        className="gwa-icon"
        textAnchor="middle"
        style={{ animationDelay: '1.6s' }}
      >
        🚀
      </text>
      <text
        x={days[2]}
        y={yProd - 14}
        className="gwa-icon"
        textAnchor="middle"
        style={{ animationDelay: '2.3s' }}
      >
        🚀
      </text>
      <text
        x={days[3]}
        y={yProd - 14}
        className="gwa-icon"
        textAnchor="middle"
        style={{ animationDelay: '3.1s' }}
      >
        🚀
      </text>
      <text
        x={days[4]}
        y={yProd - 14}
        className="gwa-icon"
        textAnchor="middle"
        style={{ animationDelay: '4.2s' }}
      >
        🎉
      </text>
      <text
        x={504}
        y={334}
        className="gwa-note"
        textAnchor="middle"
        fill="#6b6b6b"
      >
        每天多次提交 · 功能完成但對用戶隱藏 · 持續部署中
      </text>
    </svg>
  );
}

function PracticeSvg({ markerId }: { markerId: string }) {
  const master = '#1d4ed8';
  const staging = '#0d9488';
  const feature = '#7c3aed';
  const hotfix = '#dc2626';
  const yMaster = 92;
  const yStaging = 172;
  const yFeat = 252;
  const r = 16;
  const fork = 170;
  const toStaging = 380;
  const toMaster = 560;
  const hfFork = 680;
  const hfStaging = 740;
  const hfMaster = 800;

  return (
    <svg className="gwa-svg" viewBox="0 0 860 340" role="img" aria-hidden="true">
      <defs>
        <ArrowDef id={markerId} />
      </defs>
      <text x="170" y="26" className="gwa-time" textAnchor="middle">
        從 master 切出
      </text>
      <text x="380" y="26" className="gwa-time" textAnchor="middle">
        MR → staging
      </text>
      <text x="560" y="26" className="gwa-time" textAnchor="middle">
        UAT 通過
      </text>
      <text x="740" y="26" className="gwa-time" textAnchor="middle">
        MR → master
      </text>

      <text x="16" y={yMaster + 4} className="gwa-label" fill={master}>
        master
      </text>
      <Lane d={`M 108 ${yMaster} H 840`} color={master} delay={0} />
      <Dot x={fork} y={yMaster} color={master} delay={0.2} />
      <Dot x={toMaster} y={yMaster} color={master} delay={3.5} />
      <Dot x={hfFork} y={yMaster} color={hotfix} delay={4.3} />
      <Dot x={hfMaster} y={yMaster} color={master} delay={5.6} pulse />

      <text x="16" y={yStaging + 4} className="gwa-label" fill={staging}>
        staging
      </text>
      <Lane d={`M 108 ${yStaging} H 840`} color={staging} delay={0.15} />
      <Dot x={140} y={yStaging} color={staging} delay={0.35} />
      <Dot x={toStaging} y={yStaging} color={staging} delay={2.3} />
      <Dot x={hfStaging} y={yStaging} color={staging} delay={5.15} />

      <text x={fork + 12} y={yFeat - 14} className="gwa-label" fill={feature}>
        feature/*
      </text>
      <Lane
        d={`M ${fork} ${yMaster + 6} V ${yFeat - r} Q ${fork} ${yFeat} ${fork + r} ${yFeat} H ${toStaging - r} Q ${toStaging} ${yFeat} ${toStaging} ${yFeat - r}`}
        color={feature}
        delay={0.45}
      />
      <Dot x={250} y={yFeat} color={feature} delay={0.9} />
      <Dot x={toStaging} y={yFeat} color={feature} delay={1.7} />
      <Merge
        d={`M ${toStaging} ${yFeat - r} V ${yStaging}`}
        color={feature}
        delay={2.05}
        markerId={markerId}
      />
      <rect
        x={346}
        y={yStaging - 36}
        width="68"
        height="20"
        rx="4"
        className="gwa-badge"
        style={{ animationDelay: '2.2s' }}
      />
      <text
        x={380}
        y={yStaging - 22}
        className="gwa-badge-text"
        textAnchor="middle"
        style={{ animationDelay: '2.2s' }}
      >
        MR
      </text>
      <Lane
        d={`M ${toStaging - r} ${yFeat} H ${toMaster - r} Q ${toMaster} ${yFeat} ${toMaster} ${yFeat - r}`}
        color={feature}
        delay={2.6}
      />
      <Dot x={470} y={yFeat} color={feature} delay={3} />
      <Dot x={toMaster} y={yFeat} color={feature} delay={3.25} />
      <Merge
        d={`M ${toMaster} ${yFeat - r} V ${yMaster}`}
        color={feature}
        delay={3.4}
        markerId={markerId}
      />
      <rect
        x={526}
        y={yMaster + 18}
        width="68"
        height="20"
        rx="4"
        className="gwa-badge"
        style={{ animationDelay: '3.55s' }}
      />
      <text
        x={560}
        y={yMaster + 32}
        className="gwa-badge-text"
        textAnchor="middle"
        style={{ animationDelay: '3.55s' }}
      >
        MR
      </text>
      <text
        x={560}
        y={yMaster - 14}
        className="gwa-icon"
        textAnchor="middle"
        style={{ animationDelay: '3.7s' }}
      >
        🚀 正式
      </text>

      <text x={hfFork + 8} y={yFeat - 14} className="gwa-label" fill={hotfix}>
        hotfix
      </text>
      <Lane
        d={`M ${hfFork} ${yMaster + 6} V ${yFeat - r} Q ${hfFork} ${yFeat} ${hfFork + r} ${yFeat} H ${hfStaging - r} Q ${hfStaging} ${yFeat} ${hfStaging} ${yFeat - r}`}
        color={hotfix}
        delay={4.4}
      />
      <Dot x={710} y={yFeat} color={hotfix} delay={4.8} />
      <Merge
        d={`M ${hfStaging} ${yFeat - r} V ${yStaging}`}
        color={hotfix}
        delay={5}
        markerId={markerId}
      />
      <Lane
        d={`M ${hfStaging - r} ${yFeat} H ${hfMaster - r} Q ${hfMaster} ${yFeat} ${hfMaster} ${yFeat - r}`}
        color={hotfix}
        delay={5.2}
      />
      <Merge
        d={`M ${hfMaster} ${yFeat - r} V ${yMaster}`}
        color={hotfix}
        delay={5.45}
        markerId={markerId}
      />
    </svg>
  );
}

function Diagram({
  variant,
  markerId,
}: {
  variant: GitWorkflowVariant;
  markerId: string;
}) {
  switch (variant) {
    case 'gitflow':
      return <GitFlowSvg markerId={markerId} />;
    case 'github':
      return <GitHubSvg markerId={markerId} />;
    case 'gitlab':
      return <GitLabSvg markerId={markerId} />;
    case 'tbd':
      return <TbdSvg markerId={markerId} />;
    case 'practice':
      return <PracticeSvg markerId={markerId} />;
  }
}

export default function GitWorkflowAnim({ variant }: Props) {
  const rawId = useId().replace(/:/g, '');
  const markerId = `gwa-arrow-${rawId}`;
  const copy = COPY[variant];
  const [playKey, setPlayKey] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const replay = () => {
    setPaused(false);
    setPlayKey((k) => k + 1);
  };

  return (
    <figure
      className={[
        'gwa',
        paused ? 'gwa--paused' : '',
        reduceMotion ? 'gwa--static' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <p className="gwa-heading">{copy.title}</p>
      <div className="gwa-frame" key={playKey}>
        <Diagram variant={variant} markerId={markerId} />
      </div>
      {!reduceMotion && (
        <div className="gwa-controls">
          <button type="button" className="gwa-btn" onClick={replay}>
            重播
          </button>
          <button
            type="button"
            className="gwa-btn"
            onClick={() => setPaused((p) => !p)}
          >
            {paused ? '繼續' : '暫停'}
          </button>
        </div>
      )}
      <ul className="gwa-legend">
        {copy.legend.map((item) => (
          <li key={item.label}>
            <span className="gwa-swatch" style={{ background: item.color }} />
            {item.label}
          </li>
        ))}
      </ul>
      <ol className="gwa-steps">
        {copy.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </figure>
  );
}
