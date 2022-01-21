import create from "zustand";
import { persist } from "zustand/middleware";
import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";
let octokit;

export const useAppStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      credentials: null,
      projects: [],
      logIn: (email, password) =>
        set({ isLoggedIn: true, credentials: { email, password } }),
      logOut: () => set({ isLoggedIn: false, credentials: null, projects: [] }),
      getProjects: async () => {
        if (!octokit) {
          octokit = new Octokit();
        }
        const projects = await octokit.rest.repos.listForOrg({
          org: "code-with-ahsan",
          type: "public",
        });
        set({ projects: projects.data });
      },
    }),
    {
      name: "app-storage", // unique name
    }
  )
);
