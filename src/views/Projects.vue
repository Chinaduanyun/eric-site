<script setup>
import { ref, computed, onMounted } from 'vue';
import FramedMainSection from '@/layouts/FramedMainSection.vue';
import ToggleSection from '@/components/ToggleSection.vue';
import { useSingleToggle } from '@/composables/useSingleToggle.js'
import ImageAsCursor from '@/components/ImageAsCursor.vue';
import { useImageAsCursor } from '@/composables/useImageAsCursor'
import CustomA from '@/components/CustomA.vue';
import RetroMonitor from '@/components/RetroMonitor.vue';
import { useI18n } from '@/i18n';

const { msg } = useI18n();
const projects = computed(() => msg.value.projects);

const { setImage, setIsUrl, setIsOpen, setIsSmall } = useImageAsCursor()
const { isOpen, toggle, openIndex } = useSingleToggle()
const frameRef = ref()
const containerRef = ref();

const preloadImage = (src) => {
    if (!src) return;
    const image = new Image();
    image.src = src;
}

onMounted(() => {
    containerRef.value = frameRef.value.sectionRef;

    projects.value.forEach((project) => {
        preloadImage(project.background);
        preloadImage(project.hoverImage);
        project.images.forEach(preloadImage);
    });
})
</script>

<template>
    <ImageAsCursor v-if="containerRef" :contentSection="containerRef" />
    <FramedMainSection ref="frameRef" id="vibe-coding" :class="'min-h-[100dvh] flex h-auto'">
        <div class="flex-1 w-full bg-fit flex flex-col text-center pt-20">
            <div class="w-full h-full flex flex-col">
                <ToggleSection v-for="(project, pi) in projects" :key="pi" :open="isOpen(pi)" @toggle="toggle(pi)"
                    @hover="setImage(project.hoverImage || project.background), setIsOpen(true), openIndex == pi ? setIsSmall(true) : setIsSmall(false)" @leave="setIsOpen(false), setIsSmall(false)">
                    <template v-slot:header>
                        <img :src="project.background" alt="" class="absolute h-full w-full top-0 left-0 -z-20 brightness-50 object-cover object-left md:object-center"/>
                        <h1 class="tracking-[-0.3dvw] hidden md:flex">
                            00-{{ (pi + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 }) }}
                        </h1>
                        <h1 class="w-full text-left md:absolute md:left-1/2 md:w-auto md:-translate-x-1/2 md:text-center">{{ project.title }}</h1>
                    </template>
                    <template v-slot:content>

                        <div class="px-6 pb-6">
                            <div
                                class="relative w-full text-black overflow-hidden flex flex-col items-start gap-6 h-fit">
                                <div class="gap-8 flex items-center flex-col lg:flex-row w-full my-4 lg:my-8">
                                    <RetroMonitor
                                        :images="project.images"
                                    />
                                    <div class="w-full lg:w-1/2 z-20 text-white p-4 text-left">
                                        <p class="text-base lg:text-lg" v-html="project.description"></p>
                                        <p v-if="project.stage" class="text-xs lg:text-sm text-white/60 mt-3">{{ project.stage }}</p>
                                    </div>
                                </div>
                                <a @mouseenter="setIsUrl(true)" @mouseleave="setIsUrl(false)" :href="project.link" class="relative w-full flex bg-center bg-cover bg-white" target="_blank">
                                    <CustomA :text="msg.viewMore" :href="project.link" target="_blank" class="z-10 h-full w-full p-4"/>
                                </a>
                            </div>
                        </div>

                    </template>
                </ToggleSection>
            </div>
        </div>
    </FramedMainSection>
</template>


<style>
@keyframes bg-move {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 3dvh -3dvh;
    }
}
</style>