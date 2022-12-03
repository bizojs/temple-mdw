<script>
    import { tooltip } from "@svelte-plugins/tooltips"
    import Modal from "$lib/Components/Modal.svelte"
    import { success } from "$lib/notifications"
    import { enhance } from "$app/forms"
    import { page } from "$app/stores"
    import { onMount } from "svelte"
    import { copy } from "$lib/util"

    function openNotepad() {
        let modal = document.getElementById("md-notepad")
        let close = document.getElementById("close")
        modal.style.display = "block"
        close.onclick = function() {
            modal.style.display = "none"
        }
    }

    const tooltipOptions = {
        animation: "slide",
        align: "center",
        theme: "tooltip-theme",
        autoPosition: true,
        position: "top"
    }

    onMount(() => {
        Element.prototype.drag = function() {
            let mousemove = function(e) {
                this.style.left = e.clientX + "px"
                this.style.top = e.clientY + "px"
                this.style.left = ( e.clientX - this.dragStartX ) + "px"
                this.style.top  = ( e.clientY - this.dragStartY ) + "px"
            }.bind(this)
            let mouseup = function(e) { // document mouseup
                document.removeEventListener("mousemove", mousemove)
                document.removeEventListener("mouseup", mouseup)
            }.bind(this)
            const handle = document.getElementById("handle")
            handle.addEventListener("mousedown", function(e) { // element mousedown
                this.dragStartX = e.offsetX
                this.dragStartY = e.offsetY
                document.addEventListener("mousemove", mousemove)
                document.addEventListener("mouseup", mouseup)
            }.bind(this))
            this.style.position = "absolute" // fixed might work as well
        }
        document.getElementById("md-notepad").drag()
        let notepad = document.getElementById("notepad")
        notepad.addEventListener("dragover", function (e) {
            e.preventDefault()
            return false
        })
        notepad.addEventListener("drop", function (e) {
            e.preventDefault()
            return false
        })
    })

    let searchedChar
    let searchedVeh
    let vehicle
    let character
    let searchedCharacterModalOpen = false
    const togglePersonModal = (searched) => {
        searchedCharacterModalOpen = !searchedCharacterModalOpen
        return character = searched
    }
    let searchedVehicleModalOpen = false
    const toggleVehicleModal = (searched) => {
        searchedVehicleModalOpen = !searchedVehicleModalOpen
        return vehicle = searched
    }
    const copyToClipboard = (text, msg = "Copied to clipboard") => {
        copy(text)
        return success({ msg })
    }
</script>

<div class="flex flex-col items-center gap-3 mt-20 mx-2 text-center">
    <h1 class="text-gray-300 text-5xl font-semibold">Welcome back, {$page.data?.user?.callsign}</h1>
    <h2 class="text-gray-400 text-xl">
        Here is your MDT dashboard.
    </h2>
    <form action="?/resetCallsign" use:enhance>
        <button type="submit" class="px-3 py-2 rounded bg-red-500 text-gray-100 text-lg">Reset callsign</button>
    </form>
</div>

<div class="flex lg:flex-row flex-col flex-wrap gap-10 lg:m-20 m-5 justify-center">
    <div class="flex flex-col gap-5 bg-neutral-800 rounded text-gray-300 p-3 lg:w-[45%] w-full">
        <span class="font-semibold">Person search</span>
        {#if searchedChar}
            {#each $page.data?.characters?.filter(c => c.name.toLowerCase() === searchedChar.toLowerCase()) as character}
                <button on:click={() => togglePersonModal(character)} class="bg-neutral-700 rounded p-2 flex justify-between">
                    <span>{character.name}</span>
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="96 48 176 128 96 208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline></svg>
                </button>
            {/each}
        {/if}
        <div class="flex">
            <input
                type="text"
                name="name"
                placeholder="Search for a person"
                autocomplete="off"
                class="border-2 border-gray-300 border-opacity-20 rounded bg-transparent w-full px-2 py-2"
                bind:value={searchedChar}
            >
        </div>
    </div>
    <div class="flex flex-col gap-5 bg-neutral-800 rounded text-gray-300 p-3 lg:w-[45%] w-full">
        <span class="font-semibold">Vehicle search</span>
        {#if searchedVeh}
            {#each $page.data?.vehicles?.filter(v => v.plate.toLowerCase() === searchedVeh.toLowerCase()) as veh}
                <button on:click={() => toggleVehicleModal(veh)} class="bg-neutral-700 rounded p-2 flex justify-between">
                    <span>{veh.plate}</span>
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="96 48 176 128 96 208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline></svg>
                </button>
            {/each}
        {/if}
        <div class="flex">
            <input
                type="text"
                name="name"
                placeholder="Search for a vehicle plate"
                autocomplete="off"
                class="border-2 border-gray-300 border-opacity-20 rounded bg-transparent w-full px-2 py-2"
                bind:value={searchedVeh}
            >
        </div>
    </div>
    <div class="flex flex-col gap-5 bg-neutral-800 rounded text-gray-300 p-3 lg:w-[45%] w-full">
        <span class="font-semibold">Resources</span>
        <div class="flex flex-col gap-2">
            <button on:click={() => {}} class="flex gap-4 items-center px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 transition-all text-gray-100">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="104" y1="128" x2="216" y2="128" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="104" y1="64" x2="216" y2="64" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="104" y1="192" x2="216" y2="192" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><polyline points="40 60 56 52 56 108" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><path d="M41.1,152.6a14,14,0,1,1,24.5,13.2L40,200H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
                <span>Ten codes</span>
            </button>
            <button on:click={openNotepad} class="flex gap-4 items-center px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 transition-all text-gray-100">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polygon points="128 160 96 160 96 128 192 32 224 64 128 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polygon><line x1="168" y1="56" x2="200" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M216,120v88a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
                <span>Notepad</span>
            </button>
        </div>
    </div>
</div>

<div class="lg:w-1/2 w-[90%] absolute hidden bounceIn top-[25%] lg:left-[25%] left-[5%]" id="md-notepad">
    <div class="bg-neutral-800 p-2 rounded">
        <div id="handle" class="bg-neutral-800 rounded-t pb-2">
            <div class="flex justify-between items-center" id="md-notepad-header" draggable="false">
                <span class="text-white text-opacity-60">Notepad</span>
                <div class="flex gap-2">
                    <svg id="close" class="w-7 h-7 text-red-500 hover:bg-neutral-600 hover:bg-opacity-30 rounded transition-all p-0.5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
                </div>
            </div>
        </div>
        <div class="bg-neutral-700 rounded min-h-[20rem] text-gray-200 p-1" id="notepad" contenteditable="true">

        </div>
    </div>
</div>


<Modal title={character?.name} use={togglePersonModal} visibility={searchedCharacterModalOpen}>
    <div class="flex flex-col gap-2 mt-2 select-none">
        <span class="text-gray-400">Details</span>
        
        <div class="flex gap-2 items-center p-2 rounded bg-neutral-700 text-gray-100">
            <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></rect><line x1="176" y1="24" x2="176" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="80" y1="24" x2="80" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="40" y1="88" x2="216" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M92,128h28l-16,20a16,16,0,1,1-11.3,27.3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><polyline points="144 140 160 128 160 180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline></svg>
            <span>Born {new Date(character?.dob).toDateString()}</span>
        </div>
        <div class="flex gap-2 items-center p-2 rounded bg-neutral-700 text-gray-100">
            <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="16"></circle><polyline points="128 72 128 128 184 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline></svg>
            <span>{character?.age} years old</span>
        </div>
        <div class="flex gap-2 items-center p-2 rounded bg-neutral-700 text-gray-100">
            <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="40" y1="216" x2="40" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M40,168c64-48,112,48,176,0V48C152,96,104,0,40,48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
            <span>{character?.ethnicity}</span>
        </div>

        <span class="text-gray-400">Vehicles</span>
        {#if character?.vehicles?.length > 0}
            {#each character?.vehicles as vehicle}
            <div class="flex justify-between gap-4 items-center p-2 rounded bg-neutral-700 text-gray-100">
                <div class="flex items-center gap-2">
                    <span class="cursor-pointer" on:click={() => copyToClipboard(vehicle?.plate, `Copied plate ${vehicle?.plate} to your clipboard`)} use:tooltip={tooltipOptions} title="Click to copy license plate to clipboard">
                        <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle><circle cx="128" cy="180" r="12"></circle><path d="M128,144v-8a28,28,0,1,0-28-28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
                    </span>
                    <span class="break-words">{vehicle?.make} {vehicle?.model}</span>
                </div>
                {#if vehicle?.stolen}
                    <span use:tooltip={tooltipOptions} title="This vehicle is marked as stolen" class="rounded-full p-1 bg-orange-400">
                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="128" y1="80" x2="128" y2="136" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M164.5,32h-73a7.9,7.9,0,0,0-5.6,2.3L34.3,85.9A7.9,7.9,0,0,0,32,91.5v73a7.9,7.9,0,0,0,2.3,5.6l51.6,51.6a7.9,7.9,0,0,0,5.6,2.3h73a7.9,7.9,0,0,0,5.6-2.3l51.6-51.6a7.9,7.9,0,0,0,2.3-5.6v-73a7.9,7.9,0,0,0-2.3-5.6L170.1,34.3A7.9,7.9,0,0,0,164.5,32Z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="16"></path><circle cx="128" cy="172" r="12"></circle></svg>
                    </span>
                {/if}
            </div>
            {/each}
        {:else}
            <span class="text-gray-500">No licenses found.</span>
        {/if}

        <span class="text-gray-400">Licenses</span>
        {#if character?.licenses?.length > 0}
            {#each character?.licenses as license}
            <div class="flex gap-4 items-center px-4 py-2 rounded bg-neutral-700 text-gray-100">
                <span>{license?.name}</span>
            </div>
            {/each}
        {:else}
            <span class="text-gray-500">No licenses found.</span>
        {/if}
    </div>
</Modal>

<Modal title={vehicle?.plate} use={toggleVehicleModal} visibility={searchedVehicleModalOpen}>
    {@const owner = vehicle?.character[0]}
    <div class="flex flex-col gap-2 mt-2 select-none">
        <span class="text-gray-400">Details</span>
        <div class="flex gap-2 items-center justify-between p-2 rounded bg-neutral-700 text-gray-100">
            <div class="flex gap-2">
                <span class="cursor-pointer" on:click={() => copyToClipboard(vehicle?.plate, `Copied plate ${vehicle?.plate} to your clipboard`)} use:tooltip={tooltipOptions} title="Click to copy license plate to clipboard">
                    <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle><circle cx="128" cy="180" r="12"></circle><path d="M128,144v-8a28,28,0,1,0-28-28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
                </span>
                <span class="break-words">{vehicle?.make} {vehicle?.model}</span>
            </div>
            {#if vehicle?.stolen}
                <span use:tooltip={tooltipOptions} title="This vehicle is marked as stolen" class="rounded-full p-1 bg-orange-400">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="128" y1="80" x2="128" y2="136" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M164.5,32h-73a7.9,7.9,0,0,0-5.6,2.3L34.3,85.9A7.9,7.9,0,0,0,32,91.5v73a7.9,7.9,0,0,0,2.3,5.6l51.6,51.6a7.9,7.9,0,0,0,5.6,2.3h73a7.9,7.9,0,0,0,5.6-2.3l51.6-51.6a7.9,7.9,0,0,0,2.3-5.6v-73a7.9,7.9,0,0,0-2.3-5.6L170.1,34.3A7.9,7.9,0,0,0,164.5,32Z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="16"></path><circle cx="128" cy="172" r="12"></circle></svg>
                </span>
            {/if}
        </div>

        <span class="text-gray-400">Owner</span>

        <div class="flex gap-2 items-center p-2 rounded bg-neutral-700 text-gray-100">
            <span class="cursor-pointer" on:click={() => copyToClipboard(owner?.name, `Copied ${owner?.name} to your clipboard`)} use:tooltip={tooltipOptions} title="Click to copy name to clipboard">
                <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="152" y1="112" x2="192" y2="112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="152" y1="144" x2="192" y2="144" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><circle cx="92.1" cy="120" r="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle><path d="M61.1,168a32,32,0,0,1,62,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><rect x="32" y="48" width="192" height="160" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></rect></svg>
            </span>
            <span class="break-words">{owner?.name}</span>
        </div>
        <div class="flex gap-2 items-center p-2 rounded bg-neutral-700 text-gray-100">
            <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></rect><line x1="176" y1="24" x2="176" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="80" y1="24" x2="80" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="40" y1="88" x2="216" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M92,128h28l-16,20a16,16,0,1,1-11.3,27.3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><polyline points="144 140 160 128 160 180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline></svg>
            <span>Born {new Date(owner?.dob).toDateString()}</span>
        </div>
        <div class="flex gap-2 items-center p-2 rounded bg-neutral-700 text-gray-100">
            <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="16"></circle><polyline points="128 72 128 128 184 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline></svg>
            <span>{owner?.age} years old</span>
        </div>
        <div class="flex gap-2 items-center p-2 rounded bg-neutral-700 text-gray-100">
            <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="40" y1="216" x2="40" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M40,168c64-48,112,48,176,0V48C152,96,104,0,40,48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
            <span>{owner?.ethnicity}</span>
        </div>

    </div>
</Modal>