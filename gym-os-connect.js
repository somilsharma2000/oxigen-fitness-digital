/**
 * Gym OS Connect v1.0
 * Shared integration module for all Gym OS powered gym websites.
 * Handles: lead capture, member portal redirect, QR check-in, dashboard access.
 * 
 * Usage: Include this script on any gym website and call GymOS.init({ gymName, ... })
 * 
 * Backend: https://vesper-923580a1.base44.app/functions/captureGymLead
 * Portal:  https://app.base44.com/apps/6a85aadd01bc42f293723858/editor/preview
 */

const GymOS = {
  config: {
    apiUrl: 'https://vesper-923580a1.base44.app/functions/captureGymLead',
    portalUrl: 'https://app.base44.com/apps/6a85aadd01bc42f293723858/editor/preview',
    dashboardUrl: 'https://app.base44.com/apps/6a85aadd01bc42f293723858/editor/preview',
    gymName: 'Gym',
    whatsappNumber: '+917737077479',
  },

  init(options = {}) {
    this.config = { ...this.config, ...options };
    this.setupLeadForms();
    this.setupMemberLogin();
    this.setupQRCheckIn();
    this.setupDashboardLink();
    this.injectPoweredBy();
    this.injectDemoBanner();
  },

  setupLeadForms() {
    document.querySelectorAll('form[data-gymos-lead]').forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
          gym_name: this.config.gymName,
          name: formData.get('fullName') || formData.get('name') || '',
          phone: formData.get('phone') || '',
          email: formData.get('email') || '',
          interest: formData.get('interest') || 'Trial visit',
          message: formData.get('message') || '',
          source: this.config.gymName + ' website',
        };
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;
        try {
          const res = await fetch(this.config.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
          const result = await res.json();
          if (result.success) {
            form.innerHTML = '<div style="text-align:center;padding:40px 20px;"><div style="font-size:48px;margin-bottom:16px;">✓</div><h3 style="color:#0066FF;font-size:24px;margin-bottom:8px;">Thank you, ' + data.name + '!</h3><p style="color:#666;font-size:16px;">We have received your request. Our team will contact you within 24 hours.</p></div>';
          } else {
            alert('Something went wrong. Please call us directly.');
            if (submitBtn) submitBtn.disabled = false;
          }
        } catch (err) {
          const waMsg = encodeURIComponent('Hi, I am ' + data.name + '. I would like to book a trial at ' + this.config.gymName + '. Phone: ' + data.phone);
          window.open('https://wa.me/' + this.config.whatsappNumber.replace(/+/g, '') + '?text=' + waMsg, '_blank');
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    });
  },

  setupMemberLogin() {
    document.querySelectorAll('[data-gymos-login]').forEach(el => {
      el.href = this.config.portalUrl;
      el.target = '_blank';
      el.rel = 'noopener';
    });
  },

  setupQRCheckIn() {
    document.querySelectorAll('[data-gymos-qr]').forEach(container => {
      const checkInUrl = this.config.portalUrl + '?action=checkin&gym=' + encodeURIComponent(this.config.gymName);
      const qrApiUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(checkInUrl);
      container.innerHTML = '<div style="text-align:center;padding:20px;"><img src="' + qrApiUrl + '" alt="QR Code for Check-in" style="width:200px;height:200px;border-radius:12px;background:#fff;padding:10px;box-shadow:0 4px 20px rgba(0,0,0,0.1);" /><p style="margin-top:12px;font-size:14px;color:#666;">Scan to check in</p></div>';
    });
  },

  setupDashboardLink() {
    document.querySelectorAll('[data-gymos-dashboard]').forEach(el => {
      el.href = this.config.dashboardUrl;
      el.target = '_blank';
      el.rel = 'noopener';
    });
  },

  injectPoweredBy() {
    if (document.querySelector('[data-gymos-powered]')) return;
    const badge = document.createElement('div');
    badge.setAttribute('data-gymos-powered', '');
    badge.innerHTML = '<a href="https://somilsharma2000.github.io/beyond-pixells/" target="_blank" rel="noopener" style="position:fixed;bottom:16px;right:16px;background:#0A0E27;color:#0066FF;padding:8px 16px;border-radius:8px;font-size:12px;font-family:Inter,sans-serif;font-weight:600;text-decoration:none;box-shadow:0 4px 20px rgba(10,14,39,0.3);z-index:9998;border:1px solid rgba(0,102,255,0.2);transition:all 0.3s ease;">⚡ Powered by Gym OS</a>';
    document.body.appendChild(badge);
  },

  injectDemoBanner() {
    if (document.querySelector('[data-gymos-banner]')) return;
    if (!this.config.isDemo) return;
    const banner = document.createElement('div');
    banner.setAttribute('data-gymos-banner', '');
    banner.innerHTML = '<div style="background:linear-gradient(135deg,#0A0E27 0%,#1a1e3a 100%);color:#fff;text-align:center;padding:10px 16px;font-size:13px;font-family:Inter,sans-serif;position:sticky;top:0;z-index:9999;display:flex;align-items:center;justify-content:center;gap:8px;border-bottom:1px solid rgba(0,102,255,0.3);"><span>⚡ This is a demo website built with <b style="color:#0066FF;">Gym OS</b> by Beyond Pixels</span><a href="https://somilsharma2000.github.io/beyond-pixells/" target="_blank" rel="noopener" style="color:#0066FF;text-decoration:none;font-weight:600;border-bottom:1px solid #0066FF;">Get one for your gym →</a></div>';
    document.body.insertBefore(banner, document.body.firstChild);
  },
};

if (typeof window.GymOSConfig !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() { GymOS.init(window.GymOSConfig); });
}
