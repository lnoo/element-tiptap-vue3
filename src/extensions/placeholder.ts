// TextPlaceholder Extension: tiptap/vue
import { Node, mergeAttributes } from '@tiptap/core'

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
    }
  },

  parseHTML() {
    return [{ tag: 'text-placeholder' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'text-placeholder',
      mergeAttributes(HTMLAttributes),
      `${HTMLAttributes.name}`,
    ]
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const dom = document.createElement('span')
      dom.className = 'text-placeholder'
      dom.contentEditable = 'false'
      dom.innerText = `🔲 ${node.attrs.name}`

      dom.style.padding = '2px 6px'
      dom.style.border = '1px dashed #aaa'
      dom.style.borderRadius = '4px'
      dom.style.background = '#f5f5f5'
      dom.style.cursor = 'pointer'
      dom.style.fontSize = '0.9em'

      dom.onclick = () => {
        // @ts-ignore
        editor.chain().setNodeSelection(getPos()).run()
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
      }

      return {dom}
    }
  },
})


export const ImagePlaceholder = Node.create({
  name: 'imagePlaceholder',

  group: 'block',
  atom: true,

  addAttributes() {
    return {
      alt: { default: '图片占位符' },
      width: { default: '100%' },
      height: { default: 'auto' },
    }
  },

  parseHTML() {
    return [{ tag: 'image-placeholder' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['image-placeholder', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement('div')
      dom.className = 'image-placeholder'
      dom.contentEditable = 'false'
      dom.style.width = node.attrs.width
      dom.style.height = node.attrs.height
      dom.style.border = '1px dashed #aaa'
      dom.style.display = 'flex'
      dom.style.alignItems = 'center'
      dom.style.justifyContent = 'center'
      dom.style.background = '#fafafa'
      dom.innerText = node.attrs.alt || '图片占位符'
      return { dom }
    }
  },
})

// TablePlaceholder Extension
export const TablePlaceholder = Node.create({
  name: 'tablePlaceholder',

  group: 'block',
  atom: true,

  addAttributes() {
    return {
      rows: { default: 3 },
      columns: { default: 3 },
    }
  },

  parseHTML() {
    return [{ tag: 'table-placeholder' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['table-placeholder', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement('div')
      dom.className = 'table-placeholder'
      dom.contentEditable = 'false'
      dom.style.border = '1px dashed #aaa'
      dom.style.padding = '10px'
      dom.style.background = '#fdfdfd'
      dom.innerText = `表格占位符：${node.attrs.rows}行 × ${node.attrs.columns}列`
      return { dom }
    }
  },
})