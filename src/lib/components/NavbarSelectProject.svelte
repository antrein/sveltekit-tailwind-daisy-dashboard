<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import Cookies from 'js-cookie';
    import { goto } from '$app/navigation';
    import Button from './Button.svelte';
  
    type Project = {
      id: string;
      name: string;
    };
  
    const showModal = writable(false);
    const projects = writable<Project[]>([]);
    const selectedProjectName = writable('Select Project');
    const selectedProjectId = writable(Cookies.get('project'));
    let modalRef: HTMLDialogElement | null = null;
  
    const fetchProjects = async () => {
      try {
        const auth = Cookies.get('auth');
        if (!auth) {
          return;
        }
        const authParsed = JSON.parse(auth);
        const { token } = authParsed;
        const response = await fetch('https://api.antrein14.cloud/bc/dashboard/project/list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        projects.set(data.data.projects);
        if ($selectedProjectId) {
          const selectedProject = data?.data?.projects?.find(
            (p: Project) => p.id === $selectedProjectId
          );
          if (selectedProject) {
            selectedProjectName.set(selectedProject.name);
          }
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
    onMount(() => {
      fetchProjects();
    });
  
    const handleShow = () => {
      if (modalRef) {
        modalRef.showModal();
      }
    };
  
    const handleClose = () => {
      if (modalRef) {
        modalRef.close();
      }
    };
  
    const handleNewProject = () => {
      if (modalRef) {
        modalRef.close();
      }
      goto('/project/create');
    };
  
    const handleProjectSelect = (projectName: string, projectId: string) => {
      selectedProjectId.set(projectId);
      selectedProjectName.set(projectName);
      Cookies.set('project', projectId);
      handleClose();
      window.location.reload();
    };
  </script>
  
  <button class="btn mr-4 pr-1" on:click={handleShow}>
    {$selectedProjectName}
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
      <path d="M480-360 280-560h400L480-360Z" />
    </svg>
  </button>
  
  <dialog id="my_modal_2" class="modal open" bind:this={modalRef}>
    <div class="modal-box hide-scrollbar" style="max-height: 500px;">
      <h3 class="font-bold text-lg mb-2">Select Project</h3>
      <div style="height: 300px; overflow-y: auto;" class="hide-scrollbar">
        <table class="table">
          <thead>
            <tr style="position: sticky; top: 0; z-index: 1; background: white;">
              <th></th>
              <th>Project Name</th>
              <th>Project ID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {#each $projects as project, index (project.id)}
              <tr
                class="cursor-pointer hover:bg-base-200"
                on:click={() => handleProjectSelect(project.name, project.id)}
              >
                <th>{index + 1}</th>
                <td>{project.name}</td>
                <td>{project.id}</td>
                <th>
                  {#if $selectedProjectId === project.id}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  {/if}
                </th>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
  
      <div class="modal-action">
        <Button type="button" title="Cancel" variant="btn_dark_green" onclick={handleClose} full icon={undefined} />
        <Button type="button" title="New Project" variant="btn_orange" onclick={handleNewProject} full icon={undefined} />
      </div>
    </div>
  </dialog>
  