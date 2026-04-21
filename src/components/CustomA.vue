<script setup>
import { computed } from "vue";

const props = defineProps({
    text: { type: String, required: true },
    href: { type: String, default: "#" },
    target: { type: String, default: "" }
});

const letters = computed(() => props.text.split('').map(l => l === ' ' ? '\u00A0' : l));
</script>

<template>
    <a :href="href" :target="target" class="group flex">
        <div class="relative overflow-hidden">
            <span class="flex">
                <span v-for="(l, i) in letters" :key="i"
                    class="block transition-all duration-200 group-hover:-translate-y-[200%]"
                    :style="{ '--i': i, 'transition-delay': `calc(var(--i) * 30ms)` }">
                    {{ l }}
                </span>
            </span>

            <span class="absolute top-full left-0 flex">
                <span v-for="(l, i) in letters" :key="'bot-' + i"
                    class="block text-red-custom transition-all duration-200 group-hover:-translate-y-full"
                    :style="{ '--i': i, 'transition-delay': `calc(var(--i) * 30ms)` }">
                    {{ l }}
                </span>
            </span>
        </div>
    </a>
</template>
