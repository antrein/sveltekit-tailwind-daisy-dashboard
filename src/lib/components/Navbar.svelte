<script lang="ts">
        import Cookies from 'js-cookie';

    import logo from '$lib/assets/antrein-logo.svg';
	import NavbarSelectProject from './NavbarSelectProject.svelte';
	import { goto } from '$app/navigation';

  const handleLogout = () => {
    Cookies.remove("auth");
    Cookies.remove("project");
    goto("/login");
  };

</script>
    <div class="navbar bg-base-100 border-b ">
      <div class="flex-1">
        <label
          for="my-drawer-2"
          class="btn btn-square btn-ghost drawer-button lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-5 h-5 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <a href="/" class="btn btn-ghost lg:hidden">
          <img src={logo} alt="logo" width={74} height={29} />
        </a>
      </div>
      <div class="flex-none">
        <NavbarSelectProject />
        <div class="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            class="btn btn-circle "
          >
          <div class="w-10 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#292C27"
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
            </svg>
          </div>
          </div>
          <ul
            tabIndex={0}
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
                <button on:click={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
