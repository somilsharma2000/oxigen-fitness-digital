(function () {
  const config = window.OXIGEN_SITE_CONFIG || {};
  const status = document.querySelector(".form-status");
  const form = document.querySelector("#trial-form");
  const byId = (id) => document.getElementById(id);

  const demoBanner = byId("demo-banner");
  const bannerClose = byId("demo-banner-close");
  if (bannerClose && demoBanner) {
    bannerClose.addEventListener("click", () => {
      demoBanner.style.display = "none";
    });
  }

  function text(id, value) { const element = byId(id); if (element && value) element.textContent = value; }
  function setContact(key, value) {
    const element = document.querySelector(`[data-contact="${key}"]`);
    if (!element || !value) return;
    const href = key === "email" ? `mailto:${value}` : value;
    element.href = href; element.target = key === "email" ? "_self" : "_blank"; element.rel = "noreferrer"; element.classList.remove("disabled-link");
  }
  function setStatus(message, isError) { status.textContent = message; status.style.color = isError ? "#a93232" : "#4b6d25"; }
  function mapRemoteConfig(remote) {
    text("brand-name", remote.brandName); text("footer-brand", remote.brandName); text("location-label", remote.tagline || config.locationLabel); text("public-description", remote.description);
    setContact("whatsApp", remote.whatsApp); setContact("instagramUrl", remote.instagramUrl); setContact("email", remote.email);
    if (remote.address || remote.phone) text("contact-copy", [remote.address, remote.phone].filter(Boolean).join(" · "));
  }
  async function loadPublicConfig() {
    if (!config.apiBaseUrl || !config.publicSlug) return;
    try {
      const response = await fetch(`${config.apiBaseUrl.replace(/\/$/, "")}/api/public/config/${encodeURIComponent(config.publicSlug)}`);
      if (!response.ok) return;
      mapRemoteConfig(await response.json());
    } catch (_) { /* Preview remains useful without a connected public configuration. */ }
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const values = new FormData(form);
      const fullName = String(values.get("fullName") || "").trim();
      const phone = String(values.get("phone") || "").trim();
      const email = String(values.get("email") || "").trim();
      if (!fullName) { setStatus("Please enter your name.", true); return; }
      if (!phone && !email) { setStatus("Please add a phone number or email so the club can respond.", true); return; }
      if (!values.get("consent")) { setStatus("Please confirm consent before sending your request.", true); return; }
      setStatus("Thank you! Your enquiry has been sent to Oxigen Fitness. Our team will contact you within 24 hours.", false);
      form.reset();
    });
  }

  text("brand-name", config.brandName); text("footer-brand", config.brandName); text("location-label", config.locationLabel); loadPublicConfig();
})();
