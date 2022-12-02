<script>
    import Confirm from "$lib/Components/Confirm.svelte"
    import { error, success } from "$lib/notifications"
    import { tooltip } from "@svelte-plugins/tooltips"
    import { enhance, applyAction } from "$app/forms"
    import Modal from "$lib/Components/Modal.svelte"
    import { invalidateAll } from "$app/navigation"
    import { page } from "$app/stores"

    const tooltipOptions = {
        animation: "slide",
        align: "center",
        theme: "tooltip-theme",
        autoPosition: true,
        position: "top"
    }
    let editAccountModalOpened = false
    let confirmVisible = false
    const toggleEditAccount = () => editAccountModalOpened = !editAccountModalOpened
    const toggleConfirm = () => confirmVisible = !confirmVisible
</script>

<div class="my-20 mx-2 text-center">
    <h1 class="text-gray-300 text-5xl font-semibold">{$page.data?.user?.username}</h1>
</div>

<div class="flex flex-col flex-wrap gap-10 lg:m-20 m-5 items-center">
    <div class="flex flex-col gap-5 bg-neutral-800 rounded text-gray-300 p-3 lg:w-[45%] w-full">
        <span class="font-semibold">Your account</span>
        <div class="flex flex-col gap-2">
            <button on:click={toggleEditAccount} class="flex gap-4 items-center px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 transition-all text-gray-100">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M96,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><line x1="216" y1="216" x2="96" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="136" y1="64" x2="192" y2="120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
                <span>Edit account</span>
            </button>
            <button on:click={toggleConfirm} class="flex gap-4 items-center px-4 py-2 rounded bg-red-500 text-gray-100">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="216" y1="56" x2="40" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="104" y1="104" x2="104" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="152" y1="104" x2="152" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
                <span>Delete account</span>
            </button>
        </div>
    </div>
    <div class="flex flex-col gap-5 bg-neutral-800 rounded text-gray-300 p-3 lg:w-[45%] w-full">
        <span class="font-semibold">Your characters</span>
        {#if $page.data?.user?.characters?.length > 0}
            <div class="flex flex-col gap-2">
                {#each $page.data?.user?.characters as character}
                    <div class="flex justify-between p-2 bg-neutral-900 rounded items-center">
                        <div class="flex items-center">
                            <span class="text-gray-500 w-[100px]" title={"This character is " + character?.age + " years old"} use:tooltip={tooltipOptions}>{new Date(character.dob).toLocaleDateString()}</span>
                            <span>{character.name}</span>
                        </div>
                        <div class="flex gap-2">
                            <a href={"/civ/" + character.id} title="Manage this character" use:tooltip={tooltipOptions}  class="bg-neutral-700 hover:bg-neutral-600 transition-all px-2 py-1 rounded text-sm text-white flex items-center gap-2">
                                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M218.9,71a63.9,63.9,0,0,1-89.8,81h0L73,217a24,24,0,0,1-34-34l65-56.1h0a63.9,63.9,0,0,1,81-89.8L143,79l5.7,28.3L177,113Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
                                <span class="lg:block hidden">Manage</span>
                            </a>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <span class="text-gray-400">No characters found.</span>
        {/if}
        <a href="/civ/create" class="px-2 py-2 rounded bg-blue-600 text-gray-100 text-center">
            Create new character
        </a>
    </div>
</div>

<Modal title="Edit your account" use={toggleEditAccount} visibility={editAccountModalOpened}>
    <form method="POST" action="?/editUsername" class="flex flex-col gap-1 mb-5"
        use:enhance={() => {
            return async ({ result }) => {
                invalidateAll()
                if (result.status === 200) {
                    toggleEditAccount()
                    return success({ msg: result.data.message })
                }
                if (result.status === 400) {
                    return error({ msg: result.data.message })
                }
                await applyAction(result)
            }
        }}>
        <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-400" for="username">Username</label>
            <input
                id="username" 
                name="username" 
                type="text"
                class="p-2 rounded-lg bg-neutral-900 text-gray-100"
                autocomplete="off"
                placeholder={$page.data?.user?.username}
                value={$page.data?.user?.username}
                required
            >
        </div>
        <div class="flex gap-2 items-center text-gray-300 mt-3">
            <button class="bg-gray-500 hover:bg-gray-400 px-3 py-2 rounded-md transition-all" type="submit">
                Update username
            </button>
        </div>
    </form>
    <form method="POST" action="?/editPassword" class="flex flex-col gap-2"
        use:enhance={() => {
            return async ({ result }) => {
                invalidateAll()
                if (result.status === 200) {
                    toggleEditAccount()
                    return success({ msg: result.data.message })
                }
                if (result.status === 400) {
                    return error({ msg: result.data.message })
                }
                await applyAction(result)
            }
        }}>
        <div class="flex items-center lg:gap-4 gap-2 flex-wrap">
            <div class="flex flex-col gap-2 flex-grow">
                <label class="text-sm text-gray-400" for="old-password">Old password</label>
                <input
                    id="old-password" 
                    name="old-password" 
                    type="password"
                    class="p-2 rounded-lg bg-neutral-900 text-gray-100"
                    autocomplete="off"
                    required
                >
            </div>
            <div class="flex flex-col gap-2 flex-grow">
                <label class="text-sm text-gray-400" for="confirm-old-password">Confirm old password</label>
                <input
                    id="confirm-old-password" 
                    name="confirm-old-password" 
                    type="password"
                    class="p-2 rounded-lg bg-neutral-900 text-gray-100"
                    autocomplete="off"
                    required
                >
            </div>
        </div>
        <div class="flex flex-col gap-1">
            <label class="text-sm text-gray-400" for="new-password">New password</label>
            <input
                id="new-password" 
                name="new-password" 
                type="password"
                class="p-2 rounded-lg bg-neutral-900 text-gray-100"
                autocomplete="off"
                required
            >
        </div>
        <input type="hidden" name="currentUsername" value={$page.data?.user?.username}>
        <input type="hidden" name="character" value={$page.data?.character?.id}>
        <div class="flex gap-2 items-center text-gray-300 mt-3">
            <button class="bg-gray-500 hover:bg-gray-400 px-3 py-2 rounded-md transition-all" type="submit">
                Update password
            </button>
        </div>
    </form>
</Modal>

<Confirm use={toggleConfirm} visibility={confirmVisible}>
    <div class="flex gap-2 justify-end">
        <form
            class="w-full"
            action="?/deleteAccount"
            method="POST"
            use:enhance={() => {
                return async({ result }) => {
                    invalidateAll()
                    if (result.status === 200) {
                        return success({ msg: result.data.message })
                    }
                    if (result.status === 400) {
                        return error({ msg: result.data.message })
                    }
                    await applyAction(result)
                }
            }}
        >
            <input id="username" type="hidden" name="username" value={$page.data?.user?.username}>
            <div class="flex gap-4 justify-center">
                <button on:click|preventDefault={toggleConfirm} class="text-gray-100 transition-all border-2 border-gray-300 bg-status-default hover:bg-status-default.hover px-4 rounded text-lg">
                    <span class="font-semibold">Cancel</span>
                </button>
                <button type="submit" class="text-gray-100 transition-all bg-red-500 px-6 py-2 rounded text-lg">
                    <span class="font-semibold">Delete account</span>
                </button>
            </div>
        </form>
    </div>
</Confirm>