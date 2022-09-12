import type WorkflowsPlugin from "main";
import { App, ButtonComponent, Modal, Notice, Setting, TextComponent } from "obsidian";
import type WorkflowConfiguration from "WorkflowConfiguration";

export default class EditWorkflowMoal extends Modal {

	private workflows: {
    	[key: string]: WorkflowConfiguration;
	};
	private key: string;
	private edited: WorkflowConfiguration;
	private saveSettings: () => Promise<void>;

	public constructor(
		app: App, 
		workflows: {
			[key: string]: WorkflowConfiguration;
		}, 
		key: string,
		saveSettings: () => Promise<void>,
	) {
		super(app);
		this.workflows = workflows;
		this.key = key;
		this.edited = structuredClone(workflows[key]);
		this.saveSettings = saveSettings;
	}

	public onOpen(): void {
		let { contentEl } = this;

		contentEl.createEl("h2", { text: "Edit Workflows" });

		// WORKFLOW NAME
		new Setting(contentEl)
			.setName("Workflow Name")
			.addText((text: TextComponent) => {
				text.setValue(this.edited.name);
				text.onChange((value: string) => {
					this.edited.name = value;
				});
			});
		// SAVE SETTINGS
		new Setting(contentEl)
			.addButton((button: ButtonComponent) => {
				button.setCta();
				button.setButtonText("Save");
				button.onClick(this.submitAction);
			})
		// CANCEL SETTINGS
			.addButton((button: ButtonComponent) => {
				button.setButtonText("Cancel");
				button.onClick((event: MouseEvent) => {
					this.close();
				});
			});

		// PRESSING ENTER
		contentEl.addEventListener("keypress", (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				event.preventDefault();
				this.submitAction();
			}
		})
	}

	public onClose(): void {
		this.contentEl.empty();
	}

	private async submitAction(): Promise<void> {
		// VALIDATION
		let conflict = false;
		for (const k in this.workflows) {
			if (this.workflows[k].name === this.edited.name && k !== this.key) {
				conflict = true;
				break;
			}
		}
		if (conflict) {
			new Notice("Name already in use!");
		} else {
			this.workflows[this.key] = this.edited;
	
			// Saves settings to file
			await this.saveSettings();
			this.close();
		}
		return Promise.resolve();
	}

}