<script lang="ts">

    export let identifier: string = "default-id";

    export let defaultValue: string = "";
    export let placeholder: string = "";

    export let label: string = "";

</script>
<div>
    {#if label !== ""}
        <label for={identifier}>{label}</label>
    {/if}
    <input type="text" name={identifier} id={identifier} {placeholder} value={defaultValue}>
</div>