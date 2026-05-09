import Navbar from "../../components/layout/Navbar";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Health Screening",
    subtitle: "Thankfully, good health is a habit.",
    image: "/service_health_screening.png",
    link: "/services/health-screening"
  },
  {
    title: "Health Education",
    subtitle: "Developing healthy habits and awareness during childhood.",
    image: "/service_health_education.png",
    link: "/services/health-education"
  },
  {
    title: "School Infirmary Management",
    subtitle: "A well-organized infirmary for immediate medical attention.",
    image: "/service_infirmary.png",
    link: "/services/infirmary-management"
  },
  {
    title: "Mental Well-Being",
    subtitle: "Sensitive, holistic screening addressing emotional and behavioral health.",
    image: "/service_mental_wellbeing_v2.png",
    link: "/services/mental-well-being"
  },
  {
    title: "Health Records",
    subtitle: "Structured digital tracking for every student's long-term health profile.",
    image: "/service_health_records.png",
    link: "/services/health-records"
  }
];

export default function Services() {
  return (
    <>
      <Navbar />
      <section className="bg-slate-50 py-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-4">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight">
              Comprehensive School Health Services
            </h1>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="group rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-blue-50 hover:shadow-[0_20px_40px_rgba(30,64,175,0.12)] transition-all duration-300 flex flex-col h-full bg-white transform hover:-translate-y-1">
                {/* Top Image */}
                <div className="w-full h-64 relative shrink-0 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow items-start relative bg-white">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{service.title}</h3>
                  <p className="text-slate-600 mb-10 flex-grow text-[17px] leading-relaxed">
                    {service.subtitle}
                  </p>

                  <div className="mt-auto">
                    <Link
                      to={service.link}
                      className="inline-flex items-center gap-2 bg-blue-50 group-hover:bg-blue-600 text-blue-700 group-hover:text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm"
                    >
                      Read More
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
