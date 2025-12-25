import KeypadButton from "./common/KeypadButton";

function Navigation({ activeRoute }: { activeRoute: string }) {
  const isActive = (path: string) => {
    return activeRoute === path;
  };

  return (
    <nav className="flex justify-center h-25">
      <div className="flex justify-center max-w-lg items-start pt-2 gap-4">
        <KeypadButton variant="link" to="whoami" active={isActive("whoami")}>
          Who am I?
        </KeypadButton>
        <KeypadButton variant="link" to="hobbies" active={isActive("hobbies")}>
          Beyond Work
        </KeypadButton>
        <KeypadButton variant="link" to="contact" active={isActive("contact")}>
          Let's Connect?
        </KeypadButton>
      </div>
    </nav>
  );
}

export default Navigation;
