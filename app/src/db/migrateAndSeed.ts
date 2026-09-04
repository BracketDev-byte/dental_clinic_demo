import { neon } from '@neondatabase/serverless';

function cleanDbUrl(url?: string): string {
  if (!url) return '';
  let cleaned = url.trim();
  if (cleaned.startsWith('psql ')) {
    cleaned = cleaned.replace(/^psql\s+['\"]?/, '').replace(/['\"]?$/, '');
  }
  return cleaned;
}

export async function runMigrationAndSeed() {
  const dbUrl = cleanDbUrl(process.env.DATABASE_URL);
  if (!dbUrl) {
    console.warn('No DATABASE_URL found. Skipping database migration.');
    return;
  }

  const sql = neon(dbUrl);

  console.log('Creating tables if they do not exist...');

  await sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      id SERIAL PRIMARY KEY,
      clinic_name TEXT NOT NULL DEFAULT 'Pearl Dental & Implant Clinic',
      short_name TEXT NOT NULL DEFAULT 'Pearl Dental',
      tagline TEXT NOT NULL DEFAULT 'Gentle, Honest Dental Care in Kampala',
      announcement TEXT NOT NULL DEFAULT 'Routine Consultations and Dental Hygiene Visits Available Monday to Saturday',
      announcement_enabled BOOLEAN NOT NULL DEFAULT true,
      phone_primary TEXT NOT NULL DEFAULT '+256 700 123 456',
      phone_secondary TEXT NOT NULL DEFAULT '+256 772 987 654',
      whatsapp_number TEXT NOT NULL DEFAULT '+256700123456',
      email_primary TEXT NOT NULL DEFAULT 'care@pearldental.ug',
      address TEXT NOT NULL DEFAULT 'Plot 14 Acacia Avenue, Kololo, Kampala, Uganda',
      google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=Kololo,Kampala,Uganda',
      opening_hours TEXT NOT NULL DEFAULT 'Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 3:00 PM | Sun: Emergency On-Call',
      emergency_note TEXT NOT NULL DEFAULT 'Sudden toothache or dental injury? WhatsApp or call our Kampala emergency line directly.',
      logo_url TEXT DEFAULT '',
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS clinic_stats (
      id SERIAL PRIMARY KEY,
      label TEXT NOT NULL,
      value TEXT NOT NULL,
      description TEXT DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      published BOOLEAN NOT NULL DEFAULT true
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS treatment_categories (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS treatments (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      category_id INTEGER REFERENCES treatment_categories(id) ON DELETE SET NULL,
      short_description TEXT NOT NULL,
      full_content TEXT NOT NULL,
      image_url TEXT DEFAULT '',
      benefits JSONB DEFAULT '[]'::jsonb,
      procedure_steps JSONB DEFAULT '[]'::jsonb,
      suitability_content TEXT DEFAULT '',
      price_text TEXT DEFAULT '',
      duration_text TEXT DEFAULT '',
      featured BOOLEAN NOT NULL DEFAULT false,
      published BOOLEAN NOT NULL DEFAULT true,
      sort_order INTEGER NOT NULL DEFAULT 0,
      seo_title TEXT DEFAULT '',
      seo_description TEXT DEFAULT '',
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS team_members (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL,
      qualifications TEXT NOT NULL,
      portrait_url TEXT DEFAULT '',
      short_bio TEXT NOT NULL,
      full_bio TEXT NOT NULL,
      specialties JSONB DEFAULT '[]'::jsonb,
      years_experience INTEGER NOT NULL DEFAULT 5,
      registration_info TEXT DEFAULT '',
      featured BOOLEAN NOT NULL DEFAULT false,
      published BOOLEAN NOT NULL DEFAULT true,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      patient_name TEXT NOT NULL,
      review_text TEXT NOT NULL,
      rating INTEGER NOT NULL DEFAULT 5,
      treatment TEXT DEFAULT 'General Dentistry',
      source TEXT DEFAULT 'Google Reviews',
      image_url TEXT DEFAULT '',
      featured BOOLEAN NOT NULL DEFAULT true,
      published BOOLEAN NOT NULL DEFAULT true,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS smile_cases (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      treatment TEXT NOT NULL,
      description TEXT NOT NULL,
      case_details TEXT DEFAULT '',
      before_image_url TEXT DEFAULT '',
      after_image_url TEXT DEFAULT '',
      patient_label TEXT DEFAULT 'Kampala Patient',
      featured BOOLEAN NOT NULL DEFAULT true,
      published BOOLEAN NOT NULL DEFAULT true,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      excerpt TEXT NOT NULL,
      cover_image_url TEXT DEFAULT '',
      content TEXT NOT NULL,
      author TEXT NOT NULL DEFAULT 'Pearl Dental Clinical Team',
      category TEXT NOT NULL DEFAULT 'Oral Health Advice',
      published BOOLEAN NOT NULL DEFAULT true,
      featured BOOLEAN NOT NULL DEFAULT false,
      published_date TIMESTAMP NOT NULL DEFAULT NOW(),
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS appointment_requests (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT DEFAULT '',
      preferred_contact TEXT NOT NULL DEFAULT 'WhatsApp',
      service TEXT NOT NULL DEFAULT 'General Checkup',
      preferred_date TEXT DEFAULT '',
      preferred_time TEXT DEFAULT 'Morning (9:00 AM - 12:00 PM)',
      patient_type TEXT NOT NULL DEFAULT 'New Patient',
      message TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'new',
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS contact_enquiries (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL DEFAULT 'General Inquiry',
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS clinical_faqs (
      id SERIAL PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'General',
      sort_order INTEGER NOT NULL DEFAULT 0,
      published BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS homepage_sections (
      id SERIAL PRIMARY KEY,
      section_key TEXT NOT NULL UNIQUE,
      eyebrow TEXT DEFAULT '',
      title TEXT NOT NULL,
      subtitle TEXT DEFAULT '',
      description TEXT DEFAULT '',
      primary_cta_label TEXT DEFAULT '',
      primary_cta_url TEXT DEFAULT '',
      secondary_cta_label TEXT DEFAULT '',
      secondary_cta_url TEXT DEFAULT '',
      badge_text TEXT DEFAULT '',
      image_url TEXT DEFAULT '',
      secondary_image_url TEXT DEFAULT '',
      background_image_url TEXT DEFAULT '',
      visible BOOLEAN NOT NULL DEFAULT true,
      sort_order INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;

  // Ensure new image columns exist if table was already created
  await sql`ALTER TABLE homepage_sections ADD COLUMN IF NOT EXISTS image_url TEXT DEFAULT '';`;
  await sql`ALTER TABLE homepage_sections ADD COLUMN IF NOT EXISTS secondary_image_url TEXT DEFAULT '';`;
  await sql`ALTER TABLE homepage_sections ADD COLUMN IF NOT EXISTS background_image_url TEXT DEFAULT '';`;

  console.log('Tables created successfully. Checking if seeding is needed...');

  // Check if site_settings has row
  const settingsCount = await sql`SELECT count(*) FROM site_settings`;
  if (parseInt(settingsCount[0].count) === 0) {
    console.log('Seeding site_settings...');
    await sql`
      INSERT INTO site_settings (
        clinic_name, short_name, tagline, announcement, announcement_enabled,
        phone_primary, phone_secondary, whatsapp_number, email_primary,
        address, google_maps_url, opening_hours, emergency_note
      ) VALUES (
        'Pearl Dental & Implant Clinic',
        'Pearl Dental',
        'Gentle, Honest Dental Care in Kampala',
        'Routine Consultations and Dental Hygiene Visits Available Monday to Saturday',
        true,
        '+256 700 123 456',
        '+256 772 987 654',
        '+256700123456',
        'care@pearldental.ug',
        'Plot 14 Acacia Avenue, Kololo, Kampala, Uganda',
        'https://maps.google.com/?q=Acacia+Avenue,Kololo,Kampala,Uganda',
        'Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 3:00 PM | Sun: Emergency On-Call',
        'Sudden toothache or dental injury? WhatsApp or call our Kampala emergency line directly.'
      )
    `;
  }

  // Check stats
  const statsCount = await sql`SELECT count(*) FROM clinic_stats`;
  if (parseInt(statsCount[0].count) === 0) {
    console.log('Seeding clinic_stats...');
    await sql`
      INSERT INTO clinic_stats (label, value, description, sort_order) VALUES
      ('Years in Kampala', '12+', 'Continuous dental practice in Kololo', 1),
      ('Smiles Restored', '14,000+', 'Adult and pediatric patients treated', 2),
      ('Patient Trust', '98%', 'Patients who refer their family members', 3),
      ('Dental Specialists', '4', 'Surgeons, orthodontists and hygienists', 4)
    `;
  }

  // Categories
  const catCount = await sql`SELECT count(*) FROM treatment_categories`;
  if (parseInt(catCount[0].count) === 0) {
    console.log('Seeding treatment_categories...');
    await sql`
      INSERT INTO treatment_categories (name, slug, description, sort_order) VALUES
      ('Preventive & Hygiene', 'preventive-hygiene', 'Keeping teeth clean, preventing decay and stopping gum disease before it begins.', 1),
      ('Restorative & Pain Relief', 'restorative-pain-relief', 'Relieving tooth pain, treating deep cavities and restoring broken tooth structures.', 2),
      ('Cosmetic & Whitening', 'cosmetic-whitening', 'Fixing gaps, removing stubborn tea or fluorosis stains and shaping balanced smiles.', 3),
      ('Orthodontics & Aligners', 'orthodontics-aligners', 'Straightening crooked teeth, fixing bite alignments and closing spacing.', 4),
      ('Pediatric Dentistry', 'pediatric-dentistry', 'Gentle, friendly dental visits designed specifically for children and teenagers.', 5)
    `;
  }

  // Seed Treatments
  const treatCount = await sql`SELECT count(*) FROM treatments`;
  if (parseInt(treatCount[0].count) === 0) {
    console.log('Seeding treatments...');
    const catRows = await sql`SELECT id, slug FROM treatment_categories`;
    const catMap = Object.fromEntries(catRows.map((r: Record<string, unknown>) => [String(r.slug), Number(r.id)]));

    await sql`
      INSERT INTO treatments (
        name, slug, category_id, short_description, full_content,
        benefits, procedure_steps, suitability_content, price_text, duration_text,
        featured, published, sort_order, seo_title, seo_description
      ) VALUES
      (
        'Ultrasonic Scaling & Dental Polishing',
        'scaling-and-polishing',
        ${catMap['preventive-hygiene'] || null},
        'A gentle, thorough 45-minute treatment removing hardened calculus and stubborn tea stains that normal toothbrushing cannot clean.',
        'Why does regular scaling matter? Even with disciplined twice-daily brushing, minerals in saliva slowly harden dental plaque into calculus (tartar) around the gumline. Left uncleaned, this causes chronic gum bleeding, bad breath, and loose teeth over time. In our Kololo clinic, our dental hygienists use gentle ultrasonic water tips to loosen deposits without scratching tooth enamel. We follow with a fluoride polish that leaves your teeth smooth and fresh.',
        '["Removes hardened tartar and plaque safely", "Eliminates chronic bad breath caused by gum bacteria", "Stops bleeding gums and protects jawbone density", "Removes tea, coffee and surface tobacco discoloration"]'::jsonb,
        '[{"step": "Examination", "detail": "We examine your gums and teeth with gentle mirrors to identify calculus deposits."}, {"step": "Ultrasonic Cleaning", "detail": "High-frequency water vibrations gently dislodge hardened tartar without harming enamel."}, {"step": "Interdental Flossing & Polishing", "detail": "We clean tight spaces and buff surfaces with a mild pleasant paste."}, {"step": "Personalized Prevention Advice", "detail": "We show you practical brushing and flossing adjustments suitable for your mouth."}]'::jsonb,
        'Suitable for every adult and adolescent. We recommend scheduling this every six months to keep gums healthy and prevent costly dental problems.',
        'UGX 120,000',
        '45 minutes',
        true, true, 1,
        'Dental Scaling and Polishing in Kampala | Pearl Dental',
        'Professional ultrasonic scaling and polishing at Pearl Dental Kampala. Gentle gum cleaning and stain removal.'
      ),
      (
        'Tooth-Colored Aesthetic Fillings',
        'composite-fillings',
        ${catMap['restorative-pain-relief'] || null},
        'Durable, shade-matched resin fillings that stop cavity progression and restore the natural shape of your tooth with zero visible silver.',
        'How do we treat dental cavities? When tooth decay softens your enamel, it must be cleared before bacteria reach the inner pulp and cause an unbearable toothache. We remove all infected decay gently and rebuild the lost tooth structure using dental composite resin. The resin is carefully matched to your exact tooth shade, sculpted to restore natural chewing grooves, and cured instantly with LED light.',
        '["Seamless color match to your natural tooth shade", "Requires minimal removal of healthy tooth structure", "Bonds directly to enamel for long-lasting chewing strength", "Completely free of mercury and silver amalgam"]'::jsonb,
        '[{"step": "Gentle Numbing", "detail": "We apply local numbing so you feel zero sensation while we work."}, {"step": "Decay Removal", "detail": "The softened bacteria and decay are cleared thoroughly."}, {"step": "Shade Matching & Layering", "detail": "We select the composite color that matches your neighbouring enamel and apply it in layers."}, {"step": "Bite Check & Polish", "detail": "We check your bite to ensure chewing feels natural and smooth."}]'::jsonb,
        'Ideal for patients with minor to moderate cavities, chipped front edges, or those wanting to replace old dark silver fillings.',
        'From UGX 90,000',
        '40 - 50 minutes',
        true, true, 2,
        'Composite Dental Fillings in Kampala | Pearl Dental',
        'Natural-looking tooth-colored composite dental fillings in Kololo, Kampala. Long lasting and pain free.'
      ),
      (
        'Pain-Relieving Root Canal Therapy',
        'root-canal-treatment',
        ${catMap['restorative-pain-relief'] || null},
        'A tooth-saving procedure that cleans deep nerve infections, stops severe throbbing pain, and avoids the permanent loss of your natural tooth.',
        'Why choose a root canal over tooth extraction? Many patients believe pulling a painful tooth is the easiest solution, but losing a natural tooth causes neighbouring teeth to shift, damages chewing ability, and requires expensive bridge or implant replacements later. Root canal therapy removes the infected or inflamed nerve tissue inside the tooth canals, sterilizes the space with antibacterial rinses, and seals it completely. You keep your natural tooth in place for decades.',
        '["Immediately ends persistent toothaches and hot/cold sensitivity", "Preserves your natural tooth and normal chewing bite", "Prevents dangerous dental abscesses from spreading into the jaw", "Modern local anesthesia makes the procedure comfortable"]'::jsonb,
        '[{"step": "Precise Digital X-Ray", "detail": "We take an X-ray to examine the exact length and shape of the infected root canals."}, {"step": "Complete Numbing", "detail": "We ensure your tooth and surrounding gum are completely numb before starting."}, {"step": "Canal Disinfection", "detail": "Micro-instruments gently clear the infected nerve and disinfect the canals."}, {"step": "Hermetic Sealing", "detail": "The clean canals are filled with biocompatible gutta-percha to prevent reinfection."}]'::jsonb,
        'For patients experiencing deep throbbing toothaches, swelling around the root tip, or pain when biting down.',
        'From UGX 450,000',
        '60 - 90 minutes (1 - 2 visits)',
        true, true, 3,
        'Root Canal Treatment in Kampala | Pearl Dental',
        'Relieve severe tooth pain and preserve your natural tooth with gentle root canal treatment in Kampala.'
      ),
      (
        'Orthodontic Braces & Clear Aligners',
        'orthodontics-and-braces',
        ${catMap['orthodontics-aligners'] || null},
        'Custom treatment plans using traditional metal brackets, aesthetic ceramic braces, or clear removable aligners to straighten teeth and balance your bite.',
        'How does orthodontic treatment work? Crooked, crowded, or spaced teeth do not just affect your smile confidence; they also trap food particles and cause uneven tooth wear over the years. During your initial orthodontic consultation in Kampala, we assess your jaw alignment, take detailed impressions, and discuss whether clear aligners or fixed braces are best for your routine and budget.',
        '["Corrects crowding, gaps, and severe overbites", "Significantly easier to clean straight teeth, preventing gum disease", "Options include discreet ceramic brackets or clear aligners", "Structured installment payment plans available"]'::jsonb,
        '[{"step": "Smile Assessment", "detail": "We examine your bite, take clinical photographs and digital impressions."}, {"step": "Treatment Plan", "detail": "We show you how your teeth will move and provide an exact timeframe and cost."}, {"step": "Appliance Fitting", "detail": "Brackets or your first set of clear aligner trays are fitted comfortably."}, {"step": "Monthly Checkups", "detail": "Quick 20-minute monthly reviews to monitor progress and adjust wire tension."}]'::jsonb,
        'Suitable for teenagers and adults of any age seeking a healthier, straight smile.',
        'Consultation UGX 80,000',
        'Monthly visits over 12 - 24 months',
        true, true, 4,
        'Braces & Orthodontics in Kampala | Pearl Dental',
        'Professional orthodontic treatment and clear aligners in Kampala. Flexible payment options.'
      ),
      (
        'Dental Crowns & Fixed Bridges',
        'crowns-and-bridges',
        ${catMap['restorative-pain-relief'] || null},
        'Custom-crafted porcelain and zirconia caps that protect heavily broken teeth or fill empty gaps where teeth have been pulled.',
        'When do you need a dental crown? If a tooth has had a root canal or has lost more than half its structure from a large fracture, a normal filling is no longer strong enough to withstand chewing forces. A crown acts as a protective helmet covering the entire tooth. We use premium zirconia and porcelain materials that match the luster and translucency of natural enamel.',
        '["Restores full chewing power to severely broken teeth", "Prevents cracked teeth from splitting into the root", "Made from high-strength aesthetic zirconia porcelain", "Natural color and anatomical contour"]'::jsonb,
        '[{"step": "Tooth Preparation", "detail": "The tooth is shaped under local anesthesia to receive the custom crown."}, {"step": "Precision Impression", "detail": "We take a precise mold or digital scan sent to our dental laboratory."}, {"step": "Temporary Protection", "detail": "You receive a temporary tooth while your permanent crown is fabricated."}, {"step": "Permanent Cementation", "detail": "The permanent crown is checked for comfort and bonded permanently."}]'::jsonb,
        'For broken teeth, teeth after root canal therapy, or replacing missing teeth with a fixed bridge.',
        'From UGX 650,000',
        '2 visits across 7 days',
        false, true, 5,
        'Dental Crowns & Bridges Kampala | Pearl Dental',
        'High strength ceramic and zirconia crowns in Kampala. Protect broken teeth with natural aesthetics.'
      ),
      (
        'Safe In-Clinic Teeth Whitening',
        'teeth-whitening',
        ${catMap['cosmetic-whitening'] || null},
        'Professional dentist-supervised bleaching that lifts deep yellowing, coffee, tea, and aging stains safely without eroding enamel.',
        'How does professional whitening differ from over-the-counter products? Supermarket powders and online pastes often contain abrasive particles that scratch away your enamel permanently. Our in-clinic treatment uses medically formulated carbamide and hydrogen peroxide gels that break down organic pigment molecules inside the enamel pores while protecting your sensitive gums with a barrier resin.',
        '["Brightens teeth by 4 to 8 shades in a single session", "Dentist-supervised to protect gums from chemical burns", "Zero damage to enamel structure", "Includes sensitivity prevention care"]'::jsonb,
        '[{"step": "Pre-Whitening Cleaning", "detail": "Surface plaque is cleared so the whitening gel penetrates evenly."}, {"step": "Gum Barrier Application", "detail": "We paint a protective resin over your gums to avoid any irritation."}, {"step": "Whitening Gel Application", "detail": "Medical-grade gel is applied and activated in 15-minute cycles."}, {"step": "Post-Care Polish", "detail": "We apply a remineralizing paste to minimize temporary cold sensitivity."}]'::jsonb,
        'For adults with stained, yellowed, or discolored natural teeth looking for a noticeable smile refresh.',
        'UGX 350,000',
        '60 minutes',
        true, true, 6,
        'Teeth Whitening in Kampala | Pearl Dental',
        'Safe, dentist-supervised teeth whitening in Kololo, Kampala. Lift stains safely in one hour.'
      ),
      (
        'Children’s Gentle Dental Visits',
        'pediatric-dentistry',
        ${catMap['pediatric-dentistry'] || null},
        'Patient, child-friendly checkups, cavity prevention sealants, and gentle treatments designed to help young ones grow up with zero fear of the dentist.',
        'How do we care for young smiles? A positive early dental experience sets the foundation for a lifetime of healthy habits. Our team speaks with warmth and patience, explaining every tool in simple, fun terms before touching anything. We screen for early childhood tooth decay, apply protective fluoride varnish, and provide dental pit sealants to stop sweets from damaging growing molars.',
        '["Warm, playful environment that eliminates dental fear", "Fissure sealants that prevent 80% of molar cavities in kids", "Early bite monitoring to avoid complex braces later", "Practical advice for parents on diet and toothbrushing"]'::jsonb,
        '[{"step": "Meet & Tour", "detail": "Your child meets the doctor and touches the water spray to feel comfortable."}, {"step": "Gentle Check", "detail": "We count teeth together and check for any early signs of decay."}, {"step": "Preventive Polish", "detail": "A gentle spin-brush cleaning with pleasant tasting polish."}, {"step": "Fluoride Shield", "detail": "We brush on a quick protective vitamin-fluoride coat to strengthen enamel."}]'::jsonb,
        'Recommended for all children starting from their first birthday or when their first baby tooth appears.',
        'UGX 80,000',
        '30 - 45 minutes',
        false, true, 7,
        'Pediatric Children Dentist in Kampala | Pearl Dental',
        'Friendly, caring dental visits for kids and teens in Kampala. Gentle preventive care and sealants.'
      )
    `;
  }

  // Team
  const teamCount = await sql`SELECT count(*) FROM team_members`;
  if (parseInt(teamCount[0].count) === 0) {
    console.log('Seeding team_members...');
    await sql`
      INSERT INTO team_members (
        name, slug, role, qualifications, portrait_url, short_bio, full_bio,
        specialties, years_experience, registration_info, featured, published, sort_order
      ) VALUES
      (
        'Dr. Sarah Namubiru',
        'dr-sarah-namubiru',
        'Principal Dental Surgeon & Orthodontist',
        'BDS (Makerere University), MClinDent Orthodontics (Edinburgh)',
        '',
        'Dr. Sarah brings over 14 years of clinical experience in gentle general dentistry and orthodontic smile realignment in Kampala.',
        'Dr. Sarah completed her Bachelor of Dental Surgery at Makerere University College of Health Sciences and pursued advanced postgraduate training in orthodontics and facial aesthetics. She has practiced in Kampala for over a decade, known for her gentle demeanor and clear communication with nervous patients. She believes every patient deserves to understand their treatment options thoroughly without feeling rushed or pressured.',
        '["Orthodontic Braces & Aligners", "Cosmetic Smile Makeovers", "Complex Restorative Care", "Preventive Dentistry"]'::jsonb,
        14,
        'UMDPC Registration #1420',
        true, true, 1
      ),
      (
        'Dr. David Kigozi',
        'dr-david-kigozi',
        'Senior Dental Surgeon & Implant Specialist',
        'BDS (Makerere University), Cert. Oral Implantology',
        '',
        'Specializing in pain-free root canal therapy, surgical extractions, and long-term tooth replacement with dental implants and ceramic crowns.',
        'Dr. David graduated from Makerere University and has dedicated his career to restorative dentistry and dental surgery. Having treated thousands of patients suffering from acute tooth infections and trauma, he prioritizes comfort-first methods and tooth preservation wherever possible. He regularly attends regional implantology symposiums to bring cutting-edge techniques to our Kampala clinic.',
        '["Root Canal Therapy", "Dental Implants & Bridges", "Wisdom Tooth Surgery", "Crown Reconstruction"]'::jsonb,
        11,
        'UMDPC Registration #1894',
        true, true, 2
      ),
      (
        'Dr. Brenda Akello',
        'dr-brenda-akello',
        'Pediatric & Preventive Dental Specialist',
        'BDS (Makerere University), Cert. Pediatric Dentistry',
        '',
        'Passionate about creating fearless dental visits for children, adolescent bite monitoring, and community oral hygiene education.',
        'Dr. Brenda has a special gift for working with children and anxious adults. Her warm, calm approach transforms dental visits into positive educational experiences. She has led numerous school dental health screenings across Kampala and Wakiso districts, advocating for early prevention and healthy nutritional habits.',
        '["Children Dental Care", "Cavity Fissure Sealants", "Anxious Patient Care", "Preventive Hygiene"]'::jsonb,
        8,
        'UMDPC Registration #2210',
        true, true, 3
      )
    `;
  }

  // Reviews
  const revCount = await sql`SELECT count(*) FROM reviews`;
  if (parseInt(revCount[0].count) === 0) {
    console.log('Seeding reviews...');
    await sql`
      INSERT INTO reviews (patient_name, review_text, rating, treatment, source, featured, published, sort_order) VALUES
      (
        'Patrick Byaruhanga',
        'I had been delaying dealing with a terrible molar toothache for three weeks out of fear. Dr. David explained every step before touching anything. The root canal was completely painless and I was back at work in Nakasero the very next morning.',
        5,
        'Root Canal Therapy',
        'Google Reviews',
        true, true, 1
      ),
      (
        'Grace Tumusiime',
        'Pearl Dental is unlike other clinics where they push you into expensive procedures. Dr. Sarah examined my teeth, gave me honest options with exact prices, and did my composite filling so neatly you cannot tell which tooth was treated.',
        5,
        'Composite Dental Filling',
        'Google Reviews',
        true, true, 2
      ),
      (
        'Ronald Mwesigwa',
        'Brought my 6-year-old son who was terrified of doctors. Dr. Brenda was remarkably patient and kind. By the end of the appointment, my son was smiling with his hygiene sticker. Highly recommended for families in Kampala.',
        5,
        'Pediatric Dental Visit',
        'Google Reviews',
        true, true, 3
      ),
      (
        'Joan Nalubega',
        'The clinic environment is spotless, calm, and welcoming. I did scaling and polishing and the stain removal on my teeth was remarkable. They respect your appointment time without endless waiting room delays.',
        5,
        'Scaling & Polishing',
        'Google Reviews',
        true, true, 4
      ),
      (
        'Denis Ssemwogerere',
        'Got my ceramic crown done here after cracking my premolar while chewing. The fit feels like my original natural tooth. Transparent pricing with no surprises.',
        5,
        'Ceramic Crown',
        'Google Reviews',
        true, true, 5
      )
    `;
  }

  // Smile Cases
  const casesCount = await sql`SELECT count(*) FROM smile_cases`;
  if (parseInt(casesCount[0].count) === 0) {
    console.log('Seeding smile_cases...');
    await sql`
      INSERT INTO smile_cases (
        title, slug, treatment, description, case_details,
        patient_label, featured, published, sort_order
      ) VALUES
      (
        'Front Diastema Gap Closure',
        'front-diastema-gap-closure',
        'Cosmetic Composite Bonding',
        'Closing a 3.5mm central gap between upper incisors in a single 90-minute appointment without shaving healthy enamel.',
        'The patient had felt self-conscious about their prominent front tooth spacing for years. We used multilayered aesthetic composite resin sculpted directly onto the enamel surfaces, matching the natural tooth translucency and closing the gap seamlessly.',
        'Patient aged 26, Kampala',
        true, true, 1
      ),
      (
        'Fluorosis Discoloration & Whitening',
        'fluorosis-discoloration-treatment',
        'Micro-abrasion & In-Clinic Whitening',
        'Treating deep brown and chalky white fluorosis stains across anterior teeth to achieve a smooth, bright, uniform shade.',
        'Deep mineral stains were gently treated using targeted enamel micro-abrasion combined with a dentist-supervised in-clinic whitening cycle. The natural tooth structure was fully preserved without needing invasive veneers.',
        'Patient aged 31, Entebbe',
        true, true, 2
      ),
      (
        'Fractured Upper Incisor Restoration',
        'fractured-upper-incisor-restoration',
        'High-Strength Zirconia Crown',
        'Rebuilding a fractured front tooth resulting from a sports impact using a custom shade-matched zirconia crown.',
        'Following nerve vitality tests, we shaped the remaining sound structure and bonded a custom ceramic crown that mirrors the texture, light reflection, and contour of the neighboring incisor.',
        'Patient aged 29, Kololo',
        true, true, 3
      ),
      (
        'Crowded Lower Teeth Orthodontic Alignment',
        'crowded-teeth-realignment',
        'Orthodontic Alignment (14 Months)',
        'Resolving severe lower anterior tooth crowding to restore proper bite function and make daily flossing effortless.',
        'Careful tooth movement expanded the dental arch smoothly over 14 months, creating room for all teeth to align without needing healthy premolar extractions.',
        'Patient aged 22, Kampala',
        true, true, 4
      )
    `;
  }

  // Blog Posts
  const blogCount = await sql`SELECT count(*) FROM blog_posts`;
  if (parseInt(blogCount[0].count) === 0) {
    console.log('Seeding blog_posts...');
    await sql`
      INSERT INTO blog_posts (
        title, slug, excerpt, content, author, category, published, featured
      ) VALUES
      (
        'Why Toothaches Get Worse at Night and What You Can Do Before Reaching the Clinic',
        'why-toothaches-get-worse-at-night',
        'Learn why lying flat increases blood pressure to an inflamed dental nerve and practical steps to manage discomfort until your morning visit.',
        'Have you ever had a tooth that felt tolerable during the day, only to begin throbbing violently the moment your head hits the pillow? There is a direct physiological reason for this. When you lie down flat, more blood rushes to your head, increasing pressure inside the small, rigid chamber of an inflamed tooth nerve.

What can you do at home for temporary relief?
1. Elevate your head: Sleep propped up on two or three pillows to reduce cranial blood pressure.
2. Rinse with warm salt water: Dissolve half a teaspoon of salt in warm water and gently hold it around the tender area to draw out tissue fluid.
3. Take anti-inflammatory medication: Over-the-counter ibuprofen can reduce nerve inflammation when taken according to package directions.
4. Avoid hot or cold drinks: Stick to room temperature liquids.

Important reminder: Painkillers only quiet the nerve signal temporarily; they do not remove the bacteria trapped inside the tooth. Contact our Kampala clinic as early as possible so we can diagnose whether you need a protective filling or gentle root canal treatment before an abscess develops.',
        'Dr. David Kigozi',
        'Dental Advice',
        true, true
      ),
      (
        'Brown Teeth and Fluorosis in Uganda: Causes, Myths, and Safe Treatment',
        'dental-fluorosis-causes-and-treatment-uganda',
        'Understanding how borehole water and natural fluoride levels affect childhood enamel development and modern ways to restore an even tooth shade.',
        'Across many parts of Uganda, families notice brown streaks or chalky white patches on their teeth or their children’s teeth. This is called dental fluorosis.

What causes dental fluorosis?
Fluorosis happens during childhood (under age eight) when permanent teeth are still developing under the gums. If children drink water from deep boreholes or volcanic soil regions containing naturally high fluoride concentrations, the enamel mineralizes with microscopic porosity that later traps dark dietary pigments from tea and food.

Can fluorosis be cleaned with charcoal or hard scrubbing?
No. Brushing aggressively with charcoal or coarse powders does not lift fluorosis; instead, it scrapes away your precious outer enamel layer, exposing yellow dentin underneath and making teeth permanently sensitive.

How do we safely treat fluorosis at Pearl Dental?
Depending on how deep the staining goes, we have three proven options:
1. Enamel Micro-abrasion: Gently clearing the microscopic surface discolored layer.
2. In-Clinic Dental Whitening: Oxygenating the enamel crystals safely.
3. Composite Bonding or Veneers: For deep structural staining, we place a thin layer of natural tooth-colored porcelain or resin over the front of the tooth.

You do not have to hide your smile. Schedule a quick consultation with our team in Kololo to see which approach fits your teeth best.',
        'Dr. Sarah Namubiru',
        'Cosmetic & Restoration',
        true, true
      ),
      (
        'How to Prepare Your Child for Their First Dental Checkup Without Fear',
        'prepare-child-first-dental-checkup',
        'Simple, reassuring ways parents can describe the dentist so children look forward to checkups instead of fearing them.',
        'Many adults in Uganda carry a lifelong fear of the dentist because their own first visit happened during a traumatic emergency tooth extraction in childhood. Today, pediatric dentistry is completely different.

Here is how you can set your child up for a joyful, fearless visit:
1. Keep your descriptions simple and positive: Tell your child that the dentist counts teeth, checks how strong they are growing, and cleans them with a tickly electric brush.
2. Avoid trigger words: Never say "The doctor will not hurt you" or "It is only a small injection." Children only hear the words "hurt" and "injection."
3. Bring them for a routine checkup before there is any pain: When your child’s first visit is just a friendly examination and polish, they learn that the dental clinic is a safe, interesting place.
4. Lead by example: Let your child see you brush and floss happily at home.

At Pearl Dental in Kololo, Dr. Brenda takes extra time to let young children explore the dental chair, see the mirror tools, and receive a brave patient sticker before any treatment begins.',
        'Dr. Brenda Akello',
        'Family Health',
        true, false
      )
    `;
  }

  // Check clinical_faqs
  const faqsCount = await sql`SELECT count(*) FROM clinical_faqs`;
  if (parseInt(faqsCount[0].count) === 0) {
    console.log('Seeding clinical_faqs...');
    await sql`
      INSERT INTO clinical_faqs (
        question, answer, category, sort_order, published
      ) VALUES
      (
        'Will my dental visit be painful?',
        'No. Before touching any tender tooth, we apply a gentle topical numbing gel to your gum so you do not feel the local anesthetic injection. You remain awake, relaxed, and in total control throughout. If you ever need a break, simply raise your hand and our doctor pauses immediately.',
        'Comfort & Anesthesia',
        1,
        true
      ),
      (
        'How much will my consultation and treatment cost?',
        'We discuss exact costs before performing any procedure. Following your initial examination, you receive a clear written breakdown in Uganda Shillings explaining each option. You decide what fits your priorities and budget without surprise additions.',
        'Fees & Transparency',
        2,
        true
      ),
      (
        'What if I have delayed seeing a dentist and feel hesitant?',
        'We welcome you warmly. Our clinical team examines broken teeth, infected gums, and neglected cavities every single day. We are here to solve your problem and restore your comfort with genuine empathy and zero judgment.',
        'Care & Welcome',
        3,
        true
      ),
      (
        'Can I bring my children for their routine checkups?',
        'Yes. Our pediatric team specializes in gentle child checkups, teeth cleanings, and cavity prevention sealants. We take time to show young patients how each tool works so they grow up without dental anxiety.',
        'Pediatric Care',
        4,
        true
      )
    `;
  }

  // Check homepage_sections
  const sectionsCount = await sql`SELECT count(*) FROM homepage_sections`;
  if (parseInt(sectionsCount[0].count) === 0) {
    console.log('Seeding homepage_sections...');
    await sql`
      INSERT INTO homepage_sections (
        section_key, eyebrow, title, subtitle, description,
        primary_cta_label, primary_cta_url, secondary_cta_label, secondary_cta_url,
        badge_text, visible, sort_order
      ) VALUES
      (
        'hero',
        'Private Dental Clinic · Acacia Avenue',
        'Gentle, Honest Dental Care in Kampala',
        'Serving families, professionals, and international residents across Kampala. Whether you have acute tooth pain or need routine preventive care, we listen first and treat gently.',
        'Direct telephone: +256 700 123 456 · Walk-ins accepted for acute dental emergencies.',
        'Book an Appointment',
        '/book',
        'WhatsApp Us',
        'https://wa.me/256700123456',
        'Plot 14 Acacia Avenue, Kololo',
        true,
        1
      ),
      (
        'transparency',
        'Clear Answers',
        'Clear Answers Before You Step Through Our Door',
        'We believe you deserve honest information about your oral health, pain management, and treatment costs before sitting in a clinic chair.',
        'Empathetic care with zero clinical surprises for every patient in Kampala.',
        'Explore Our Treatments',
        '/treatments',
        'Book Consultation',
        '/book',
        'COMMONLY ASKED QUESTIONS',
        true,
        2
      ),
      (
        'treatments',
        'Core Treatments',
        'Gentle Treatments Tailored to Your Teeth',
        'From everyday hygiene cleanings to root canals and aesthetic restorations, our primary commitment is preserving your natural dentition with modern equipment.',
        'Conservative clinical dentistry tailored to your unique comfort and health goals.',
        'View All Treatments',
        '/treatments',
        '',
        '',
        'SPECIALIZED PROCEDURES',
        true,
        3
      ),
      (
        'team',
        'Our Dental Practitioners',
        'Who Will Look After Your Dental Health?',
        'Meet the experienced dental surgeons and hygienists who will care for you. Every doctor is registered with the Uganda Medical and Dental Practitioners Council.',
        'Dedicated clinicians combining global clinical standards with gentle bedside manner.',
        'Learn More About Our Team',
        '/about',
        '',
        '',
        'UMDPC REGISTERED PRACTITIONERS',
        true,
        4
      ),
      (
        'gallery',
        'Documented Results',
        'Smile Transformations in Kampala',
        'Examine genuine clinical cases completed at our clinic. Review before-and-after photographic records documenting fluorosis correction, gaps, and aesthetic restorations.',
        'Unfiltered clinical photographic evidence of genuine transformations.',
        'Open Full Smile Gallery',
        '/gallery',
        '',
        '',
        'BEFORE & AFTER CASE STUDIES',
        true,
        5
      ),
      (
        'reviews',
        'Patient Feedback',
        'What Patients in Kampala Say About Their Care',
        'Read candid experiences from patients who visited our Kololo clinic for dental pain relief, hygiene cleanings, restorations, and cosmetic smile care.',
        'Independent feedback submitted by verified patients across Uganda and abroad.',
        'Book Your Consultation',
        '/book',
        '',
        '',
        'GOOGLE VERIFIED EXPERIENCES',
        true,
        6
      ),
      (
        'booking',
        'Book Your Consultation',
        'Ready to Visit Our Dental Clinic in Kololo?',
        'Whether you need urgent relief for persistent tooth pain, a routine family dental cleaning, or advice on orthodontic straightening, our clinical team is ready Monday through Saturday.',
        'Plot 14 Acacia Avenue, Kololo · Secure on-site patient parking available.',
        'Book an Appointment',
        '/book',
        'WhatsApp Us',
        'https://wa.me/256700123456',
        'CONVENIENT SCHEDULING',
        true,
        7
      ),
      (
        'blog',
        'Dental Education',
        'Oral Health Advice from Our Doctors',
        'Practical clinical guides addressing everyday dental concerns in Uganda: from night toothache management to fluorosis and children oral hygiene.',
        'Empowering you with reliable, doctor-authored oral health information.',
        'Explore Dental Articles',
        '/blog',
        '',
        '',
        'PATIENT ORAL HEALTH GUIDES',
        true,
        8
      )
    `;
  }

  console.log('Database migration and seeding completed successfully!');
}

// Auto-run if executed directly
if (process.argv[1]?.includes('migrateAndSeed')) {
  runMigrationAndSeed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Migration error:', err);
      process.exit(1);
    });
}
