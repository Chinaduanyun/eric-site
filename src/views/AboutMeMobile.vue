<script setup>
import { computed } from 'vue';
import FramedMainSection from '@/layouts/FramedMainSection.vue'
import { useI18n } from '@/i18n';

const { msg } = useI18n();
const stories = computed(() => msg.value.aboutMe);
const careerBackgroundStyle = {
  backgroundImage: `url(${import.meta.env.BASE_URL}backgrounds/career.webp)`
};
</script>

<template>
    <FramedMainSection id="career" class="min-h-[100dvh] flex relative">
        <div
            :style="careerBackgroundStyle"
            class="h-full w-full rounded-4xl bg-cover bg-left md:bg-right text-[#3E2723] flex justify-center items-end text-center p-4 sm:p-5">
            <div class="grid grid-cols-1 gap-3 rounded-3xl bg-white/72 backdrop-blur-[2px] p-3 sm:p-4">

                <div v-for="(story, i) in stories" :key="i"
                    class="h-fit flex-1 p-4 flex flex-col items-start cursor-default text-left gap-2">
                    <span class="text-sm opacity-70">{{ story.from }} — {{ story.to }}</span>
                    <h1 class="font-bold text-xl leading-none font-rubik">{{ story.when }}</h1>
                    <p class="flex-1 h-fit">
                        {{ story.description }}
                    </p>
                </div>
            </div>
        </div>
    </FramedMainSection>
</template>
