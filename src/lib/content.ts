/**
 * All site copy lives here.
 *
 * Source of facts: https://maarsca.in/ and https://maarsca.in/about-company/
 * (retrieved 2 Oct 2026). Anything not found there is marked with
 * `confirm: true` or a "[TO CONFIRM]" note and is surfaced in the UI as a
 * discreet placeholder so it can be replaced before launch.
 */

export const firm = {
  name: "MAARS & Associates",
  descriptor: "Chartered Accountants & Business Advisors",
  founded: 2012,
  phoneDisplay: "+91 84607 77760",
  phoneHref: "tel:+918460777760",
  email: "consult.maars@gmail.com",
  whatsappHref:
    "https://wa.me/918460777760?text=Hello%20MAARS%20%26%20Associates%2C%20I%27d%20like%20to%20discuss%20my%20business.",
  hours: "Mon – Sun, 10:00 am – 7:00 pm",
  values: ["Partnership", "Integrity", "Passion", "Excellence"],
  offices: [
    {
      label: "Head Office",
      city: "Surat",
      lines: ["A-7/8, 1st Floor, Tulsi Market", "Ring Road, Surat 395002", "Gujarat, India"],
    },
    {
      label: "Branch Office",
      city: "Kashipur",
      lines: ["312, Arya Nagar", "Kashipur 244713", "Uttarakhand, India"],
    },
  ],
  legal: [
    { label: "Privacy Policy", href: "https://maarsca.in/privacy-policy/" },
    { label: "Terms", href: "https://maarsca.in/terms-and-conditions/" },
    { label: "Disclaimer", href: "https://maarsca.in/disclaimer/" },
  ],
} as const;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Our Team", href: "#team" },
  { label: "Contact", href: "#contact" },
] as const;

export const practiceAreas = [
  "Tax & Compliance",
  "Audit & Risk",
  "Corporate Finance",
  "Virtual CFO",
  "Business Advisory",
] as const;

/** Milestones published on maarsca.in/about-company. Re-confirm before launch. */
export const milestones = [
  { value: 1000, prefix: "", suffix: "+", label: "Income tax clients" },
  { value: 300, prefix: "", suffix: "+", label: "GST clients" },
  { value: 100, prefix: "", suffix: "+", label: "Tax audits" },
  { value: 100, prefix: "₹", suffix: " Cr+", label: "Loan funding facilitated" },
] as const;

export const services = [
  {
    no: "01",
    title: "Tax & Compliance",
    summary: "GST, taxation, compliance, tax advisory and tax litigation.",
    detail: ["GST compliance", "Income tax & tax audits", "Tax advisory", "Litigation & representation"],
  },
  {
    no: "02",
    title: "Audit & Risk",
    summary: "Internal audit, risk assessment, controls and compliance reviews.",
    detail: ["Internal audit", "Risk assessments", "Process & control reviews", "Governance support"],
  },
  {
    no: "03",
    title: "Corporate Finance",
    summary: "Financial planning, corporate finance and business financial strategy.",
    detail: ["Financial planning", "Funding & loan support", "Financial structuring", "Budgeting"],
  },
  {
    no: "04",
    title: "Virtual CFO",
    summary: "Management reporting, financial insights, planning and decision support.",
    detail: ["Management reporting", "Budgeting & forecasting", "Cash-flow visibility", "Decision support"],
  },
  {
    no: "05",
    title: "Business Advisory",
    summary: "Startup consultancy, business structuring and management advisory.",
    detail: ["Start-up consultancy", "Entity setup & registrations", "Management consultancy", "CSR consultancy"],
  },
  {
    no: "06",
    title: "IPO & Capital Markets",
    summary: "IPO facilitation, financial preparedness and strategic support.",
    detail: ["IPO facilitation", "Financial reporting readiness", "Compliance preparation", "Investor readiness"],
  },
] as const;

export const industries = [
  {
    name: "Manufacturing",
    copy: "Costing discipline, internal controls and compliance for plants, traders and supply chains.",
  },
  {
    name: "Startups",
    copy: "Entity structuring, early compliance and finance foundations that hold up as you raise and scale.",
  },
  {
    name: "E-commerce",
    copy: "Reconciliation of sales, payments and refunds across marketplaces, with GST handled end to end.",
  },
  {
    name: "IT & Technology",
    copy: "Reporting, tax planning and financial structure for service and product technology businesses.",
  },
  {
    name: "Hospitality",
    copy: "Revenue controls, audit support and compliance for hotels, travel and experience businesses.",
  },
  {
    name: "Professional Services",
    copy: "Practical finance, tax and advisory support for firms whose real asset is their people.",
  },
] as const;

export const principles = [
  {
    title: "Business-first thinking",
    copy: "We look beyond compliance to understand the decisions behind the numbers.",
  },
  {
    title: "Partner-led expertise",
    copy: "Experienced professionals remain closely involved in the work that matters.",
  },
  {
    title: "Practical advisory",
    copy: "Clear recommendations designed for real business situations.",
  },
  {
    title: "Long-term relationships",
    copy: "Built around trust, responsiveness and sustainable growth.",
  },
] as const;

/**
 * Names, CA designation and focus areas are as listed on maarsca.in.
 * Bios are drawn only from the firm's published history. Photographs
 * supplied by the firm (2 Oct 2026).
 */
export const team = [
  {
    name: "Mrunal Jinwala",
    photo: "/team/mrunal-jinwala.webp",
    linkedin: "https://www.linkedin.com/in/ca-mrunal-jinwala-65069b145/",
    initials: "MJ",
    role: "Founder",
    focus: "Tax Advisory & IPO Consulting",
    bio: "Established the practice in 2012 with a focus on taxation and advisory services, and leads the firm's tax and IPO work.",
  },
  {
    name: "Ravikant Sharma",
    photo: "/team/ravikant-sharma.webp",
    linkedin: "https://www.linkedin.com/in/ravikant-sharma-a78536341/",
    initials: "RS",
    role: "Partner",
    focus: "Audit & Controls",
    bio: "Joined in 2018 as the firm became a partnership, and leads its audit, internal controls and management consultancy work.",
  },
  {
    name: "Akash Agarwal",
    photo: "/team/akash-agarwal.webp",
    linkedin: "https://www.linkedin.com/in/caakashagarwal/",
    initials: "AA",
    role: "Partner",
    focus: "Investment & Financial Consulting",
    bio: "Joined the partnership in 2024, advising businesses on investment, funding and financial decisions.",
  },
  {
    name: "Chandan Sharma",
    photo: "/team/chandan-sharma.webp",
    initials: "CS",
    role: "Partner",
    focus: "E-commerce Consulting",
    bio: "Joined the partnership in 2024 and guides the firm's dedicated e-commerce solutions vertical.",
  },
] as const;

/** Verbatim from maarsca.in testimonials. */
export const testimonials = [
  {
    quote:
      "The expertise of Maars & Associates in internal audits is unparalleled. Their practical insights and collaborative efforts have truly transformed our processes, all while maintaining transparency and professionalism.",
    name: "Shashank Agarwal",
    title: "CEO",
    company: "Shreeji Prints Pvt Ltd",
  },
  {
    quote:
      "Working with Maars & Associates has been a game-changer for us. Their team brought actionable recommendations and detailed reviews that significantly improved our operations.",
    name: "Mukesh Patil",
    title: "CEO",
    company: "Shree Ram Inframech Ltd",
  },
  {
    quote:
      "Maars & Associates impressed us with their exceptional internal audit services. Their thorough analysis and supportive approach have enhanced our efficiency beyond expectations.",
    name: "Mukul Ronak Das",
    title: "CEO",
    company: "Waltair Adventures Pvt Ltd",
  },
  {
    quote:
      "With Maars & Associates, we experienced a perfect balance of professionalism and attention to detail. Their recommendations were spot on and brought noticeable improvements to our systems.",
    name: "Hiren Desai",
    title: "CEO",
    company: "Vahh Chemicals Ltd.",
  },
  {
    quote:
      "Our operations have never been smoother, thanks to Maars & Associates. Their deep understanding of audits and hands-on collaboration made a remarkable impact on our workflows.",
    name: "Naresh Teli",
    title: "Founder",
    company: "Hastee Group",
  },
  {
    quote:
      "Choosing Maars & Associates was the best decision we made for our internal audits. Their team's precision, insight, and dedication have taken our processes to the next level.",
    name: "Madaram Choudhary",
    title: "Owner",
    company: "DSM Group, Surat",
  },
] as const;

/**
 * Google Business Profile. Rating and review count confirmed on Google Maps (2 Oct 2026).
 * Reviews are genuine Google reviews as displayed on maarsca.in's Google
 * review widget (both 5 stars, Dec 2024).
 */
export const google = {
  rating: 4.9,
  /** As shown on the official Google Maps embed, 2 Oct 2026. */
  reviewCount: 82,
  placeName: "Maars & Associates - Chartered Accountants",
  mapsUrl: "https://maps.app.goo.gl/kCpfrnPW5WiizBeD8",
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56577.0465147512!2d72.78519726229919!3d21.18681269638514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f47040576d5%3A0x5f70f9411a3f54a0!2sMaars%20%26%20Associates%20-%20Chartered%20Accountants!5e1!3m2!1sen!2sin!4v1790922642611!5m2!1sen!2sin",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=21.1843744,72.8345849",
  reviews: [
    {
      name: "Kashyap Mandviwala",
      date: "Dec 2024",
      stars: 5,
      text: "Very professional and good approach. Thank you",
    },
    {
      name: "Prashant Jinwala",
      date: "Dec 2024",
      stars: 5,
      text: "I've been highly impressed with the Maars and Associates's dedication to excellence in managing both accounts and investments. Not only each partner of firm, their team is also knowledgeable, approachable, and takes the time to understand my financial goals. They provide insightful advice tailored to your accounting needs, ensuring steady growth for investments. The transparency in their processes, coupled with regular updates, gives me confidence in their expertise. Highly recommended for anyone looking for a trustworthy service in accounting as well financial planning and investment.",
    },
  ],
} as const;

/** Firm history as published on maarsca.in/about-company. */
export const journey = [
  { year: "2012", title: "Practice founded", copy: "CA Mrunal Jinwala establishes the firm, focused on taxation and advisory." },
  { year: "2015", title: "50+ litigation matters", copy: "More than 50 tax litigation matters resolved in a single year." },
  { year: "2018", title: "Becomes a partnership", copy: "CA Ravikant Sharma joins as partner, broadening the firm's services." },
  { year: "2019", title: "New verticals", copy: "Internal audit and management consultancy practices launched." },
  { year: "2022", title: "1,000+ tax clients", copy: "Over 1,000 income tax clients served and 100+ tax audits completed." },
  { year: "2024", title: "Partnership grows", copy: "CA Akash Agarwal and CA Chandan Sharma join as partners." },
  { year: "2025", title: "New milestones", copy: "300+ GST clients, ₹100 Cr+ loan funding facilitated and an e-commerce vertical." },
] as const;
