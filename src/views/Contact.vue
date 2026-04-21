<script setup>
import { onMounted, ref, computed, onBeforeUnmount } from 'vue';
import FramedMainSection from '@/layouts/FramedMainSection.vue';
import { useScrollContext } from '@/composables/useScrollContext'
import { AnimatedComponent } from '@/services/AnimatedComponent';
import CustomA from '@/components/CustomA.vue';
import Parallax from '@/components/Parallax.vue';
import { useI18n } from '@/i18n';
import { useWindowContext } from '@/composables/useWindowContext';

const { msg } = useI18n();
const contact = computed(() => msg.value.contact);

const component = ref(null)
const frameRef = ref(null)
const { containerRef } = useScrollContext()
const { md } = useWindowContext()
const contactSectionRef = ref(null)
const translationRef = ref(0)
const paddingTopRef = ref(0)
const contactBackgroundStyle = {
    backgroundImage: `url(${import.meta.env.BASE_URL}contact/background.webp)`
}
const portraitSrc = `${import.meta.env.BASE_URL}contact/portrait.webp`

const handleScroll = () => {
    if (!md.value) {
        translationRef.value = 0
        return
    }

    const relativeScrollPosition = frameRef.value.sectionRef.getBoundingClientRect().top;
    translationRef.value = Math.round(relativeScrollPosition + paddingTopRef.value * 1.5)
}

onMounted(() => {
    paddingTopRef.value = parseFloat(getComputedStyle(contactSectionRef.value).paddingTop)
    component.value = new AnimatedComponent(frameRef.value.sectionRef);
    component.value.tick = handleScroll;
    component.value.addAnimationTrigger(containerRef.value, "scroll");
});

onBeforeUnmount(() => {
    component.value.reset();
})
</script>

<template>
    <FramedMainSection ref="frameRef" id="contact" class="h-dvh">
        <Parallax>
            <div ref="contactSectionRef" class="h-full w-full relative rounded-4xl flex flex-col pt-24">
                <div :style="contactBackgroundStyle" class="absolute h-full w-full top-0 left-0 rounded-4xl brightness-[.85] bg-cover bg-center -z-10 overflow-hidden">
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8 px-8 text-white">
                    <div v-for="(value, key) in contact" :key="key" class="h-full w-full">
                        <h2 class="font-rubik border-b-2 border-dashed border-neutral-400 text-xl">{{ key }}</h2>
                        <ul class="pt-4 text-2xl flex flex-col gap-2">
                            <li v-for="(h, index) in value" :key="index" class="w-fit"><CustomA v-if="!h.hidden" :text="h.text" :href="h.href" :target="h.target"/></li>
                        </ul>
                    </div>
                </div>

                <div class="flex flex-col justify-center items-center text-[14vw] md:text-[10dvw] leading-none w-full h-full font-rubik px-4 text-center">
                    <h1 class="text-white">{{ msg.letsWork }}</h1>
                    <h1 class="text-red-custom z-10">{{ msg.together }}</h1>
                </div>

                <div class="h-full w-full flex justify-center items-end absolute bottom-0 pointer-events-none" :style="`transform: translateY(${translationRef}px)`">
                    <div class="relative w-[88%] sm:w-[72%] md:w-1/2 lg:w-3/8 max-w-sm translate-y-[6%] md:translate-y-0 md:max-w-none">
                        <img :src="portraitSrc" alt="" data-parallax-value=".15" class="w-full h-auto object-contain object-bottom parallax"/>
                    </div>
                </div>
            </div>
        </Parallax>
    </FramedMainSection>
</template>
