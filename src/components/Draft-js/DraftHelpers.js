/**
 * Get current selected text
 * @param  {Draft.ContentState}
 * @param  {Draft.SelectionState}
 * @param  {String}
 * @return {String}
 */
export function getTextSelection(contentState, selection, blockDelimiter) {
    blockDelimiter = blockDelimiter || '\n';
    var startKey   = selection.getStartKey();
    var endKey     = selection.getEndKey();
    var blocks     = contentState.getBlockMap();

    var lastWasEnd = false;
    var selectedBlock = blocks
        .skipUntil(function(block) {
            return block.getKey() === startKey;
        })
        .takeUntil(function(block) {
            var result = lastWasEnd;

            if (block.getKey() === endKey) {
                lastWasEnd = true;
            }

            return result;
        });

    return selectedBlock
        .map(function(block) {
            var key = block.getKey();
            var text = block.getText();

            var start = 0;
            var end = text.length;

            if (key === startKey) {
                start = selection.getStartOffset();
            }
            if (key === endKey) {
                end = selection.getEndOffset();
            }

            text = text.slice(start, end);
            return text;
        })
        .join(blockDelimiter);
}