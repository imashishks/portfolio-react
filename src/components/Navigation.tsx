import KeypadButton from "./common/KeypadButton";

function Navigation({ pathname }: { pathname: string }) {
  const isActive = (path: string) => {
    // Check if pathname exactly matches the path or starts with the path (for nested routes)
    return pathname === `/${path}` || pathname.startsWith(`/${path}/`);
  };

  return (
    <nav className="flex w-full justify-center px-2 py-3 pb-6 sm:pb-8 md:pb-10">
      <div className="flex w-full max-w-lg flex-wrap items-start justify-center gap-2 gap-y-3 pt-1 sm:gap-3 md:gap-4">
        <KeypadButton variant="link" to="whoami" active={isActive("whoami")}>
          Who am I?
        </KeypadButton>
        <KeypadButton variant="link" to="contact" active={isActive("contact")}>
          Let's Connect?
        </KeypadButton>
      </div>
    </nav>
  );
}

export default Navigation;
