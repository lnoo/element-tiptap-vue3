import { mergeCells, splitCell } from 'prosemirror-tables';
import { EditorState } from 'prosemirror-state';

export function isTableActive(state: EditorState): boolean {
  const { selection, doc } = state;
  const { from, to } = selection;

  let keepLooking = true;
  let active = false;

  doc.nodesBetween(from, to, (node) => {
    const name = node.type.name;
    if (
      keepLooking &&
      (name === 'table' || name === 'table_row' || name === 'table_column' || name === 'table_cell')
    ) {
      keepLooking = false;
      active = true;
    }
    return keepLooking;
  });

  return active;
}

export function isTablePlaceholder(state: EditorState): boolean {
  const { selection, doc } = state;
  const { from } = selection;

  let placeholder = false;

  doc.nodesBetween(from, from, (node) => {
    if (node.type.name === 'table') {
      placeholder = !!node.attrs?.isPlaceholder;
      return false; // 找到了，停止遍历
    }
    return true;
  });

  return placeholder;
}

export function enableMergeCells(state: EditorState): boolean {
  return isTableActive(state) && mergeCells(state);
}

export function enableSplitCell(state: EditorState): boolean {
  return isTableActive(state) && splitCell(state);
}
