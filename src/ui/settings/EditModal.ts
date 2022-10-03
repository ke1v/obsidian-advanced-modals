import type AdvancedModalsPlugin from "main";
import { App, ButtonComponent, ExtraButtonComponent, Modal, Notice, Setting, TextComponent } from "obsidian";
import type AdvancedModalSettings from "AdvancedModalSettings";
import type AdvancedModal from "ui/AdvancedModal";
import { changeModal } from "store/settings";

export default class EditModal extends Modal {

	private name: string;
	private edited: AdvancedModalSettings;
	private refreshParent: () => void;

	public constructor(
		app: App, 
		modal: AdvancedModalSettings,
		refresh: () => void,
	) {
		super(app);
		this.edited = structuredClone(modal);
		this.name = modal.name;
		this.refreshParent = refresh;
	}

	public onOpen(): void {
		let { contentEl } = this;
		contentEl.empty();

		contentEl.createEl("h2", { text: "Edit Modal" });

		// MODAL NAME
		new Setting(contentEl)
			.setName("Modal Name")
			.addText((text: TextComponent) => {
				text.setValue(this.edited.name);
				text.onChange((value: string) => {
					this.edited.name = value;
				});
			});

		for (const [i, input] of this.edited.inputs.entries()) {
			new Setting(contentEl)
				.addText((text: TextComponent) => {
					text.setValue(input);
					text.onChange((value: string) => {
						this.edited.inputs[i] = value;
					})
				})
				.addExtraButton((button: ExtraButtonComponent) => {
					button.setIcon("cross");
					button.onClick(() => {
						this.edited.inputs.splice(i, 1);
						this.open();
					});
				});
		}

		// ADD INPUT
		new Setting(contentEl)
			.addButton((button: ButtonComponent) => {
				button.setCta();
				button.setButtonText("Add New Input");
				button.onClick((evt: MouseEvent) => {
					this.edited.inputs.push("new-input");
					this.open();
				});
			});

		// SAVE SETTINGS
		new Setting(contentEl)
			.addButton((button: ButtonComponent) => {
				button.setCta();
				button.setButtonText("Save");
				button.onClick(async (evt: MouseEvent) => {
					await this.submitAction();
				});
			})
		// CANCEL SETTINGS
			.addButton((button: ButtonComponent) => {
				button.setButtonText("Cancel");
				button.onClick((evt: MouseEvent) => {
					this.close();
				})
			});

		// PRESSING ENTER
		contentEl.addEventListener("keypress", async (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				event.preventDefault();
				await this.submitAction();
			}
		})
	}

	public onClose(): void {
		this.contentEl.empty();
	}

	private async submitAction(): Promise<void> {
		try {
			await changeModal(this.name, this.edited);
			this.close();
			this.refreshParent();
		} catch (error) {
			if (error === "Name collision!") {
				new Notice("Modal name already in use! Choose a new name!");
			} else {
				console.log(error);
			}
		}
	}

}