<script lang="ts">
    export let color : string;
    export let href : string = "#";
</script>

<a href="{href}">
    <span class="tag my-3 mx-1 {color}"><slot></slot></span>
</a>
