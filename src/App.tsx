/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Hammer, 
  PaintBucket, 
  Home, 
  Grid2X2,
  Shovel, 
  Layers, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Menu,
  X,
  MessageSquare,
  MessageCircle,
  Droplets,
  Trees,
  Square,
  Construction
} from 'lucide-react';
import { useState, FormEvent, useEffect } from 'react';

const SERVICES = [
  {
    title: "Residential Houses",
    description: "End-to-end construction of premium single-family homes designed for modern living.",
    icon: <Home className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1600585154340-be6199f7a096?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Duplexes",
    description: "Expertly crafted duplexes that maximize space and value without compromising on quality.",
    icon: <Grid2X2 className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?q=80&w=800&auto=format&fit=crop"
  }
];

const TRADES = [
  {
    title: "Carpentry",
    details: "Master structural timber framing and architectural roof cutting. We specialize in precision internal fit-outs and bespoke timber features.",
    icon: <Hammer className="w-5 h-5 text-brand-accent" />,
    extendedDetails: "At Manor Builders, carpentry is the core of our construction identity. Our expert team brings decades of experience to structural timber framing, custom roof cutting, and high-precision internal fit-outs.\n\nWe specialize in hand-cut roofs and engineered floor systems, ensuring structural integrity that lasts a lifetime. From grand cathedral ceilings to intricate shadow-line skirtings, our carpentry defines the quality of every residence.",
    images: ["https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop"]
  },
  {
    title: "Bricklaying",
    details: "High-end masonry and decorative face brickwork. Our specialists ensure perfectly level courses and consistent joint aesthetics.",
    icon: <Square className="w-5 h-5 text-brand-accent" />,
    extendedDetails: "Precision masonry is the foundation of a solid home. Our bricklaying team excels in decorative face brickwork, heritage bonding patterns, and structural blockwork.\n\nWe focus on consistency in mortar color and joint finishing, ensuring that every facade reflects architectural excellence. Our expertise includes complex retaining wall systems and intricate stone-look masonry.",
    images: ["https://images.unsplash.com/photo-1590086782792-42dd2350140d?q=80&w=800&auto=format&fit=crop"]
  },
  {
    title: "Painting and decorating",
    details: "Premium finishings using highest-grade materials. Expert color consultations and high-gloss coating excellence for a flawless result.",
    icon: <PaintBucket className="w-5 h-5 text-brand-accent" />,
    extendedDetails: "The final layer of your home defines its mood. Our painting and decorating division focuses on flawless application and meticulous surface preparation.\n\nWe use only premium paints and specialized coatings, including Venetian plasters and exterior protective membranes. Our eye for detail ensures crisp lines and perfectly finished surfaces throughout the residence.",
    images: ["https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop"]
  },
  {
    title: "Roofing",
    details: "Structural roofing systems from terracotta tiling to modern metal solutions. Engineered for harsh Australian conditions.",
    icon: <Construction className="w-5 h-5 text-brand-accent" />,
    extendedDetails: "Your roof is your home's ultimate shield. We provide comprehensive roofing solutions using Colorbond steel, terracotta tiling, and concrete systems.\n\nOur specialists focus on superior waterproofing, thermal efficiency, and structural integration. Every roof is engineered to withstand extreme weather while maintaining the sleek silhouette of a luxury residence.",
    images: ["https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=800&auto=format&fit=crop"]
  },
  {
    title: "Tiling",
    details: "Luxury floor and wall tiling specializing in large-format porcelain and natural stone for premium wet areas.",
    icon: <Grid2X2 className="w-5 h-5 text-brand-accent" />,
    extendedDetails: "Tiling is an art of precision. We specialize in large-format porcelain panels and natural stones like Marble and Travertine.\n\nOur artisans ensure millimetric accuracy in levels and grout lines. We exceed all Australian standards for waterproofing in wet areas, providing hand-mitered edges that eliminate the need for visible trims.",
    images: ["https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=800&auto=format&fit=crop"]
  },
  {
    title: "Gyprocking",
    details: "Architectural plastering and internal lining. Specialists in shadow-lines, bulkheads, and acoustic insulation solutions.",
    icon: <Layers className="w-5 h-5 text-brand-accent" />,
    extendedDetails: "Smooth, perfectly flat walls are the canvas for luxury interiors. Our gyprocking division specializes in architectural lining, custom bulkheads, and shadow-line P50 finishes.\n\nWe prioritize acoustic performance and fire-rated solutions, ensuring that every internal space is quiet, safe, and visually perfect.",
    images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800&auto=format&fit=crop"]
  },
  {
    title: "Cabinet Making",
    details: "Bespoke cabinetry for luxury kitchens, wardrobes, and living spaces. High-end joinery integrated with modern technology.",
    icon: <Square className="w-5 h-5 text-brand-accent" />,
    extendedDetails: "Custom joinery is what transforms a house into a bespoke home. Our master cabinet makers create exquisite kitchens, vanity units, and walk-in robes.\n\nWe combine traditional craftsmanship with modern CNC technology to produce joinery that is both functional and beautiful, using premium materials and soft-close hardware as standard.",
    images: ["https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop"]
  },
  {
    title: "Concreting",
    details: "Precision concrete works including architectural driveways, pool surrounds, and structural house slabs.",
    icon: <Construction className="w-5 h-5 text-brand-accent" />,
    extendedDetails: "Solid foundations are non-negotiable. Our concreting team handles complex structural house slabs, architectural driveways, and decorative pool surrounds.\n\nWe offer a range of finishes including exposed aggregate, honed concrete, and stamped patterns, all engineered for structural longevity and aesthetic appeal.",
    images: ["https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop"]
  },
  {
    title: "Plumbing",
    details: "Comprehensive hydraulic services for luxury builds. Expert gas fitting, drainage, and premium fixture installations.",
    icon: <Droplets className="w-5 h-5 text-brand-accent" />,
    extendedDetails: "Beyond the seen is the essential. Our plumbing division provides expert hydraulic systems, drainage, and gas fitting for high-end residential projects.\n\nWe specialize in the installation of premium fixtures and smart water management systems, ensuring efficiency and reliability behind every wall.",
    images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"]
  },
  {
    title: "Landscaping",
    details: "Premium landscape design and construction. Creating outdoor living spaces that complement architectural excellence.",
    icon: <Trees className="w-5 h-5 text-brand-accent" />,
    extendedDetails: "Architecture should harmonize with nature. Our landscaping team creates resort-style outdoor environments that extend the luxury experience outside the home.\n\nFrom structural retaining walls and paving to automated irrigation and luxury planting schemes, we ensure your property's exterior is as impressive as its interior.",
    images: ["https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop"]
  }
];

const PROJECTS = [
  {
    title: "THE SOVEREIGN",
    location: "KELLYVILLE",
    category: "RESIDENTIAL",
    specs: { beds: 5, baths: 4, cars: 3 },
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop",
    description: "The Sovereign in Kellyville represents the pinnacle of luxury residential architecture. This meticulously crafted property features premium finishes, innovative spatial design, and a seamless integration with its surroundings. It embodies our commitment to excellence in construction and design.",
    features: ["Premium Finishes", "Smart Home Ready", "Luxury Infinity Pool", "State-of-the-art Kitchen"],
    status: "Completed 2024"
  },
  {
    title: "THE OUTLOOK",
    location: "BOX HILL",
    category: "HOUSES",
    specs: { beds: 4, baths: 3, cars: 2 },
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    description: "The Outlook offers a modern take on suburban living. Designed with the growing family in mind, this home features expansive living areas, high-end materials, and a focus on natural light and ventilation.",
    features: ["Open Plan Living", "Gourmet Kitchen", "Landscaped Gardens", "Solar Energy System"],
    status: "Under Construction"
  },
  {
    title: "SOVEREIGN LUXE",
    location: "KELLYVILLE",
    category: "RESIDENTIAL",
    specs: { beds: 6, baths: 5, cars: 4 },
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
    description: "An upgrade to the signature Sovereign series, the Luxe edition provides even more space and higher level of customization. Every detail is finished with hand-selected materials from around the world.",
    features: ["Triple Garage", "Wine Cellar", "Private Cinema", "Elevator Access"],
    status: "Planning Phase"
  },
  {
    title: "DOUBLE BAY DUPLEX",
    location: "DOUBLE BAY",
    category: "DUPLEX",
    specs: { beds: 4, baths: 3, cars: 2 },
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    description: "In the heart of Double Bay, this duplex maximizes every square inch of the allotment. It offers low-maintenance luxury without sacrificing the feel of a standalone home.",
    features: ["Mirror Image Design", "Rooftop Terrace", "Bespoke Joinery", "High-efficiency HVAC"],
    status: "Completed 2023"
  },
  {
    title: "AZURE DUPLEX",
    location: "MARSDEN PARK",
    category: "DUPLEX",
    specs: { beds: 4, baths: 3, cars: 1 },
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&auto=format&fit=crop",
    description: "Azure Duplex in Marsden Park represents the pinnacle of duplex architecture. This meticulously crafted property features premium finishes, innovative spatial design, and a seamless integration with its surroundings. Part of the Manor Builders premium portfolio.",
    features: ["Premium Finishes", "Smart Home Ready", "Innovative Spatial Design", "Luxury Collection"],
    status: "Completed 2024"
  },
  {
    title: "PINNACLE POINT",
    location: "SYDNEY CBD",
    category: "APARTMENTS",
    specs: { beds: 3, baths: 2, cars: 2 },
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
    description: "Pinnacle Point offers luxury high-rise living with unmatched views of the Sydney skyline. Each unit is designed for maximum acoustic privacy and thermal comfort.",
    features: ["Floor-to-ceiling Windows", "Building Concierge", "Private Gym & Spa", "Automated Parking"],
    status: "Completed 2024"
  },
  {
    title: "HARBOUR VIEW",
    location: "POINT PIPER",
    category: "HOUSES",
    specs: { beds: 5, baths: 4, cars: 3 },
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    description: "Located in one of Sydney's most exclusive suburbs, Harbour View features a multi-level design that capitalizes on a world-class view. The use of natural stone and floor-to-ceiling glass defines its aesthetic.",
    features: ["Infinity Waterfront Pool", "Natural Stone Facade", "Home Automation", "Private Jetty"],
    status: "Completed 2024"
  },
  {
    title: "BEL-AIR ESTATE",
    location: "BELLA VISTA",
    category: "HOUSES",
    specs: { beds: 6, baths: 4, cars: 4 },
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1200&auto=format&fit=crop",
    description: "A sprawling estate in Bella Vista designed for entertaining. The property includes multiple living zones, a resort-style outdoor area, and a chef-grade kitchen.",
    features: ["Butler's Pantry", "Tennis Court", "Guest Wing", "Ducted Vacuum System"],
    status: "Completed 2024"
  },
  {
    title: "GRAND RESIDENCE",
    location: "PYMBLE",
    category: "RESIDENTIAL",
    specs: { beds: 7, baths: 6, cars: 5 },
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop",
    description: "One of our most ambitious projects to date, the Grand Residence in Pymble is a multi-generational home that combines classic elegance with modern technical requirements.",
    features: ["Heated Floors", "Integrated Smart Tech", "Landscaped Courtyards", "Multiple Ensuites"],
    status: "Completed 2024"
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTrade, setSelectedTrade] = useState<typeof TRADES[0] | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleWhatsAppInquiry = (e: FormEvent) => {
    e.preventDefault();
    const phone = '61401651269';
    const text = `Hello Manor Builders,\n\nI would like to make an inquiry.\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
  };

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const dropdownOptions = {
    type: ['All Types', 'House', 'Apartment', 'Duplex', 'Townhouse'],
    lookingTo: ['Buy', 'Rent', 'Invest', 'Off the Plan'],
    location: ['Sydney', 'Bella Vista', 'Kellyville', 'Box Hill', 'Marsden Park', 'Norwest', 'Melbourne', 'Brisbane']
  };

  const [searchParams, setSearchParams] = useState({
    type: dropdownOptions.type[0],
    lookingTo: dropdownOptions.lookingTo[0],
    location: dropdownOptions.location[0]
  });

  const handleSearch = () => {
    setIsLoading(true);
    // Set category based on selected type if it matches
    const typeUpper = searchParams.type.toUpperCase();
    if (typeUpper === 'ALL TYPES') {
      setSelectedCategory('ALL');
    } else if (typeUpper === 'HOUSE') {
      setSelectedCategory('HOUSES');
    } else if (typeUpper === 'APARTMENT') {
      setSelectedCategory('APARTMENTS');
    } else {
      setSelectedCategory(typeUpper);
    }
    
    setTimeout(() => {
      setIsLoading(false);
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen text-gray-900 bg-white selection:bg-brand-accent/30 font-sans">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-brand-primary flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background Gradient Effect - Meriton Inspired */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-brand-accent/20 to-transparent"></div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Luxury Logo M inspired by Meriton */}
              <div className="relative mb-12">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="w-24 h-32 border-l-[3px] border-r-[3px] border-brand-accent flex items-center justify-center relative"
                >
                  {/* Top/Bottom accents */}
                  <div className="absolute top-0 -left-2 w-[calc(100%+16px)] h-[3px] bg-brand-accent"></div>
                  <div className="absolute bottom-0 -left-2 w-[calc(100%+16px)] h-[3px] bg-brand-accent"></div>
                  
                  {/* The central M */}
                  <div className="flex items-end justify-center h-full w-full relative">
                    <span className="text-brand-accent text-[120px] font-display font-medium tracking-tighter leading-none -mb-2">M</span>
                    
                    {/* Architectural detail lines matching the Meriton aesthetic */}
                    <div className="absolute top-[25%] left-[10%] w-[1px] h-[55%] bg-brand-accent/50 transform rotate-[-35deg] origin-top"></div>
                    <div className="absolute top-[25%] right-[10%] w-[1px] h-[55%] bg-brand-accent/50 transform rotate-[35deg] origin-top"></div>
                  </div>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ letterSpacing: "1.5em", opacity: 0 }}
                animate={{ letterSpacing: "0.4em", opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="text-white text-2xl sm:text-6xl font-display font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-center px-4"
              >
                Manor Builders
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Entry Section (Page 2) */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center justify-center bg-brand-primary">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" 
            alt="Luxury Architecture" 
            className="w-full h-full object-cover scale-110 motion-safe:animate-[pulse_10s_ease-in-out_infinite] brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/60 via-transparent to-brand-primary/80"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="w-16 h-20 border-l-2 border-r-2 border-brand-accent flex items-center justify-center relative mb-8">
            <div className="absolute top-0 -left-1 w-[calc(100%+8px)] h-[2px] bg-brand-accent"></div>
            <div className="absolute bottom-0 -left-1 w-[calc(100%+8px)] h-[2px] bg-brand-accent"></div>
            <span className="text-brand-accent text-5xl font-display font-medium tracking-tighter -mb-1">M</span>
          </div>

          <h1 className="text-white text-4xl sm:text-7xl font-display font-bold uppercase tracking-[0.4em] text-center mb-4">
            Manor Builders
          </h1>
          <p className="text-brand-accent text-sm sm:text-lg font-medium tracking-[0.3em] uppercase opacity-80">
            Defining Luxury Living
          </p>
        </motion.div>

        {/* Scroll indicator inspired by Meriton */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        >
          <button 
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex flex-col items-center gap-4 bg-brand-primary/20 backdrop-blur-md border border-brand-accent/20 px-8 py-4 text-brand-accent hover:bg-brand-accent hover:text-brand-primary transition-all duration-500"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] whitespace-nowrap">Scroll to Explore</span>
            <div className="w-px h-12 bg-brand-accent/30 relative overflow-hidden">
               <motion.div 
                 animate={{ y: ["-100%", "100%"] }}
                 transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                 className="absolute top-0 left-0 w-full h-full bg-brand-accent"
               />
            </div>
          </button>
        </motion.div>
      </section>

      {/* Horizontal Search Navigation - Inspired by Meriton Screenshot */}
      <nav className="sticky top-0 z-50 bg-white shadow-md flex flex-col lg:flex-row items-stretch min-h-24">
        <div className="flex items-stretch h-20 lg:h-auto border-b lg:border-b-0 border-gray-100">
          {/* Logo Section */}
          <div className="bg-brand-primary w-20 sm:w-32 flex items-center justify-center shrink-0 h-full">
             <div className="w-10 sm:w-14 h-10 sm:h-16 border-l-2 border-r-2 border-brand-accent flex items-center justify-center relative">
                <div className="absolute top-0 -left-1 w-[calc(100%+8px)] h-[2px] bg-brand-accent"></div>
                <div className="absolute bottom-0 -left-1 w-[calc(100%+8px)] h-[2px] bg-brand-accent"></div>
                <span className="text-brand-accent text-2xl sm:text-5xl font-display font-medium tracking-tighter -mb-1">M</span>
             </div>
          </div>

          {/* Navigation Links - Desktop Only */}
          <div className="hidden lg:flex flex-grow items-center px-10 gap-10 divide-x-0 divide-transparent">
              {['About', 'Services', 'Projects', 'Contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[11px] font-bold uppercase tracking-widest text-brand-primary hover:text-brand-accent transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden flex-grow items-center justify-end px-6">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-brand-primary"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar Components */}
        <div className="flex-grow flex flex-row items-stretch divide-x divide-gray-100 bg-white overflow-x-auto no-scrollbar lg:overflow-visible">

           {/* Property Type */}
           <div 
             className="flex-1 min-w-[110px] sm:min-w-[200px] p-3 sm:px-10 flex flex-col justify-center group cursor-pointer hover:bg-gray-50 transition-colors relative"
             onClick={(e) => {
               e.stopPropagation();
               setActiveDropdown(activeDropdown === 'type' ? null : 'type');
             }}
           >
              <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 align-middle">Property</span>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] sm:text-xs font-bold text-brand-primary truncate">{searchParams.type}</span>
                <ChevronRight className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-accent transition-transform duration-500 ${activeDropdown === 'type' ? 'rotate-[-90deg]' : 'rotate-90'}`} />
              </div>

               <AnimatePresence>
                {activeDropdown === 'type' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute top-full left-0 w-full min-w-[180px] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-gray-100 z-[100] py-2 mt-[1px]"
                  >
                    {dropdownOptions.type.map((opt) => (
                      <button 
                        key={opt}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchParams({ ...searchParams, type: opt });
                          setActiveDropdown(null);
                        }}
                        className={`w-full text-left px-5 py-3 text-[10px] sm:text-[11px] font-bold transition-all duration-300 border-b border-gray-50 last:border-0 ${
                          searchParams.type === opt 
                            ? 'bg-brand-accent text-brand-primary' 
                            : 'text-brand-primary hover:bg-gray-50 hover:pl-7'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
           </div>

           {/* Looking To */}
           <div 
             className="flex-1 min-w-[110px] sm:min-w-[200px] p-3 sm:px-10 flex flex-col justify-center group cursor-pointer hover:bg-gray-50 transition-colors relative"
             onClick={(e) => {
               e.stopPropagation();
               setActiveDropdown(activeDropdown === 'lookingTo' ? null : 'lookingTo');
             }}
           >
              <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 align-middle">Looking To</span>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] sm:text-xs font-bold text-brand-primary truncate">{searchParams.lookingTo}</span>
                <ChevronRight className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-accent transition-transform duration-500 ${activeDropdown === 'lookingTo' ? 'rotate-[-90deg]' : 'rotate-90'}`} />
              </div>

              <AnimatePresence>
                {activeDropdown === 'lookingTo' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute top-full left-0 w-full min-w-[180px] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-gray-100 z-[100] py-2 mt-[1px]"
                  >
                    {dropdownOptions.lookingTo.map((opt) => (
                      <button 
                        key={opt}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchParams({ ...searchParams, lookingTo: opt });
                          setActiveDropdown(null);
                        }}
                        className={`w-full text-left px-5 py-3 text-[10px] sm:text-[11px] font-bold transition-all duration-300 border-b border-gray-50 last:border-0 ${
                          searchParams.lookingTo === opt 
                            ? 'bg-brand-accent text-brand-primary' 
                            : 'text-brand-primary hover:bg-gray-50 hover:pl-7'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
           </div>

           {/* Location */}
           <div 
             className="flex-1 min-w-[110px] sm:min-w-[240px] p-3 sm:px-10 flex flex-col justify-center group cursor-pointer hover:bg-gray-50 transition-colors relative"
             onClick={(e) => {
               e.stopPropagation();
               setActiveDropdown(activeDropdown === 'location' ? null : 'location');
             }}
           >
              <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 align-middle">Location</span>
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1 sm:gap-3">
                   <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-accent" />
                   <span className="text-[11px] sm:text-xs font-bold text-brand-primary truncate">{searchParams.location}</span>
                </div>
                <ChevronRight className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-accent transition-transform duration-500 ${activeDropdown === 'location' ? 'rotate-[-90deg]' : 'rotate-90'}`} />
              </div>

              <AnimatePresence>
                {activeDropdown === 'location' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute top-full left-0 w-full min-w-[180px] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-gray-100 z-[100] py-2 mt-[1px]"
                  >
                    {dropdownOptions.location.map((opt) => (
                      <button 
                        key={opt}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchParams({ ...searchParams, location: opt });
                          setActiveDropdown(null);
                        }}
                        className={`w-full text-left px-5 py-3 text-[10px] sm:text-[11px] font-bold transition-all duration-300 border-b border-gray-50 last:border-0 ${
                          searchParams.location === opt 
                            ? 'bg-brand-accent text-brand-primary' 
                            : 'text-brand-primary hover:bg-gray-50 hover:pl-7'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>

        {/* Search Button Section */}
        <div className="w-20 lg:w-48 bg-[#F5F2ED] p-2 flex items-center justify-center shrink-0 h-auto lg:border-l border-gray-100">
           <button 
             onClick={handleSearch}
             className="w-full h-full border border-brand-accent/30 flex items-center justify-center hover:bg-brand-accent hover:text-brand-primary transition-all duration-500 group"
           >
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.4em] text-brand-primary group-hover:scale-110 transition-transform">Search</span>
           </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-primary z-[60] flex flex-col items-center justify-center p-12 lg:hidden"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 text-brand-accent"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col space-y-8 text-center">
              {['Home', 'Services', 'About', 'Projects', 'Contact'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => {
                    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="text-2xl font-display font-bold uppercase tracking-[0.3em] text-white hover:text-brand-accent transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-[600px] md:h-[500px] bg-gray-900 flex items-center overflow-hidden scroll-mt-24">
        {/* Abstract architectural graphic background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute w-full h-full bg-gradient-to-r from-brand-primary via-transparent to-transparent z-10"></div>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,100 L40,40 L60,80 L100,20 L100,100 Z" fill="#0A192F" />
            <path d="M20,100 L50,20 L80,90 L100,40 L100,100 Z" fill="#C5A059" fillOpacity="0.2" />
          </svg>
        </div>
        
        <div className="container relative z-20 px-6 mx-auto flex flex-col md:flex-row items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-1/2 text-white pr-0 md:pr-16"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-brand-accent"></div>
              <span className="text-brand-accent uppercase tracking-[0.3em] text-xs font-bold">Premier Residential Developer</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light leading-[1.1] mb-6 text-white">
              Building the <span className="font-bold">Modern</span> Lifestyle.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
              Expertise in the construction of luxury residential houses and premium duplexes across the region.
            </p>
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              View Our Projects
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden md:flex relative z-20 w-1/2 h-full items-center justify-center"
          >
             <div className="w-[400px] h-[300px] border border-brand-accent/30 p-4">
                <div className="w-full h-full bg-brand-primary flex items-center justify-center relative">
                   <div className="absolute top-6 left-6 text-brand-accent opacity-20 text-9xl font-bold">MB</div>
                   <div className="text-center z-10">
                     <div className="text-white text-sm uppercase tracking-widest mb-1 opacity-60 font-sans">Excellence In</div>
                     <div className="text-brand-accent text-4xl font-display italic">Craftsmanship</div>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Services & Trade Expertise Section */}
      <section id="services" className="bg-white px-4 sm:px-6 md:px-16 py-20 sm:py-32 border-b border-gray-100 overflow-hidden scroll-mt-24">
        <div className="container mx-auto">
          <div className="max-w-4xl mb-12 sm:mb-20 text-center mx-auto">
            <span className="section-label mb-6 mx-auto">Specialist Trades</span>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-medium text-brand-primary leading-tight mb-6 sm:mb-8 uppercase tracking-tight">
              Trade <span className="text-brand-accent italic font-serif">Expertise.</span>
            </h2>
            <p className="text-lg sm:text-xl text-brand-grey leading-relaxed font-light px-2 sm:px-0">
              Our workforce is comprised of dedicated artisans specializing in every vertical of construction. We maintain absolute control over quality by employing the finest master tradespeople in the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {TRADES.map((trade, index) => (
              <motion.button 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedTrade(trade)}
                className="group relative h-64 sm:h-80 bg-brand-primary overflow-hidden flex flex-col items-center justify-center p-6 sm:p-8 text-center transition-all duration-700"
              >
                {/* Background overlay that moves on hover */}
                <div className="absolute inset-0 bg-neutral-900 transition-all duration-700 opacity-60 group-hover:opacity-40"></div>
                {(trade as any).images?.[0] && (
                  <img 
                    src={(trade as any).images[0]} 
                    alt={trade.title} 
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 sm:opacity-30 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-110" 
                    referrerPolicy="no-referrer"
                  />
                )}
                
                <div className="relative z-10 flex flex-col items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-primary transition-all duration-500 scale-110">
                    {trade.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-white uppercase tracking-[0.2em] mb-2">{trade.title}</h3>
                    <div className="w-12 h-0.5 bg-brand-accent mx-auto transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                  </div>
                  <span className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.4em] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">View Expertise</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Trade Detail Modal */}
      <AnimatePresence>
        {selectedTrade && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-10"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTrade(null)}
              className="absolute inset-0 bg-brand-primary/95 backdrop-blur-2xl"
            />
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 30 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 30 }}
               className="relative w-full max-w-6xl h-full max-h-[90vh] sm:max-h-[85vh] bg-neutral-900 border border-white/5 flex flex-col md:flex-row overflow-hidden shadow-2xl"
             >
                <button 
                  onClick={() => setSelectedTrade(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-accent text-brand-primary flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
 
                {/* Design Detail Side */}
                <div className="w-full md:w-1/3 h-48 sm:h-64 md:h-full bg-neutral-800 relative overflow-hidden flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 shrink-0">
                   <div className="absolute inset-0 opacity-20 pointer-events-none">
                     <svg className="w-full h-full" viewBox="0 0 100 100">
                       <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                         <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                       </pattern>
                       <rect width="100" height="100" fill="url(#grid)" />
                     </svg>
                   </div>
                   <div className="relative z-10 text-center px-6 sm:px-8">
                      <div className="w-16 h-16 sm:w-24 sm:h-24 bg-brand-accent flex items-center justify-center text-brand-primary mx-auto mb-4 sm:mb-8 shadow-[0_0_30px_rgba(170,140,93,0.3)]">
                         {selectedTrade.icon && <div className="scale-[1.5] sm:scale-[2]">{selectedTrade.icon}</div>}
                      </div>
                      <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.5em] text-brand-accent mb-2 sm:mb-4 block">Master Trade</span>
                      <h2 className="text-2xl sm:text-4xl font-display font-medium text-white uppercase tracking-tight leading-none mb-2 sm:mb-4">
                         {selectedTrade.title}
                      </h2>
                   </div>
                </div>
 
                {/* Content Side */}
                <div className="w-full md:w-2/3 h-full overflow-y-auto no-scrollbar p-6 sm:p-16 flex flex-col">
                   <div className="space-y-8 sm:space-y-12">
                     <div>
                       <h4 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent border-b border-white/10 pb-4 mb-4 sm:mb-6">Expertise Overview</h4>
                       <p className="text-xl sm:text-2xl text-blue-100/70 font-light leading-relaxed mb-6 sm:mb-8">
                         {selectedTrade.details}
                       </p>
                     </div>
 
                     {(selectedTrade as any).extendedDetails && (
                       <div className="space-y-4 sm:space-y-6">
                         <h4 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent border-b border-white/10 pb-4">Technical Depth</h4>
                         <div className="text-sm sm:text-base text-gray-400 leading-relaxed bg-white/[0.03] p-6 sm:p-8 border-l border-brand-accent whitespace-pre-wrap font-light italic">
                           {(selectedTrade as any).extendedDetails}
                         </div>
                       </div>
                     )}
 
                     <div className="flex flex-wrap gap-2 sm:gap-4 pt-6 sm:pt-10">
                        {['Certified Master Artisan', 'Precision Work', 'Premium Materials', 'Structural Guarantee'].map(tag => (
                          <span key={tag} className="px-3 py-2 sm:px-5 sm:py-3 bg-white/5 border border-white/10 text-[8px] sm:text-[9px] uppercase font-bold tracking-widest text-brand-accent">
                            {tag}
                          </span>
                        ))}
                     </div>
                   </div>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* About Section */}
      <section id="about" className="py-24 bg-white border-b border-gray-100 overflow-hidden scroll-mt-24">
        <div className="container px-6 mx-auto">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="pt-12">
                   <div className="border border-brand-accent/20 p-2">
                    <img 
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" 
                      className="shadow-sm aspect-[3/4] object-cover w-full" 
                      alt="Modern Architectural Work"
                      referrerPolicy="no-referrer"
                    />
                   </div>
                </div>
                <div>
                   <div className="border border-brand-primary/20 p-2">
                    <img 
                      src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&auto=format&fit=crop" 
                      className="shadow-sm aspect-[3/4] object-cover w-full" 
                      alt="Construction Excellence"
                      referrerPolicy="no-referrer"
                    />
                   </div>
                </div>
              </div>
            </div>

            <div>
              <span className="section-label">Our Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-light text-brand-primary leading-tight">
                Excellence in <br />
                <span className="font-bold underline decoration-brand-accent decoration-4 underline-offset-8">Construction</span>
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-brand-grey font-medium">
                Manor Builders Pvt Ltd is a premier construction firm specializing in residential developments. With a dedicated team of master tradespeople, we bring expertise in carpentry, bricklaying, painting, roofing, and more.
              </p>
              <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-gray-100">
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Licence</p>
                  <p className="text-2xl font-mono font-bold text-brand-primary tracking-tighter">357430C</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">ACN</p>
                  <p className="text-2xl font-mono font-bold text-brand-primary tracking-tighter">642 725</p>
                </div>
              </div>

              <div className="mt-12">
                <a href="#contact" className="btn-primary inline-block">
                  Discuss Your Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-brand-primary text-white scroll-mt-24">
        <div className="container px-6 mx-auto">
          <div className="mb-24">
            <span className="text-brand-accent uppercase tracking-[0.4em] text-[10px] sm:text-xs font-bold mb-6 block">Portfolio</span>
            <button 
              onClick={() => setSelectedCategory('ALL')}
              className="text-left group w-full"
            >
              <h2 className="text-4xl sm:text-8xl md:text-[120px] font-display font-black text-white uppercase tracking-tighter leading-[0.85] group-hover:text-brand-accent transition-colors break-words">
                Modern <br /> Architecture
              </h2>
            </button>
          </div>

          {/* Filters - Inspired by screenshot */}
          <div className="flex overflow-x-auto no-scrollbar gap-4 mb-20 items-center pb-4 -mx-6 px-6 sm:overflow-visible sm:mx-0 sm:px-0">
             <div className="flex bg-brand-accent/5 border border-brand-accent/20 shrink-0">
                {['ALL', 'HOUSES', 'DUPLEX', 'RESIDENTIAL', 'APARTMENTS'].map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 sm:px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-all border-r border-brand-accent/10 last:border-0 whitespace-nowrap ${
                      selectedCategory === cat 
                        ? 'bg-brand-accent text-brand-primary' 
                        : 'hover:bg-brand-accent/20 hover:text-brand-accent text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </div>

          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.filter(p => {
              if (selectedCategory === 'ALL') return true;
              return p.category === selectedCategory;
            }).map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project as any)}
              >
                <div className="overflow-hidden aspect-[16/10] relative mb-6">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="object-cover w-full h-full grayscale-[0.2] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-brand-accent text-brand-primary px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                    {project.category}
                  </div>
                  <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <span className="bg-brand-accent text-brand-primary px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transform translate-y-4 group-hover:translate-y-0 transition-transform">View Project</span>
                  </div>
                </div>
                
                <h4 className="text-2xl font-display font-bold mb-2 tracking-tight group-hover:text-brand-accent transition-colors">{project.title}</h4>
                <div className="flex items-center gap-2 text-brand-accent text-xs font-bold tracking-widest mb-6">
                  <MapPin className="w-3 h-3" />
                  <span>{project.location}</span>
                </div>
                
                <div className="flex items-center gap-6 pt-6 border-t border-white/10 text-white/60">
                   <div className="flex items-center gap-2">
                     <Home className="w-4 h-4" />
                     <span className="text-sm font-bold">{project.specs.beds}</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <Droplets className="w-4 h-4" />
                     <span className="text-sm font-bold">{project.specs.baths}</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <Grid2X2 className="w-4 h-4" />
                     <span className="text-sm font-bold">{project.specs.cars}</span>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal - Inspired by User Screenshot */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-brand-primary/95 backdrop-blur-xl"
            />
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-7xl h-full max-h-[90vh] sm:max-h-[85vh] bg-neutral-900 border border-white/10 flex flex-col md:flex-row overflow-hidden shadow-2xl"
             >
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-accent text-brand-primary flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
 
                {/* Image Side */}
                <div className="w-full md:w-1/2 h-48 sm:h-64 md:h-full relative overflow-hidden shrink-0">
                   <img 
                     src={selectedProject.image} 
                     alt={selectedProject.title}
                     className="w-full h-full object-cover"
                     referrerPolicy="no-referrer"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent md:bg-gradient-to-r" />
                </div>
 
                {/* Content Side */}
                <div className="w-full md:w-1/2 h-full overflow-y-auto no-scrollbar p-6 sm:p-16 flex flex-col">
                   <div className="mb-4">
                      <span className="bg-brand-accent text-brand-primary px-3 py-1 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest leading-none inline-block mb-3 sm:mb-4">
                         {selectedProject.category}
                      </span>
                      <h2 className="text-3xl sm:text-6xl font-display font-bold text-white uppercase tracking-tight leading-[0.9] mb-4">
                         {selectedProject.title}
                      </h2>
                      <div className="flex items-center gap-2 text-brand-accent text-xs sm:text-sm font-bold tracking-widest mb-6 sm:mb-10">
                         <MapPin className="w-3.5 h-3.5 sm:w-4 h-4" />
                         <span>{selectedProject.location}</span>
                      </div>
                   </div>
 
                   {/* Specs Box */}
                   <div className="grid grid-cols-3 gap-1 p-1 bg-white/5 border border-white/10 mb-8 sm:mb-12">
                      <div className="p-3 sm:p-6 bg-neutral-800/50 flex flex-col items-center justify-center">
                         <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 sm:mb-4">Beds</span>
                         <div className="flex items-center gap-1.5 sm:gap-3">
                            <Home className="w-4 h-4 sm:w-5 sm:h-5 text-brand-accent" />
                            <span className="text-lg sm:text-2xl font-display font-medium text-white">{selectedProject.specs.beds}</span>
                         </div>
                      </div>
                      <div className="p-3 sm:p-6 bg-neutral-800/50 flex flex-col items-center justify-center">
                         <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 sm:mb-4">Baths</span>
                         <div className="flex items-center gap-1.5 sm:gap-3">
                            <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-brand-accent" />
                            <span className="text-lg sm:text-2xl font-display font-medium text-white">{selectedProject.specs.baths}</span>
                         </div>
                      </div>
                      <div className="p-3 sm:p-6 bg-neutral-800/50 flex flex-col items-center justify-center">
                         <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 sm:mb-4">Cars</span>
                         <div className="flex items-center gap-1.5 sm:gap-3">
                            <Grid2X2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-accent" />
                            <span className="text-lg sm:text-2xl font-display font-medium text-white">{selectedProject.specs.cars}</span>
                         </div>
                      </div>
                   </div>
 
                   {/* Description */}
                   <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                      <h4 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-brand-accent border-b border-white/10 pb-3 sm:pb-4">Description</h4>
                      <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed">
                         {(selectedProject as any).description}
                      </p>
                   </div>
 
                   {/* Two Column details */}
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                      <div className="space-y-4 sm:space-y-6">
                         <h4 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-brand-accent border-b border-white/10 pb-3 sm:pb-4">Features</h4>
                         <ul className="space-y-2 sm:space-y-3">
                            {(selectedProject as any).features.map((feat: string) => (
                              <li key={feat} className="flex items-center gap-3 text-xs sm:text-sm text-gray-300">
                                 <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-brand-accent"></div>
                                 {feat}
                              </li>
                            ))}
                         </ul>
                      </div>
                      <div className="space-y-4 sm:space-y-6">
                         <h4 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-brand-accent border-b border-white/10 pb-3 sm:pb-4">Status</h4>
                         <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300">
                               <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 h-4 text-brand-accent" />
                               <span>{(selectedProject as any).status}</span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                               <ShieldCheck className="w-3.5 h-3.5 sm:w-4 h-4" />
                               <span>Luxury Collection</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-surface scroll-mt-24">
        <div className="container px-6 mx-auto">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-start">
             <div className="w-full md:w-1/2">
                <span className="section-label">Contact Us</span>
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-medium text-brand-primary mb-6 sm:mb-8 leading-tight">
                  Let's Build <br /> <span className="font-bold whitespace-nowrap sm:whitespace-normal">Something Great.</span>
                </h2>
                <p className="text-brand-grey mb-12 text-lg">Ready to start your next project? Contact us today for a consultation and competitive quote.</p>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-primary text-white flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email Us</p>
                      <a href="mailto:admin@thecapitalre.com.au" className="text-lg font-bold text-brand-primary hover:text-brand-accent transition-colors">admin@thecapitalre.com.au</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-primary text-white flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Call Us</p>
                      <a href="tel:+61401651269" className="text-lg font-bold text-brand-primary hover:text-brand-accent transition-colors">+61 401 651 269</a>
                    </div>
                  </div>
                  <a 
                    href="https://wa.me/61401651269" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 bg-brand-accent text-brand-primary flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">WhatsApp Us</p>
                      <p className="text-lg font-bold text-brand-primary group-hover:text-brand-accent transition-colors">Chat Now</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-primary text-white flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Visit Us</p>
                      <p className="text-sm font-bold text-brand-primary leading-tight">11/4a, Meridian Palace,<br />Bella Vista, NSW - 2153</p>
                    </div>
                  </div>
                </div>
             </div>

             <div className="w-full md:w-1/2 bg-white p-8 md:p-12 border border-gray-100 shadow-sm transition-shadow hover:shadow-md">
                <form className="space-y-6" onSubmit={handleWhatsAppInquiry}>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-grey">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full p-4 text-sm bg-surface border border-gray-100 outline-none focus:border-brand-accent transition-colors" 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-grey">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full p-4 text-sm bg-surface border border-gray-100 outline-none focus:border-brand-accent transition-colors" 
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-grey">Message</label>
                    <textarea 
                      rows={4} 
                      required
                      className="w-full p-4 text-sm bg-surface border border-gray-100 outline-none focus:border-brand-accent transition-colors" 
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full btn-primary">
                    Send Inquiry via WhatsApp
                  </button>
                </form>
             </div>
          </div>
        </div>
      </section>

      {/* Footer - Premium Manor Style */}
      <footer className="bg-brand-primary text-white py-16 sm:py-24 border-t border-brand-accent/20">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
               <div className="w-16 h-20 border-l-2 border-r-2 border-brand-accent flex items-center justify-center relative">
                  <div className="absolute top-0 -left-1 w-[calc(100%+8px)] h-[2px] bg-brand-accent"></div>
                  <div className="absolute bottom-0 -left-1 w-[calc(100%+8px)] h-[2px] bg-brand-accent"></div>
                  <span className="text-brand-accent text-5xl font-display font-medium tracking-tighter -mb-1">M</span>
               </div>
               <p className="text-xs text-blue-100/60 leading-relaxed max-w-xs">
                 Australia's leading developer of premium residences, creating landmarks across the nation for over 60 years.
               </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
               <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">Information</h4>
               <ul className="space-y-4">
                 <li>
                   <div className="flex flex-col">
                     <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Licence Number</span>
                     <span className="text-base font-mono text-white">357430C</span>
                   </div>
                 </li>
                 <li>
                   <div className="flex flex-col">
                     <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">ACN</span>
                     <span className="text-base font-mono text-white">642 725 022</span>
                   </div>
                 </li>
               </ul>
            </div>

            <div className="space-y-6 sm:space-y-8">
               <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">Expertise</h4>
               <ul className="space-y-4">
                 {['Residential Construction', 'Luxury Duplexes', 'Modern Apartments', 'Land Development'].map((exp) => (
                   <li key={exp}>
                     <span className="text-xs font-bold text-blue-100/80">{exp}</span>
                   </li>
                 ))}
               </ul>
            </div>

            <div className="space-y-6 sm:space-y-8">
               <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">Connect</h4>
               <div className="space-y-4">
                  <a href="tel:+61401651269" className="flex items-center gap-3 hover:text-brand-accent transition-colors group">
                    <Phone className="w-4 h-4 text-brand-accent group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">+61 401 651 269</span>
                  </a>
                  <a href="https://wa.me/61401651269" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-brand-accent transition-colors group">
                    <MessageCircle className="w-4 h-4 text-brand-accent group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">WhatsApp Messenger</span>
                  </a>
                  <a href="mailto:admin@thecapitalre.com.au" className="flex items-center gap-3 hover:text-brand-accent transition-colors group">
                    <Mail className="w-4 h-4 text-brand-accent group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">admin@thecapitalre.com.au</span>
                  </a>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-brand-accent" />
                    <span className="text-xs font-bold">Bella Vista, NSW - 2153</span>
                  </div>
               </div>
            </div>
          </div>


        </div>
      </footer>
    </div>
  );
}