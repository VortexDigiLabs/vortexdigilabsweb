export default function PricingSection() {
  return (
    <section className="price-section" id="pricing">
      <div className="pricing-container">
        <div className="pricing-header">
          <h2>CHOOSE YOUR PACKAGE</h2>
          <p>Professional web design for South African businesses</p>
        </div>

        <div className="pricing-plans">
          {/* COPPER */}
          <div className="pricing-plan">
            <div className="plan-tier">
              <div className="plan-title">Copper</div>
              <div className="plan-subtitle">Entry Level</div>
              <div className="plan-price">
                <div className="price">R1,499 – R4,999</div>
              </div>
              <div className="plan-description">
                <span>A clean, professional starter site to get your business online fast.</span>
              </div>
            </div>
            <div className="plan-action">
              <a
                href="https://wa.me/27658024718?text=Hi%20VDL%2C%20I%27m%20interested%20in%20the%20Copper%20package"
                className="btn-get-started"
                target="_blank"
                rel="noopener noreferrer"
              >
                GET STARTED
              </a>
            </div>
            <div className="pricing-plan-extras">
              <ul>
                <span>Includes:</span>
                <li>Up to 3 Pages</li>
                <li>Mobile Responsive</li>
                <li>Basic SEO</li>
                <li>Contact Form</li>
                <li>1 Revision Round</li>
                <li>2–4 Day Delivery</li>
              </ul>
            </div>
          </div>

          {/* BRONZE */}
          <div className="pricing-plan">
            <div className="plan-tier">
              <div className="plan-title">Bronze</div>
              <div className="plan-subtitle">Starter</div>
              <div className="plan-price">
                <div className="price">R4,999 – R9,499</div>
              </div>
              <div className="plan-description">
                <span>More room to showcase your services with Google Maps integration.</span>
              </div>
            </div>
            <div className="plan-action">
              <a
                href="https://wa.me/27658024718?text=Hi%20VDL%2C%20I%27m%20interested%20in%20the%20Bronze%20package"
                className="btn-get-started"
                target="_blank"
                rel="noopener noreferrer"
              >
                GET STARTED
              </a>
            </div>
            <div className="pricing-plan-extras">
              <ul>
                <span>Includes:</span>
                <li>Up to 5 Pages</li>
                <li>Mobile Responsive</li>
                <li>Basic SEO</li>
                <li>Contact Form</li>
                <li>Google Maps Integration</li>
                <li>1 Revision Round</li>
                <li>7–10 Day Delivery</li>
                <li>1 Month Support</li>
              </ul>
            </div>
          </div>

          {/* SILVER — FEATURED */}
          <div className="pricing-plan pricing-plan--featured">
            <div className="featured-badge">MOST POPULAR</div>
            <div className="plan-tier">
              <div className="plan-title">Silver</div>
              <div className="plan-subtitle">Professional</div>
              <div className="plan-price">
                <div className="price">R9,499 – R14,499</div>
              </div>
              <div className="plan-description">
                <span>Full professional build with CRM, analytics, and social integration.</span>
              </div>
            </div>
            <div className="plan-action">
              <a
                href="https://wa.me/27658024718?text=Hi%20VDL%2C%20I%27m%20interested%20in%20the%20Silver%20package"
                className="btn-get-started"
                target="_blank"
                rel="noopener noreferrer"
              >
                GET STARTED
              </a>
            </div>
            <div className="pricing-plan-extras">
              <ul>
                <span>Includes:</span>
                <li>Up to 10 Pages</li>
                <li>Mobile Responsive</li>
                <li>Advanced SEO</li>
                <li>Contact Form + CRM</li>
                <li>Google Maps + Analytics</li>
                <li>Social Media Integration</li>
                <li>2 Revision Rounds</li>
                <li>10–14 Day Delivery</li>
                <li>2 Months Support</li>
              </ul>
            </div>
          </div>

          {/* GOLD */}
          <div className="pricing-plan">
            <div className="plan-tier">
              <div className="plan-title">Gold</div>
              <div className="plan-subtitle">Premium</div>
              <div className="plan-price">
                <div className="price">R14,499 – R29,999</div>
              </div>
              <div className="plan-description">
                <span>The complete package — e-commerce ready, blog, full optimisation.</span>
              </div>
            </div>
            <div className="plan-action">
              <a
                href="https://wa.me/27658024718?text=Hi%20VDL%2C%20I%27m%20interested%20in%20the%20Gold%20package"
                className="btn-get-started"
                target="_blank"
                rel="noopener noreferrer"
              >
                GET STARTED
              </a>
            </div>
            <div className="pricing-plan-extras">
              <ul>
                <span>Includes:</span>
                <li>Up to 15 Pages</li>
                <li>Mobile Responsive</li>
                <li>Full SEO Optimisation</li>
                <li>Contact Form + CRM</li>
                <li>Google Maps + Analytics</li>
                <li>Social Media + Blog</li>
                <li>E-commerce Ready</li>
                <li>3 Revision Rounds</li>
                <li>14–21 Day Delivery</li>
                <li>3 Months Support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
