import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import WorkflowsSettingsTab from './ui/SettingsTab';
import PromptModal from 'ui/PromptModal';
import Workflow from 'Workflow';
import type WorkflowConfiguration from 'WorkflowConfiguration';

export interface WorkflowsSettings {
	workflows: {
		[key: string]: WorkflowConfiguration;
	};
}

const DEFAULT_SETTINGS: Partial<WorkflowsSettings> = {
	workflows: {},
}

export default class WorkflowsPlugin extends Plugin {

	private settings: WorkflowsSettings;

	public async onload() {
		await this.loadSettings();
		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'WF: Open test modal',
			callback: () => {
				new Workflow(this.app, {
					name: "test",
					script: "N/A",
					inputs: ["first-one", "second-one"],
				})
				.open();
			}
		});
		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new WorkflowsSettingsTab(this.app, this));
	}

	public getSettings(): WorkflowsSettings {
		return this.settings;
	}

	public async loadSettings() {
		this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData());
	}

	public async saveSettings() {
		await this.saveData(this.settings);
	}

	public async onunload() {
	}

}
