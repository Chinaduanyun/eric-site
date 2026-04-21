<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import { useScrollContext } from '@/composables/useScrollContext';
import CustomA from '@/components/CustomA.vue';
import { AnimatedComponent } from '@/services/AnimatedComponent';
import BurgerIcon from '@/icons/BurgerIcon.vue';
import CrossIcon from '@/icons/CrossIcon.vue';
import { useI18n } from '@/i18n';

const { msg } = useI18n();
const { containerRef, getSections, scroll } = useScrollContext();

const component = ref();
const navContainerRef = ref();
const currentSection = ref();
const isMobileMenuOpened = ref(false);

const scrollTo = (e, section) => {
    e.preventDefault();
    scroll(section);
}

const sectionDisplayName = (id) => {
    if (!id) return '';
    return msg.value.nav[id] ?? String(id).replace(/-/g, ' ');
};

const computeIndicator = () => {
    const sections = getSections();
    const navChildren = navContainerRef.value?.children;
    if (!navChildren?.length || !sections.length) return;

    const sectionRects = sections.map((section) => section?.el?.getBoundingClientRect());
    const widths = [];
    let nextCurrentSection = currentSection.value;

    for (let i = 0; i <= navChildren.length - 1; i++) {
        const sectionRect = sectionRects[i];
        if (!sectionRect) {
            widths.push('0%');
            continue;
        }

        const relativeRelScroll = -1 * Math.round(sectionRect.top);
        const sectionHeight = Math.round(sectionRect.height);

        let percent = 0;

        if (relativeRelScroll >= 0 && relativeRelScroll <= sectionHeight) {
            nextCurrentSection = sections[i].id;
            percent = relativeRelScroll * 100 / sectionHeight;
            if (i == navChildren.length - 1) percent = 100;
        } else if (relativeRelScroll > sectionHeight) {
            percent = 100;
        }

        widths.push(`${percent}%`);
    }

    currentSection.value = nextCurrentSection;
    widths.forEach((width, index) => {
        navChildren[index].style.setProperty('--after-width', width);
    });
}

onMounted(async () => {
    component.value = new AnimatedComponent();
    component.value.tick = computeIndicator;
    component.value.addAnimationTrigger(containerRef.value, "scroll");
    component.value.addAnimationTrigger(window, "resize");
    await nextTick();
    const sections = getSections();
    if (sections.length > 0) currentSection.value = sections[0].id;
    computeIndicator()
})

onBeforeUnmount(() => {
    component.value.reset();
})
</script>

<template>
    <nav ref="nav"
        class="text-white fixed pointer-events-none flex-col top-[4dvw] z-50 rounded-3xl filter before:rounded-3xl backdrop-filter-[url('#liquidFilter')]">
                <div class="absolute inset-0 w-full h-full bg-black opacity-25 -z-10 rounded-3xl"></div>
        <div ref="navContainerRef" class="hidden md:flex gap-4 p-4 relative">
            <CustomA v-for="(s, si) in getSections()" :key="s.id" :text="sectionDisplayName(s.id)" href="" @click="(e) => scrollTo(e, s.el)"
                class="navLink pointer-events-auto relative after:content-[''] after:h-[1px] after:left-0 after:bottom-0 after:absolute after:bg-white"
                :class="{ 'after:transition-all after:duration-300': si === getSections().length - 1 }" />
        </div>

        <div class="flex md:hidden relative gap-4 transition-all p-4 cursor-pointer rounded-3xl pointer-events-auto" @click="isMobileMenuOpened = true">
            <BurgerIcon />
            <span>{{ sectionDisplayName(currentSection) }}</span>
        </div>

    </nav>
    <section :class="{ '-translate-x-full': !isMobileMenuOpened }"
        class="flex md:hidden transition-all fixed inset-0 h-full w-full filter backdrop-filter-[url('#liquidTexturedFilter')] z-50 ">
        <div class="absolute inset-0 w-full h-full bg-black opacity-75 -z-10"></div>
        <div class="h-full w-full flex flex-col items-center text-white p-16 font-rubik z-0">
            <CrossIcon class="absolute top-4 left-4 h-12 w-12 cursor-pointer" @click="isMobileMenuOpened = false" />
            <span v-for="s in getSections()" :key="s.id" class="flex-1 flex items-center">
                <a href="" @click="(e) => { scrollTo(e, s.el); isMobileMenuOpened = false }"
                    class="text-3xl flex items-center justify-center transition-all cursor-pointer pointer-events-auto"
                    :class="{ 'text-red-custom': s.id === currentSection }">
                    {{ sectionDisplayName(s.id) }}
                </a>
            </span>
        </div>
    </section>
</template>

<style scoped>
.navLink::after {
    width: var(--after-width);
}
</style>
