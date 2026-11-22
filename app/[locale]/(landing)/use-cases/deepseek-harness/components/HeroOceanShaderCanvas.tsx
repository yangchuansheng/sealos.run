'use client';

import React from 'react';
import { cn } from '@/libs/utils/styling';

const VERTEX_SHADER_SOURCE = `#version 300 es
in vec2 a_position;
out vec2 v_uv;

void main() {
	v_uv = a_position * 0.5 + 0.5;
	gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_mouseActive;

float hexDist(vec2 p) {
	p = abs(p);
	float c = dot(p, normalize(vec2(1.0, 1.7320508)));
	return max(c, p.x);
}

vec4 hexCoords(vec2 uv) {
	vec2 r = vec2(1.0, 1.7320508);
	vec2 h = r * 0.5;
	vec2 a = mod(uv, r) - h;
	vec2 b = mod(uv - h, r) - h;
	vec2 gv = dot(a, a) < dot(b, b) ? a : b;
	float edge = 0.5 - hexDist(gv);
	vec2 id = uv - gv;
	return vec4(gv.x, gv.y, edge, id.x * 0.37 + id.y * 0.71);
}

float causticPattern(vec2 uv, float t) {
	vec2 p = mod(uv * 6.2831853, 6.2831853) - 250.0;
	vec2 i = vec2(p);
	float c = 1.0;
	float inten = 0.0055;

	for (int n = 0; n < 4; n++) {
		float timeStep = t * (1.0 - (3.2 / float(n + 1)));
		i = p + vec2(
			cos(timeStep - i.x) + sin(timeStep + i.y),
			sin(timeStep - i.y) + cos(timeStep + i.x)
		);
		c += 1.0 / length(vec2(
			p.x / (sin(i.x + timeStep) / inten),
			p.y / (cos(i.y + timeStep) / inten)
		));
	}

	c /= 4.0;
	c = 1.17 - pow(c, 1.38);
	return clamp(pow(abs(c), 7.5), 0.0, 1.0);
}

void main() {
	vec2 res = max(u_resolution, vec2(1.0));
	float aspect = res.x / res.y;
	vec2 uv = v_uv;
	vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

	// Exact Sealos #FAFAFA architectural daylight canvas
	vec3 bgBase = vec3(0.9804, 0.9804, 0.9804);
	vec3 iceTint = vec3(0.945, 0.968, 1.0);
	vec3 sealosBrand = vec3(0.0, 0.3569, 1.0);
	vec3 blueprintGray = vec3(0.84, 0.85, 0.87);

	// Centered stage focal envelope beneath the isometric whale-girl showcase
	vec2 stageCenter = vec2(0.5, 0.28) + 0.014 * vec2(cos(u_time * 0.32), sin(u_time * 0.26));
	vec2 dStage = (uv - stageCenter) * vec2(aspect * 0.72, 1.15);
	float stageEnvelope = exp(-dot(dStage, dStage) * 3.2);

	// Clean fade at top and bottom so it dissolves seamlessly into adjacent sections
	float topFade = smoothstep(1.0, 0.72, uv.y);
	float bottomFade = smoothstep(0.0, 0.16, uv.y);
	float verticalMask = topFade * bottomFade;

	// Subtle interactive pointer light field
	vec2 dMouse = (uv - u_mouse) * vec2(aspect, 1.0);
	float mouseAura = exp(-dot(dMouse, dMouse) * 11.0) * u_mouseActive * verticalMask;

	// Ultra-restrained water caustic micro-shimmer strictly within the lower architectural plinth
	vec2 causticUv = p * 0.48 + vec2(u_time * 0.01, -u_time * 0.008);
	float caustics = causticPattern(causticUv, u_time * 0.28);

	// Precision 30-degree isometric architectural hex grid (native Sealos DNA)
	vec4 hex = hexCoords(p * 5.8);
	float hexLine = 1.0 - smoothstep(0.0, 0.018, hex.z);
	float hexWave = 0.55 + 0.45 * sin(hex.w * 1.9 + u_time * 0.65);

	vec3 col = bgBase;
	// Extremely airy ice-blue architectural depth whisper beneath the 3D stage (max ~14%)
	col = mix(col, iceTint, clamp(stageEnvelope * 0.26 * verticalMask + mouseAura * 0.14, 0.0, 0.30));
	// Crisp micro-caustic reflection strictly whispered in the stage envelope
	col = mix(col, sealosBrand, caustics * (0.028 * stageEnvelope * verticalMask + 0.032 * mouseAura));
	// Crisp engineering hex grid lines softly revealed around the stage & pointer
	float hexNeutral = hexLine * (0.055 * stageEnvelope * verticalMask);
	float hexBlue = hexLine * (0.042 * stageEnvelope * hexWave * verticalMask + 0.075 * mouseAura);
	col = mix(col, blueprintGray, clamp(hexNeutral, 0.0, 0.08));
	col = mix(col, sealosBrand, clamp(hexBlue, 0.0, 0.11));

	fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function compileShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
	const shader = gl.createShader(type);
	if (!shader) return null;
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		gl.deleteShader(shader);
		return null;
	}
	return shader;
}

export interface HeroOceanShaderCanvasProps {
	paused: boolean;
	containerRef: React.RefObject<HTMLElement | null>;
	className?: string;
}

export function HeroOceanShaderCanvas({ paused, containerRef, className }: HeroOceanShaderCanvasProps) {
	const canvasRef = React.useRef<HTMLCanvasElement>(null);
	const pausedRef = React.useRef(paused);
	const syncPlaybackRef = React.useRef<((nextPaused: boolean) => void) | null>(null);
	pausedRef.current = paused;

	const [supported, setSupported] = React.useState(true);

	React.useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const gl = canvas.getContext('webgl2', {
			alpha: false,
			antialias: false,
			depth: false,
			stencil: false,
			powerPreference: 'low-power',
		});

		if (!gl) {
			setSupported(false);
			return;
		}

		const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
		const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
		if (!vertexShader || !fragmentShader) {
			if (vertexShader) gl.deleteShader(vertexShader);
			if (fragmentShader) gl.deleteShader(fragmentShader);
			setSupported(false);
			return;
		}

		const program = gl.createProgram();
		if (!program) {
			gl.deleteShader(vertexShader);
			gl.deleteShader(fragmentShader);
			setSupported(false);
			return;
		}

		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);
		gl.deleteShader(vertexShader);
		gl.deleteShader(fragmentShader);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			gl.deleteProgram(program);
			setSupported(false);
			return;
		}

		const positionLoc = gl.getAttribLocation(program, 'a_position');
		const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');
		const timeLoc = gl.getUniformLocation(program, 'u_time');
		const mouseLoc = gl.getUniformLocation(program, 'u_mouse');
		const mouseActiveLoc = gl.getUniformLocation(program, 'u_mouseActive');

		const vao = gl.createVertexArray();
		const buffer = gl.createBuffer();
		gl.bindVertexArray(vao);
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
		gl.enableVertexAttribArray(positionLoc);
		gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

		const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		let reducedMotion = motionQuery.matches;

		let rafId = 0;
		let isVisible = true;
		let contextLost = false;
		let startTime = performance.now();
		let elapsedAtPause = 4.2;
		let lastWidth = 0;
		let lastHeight = 0;

		const targetMouse = { x: 0.72, y: 0.54, active: 0 };
		const currentMouse = { x: 0.72, y: 0.54, active: 0 };

		const syncSize = () => {
			const rect = canvas.getBoundingClientRect();
			const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
			const nextWidth = Math.max(1, Math.round(rect.width * dpr));
			const nextHeight = Math.max(1, Math.round(rect.height * dpr));
			if (nextWidth !== lastWidth || nextHeight !== lastHeight) {
				lastWidth = nextWidth;
				lastHeight = nextHeight;
				canvas.width = nextWidth;
				canvas.height = nextHeight;
				gl.viewport(0, 0, nextWidth, nextHeight);
			}
		};

		const activateProgram = gl.useProgram.bind(gl);

		const renderFrame = (timeSeconds: number) => {
			if (contextLost || lastWidth === 0 || lastHeight === 0) return;
			activateProgram(program);
			gl.bindVertexArray(vao);
			gl.uniform2f(resolutionLoc, lastWidth, lastHeight);
			gl.uniform1f(timeLoc, timeSeconds);
			gl.uniform2f(mouseLoc, currentMouse.x, currentMouse.y);
			gl.uniform1f(mouseActiveLoc, currentMouse.active);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
		};

		const stopLoop = () => {
			if (rafId !== 0) {
				cancelAnimationFrame(rafId);
				rafId = 0;
				elapsedAtPause += (performance.now() - startTime) * 0.001;
			}
		};

		const tick = (now: number) => {
			rafId = 0;
			if (!isVisible || pausedRef.current || reducedMotion || contextLost) {
				return;
			}
			const t = elapsedAtPause + (now - startTime) * 0.001;
			currentMouse.x += (targetMouse.x - currentMouse.x) * 0.08;
			currentMouse.y += (targetMouse.y - currentMouse.y) * 0.08;
			currentMouse.active += (targetMouse.active - currentMouse.active) * 0.08;
			renderFrame(t);
			rafId = requestAnimationFrame(tick);
		};

		const startLoop = () => {
			if (pausedRef.current || reducedMotion || !isVisible || contextLost) {
				renderFrame(elapsedAtPause);
				return;
			}
			if (rafId === 0) {
				startTime = performance.now();
				rafId = requestAnimationFrame(tick);
			}
		};

		syncPlaybackRef.current = (nextPaused: boolean) => {
			if (nextPaused) {
				stopLoop();
				renderFrame(elapsedAtPause);
			} else {
				startLoop();
			}
		};

		syncSize();
		renderFrame(elapsedAtPause);

		const resizeObserver = new ResizeObserver(() => {
			syncSize();
			if (pausedRef.current || reducedMotion || !isVisible) {
				renderFrame(elapsedAtPause);
			}
		});
		resizeObserver.observe(canvas);

		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (!entry) return;
				isVisible = entry.isIntersecting;
				if (isVisible) {
					startLoop();
				} else {
					stopLoop();
				}
			},
			{ threshold: 0.01 },
		);
		intersectionObserver.observe(container);

		const handlePointerMove = (event: PointerEvent) => {
			if (pausedRef.current || reducedMotion || event.pointerType !== 'mouse') return;
			const rect = container.getBoundingClientRect();
			if (rect.width <= 0 || rect.height <= 0) return;
			targetMouse.x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
			targetMouse.y = Math.min(1, Math.max(0, 1 - (event.clientY - rect.top) / rect.height));
			targetMouse.active = 1;
		};

		const handlePointerLeave = () => {
			targetMouse.active = 0;
		};

		const handleMotionChange = (event: MediaQueryListEvent) => {
			reducedMotion = event.matches;
			if (reducedMotion) {
				stopLoop();
				renderFrame(elapsedAtPause);
			} else {
				startLoop();
			}
		};

		const handleContextLost = (event: Event) => {
			event.preventDefault();
			contextLost = true;
			stopLoop();
		};

		const handleContextRestored = () => {
			contextLost = false;
			syncSize();
			startLoop();
		};

		container.addEventListener('pointermove', handlePointerMove, { passive: true });
		container.addEventListener('pointerleave', handlePointerLeave, { passive: true });
		motionQuery.addEventListener('change', handleMotionChange);
		canvas.addEventListener('webglcontextlost', handleContextLost);
		canvas.addEventListener('webglcontextrestored', handleContextRestored);

		startLoop();

		return () => {
			syncPlaybackRef.current = null;
			stopLoop();
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
			container.removeEventListener('pointermove', handlePointerMove);
			container.removeEventListener('pointerleave', handlePointerLeave);
			motionQuery.removeEventListener('change', handleMotionChange);
			canvas.removeEventListener('webglcontextlost', handleContextLost);
			canvas.removeEventListener('webglcontextrestored', handleContextRestored);
			gl.deleteBuffer(buffer);
			gl.deleteVertexArray(vao);
			gl.deleteProgram(program);
		};
	}, [containerRef]);

	React.useEffect(() => {
		syncPlaybackRef.current?.(paused);
	}, [paused]);

	if (!supported) {
		return (
			<div
				aria-hidden='true'
				className={cn(
					'pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_72%,rgba(0,91,255,0.04),rgba(239,246,255,0.35)_45%,transparent_75%)]',
					className,
				)}
			/>
		);
	}

	return (
		<div
			aria-hidden='true'
			className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
		>
			<canvas
				ref={canvasRef}
				data-hero-shader='webgl2'
				data-paused={paused ? 'true' : 'false'}
				className='block h-full w-full'
			/>
		</div>
	);
}
