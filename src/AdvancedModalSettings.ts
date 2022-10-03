import type AdvancedModal from "ui/AdvancedModal";

export default interface AdvancedModalSettings {
	name: string;
	inputs: string[];
	next: AdvancedModal | (() => string) | null;
	file: string | null;
}