/* ============================================================
   OXIGEN FITNESS — SITE CONFIG (owner-editable)
   Every value the owner can change without code lives here.
   Fill real values, then set isDemo:false at the bottom of index.html.
   Full slot list: OWNER_CONTENT_CHECKLIST.md
   ============================================================ */
window.OXIGEN_SITE_CONFIG = {
  brandName: "Oxigen Fitness",
  publicSlug: "oxigen-fitness",
  locationLabel: "JAIPUR",
  tagline: "Member-led training",
  description: "A connected fitness club in Jaipur: purposeful programming, practical coaching, and a Gym OS member experience — QR check-in, WhatsApp-first support, instant booking.",

  /* --- Contact (real values from the club) --- */
  whatsapp: "917737077479",           // club WhatsApp, country code, no +
  whatsappName: "Oxigen Fitness",
  whatsappPreFill: "Hi Oxigen Fitness! I'd like to know more about memberships and a trial visit.",
  instagram: "",                      // full URL, empty = hidden
  email: "",                          // empty = hidden
  address: "Oxigen Fitness Studio, Jaipur",
  phone: "+91 77370 77479",
  mapsUrl: "",                        // Google Maps link, empty = hidden

  /* --- Google reviews (leave 0 to hide the badge entirely) --- */
  googleRating: 0,                    // e.g. 4.8
  googleReviewCount: 0,               // e.g. 214

  /* --- Trial pass via UPI (leave upiId empty to hide the pay button) --- */
  upiId: "",                          // e.g. "oxigenfitness@upi"
  trialPass: { label: "Trial Pass", price: 0, note: "One full-day access pass" }, // price 0 = free trial

  /* --- Membership plans (₹, owner-approved only) --- */
  plans: [
    /* Example shape — owner fills real plans before go-live:
    { kicker: "MONTHLY", name: "Club Pass", price: "1499", period: "/month", popular: false,
      desc: "Full floor access + Gym OS portal",
      features: ["Full training floor access", "Touchless QR check-in", "Gym OS member portal", "WhatsApp support"] } */
  ],

  /* --- Coaches (real people only — empty = generic team card, never invented) --- */
  trainers: [
    /* Example shape:
    { role: "HEAD COACH", name: "Real Name", bio: "Real credentials", tags: ["Strength", "Form"] } */
  ],

  /* --- Timetable (rendered as filterable cards) --- */
  classes: [
    { category: "Strength",     name: "Foundations",    time: "Mon, Wed, Fri • 07:00 & 18:00", desc: "Coach-led strength work focused on fundamental barbell mechanics, dumbbell control, and core stability." },
    { category: "Conditioning", name: "Engine",         time: "Tue, Thu • 06:30 & 17:30 | Sat • 09:00", desc: "A paced, scalable aerobic conditioning session on rowers, SkiErgs, and bodyweight intervals." },
    { category: "Movement",     name: "Reset",          time: "Wed, Sun • 10:00 & 16:00", desc: "Deep joint mobility, active recovery, postural alignment, and guided breathwork." },
    { category: "Athletic",     name: "Athletic Performance", time: "Mon, Thu • 19:00", desc: "Explosive power, plyometrics, agility, and rotational core strength." },
    { category: "Functional",   name: "Core & Alignment", time: "Tue, Sat • 08:00", desc: "Posterior chain work, anti-rotational strength, and postural mechanics for busy professionals." },
    { category: "Hybrid",       name: "Weekend Sweat",  time: "Sat, Sun • 10:30", desc: "High-energy team training: partner circuits, kettlebell complexes, and aerobic intervals." }
  ]
};
