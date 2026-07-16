import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FormProvider } from "../components/FormProvider";

export const Route = createRootRoute({
  component: () => (
    <FormProvider>
      <div className="bg-surface text-on-surface min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col items-center">
          <Outlet />
        </main>
        <Footer />
      </div>
    </FormProvider>
  ),
});
