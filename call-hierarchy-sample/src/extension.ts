// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { FoodPyramidHierarchyProvider } from './FoodPyramidHierarchyProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "call-hierarchy-sample" is now active!');

	let disposable = vscode.languages.registerCallHierarchyProvider('plaintext', new FoodPyramidHierarchyProvider());

	context.subscriptions.push(disposable);

	showSampleText(context);
}

async function showSampleText(context: vscode.ExtensionContext): Promise<void> {
	let sampleTextEncoded = await vscode.workspace.fs.readFile(vscode.Uri.file(context.asAbsolutePath('sample.txt')));
	let sampleText = new TextDecoder('utf-8').decode(sampleTextEncoded);
	let doc = await vscode.workspace.openTextDocument({ language: 'plaintext', content: sampleText });
	vscode.window.showTextDocument(doc);
}

// this method is called when your extension is deactivated
export function deactivate() { }
