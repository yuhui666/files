<template>
    <div>
        <div class="markdown-container">
            <div v-html="renderedMarkdown" ref="markdown" class="markdown-content"></div>
        </div>
    </div>
</template>

<script lang="ts">
import MarkdownIt from 'markdown-it';
import Clipboard from 'clipboard';
import anchor from 'markdown-it-anchor';
import container from 'markdown-it-container';
import 'highlight.js/styles/default.css'; // Import the highlight.js stylesheet
import { ElMessage } from 'element-plus';
import { onMounted, ref, watchEffect } from 'vue';
import hljs from 'highlight.js'; // Import highlight.js for syntax highlighting

export default {
    props: {
        url: String,
    },
    setup(props) {
        const markdownText = ref('');
        const renderedMarkdown = ref('');

        const renderMarkdown = () => {
            const md = new MarkdownIt({
                highlight: (str, lang) => {
                    if (lang && hljs.getLanguage(lang)) {
                        try {
                            return hljs.highlight(lang, str).value;
                        } catch (__) {}
                    }

                    return ''; // use external default escaping
                },
            });

            // 使用插件
            md.use(anchor);
            md.use(container, 'code', {
                render(tokens, idx) {
                    // 渲染代码块时添加样式类
                    return tokens[idx].nesting === 1
                        ? `<div class="code-container">\n`
                        : `</div>\n`;
                },
            });

            renderedMarkdown.value = md.render(markdownText.value);

            // 添加样式类或其他样式操作
            const markdownContainer = document.querySelector('.markdown-container');
            if (markdownContainer) {
                const codeContainers = markdownContainer.querySelectorAll('.code-container');
                codeContainers.forEach((container) => {
                    container.style.backgroundColor = '#f2f2f2';
                    container.style.color = '#333';
                    container.style.borderRadius = '5px';
                    container.style.padding = '10px';
                    container.style.margin = '10px 0';
                    container.style.overflow = 'auto';
                    container.style.border = '1px solid #ddd';
                });

                const links = markdownContainer.querySelectorAll('a');
                links.forEach((link) => {
                    link.style.color = '#3498db';
                    link.style.textDecoration = 'none';
                    link.style.transition = 'color 0.3s';
                });

                markdownContainer.addEventListener('mouseover', (event) => {
                    const target = event.target;
                    if (target.tagName === 'A') {
                        target.style.color = '#2980b9';
                        target.style.textDecoration = 'underline';
                    }
                });

                markdownContainer.addEventListener('mouseout', (event) => {
                    const target = event.target;
                    if (target.tagName === 'A') {
                        target.style.color = '#3498db';
                        target.style.textDecoration = 'none';
                    }
                });
            }
        };

        watchEffect(() => {
            if (props.url.endsWith('json')) {
                return;
            }
            fetchData();
        });

        async function fetchData() {
            try {
                const response = await fetch(props.url);
                if (response.ok) {
                    const str = await response.text();
                    markdownText.value = str;
                    renderMarkdown();
                } else {
                    console.error('Failed to fetch markdown content');
                    markdownText.value = '无内容';
                    renderMarkdown();
                }
            } catch (error) {
                console.error('Error fetching markdown content', error);
                markdownText.value = '无内容';
                renderMarkdown();
            }
        }

        onMounted(() => {
            // You can keep other setup logic here if needed
        });

        return {
            renderedMarkdown,
            renderMarkdown,
            markdownText,
        };
    },
};
</script>

<style scoped>
.markdown-container {
    position: relative;
}

.markdown-content {
    position: relative;
    margin: 15px 0;
}

.dark-code-block:hover {
    background-color: #444;
}
</style>
