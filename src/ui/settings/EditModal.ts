import type AdvancedModalsPlugin from "main";
import { App, ButtonComponent, DropdownComponent, ExtraButtonComponent, Modal, Notice, Setting, TextAreaComponent, TextComponent } from "obsidian";
import type AdvancedModal from "ui/AdvancedModal";
import { changeModal } from "store/settings";
import type { AdvancedModalSettings } from "AdvancedModalSettings";
import SvltEditModal from "ui/component/EditModal.svelte";

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

		const edit = new SvltEditModal({
			target: contentEl,
			props: {
				edited: this.edited,
			}
		});



		// this.titleEl.textContent = "Edit Modal";
		
		// contentEl.createDiv();

		// // MODAL NAME
		// new Setting(contentEl)
		// 	.setName("Modal Name")
		// 	.addText((text: TextComponent) => {
		// 		text.setValue(this.edited.name);
		// 		text.onChange((value: string) => {
		// 			this.edited.name = value;
		// 		});
		// 	});

		// // MODAL OUTPUT
		// new Setting(contentEl)
		// 	.setName("Output Mode")
		// 	.addDropdown((dropdown: DropdownComponent) => {
		// 		const record: Record<string, string> = {};
		// 		ModalOutputModes.forEach(mode => record[mode] = mode);
		// 		dropdown.addOptions(record);
		// 		dropdown.setValue(this.edited.outputMode);
		// 		dropdown.onChange((value: string) => {
		// 			this.edited.outputMode = value as ModalOutputMode;
		// 			this.open();
		// 		});
		// 	});

		// if (this.edited.outputMode === "Append to File" || this.edited.outputMode === "Output on Cursor") {
		// 	const outputFormatSetting = contentEl.createDiv("output-format-setting");
		// 	outputFormatSetting.createEl("p", { text: "Output Format", cls: "" });
		// 	outputFormatSetting.createEl("p", { text: "Set a template you want the modal to output", cls: "setting-item-description" });
		// 	outputFormatSetting.createEl("textarea");
		// }

				

		// // ADD INPUT
		// new Setting(contentEl)
		// 	.addButton((button: ButtonComponent) => {
		// 		button.setCta();
		// 		button.setButtonText("Add New Input");
		// 		button.onClick((evt: MouseEvent) => {
		// 			this.edited.inputs.push("new-input");
		// 			this.open();
		// 		});
		// 	});

		// // SAVE SETTINGS
		// new Setting(contentEl)
		// 	.addButton((button: ButtonComponent) => {
		// 		button.setCta();
		// 		button.setButtonText("Save");
		// 		button.onClick(async (evt: MouseEvent) => {
		// 			await this.submitAction();
		// 		});
		// 	})
		// // CANCEL SETTINGS
		// 	.addButton((button: ButtonComponent) => {
		// 		button.setButtonText("Cancel");
		// 		button.onClick((evt: MouseEvent) => {
		// 			this.close();
		// 		})
		// 	});

		// // PRESSING ENTER
		// contentEl.addEventListener("keypress", async (event: KeyboardEvent) => {
		// 	if (event.key === "Enter") {
		// 		event.preventDefault();
		// 		await this.submitAction();
		// 	}
		// })
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