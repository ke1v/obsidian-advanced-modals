import type WorkflowsPlugin from "../main";
import { App, ButtonComponent, Component, ExtraButtonComponent, PluginSettingTab, Setting, TextComponent, ToggleComponent } from "obsidian";
import Workflow from "Workflow";
import type WorkflowConfiguration from "WorkflowConfiguration";
import type { WorkflowsSettings } from "../main";
import EditWorkflowMoal from "./EditWorkflow";



export default class WorkflowsSettingsTab extends PluginSettingTab {
	private plugin: WorkflowsPlugin;
	private settings: WorkflowsSettings;

	constructor(app: App, plugin: WorkflowsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
		this.settings = plugin.getSettings();
	}

	public display(): void {
		// Gets and clears HTML Element
		const { containerEl } = this;
		containerEl.empty();

		this.containerEl.createEl("h2", { text: "Saved Workflows" });

		new Setting(containerEl)
			.setDesc(`
				This is where the desc is;
			`);

		for (const key in this.settings.workflows) {
			new Setting(containerEl)
				.setName(this.settings.workflows[key].name)
				.setTooltip("Click to edit")
				.addToggle((toggle: ToggleComponent) => {
					// TOGGLE ON-OFF
					toggle.setDisabled(true);
				})
				.addExtraButton((button: ExtraButtonComponent) => {
					// DELETE WORKFLOW
					button.setIcon("cross");
					button.onClick(async () => {
						delete this.settings.workflows[key];
						await this.plugin.saveSettings();
						this.display();
					});
				})
				.infoEl.addEventListener("click", (event: MouseEvent) => {
					// EDIT WORKFLOW
					new EditWorkflowMoal(this.app, this.settings.workflows[key])
						.open();
				});
		}

		// ADD WORKFLOW
		new Setting(containerEl)
			.addButton((button: ButtonComponent) => {
				button.setButtonText("Add New Workflow");
				button.setCta();
				button.onClick(async (event: MouseEvent) => {
					// CREATE NEW WORKFLOW
					for (let i = 1; i < Number.MAX_SAFE_INTEGER; i++) {
						// If you exceed the max safe int, I don't even know at that point
						// Find next available name
						if (this.settings.workflows.hasOwnProperty(`new-workflow-${i}`)) continue;

						this.plugin.getSettings().workflows[`new-workflow-${i}`] = {
							name: `new-workflow-${i}`,
							script: "None",
							inputs: ["first-input", "second-input"],
						};

						break;
					}

					await this.plugin.saveSettings();
					this.display();
				});
			})

	}

}