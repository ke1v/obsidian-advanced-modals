import type AdvancedModalSettings from "AdvancedModalSettings";
import type { TFolder } from "obsidian";

export interface AdvancedModalsPluginSettings {
	modalSettings: AdvancedModalSettings[];
	templateFolder: string;
}

const DEFAULT_SETTINGS: Partial<AdvancedModalsPluginSettings> = {
	modalSettings: [],
	templateFolder: "/",
}

let settings: AdvancedModalsPluginSettings;

let saveData: (data: any) => Promise<void>;
let loadData: () => Promise<any>;

export function initSettingsStore(save: (data: any) => Promise<void>, load: () => Promise<any>) {
	saveData = save;
	loadData = load;
}

export async function loadSettings(): Promise<void> {
	settings = Object.assign({}, DEFAULT_SETTINGS, await loadData());
}

export async function saveSettings(): Promise<void> {
	await saveData(settings);
}

export async function changeModal(name: string, replacement: AdvancedModalSettings): Promise<void> {
	const index = settings.modalSettings.findIndex(modal => modal.name === name);
	if (index === -1) return;

	// Check for name collision if changed
	if (name !== replacement.name) {
		const collision = settings.modalSettings.find(modal => modal.name === replacement.name);
		if (collision) throw "Name collision!";
	}

	settings.modalSettings[index] = replacement;
	await saveData(settings);
}

export function getModals(): AdvancedModalSettings[] {
	return settings.modalSettings;
}

export async function createModal(modal?: AdvancedModalSettings): Promise<void> {
	if (settings.modalSettings.find(m => m.name === modal?.name)) throw "Name collision!";

	if (!modal) {
		let name: string = "";
		for (let i = 1; i < Number.MAX_SAFE_INTEGER; i++) {
			if (!settings.modalSettings.find(m => m.name === `new-modal-${i}`)) {
				name = `new-modal-${i}`;
				break;
			}
		}
		if (!name) throw "What the fuck";

		modal = {
			name,
			inputs: [],
			next: null,
			file: null,
		}
	}

	settings.modalSettings.push(modal);
	await saveSettings();
}

export async function deleteModal(name: string): Promise<void> {
	const index = settings.modalSettings.findIndex(modal => modal.name === name);
	delete settings.modalSettings[index];

	await saveSettings();
}

export function getTemplateFolder(): string {
	return settings.templateFolder;
}

export async function setTemplateFolder(folder: string): Promise<void> {
	settings.templateFolder = folder;
	await saveSettings();
}