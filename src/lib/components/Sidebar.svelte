<!-- import React from "react";
import Navbar from "./Navbar";
import Link from "next/link";
import Image from "next/image";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return ( -->
  <script>
	import Navbar from "./Navbar.svelte";
    import logo from '$lib/assets/antrein-logo.svg';

</script>

    <div class="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content h-screen flex flex-col">
        <Navbar />
        <div class="flex-1 flex flex-col items-center justify-space-evenly bg-base-200">
          <div class="">
          <!-- {children} -->
            <slot />
          </div>
        </div>
      </div>
      <div class="drawer-side border-r">
        <label
          for="my-drawer-2"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <div class="hidden lg:flex items-center min-h-16 justify-center">
          <a href="/" class="">
            <img src={logo} alt="logo" width={74} height={29} />
          </a>
        </div>
        <ul class="menu p-4 w-80  min-h-full lg:min-h-0 bg-white text-base-content">
          <!-- {/* Sidebar content here */} -->
          <li>
            <a href="/">Analytics</a>
          </li>
          <li>
            <details open>
              <summary>Projects</summary>
              <ul>
                <li>
                  <a href="/project/config">Configuration</a>
                </li>
                <li>
                  <a href="/project/style-config">Style</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  <!-- );
};

export default Sidebar; -->
