<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useScrollContext } from '@/composables/useScrollContext'
import FollowingFrame from '@/components/FollowingFrame.vue'
import { AnimatedComponent } from '@/services/AnimatedComponent'

const props = defineProps({
    contentSection: {
        type: HTMLElement,
        required: true
    }
})

const { containerRef } = useScrollContext();

const component = ref();
const contentContainerRef = ref();
const scrollableSectionRef = ref();
const scrollableSectionPadding = ref();
const highlightEl = ref();
const maxParagraphSize = ref(0);
const windowComponent = ref();

const registerContainer = (el) => {
    contentContainerRef.value = el;
}

// Set the base positions
const computeLayout = () => {
    const items = contentContainerRef.value.children;
    const iArr = Array.from(items);

    iArr.map(i => i.style.height = "");
    highlightEl.value.style.height = "";
    scrollableSectionRef.value.style.height = "";

    maxParagraphSize.value = iArr.reduce(
        (max, el) => Math.max(max, el.offsetHeight),
        items[0].offsetHeight
    );

    iArr.map(i => i.style.height = `${maxParagraphSize.value}px`)
    highlightEl.value.style.height = `${maxParagraphSize.value}px`;

    const padding = window.innerHeight - (items[0].offsetHeight + items[items.length - 1].offsetHeight) / 2
    scrollableSectionPadding.value = parseFloat(getComputedStyle(highlightEl.value.parentElement.parentElement).padding)
    scrollableSectionRef.value.style.height = `${contentContainerRef.value.offsetHeight + padding - 2 * scrollableSectionPadding.value}px`
    applyParagraphsTransform(0, true)
}

const applyParagraphsTransform = (scroll, isSetup = false) => {
    Array.from(contentContainerRef.value.children).forEach((el) => {
        if (isSetup || el.getBoundingClientRect().top < highlightEl.value.getBoundingClientRect().bottom && el.getBoundingClientRect().bottom > highlightEl.value.getBoundingClientRect().top) {
            // ensure that the rotation value is between -200 and 200
            const rotation = Math.min(Math.max(-(scroll + el.offsetTop), -200), 200);
            el.style.transform = `translateZ(${-Math.abs(rotation)}px) rotateX(${rotation / 3}deg)`;
        }
    })
}

// Apply the transformations
const tick = () => {
    let translation = scrollableSectionRef.value.getBoundingClientRect().top - scrollableSectionPadding.value;
    const bottomLimit = scrollableSectionRef.value.getBoundingClientRect().bottom - window.innerHeight + scrollableSectionPadding.value;

    if (translation >= 0) {
        translation = 0
    } else if (bottomLimit < 0) {
        translation = maxParagraphSize.value - contentContainerRef.value.offsetHeight;
    }

    applyParagraphsTransform(translation)
    contentContainerRef.value.style.transform = `translateY(${translation}px)`;
}

onMounted(async () => {
    if (document.fonts) await document.fonts.ready;

    computeLayout();
    component.value = new AnimatedComponent(props.contentSection);
    component.value.tick = tick;
    component.value.addAnimationTrigger(containerRef.value, "scroll");
    
    windowComponent.value = new AnimatedComponent();
    windowComponent.value.tick = computeLayout;
    windowComponent.value.addAnimationTrigger(window, "resize");
})

onBeforeUnmount(() => {
    component.value.reset();
    windowComponent.value.reset();
})

</script>

<template>
    <!-- Frame -->
    <FollowingFrame :contentSection="contentSection">
        <div class="relative h-dvh w-full top-0 left-0 pointer-events-none">
            <div class="h-full w-full overflow-hidden z-20 p-[3dvw]">
                <div
                    class="h-full w-full flex flex-row justify-center items-center rounded-4xl outline-[6dvw] outline-white">
                    <div ref="highlightEl"
                        class="rounded-full bg-white w-3/4 lg:w-2/3 px-4 pb-2 z-20 relative overflow-hidden">
                        <slot name="content" :registerContainer="registerContainer"></slot>
                        <div
                            class="absolute h-full w-full top-0 left-0 z-30 bg-linear-[white_0%,transparent_15%,transparent_85%,white_100%]">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </FollowingFrame>

    <!-- Scrollable content -->
    <div ref="scrollableSectionRef" class="w-full bg-linear-to-b from-violet-500 to-yellow-500">
        <slot name="background"></slot>
    </div>
</template>
