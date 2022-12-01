<script>
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation"
    import { page } from "$app/stores"
</script>

<div class="flex justify-between bg-neutral-900 text-gray-400">
    <div class="flex flex-grow">
        <a href="/" class="flex gap-2 items-center px-5 py-4 hover:bg-neutral-800 transition-all">
            <img src="/img/MDT-128.png" alt="Logo" draggable="false" class="w-6">
            <span class="lg:block hidden">Home</span>
        </a>
        <a href="/info" class="flex gap-2 items-center px-5 py-4 hover:bg-neutral-800 transition-all">
            <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle><circle cx="128" cy="180" r="12"></circle><path d="M128,144v-8a28,28,0,1,0-28-28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
            <span class="lg:block hidden">Info</span>
        </a>
        <span class="flex gap-2 items-center px-5 py-4">
            <svg class="w-7 h-7 lg:flex hidden" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="16"></circle><polyline points="128 72 128 128 184 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline></svg>
            <span id="time">00:00:00</span>
        </span>
        <script>
            setInterval(() => {
                document.getElementById("time").innerHTML = new Date().toLocaleString().split(',')[1]
            }, 1000)
        </script>
    </div>
    {#if $page.data?.user?.admin}
        <a href="/admin" class="flex gap-2 items-center px-5 py-4 hover:bg-neutral-800 transition-all">
            <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M40,114.7V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.7c0,84-71.3,111.8-85.5,116.5a7.2,7.2,0,0,1-5,0C111.3,226.5,40,198.7,40,114.7Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><line x1="128" y1="96" x2="128" y2="136" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="90" y1="123.6" x2="128" y2="136" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="104.5" y1="168.4" x2="128" y2="136" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="151.5" y1="168.4" x2="128" y2="136" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="166" y1="123.6" x2="128" y2="136" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
            <span class="lg:block hidden">Admin</span>
        </a>
    {/if}
    {#if $page.data?.user?.username}
        <form
            action="/logout"
            method="POST"
            class="flex"
            use:enhance={() => {
                return async({ result }) => {
                    invalidateAll()
                    await applyAction(result)
                }
            }}
        >
            <button type="submit" class="flex gap-2 items-center px-5 py-4 bg-red-500 hover:bg-red-600 transition-all text-white">
                <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="174 86 216 128 174 170" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><line x1="104" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M104,216H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
                <span class="lg:block hidden">Logout</span>
            </button>
        </form>
    {/if}
</div>