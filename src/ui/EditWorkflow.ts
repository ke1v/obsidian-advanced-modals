import type WorkflowsPlugin from "main";
import { App, ButtonComponent, Modal, Setting, TextComponent } from "obsidian";
import type WorkflowConfiguration from "WorkflowConfiguration";

export default class EditWorkflowMoal extends Modal {

	private plugin: WorkflowsPlugin;
	private workflow: WorkflowConfiguration;

	public constructor(app: App, workflow: WorkflowConfiguration) {
		super(app);
		this.workflow = workflow;
	}

	public onOpen(): void {
		let { contentEl } = this;
		// WORKFLOW NAME
		new Setting(contentEl)
			.addText((text: TextComponent) => {
				text.setValue(this.workflow.name);
			});

		// SAVE SETTINGS
		new Setting(contentEl)
			.addButton((button: ButtonComponent) => {
				button.setCta();
				button.setButtonText("Save");
				button.onClick((event: MouseEvent) => {
					
				});
			})
		// CANCEL SETTINGS
			.addButton((button: ButtonComponent) => {
				button.setButtonText("Cancel");
				button.onClick((event: MouseEvent) => {
					this.close();
				});
			});
	}

	public onClose(): void {
		this.contentEl.empty();
	}

}