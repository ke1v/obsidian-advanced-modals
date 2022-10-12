import type AdvancedModalsPlugin from "../../main";
import { App, ButtonComponent, Component, DropdownComponent, ExtraButtonComponent, PluginSettingTab, Setting, TextComponent, TFolder, ToggleComponent } from "obsidian";
import EditModal from "./EditModal";
import { createModal, deleteModal, getModals, getTemplateFolder, saveSettings, setTemplateFolder } from "store/settings";

export default class AdvancedModalsSettingsTab extends PluginSettingTab {
	private plugin: AdvancedModalsPlugin;

	constructor(app: App, plugin: AdvancedModalsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	public display(): void {
		// Gets and clears HTML Element
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl("h2", { text: "General Settings" });

		new Setting(containerEl)
			.setName("Template folder")
			.setDesc("Folder that contains your template files")
			.addDropdown((dropdown: DropdownComponent) => {
				let list: Record<string, string> = {};
				this.app.vault.getAllLoadedFiles().filter(t => t instanceof TFolder).forEach(f => list[f.path] = f.path);
				dropdown.addOptions(list);
				dropdown.setValue(getTemplateFolder() || "/");
				dropdown.onChange(async (value: string) => {
					const folder = this.app.vault.getAbstractFileByPath(value);
					if (folder instanceof TFolder) {
						await setTemplateFolder(folder.path);
					} else {
						console.log(`${folder?.path} is not a TFolder!`);
					}
				});
			});

		containerEl.createEl("h2", { text: "Custom Modals" });

		new Setting(containerEl)
			.setDesc("Create your own modals to be triggered by hotkey or via the command palette. Modals can output to the active file, a file in the vault, or create a new file using a template. Using Javascript, you can modify the inputs or the files themselves as an output.");

		for (const modal of getModals().values()) {
			new Setting(containerEl)
				.setName(modal.name)
				.setTooltip("Click to edit")
				.addToggle((toggle: ToggleComponent) => {
					// TOGGLE ON-OFF
					toggle.setDisabled(true);
				})
				.addExtraButton((button: ExtraButtonComponent) => {
					// HOTKEY
					button.setIcon("any-key");
					button.onClick(async () => {
						
					});
				})
				.addExtraButton((button: ExtraButtonComponent) => {
					// UP
					button.setIcon("up-chevron-glyph");
				})
				.addExtraButton((button: ExtraButtonComponent) => {
					// DOWN
					button.setIcon("down-chevron-glyph");
				})
				.addExtraButton((button: ExtraButtonComponent) => {
					// DELETE MODAL
					button.setIcon("cross");
					button.onClick(async () => {
						await deleteModal(modal.name);
						// Updates displayed list
						this.display();
					});
				})
				.infoEl.addEventListener("click", (event: MouseEvent) => {
					// EDIT MODAL
					new EditModal(this.app, modal, this.display.bind(this))
						.open();
				});
		}

		// ADD MODAL
		new Setting(containerEl)
			.addButton((button: ButtonComponent) => {
				button.setButtonText("Add New Modal");
				button.setCta();
				button.onClick(async (event: MouseEvent) => {
					await createModal();
					this.display();
				});
			});
	}

}