import type React from 'react';
import type { PainPointItem } from '../utils/cluster.config';

const ISO_FRAME_OUTER = 'M110 14 L196 64 L196 154 L110 204 L24 154 L24 64 Z';
const ISO_FRAME_TOP = 'M110 14 L196 64 L110 114 L24 64 Z';
const ISO_FRAME_VERT = 'M110 114 L110 204';

function IsometricShell({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<svg
			aria-hidden='true'
			viewBox='0 0 220 218'
			fill='none'
			className={className}
		>
			{/* Pure Sealos 30° isometric bounding wireframe cube with corner registration pins */}
			<path
				d={ISO_FRAME_OUTER}
				stroke='#E4E4E7'
				strokeWidth='1'
			/>
			<path
				d='M24 154 L110 104 L196 154'
				stroke='#E4E4E7'
				strokeWidth='1'
				strokeDasharray='3 3'
			/>
			<path
				d='M110 14 L110 104'
				stroke='#E4E4E7'
				strokeWidth='1'
				strokeDasharray='3 3'
			/>
			<path
				d={ISO_FRAME_TOP}
				stroke='#E4E4E7'
				strokeWidth='1'
				strokeOpacity='0.7'
			/>
			<path
				d={ISO_FRAME_VERT}
				stroke='#E4E4E7'
				strokeWidth='1'
				strokeOpacity='0.7'
			/>
			{children}
			<circle
				cx='110'
				cy='14'
				r='2'
				fill='#FFFFFF'
				stroke='#D4D4D8'
				strokeWidth='1'
			/>
			<circle
				cx='196'
				cy='64'
				r='2'
				fill='#FFFFFF'
				stroke='#D4D4D8'
				strokeWidth='1'
			/>
			<circle
				cx='24'
				cy='64'
				r='2'
				fill='#FFFFFF'
				stroke='#D4D4D8'
				strokeWidth='1'
			/>
			<circle
				cx='110'
				cy='204'
				r='2'
				fill='#FFFFFF'
				stroke='#D4D4D8'
				strokeWidth='1'
			/>
		</svg>
	);
}

/** 5 分钟零命令上线：纯等轴测一键模板模块落入云端基座，单核钴蓝线稿 */
function OneClickDeployArt({ className }: { className?: string }) {
	return (
		<IsometricShell className={className}>
			{/* Lower cloud receiver slab */}
			<path
				d='M110 104 L168 137 L168 157 L110 190 L52 157 L52 137 Z'
				fill='#FFFFFF'
				stroke='#A1A1AA'
				strokeWidth='1.15'
			/>
			<path
				d='M52 137 L110 170 L168 137 M110 170 L110 190'
				stroke='#A1A1AA'
				strokeWidth='1.15'
			/>
			{/* Recessed isometric dock socket */}
			<path
				d='M110 118 L142 136.5 L110 155 L78 136.5 Z'
				fill='#FFFFFF'
				stroke='#A1A1AA'
				strokeWidth='1'
				strokeDasharray='2.5 2.5'
			/>
			{/* Vertical alignment guide lines */}
			<path
				d='M80 98 L80 135 M140 98 L140 135 M110 116 L110 148'
				stroke='#A1A1AA'
				strokeWidth='1'
				strokeDasharray='2.5 2.5'
			/>
			{/* Elevated cobalt template cube snapping into slot (pure white + cobalt hairline, zero blue tint fill) */}
			<path
				d='M110 42 L144 61.5 L144 98.5 L110 118 L76 98.5 L76 61.5 Z'
				fill='#FFFFFF'
				stroke='#005BFF'
				strokeWidth='1.4'
			/>
			<path
				d='M76 61.5 L110 81 L144 61.5 M110 81 L110 118'
				stroke='#005BFF'
				strokeWidth='1.4'
			/>
		</IsometricShell>
	);
}

/** 7×24h 云端常驻：三层高可用集群等轴测叠片 + 顶层钴蓝常驻环线 */
function AlwaysOnClusterArt({ className }: { className?: string }) {
	return (
		<IsometricShell className={className}>
			{/* Bottom cluster layer */}
			<path
				d='M110 118 L166 150 L166 164 L110 196 L54 164 L54 150 Z'
				fill='#FFFFFF'
				stroke='#A1A1AA'
				strokeWidth='1.15'
			/>
			<path
				d='M54 150 L110 182 L166 150 M110 182 L110 196'
				stroke='#A1A1AA'
				strokeWidth='1.15'
			/>
			{/* Middle resilient layer */}
			<path
				d='M110 92 L166 124 L166 138 L110 170 L54 138 L54 124 Z'
				fill='#FFFFFF'
				stroke='#A1A1AA'
				strokeWidth='1.15'
			/>
			<path
				d='M54 124 L110 156 L166 124 M110 156 L110 170'
				stroke='#A1A1AA'
				strokeWidth='1.15'
			/>
			{/* Top active cobalt service slab */}
			<path
				d='M110 62 L166 94 L166 108 L110 140 L54 108 L54 94 Z'
				fill='#FFFFFF'
				stroke='#005BFF'
				strokeWidth='1.4'
			/>
			<path
				d='M54 94 L110 126 L166 94 M110 126 L110 140'
				stroke='#005BFF'
				strokeWidth='1.4'
			/>
			{/* Inner isometric pulse ring projected strictly on 30° plane */}
			<path
				d='M110 76 L140 93.5 L110 111 L80 93.5 Z'
				stroke='#005BFF'
				strokeWidth='1.15'
				strokeDasharray='3 2.5'
			/>
		</IsometricShell>
	);
}

/** 跨重启不丢记忆：严格 30° 等轴测双层持久化数据块 + 中心受保护钴蓝记忆核 */
function PersistentMemoryArt({ className }: { className?: string }) {
	return (
		<IsometricShell className={className}>
			{/* Outer isometric storage vault base */}
			<path
				d='M110 80 L172 115.5 L172 153.5 L110 189 L48 153.5 L48 115.5 Z'
				fill='#FFFFFF'
				stroke='#A1A1AA'
				strokeWidth='1.15'
			/>
			<path
				d='M48 115.5 L110 151 L172 115.5 M110 151 L110 189'
				stroke='#A1A1AA'
				strokeWidth='1.15'
			/>
			{/* Horizontal vault seam line */}
			<path
				d='M48 134.5 L110 170 L172 134.5'
				stroke='#D4D4D8'
				strokeWidth='1'
			/>
			{/* Inner cutaway isometric memory core in pure Sealos cobalt */}
			<path
				d='M110 56 L144 75.5 L144 114.5 L110 134 L76 114.5 L76 75.5 Z'
				fill='#FFFFFF'
				stroke='#005BFF'
				strokeWidth='1.4'
			/>
			<path
				d='M76 75.5 L110 95 L144 75.5 M110 95 L110 134'
				stroke='#005BFF'
				strokeWidth='1.4'
			/>
			{/* Inner memory register stripe on left/right isometric planes */}
			<path
				d='M86 98 L100 106 M134 98 L120 106'
				stroke='#005BFF'
				strokeWidth='1.2'
				strokeLinecap='round'
			/>
		</IsometricShell>
	);
}

/** 自动 HTTPS 域名：严格 30° 等轴测网页层叠 + 平面内钴蓝路由通道与加密节点 */
function AutoHttpsDomainArt({ className }: { className?: string }) {
	return (
		<IsometricShell className={className}>
			{/* Lower isometric network layer */}
			<path
				d='M110 108 L174 145 L110 182 L46 145 Z'
				fill='#FFFFFF'
				stroke='#A1A1AA'
				strokeWidth='1.15'
			/>
			{/* Elevated 30° isometric browser page card */}
			<path
				d='M110 58 L174 95 L174 103 L110 140 L46 103 L46 95 Z'
				fill='#FFFFFF'
				stroke='#A1A1AA'
				strokeWidth='1.15'
			/>
			<path
				d='M46 95 L110 132 L174 95 M110 132 L110 140'
				stroke='#A1A1AA'
				strokeWidth='1.15'
			/>
			{/* Isometric window header bar inside 30° plane */}
			<path
				d='M64 84.5 L128 121.5'
				stroke='#D4D4D8'
				strokeWidth='1'
			/>
			{/* Isometric HTTPS TLS route channel projected strictly on 30° top plane in cobalt */}
			<path
				d='M110 73 L144 92.5 L110 112 L76 92.5 Z'
				fill='#FFFFFF'
				stroke='#005BFF'
				strokeWidth='1.4'
			/>
			{/* Isometric directional gateway vector inside the 30° plane */}
			<path
				d='M96 92.5 L124 92.5 M116 87 L124 92.5 L116 98'
				stroke='#005BFF'
				strokeWidth='1.4'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</IsometricShell>
	);
}

export function PainPointIsometricArt({ id, className }: { id: PainPointItem['id']; className?: string }) {
	switch (id) {
		case 'env-errors':
			return <OneClickDeployArt className={className} />;
		case 'offline-disconnect':
			return <AlwaysOnClusterArt className={className} />;
		case 'memory-loss':
			return <PersistentMemoryArt className={className} />;
		case 'share-diary':
			return <AutoHttpsDomainArt className={className} />;
	}
}

/** Bespoke large Sealos 30° isometric architecture blueprint for Featured Guide 01 (DSH 3-node cloud nest) */
export function DshArchitectureBlueprint({ className }: { className?: string }) {
	return (
		<IsometricShell className={className}>
			{/* Isometric cloud cluster floor grid */}
			<path
				d='M110 86 L184 128 L110 170 L36 128 Z'
				fill='#FFFFFF'
				stroke='#D4D4D8'
				strokeWidth='1.1'
			/>
			<path
				d='M73 107 L147 149 M147 107 L73 149'
				stroke='#E4E4E7'
				strokeWidth='1'
				strokeDasharray='3 3'
			/>
			{/* Left companion pod: NapCat QQ bridge */}
			<path
				d='M70 100 L94 114 L94 140 L70 154 L46 140 L46 114 Z'
				fill='#FFFFFF'
				stroke='#A1A1AA'
				strokeWidth='1.2'
			/>
			<path
				d='M46 114 L70 128 L94 114 M70 128 L70 154'
				stroke='#A1A1AA'
				strokeWidth='1.2'
			/>
			{/* Right companion pod: PostgreSQL long-term memory */}
			<path
				d='M150 100 L174 114 L174 140 L150 154 L126 140 L126 114 Z'
				fill='#FFFFFF'
				stroke='#A1A1AA'
				strokeWidth='1.2'
			/>
			<path
				d='M126 114 L150 128 L174 114 M150 128 L150 154'
				stroke='#A1A1AA'
				strokeWidth='1.2'
			/>
			{/* Orthogonal cobalt bridges linking core harness to both pods */}
			<path
				d='M94 120 L110 111 L126 120'
				stroke='#005BFF'
				strokeWidth='1.4'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			{/* Central elevated cobalt DeepSeek Harness core (pure white + cobalt hairline) */}
			<path
				d='M110 44 L144 63.5 L144 102.5 L110 122 L76 102.5 L76 63.5 Z'
				fill='#FFFFFF'
				stroke='#005BFF'
				strokeWidth='1.45'
			/>
			<path
				d='M76 63.5 L110 83 L144 63.5 M110 83 L110 122'
				stroke='#005BFF'
				strokeWidth='1.45'
			/>
		</IsometricShell>
	);
}
