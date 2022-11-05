import { AppendToFile } from "helpers/FileHelpers";
import { App, Modal } from "obsidian";
import type { AdvancedModalSettings } from "../AdvancedModalSettings"; 
import Form from "./component/Form.svelte";

type Script = (text: string) => Promise<string>;

export default class AdvancedModal extends Modal {

	private config: AdvancedModalSettings;
	private onSubmit: (data: FormData) => string;

	constructor(app: App, config: AdvancedModalSettings) {
		super(app);
		this.app = app;
		this.config = config;
		
		this.onSubmit = (data: FormData): string => {
			if (this.config.file !== null) {
				
				data.forEach(v => AppendToFile(this.app.vault, "supnote.md", v.toString(), false));
			}
			this.close();
			return "";
		};

	}
	
	public getName(): string {
		return this.config.name;
	}
	
	public onOpen(): void {
		let { contentEl } = this;
		const form = new Form({
			target: contentEl,
			props: {
				processData: this.onSubmit,
				identifiers: this.config.inputs,
			}
		});
	};	

	public onClose(): void {
		let { contentEl } = this;
		contentEl.empty();
	}

};