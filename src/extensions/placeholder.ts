// TextPlaceholder Extension: tiptap/vue
import { Node, mergeAttributes } from '@tiptap/core';

export const TextPlaceholder = Node.create({
  name: 'textPlaceholder',

  group: 'inline',
  inline: true,
  atom: true,
  selectable: true,

  addAttributes() {
    return {
      name: { default: '未命名占位符' },
      maxLength: { default: 100 },
      required: { default: false },
    };
  },

  parseHTML() {
    return [{ tag: 'text-placeholder' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'text-placeholder',
      mergeAttributes(HTMLAttributes),
      `${HTMLAttributes.name}`,
    ];
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const dom = document.createElement('span');
      dom.className = 'text-placeholder';
      dom.contentEditable = 'false';
      dom.innerText = `🔲 ${node.attrs.name}`;

      dom.style.padding = '2px 6px';
      dom.style.border = '1px dashed #aaa';
      dom.style.borderRadius = '4px';
      dom.style.background = '#f5f5f5';
      dom.style.cursor = 'pointer';
      dom.style.fontSize = '0.9em';

      dom.onclick = () => {
        // @ts-ignore
        editor.chain().setNodeSelection(getPos()).run();
        // editor.commands.focus(getPos())
        // editor.options.onFocus?.({
        //   type: 'textPlaceholder',
        //   node,
        //   getPos,
        //   editor,
        // } as any)

        // const name = prompt('占位符名称', node.attrs.name)
        // if (name !== null) {
        //   editor.commands.command(({ tr }) => {
        //     tr.setNodeMarkup(getPos(), undefined, {
        //       ...node.attrs,
        //       name,
        //     })
        //     return true
        //   })
        // }
      };

      return { dom };
    };
  },
});
