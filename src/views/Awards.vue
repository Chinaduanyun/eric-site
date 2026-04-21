<script setup>
import { computed } from 'vue';
import FramedMainSection from '@/layouts/FramedMainSection.vue';
import Parallax from '@/components/Parallax.vue';
import { useI18n } from '@/i18n';

const { msg } = useI18n();
const aiTools = computed(() => msg.value.aiTools);
const awardsBackgroundStyle = {
  backgroundImage: `url(${import.meta.env.BASE_URL}ai-tools/background.webp)`
};

const logoText = (name) => name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
const handleLogoError = (event) => {
  const img = event.target;
  img.classList.add('hidden');
  img.nextElementSibling?.classList.remove('hidden');
};
</script>

<template>
  <FramedMainSection id="ai-tools" class="h-dvh">
    <Parallax>
      <div class="h-full w-full relative overflow-hidden rounded-4xl text-white">
        <!-- Background: Monet painting -->
        <div class="absolute inset-0 -z-10">
          <div :style="awardsBackgroundStyle" class="h-full w-full bg-cover bg-center"></div>
        </div>

        <!-- Scrollable content layer -->
        <div class="ai-tools-scroll relative z-10 h-full overflow-y-auto p-5 md:p-8 flex flex-col gap-4">
          <!-- Section header -->
          <div class="flex-shrink-0">
            <h2 class="font-rubik text-xl md:text-2xl lg:text-3xl uppercase">
              {{ aiTools.title }}
            </h2>
            <p class="text-white/80 mt-1 text-sm max-w-md">{{ aiTools.subtitle }}</p>
          </div>

          <!-- Bento Grid -->
          <div class="bento-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <a
              v-for="tool in aiTools.tools"
              :key="tool.name"
              :href="tool.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group relative rounded-3xl filter before:rounded-3xl before:pointer-events-none backdrop-filter-[url('#liquidFilter')] p-5 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden"
              :class="{
                'sm:col-span-2': tool.large,
                'min-h-[160px]': tool.large,
                'min-h-[140px]': !tool.large
              }"
            >
              <div class="absolute inset-0 w-full h-full bg-black opacity-25 -z-10 rounded-3xl"></div>
              <div class="relative z-10">
                <div class="flex items-center justify-between mb-3">
                  <div class="relative h-10 w-10 shrink-0">
                    <img
                      :src="tool.icon"
                      :alt="tool.name"
                      class="h-10 w-10 rounded-xl object-contain bg-white/10 p-1.5"
                      @error="handleLogoError"
                    />
                    <div class="hidden absolute inset-0 rounded-xl bg-white/10 text-white/90 text-xs font-rubik flex items-center justify-center">
                      {{ logoText(tool.name) }}
                    </div>
                  </div>
                  <span class="text-white/20 text-lg group-hover:text-white/70 group-hover:-rotate-45 transition-all duration-300">↗</span>
                </div>
                <h3 class="font-rubik text-xs md:text-sm">{{ tool.name }}</h3>
                <p class="text-white/75 text-xs md:text-sm mt-1.5 leading-relaxed">{{ tool.desc }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Parallax>
  </FramedMainSection>
</template>

<style scoped>
.ai-tools-scroll::-webkit-scrollbar {
  display: none;
}
.ai-tools-scroll {
  scrollbar-width: none;
}
</style>
