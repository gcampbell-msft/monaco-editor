import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

(function () {
	// create div to avoid needing a HtmlWebpackPlugin template
	const div = document.createElement('div');
	div.id = 'root';
	div.style = 'width:800px; height:600px; border:1px solid #ccc;';

	document.body.appendChild(div);
})();

var editor = monaco.editor.create(document.getElementById('root'), {
	value: [''].join('\n'),
	language: 'text',
	wordWrap: 'off',
	lineNumbers: 'on',
	glyphMargin: false,
	lineDecorationsWidth: 20,
	rulers: [],
	folding: false,
	scrollBeyondLastLine: false,
	renderLineHighlight: 'none',
	renderValidationDecorations: 'editable',
	padding: undefined,
	readOnly: true,
	domReadOnly: true,
	fixedOverflowWidgets: true,
	theme: 'vs-dark',
	contextmenu: false // this disables the ability to show the context menu
});

// this disables the monaco keybinding, which disables the monaco search box, which might not 
// be VS themeable.
editor._standaloneKeybindingService.addDynamicKeybinding("-actions.find", null, () => {});

// disables the F1 command pallete
editor.addCommand(monaco.KeyCode.F1, () => {});

const method = () => {
	const lineCount = editor.getModel().getLineCount();
	const lastLineLength = editor.getModel().getLineMaxColumn(lineCount);

	const range = new monaco.Range(
		lineCount,
		lastLineLength,
		lineCount,
		lastLineLength
	);

	const oneNewlineText = "new line: \n";

	editor.getModel().applyEdits([{text: oneNewlineText, range: range}]);
};

setInterval(method, .01);
