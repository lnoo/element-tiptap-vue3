<template>
  <div class="el-tiptap-editor__wrapper">
    <el-tiptap :extensions="extensions" v-model:content="content" output="html" placeholder="Write something ..."
      @onSelectionUpdate="onSelectionUpdate" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  Code,
  Link,
  Image,
  Blockquote,
  BulletList,
  OrderedList,
  TaskList,
  TextAlign,
  Indent,
  HardBreak,
  HorizontalRule,
  CodeView,
  Fullscreen,
  History,
  Table,
} from 'element-tiptap-vue3-fixed';

import codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css'; // import base style
import 'codemirror/mode/xml/xml.js'; // language
import 'codemirror/addon/selection/active-line.js'; // require active-line.js
import 'codemirror/addon/edit/closetag.js'; // autoCloseTags
import { TextPlaceholder } from '@/extensions';

const extensions = [
  Doc,
  Text,
  Paragraph,
  Heading.configure({ level: 5 }),
  Bold.configure({ bubble: true }),
  Underline.configure({ bubble: true }),
  Italic.configure({ bubble: true }),
  Strike.configure({ bubble: true }),
  Code,
  Link.configure({ bubble: true }),
  Image,
  Blockquote,
  TextAlign,
  BulletList,
  OrderedList,
  TaskList,
  Indent,
  HardBreak,
  HorizontalRule.configure({ bubble: true }),
  CodeView.configure({
    codemirror,
    codemirrorOptions: {
      styleActiveLine: true,
      autoCloseTags: true,
    },
  }),
  Fullscreen,
  History,
  Table,
  TextPlaceholder,
];

const content = ref(
  '<table isplaceholder="true"><tbody><tr><th colspan="1" rowspan="1"><p></p></th><th colspan="1" rowspan="1"><p></p></th></tr><tr><td colspan="1" rowspan="1"><p></p></td><td colspan="1" rowspan="1"><p></p></td></tr></tbody></table><image alt="placeholder" src="data:image/png;base64,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" isPlaceholder="true" width="200px" height="200px"></image><h2 style="text-align: center;">Welcome To Element Tiptap Editor Demo</h2><text-placeholder name="客户姓名"></text-placeholder><p>🔥 <strong>Element Tiptap Editor </strong>🔥is a WYSIWYG rich-text editor using&nbsp; <a href="https://github.com/scrumpy/tiptap" target="_blank" ref="nofollow noopener noreferrer">tiptap</a>&nbsp;and <a href="https://github.com/element-plus/element-plus" target="_blank" ref="nofollow noopener noreferrer">element-plus</a>&nbsp;for Vue3,<img src="https://i.ibb.co/nbRN3S2/undraw-upload-87y9.png" alt="" title="" height="200" data-display="right"> that\'s easy to use, friendly to developers, fully extensible and clean in design.</p><p></p><p style="text-align: right;">👉Click on the image to get started image features 👉</p><p></p><p>You can switch to <strong>Code View </strong>💻 mode and toggle <strong>Fullscreen</strong> 📺 in this demo.</p><p></p><p><strong>Got questions or need help or feature request?</strong></p><p>🚀 <strong>welcome to submit an <a href="https://github.com/Leecason/element-tiptap/issues" target="_blank" ref="nofollow noopener noreferrer">issue</a></strong> 😊</p><p>I\'m continuously working to add in new features.</p><p></p><blockquote><p>This demo is simple, switch tab for more features.</p><p>All demos source code: <a href="https://github.com/Leecason/element-tiptap/blob/master/demos/views/Index.vue" target="_blank" ref="nofollow noopener noreferrer">source code 🔗</a></p></blockquote>'
);

const onSelectionUpdate = (options) => {
  console.log(options);
  console.log(options.editor.state.selection.node?.attrs);
};
</script>
