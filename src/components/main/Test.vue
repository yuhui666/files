<template>
    <div>
        <div v-html="renderedMarkdown" @click="handleLinkClick"></div>
    </div>
</template>

<script>
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export default {
    data() {
        return {
            markdownString: `
# WebRtc 实现音视频推拉流

## Demo

**参考项目**

- flutter 项目地址\`\`Fltter\`\` \`\`Dart\`\` \`\`ios\`\` \`\`Android\`\` \`\`web\`\` \`\`JNI\`\` \`\`C++\`\`<br>
  https://github.com/flutter-webrtc/flutter-webrtc-demo
- server 项目地址\`\`go\`\` <br>
  https://github.com/flutter-webrtc/flutter-webrtc-server

## 样例1
\`\`\`javascript

function hello(){
    console.log("")
}

\`\`\`


      `,
            renderedMarkdown: '',
        };
    },
    mounted() {
        this.renderMarkdown();
    },
    methods: {
        renderMarkdown() {
            marked.setOptions({
                renderer: new marked.Renderer(),
                highlight: function (code, lang) {
                    return lang ? hljs.highlight(lang, code).value : hljs.highlightAuto(code).value;
                },
            });
            this.renderedMarkdown = marked(this.markdownString, { breaks: true });
            console.log(this.renderedMarkdown)
        },
        handleLinkClick(event) {
            const target = event.target;
            if (target.tagName === 'A') {
                const href = target.getAttribute('href');
                console.log('Link clicked:', href);
            }
        },
    },
};
</script>

<style>

</style>
