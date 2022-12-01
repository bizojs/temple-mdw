<script>
    import "../app.css";
    import Nav from "$lib/Components/Nav.svelte"
    import { SvelteToast } from "@zerodevx/svelte-toast"
</script>
  
<SvelteToast />
<Nav />
<slot />