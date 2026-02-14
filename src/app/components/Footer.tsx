const Footer = () => {
  return (
    <footer className="border-t border-border px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="text-lg font-semibold text-foreground">AetherCare</span>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Literature-grounded clinical decision support for modern healthcare.
            </p>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <span className="cursor-pointer transition-colors hover:text-foreground">Privacy</span>
            <span className="cursor-pointer transition-colors hover:text-foreground">Terms</span>
            <span className="cursor-pointer transition-colors hover:text-foreground">Contact</span>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold">Medical Disclaimer:</span> AetherCare is a clinical
            decision support tool and does not replace professional medical judgment. All outputs
            should be reviewed by a qualified healthcare provider. This system is intended for use
            by licensed clinicians only.
          </p>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          {new Date().getFullYear()} AetherCare. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
