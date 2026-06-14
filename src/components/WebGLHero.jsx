import React, { useEffect, useRef } from 'react';

const vertexShader = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 mouse = uMouse / uResolution.xy;
    float t = uTime * 0.11;
    vec3 col = vec3(0.055, 0.062, 0.055);
    float n1 = snoise(vec3(uv * 1.7, t * 0.45));
    float n2 = snoise(vec3(uv * 1.1 + 0.35, t * 0.28 + 10.0));
    float n3 = snoise(vec3(uv * 2.3, t * 0.5 + 20.0));
    vec3 emerald = vec3(0.09, 0.21, 0.15);
    float emeraldIntensity = smoothstep(-0.18, 0.58, n1 * 0.52 + n2 * 0.26 + 0.18);
    col = mix(col, emerald, emeraldIntensity * 0.42);
    vec3 deepEmerald = vec3(0.05, 0.13, 0.1);
    float deepMask = snoise(vec3(uv * 1.3 + mouse * 0.12, t * 0.32 + 5.0));
    col = mix(col, deepEmerald, smoothstep(0.04, 0.74, deepMask) * 0.24);
    vec3 gold = vec3(0.78, 0.67, 0.34);
    float goldNoise = snoise(vec3(uv * 3.2 + mouse * 0.18, t * 0.72 + 15.0));
    float goldShimmer = pow(max(0.0, goldNoise), 4.2) * 0.22;
    col += gold * goldShimmer;
    float glowA = exp(-length(uv - vec2(0.22, 0.3)) * 6.5);
    float glowB = exp(-length(uv - vec2(0.72, 0.56)) * 7.0);
    float glowC = exp(-length(uv - vec2(0.82, 0.18)) * 8.2);
    col += vec3(0.43, 0.41, 0.2) * glowA * 0.18;
    col += vec3(0.18, 0.3, 0.2) * glowB * 0.16;
    col += vec3(0.48, 0.44, 0.22) * glowC * 0.12;
    float vignette = 1.0 - smoothstep(0.26, 1.18, length(uv - 0.5) * 1.55);
    col *= mix(0.6, 1.0, vignette);
    float sparkle = snoise(vec3(uv * 9.0, t * 1.2));
    float sparkleMask = pow(max(0.0, sparkle), 8.0);
    col += gold * sparkleMask * 0.12;
    float mist = smoothstep(0.18, 0.7, n3 * 0.5 + n2 * 0.5);
    col += vec3(0.12, 0.16, 0.12) * mist * 0.12;
    col = pow(col, vec3(0.98));
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function WebGLHero({ style }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl', {
      antialias: false,
      alpha: false,
      powerPreference: 'low-power',
    });
    if (!gl) return undefined;

    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vertexShader);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fragmentShader);
    gl.compileShader(fs);

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, 'uTime');
    const resolutionLocation = gl.getUniformLocation(program, 'uResolution');
    const mouseLocation = gl.getUniformLocation(program, 'uMouse');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const onMouseMove = (event) => {
      mouseRef.current = {
        x: event.clientX,
        y: window.innerHeight - event.clientY,
      };
    };

    const render = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      gl.uniform1f(timeLocation, elapsed);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animRef.current = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        bottom: '-2px',
        width: '100%',
        height: '100%',
        display: 'block',
        ...style,
      }}
    />
  );
}
