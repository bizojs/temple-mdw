<svelte:head>
    <title>{$page.data?.character?.name}</title>
</svelte:head>

<script>
    import { enhance, applyAction } from "$app/forms"
    import { invalidateAll } from "$app/navigation"
    import Modal from "$lib/Components/Modal.svelte"
    import { toDateInputValue } from "$lib/util"
    import { page } from "$app/stores"
    import { error, success } from "$lib/notifications"

    let selected
    let civModalOpened = false
    let vehicleModalOpened = false
    let editVehicleModalOpened = false
    let editCivModalOpened = false
    const toggleCivModal = () => civModalOpened = !civModalOpened
    const toggleVehicleModal = () => vehicleModalOpened = !vehicleModalOpened
    const toggleEditVehicleModal = () => editVehicleModalOpened = !editVehicleModalOpened
    const toggleEditCivModal = () => editCivModalOpened = !editCivModalOpened
</script>

<div class="my-20 mx-2 text-center">
    <h1 class="text-gray-300 text-5xl font-semibold">{$page.data?.character?.name}</h1>
</div>

<div class="flex lg:flex-row flex-col flex-wrap gap-10 lg:m-20 m-5">
    <div class="flex flex-col gap-5 bg-neutral-800 rounded text-gray-300 p-3 lg:w-[45%] w-full">
        <span class="font-semibold">Registered Vehicles</span>
        {#if $page.data?.character?.vehicles?.length > 0}
            <div class="flex flex-col gap-2">
                {#each $page.data?.character?.vehicles as vehicle}
                    <div class="flex justify-between p-2 bg-neutral-900 rounded items-center">
                        <div class="flex gap-3 items-center">
                            <span class="text-gray-500 w-[80px]" title="Vehicle plate">{vehicle.plate}</span>
                            <span>{vehicle.make} {vehicle.model}</span>
                        </div>
                        <div class="flex gap-2">
                            {#if vehicle.stolen}
                                <span title="This vehicle is marked as stolen" class="bg-orange-400 px-2 rounded text-sm flex items-center text-gray-100">
                                    <span class="flex">
                                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="128" y1="80" x2="128" y2="136" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M164.5,32h-73a7.9,7.9,0,0,0-5.6,2.3L34.3,85.9A7.9,7.9,0,0,0,32,91.5v73a7.9,7.9,0,0,0,2.3,5.6l51.6,51.6a7.9,7.9,0,0,0,5.6,2.3h73a7.9,7.9,0,0,0,5.6-2.3l51.6-51.6a7.9,7.9,0,0,0,2.3-5.6v-73a7.9,7.9,0,0,0-2.3-5.6L170.1,34.3A7.9,7.9,0,0,0,164.5,32Z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="16"></path><circle cx="128" cy="172" r="12"></circle></svg>
                                    </span>
                                </span>
                            {/if}
                            <button on:click={() => { toggleEditVehicleModal(); selected = vehicle}} title="Edit this vehicle" class="bg-neutral-700 hover:bg-neutral-600 transition-all px-2 py-1 rounded text-sm">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M96,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><line x1="216" y1="216" x2="96" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="136" y1="64" x2="192" y2="120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
                            </button>
                            <form action="?/deleteVehicle"
                                use:enhance={() => {
                                    return async ({ result }) => {
                                        invalidateAll()
                                        if (result.status === 200) {
                                            return success({ msg: result.data.message })
                                        }
                                        if (result.status === 400) {
                                            return error({ msg: result.data.message })
                                        }
                                        await applyAction(result)
                                    }
                                }}>
                                <input type="hidden" name="vehicleId" value={vehicle.id}>
                                <input type="hidden" name="id" value={$page.data?.character?.id}>
                                <button title="Delete this vehicle" class="bg-red-500 px-2 py-1.5 rounded text-sm">
                                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="216" y1="56" x2="40" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="104" y1="104" x2="104" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="152" y1="104" x2="152" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
                                </button>
                            </form>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <span class="text-gray-400">No vehicles found.</span>
        {/if}
        <button on:click={toggleVehicleModal} class="px-2 py-2 rounded bg-blue-600">Register new vehicle</button>
    </div>

    <div class="flex flex-col gap-5 bg-neutral-800 rounded text-gray-300 p-3 lg:w-[45%] w-full">
        <span class="font-semibold">Manage Character</span>
        <div class="flex flex-col gap-2">
            <button on:click={toggleCivModal} class="flex gap-2 items-center px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 transition-all text-gray-100">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="176.2 99.7 224.2 99.7 224.2 51.7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><path d="M65.8,65.8a87.9,87.9,0,0,1,124.4,0l34,33.9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><polyline points="79.8 156.3 31.8 156.3 31.8 204.3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><path d="M190.2,190.2a87.9,87.9,0,0,1-124.4,0l-34-33.9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
                <span>Switch character</span>
            </button>
            <button on:click={toggleEditCivModal} class="flex gap-2 items-center px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 transition-all text-gray-100">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M96,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><line x1="216" y1="216" x2="96" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="136" y1="64" x2="192" y2="120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
                <span>Edit character</span>
            </button>
            <form action="?/deleteCharacter" method="post">
                <input type="hidden" name="id" value={$page.data?.character?.id}>
                <button type="submit" class="flex gap-2 items-center px-4 py-2 rounded bg-red-500 w-full text-gray-100">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="216" y1="56" x2="40" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="104" y1="104" x2="104" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="152" y1="104" x2="152" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
                    <span>Delete character</span>
                </button>
            </form>
        </div>
    </div>

    <div class="flex flex-col gap-5 bg-neutral-800 rounded text-gray-300 p-3 lg:w-[45%] w-full">
        <span class="font-semibold">Licenses</span>
        <span class="text-gray-400">Coming soon...</span>
    </div>

</div>

<Modal title="Edit registered vehicle" use={toggleEditVehicleModal} visibility={editVehicleModalOpened}>
    <form method="POST" action="?/editVehicle" class="flex flex-col gap-6"
        use:enhance={() => {
            return async ({ result }) => {
                invalidateAll()
                if (result.status === 200) {
                    toggleEditVehicleModal()
                    return success({ msg: result.data.message })
                }
                if (result.status === 400) {
                    return error({ msg: result.data.message })
                }
                await applyAction(result)
            }
        }}>
        <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-400" for="make">Make</label>
            <input
                id="make" 
                name="make" 
                type="text"
                class="p-2 rounded-lg bg-neutral-900 text-gray-100"
                autocomplete="off"
                placeholder="Karin"
                value={selected.make}
                required
            >
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-400" for="model">Model</label>
            <input
                id="model" 
                name="model" 
                type="text"
                class="p-2 rounded-lg bg-neutral-900 text-gray-100"
                autocomplete="off"
                placeholder="Futo"
                value={selected.model}
                required
            >
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-400" for="plate">Plate</label>
            <input
                id="plate"
                name="plate"
                type="text"
                class="p-2 rounded-lg bg-neutral-900 text-gray-100"
                autocomplete="off"
                value={selected.plate}
                required
            >
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-400" for="stolen">Stolen</label>
            <!-- {#if selected.stolen}
                <input id="stolen" name="stolen" type="checkbox" class="w-8 h-8" autocomplete="off" value={selected.stolen} checked>
            {:else}
                <input id="stolen" name="stolen" type="checkbox" class="w-8 h-8" autocomplete="off" value={selected.stolen}>
            {/if} -->
            <input type="hidden" name="currentStolen" value={selected.stolen}>
            {#if selected.stolen}
                <div class="flex justify-between items-center gap-2">
                    <span class="text-gray-500">
                        This vehicle is marked as stolen. Check this box to keep it marked as STOLEN.
                    </span>
                    <input id="stolen" name="stolen" type="checkbox" class="w-8 h-8" autocomplete="off" value={true}>
                </div>
            {:else}
                <div class="flex justify-between items-center gap-2">
                    <span class="text-gray-500">
                        This vehicle is not marked as stolen. Check this box to mark it as STOLEN.
                    </span>
                    <input id="stolen" name="stolen" type="checkbox" class="w-8 h-8" autocomplete="off" value={true}>
                </div>
            {/if}
        </div>
        <input type="hidden" name="username" value={$page.data?.user?.username}>
        <input type="hidden" name="id" value={selected.id}>
        <div class="flex gap-2 items-center text-gray-300">
            <button class="bg-gray-500 hover:bg-gray-400 px-3 py-2 rounded-md transition-all" type="submit">
                Save changes
            </button>
        </div>
    </form>
</Modal>

<Modal title="Edit your character" use={toggleEditCivModal} visibility={editCivModalOpened}>
    <form method="POST" action="?/editCharacter" class="flex flex-col gap-6"
        use:enhance={() => {
            return async ({ result }) => {
                invalidateAll()
                if (result.status === 200) {
                    toggleEditCivModal()
                    return success({ msg: result.data.message })
                }
                if (result.status === 400) {
                    return error({ msg: result.data.message })
                }
                await applyAction(result)
            }
        }}>
        <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-400" for="fullname">Full name</label>
            <input
                id="fullname" 
                name="fullname" 
                type="text"
                class="p-2 rounded-lg bg-neutral-900 text-gray-100"
                autocomplete="off"
                placeholder={$page.data?.character?.name}
                value={$page.data?.character?.name}
                required
            >
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-400" for="ethnicity">Ethnicity</label>
            <input
                id="ethnicity" 
                name="ethnicity" 
                type="text"
                class="p-2 rounded-lg bg-neutral-900 text-gray-100"
                autocomplete="off"
                placeholder={$page.data?.character?.ethnicity}
                value={$page.data?.character?.ethnicity}
                required
            >
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-400" for="dob">Date of birth</label>
            <input
                id="dob"
                name="dob"
                type="date"
                class="p-2 rounded-lg bg-neutral-900 text-gray-100"
                autocomplete="off"
                value={toDateInputValue(new Date($page.data?.character?.dob))}
                required
            >
        </div>
        <input type="hidden" name="username" value={$page.data?.user?.username}>
        <input type="hidden" name="character" value={$page.data?.character?.id}>
        <div class="flex gap-2 items-center text-gray-300">
            <button class="bg-gray-500 hover:bg-gray-400 px-3 py-2 rounded-md transition-all" type="submit">
                Update character
            </button>
        </div>
    </form>
</Modal>

<Modal title="Register vehicle" use={toggleVehicleModal} visibility={vehicleModalOpened}>
    <form method="POST" action="?/registerVehicle" class="flex flex-col gap-6"
        use:enhance={() => {
            return async ({ result }) => {
                invalidateAll()
                if (result.status === 200) {
                    toggleVehicleModal()
                    return success({ msg: result.data.message })
                }
                if (result.status === 400) {
                    return error({ msg: result.data.message })
                }
                await applyAction(result)
            }
        }}>
        <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-400" for="make">Make</label>
            <input
                id="make" 
                name="make" 
                type="text"
                class="p-2 rounded-lg bg-neutral-900 text-gray-100"
                autocomplete="off"
                placeholder="Karin"
                required
            >
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-400" for="model">Model</label>
            <input
                id="model" 
                name="model" 
                type="text"
                class="p-2 rounded-lg bg-neutral-900 text-gray-100"
                autocomplete="off"
                placeholder="Futo"
                required
            >
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-400" for="plate">Plate</label>
            <input
                id="plate"
                name="plate"
                type="text"
                class="p-2 rounded-lg bg-neutral-900 text-gray-100"
                autocomplete="off"
                required
            >
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-400" for="stolen">Stolen</label>
            <input
                id="stolen"
                name="stolen"
                type="checkbox"
                class="w-8 h-8"
                autocomplete="off"
            >
        </div>
        <input type="hidden" name="username" value={$page.data?.user?.username}>
        <input type="hidden" name="character" value={$page.data?.character?.id}>
        <div class="flex gap-2 items-center text-gray-300">
            <button class="bg-gray-500 hover:bg-gray-400 px-3 py-2 rounded-md transition-all" type="submit">
                Register vehicle
            </button>
        </div>
    </form>
</Modal>

<Modal title="Characters" use={toggleCivModal} visibility={civModalOpened}>
    <div class="flex flex-col gap-2 mt-2">
        {#if $page.data?.user?.characters}
            {#each $page.data?.user?.characters as character}
                <a on:click={toggleCivModal} href="/civ/{character.id}" class="flex justify-between items-center cursor-pointer text-gray-200 p-2 rounded-lg bg-gray-200 hover:bg-opacity-20 transition-all w-full bg-opacity-10">
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