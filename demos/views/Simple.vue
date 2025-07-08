<template>
  <div class="el-tiptap-editor__wrapper">
    <el-tiptap ref="editor" :extensions="extensions" v-model:content="content" output="json"
      placeholder="Write something ..." @onSelectionUpdate="onSelectionUpdate" @onTransaction="onTransaction" />
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
  TextPlaceholder,
];

const editor = ref();
const content = ref({});

const onSelectionUpdate = (options) => {
  console.log(options);
  console.log(options.editor.state.selection.node?.attrs);
};

const onTransaction = () => {
  console.log(editor.value.editor.getJSON());
};
</script>
