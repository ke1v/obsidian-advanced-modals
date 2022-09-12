import { App, FuzzySuggestModal } from "obsidian";
import type Workflow from "Workflow";

export default class SelectWorkflowModal extends FuzzySuggestModal<Workflow> {

	private list: Workflow[];

	public constructor(app: App, list: Workflow[]) {
		super(app);
		this.list = list;
	}

	public getItems(): Workflow[] {
		return this.list;
	}

	public getItemText(item: Workflow): string {
		return item.getName();
	}

	public onChooseItem(item: Workflow, evt: MouseEvent | KeyboardEvent): void {
		item.open();
	}
}