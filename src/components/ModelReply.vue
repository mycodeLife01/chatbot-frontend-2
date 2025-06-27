<template>
    <!-- GitHub 风格排版 + 自动暗黑高亮 -->
    <article class="model-reply markdown-body" v-html="renderedHtml" />
</template>

<script setup lang="js">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import DOMPurify from 'dompurify'

// —— 1️⃣ 样式：排版 + 代码高亮 —— //
import 'github-markdown-css/github-markdown.css'          // Markdown 基础排版
import 'highlight.js/styles/github-dark.css'              // 代码块暗黑主题

/*
 * 单例 Markdown 解析器：脚本执行一次即创建，避免每次渲染都实例化
 */
const md = new MarkdownIt({
    html: true,            // 允许 HTML，然后用 DOMPurify 做安全过滤
    linkify: true,
    typographer: true,
    highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
            } catch (_) { }
        }
        return md.utils.escapeHtml(str)
    },
})
md.renderer.rules.hr = () => ''
// —— 2️⃣ 组件输入 —— //
const props = defineProps({
    content: {
        type: String,
        default: '',
    },
})
/*
 * rawContent:
 * 1. 优先使用 content prop；
 */
const rawContent = computed(() => {
    if (props.content) return props.content
})

/*
 * renderedHtml:
 * 1. 把 Markdown 转 HTML；
 * 2. 使用 DOMPurify 消毒，防止 XSS；
 * 3. 若渲染异常则退回纯文本。
 */
const renderedHtml = computed(() => {
    const src = rawContent.value
    if (!src) return ''
    try {
        const unsafe = md.render(src)
        return DOMPurify.sanitize(unsafe)
    } catch (err) {
        console.error('[ModelReply] Markdown 渲染失败', err)
        return md.utils.escapeHtml(src)
    }
})
</script>