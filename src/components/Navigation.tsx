import KeypadButton from "./common/KeypadButton";

function Navigation({ pathname }: { pathname: string }) {
  const isActive = (path: string) => {
    // Check if pathname exactly matches the path or starts with the path (for nested routes)
    return pathname === `/${path}` || pathname.startsWith(`/${path}/`);
  };

  return (
    <nav className="flex justify-center h-25">
      <div className="flex justify-center max-w-lg items-start pt-2 gap-4">
        <KeypadButton variant="link" to="whoami" active={isActive("whoami")}>
          Who am I?
        </KeypadButton>
        <KeypadButton
          variant="link"
          to="interests"
          active={isActive("interests")}
        >
          Interests
        </KeypadButton>
        <KeypadButton variant="link" to="contact" active={isActive("contact")}>
          Let's Connect?
        </KeypadButton>
      </div>
    </nav>
  );
}

export default Navigation;
