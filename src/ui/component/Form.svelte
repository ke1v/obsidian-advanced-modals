<script lang="ts">

	import Input from "./Input.svelte";

	export let processData: (data: FormData) => void; 
	export let identifiers: string[];

	function submitForm(event: SubmitEvent): void {
		const data = new FormData(event.target as HTMLFormElement);
		processData(data);
	}

</script>

<form on:submit|preventDefault={submitForm}>
	{#each identifiers as id}
		<div class="">
			<Input identifier={id} />
		</div>
	{/each}
	<button class="mod-cta">Submit</button>
</form>