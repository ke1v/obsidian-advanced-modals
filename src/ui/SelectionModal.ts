import type AdvancedModalSettings from "AdvancedModalSettings";
import { App, FuzzySuggestModal } from "obsidian";
import { getModals } from "store/settings";
import AdvancedModal from "ui/AdvancedModal";

export default class SelectionModal extends FuzzySuggestModal<AdvancedModalSettings> {

	private list: AdvancedModalSettings[];

	public constructor(app: App) {
		super(app);
		this.list = getModals(); 
	}

	public getItems(): AdvancedModalSettings[] {
		return this.list;
	}

	public getItemText(item: AdvancedModalSettings): string {
		return item.name;
	}

	public onChooseItem(item: AdvancedModalSettings, evt: MouseEvent | KeyboardEvent): void {
		(new AdvancedModal(this.app, item)).open();
	}
}