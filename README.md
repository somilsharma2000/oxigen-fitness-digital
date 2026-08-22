# Oxigen Fitness Public Website

This repository is a separate static, deployable Oxigen public website. It deliberately contains no private member data, staff credentials, database credentials, QR payloads or tenant IDs.

## Included public sections

The website contains Club, Training, Classes, Memberships, Trainers, Facilities, Trial Journey, Contact, WhatsApp/Instagram configuration hooks, Member Experience Preview and an enquiry/trial form.

## Connection to Gym OS

Copy `config.example.js` to `site.config.js` and configure `apiBaseUrl` and `publicSlug`. The form posts to the Gym OS public enquiry endpoint. Gym OS resolves the public slug server-side, normalizes duplicate contact data, keeps the lead inside its tenant scope and creates the follow-up flow. Browser code never selects a database tenant ID, staff member, or role.

The destination Gym OS must configure `PUBLIC_SITE_ALLOWED_ORIGINS` to include the deployed website origin before cross-origin browser submissions will work. Contact, social, address and pricing details stay hidden until they are configured and approved through Gym OS.

## Local preview

Serve this folder with any static web server. No build process or secrets are required. A connection error is shown honestly if the Gym OS public configuration is unavailable.

## Handover

Before launch, set the approved public content and contact links in the Oxigen tenant configuration, configure CORS origin allow-listing on Gym OS, submit a trial request from the deployed site, confirm that it appears in Lead CRM/Rescue Queue, then publish the static site through GitHub Pages or another static host.
