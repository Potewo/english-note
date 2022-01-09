<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  export let name = ""
  export let i: number
  export let viewMode = false
  const dispatch = createEventDispatcher<{delete: number}>()
  const handleDelete = () => {
    dispatch('delete', i)
  }
</script>

<span class="tag">{name} { #if !viewMode }<span class="deleteButton" on:click={handleDelete}></span> { /if }</span>

<style>
  .tag {
    height: 20px;
    background-color: #ccffcc;
    padding: 5px;
    border-radius: 4px;
  }
  .deleteButton {
    display: inline-block;
    width: 15px;
    height: 15px;
    position: relative;
  }
  .deleteButton::before, .deleteButton::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 15px;
    background: #a0a0a0;
  }
  .deleteButton::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  .deleteButton::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  .deleteButton:hover:before, .deleteButton:hover:after {
    background-color: #707070;
  }

</style>
