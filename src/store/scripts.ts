import { readdir, readFile, writeFile } from "fs/promises";
import { join, extname } from "path";
import type { App, FileSystemAdapter } from "obsidian";

type DataObject = {[key: string]: string};

const data = new Map<string, string>();

const scripts = new Map<string, (data: DataObject) => string>();

export async function loadScripts(app: App) {
	scripts.clear();
	
	const root = (app.vault.adapter as FileSystemAdapter).getBasePath();
	const config = join(root, '.obsidian', 'snippets');
	const snippets = (await readdir(config)).filter(file => extname(file) === ".js");
	try {
		for (const s of snippets) {
			const content = (await readFile(join(config, s))).toString();
			const f = new Function("args", content) as (data: DataObject) => string;
			if (typeof f !== "function") throw new TypeError("Imported script is not a function! Found type " + typeof f);
			scripts.set(s, f);
		}
	} catch (error) {
		console.log(error);
	}
}

export function executeScript(name: string) {
	const f = scripts.get(name);
	if (!f) throw `Script ${name} not found!`;
	try {
		f(Object.fromEntries(data));
	} catch (error) {
		console.log("SDLKJFDSLKJFLKDSJFL")		
		console.log(error);
	}
}