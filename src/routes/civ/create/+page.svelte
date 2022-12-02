<svelte:head>
    <title>Create a new civilian</title>
</svelte:head>

<script>
    import { enhance } from "$app/forms"
    import { goto } from "$app/navigation"
    import { page } from "$app/stores"

    const cancel = () => goto("/")

</script>

<div class="flex w-full items-center justify-center my-20">
    <div class="w-1/2 flex-col gap-6 justify-center rounded-lg p-5 bg-neutral-700 items-center">
        <h1 class="text-2xl font-semibold text-gray-200 mb-3">Create a new character</h1>
        <form method="POST" action="?/createCharacter" class="flex flex-col gap-6" use:enhance>
            <div class="flex flex-col gap-2">
                <label class="text-sm text-gray-400" for="fullname">Full name</label>
                <input
                    id="fullname" 
                    name="fullname" 
                    type="text"
                    class="p-2 rounded-lg bg-neutral-600 text-white focus:bg-neutral-600"
                    autocomplete="off"
                    required
                >
            </div>
            <div class="flex flex-col gap-2">
                <label class="text-sm text-gray-400" for="ethnicity">Ethnicity</label>
                <input
                    id="ethnicity" 
                    name="ethnicity" 
                    type="text"
                    class="p-2 rounded-lg bg-neutral-600 text-white focus:bg-neutral-600"
                    autocomplete="off"
                    required
                >
            </div>
            <div class="flex flex-col gap-2">
                <label class="text-sm text-gray-400" for="dob">Date of birth</label>
                <input
                    id="dob"
                    name="dob"
                    type="date"
                    class="p-2 rounded-lg bg-neutral-600 text-white focus:bg-neutral-600"
                    required
                >
            </div>
            <input type="hidden" name="username" value={$page.data?.user?.username}>
            <div class="flex gap-2 items-center text-gray-300">
                <button class="bg-blue-500 text-gray-100 px-3 py-2 rounded-md" type="submit">
                    Create character
                </button>
                <button on:click|preventDefault={cancel} class="border-2 border-gray-300 px-3 py-2 rounded-md hover:bg-nav-btn transition-all text-gray-100 hover:bg-neutral-600">
                    Cancel
                </button>
            </div>
        </form>
    </div>
</div>