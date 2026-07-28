import type { Editor } from '@tiptap/core';
import { Table as TiptapTable, TableOptions } from '@tiptap/extension-table';
import { TextSelection } from '@tiptap/pm/state';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import TablePopover from '@/components/MenuCommands/TablePopover/index.vue';

const Table = TiptapTable.extend<TableOptions>({
  addAttributes() {
    return {
      ...this.parent?.(),
    };
  },
  addOptions() {
    return {
      ...this.parent?.(),
      buttonIcon: '',
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

  addCommands() {
    return {
      ...this.parent?.(),
      insertTable:
        ({ rows = 3, cols = 3, withHeaderRow = true } = {}) =>
          ({ editor, tr, dispatch }) => {
            const { table, tableRow, tableCell, tableHeader } = editor.schema.nodes;

            const clientWidth = editor.view.dom?.clientWidth ?? 800;
            const containerWidth = clientWidth - 8 - 2 * (cols + 1);
            const cellWidth = Math.floor(containerWidth / cols);

            const createCells = (isHeader: boolean) =>
              Array.from({ length: cols }, () => {
                const type = isHeader && tableHeader ? tableHeader : tableCell;
                return type!.createAndFill({ colwidth: [cellWidth] })!;
              });

            const tableRows = Array.from({ length: rows }, (_, i) =>
            tableRow!.createChecked(
              null,
              withHeaderRow && i === 0 ? createCells(true) : createCells(false),
            ),
            );

            const tableNode = table!.createChecked(null, tableRows);

            if (dispatch) {
              const offset = tr.selection.from + 1;

              tr.replaceSelectionWith(tableNode)
                .scrollIntoView()
                .setSelection(TextSelection.near(tr.doc.resolve(offset)));
            }

            return true;
          },
    };
  },
});

export default Table;
