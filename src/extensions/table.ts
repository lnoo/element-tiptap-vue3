import type { Editor } from '@tiptap/core';
import { Table as TiptapTable, TableOptions } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import TablePopover from '@/components/MenuCommands/TablePopover/index.vue';

interface CustomOptions extends TableOptions {
  isPlaceholder: boolean;
}

const Table = TiptapTable.extend<CustomOptions>({
  addAttributes() {
    return {
      ...this.parent?.(),
      isPlaceholder: {
        default: this.options.isPlaceholder
      }
    };
  },
  addOptions() {
    return {
      ...this.parent?.(),
      buttonIcon: '',
      isPlaceholder: false,
      button({ editor, extension }: { editor: Editor; extension: any; t: (...args: any[]) => string }) {
        return {
          component: TablePopover,
          componentProps: {
            editor,
            buttonIcon: extension.options.buttonIcon,
          },
        };
      },
    };
  },

  addExtensions() {
    return [TableRow, TableHeader, TableCell];
  },
});

export default Table;
