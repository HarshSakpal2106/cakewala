import "./Menu.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = "http://localhost/cakewala/backend";

const CATEGORIES = ["All", "Chocolate", "Fruit", "Vanilla", "Citrus", "Custom"];
const SORT_OPTIONS = [
    { value: "default", label: "Default" },
    { value: "low",     label: "Price: Low to High" },
    { value: "high",    label: "Price: High to Low" },
];

function Menu({ user, cart, setCart }) {
    useEffect(() => { document.title = "Our Menu - CakeWala"; }, []);

    const [cakes,    setCakes]    = useState([]);
    const [loading,  setLoading]  = useState(true);
    const [category, setCategory] = useState("All");
    const [search,   setSearch]   = useState("");
    const [sort,     setSort]     = useState("default");
    const [added,    setAdded]    = useState(null); 
    const [showLoginMsg, setShowLoginMsg] = useState(false);

    useEffect(() => {
        fetch(`${API}/cakes.php`)
            .then(r => r.json())
            .then(data => { setCakes(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const handleAddToCart = (cake) => {
        if (!user) {
            setShowLoginMsg(true);
            setTimeout(() => setShowLoginMsg(false), 3000);
            return;
        }
        setCart(prev => {
            const exists = prev.find(i => i.id === cake.id);
            if (exists) {
                return prev.map(i => i.id === cake.id ? { ...i, qty: i.qty + 1 } : i);
            }
            return [...prev, { ...cake, qty: 1 }];
        });
        setAdded(cake.id);
        setTimeout(() => setAdded(null), 1500);
    };

    const filtered = cakes
        .filter(c => category === "All" || c.category === category)
        .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sort === "low")  return a.price - b.price;
            if (sort === "high") return b.price - a.price;
            return 0;
        });

    return (
        <div className="menu-container page">
            <section className="menu-hero">
                <h4 className="section-eyebrow">Fresh Baked Daily</h4>
                <h1 className="menu-title">Our Menu</h1>
                <p className="menu-subtitle">Every cake is made to order with real ingredients and a whole lot of love.</p>
                <div className="menu-search-wrap">
                    <span className="menu-search-icon"><i className="fa-solid fa-magnifying-glass"></i></span>
                    <input
                        className="menu-search"
                        type="text"
                        placeholder="Search cakes..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {search && <button className="menu-search-clear" onClick={() => setSearch("")}>✕</button>}
                </div>
            </section>

            <section className="menu-controls">
                <div className="menu-categories">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            className={`menu-cat-btn ${category === cat ? "active" : ""}`}
                            onClick={() => setCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="menu-sort">
                    <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                        {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                </div>
            </section>

            <div className="menu-results-count">
                {loading ? "Loading cakes..." : (
                    <>Showing <strong>{filtered.length}</strong> cake{filtered.length !== 1 ? "s" : ""}
                    {category !== "All" && <span> in <strong>{category}</strong></span>}
                    {search && <span> for "<strong>{search}</strong>"</span>}</>
                )}
            </div>

            <section className="menu-grid">
                {loading ? (
                    <div className="menu-loading">Loading delicious cakes...</div>
                ) : filtered.length > 0 ? (
                    filtered.map(cake => (
                        <div key={cake.id} className="menu-card">
                            <div className="menu-card-img">
                                {cake.image_url
                                    ? <img src={cake.image_url} alt={cake.name} />
                                    : <div className="menu-card-img-placeholder"></div>
                                }
                                <span className="menu-card-tag">{cake.tag}</span>
                            </div>
                            <div className="menu-card-info">
                                <div className="menu-card-cat">{cake.category}</div>
                                <h3 className="menu-card-name">{cake.name}</h3>
                                <p className="menu-card-desc">{cake.description}</p>
                                <div className="menu-card-footer">
                                    <span className="menu-card-price">&#8377; {cake.price}</span>
                                    <button
                                        className={`menu-card-btn ${added === cake.id ? "added" : ""}`}
                                        onClick={() => handleAddToCart(cake)}
                                    >
                                        {added === cake.id ? "✓ Added!" : "Add to Cart"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="menu-empty">
                        <div className="menu-empty-icon">🍰</div>
                        <h3>No cakes found</h3>
                        <p>Try a different search or category</p>
                        <button className="menu-empty-reset" onClick={() => { setSearch(""); setCategory("All"); }}>
                            Reset Filters
                        </button>
                    </div>
                )}
            </section>

            {showLoginMsg && (
                <div className="login-notice">
                    <div className="login-notice-content">
                        <span>🔓</span> Please <Link to="/auth">login</Link> to add items to your cart!
                    </div>
                </div>
            )}

            <section className="menu-custom-banner">
                <div className="menu-custom-inner">
                    <div className="menu-custom-text">
                        <h2>Can't find what you're looking for?</h2>
                        <p>We love custom orders! Tell us your dream cake and we'll make it happen.</p>
                    </div>
                    <Link to="/contact" className="menu-custom-btn">Place Custom Order →</Link>
                </div>
            </section>
        </div>
    );
}

export default Menu;
