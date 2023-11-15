<template>
    <div>
        <div
            class="markdown-content"
            v-html="renderedMarkdown"
            @click="handleLinkClick"
        ></div>
    </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/a11y-dark.css";

export default {
    props: {
        url: String,
    },
    setup(props) {
        const markdownText = ref("");
        const renderedMarkdown = ref("");

        const renderMarkdown = () => {
            marked.setOptions({
                renderer: new marked.Renderer(),
                highlight: function (code, lang) {
                    return lang
                        ? hljs.highlight(lang, code).value
                        : hljs.highlightAuto(code).value;
                },
            });
            renderedMarkdown.value = marked(markdownText.value, { breaks: true });
        };

        const handleLinkClick = (event) => {
            const target = event.target;
            if (target.tagName === "A") {
                const href = target.getAttribute("href");
                console.log("Link clicked:", href);
            }
        };

        watchEffect(() => {
            if (props.url.endsWith("json")) {
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
                    console.error("Failed to fetch markdown content");
                    markdownText.value = "无内容";
                    renderMarkdown();
                }
            } catch (error) {
                console.error("Error fetching markdown content", error);
                markdownText.value = "无内容";
                renderMarkdown();
            }
        }

        return {
            handleLinkClick,
            renderedMarkdown,
        };
    },
};
</script>

<style scoped>
.markdown-content {
    position: relative;
    margin: 15px 0;
}
     /* 添加代码块的背景和圆角样式 */
 .markdown-content /deep/ pre {
     background-color: #3C3D3E; /* 设置代码块背景色 */
     padding: 10px; /* 设置代码块内边距 */
     border-radius: 5px; /* 设置代码块圆角 */
     overflow: auto; /* 处理代码块过长时的滚动条 */
     font-weight: bold;
     margin: 5px;
 }

.markdown-content /deep/ code {
    background-color: #3C3D3E; /* 设置代码块背景色 */
    padding: 10px; /* 设置代码块内边距 */
    border-radius: 5px; /* 设置代码块圆角 */
    overflow: auto; /* 处理代码块过长时的滚动条 */
    font-weight: bold;
}

</style>
