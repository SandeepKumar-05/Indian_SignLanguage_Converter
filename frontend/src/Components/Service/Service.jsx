import { FaHands, FaMicrophone, FaLanguage } from "react-icons/fa";
import "./Service.css";

const services = [
  {
    icon: <FaHands className="icon text-blue-600" />, 
    title: "Sign Language to Text & Speech",
    description: "Convert Indian Sign Language (ISL) gestures into real-time text and speech output. Our AI-powered system accurately recognizes hand signs and translates them into meaningful sentences, helping bridge the communication gap."
  },
  {
    icon: <FaMicrophone className="icon text-green-600" />, 
    title: "Speech & Text to Sign Language",
    description: "Enable seamless two-way communication by converting spoken words or text into animated sign language gestures. Our system makes conversations more accessible for the deaf and hard-of-hearing community."
  },
  {
    icon: <FaLanguage className="icon text-red-600" />, 
    title: "Regional Language Translation",
    description: "Translate ISL-based text and speech into multiple Indian regional languages, ensuring inclusivity across diverse linguistic backgrounds. Communicate effortlessly in Hindi, Tamil, Malayalam, Telugu, Bengali, and more."
  }
];

export default function Services() {
  return (
    <section className="services-section" id="service-section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              {service.icon}
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}