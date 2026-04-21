<script setup>
import ScrollBar from '@/components/Scrollbar.vue';
import LiquidNavbar from '@/components/LiquidNavbar.vue';
import LiquidFilter from '@/filter/LiquidFilter.vue';
import LiquidTexturedFilter from '@/filter/LiquidTexturedFilter.vue';
import Home from '@/views/Home.vue';
import AboutMe from '@/views/AboutMe.vue';
import AboutMeMobile from '@/views/AboutMeMobile.vue';
import Projects from '@/views/Projects.vue';
import AwardsSection from '@/views/AwardsSection.vue';
import Awards from '@/views/Awards.vue';
import Contact from '@/views/Contact.vue';
import CustomA from '@/components/CustomA.vue';
import { provideScrollContext } from '@/composables/useScrollContext';
import { useCursorContext } from '@/composables/useCursorContext';
import { useWindowContext } from '@/composables/useWindowContext';
import { ref, onMounted } from 'vue';
import { AnimatedComponent } from '@/services/AnimatedComponent';
import { useI18n } from '@/i18n';

const { msg } = useI18n();

const { containerRef, contentRef } = provideScrollContext();
const { setPositions } = useCursorContext();
const { resetWidth, md } = useWindowContext();

const component = ref();
const windowComponent = ref();

const setCursorPos = (e) => {
  if (e instanceof MouseEvent) setPositions(e.clientX, e.clientY);
}

onMounted(async () => {
  const trackerUrl = import.meta.env.VITE_TRACKER_URL;
  if (trackerUrl) await fetch(trackerUrl)
  component.value = new AnimatedComponent();
  component.value.tick = setCursorPos;
  component.value.addAnimationTrigger(window, "mousemove");

  windowComponent.value = new AnimatedComponent();
  windowComponent.value.tick = resetWidth;
  windowComponent.value.addAnimationTrigger(window, "resize");
})
</script>

<template>
  <section id="loading"
    class="outline-[100dvw] outline-white rounded-[999px] bg-transparent h-0 w-0 fixed top-1/2 left-1/2 z-[100] -translate-1/2 flex items-center justify-center">
    <div class="loading-inner absolute flex flex-col items-center gap-3">
      <div class="font-rubik text-black text-2xl md:text-3xl tracking-wider uppercase overflow-hidden">
        <span class="loading-text inline-block">duanyun.me</span>
      </div>
      <div class="flex items-center gap-3 text-black/40">
        <div class="loading-dot w-1.5 h-1.5 rounded-full bg-black/40"></div>
        <div class="loading-dot w-1.5 h-1.5 rounded-full bg-black/40" style="animation-delay: 0.15s"></div>
        <div class="loading-dot w-1.5 h-1.5 rounded-full bg-black/40" style="animation-delay: 0.3s"></div>
      </div>
    </div>
  </section>
  <ScrollBar />
  <LiquidFilter />
  <LiquidTexturedFilter />
  <div ref="containerRef" id="container" class="overflow-auto h-dvh flex flex-col items-center font-ledger"
    style="scrollbar-width: none;">
    <LiquidNavbar />
    <div ref="contentRef" id="content" class=" w-full flex flex-col">
      <Home />
      <AboutMe v-if="md" />
      <AboutMeMobile v-else />
      <Projects />
      <AwardsSection />
      <Awards />
      <Contact />
      <footer class="relative">
        <span class="absolute bottom-0 text-sm p-[4dvw] opacity-60 text-white">
          <CustomA :text="msg.readCode" href="https://github.com/Chinaduanyun" target="_blank" />
        </span>
      </footer>
    </div>
  </div>
</template>

<style scoped>
#loading {
  animation: 1.5s resize 3s ease-in-out forwards,
    0s hide 4s forwards;

  .loading-inner {
    animation: 1s hide 2.2s forwards;
  }
}

.loading-text {
  animation: 0.6s slide-up 0.2s ease-out both;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.loading-dot {
  animation: 1.2s dot-pulse 0.6s ease-in-out infinite;
}

@keyframes dot-pulse {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.3;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}

@keyframes resize {
  to {
    width: 150dvw;
    height: 150dvh;
    border-radius: 0px;
  }
}

@keyframes hide {
  to {
    opacity: 0;
    display: none;
    pointer-events: none;
    visibility: hidden;
    z-index: -1;
  }
}
</style>
