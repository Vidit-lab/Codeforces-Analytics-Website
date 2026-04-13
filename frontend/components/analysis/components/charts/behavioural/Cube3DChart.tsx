import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { BehaviourRecord, RANK_ORDER, cfColor } from '../../../hooks/useBehaviourData';

interface Props { records: BehaviourRecord[]; height: number }

type Axis = 'contest_count' | 'avg_difficulty' | 'total_problems_solved' | 'rating' | 'accuracy';

const AXIS_LABELS: Record<Axis, string> = {
  contest_count:         'Contests',
  avg_difficulty:        'Avg Difficulty',
  total_problems_solved: 'Problems Solved',
  rating:                'Rating',
  accuracy:              'Accuracy',
};

const AXES: Axis[] = ['contest_count', 'avg_difficulty', 'total_problems_solved', 'rating', 'accuracy'];

const selectStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(167,139,250,0.25)',
  borderRadius: '8px',
  color: 'rgba(220,210,240,0.9)',
  fontSize: '11px',
  padding: '4px 8px',
  cursor: 'pointer',
  outline: 'none',
  fontFamily: "'Inter', sans-serif",
};

function normalise(vals: number[]): number[] {
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;
  return vals.map((v) => (v - min) / range * 4 - 2); // map to [-2, 2]
}

export function Cube3DChart({ records, height }: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef    = useRef<THREE.Scene | null>(null);
  const cameraRef   = useRef<THREE.PerspectiveCamera | null>(null);
  const groupRef    = useRef<THREE.Group | null>(null);
  const frameRef    = useRef<number>(0);
  const dragRef     = useRef({ dragging: false, x: 0, y: 0, rotX: 0.4, rotY: 0.6 });
  const zoomRef     = useRef(6);

  const [xAxis, setXAxis] = useState<Axis>('contest_count');
  const [yAxis, setYAxis] = useState<Axis>('avg_difficulty');
  const [zAxis, setZAxis] = useState<Axis>('total_problems_solved');
  const [autoRotate, setAutoRotate] = useState(true);

  const syncPoints = () => {
    if (!sceneRef.current || !groupRef.current) return;

    const group = groupRef.current;

    while (group.children.length) {
      const child = group.children[0] as THREE.Object3D;
      group.remove(child);

      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => material.dispose());
        } else {
          child.material.dispose();
        }
      }
    }

    const xs = normalise(records.map((r) => (r[xAxis] as number) ?? 0));
    const ys = normalise(records.map((r) => (r[yAxis] as number) ?? 0));
    const zs = normalise(records.map((r) => (r[zAxis] as number) ?? 0));

    records.forEach((rec, i) => {
      const col = cfColor(rec.title ?? 'newbie');
      const geo = new THREE.SphereGeometry(0.08, 10, 10);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(col),
        transparent: true,
        opacity: 0.88,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(xs[i], ys[i], zs[i]);
      group.add(mesh);
    });
  };

  // Init Three.js scene
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;
    const w = container.clientWidth;
    const h = height - 52;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 0, zoomRef.current);
    cameraRef.current = camera;

    // Axes helper (custom colored)
    const axHelper = new THREE.AxesHelper(2.2);
    scene.add(axHelper);

    // Box wireframe
    const boxGeo = new THREE.BoxGeometry(4, 4, 4);
    const edges   = new THREE.EdgesGeometry(boxGeo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x443366, transparent: true, opacity: 0.35 });
    scene.add(new THREE.LineSegments(edges, lineMat));

    // Group for points
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    // Populate points immediately if data is already available.
    syncPoints();

    // Animate
    const drag = dragRef.current;
    function animate() {
      frameRef.current = requestAnimationFrame(animate);
      if (autoRotate && !drag.dragging) drag.rotY += 0.004;
      group.rotation.x = drag.rotX;
      group.rotation.y = drag.rotY;
      axHelper.rotation.x = drag.rotX;
      axHelper.rotation.y = drag.rotY;
      renderer.render(scene, camera);
    }
    animate();

    // Mouse drag
    const el = renderer.domElement;
    const onDown = (e: MouseEvent) => { drag.dragging = true; drag.x = e.clientX; drag.y = e.clientY; };
    const onUp   = () => { drag.dragging = false; };
    const onMove = (e: MouseEvent) => {
      if (!drag.dragging) return;
      drag.rotY += (e.clientX - drag.x) * 0.008;
      drag.rotX += (e.clientY - drag.y) * 0.008;
      drag.x = e.clientX; drag.y = e.clientY;
    };
    const onWheel = (e: WheelEvent) => {
      zoomRef.current = Math.max(3, Math.min(14, zoomRef.current + e.deltaY * 0.01));
      camera.position.z = zoomRef.current;
    };
    el.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);
    el.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      cancelAnimationFrame(frameRef.current);
      el.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('wheel', onWheel);
      renderer.dispose();
      if (container.contains(el)) container.removeChild(el);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height]);

  useEffect(() => {
    syncPoints();
  }, [records, xAxis, yAxis, zAxis]);

  // Sync auto-rotate
  useEffect(() => {
    // No-op: autoRotate is read in the animate closure via ref
    dragRef.current; // silence lint
  }, [autoRotate]);

  const axisControls = (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '8px' }}>
      {(['X', 'Y', 'Z'] as const).map((ax, idx) => {
        const val  = idx === 0 ? xAxis : idx === 1 ? yAxis : zAxis;
        const setV = idx === 0 ? setXAxis : idx === 1 ? setYAxis : setZAxis;
        const axColors = ['#FF6B6B', '#6BFFB4', '#6B9FFF'];
        return (
          <div key={ax} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: axColors[idx] }}>{ax}:</span>
            <select style={selectStyle} value={val} onChange={(e) => setV(e.target.value as Axis)}>
              {AXES.map((a) => <option key={a} value={a}>{AXIS_LABELS[a]}</option>)}
            </select>
          </div>
        );
      })}
      <button
        onClick={() => setAutoRotate((v) => !v)}
        style={{ ...selectStyle, background: autoRotate ? 'rgba(167,139,250,0.18)' : 'rgba(255,255,255,0.06)', marginLeft: 'auto' }}
      >
        {autoRotate ? '⏸ Pause' : '▶ Rotate'}
      </button>
    </div>
  );

  return (
    <div style={{ width: '100%' }}>
      {axisControls}
      <div ref={canvasRef} style={{ width: '100%', height: height - 52, borderRadius: '10px', overflow: 'hidden', cursor: 'grab' }} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '8px' }}>
        {RANK_ORDER.map((r) => (
          <span key={r} style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '4px', background: cfColor(r) + '22', border: `1px solid ${cfColor(r)}44`, color: cfColor(r) }}>
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
}
