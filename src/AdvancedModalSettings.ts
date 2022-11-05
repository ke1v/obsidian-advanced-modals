export const ModalOutputModes = [
	"Template File",
	"Append to File",
	"Output on Cursor",
] as const;

export type ModalOutputMode = typeof ModalOutputModes[number]

export interface AdvancedModalSettings {
	name: string;
	inputs: string[];
	outputMode: ModalOutputMode;
	file: string | null;
}