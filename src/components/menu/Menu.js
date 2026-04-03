import "./Menu.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cakeImg from "../../assets/fav-cake-1.webp";

const CAKES = [
    { id: 1, name: "Chocolate Truffle Cake", desc: "Rich layers of dark chocolate with silky ganache frosting.", price: 649, tag: "Bestseller", cat: "Chocolate" },
    { id: 2, name: "Strawberry Garden Cake", desc: "Fresh strawberries folded into vanilla sponge with cream rosettes.", price: 549, tag: "Seasonal", cat: "Fruit" },
    { id: 3, name: "Lemon Drizzle Bliss", desc: "Zingy lemon sponge with a tangy glaze and candied peel.", price: 499, tag: "New", cat: "Citrus" },
    { id: 4, name: "Classic Red Velvet", desc: "Iconic cream cheese frosting on a velvety cocoa base.", price: 599, tag: "Classic", cat: "Vanilla" },
    { id: 5, name: "Mango Coconut Layer", desc: "Tropical mango curd nestled between coconut cream layers.", price: 679, tag: "Seasonal", cat: "Fruit" },
    { id: 6, name: "Salted Caramel Crunch", desc: "Buttery caramel drizzle with a crunchy praline crown.", price: 729, tag: "Signature", cat: "Chocolate" },
    { id: 7, name: "Blueberry Cheesecake", desc: "Thick New York style base with a blueberry compote topping.", price: 599, tag: "Popular", cat: "Vanilla" },
    { id: 8, name: "Rose & Pistachio", desc: "Persian-inspired rose water sponge with pistachio crumble.", price: 749, tag: "Artisan", cat: "Custom" },
    { id: 9, name: "Butterscotch Delight", desc: "Soft butterscotch sponge layered with whipped cream and praline.", price: 529, tag: "Popular", cat: "Vanilla" },
    { id: 10, name: "Dark Forest Cake", desc: "Classic Black Forest with dark cherries and whipped cream.", price: 619, tag: "Classic", cat: "Chocolate" },
];

const CATEGORIES = ["All", "Chocolate", "Fruit", "Vanilla", "Citrus", "Custom"];

const SORT_OPTIONS = [
    { value: "default", label: "Default" },
    { value: "low", label: "Price: Low to High" },
    { value: "high", label: "Price: High to Low" },
];

function Menu() {
    useEffect(() => {
        document.title = "Our Menu";
    }, []);

    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("default");

    const filtered = CAKES
        .filter(c => category === "All" || c.cat === category)
        .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sort === "low") return a.price - b.price;
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
                    <span className="menu-search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                    <input
                        className="menu-search"
                        type="text"
                        placeholder="Search cakes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <button className="menu-search-clear" onClick={() => setSearch("")}>✕</button>
                    )}
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
                    <select
                        className="sort-select"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        {SORT_OPTIONS.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                    </select>
                </div>
            </section>

            <div className="menu-results-count">
                Showing <strong>{filtered.length}</strong> cake{filtered.length !== 1 ? "s" : ""}
                {category !== "All" && <span> in <strong>{category}</strong></span>}
                {search && <span> for "<strong>{search}</strong>"</span>}
            </div>

            <section className="menu-grid">
                {filtered.length > 0 ? (
                    filtered.map(cake => (
                        <div key={cake.id} className="menu-card">
                            <div className="menu-card-img">
                                <img src={cakeImg} alt={cake.name} />
                                <span className="menu-card-tag">{cake.tag}</span>
                            </div>
                            <div className="menu-card-info">
                                <div className="menu-card-cat">{cake.cat}</div>
                                <h3 className="menu-card-name">{cake.name}</h3>
                                <p className="menu-card-desc">{cake.desc}</p>
                                <div className="menu-card-footer">
                                    <span className="menu-card-price">&#8377; {cake.price}</span>
                                    <Link to="#" className="menu-card-btn">Add to Cart</Link>
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