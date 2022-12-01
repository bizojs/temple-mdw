<script>
    import { page } from "$app/stores"
</script>

<div class="flex flex-col items-center gap-3 mt-20 mx-2 text-center">
    <h1 class="text-gray-300 text-5xl font-semibold">{$page.status}</h1>
    <h2 class="text-gray-400 text-xl">{$page.error.message}</h2>
</div>
