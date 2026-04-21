<script setup>
import { ref, computed, onBeforeUnmount } from 'vue';

const props = defineProps({
    images: {
        type: Array,
        default: () => []
    }
});

const allImages = computed(() => {
    return props.images && props.images.length > 0 ? props.images.slice(0, 4) : [''];
});

const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);
const currentX = ref(0); // For rotationY
const currentY = ref(0); // For rotationX
const rotateX = ref(-15); // Initial slight tilt
const rotateY = ref(40);  // Initial rotation

const handlePointerDown = (e) => {
    isDragging.value = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    startX.value = clientX;
    startY.value = clientY;
    
    currentX.value = rotateY.value;
    currentY.value = rotateX.value;
    
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);
};

const handlePointerMove = (e) => {
    if (!isDragging.value) return;
    if (e.cancelable) {
        e.preventDefault();
    }
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - startX.value;
    const deltaY = clientY - startY.value;
    
    rotateY.value = currentX.value + deltaX * 0.5;
    rotateX.value = currentY.value - deltaY * 0.5;
    
    // Limit X rotation so we don't flip the computer upside down
    if (rotateX.value > 45) rotateX.value = 45;
    if (rotateX.value < -45) rotateX.value = -45;
};

const handlePointerUp = () => {
    isDragging.value = false;
    window.removeEventListener('mousemove', handlePointerMove);
    window.removeEventListener('touchmove', handlePointerMove);
    window.removeEventListener('mouseup', handlePointerUp);
    window.removeEventListener('touchend', handlePointerUp);
};

onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handlePointerMove);
    window.removeEventListener('touchmove', handlePointerMove);
    window.removeEventListener('mouseup', handlePointerUp);
    window.removeEventListener('touchend', handlePointerUp);
});

// Helper to distribute images across the 4 faces
const getImage = (index) => {
    return allImages.value[index % allImages.value.length];
};
</script>

<template>
    <div class="flex justify-center items-center w-full lg:w-1/2 perspective-container"
         @mousedown="handlePointerDown" 
         @touchstart="handlePointerDown">
        
        <div class="monitor-cube" :style="{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }">
            
            <!-- Top and Bottom faces -->
            <div class="cube-face cube-top">
                <div class="top-details"></div>
            </div>
            <div class="cube-face cube-bottom"></div>

            <!-- 4 Monitor Faces (Front, Right, Back, Left) -->
            <div v-for="(face, idx) in ['front', 'right', 'back', 'left']" :key="face" :class="`cube-face cube-${face}`">
                <div class="mac-body">
                    <!-- The Screen (Fixed 16:9 aspect ratio) -->
                    <div class="mac-screen-bezel">
                        <div class="mac-screen">
                            <img :src="getImage(idx)" alt="Screenshot" class="screen-image drag-none pointer-events-none" />
                            <div class="scanlines"></div>
                            <div class="screen-glare"></div>
                        </div>
                    </div>
                    
                    <!-- The Bottom Details -->
                    <div class="mac-bottom">
                        <div class="logo-area">
                            <div class="rainbow-logo">
                                <span></span><span></span><span></span><span></span><span></span><span></span>
                            </div>
                        </div>
                        <div class="floppy-drive"></div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.perspective-container {
    perspective: 1500px;
    height: 400px; /* Give enough vertical room to avoid clipping */
    z-index: 30;
    cursor: grab;
    touch-action: none; /* Prevent scrolling when dragging the cube */
}
.perspective-container:active {
    cursor: grabbing;
}

.monitor-cube {
    position: relative;
    width: 280px;
    height: 250px; 
    transform-style: preserve-3d;
}

.cube-face {
    position: absolute;
    backface-visibility: hidden;
    background: #e4e4da; /* Classic beige color */
    border: 1px solid #c0c0b4;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

/* 
  Mobile Sizes 
  Cube Width/Depth = 280px
  Cube Height = 250px
*/
.cube-front, .cube-right, .cube-back, .cube-left {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.cube-front  { transform: rotateY(  0deg) translateZ(140px); }
.cube-right  { transform: rotateY( 90deg) translateZ(140px); }
.cube-back   { transform: rotateY(180deg) translateZ(140px); }
.cube-left   { transform: rotateY(-90deg) translateZ(140px); }

/* Top and Bottom need width & height equal to depth (280px) */
.cube-top, .cube-bottom {
    left: 0;
    width: 280px;
    height: 280px;
    top: calc(50% - 140px); 
}

.cube-top { 
    transform: rotateX( 90deg) translateZ(125px); /* Half of height 250px */
    background: #e1e1d6;
    border: 2px solid #fff;
    box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
}
.cube-bottom { 
    transform: rotateX(-90deg) translateZ(125px); 
    background: #c0c0b4;
}

.top-details {
    width: 60%;
    height: 60%;
    margin: 20%;
    background: transparent;
    border: 2px solid rgba(0,0,0,0.05);
    border-radius: 8px;
    background-image: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 4px,
        rgba(0,0,0,0.05) 4px,
        rgba(0,0,0,0.05) 8px
    );
}

.mac-body {
    width: 100%;
    height: 100%;
    padding: 16px 16px 12px 16px;
    display: flex;
    flex-direction: column;
    box-shadow: inset -5px -5px 15px rgba(0,0,0,0.05), inset 5px 5px 15px rgba(255,255,255,0.5);
    background: #e4e4da;
}

/* Screen Bezel to strictly enforce 16:9 ratio */
.mac-screen-bezel {
    background: #dcdccf;
    border-radius: 8px;
    padding: 8px;
    box-shadow: 
        inset 3px 3px 6px rgba(0,0,0,0.2),
        inset -3px -3px 6px rgba(255,255,255,0.7),
        0 1px 2px rgba(255,255,255,0.8);
    width: 100%;
    aspect-ratio: 16 / 9;
    position: relative;
    margin-bottom: auto; /* Push the bottom details down */
}

/* Actual Screen */
.mac-screen {
    width: 100%;
    height: 100%;
    background: #111;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    box-shadow: inset 0 0 15px rgba(0,0,0,0.9);
    border: 2px solid #1a1a1a;
}

.screen-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top; /* Ensure the top of the website screenshot shows */
    opacity: 0.9; 
}

.drag-none {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
}

/* CRT Effects */
.scanlines {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(
        to bottom,
        rgba(255,255,255,0),
        rgba(255,255,255,0) 50%,
        rgba(0,0,0,0.15) 50%,
        rgba(0,0,0,0.15)
    );
    background-size: 100% 4px;
    pointer-events: none;
    box-shadow: inset 0 0 40px rgba(0,0,0,0.6);
}

.screen-glare {
    position: absolute;
    top: -50%; left: -50%; width: 200%; height: 200%;
    background: linear-gradient(
        135deg,
        rgba(255,255,255,0.15) 0%,
        rgba(255,255,255,0) 40%,
        rgba(255,255,255,0) 100%
    );
    pointer-events: none;
    transform: rotate(-15deg);
}

/* Lower Details Area */
.mac-bottom {
    display: flex;
    align-items: flex-end;
    position: relative;
    height: 24px;
    margin-top: 10px;
}

.logo-area {
    position: absolute;
    left: 4px;
    bottom: 0px;
    width: 16px;
    height: 20px;
    background: #ccc;
    padding: 2px;
    border-radius: 3px;
    box-shadow: inset 1px 1px 2px rgba(0,0,0,0.3), 1px 1px 1px rgba(255,255,255,0.8);
}

.rainbow-logo {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 1px;
    overflow: hidden;
}
.rainbow-logo span { flex: 1; width: 100%; }
.rainbow-logo span:nth-child(1) { background: #55b848; }
.rainbow-logo span:nth-child(2) { background: #f38f21; }
.rainbow-logo span:nth-child(3) { background: #f68121; }
.rainbow-logo span:nth-child(4) { background: #e5422b; }
.rainbow-logo span:nth-child(5) { background: #963d97; }
.rainbow-logo span:nth-child(6) { background: #009ade; }

.floppy-drive {
    position: absolute;
    right: 4px;
    bottom: 8px;
    width: 60px;
    height: 6px;
    background: #222;
    border-radius: 1px;
    box-shadow: inset 0 3px 4px rgba(0,0,0,0.8), 0 1px 1px rgba(255,255,255,0.7);
}


/* Desktop Sizes */
@media (min-width: 1024px) {
    .perspective-container {
        height: 500px;
    }
    
    .monitor-cube {
        width: 380px;
        height: 320px;
    }
    
    .cube-front  { transform: rotateY(  0deg) translateZ(190px); }
    .cube-right  { transform: rotateY( 90deg) translateZ(190px); }
    .cube-back   { transform: rotateY(180deg) translateZ(190px); }
    .cube-left   { transform: rotateY(-90deg) translateZ(190px); }

    .cube-top, .cube-bottom {
        width: 380px;
        height: 380px;
        top: calc(50% - 190px);
    }

    .cube-top { 
        transform: rotateX( 90deg) translateZ(160px); /* Half of height 320px */
    }
    .cube-bottom { 
        transform: rotateX(-90deg) translateZ(160px); 
    }

    .mac-body {
        padding: 24px 24px 16px 24px;
    }
    .mac-screen-bezel {
        padding: 12px;
    }
    
    .logo-area {
        width: 20px;
        height: 24px;
        left: 8px;
    }
    .floppy-drive {
        width: 80px;
        height: 8px;
        right: 8px;
        bottom: 12px;
    }
}
</style>
