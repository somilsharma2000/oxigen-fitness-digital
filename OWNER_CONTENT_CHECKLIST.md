# Owner Content Checklist

This website is ready for owner-approved content. Do not publish a field until the gym owner has confirmed it in writing.

| Public area | Required owner-approved content | Current state |
|---|---|---|
| Contact | Phone, WhatsApp number, monitored email, physical address and operating hours. | Not supplied; intentionally hidden. |
| Social | Instagram/Facebook URLs controlled by the business. | Not supplied; intentionally disabled. |
| Trainers | Full name, public role, verified qualifications, short biography, approved photo and profile order. | Not supplied; configuration placeholder only. |
| Facilities | Exact equipment, zones, shower/changing access, parking, accessibility and any restrictions. | Not supplied; no facility claim is published. |
| Memberships | Plan name, inclusive/exclusive taxes, price, billing cadence, commitment, cancellation/freezing terms, joining fee, availability and legal approval. | Not supplied; no price or plan promise is published. |
| Classes | Current timetable, booking rules, capacity, waiting-list policy and trainer assignment. | Not supplied; the site asks the club for current availability. |

## Safe configuration sequence

Update the Oxigen tenant’s public settings in Gym OS for basic contact and social actions. Maintain the detailed approved copy in this repository or a future CMS source, review it with the owner, then deploy the new commit. Never place provider keys, staff credentials, member data or QR data in `site.config.js`.
