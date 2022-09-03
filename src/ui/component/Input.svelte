<script lang="ts">

    export let identifier: string = "default-id";

    export let defaultValue: string = "";
    export let placeholder: string = "";

</script>

<input type="text" name={identifier} id={identifier} {placeholder} value={defaultValue}>