<script>
    import { page } from "$app/stores"
    import { onMount } from "svelte"

    function openNotepad() {
        let modal = document.getElementById("md-notepad")
        let close = document.getElementById("close")
        modal.style.display = "block"
        close.onclick = function() {
            modal.style.display = "none"
        }
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
</script>

<div class="flex flex-col items-center gap-3 mt-20 mx-2 text-center">
    <h1 class="text-gray-300 text-5xl font-semibold">Hello {$page.data?.user?.callsign}</h1>
    <h2 class="text-gray-400 text-xl">
        Here is your MDT dashboard.
    </h2>
</div>

<div class="flex flex-wrap justify-center gap-3 text-lg my-10 select-none">
    <button class="px-3 py-2 rounded bg-red-500 text-gray-100">NAME SEARCH</button>
    <button class="px-3 py-2 rounded bg-red-500 text-gray-100">PLATE SEARCH</button>
    <button class="px-3 py-2 rounded bg-gray-500 text-gray-100">TEN CODES</button>
    <button on:click={openNotepad} class="px-3 py-2 rounded bg-gray-500 text-gray-100">NOTEPAD</button>
</div>

<div class="w-1/2 absolute right-0 hidden bounceIn" id="md-notepad">
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