<script setup>
import { computed } from 'vue';
import FramedMainSection from '@/layouts/FramedMainSection.vue';
import Parallax from '@/components/Parallax.vue';
import { useI18n } from '@/i18n';

const { msg } = useI18n();
const awards = computed(() => msg.value.awards);
const careerBackgroundStyle = {
  backgroundImage: `url(${import.meta.env.BASE_URL}backgrounds/career.webp)`
};
</script>

<template>
  <FramedMainSection id="awards" class="min-h-[100dvh] flex h-auto">
    <Parallax>
      <div class="relative h-full w-full rounded-4xl overflow-hidden text-white p-6 md:p-8 lg:p-10">
        <div :style="careerBackgroundStyle" class="absolute inset-0 -z-10 bg-cover bg-center brightness-[0.4]"></div>
        <div class="absolute inset-0 -z-10 bg-black/35"></div>

        <div class="relative z-10 flex flex-col gap-6">
          <div>
            <h2 class="font-rubik text-2xl md:text-3xl uppercase">{{ awards.title }}</h2>
            <p class="mt-2 max-w-2xl text-sm md:text-base text-white/75">{{ awards.subtitle }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <article
              v-for="award in awards.items"
              :key="`${award.time}-${award.title}`"
              class="rounded-3xl border border-white/15 bg-black/25 backdrop-blur-sm p-5 md:p-6 flex flex-col gap-3"
            >
              <div class="flex items-start justify-between gap-4">
                <h3 class="font-rubik text-lg md:text-xl leading-tight">{{ award.title }}</h3>
                <span class="shrink-0 rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-wide text-white/70">
                  {{ award.level }}
                </span>
              </div>
              <p class="text-sm text-white/60">{{ award.time }}</p>
              <p class="text-sm md:text-base text-white/80 leading-relaxed">{{ award.detail }}</p>
            </article>
          </div>
        </div>
      </div>
    </Parallax>
  </FramedMainSection>
</template>
