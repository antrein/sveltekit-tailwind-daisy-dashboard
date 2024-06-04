<script lang="ts">
    export let type: 'button' | 'submit' = 'button';
    export let title: string;
    export let icon: string | undefined;
    export let variant: string;
    export let full: boolean = false;
    export let disabled: boolean = false;
    export let onclick: any;
  
    // Handler for click event
    const handleClick = (event: MouseEvent) => {
      if (onclick) {
        onclick(event);
      }
    };
  </script>
  
  <button 
    class="flexCenter gap-3 rounded-full border {variant} {full ? 'w-full' : ''}"
    type={type} 
    disabled={disabled} 
    on:click={handleClick}
  >
    {#if icon}
      <img src={icon} alt={title} width="24" height="24" />
    {/if}
    <label class="bold-16 whitespace-nowrap cursor-pointer">{title}</label>
  </button>
  