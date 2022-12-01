<script>
    import { fade } from "svelte/transition"
    import { clickOutside } from "../util"

    export let visibility
    export let use
</script>

{#if visibility}
    <div in:fade out:fade tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 justify-center z-50 w-full h-full backdrop-blur-sm">
        <div class="relative p-4 w-full h-max flex justify-center mt-[25vh]">
            <div use:clickOutside on:outclick={use} class="relative rounded-lg shadow bg-feature-border w-[90%] lg:w-[40%]">
                <button on:click={use} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:text-white transition-all" data-modal-toggle="authentication-modal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="py-6 px-6 lg:px-8">
                    <h3 class="text-2xl text-gray-900 dark:text-gray-200 mb-1 text-left font-semibold">Please confirm</h3>
                    <h3 class="text-base text-gray-900 dark:text-gray-400 text-left">Are you sure you want to proceed?</h3>
                    <h3 class="text-base text-gray-900 dark:text-gray-400 mb-4 text-left">This cannot be undone.</h3>
                    <slot />
                </div>
            </div>
        </div>
    </div>
{/if}