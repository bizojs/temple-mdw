<script>
    import Modal from "$lib/Components/Modal.svelte"
    import { page } from "$app/stores"
    
    let callsignModalOpened = false
    let civModalOpened = false
    const toggleCallsignModal = () => callsignModalOpened = !callsignModalOpened
    const toggleCivModal = () => civModalOpened = !civModalOpened
</script>

<div class="flex flex-col items-center gap-3 mt-20 mx-2 text-center">
    <h1 class="text-gray-300 text-5xl font-semibold">Temple MDT</h1>
    <h2 class="text-gray-400 text-xl">
        A simple mobile data terminal web app that you can selfhost for your wonderful roleplay community.
    </h2>
</div>

{#if !$page.data?.user}
    <div class="flex my-10 justify-center gap-3 text-2xl text-gray-200">
        <a href="/register" class="rounded bg-gray-500 hover:bg-gray-400 transition-all px-5 py-2 flex gap-2 items-center">
            <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M50.7,184.9A127.4,127.4,0,0,0,64,128,64.2,64.2,0,0,1,88,78" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M128,128a191.2,191.2,0,0,1-24,93" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M96,128a32,32,0,0,1,64,0,222.3,222.3,0,0,1-21.3,95.4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M218.6,184a294.6,294.6,0,0,0,5.4-56,96,96,0,0,0-192,0,94.4,94.4,0,0,1-5.5,32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M92.8,160a161.9,161.9,0,0,1-18.1,47.9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M120,64.5a70.1,70.1,0,0,1,8-.5,64,64,0,0,1,64,64,260.6,260.6,0,0,1-2,32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M183.9,192c-1.5,5.9-3.2,11.8-5.1,17.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
            <span>Register</span>
        </a>
        <a href="/login" class="rounded bg-gray-500 hover:bg-gray-400 transition-all px-5 py-2 flex gap-2 items-center">
            <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="94 170 136 128 94 86" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><line x1="24" y1="128" x2="136" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M136,40h56a8,8,0,0,1,8,8V208a8,8,0,0,1-8,8H136" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
            <span>Login</span>
        </a>
    </div>
{:else}
    <div class="flex flex-col items-center gap-3 mt-20 mx-2 text-center">
        <h2 class="text-gray-300 text-3xl">
            What do you want to do today?
        </h2>
    </div>
    <div class="flex my-5 justify-center flex-wrap gap-3 text-2xl text-gray-200">
        <button on:click={toggleCallsignModal} class="rounded bg-gray-500 hover:bg-gray-400 transition-all px-5 py-2 flex gap-2 items-center">
            <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="16" y1="120" x2="240" y2="120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M224,184v24a8,8,0,0,1-8,8H192a8,8,0,0,1-8-8V184" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M72,184v24a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V184" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><line x1="64" y1="152" x2="80" y2="152" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="176" y1="152" x2="192" y2="152" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M224,120,194.3,68a7.9,7.9,0,0,0-6.9-4H68.6a7.9,7.9,0,0,0-6.9,4L32,120v64H224Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><line x1="104" y1="32" x2="152" y2="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
            <span>Law Enforcement</span>
        </button>
        <button on:click={toggleCivModal} class="rounded bg-gray-500 hover:bg-gray-400 transition-all px-5 py-2 flex gap-2 items-center">
            <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="96" r="64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="16"></circle><path d="M31,216a112,112,0,0,1,194,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
            <span>Civilian</span>
        </button>
    </div>
{/if}

<Modal title="Enter your callsign" use={toggleCallsignModal} visibility={callsignModalOpened}>
    <form class="flex flex-col gap-4" action="?/startShift" method="post">
        <input
            id="callsign" 
            name="callsign" 
            type="text"
            class="p-2 rounded-lg bg-gray-200 text-black focus:bg-gray-200 w-full bg-opacity-10"
            required
        >
        <input type="hidden" name="username" id="username" value={$page.data?.user?.username}>
        <button type="submit" class="text-gray-200 bg-gray-500 hover:bg-gray-400 px-3 py-2 rounded-md transition-all">
            Start shift
        </button>
    </form>
</Modal>

<Modal title="Characters" use={toggleCivModal} visibility={civModalOpened}>
    <div class="flex flex-col gap-2 mt-2">
        {#if $page.data?.user?.characters}
            {#each $page.data?.user?.characters as character}
                <a href="/civ/{character.id}" class="flex justify-between items-center cursor-pointer text-gray-200 p-2 rounded-lg bg-gray-200 hover:bg-opacity-20 transition-all w-full bg-opacity-10">
                    <span>{character.name}</span>
                    <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="96 48 176 128 96 208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline></svg>
                </a>
            {/each}
        {:else}
            <span class="text-gray-500">You have no characters</span>
        {/if}
        <input type="hidden" name="username" id="username" value={$page.data?.user?.username}>
        <a href="/civ/create" class="flex justify-center text-gray-200 bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-md transition-all">
            Create new character
        </a>
    </div>
</Modal>