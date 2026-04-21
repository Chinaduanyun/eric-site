<script setup>
import { onMounted, computed, ref, useId, onBeforeUnmount } from 'vue'
import { AnimatedComponent } from '@/services/AnimatedComponent';

const props = defineProps({
  texts: {
    type: Array,
    required: true
  },
  duration: {
    type: Number,
    default: 2
  },
  container: {
    type: Object,
    default: null
  }
})

const component = ref(null);
const uniqueId = useId();
const trackRef = ref(null);
const styleRef = ref(null);
const words = computed(() => [...props.texts, props.texts[0]])

const generateKeyframes = (stepCount, animName) => {
  const stepPercentage = 50 / stepCount;
  let keyframes = `@keyframes ${animName} {\n  0% { transform: translateY(0); }\n`;

  for (let i = 0; i <= stepCount - 1; i++) {
    const position = `calc(-${i + 1} * var(--word-height))`;
    keyframes += `${stepPercentage * i * 2 + stepPercentage}% { transform: translateY(${position}); }\n`;
    keyframes += `${(stepPercentage * i + stepPercentage) * 2}% { transform: translateY(${position}); }\n`;
  }

  return keyframes + `}`;
}

const enableAnimations = () => {
  trackRef.value?.classList.remove('pause')
}

const disableAnimations = () => {
  trackRef.value?.classList.add('pause')
}

onMounted(() => {
  const stepCount = words.value.length - 1;
  if (stepCount < 1 || !trackRef.value) return;

  const animName = `slide-steps-${uniqueId}`;
  const style = document.createElement('style');
  styleRef.value = style

  style.textContent = generateKeyframes(stepCount, animName);
  document.head.appendChild(style)

  trackRef.value.style.animation = `${animName} ${stepCount * props.duration}s cubic-bezier(0.25, 0.1, 0.25, 1.4) infinite`

  component.value = new AnimatedComponent(props.container);
  component.value.enableAnimations = enableAnimations;
  component.value.disableAnimations = disableAnimations;
  component.value.autoAnimate();
})

onBeforeUnmount(() => {
  styleRef.value?.remove()
  component.value?.reset();
})
</script>

<template>
  <div class="text-anim-window">
    <div ref="trackRef" class="text-anim-track">
      <p v-for="(word, wi) in words" :key="wi" class="word">
        {{ word }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.text-anim-window {
  --word-height: 1.22em;
  height: var(--word-height);
  overflow: hidden;
}

.text-anim-track {
  display: flex;
  flex-direction: column;
  align-items: center;
  will-change: transform;
}

.word {
  min-height: var(--word-height);
  height: var(--word-height);
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  line-height: 1.08;
  padding-bottom: 0.08em;
}
</style>
