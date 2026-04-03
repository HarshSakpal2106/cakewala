import "./Home.css";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import favCakeImg from "../../assets/fav-cake-1.webp";

function Home() {
  useEffect(() => {
    document.title = "CakeWala";
  }, []);

  return (
    <div className="home-container page">
      <section className="home-section">
        <h1>Homemade cakes,<br /><em>Made with Love</em></h1>
        <p>Indulge in our delectable homemade cakes, crafted with love and the finest ingredients. From classic flavors to unique creations, our cakes are perfect for every occasion. Experience the warmth of homemade goodness in every bite.</p>
        <div className="home-buttons">
          <Link to="/menu" id="explore-menu-btn">Explore Menu</Link>
          <Link to="/contact" id="place-custom-order-btn">Place Custom Order</Link>
        </div>
      </section>
      <section className="favourites-section">
        <h4 className="section-eyebrow">Our Favourites</h4>
        <h1 className="section-title">Most Loved Cakes</h1>
        <div className="favourites-container">
          <div className="favourites-card">
            <div className="favourites-image">
              <img src={favCakeImg} alt="Favourites" />
            </div>
            <div className="favourites-info">
              <h3>Chocolate Truffle Cake</h3>
              <span>Indulge in pure bliss with our rich and decadent chocolate truffle cake.</span>
              <div className="favourites-footer">
                <span>&#8377; 299</span>
                <Link to="#">Add to Cart</Link>
              </div>
            </div>
          </div>
          <div className="favourites-card">
            <div className="favourites-image">
              <img src={favCakeImg} alt="Favourites" />
            </div>
            <div className="favourites-info">
              <h3>Chocolate Truffle Cake</h3>
              <span>Indulge in pure bliss with our rich and decadent chocolate truffle cake.</span>
              <div className="favourites-footer">
                <span>&#8377; 299</span>
                <Link to="#">Add to Cart</Link>
              </div>
            </div>
          </div>
          <div className="favourites-card">
            <div className="favourites-image">
              <img src={favCakeImg} alt="Favourites" />
            </div>
            <div className="favourites-info">
              <h3>Chocolate Truffle Cake</h3>
              <span>Indulge in pure bliss with our rich and decadent chocolate truffle cake.</span>
              <div className="favourites-footer">
                <span>&#8377; 299</span>
                <Link to="#">Add to Cart</Link>
              </div>
            </div>
          </div>
          <div className="favourites-card">
            <div className="favourites-image">
              <img src={favCakeImg} alt="Favourites" />
            </div>
            <div className="favourites-info">
              <h3>Chocolate Truffle Cake</h3>
              <span>Indulge in pure bliss with our rich and decadent chocolate truffle cake.</span>
              <div className="favourites-footer">
                <span>&#8377; 299</span>
                <Link to="#">Add to Cart</Link>
              </div>
            </div>
          </div>
        </div>
        <Link to="/menu" id="view-all-btn">View All</Link>
      </section>
      <section className="why-section">
        <h4 className="section-eyebrow">Why Choose Us?</h4>
        <h1 className="section-title">The CakeWala Promise</h1>
        <div className="why-container">
          <div className="why-card">
            <span className="why-icon">🌿</span>
            <h3>100% Natural</h3>
            <span>No artificial colours, flavours, or preservatives. Ever.</span>
          </div>
          <div className="why-card">
            <span className="why-icon">👩‍🍳</span>
            <h3>Handcrafted</h3>
            <span>Each cake is mixed, layered, and decorated by hand with care.</span>
          </div>
          <div className="why-card">
            <span className="why-icon">🎂</span>
            <h3>Custom Orders</h3>
            <span>Getting married? Celebrating? We'll bake your dream cake.</span>
          </div>
          <div className="why-card">
            <span className="why-icon">🚚</span>
            <h3>Same-Day Delivery</h3>
            <span>Order before 10 am, enjoy your cake by evening.</span>
          </div>
        </div>
      </section>
      <section class="testimonial-section">
        <div class="testimonial-inner">
          <h4 class="section-eyebrow">Happy Customers</h4>
          <h1 class="section-title" style={{ color: 'white' }}>What They're Saying</h1>
          <div class="testimonials-grid">
            <div class="testimonial-card">
              <div class="quote-icon">"</div>
              <div class="stars">★★★★★</div>
              <p class="testimonial-text">The Velvet Chocolate Dream lived up to its name. My guests couldn't stop talking about it at the birthday party!</p>
              <div class="testimonial-author-row">
                <div class="author-avatar">🙋🏻‍♀️</div>
                <div>
                  <div class="author-name">Priya S.</div>
                  <div class="author-label">Birthday Order</div>
                </div>
              </div>
            </div>
            <div class="testimonial-card">
              <div class="quote-icon">"</div>
              <div class="stars">★★★★★</div>
              <p class="testimonial-text">Ordered a custom wedding cake — it was exactly what we imagined. Absolutely beautiful and even more delicious.</p>
              <div class="testimonial-author-row">
                <div class="author-avatar">🙋🏻‍♂️</div>
                <div>
                  <div class="author-name">Rahul M.</div>
                  <div class="author-label">Wedding Cake</div>
                </div>
              </div>
            </div>
            <div class="testimonial-card">
              <div class="quote-icon">"</div>
              <div class="stars">★★★★★</div>
              <p class="testimonial-text">Best lemon drizzle I've ever had outside of my grandma's kitchen. Genuinely tastes homemade. So rare to find!</p>
              <div class="testimonial-author-row">
                <div class="author-avatar">🙋🏻‍♀️</div>
                <div>
                  <div class="author-name">Ananya K.</div>
                  <div class="author-label">Regular Customer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;