import { App, Modal, Setting } from "obsidian";
import Form from "./component/Form.svelte";

export default class PromptModal extends Modal {

	private inputs: string[]
	private processData: (data: FormData) => void;

	public constructor(app: App, inputs: string[], onsubmit: (data: FormData) => void) {
		super(app);
		this.inputs = inputs;
		this.processData = onsubmit;
	}

	public onOpen(): void {
		let { contentEl } = this;
		const form = new Form({
			target: contentEl,
			props: {
				processData: this.processData,
				identifiers: this.inputs,
			}
		});
	};

	public onClose(): void {
		let { contentEl } = this;
		contentEl.empty();
	}

}