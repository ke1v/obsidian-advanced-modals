import { App, Editor, FuzzySuggestModal, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import AdvancedModalSettingsTab from './ui/settings/SettingsTab';
import AdvancedModal from 'ui/AdvancedModal';
import type AdvancedModalSettings from 'AdvancedModalSettings';
import SelectionModal from 'ui/SelectionModal';
import { initSettingsStore, loadSettings } from 'store/settings';

export default class AdvancedModalsPlugin extends Plugin {

	public async onload() {
		// Init. vars
		initSettingsStore(this.saveData.bind(this), this.loadData.bind(this));
		await loadSettings();

		this.addCommand({
			id: 'open-advanced-modals-menu',
			name: 'Open Modal Menu',
			callback: () => {
				(new SelectionModal(this.app)).open();
			}
		});
		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new AdvancedModalSettingsTab(this.app, this));
	}

	public async onunload() {
	}

}
