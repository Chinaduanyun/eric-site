import { ref, provide, inject } from 'vue'

const key = Symbol('scrollContext');

export function provideScrollContext() {
  const containerRef = ref();
  const contentRef = ref();
  const sections = ref([])

  const registerSection = (id: string, el: HTMLElement) => {
    const existingSection = sections.value.find(s => s.id === id);

    if (!existingSection) {
      sections.value.push({ id, el });
    } else if (!existingSection.el) {
      existingSection.el = el;
    }
  }

  const unregisterSection = (id: string) => {
    sections.value.find(s => s.id === id).el = null;
  }

  const getSections = () => {
    const sec = [];

    sections.value.forEach(s => {
      if (s.el) sec.push(s);
    })

    return sec;
  }

  const scroll = (section: HTMLElement) => {
    const sectionY = section.getBoundingClientRect().top - contentRef.value.getBoundingClientRect().top;
    containerRef.value.scrollTo({ top: sectionY, behavior: 'smooth' });
  }

  provide(key, {
    containerRef,
    contentRef,
    sections,
    getSections,
    scroll,
    registerSection,
    unregisterSection,
  });

  return { containerRef, contentRef, sections };
}

export function useScrollContext() {
  return inject(key, {
    containerRef: ref(null),
    contentRef: ref(null),
    sections: ref([]),
    getSections: () => { },
    scroll: () => { },
    registerSection: () => { },
    unregisterSection: () => { },
  });
}
