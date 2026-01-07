export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <span className="contact-badge">Contact Us</span>
        <h1>Get in Touch with <span>WaveNxD</span></h1>
        <p>
          We’re here to answer your questions and help you find the best
          ultrasonic solutions for your needs.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <section className="contact-container">
        
        {/* LEFT FORM */}
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <p className="form-subtext">
            Fill out the form and our team will get back to you shortly.
          </p>

          <div className="input-group">
            <label>Your Name</label>
            <input type="text" placeholder="Atharv Apugade" />
          </div>

          <div className="input-group">
            <label>Your Email</label>
            <input type="email" placeholder="atharv.@example.com" />
          </div>

          <div className="input-group">
            <label>Company (Optional)</label>
            <input type="text" placeholder="WaveNxD Technologies Inc." />
          </div>

          <div className="input-group">
            <label>Your Message</label>
            <textarea placeholder="How can we help you?" />
          </div>

          <button className="primary-btn">Send Message</button>
        </div>

        {/* RIGHT INFO */}
        <div className="contact-info">
          
          <div className="info-card">
            <h3>Reach Out Directly</h3>
            <p>📍 <strong>Address:</strong> 123 Tech Park, Innovation City, TC 98765</p>
            <p>📞 <strong>Phone:</strong> +1 (555) 123-4567</p>
            <p>✉️ <strong>Email:</strong> info@wavenxd.com</p>
          </div>

          <div className="info-card">
            <h3>Quick Inquiries</h3>
            <div className="quick-buttons">
              <button className="outline-btn">Request a Quote →</button>
              <button className="outline-btn">Support & FAQs ↗</button>
            </div>
          </div>

          <div className="info-card location">
            <h3>Our Location</h3>
            <p>
              Visit our innovation center to explore our ultrasonic technologies
              and discuss custom solutions with our experts.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
