<template>
    <div>
        <vue-markdown :source="markdownContent" @click-link="handleLinkClick" />
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';

export default {
    components: {
        VueMarkdown,
    },
    data() {
        return {
            markdownContent: `
# Hello, Markdown!

This is a **sample** Markdown document.

## Code Block

\`\`\`javascript
function add(a, b) {
  return a + b;
}
\`\`\`

## Gif Image

![GIF Image](path/to/your/gif.gif)

## Hyperlink

[Click me](https://www.example.com)
      `,
        };
    },
    methods: {
        handleLinkClick(url) {
            // Your callback logic for hyperlink click
            console.log('Link clicked:', url);
        },
    },
};
</script>
