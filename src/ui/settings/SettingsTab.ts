import type AdvancedModalsPlugin from "../../main";
import { App, ButtonComponent, Component, ExtraButtonComponent, PluginSettingTab, Setting, TextComponent, ToggleComponent } from "obsidian";
import EditModal from "./EditModal";
import { createModal, deleteModal, getModals } from "store/settings";



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

		containerEl.createEl("h2", { text: "Custom Modals" });

		new Setting(containerEl)
			.setDesc(`
				This is where the desc is;
			`);

		for (const [index, modal] of getModals().entries()) {
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