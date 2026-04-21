<script setup>
import { ref, onMounted } from 'vue';
import TextAnim from '@/components/TextAnim.vue'
import FramedMainSection from '@/layouts/FramedMainSection.vue';
import ParticleImage from '@/components/ParticleImage.vue';
import { useI18n } from '@/i18n';

const { msg, toggleLocale } = useI18n();
const frameRef = ref(null);
const containerRef = ref(null);

onMounted(() => {
    containerRef.value = frameRef.value.sectionRef;
});
</script>

<template>
    <FramedMainSection ref="frameRef" id="home" class="h-dvh">
        <div 
            class="relative h-full w-full rounded-4xl overflow-hidden bg-black flex flex-col justify-center items-center text-center">
            <ParticleImage />
            <button
                @click="toggleLocale"
                class="absolute top-5 right-5 z-20 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-rubik tracking-wider border border-white/20 transition-all cursor-pointer">
                {{ msg.langToggle }}
            </button>
            <div
                class="relative z-10 text-[#fff] font-rubik uppercase text-[8.5vw] sm:text-[7vw] md:text-[5dvw] xl:text-[7dvh] leading-[1.08] flex flex-col justify-center items-center pointer-events-none px-4">
                <p class="flex min-h-[1.2em] items-center">{{ msg.hero.before }}</p>
                <div class="flex min-h-[1.2em] items-center overflow-hidden px-[0.08em]">
                    <TextAnim
                        v-if="containerRef"
                        :texts="msg.hero.rotatingWords"
                        :container="containerRef"
                        :duration="2.5"
                        class="text-red-custom hero-rotating-text"
                    />
                </div>
                <p class="flex min-h-[1.2em] items-center">{{ msg.hero.after }}</p>
            </div>
            <p class="relative z-10 mt-6 max-w-2xl px-6 text-center text-sm md:text-lg text-white/75 font-inter pointer-events-none normal-case tracking-normal">
                {{ msg.hero.subtitle }}
            </p>
        </div>
    </FramedMainSection>
</template>

<style scoped>
.hero-rotating-text {
    display: block;
    width: max-content;
}
</style>
