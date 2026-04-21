import { ref, computed } from 'vue'
import en from './en.js'
import zh from './zh.js'

const locale = ref('zh')
const messages = { en, zh }

export function useI18n() {
  const msg = computed(() => messages[locale.value])

  const toggleLocale = () => {
    locale.value = locale.value === 'en' ? 'zh' : 'en'
  }

  return { locale, msg, toggleLocale }
}
