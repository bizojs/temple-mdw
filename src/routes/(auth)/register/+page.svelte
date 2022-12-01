<svelte:head>
    <title>Create an account</title>
</svelte:head>

<script>
    import { enhance } from "$app/forms"
    import { goto } from "$app/navigation"

    const cancel = () => goto("/")

    /** @type {import('./$types').ActionData} */
    export let form
</script>

<div class="flex w-full items-center justify-center my-20">
    <div class="w-1/2 flex-col gap-6 justify-center rounded-lg p-5 bg-neutral-900 items-center">
        <h1 class="text-2xl font-semibold text-gray-200 mb-3">Create an account</h1>
        <form method="POST" action="?/register" class="flex flex-col gap-6" use:enhance>
            <div class="flex flex-col gap-2">
                <label class="text-sm text-gray-400" for="username">Username</label>
                <input
                    id="username" 
                    name="username" 
                    type="text"
                    class="p-2 rounded-lg bg-gray-200 text-black focus:bg-gray-200"
                    required
                >
            </div>
            <div class="flex flex-col gap-2">
                <label class="text-sm text-gray-400" for="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    class="p-2 rounded-lg bg-gray-200 text-black focus:bg-gray-200"
                    required
                >
            </div>
            {#if form?.user}
                <div class="flex flex-col gap-2 flex-wrap text-status-error.hover border-2 rounded-md p-3 border-dashed border-status-error">
                    <h1 class="break-all">That username is taken</h1>
                </div>
            {/if}
            <div class="flex gap-2 items-center text-gray-300">
                <button class="bg-gray-500 hover:bg-gray-400 px-3 py-2 rounded-md transition-all" type="submit">
                    Create account
                </button>
                <button on:click|preventDefault={cancel} class="border-2 border-feature px-3 py-2 rounded-md hover:bg-nav-btn transition-all">
                    Cancel
                </button>
            </div>
        </form>
    </div>
</div>