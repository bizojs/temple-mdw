<svelte:head>
    <title>Login to your account</title>
</svelte:head>

<script>
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation"
    import { error } from "$lib/notifications"
    import { goto } from "$app/navigation"

    const cancel = () => goto("/")
</script>

<div class="flex w-full items-center justify-center my-20">
    <div class="w-1/2 flex-col gap-6 justify-center rounded-lg p-5 bg-neutral-900 items-center">
        <h1 class="text-2xl font-semibold text-gray-200 mb-3">Login to your account</h1>
        <form
            method="POST"
            action="?/login"
            class="flex flex-col gap-6"
            use:enhance={() => {
                return async ({ result }) => {
                    invalidateAll()
                    if (result.data?.invalid) {
                        return error({ msg: "Username and password is required" })
                    }
                    if (result.data?.credentials) {
                        return error({ msg: "Username or password is invalid" })
                    }
                    await applyAction(result)
                }
            }}
        >
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
            <div class="flex gap-2 items-center text-gray-300">
                <button class="bg-gray-500 hover:bg-gray-400 px-3 py-2 rounded-md transition-all" type="submit">
                    Login
                </button>
                <button on:click|preventDefault={cancel} class="border-2 border-feature px-3 py-2 rounded-md hover:bg-nav-btn transition-all">
                    Cancel
                </button>
            </div>
        </form>
    </div>
</div>