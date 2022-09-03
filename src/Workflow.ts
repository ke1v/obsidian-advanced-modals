import type { App, Modal } from "obsidian";
import PromptModal from "ui/PromptModal";
import type WorkflowConfiguration from "./WorkflowConfiguration"; 

type Script = (text: string) => Promise<string>;

export default class Workflow {

	private app: App;
	private modal: PromptModal;
	private config: WorkflowConfiguration;

	constructor(app: App, config: WorkflowConfiguration) {
		this.app = app;
		this.modal = new PromptModal(this.app, config.inputs,
		(data: FormData) => {
			data.forEach((value: FormDataEntryValue, key: string) => {
				console.log(`${key}: ${value}`);
			});
		});
		this.config = config;
	}

	public open() {
		this.modal.open();
	}

};