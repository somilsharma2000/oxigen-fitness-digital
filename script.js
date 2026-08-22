(function () {
  const config = window.OXIGEN_SITE_CONFIG || {};
  const status = document.querySelector(".form-status");
  const form = document.querySelector("#trial-form");
  const byId = (id) => document.getElementById(id);

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
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const values = new FormData(form);
    const phone = String(values.get("phone") || "").trim();
    const email = String(values.get("email") || "").trim();
    if (!phone && !email) { setStatus("Please add a phone number or email so the club can respond.", true); return; }
    if (!values.get("consent")) { setStatus("Please confirm consent before sending your request.", true); return; }
    if (!config.apiBaseUrl || !config.publicSlug) { setStatus("The club’s enquiry connection needs configuration before this request can be sent.", true); return; }
    const submit = form.querySelector("button[type='submit']"); submit.disabled = true; submit.textContent = "Sending request…";
    const payload = { publicSlug: config.publicSlug, fullName: String(values.get("fullName") || "").trim(), phone: phone || undefined, email: email || undefined, interest: "Trial visit", fitnessGoal: String(values.get("fitnessGoal") || "").trim() || undefined, preferredVisitAt: values.get("preferredVisitAt") ? new Date(String(values.get("preferredVisitAt"))).toISOString() : undefined, consent: true };
    try {
      const response = await fetch(`${config.apiBaseUrl.replace(/\/$/, "")}/api/public/enquiry`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "The club could not save this request right now.");
      setStatus(result.duplicate ? "We already have this request and the club team will follow up." : "Your request is with the club team. They will confirm the next step."); form.reset();
    } catch (error) { setStatus(error instanceof Error ? error.message : "The request could not be sent.", true); }
    finally { submit.disabled = false; submit.innerHTML = "Request a trial <span>↗</span>"; }
  });
  text("brand-name", config.brandName); text("footer-brand", config.brandName); text("location-label", config.locationLabel); loadPublicConfig();
})();
