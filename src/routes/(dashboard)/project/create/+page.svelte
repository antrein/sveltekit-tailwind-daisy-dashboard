<script lang="ts">
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';
    import { toast } from '@zerodevx/svelte-toast';
    import Button from '$lib/components/Button.svelte';
  
    const formData = writable({
      id: '',
      name: '',
    });
  
    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      formData.update((data) => ({ ...data, [target.name]: target.value }));
    };
  
    const handleSubmit = async (e: Event) => {
      e.preventDefault();
      try {
        const auth = document.cookie
          .split('; ')
          .find(row => row.startsWith('auth='))
          ?.split('=')[1];
        if (!auth) {
          return;
        }
        const { token } = JSON.parse(decodeURIComponent(auth));
        const response = await fetch('https://api.antrein14.cloud/bc/dashboard/project', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify($formData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          toast.push('Project created successfully', { theme: { '--toastBackground': 'green', '--toastColor': 'white' } });
          goto('/project/config');
        } else {
          toast.push((data as any)?.error, { theme: { '--toastBackground': 'red', '--toastColor': 'white' } });
        }
      } catch (error) {
        console.log({ error });
        toast.push((error as any)?.response?.data?.error || (error as any).message, { theme: { '--toastBackground': 'red', '--toastColor': 'white' } });
      }
    };
  </script>
  
  <style>
    .form-control {
      display: flex;
      flex-direction: column;
    }
    .label {
      font-weight: bold;
    }
    .label-text {
      margin-bottom: 0.5rem;
    }
  </style>
  
  <div class="flex justify-center mt-6">
    <div class="w-full max-w-5xl">
      <h1 class="text-3xl font-bold mb-5">Create Project</h1>
      <form on:submit={handleSubmit} class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="mb-4">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Project ID</span>
            </div>
            <input
              type="text"
              name="id"
              bind:value={$formData.id}
              on:input={handleChange}
              required
              class="input input-bordered w-full"
            />
          </label>
        </div>
        <div class="mb-4">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Name</span>
            </div>
            <input
              type="text"
              name="name"
              bind:value={$formData.name}
              on:input={handleChange}
              required
              class="input input-bordered w-full"
            />
          </label>
        </div>
        <div class="col-span-1 md:col-span-2 flex justify-end">
          <Button type="submit" title="Create Project" variant="btn_orange" full icon="" onclick={() => {}} />
        </div>
      </form>
    </div>
  </div>
  
  <svelte:component this={toast.Toaster} />
  