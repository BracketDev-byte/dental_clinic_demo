<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-agent-rules -->

# FULL PROJECT BRIEF — PREMIUM DENTAL CLINIC WEBSITE + CUSTOM CMS DASHBOARD

Build a complete premium dental clinic website in **Next.js** with a custom database-backed CMS/admin dashboard.

This is a portfolio/demo project intended to showcase a high-end **Custom Fullstack App** service for private clinics.

The project must feel like a professionally commissioned clinic website, not a generic template or AI-generated landing page.

---

# 1. IMPORTANT DESIGN INSTRUCTIONS

I will provide **3 separate website design inspirations**.

Study all three and combine their strongest ideas into **one coherent original design system**.

Do NOT simply recreate one reference.

Use the references for:

- page composition
- visual hierarchy
- section structure
- spacing
- card treatment
- navigation treatment
- imagery placement
- typography hierarchy
- content density
- interaction ideas
- layout ideas
- editorial composition

The final website should look like one intentionally designed product.

Do not randomly mix visual styles from the references.

---

# 2. PROVIDED DESIGN SYSTEM

Use this color palette only as the foundation:

```text
#FFFFFF
#E0FFFF
#AFEEEE
#B0E0E6
#ADD8E6
```

The website should primarily use white and very light cyan/blue backgrounds.

The stronger blues should be used strategically for:

- accents
- buttons
- borders
- highlighted cards
- icon containers
- section backgrounds
- hover states
- visual hierarchy

Do not make every section blue.

Maintain generous white space.

The overall aesthetic should communicate:

- clean
- premium
- calm
- medical
- trustworthy
- contemporary
- friendly
- sophisticated

Avoid the stereotypical cheap medical website appearance.

---

# 3. TYPOGRAPHY

Use:

**Montserrat**

- **Google Sans**

Use them intentionally rather than interchangeably.

Suggested direction:

- Montserrat for major headings, display typography, CTAs, numbers and important labels.
- Google Sans for body copy, navigation, form labels, descriptions and supporting text.

Create a consistent responsive type scale.

Do not make every heading excessively large.

---

# 4. IMAGE POLICY — VERY IMPORTANT

**DO NOT GENERATE ANY AI IMAGES.**

Do not add random Unsplash images.

Do not add fake stock image URLs.

Wherever an image is required, create the proper image container/component and insert a clear code comment such as:

```tsx
{
  /* TODO: Replace with clinic hero image URL */
}
```

or:

```tsx
{
  /* TODO: Add dentist portrait image URL */
}
```

or:

```tsx
{
  /* TODO: Add before-treatment image URL */
}
```

or:

```tsx
{
  /* TODO: Add after-treatment image URL */
}
```

Use a neutral placeholder container where necessary so the layout remains visible during development.

Every image that will ultimately be editable through the CMS must already be modeled as editable content.

---

# 5. TECH STACK

Use the existing project setup.

Project architecture should be compatible with:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Neon PostgreSQL
- Drizzle ORM
- Zod
- Server Components where appropriate
- Server Actions or secure Route Handlers for mutations

Prefer Server Components for data rendering unless client-side interactivity is actually required.

Do not unnecessarily convert entire pages into Client Components.

---

# 6. PROJECT PURPOSE

This demo must prove that I can build BOTH:

1. a polished custom clinic website
2. a custom CMS/dashboard that allows the clinic owner to manage the website without touching code

The public website must render its editable content from the database.

Do not hardcode content that has been identified as CMS-managed.

---

# 7. AUTHENTICATION / SECURITY SCOPE

**DO NOT IMPLEMENT AUTHJS, BETTER AUTH, CLERK, OAUTH, RBAC OR A FULL AUTHENTICATION SYSTEM.**

This is a portfolio demo.

The dashboard will use the project's existing/simple private access mechanism.

Keep all:

- database writes
- administrative mutations
- secrets
- database credentials

server-side.

Never expose database credentials or administrative secrets to client components.

Validate mutation input with Zod.

Public-facing website routes should never expose administrative write functionality.

---

# 8. CLINIC BRAND

Create a realistic fictional premium private dental clinic brand.

The name should sound suitable for a modern private clinic.

Do not use childish or gimmicky names.

Temporary example if needed:

**Pearl Dental & Wellness**

However, structure branding information so it is editable from the CMS.

Editable brand information should include:

- clinic name
- short clinic name
- tagline
- logo URL
- favicon URL if applicable
- primary phone number
- secondary phone number
- WhatsApp number
- primary email
- booking email
- street/location text
- Google Maps URL
- Google Maps embed URL
- opening hours
- social media links

---

# 9. PUBLIC WEBSITE STRUCTURE

Create approximately **6 major public pages plus supporting dynamic pages**.

Main navigation:

```text
Home
About
Treatments
Our Dentists
Smile Gallery
Blog
Contact
Book Appointment
```

The primary CTA should be:

**Book Appointment**

Secondary CTA may use:

**WhatsApp Us**

---

# 10. HOME PAGE

The homepage must be highly polished and conversion-oriented.

Suggested section order:

## Section 1 — Announcement / Utility Bar

Optional narrow top bar.

Editable content:

- short announcement
- phone
- opening hours
- WhatsApp link

Admin should be able to enable/disable it.

---

## Section 2 — Header / Navigation

Include:

- logo
- navigation
- phone/contact option
- Book Appointment CTA
- responsive mobile navigation

Navigation content can remain structurally coded, but branding/contact information must come from CMS data.

---

## Section 3 — Hero

Build a premium editorial hero based on the provided inspiration.

CMS editable:

- eyebrow text
- headline
- highlighted headline text if design uses one
- subtitle
- primary CTA label
- primary CTA destination
- secondary CTA label
- secondary CTA destination
- hero image
- optional supporting badge/stat
- section visibility

Leave image URL placeholder comments.

---

## Section 4 — Trust / Clinic Statistics

Examples:

- Years of experience
- Happy patients
- Treatments offered
- Patient rating

All values and labels must be CMS editable.

Do not invent absurd numbers.

---

## Section 5 — Introduction / About Preview

Editable:

- eyebrow
- heading
- description
- supporting paragraphs
- image
- CTA

Links to About page.

---

## Section 6 — Featured Treatments

Render selected treatments from the database.

Each treatment should have:

- name
- slug
- short description
- icon or image
- category
- featured status
- CTA
- sort order

Display approximately 4–6 featured services.

---

## Section 7 — Why Choose Us

Editable CMS section containing multiple feature cards.

Possible content themes:

- modern equipment
- personalised treatment
- experienced clinicians
- comfortable environment
- transparent treatment planning
- convenient appointments

Each item:

- title
- description
- optional icon identifier

---

## Section 8 — Featured Dentist / Team

Render selected team members from the database.

Include:

- image
- name
- qualification
- professional title
- short introduction
- CTA to team profile

---

## Section 9 — Before & After / Smile Transformations

This must be database driven.

Create comparison cards containing:

- case title
- treatment/service
- short description
- before image
- after image
- optional patient label
- featured toggle
- display order

Do not generate the images.

Use clearly labeled placeholders.

The UI can use:

- side-by-side comparison
- slider comparison

depending on what best fits the supplied design references.

---

## Section 10 — Testimonials / Patient Reviews

Database-driven carousel/grid.

Each review should support:

- patient display name
- review
- rating
- treatment received
- optional image
- source, e.g. Google
- featured
- published/unpublished
- sort order

Homepage should display featured reviews.

---

## Section 11 — Clinic Experience / Facilities

Optional visually rich section.

Editable:

- heading
- copy
- multiple clinic images
- feature bullets

All images remain placeholders until supplied.

---

## Section 12 — Booking CTA

Strong conversion section.

Editable:

- heading
- subtitle
- CTA label
- contact method
- background image if applicable

---

## Section 13 — Latest Blog Articles

Render latest published posts dynamically.

Show approximately three.

---

## Section 14 — Contact Preview

Include dynamically managed:

- address
- telephone
- WhatsApp
- email
- opening hours
- map
- CTA

---

## Section 15 — Footer

CMS controlled:

- clinic details
- logo
- short description
- phone
- WhatsApp
- email
- address
- opening hours
- social links

Include useful navigation groups.

---

# 11. ABOUT PAGE

Create a complete About page.

Sections may include:

### Page hero

Editable:

- eyebrow
- title
- subtitle
- image

### Clinic story

Editable rich content.

### Clinic philosophy

Editable cards/items.

### Mission / values

Database/CMS managed.

### Clinic environment

Gallery with editable image URLs.

### Technology / equipment

Editable content cards.

### Team preview

Dynamically fetch team members.

### Testimonials

Reuse review database.

### Final booking CTA

CMS editable.

---

# 12. TREATMENTS PAGE

Create a polished treatment directory.

Treatments must come from the database.

Allow organisation by categories.

Examples could include:

- General Dentistry
- Cosmetic Dentistry
- Restorative Dentistry
- Preventive Dentistry

Do not assume these exact categories are required—make categories database-driven.

Treatment cards should contain:

- name
- image
- excerpt
- category
- CTA

---

# 13. INDIVIDUAL TREATMENT PAGE

Dynamic route:

```text
/treatments/[slug]
```

Each treatment must support:

- title
- slug
- category
- hero image
- short description
- full description/content
- benefits
- procedure/process
- suitability information
- FAQ
- optional price text
- optional treatment duration
- CTA heading
- CTA text
- SEO title
- SEO description
- featured status
- published status

Content should be sufficiently flexible for different services.

Do not hardcode every treatment page independently.

---

# 14. OUR DENTISTS / TEAM PAGE

Database-driven team directory.

Each professional can contain:

- full name
- slug
- portrait
- role
- qualifications
- professional registration text
- specialties
- short bio
- full biography
- years of experience
- social/profile links if relevant
- featured status
- display order

---

# 15. DENTIST PROFILE PAGE

Dynamic route:

```text
/team/[slug]
```

Create an elegant profile page.

Render all appropriate database content.

Include:

- portrait
- professional role
- qualifications
- biography
- special interests
- treatments associated with dentist if implemented
- booking CTA

---

# 16. SMILE GALLERY

Create a dedicated before-and-after case-study page.

Database-driven.

Allow optional filtering by treatment.

Each case should support:

- title
- slug if detail pages are implemented
- treatment association
- before image
- after image
- short description
- optional longer case description
- featured
- published
- sort order

Do not include sensitive personal patient information.

Use fictional/demo case labels only.

---

# 17. BLOG

Create:

```text
/blog
/blog/[slug]
```

CMS-managed blog posts.

Each article should support:

- title
- slug
- excerpt
- cover image
- content/body
- author
- category
- tags if useful
- published date
- updated date
- published/draft state
- featured
- SEO title
- SEO description

Blog listing should support good responsive card layouts.

Individual articles should have readable editorial typography.

---

# 18. CONTACT PAGE

Create a complete contact page.

Render CMS-managed:

- address
- phone
- WhatsApp
- email
- opening hours
- map embed/link

Include contact enquiry form.

Fields:

- name
- email
- phone
- enquiry subject
- message
- consent checkbox if appropriate

Save submitted enquiries into the database.

Do not merely console.log submissions.

Show proper success/error feedback.

---

# 19. BOOK APPOINTMENT PAGE

This should be more sophisticated than a generic contact form.

Fields can include:

- full name
- phone
- email
- preferred contact method
- treatment/service of interest
- preferred date
- preferred time or time period
- new/existing patient
- optional message
- consent

Save enquiries to database.

This does NOT need to be a full calendar scheduling engine.

This is an **appointment request system**, not guaranteed real-time appointment slot booking.

Dashboard users must be able to view and update booking requests.

Possible statuses:

```text
new
contacted
confirmed
completed
cancelled
```

---

# 20. CUSTOM ADMIN/CMS DASHBOARD

Create a polished custom dashboard under:

```text
/dashboard
```

The dashboard should look intentionally designed for the clinic rather than like an off-the-shelf generic admin template.

It should be fully responsive for desktop/tablet and reasonably usable on mobile.

---

# 21. DASHBOARD HOME

Show useful overview cards such as:

- total treatments
- published blog posts
- unread contact enquiries
- new booking requests
- total reviews
- total smile cases

Also show:

### Recent appointment requests

### Recent enquiries

### Recently edited content

if practical.

Do not create meaningless fake analytics.

---

# 22. DASHBOARD SIDEBAR

Suggested structure:

```text
Overview

Website
  Home Page
  About Page
  Global Content

Treatments
  All Treatments
  Categories
  Add Treatment

Team
  All Team Members
  Add Team Member

Smile Gallery
  All Cases
  Add Case

Reviews
  All Reviews
  Add Review

Blog
  All Posts
  Categories
  Add Post

Leads
  Appointment Requests
  Contact Enquiries

Media / Images

Settings
  Clinic Information
  Opening Hours
  Social Links
  SEO
```

Do not create unnecessary pages simply because they appear here.

Keep related settings logically grouped.

---

# 23. CMS EDITABILITY PRINCIPLE

As a general rule:

**Anything a normal clinic owner might reasonably want to change should not require editing source code.**

This includes:

- headings
- subtitles
- paragraph copy
- section descriptions
- CTA labels
- CTA destinations
- image URLs
- card content
- services
- staff
- reviews
- before/after cases
- blog posts
- contact information
- opening hours
- social links
- location
- homepage statistics
- FAQs
- SEO content
- section visibility where appropriate

Do NOT create separate database columns for every tiny stylistic word if a structured content model is more sensible.

Use sensible CMS architecture.

---

# 24. HOMEPAGE CONTENT MANAGEMENT

Create dashboard editing controls for homepage sections.

For sections with simple text, use a structured homepage/settings data model.

Examples:

- hero eyebrow
- hero title
- hero subtitle
- CTA content
- About preview content
- Why Choose Us heading
- testimonials heading
- gallery heading
- booking CTA heading
- contact heading

For repeatable structured items, create proper database tables instead.

Examples:

- treatments
- reviews
- statistics
- team members
- before/after cases

Do not store all website content in one giant JSON blob.

---

# 25. SECTION VISIBILITY

For major optional homepage sections, support an enabled/disabled toggle where useful.

For example:

```text
showAnnouncement
showStatistics
showFeaturedTreatments
showSmileGallery
showTestimonials
showLatestBlog
```

Do not make essential structural elements like navigation arbitrarily removable if doing so would damage the site.

---

# 26. DASHBOARD CRUD UX

Every major CMS collection should have:

### List screen

with:

- title/name
- status
- relevant category
- last updated
- actions

### Create screen

### Edit screen

### Delete action

Deletion should require confirmation.

Where appropriate support:

- published/draft
- featured
- display order

Provide clear toast/status feedback.

Do not use browser `alert()` for normal application UX.

---

# 27. MEDIA HANDLING

Do not implement a complicated media hosting platform unless one already exists in the project.

Store image URLs in the database.

Provide dashboard URL fields and image preview areas.

Every image form should clearly identify the expected image.

Examples:

```text
Hero image URL
Dentist portrait URL
Before image URL
After image URL
Blog cover image URL
```

I will later supply the actual hosted image URLs.

---

# 28. REVIEWS MANAGEMENT

Dashboard should allow:

- creating reviews
- editing reviews
- deleting reviews
- publishing/unpublishing
- selecting featured reviews
- changing order

Fields:

```text
patientName
reviewText
rating
treatment
source
imageUrl
featured
published
sortOrder
```

---

# 29. BEFORE / AFTER MANAGEMENT

Dashboard must make this particularly easy.

Fields:

```text
title
treatmentId
description
beforeImageUrl
afterImageUrl
featured
published
sortOrder
```

Image preview should appear when URLs are supplied.

---

# 30. TREATMENT MANAGEMENT

Dashboard treatment editor should support:

```text
name
slug
category
shortDescription
fullContent
imageUrl
benefits
procedureSteps
suitabilityContent
priceText
durationText
featured
published
sortOrder
seoTitle
seoDescription
```

Use a practical data structure for arrays such as benefits or procedure steps.

---

# 31. TEAM MANAGEMENT

Fields should include:

```text
name
slug
role
qualifications
portraitUrl
shortBio
fullBio
specialties
yearsExperience
registrationInfo
featured
published
sortOrder
```

---

# 32. BLOG MANAGEMENT

Provide straightforward CMS CRUD.

Blog body does not need an enormous Notion-style block editor.

Use a practical rich-text or Markdown-compatible approach appropriate to the current project.

Do not introduce a huge editor dependency unless necessary.

---

# 33. LEADS / APPOINTMENTS DASHBOARD

Create separate views for:

### Appointment requests

and:

### General enquiries

Appointment list should show:

- patient name
- service
- preferred date
- phone/email
- status
- submitted date

Allow administrator to update status.

Contact enquiries should support:

```text
new
read
replied
archived
```

No email sending integration is required unless already available.

---

# 34. DATABASE DESIGN

Create a clean relational Drizzle/Postgres schema.

Likely entities include:

```text
siteSettings
pageContent
homepageSections or homepageContent
clinicStats
treatmentCategories
treatments
teamMembers
reviews
smileCases
blogCategories
blogPosts
appointmentRequests
contactEnquiries
```

Add other tables only when genuinely useful.

Use:

- primary keys
- createdAt
- updatedAt
- appropriate indexes
- unique slugs
- foreign keys where appropriate
- sensible cascading behaviour

Do not over-normalise trivial content.

Do not create a massive enterprise schema.

---

# 35. DRIZZLE

Create properly typed Drizzle schemas and inferred TypeScript types.

Implement reusable database access functions.

Avoid scattering raw database queries throughout random React components.

Prefer structure similar to:

```text
lib/
  db/
    index.ts
    schema/
    queries/
    mutations/
```

Adapt to the project's existing architecture rather than forcing this exact folder structure if another clean structure already exists.

---

# 36. VALIDATION

Use Zod for administrative form mutations and public form submissions.

Do not trust client data.

Provide useful validation messages.

Examples:

- required content
- valid URL format
- valid email
- review rating 1–5
- valid slug
- required before/after URLs when publishing a case

---

# 37. DATA FETCHING

Public pages should fetch server-side directly from the database where appropriate.

Avoid unnecessary client-side `useEffect()` fetching.

Use caching/revalidation appropriately if the current application architecture supports it.

Dashboard forms can use server actions or route handlers.

Keep implementation easy to understand and maintain.

---

# 38. EMPTY STATES

The UI must remain polished when database collections are empty.

Dashboard examples:

```text
No treatments have been added yet.
Add your first treatment.
```

Public website sections with no published data should either:

- hide themselves gracefully, or
- display an intentional fallback where appropriate.

Never display broken cards containing undefined values.

---

# 39. LOADING / ERROR STATES

Add polished loading states where users will encounter asynchronous behaviour.

Handle errors gracefully.

Do not expose raw database errors to public users.

---

# 40. RESPONSIVE DESIGN

Every public page and dashboard screen must be responsive.

Pay particular attention to:

- navigation
- hero
- tables
- forms
- image comparisons
- cards
- dashboard sidebar
- long headings

Do not merely shrink desktop layouts.

---

# 41. ACCESSIBILITY

Use:

- semantic HTML
- labels for form controls
- keyboard-accessible interactive elements
- meaningful button text
- appropriate heading hierarchy
- sufficient contrast
- alt text fields for CMS images where practical

Do not sacrifice accessibility for aesthetics.

---

# 42. SEO

The public website should have proper technical SEO.

Support:

- page titles
- descriptions
- canonical structure where appropriate
- OpenGraph metadata
- treatment metadata
- blog metadata
- team profile metadata if appropriate
- sitemap-compatible routes
- robots configuration

CMS should expose SEO title/description fields for major dynamic content.

---

# 43. PERFORMANCE

The website should demonstrate the package promise of a fast modern website.

Avoid:

- huge dependencies
- excessive client JavaScript
- unnecessary animation libraries
- giant unoptimised images
- loading all database data on every page
- excessive network requests

Use Next.js features intelligently.

---

# 44. ANIMATION

Use subtle polished interactions only.

Examples:

- tasteful entrance animation
- card hover
- image transition
- navigation transition
- accordion transition
- button interaction

Do NOT make every element fly onto the screen.

The clinic should feel calm and premium.

---

# 45. SAMPLE DATA

Seed enough realistic fictional data so the completed demo looks populated.

For example:

- 6–10 treatments
- 3–5 treatment categories
- 3–4 dentists/team members
- 5–8 reviews
- 4–6 smile transformations
- 4–6 blog posts
- homepage statistics
- complete clinic information

Do NOT create fake patient medical records.

Do NOT use real identifiable patients.

Use generic fictional names/details.

Do not generate image assets.

Image fields should retain placeholders/comments until I provide URLs.

---

# 46. CONTENT QUALITY

Do not fill the public site with obvious lorem ipsum.

Generate reasonable fictional clinic copy so that layout and content hierarchy can be evaluated.

Keep clinical claims conservative.

Avoid claims such as:

- guaranteed results
- completely painless
- 100% success
- best dentist in the country

The copy should sound professional, approachable and credible.

---

# 47. PACKAGE ALIGNMENT

This project represents the capabilities of my:

**Custom Store / Fullstack App package**

but adapted to a private clinic.

Therefore this demo needs to visibly demonstrate:

- custom frontend
- database connection
- custom CMS/admin dashboard
- editable structured content
- dynamic website rendering
- lead/enquiry storage
- appointment request management
- fullstack CRUD
- production-quality responsive UI

Do NOT add an online shop merely to satisfy the package name.

Do NOT add Mobile Money.

Do NOT implement user/client authentication for this demo.

The reusable fullstack capability is what matters.

---

# 48. WHAT SHOULD FEEL IMPRESSIVE TO A CLIENT

A visitor should be able to see the public site and think:

> This looks considerably better than the typical local business website.

Then after seeing the dashboard they should understand:

> I wouldn't need to call the developer every time I want to change a service, dentist, image, review, case study, article or piece of website content.

That is the primary selling point of the demo.

---

# 49. DEVELOPMENT APPROACH

Do not attempt to rewrite the entire application blindly in one enormous output.

Work systematically.

First inspect:

- existing Next.js architecture
- existing components
- existing design tokens
- the three provided design references
- existing dependencies
- existing database configuration

Then establish the required architecture.

Work in logical stages:

1. global design system
2. database schema
3. seed/sample data
4. public layout
5. homepage
6. dynamic content pages
7. forms
8. dashboard layout
9. dashboard CRUD
10. frontend/database wiring
11. responsive polish
12. validation/error handling
13. final consistency check

Preserve working code wherever possible.

Do not unnecessarily rewrite components that already function correctly.

---

# 50. FINAL QUALITY CHECK

Before considering the project complete, check that:

- every public page renders
- every dynamic slug works
- dashboard lists work
- create works
- edit works
- delete works
- published/draft behaviour works
- featured selections work
- homepage content is editable
- contact details are editable
- images are editable through URLs
- before/after content works
- treatments are editable
- reviews are editable
- team members are editable
- blog posts are editable
- appointment submissions enter the database
- enquiries enter the database
- lead statuses can be updated
- no AI-generated images were inserted
- no random stock images were inserted
- no secrets are client exposed
- mobile layouts work
- TypeScript passes
- there are no obvious console/runtime errors
- database queries are typed
- unused/dead components are removed
- visual language remains faithful to the combined inspiration
- provided fonts and color palette are respected

The end result should be a **portfolio-quality premium dental clinic website with a bespoke CMS**, not merely a homepage attached to an admin template.

<!-- END:project-agent-rules -->
