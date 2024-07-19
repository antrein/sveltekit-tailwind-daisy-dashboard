<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { toast } from '@zerodevx/svelte-toast';
    import Button from '$lib/components/Button.svelte';
  
    let selectedProject = '';
    const formData = writable({
      project_id: '',
      queue_page_style: 'base',
      queue_page_base_color: '',
      queue_page_title: '',
      image: null,
      file: null,
    });
  
    onMount(() => {
      const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = value;
        return acc;
      }, {} as { [key: string]: string });
      selectedProject = cookies['project'];
      if (selectedProject) {
        fetchProjectDetails();
      }
    });
  
    const fetchProjectDetails = async () => {
      try {
        const auth = document.cookie
          .split('; ')
          .find(row => row.startsWith('auth='))
          ?.split('=')[1];
        if (!auth) {
          console.error('No authorization token found');
          return;
        }
        const { token } = JSON.parse(decodeURIComponent(auth));
        const response = await fetch(`https://api.antrein14.cloud/bc/dashboard/project/detail/${selectedProject}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const jsonData = await response.json();
        const data = jsonData.data;
        if (data) {
          formData.set({
            project_id: data.id,
            queue_page_style: data.configuration.queue_page_style,
            queue_page_base_color: data.configuration.queue_page_base_color,
            queue_page_title: data.configuration.queue_page_title,
            image: null,
            file: null,
          });
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };
  
 const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement | HTMLSelectElement;
  const { name, value } = target;
  if (target instanceof HTMLInputElement && target.files) {
    formData.update(data => ({
      ...data,
    [name]: target.files ? target.files[0] : null
    }));
  } else {
    formData.update(data => ({
      ...data,
      [name]: value
    }));
  }
};

  
    const handleSubmit = async (e: Event) => {
      e.preventDefault();
      console.log($formData);
      try {
        const auth = document.cookie
          .split('; ')
          .find(row => row.startsWith('auth='))
          ?.split('=')[1];
        if (!auth) {
          console.error('No authorization token found');
          return;
        }
        const { token } = JSON.parse(decodeURIComponent(auth));
  
        const formDataToSend = new FormData();
        formDataToSend.append('project_id', $formData.project_id);
        if ($formData.image) formDataToSend.append('image', $formData.image);
        if ($formData.file) {
          formDataToSend.append('file', $formData.file);
        } else {
          formDataToSend.append('queue_page_style', $formData.queue_page_style);
          formDataToSend.append('queue_page_base_color', $formData.queue_page_base_color);
          formDataToSend.append('queue_page_title', $formData.queue_page_title);
        }
  
        const response = await fetch('https://api.antrein14.cloud/bc/dashboard/project/style', {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        });
  
        const data = await response.json();
        if (response.ok) {
          toast.push('Project updated successfully', { theme: { '--toastBackground': 'green', '--toastColor': 'white' } });
        } else {
          toast.push((data as any)?.error, { theme: { '--toastBackground': 'red', '--toastColor': 'white' } });
        }
      } catch (error) {
        console.error('Error updating project:', error);
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
      <h1 class="text-3xl font-bold mb-5">Project Configuration</h1>
      <form on:submit={handleSubmit} class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="mb-4">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Project ID</span>
            </div>
            <input
              type="text"
              name="project_id"
              bind:value={$formData.project_id}
              on:input={handleChange}
              required
              readonly
              class="input input-bordered w-full"
            />
          </label>
        </div>
        <div class="mb-4">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Queue Page Title</span>
            </div>
            <input
              type="text"
              name="queue_page_title"
              bind:value={$formData.queue_page_title}
              on:input={handleChange}
              class="input input-bordered w-full"
            />
          </label>
        </div>
        <div class="mb-4">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Image</span>
            </div>
            <input
              type="file"
              name="image"
              on:change={handleChange}
              accept="image/*"
              class="file-input file-input-bordered w-full"
            />
          </label>
        </div>
        <div class="mb-4">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">HTML File</span>
            </div>
            <input
              type="file"
              name="file"
              on:change={handleChange}
              accept=".html"
              class="file-input file-input-bordered w-full"
            />
          </label>
        </div>
        {#if !$formData.file}
          <div class="mb-4">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Queue Page Style</span>
              </div>
              <select
                name="queue_page_style"
                bind:value={$formData.queue_page_style}
                on:change={handleChange}
                class="select select-bordered w-full"
              >
                <option value="base">Base</option>
                <option value="custom">Custom</option>
              </select>
            </label>
          </div>
          <div class="mb-4">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Queue Page Base Color</span>
              </div>
              <input
                type="color"
                name="queue_page_base_color"
                bind:value={$formData.queue_page_base_color}
                on:input={handleChange}
                class="input input-bordered w-full"
              />
            </label>
          </div>
        {/if}
        <div class="col-span-1 md:col-span-2 flex justify-end">
          <Button type="submit" title="Submit" variant="btn_orange" full icon="" onclick={() => {}} />
        </div>
      </form>
    </div>
  </div>
  
  <svelte:component this={toast.Toaster} />
  