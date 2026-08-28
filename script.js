(function () {
  const config = window.OXIGEN_SITE_CONFIG || {};
  const byId = (id) => document.getElementById(id);

  function text(id, value) { const element = byId(id); if (element && value) element.textContent = value; }
  function setContact(key, value) {
    const element = document.querySelector(`[data-contact="${key}"]`);
    if (!element || !value) return;
    const href = key === "email" ? `mailto:${value}` : value;
    element.href = href; element.target = key === "email" ? "_self" : "_blank"; element.rel = "noreferrer"; element.classList.remove("disabled-link");
  }

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

  text("brand-name", config.brandName); text("footer-brand", config.brandName); text("location-label", config.locationLabel); loadPublicConfig();
})();
