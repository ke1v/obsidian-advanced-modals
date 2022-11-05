<script lang="ts">
	import { ModalOutputModes, type AdvancedModalSettings } from "AdvancedModalSettings";
	import { Setting } from "obsidian";

	export let edited: AdvancedModalSettings;

</script>

<form>
	<h2>
		Edit Modal
	</h2>

	<div class="setting-item">
		<div class="setting-item-info">
			<div class="setting-item-name">
				Modal Name
			</div>
		</div>

		<div class="setting-item-control">
			<input type="text" name="modal-name" id="modal-name" bind:value={edited.name}>
		</div>
	</div>

	<div class="setting-item">
		<div class="setting-item-info">
			<div class="setting-item-name">
				Output Mode
			</div>
		</div>

		<div class="setting-item-control">
			<select name="output-mode" id="output-mode" class="dropdown">
				{#each ModalOutputModes as mode}
					<option value="{mode}">{mode}</option>
				{/each}
			</select>
		</div>
	</div>

	{new Setting()}

	{#if false}
		<div class=""></div>
	{/if}

	{#each edited.inputs as advinput}
		<div class="">
			<h4>
				{advinput}
			</h4>
		</div>
	{/each}

</form>