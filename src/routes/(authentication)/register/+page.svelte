<script lang="ts">
    import { goto } from '$app/navigation';
    import { writable } from 'svelte/store';
    import { toast } from '@zerodevx/svelte-toast';
    import { get } from 'svelte/store';
  import Button from '$lib/components/Button.svelte';

    const formData = writable({
      email: '',
      name: '',
      password: '',
      retype_password: ''
    });
    const submitting = writable(false);
    const error = writable('');
    const passwordVisiblility = writable(false);
    const retypePasswordVisibility = writable(false);
    const passwordMatch = writable(true);
    const retypePasswordTouched = writable(false);
  
    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      formData.update((data) => ({ ...data, [target.name]: target.value }));
  
      if (target.name === 'password' || target.name === 'retype_password') {
        const { password, retype_password } = get(formData);
        passwordMatch.set(password === retype_password);
      }
  
      if (target.name === 'retype_password') {
        retypePasswordTouched.set(true);
      }
    };
  
    const handlePasswordVisibility = () => {
      passwordVisiblility.update((v) => !v);
    };

    const handleRetypePasswordVisibility = () => {
      retypePasswordVisibility.update((v) => !v);
    };
  
    const register = async (e: Event) => {
      e.preventDefault();
  
      const { password, retype_password } = get(formData);
      if (password !== retype_password) {
        passwordMatch.set(false);
        retypePasswordTouched.set(true);
        return;
      }
  
      submitting.set(true);
  
      try {
        const { email, name, password } = get(formData);
        const res = await fetch('https://api.antrein14.cloud/bc/dashboard/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, name, password, retype_password })
        });
  
        if (res.ok) {
          goto('/login');
        } else {
          const errorData = await res.json();
          error.set(errorData.error);
          toast.push(errorData.error, { theme: { '--toastBackground': 'red', '--toastColor': 'white' } });
        }
      } catch (err) {
        error.set((err as Error).message);
        toast.push((err as Error).message, { theme: { '--toastBackground': 'red', '--toastColor': 'white' } });
      } finally {
        submitting.set(false);
      }
    };
  </script>
  
  <main class="min-h-screen flex items-center justify-center bg-white">
    <div class="w-full max-w-md bg-green-90 shadow-md p-6">
      <h2 class="text-2xl font-semibold text-white text-center">Register</h2>
      <p class="mt-2 text-center text-gray-400">Create your account</p>
  
      {#if $error}
        <div class="alert alert-error shadow-lg mb-4">
          <div>
            <span>{$error}</span>
          </div>
          <button class="btn btn-sm btn-ghost" on:click={() => error.set('')}>✕</button>
        </div>
      {/if}
  
      <form on:submit={register} class="mt-4">
        <div class="flex flex-col mb-4">
          <label class="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" name="name" required placeholder="Name" aria-label="Name" bind:value={$formData.name} class="w-full" />
          </label>
        </div>
        <div class="flex flex-col mb-4">
          <label class="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="email" name="email" required placeholder="Email" aria-label="Email" bind:value={$formData.email} class="w-full" />
          </label>
        </div>
        <div class="flex flex-col mb-4">
          <label class="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
              <path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" />
            </svg>
            {#if $passwordVisiblility}
              <input type="text" name="password" required placeholder="Password" aria-label="Password" bind:value={$formData.password} class="w-full" />
            {:else}
              <input type="password" name="password" required placeholder="Password" aria-label="Password" bind:value={$formData.password} class="w-full" />
            {/if}
            <button type="button" on:click={handlePasswordVisibility}>
              {#if $passwordVisiblility}
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                  <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                </svg>
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                  <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                </svg>
              {/if}
            </button>
          </label>
        </div>
        <div class="flex flex-col mb-4">
          <label class="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
              <path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" />
            </svg>
            {#if $retypePasswordVisibility}
              <input type="text" name="retype_password" required placeholder="Confirm Password" aria-label="Confirm Password" bind:value={$formData.retype_password} class="w-full" on:copy={(e) => e.preventDefault()} on:paste={(e) => e.preventDefault()} />
            {:else}
              <input type="password" name="retype_password" required placeholder="Confirm Password" aria-label="Confirm Password" bind:value={$formData.retype_password} class="w-full" on:copy={(e) => e.preventDefault()} on:paste={(e) => e.preventDefault()} />
            {/if}
            <button type="button" on:click={handleRetypePasswordVisibility}>
              {#if $retypePasswordVisibility}
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                  <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                </svg>
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                  <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                </svg>
              {/if}
            </button>
          </label>
          {#if $retypePasswordTouched && !$passwordMatch}
            <p class="text-red-600 text-sm mt-1">Passwords do not match</p>
          {/if}
        </div>
  
        <div class="w-full mb-4">
          <Button type="submit" variant="btn_orange" title="Create Account" disabled={$submitting} icon="" onclick={() => {}} full/>
        </div>
  
        <p class="mt-2 text-center text-white">
          Already have an account? <a href="/login" class="link link-info">Sign in</a>
        </p>
      </form>
    </div>
  </main>
  