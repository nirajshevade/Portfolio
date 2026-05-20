"use client";

import { useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const snoise = `
//
// Description : Array and textureless GLSL 2D/3D/4D simplex 
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
// 

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0; }

float mod289(float x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0; }

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

float permute(float x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float taylorInvSqrt(float r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec4 grad4(float j, vec4 ip)
  {
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
  vec4 p,s;

  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
  s = vec4(lessThan(p, vec4(0.0)));
  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www; 

  return p;
  }

float snoise(vec4 v)
  {
  const vec2  C = vec2( 0.138196601125010504,  // (5 - sqrt(5))/20  G4
                        0.309016994374947451); // (sqrt(5) - 1)/4   F4
// First corner
  vec4 i  = floor(v + dot(v, C.yyyy) );
  vec4 x0 = v -   i + dot(i, C.xxxx);

// Other corners

// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
  vec4 i0;

  vec3 isX = step( x0.yzw, x0.xxx );
  vec3 isYZ = step( x0.zww, x0.yyz );
//  i0.x = dot( isX, vec3( 1.0 ) );
  i0.x = isX.x + isX.y + isX.z;
  i0.yzw = 1.0 - isX;

//  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
  i0.y += isYZ.x + isYZ.y;
  i0.zw += 1.0 - isYZ.xy;

  i0.z += isYZ.z;
  i0.w += 1.0 - isYZ.z;

  // i0 now contains the unique values 0,1,2,3 in each channel
  vec4 i3 = clamp( i0, 0.0, 1.0 );
  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );

  //  x0 = x0 - 0.0 + 0.0 * C 
  vec4 x1 = x0 - i1 + 1.0 * C.xxxx;
  vec4 x2 = x0 - i2 + 2.0 * C.xxxx;
  vec4 x3 = x0 - i3 + 3.0 * C.xxxx;
  vec4 x4 = x0 - 1.0 + 4.0 * C.xxxx;

// Permutations
  i = mod289(i); 
  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
  vec4 j1 = permute( permute( permute( permute (
             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));
// Gradients
// ( 7*7*6 points uniformly over a cube, mapped onto a 4-octahedron.)
// 7*7*6 = 294, which is close to the ring size 17*17 = 289.

  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

  vec4 p0 = grad4(j0,   ip);
  vec4 p1 = grad4(j1.x, ip);
  vec4 p2 = grad4(j1.y, ip);
  vec4 p3 = grad4(j1.z, ip);
  vec4 p4 = grad4(j1.w, ip);

// Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  p4 *= taylorInvSqrt(dot(p4,p4));

// Mix contributions from the five corners
  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
  m0 = m0 * m0;
  m1 = m1 * m1;
  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
               + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;

  }
`;

const vertexShader = `
${snoise}
uniform float uTime;
uniform float uScroll;
uniform float uNoiseScale;
uniform float uMorphAmp;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vNoise;

void main() {
  vNormal = normalize(normalMatrix * normal);
  
  float noise = snoise(vec4(
    normalize(position) * uNoiseScale,
    uTime * 0.3
  ));
  
  vNoise = noise;
  
  vec3 displaced = position + normal * (noise * uMorphAmp * (0.6 + uScroll * 0.4));
  
  vec4 modelPosition = modelMatrix * vec4(displaced, 1.0);
  vPosition = modelPosition.xyz;
  
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
`;

const fragmentShader = `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform vec3 uRimColor;
uniform float uGlossiness;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vNoise;

void main() {
  vec3 viewDir = normalize(cameraPosition - vPosition);
  
  // Base color mixing based on noise
  float noiseMapped = vNoise * 0.5 + 0.5; // remap to 0-1
  vec3 baseColor = mix(uColorA, uColorB, noiseMapped);
  
  // Fresnel Rim Light
  float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 2.0);
  vec3 rimLight = uRimColor * fresnel * 2.5;
  
  // Fake light from top-right for gloss
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
  vec3 halfVec = normalize(viewDir + lightDir);
  float spec = pow(max(dot(normalize(vNormal), halfVec), 0.0), uGlossiness * 256.0);
  
  vec3 finalColor = baseColor + rimLight + spec * vec3(1.0, 0.8, 0.9);
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export function GlowBlob({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const haloRef1 = useRef<THREE.Mesh>(null);
  const haloRef2 = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const targetAmp = hovered ? 0.85 : 0.3;
  const speedRef = useRef(0.002);
  const ampRef = useRef(0.3);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uNoiseScale: { value: 0.8 },
      uMorphAmp: { value: 0.3 },
      uColorA: { value: new THREE.Color("#ff1a4b") },
      uColorB: { value: new THREE.Color("#ff6688") },
      uColorC: { value: new THREE.Color("#ff99cc") },
      uRimColor: { value: new THREE.Color("#cc44ff") },
      uGlossiness: { value: 0.92 },
    }),
    []
  );

  useFrame((state) => {
    // Only animate if not reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (meshRef.current) {
      if (!prefersReducedMotion) {
        speedRef.current = THREE.MathUtils.lerp(speedRef.current, hovered ? 0.015 : 0.002, 0.05);
        meshRef.current.rotation.y += speedRef.current;
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
      }
      
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      if (mat.uniforms) {
        if (!prefersReducedMotion) {
          mat.uniforms.uTime.value = state.clock.elapsedTime;
          ampRef.current = THREE.MathUtils.lerp(ampRef.current, targetAmp, 0.05);
        }
        mat.uniforms.uScroll.value = scrollProgress;
        mat.uniforms.uMorphAmp.value = ampRef.current;
      }

      // Scale blob from 0.4 -> 1.0 as scrollProgress goes 0 -> 0.3
      const t = Math.min(scrollProgress / 0.3, 1.0);
      const targetScale = THREE.MathUtils.lerp(0.4, 1.0, isNaN(t) ? 0 : t);
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }

    if (!prefersReducedMotion) {
      if (haloRef1.current) {
        const s = 1.0 + Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
        haloRef1.current.scale.set(s, s, s);
      }
      
      if (haloRef2.current) {
        const s = 1.0 + Math.sin(state.clock.elapsedTime * 0.6 + Math.PI) * 0.03;
        haloRef2.current.scale.set(s, s, s);
      }
    }
  });

  return (
    <group>
      <mesh 
        ref={meshRef} 
        scale={[0.4, 0.4, 0.4]}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <sphereGeometry args={[2, 128, 128]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
          depthWrite={false}
        />
      </mesh>
      
      {/* Halos */}
      <mesh ref={haloRef1}>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshBasicMaterial
          color="#ff3366"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={haloRef2}>
        <sphereGeometry args={[2.55, 32, 32]} />
        <meshBasicMaterial
          color="#aa44ff"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
