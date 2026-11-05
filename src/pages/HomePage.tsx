import React, { useState, useEffect } from 'react';
import { 
  Phone, Calendar, Clock, Award, ChevronLeft, ChevronRight, 
  ArrowRight, Ambulance, Microscope, Star, CheckCircle2, MessageCircle 
} from 'lucide-react';
import { 
  HOSPITAL_INFO, DOCTORS_DATA, DEPARTMENTS_DATA, 
  CHUGHTAI_LAB_TESTS, TESTIMONIALS_DATA 
} from '../data/hospitalData';
import { DoctorAvatar } from '../components/DoctorAvatar';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  onOpenBooking: (doctorId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab, onOpenBooking }) => {
  // Hero slide state
  const [currentSlide, setCurrentSlide] = useState(0);
  // Testimonial slider state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const heroSlides = [
    {
      title: "Al Rehmat Hospital & Medical Complex",
      subtitle: "24/7 Emergency response, specialized clinical care, and official Chughtai Lab diagnostic facilities in Gujranwala.",
      badge: "24/7 Medical Care",
      cta: "Book Appointment",
      action: () => onOpenBooking(),
      image: "https://i.postimg.cc/MKDzmw6G/banner.jpg"
    },
    {
      title: "24/7 Emergency Care",
      subtitle: "Immediate trauma response, continuous vital monitoring, and medical triage always on duty in Gujranwala.",
      badge: "24/7 Trauma & Emergency",
      cta: "Call Helpline",
      action: () => window.location.href = `tel:${HOSPITAL_INFO.phoneRaw}`,
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1600"
    },
    {
      title: "Maternity & Gynecology",
      subtitle: "Consultant gynecologists & lady doctors providing safe normal deliveries, C-sections, ultrasound scans, and infertility treatments.",
      badge: "Women's Health & Delivery",
      cta: "Book Gynecologist",
      action: () => onOpenBooking('dr-nabeela-aslam'),
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1600"
    },
    {
      title: "Pediatrics & Child Care",
      subtitle: "Specialized care for delayed speech, delayed milestones, nutrition, and acute pediatric infections under Dr. Nadeem Aslam.",
      badge: "Child Health Specialist",
      cta: "Book Pediatrician",
      action: () => onOpenBooking('dr-nadeem-aslam'),
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=1600"
    },
    {
      title: "Diagnostic Ultrasound & Chughtai Lab",
      subtitle: "Official 24/7 pathology collection center & daily sonography (3 PM - 6 PM) with computerized digital reports.",
      badge: "Diagnostic Partner",
      cta: "View Lab Tests",
      action: () => setActiveTab('facilities'),
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1600"
    }
  ];

  // Auto advance hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Visual Hero Banner with High-Res Medical Backgrounds */}
      <section className="relative overflow-hidden bg-slate-950 text-white min-h-[520px] sm:min-h-[580px] flex items-center">
        {/* Background Images with crossfade & lightened modern scrim */}
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-85 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-slate-900/25" />
          </div>
        ))}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full z-10">
          <div className="max-w-2xl space-y-6">
            
            {/* Clean pill-free Tag */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-red-400 uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              <span>{heroSlides[currentSlide].badge}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300">AL REHMAT HOSPITAL</span>
            </div>

            {/* Big Bold Headline */}
            <h1 className="text-4xl sm:text-6xl font-heading font-black text-white tracking-tight leading-[1.1]">
              {heroSlides[currentSlide].title}
            </h1>

            {/* Concise Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              {heroSlides[currentSlide].subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={heroSlides[currentSlide].action}
                className="px-6 py-3.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>{heroSlides[currentSlide].cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenBooking()}
                className="px-6 py-3.5 text-sm font-bold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl border border-white/20 transition-all cursor-pointer"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Slide Controls */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-xs border border-white/15 transition-all cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-xs border border-white/15 transition-all cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 2. Quick Action Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="bg-red-600 text-white p-6 rounded-2xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Ambulance className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg">24/7 Emergency</h3>
              <p className="text-xs text-red-100">Round-the-clock trauma & medical response</p>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-bold text-lg">Online Appointments</h3>
              <button
                onClick={() => onOpenBooking()}
                className="text-xs font-bold text-red-400 hover:text-red-300 mt-0.5 flex items-center gap-1 cursor-pointer"
              >
                <span>Reserve Token Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bg-white text-slate-800 p-6 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Microscope className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-bold text-lg">Chughtai Lab 24/7</h3>
              <button
                onClick={() => setActiveTab('facilities')}
                className="text-xs font-bold text-blue-700 hover:text-blue-800 mt-0.5 flex items-center gap-1 cursor-pointer"
              >
                <span>Diagnostic Tests & Home Sampling</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Community Free Medical Camp Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-800 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-red-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider block">
              Special Community Initiative
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
              Community Free Medical Camp
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Supervised by <strong>Dr. Nadeem Aslam Sikandar</strong> (Child & Medical Specialist). Free pediatric checkups, milestone guidance, and basic health screenings.
            </p>
            <p className="text-xs text-amber-300 font-bold pt-1">
              Every Friday: 04:00 PM – 07:00 PM · Al Rehmat Hospital
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenBooking('dr-nadeem-aslam')}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Register for Free Camp
            </button>
          </div>
        </div>
      </section>

      {/* 4. Specialist Doctors Directory (Using Avatars instead of photos) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
              Medical Faculty
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-slate-900">
              Specialist Doctors & Consultants
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('doctors')}
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Schedules</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCTORS_DATA.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3.5 mb-4">
                  {/* Doctor Photograph or Avatar */}
                  <DoctorAvatar 
                    gender={doc.gender} 
                    image={doc.image} 
                    name={doc.name} 
                    className="w-16 h-16 shrink-0" 
                  />

                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold text-red-600 uppercase block truncate">
                      {doc.department}
                    </span>
                    <h3 className="font-heading font-bold text-base text-slate-900 truncate mt-0.5">
                      {doc.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium truncate">
                      {doc.qualification}
                    </p>
                    {doc.isGoldMedalist && (
                      <span className="inline-block mt-1 text-[10px] font-extrabold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                        Gold Medalist
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-center gap-2 mb-3">
                  <Clock className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span className="font-semibold">{doc.timing}</span>
                </div>

                <div className="space-y-1 mb-4">
                  {doc.specialties.map((spec, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onOpenBooking(doc.id)}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer text-center"
                >
                  Book Token
                </button>
                <a
                  href={`https://wa.me/${HOSPITAL_INFO.whatsappNumber}?text=${encodeURIComponent(
                    `Hello, I want to book an appointment with ${doc.name}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl border border-emerald-200 transition-colors cursor-pointer"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Chughtai Lab Diagnostic Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest block">
              Diagnostic Pathology
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-white">
              Official Chughtai Lab Diagnostic Collection
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              24/7 blood sampling, hormonal assays, and ultrasound diagnostics with online reports delivered directly to WhatsApp. Home blood sample collection available upon request.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => setActiveTab('facilities')}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                View Diagnostic Tests
              </button>
              <button
                onClick={() => setActiveTab('facilities')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all cursor-pointer"
              >
                Request Home Sampling
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonial Slider (Slide style per user request) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
                Patient Feedback
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900">
                What Our Patients Say
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length)}
                className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS_DATA.length)}
                className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Testimonial Active Slide */}
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(TESTIMONIALS_DATA[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>

            <blockquote className="text-lg sm:text-xl font-medium text-slate-800 italic leading-relaxed">
              "{TESTIMONIALS_DATA[currentTestimonial].comment}"
            </blockquote>

            <div className="pt-2">
              <p className="font-bold text-sm text-slate-900">
                {TESTIMONIALS_DATA[currentTestimonial].patientName}
              </p>
              <p className="text-xs text-slate-500">
                {TESTIMONIALS_DATA[currentTestimonial].location} · Consulted {TESTIMONIALS_DATA[currentTestimonial].doctorConsulted}
              </p>
            </div>
          </div>

          {/* Slider Dots */}
          <div className="flex items-center gap-1.5 mt-8">
            {TESTIMONIALS_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === currentTestimonial ? 'w-8 bg-red-600' : 'w-2 bg-slate-200'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
