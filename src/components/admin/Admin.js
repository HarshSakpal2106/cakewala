import "./Admin.css";
import Logo from "../../assets/logo.svg";
import { useEffect, useState } from "react";

function Admin() {
    useEffect(() => {
        document.title = "CakeWala - Admin";
    }, []);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [adminId, setAdminId] = useState("");
    const [adminPassword, setAdminPassword] = useState("");

    const ADMIN_ID = "cakewala_admin";
    const ADMIN_PASSWORD = "cakewala@123";

    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin");
        if (isAdmin === "true") {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (adminId === ADMIN_ID && adminPassword === ADMIN_PASSWORD) {
            setIsLoggedIn(true);
            localStorage.setItem("isAdmin", "true");
        } else {
            document.querySelector(".admin-login-alert").style.display = "block";
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isAdmin");
        setAdminId("");
        setAdminPassword("");
    };

    if (!isLoggedIn) {
        return (
            <div className="admin-login-container page">
                <div className="admin-login-box">
                    <h1 className="admin-login-h1">Admin Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className="admin-login-field">
                            <label htmlFor="adminId">Admin ID</label>
                            <input type="text" id="adminId" value={adminId} onChange={(e) => setAdminId(e.target.value)} required />
                        </div>
                        <div className="admin-login-field">
                            <label htmlFor="adminPassword">Password</label>
                            <input type="password" id="adminPassword" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="admin-login-btn">Login</button>
                        <div className="admin-login-alert">
                            Invalid Credentials!
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    const orders = [
        {
            id: "#101",
            item: "Chocolate Truffle Cake",
            customer: "Harsh",
            contact: "9876543210",
            address: "Flat 302, Sai Krupa Apartments, Near Viviana Mall, Eastern Express Highway, Thane West, Maharashtra 400606",
            payment: "Cash",
            status: "Pending"
        },
        {
            id: "#102",
            item: "Red Velvet Cake",
            customer: "Amit",
            contact: "9123456780",
            address: "B-12, Shanti Nagar CHS, Opposite Mulund Railway Station, LBS Road, Mulund West, Mumbai 400080",
            payment: "UPI",
            status: "Out for Delivery"
        },
        {
            id: "#103",
            item: "Black Forest Cake",
            customer: "Neha",
            contact: "9988776655",
            address: "Shop No. 5, Omkar Residency, Near Dombivli Gymkhana, Phadke Road, Dombivli East, Maharashtra 421201",
            payment: "Cash",
            status: "Done"
        },
        {
            id: "#104",
            item: "Butterscotch Cake",
            customer: "Riya",
            contact: "9090909090",
            address: "Flat 101, Building A, Raunak City Sector 4, Near Don Bosco School, Kalyan West, Maharashtra 421301",
            payment: "Card",
            status: "Cancelled"
        },
        {
            id: "#105",
            item: "Pineapple Cake",
            customer: "Rahul",
            contact: "8888888888",
            address: "Room No. 12, Ganesh Chawl, Near Thane Railway Station, Thane East, Maharashtra 400603",
            payment: "UPI",
            status: "Pending"
        },
        {
            id: "#106",
            item: "Strawberry Cake",
            customer: "Sneha",
            contact: "7777777777",
            address: "Flat 504, Green World Society, Sector 9, Near Mindspace IT Park, Airoli, Navi Mumbai 400708",
            payment: "Cash",
            status: "Out for Delivery"
        },
        {
            id: "#107",
            item: "KitKat Cake",
            customer: "Vikas",
            contact: "6666666666",
            address: "Bungalow 7, Hiranandani Estate, Near Ghodbunder Road, Patlipada, Thane West, Maharashtra 400607",
            payment: "Card",
            status: "Done"
        },
        {
            id: "#108",
            item: "Oreo Cake",
            customer: "Pooja",
            contact: "9555555555",
            address: "Flat 203, Shree Complex, Near Bhiwandi Bus Depot, Bhiwandi West, Maharashtra 421302",
            payment: "UPI",
            status: "Pending"
        },
        {
            id: "#109",
            item: "Fruit Cake",
            customer: "Ankit",
            contact: "9444444444",
            address: "Shop No. 8, Vashi Plaza, Sector 17, Near Vashi Railway Station, Navi Mumbai 400703",
            payment: "Cash",
            status: "Cancelled"
        },
        {
            id: "#110",
            item: "Custom Theme Cake",
            customer: "Meera",
            contact: "9333333333",
            address: "Flat 701, Sai Galaxy Towers, Near Orion Mall, Panvel East, Navi Mumbai, Maharashtra 410206",
            payment: "UPI",
            status: "Out for Delivery"
        }
    ];

    return (
        <div className="admin-container page">
            <header className="admin-header">
                <img src={Logo} alt="CakeWala Logo" className="admin-header-logo" />
                <h1 className="admin-header-h1">Admin Dashboard</h1>
                <button className="admin-logout-btn" onClick={handleLogout}>Logout</button>
            </header>
            <section className="order-section">
                <h1 className="order-section-h1">Orders</h1>
                <div className="order-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Item</th>
                                <th>Customer</th>
                                <th>Contact No</th>
                                <th>Address</th>
                                <th>Payment Method</th>
                                <th>Cost</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.item}</td>
                                    <td>{order.customer}</td>
                                    <td>{order.contact}</td>
                                    <td className="address-cell">{order.address}</td>
                                    <td>{order.payment}</td>
                                    <td>500</td>
                                    <td>
                                        <select defaultValue={order.status}>
                                            <option>Pending</option>
                                            <option>Out for Delivery</option>
                                            <option>Done</option>
                                            <option>Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default Admin;