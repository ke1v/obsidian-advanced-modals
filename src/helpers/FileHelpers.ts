import { Notice, TFile, TFolder, Vault, type TAbstractFile } from "obsidian";

export async function AppendToFile(vault: Vault, path: string, text: string, createIfNotExist: boolean): Promise<void> {
	const file = vault.getAbstractFileByPath(path);
	if (file === null) {
		if (createIfNotExist) {
			await vault.create(path, text);
			return;
		}
		// ERROR: FILE DOESNT EXIST
		new Notice("AdvancedModal: File doesn't exist");
		return;
	} else {
		if (file instanceof TFolder) {
			new Notice("sdf");
			return;
		}
		if (file instanceof TFile) {
			await vault.append(file, text);
		}

	}
}