<script lang="ts">
    export let color : string;
    export let href : string = "#";
</script>

<a on:click href="{href}">
    <span class="tag my-3 mx-1 {color}"><slot></slot></span>
</a>
