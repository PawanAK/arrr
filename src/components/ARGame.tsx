'use client';

import { useEffect, useState, useRef } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

export default function ARGame() {
  const [score, setScore] = useState(0);
  const [isTargetFound, setIsTargetFound] = useState(false);
  const sceneRef = useRef(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    const arSystem = sceneEl?.systems["mindar-image-system"];
    
    // Target found/lost handlers
    const targetFound = () => {
      setIsTargetFound(true);
      // Increment score when target is found
      setScore(prev => prev + 1);
    };

    const targetLost = () => {
      setIsTargetFound(false);
    };

    // Add target found/lost event listeners
    sceneEl?.addEventListener('targetFound', targetFound);
    sceneEl?.addEventListener('targetLost', targetLost);

    const startAR = () => {
      if (arSystem) {
        arSystem.start();
      }
    };

    sceneEl?.addEventListener('renderstart', startAR);

    return () => {
      if (arSystem) {
        arSystem.stop();
      }
      sceneEl?.removeEventListener('targetFound', targetFound);
      sceneEl?.removeEventListener('targetLost', targetLost);
      sceneEl?.removeEventListener('renderstart', startAR);
    };
  }, []);

  return (
    <>
      <div style={{ 
        position: 'fixed', 
        top: 20, 
        left: 20, 
        zIndex: 1000, 
        background: '#FF4081', // Changed to pink
        padding: '12px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>
        Points: {score}
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
          ></a-box>
        </a-entity>

        <a-entity light="type: ambient; color: #BBB; intensity: 1"></a-entity>
        <a-entity light="type: directional; color: #FFF; intensity: 0.6" position="-0.5 1 1"></a-entity>
      </a-scene>
    </>
  );
} 