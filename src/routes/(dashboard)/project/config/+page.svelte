<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { toast } from '@zerodevx/svelte-toast';
    import Button from '$lib/components/Button.svelte';
  
    let selectedProject = '';
    const health = writable(false);
    const formData = writable({
      project_id: '',
      threshold: 0,
      session_time: 0,
      host: '',
      base_url: '',
      max_users_in_queue: 0,
      queue_start: '',
      queue_end: '',
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
            threshold: data.configuration.threshold,
            session_time: data.configuration.session_time,
            host: data.configuration.host,
            base_url: data.configuration.base_url,
            max_users_in_queue: data.configuration.max_users_in_queue,
            queue_start: data.configuration.queue_start,
            queue_end: data.configuration.queue_end,
          });
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };
  
    const checkProjectHealth = async () => {
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
        const response = await fetch(`https://api.antrein14.cloud/bc/dashboard/project/health/${selectedProject}`, {
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
        if (jsonData.data && jsonData.data.healthiness) {
          health.set(true);
        } else {
          health.set(false);
        }
      } catch (error) {
        console.error('Error fetching project health:', error);
        health.set(false);
      }
    };
  
    onMount(() => {
    const cookies = document.cookie.split('; ').reduce((acc: Record<string, string>, cookie) => {
      const [name, value] = cookie.split('=');
      acc[name] = value;
      return acc;
    }, {});
    selectedProject = cookies['project'];
    if (selectedProject) {
      fetchProjectDetails();

      const interval = setInterval(() => {
        checkProjectHealth();
      }, 2000);

      return () => clearInterval(interval);
    }
  });
  
    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      formData.update(data => ({ ...data, [target.name]: target.value }));
    };
  
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };
  
    const handleSubmit = async (e: Event) => {
      e.preventDefault();
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
        const response = await fetch(`https://api.antrein14.cloud/bc/dashboard/project/config`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...$formData,
            session_time: Number($formData.session_time),
            threshold: Number($formData.threshold),
            max_users_in_queue: Number($formData.max_users_in_queue),
            queue_start: formatDate($formData.queue_start),
            queue_end: formatDate($formData.queue_end),
          }),
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
      <div class="flex justify-end items-center mb-4">
        <div class="p-2 border border-gray-300 rounded flex items-center">
          <span class="mr-2">Project Deployment:</span>
          <span class={`inline-block w-4 h-4 rounded-full ${$health ? 'bg-green-500' : 'bg-red-500'}`}></span>
        </div>
      </div>
      <form on:submit={handleSubmit} class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <span class="label-text">Threshold</span>
            </div>
            <input
              type="number"
              name="threshold"
              bind:value={$formData.threshold}
              on:input={handleChange}
              required
              class="input input-bordered w-full"
            />
          </label>
        </div>
  
        <div class="mb-4">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Session Time</span>
            </div>
            <input
              type="number"
              name="session_time"
              bind:value={$formData.session_time}
              on:input={handleChange}
              required
              class="input input-bordered w-full"
            />
          </label>
        </div>
  
        <div class="mb-4">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Host</span>
            </div>
            <input
              type="text"
              name="host"
              bind:value={$formData.host}
              on:input={handleChange}
              required
              class="input input-bordered w-full"
            />
          </label>
        </div>
  
        <div class="mb-4">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Base URL</span>
            </div>
            <input
              type="text"
              name="base_url"
              bind:value={$formData.base_url}
              on:input={handleChange}
              required
              class="input input-bordered w-full"
            />
          </label>
        </div>
  
        <div class="mb-4">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Max Users In Queue</span>
            </div>
            <input
              type="number"
              name="max_users_in_queue"
              bind:value={$formData.max_users_in_queue}
              on:input={handleChange}
              required
              class="input input-bordered w-full"
            />
          </label>
        </div>
  
        <div class="mb-4">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Queue Start Time</span>
            </div>
            <input
              type="datetime-local"
              name="queue_start"
              bind:value={$formData.queue_start}
              on:input={handleChange}
              required
              class="input input-bordered w-full"
            />
          </label>
        </div>
  
        <div class="mb-4">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Queue End Time</span>
            </div>
            <input
              type="datetime-local"
              name="queue_end"
              bind:value={$formData.queue_end}
              on:input={handleChange}
              required
              class="input input-bordered w-full"
            />
          </label>
        </div>
  
        <div class="col-span-1 md:col-span-3 flex justify-end">
          <Button type="submit" title="Submit" variant="btn_orange" full icon="" onclick={() => {}} />
        </div>
      </form>
    </div>
  </div>
  
  <svelte:component this={toast.Toaster} />
  