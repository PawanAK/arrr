'use client';

import { useEffect, useState, useRef } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

export default function ARGame() {
  const [score, setScore] = useState(0);
  const sceneRef = useRef(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    const arSystem = sceneEl?.systems["mindar-image-system"];
    
    sceneEl?.addEventListener('renderstart', () => {
      arSystem?.start();
    });

    return () => {
      arSystem?.stop();
    };
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', top: 10, left: 10, zIndex: 1000, background: 'white', padding: '10px' }}>
        Score: {score}
      </div>
      
      <a-scene
        ref={sceneRef}
        mindar-image={`imageTargetSrc: https://res.cloudinary.com/dsvjf1ede/raw/upload/v1731391025/o9vjnrjh3peyver34jc1.mind`}
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex: 0">
          {/* Add a simple red box as a test object */}
          <a-box 
            position="0 0 0" 
            scale="1 1 1" 
            color="red"
            onClick={() => setScore(prev => prev + 1)}
          ></a-box>
        </a-entity>

        <a-entity light="type: ambient; color: #BBB; intensity: 1"></a-entity>
        <a-entity light="type: directional; color: #FFF; intensity: 0.6" position="-0.5 1 1"></a-entity>
      </a-scene>
    </>
  );
} 