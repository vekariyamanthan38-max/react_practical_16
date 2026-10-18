
import { useState } from "react";

const categories = [
  "Electronics",
  "Fashion",
  "Footwear",
  "Accessories",
  "Home & Lifestyle",
  "Other",
];

const initialProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    stock: 25,
    description: "Premium wireless sound",
    emoji: "🎧",
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    price: 1999,
    stock: 40,
    description: "Comfort for every step",
    emoji: "👟",
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 15,
    description: "Smart style, every day",
    emoji: "⌚",
  },
];

const emptyForm = {
  name: "",
  category: "",
  price: "",
  stock: "",
  description: "",
};

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setMessage("");
  };

  const addProduct = (event) => {
    event.preventDefault();

    const name = form.name.trim();

    if (!name || !form.category || form.price === "" ||
        form.stock === "") {
      setMessage("Please complete all required fields.");
      return;
    }

    if (
      !Number.isFinite(Number(form.price)) ||
      !Number.isFinite(Number(form.stock)) ||
      Number(form.price) <= 0 ||
      Number(form.stock) < 0 ||
      !Number.isInteger(Number(form.stock))
    ) {
      setMessage("Enter a valid price and whole-number stock quantity.");
      return;
    }

    const product = {
      id: Date.now(),
      name,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      description: form.description.trim() || "No description provided",
      emoji: "📦",
    };

    setProducts((prev) => [product, ...prev]);
    setForm(emptyForm);
    setMessage(`🎉 ${name} added successfully!`);
  };

  const visibleProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0
  );

  return (
    <main className="min-h-screen bg-[#080d20] text-white">
      {/* Top navigation */}
      <header className="sticky top-0 z-20 border-b border-white/10
        bg-[#080d20]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center
          justify-between gap-4 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center
              rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-600
              text-2xl shadow-lg shadow-violet-500/20">
              🛍️
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">
                Product<span className="text-violet-400">Hub</span>
              </h1>
              <p className="text-xs text-slate-400">
                Manage • Create • Grow
              </p>
            </div>
          </div>

          <span className="rounded-xl border border-violet-400/30
            bg-violet-400/10 px-4 py-2 text-sm font-semibold text-violet-200">
            {products.length} Products
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8">
        {/* Welcome banner */}
        <section className="relative mb-8 overflow-hidden rounded-3xl
          border border-white/10 bg-gradient-to-r from-indigo-600/30
          via-violet-600/20 to-cyan-500/10 p-6 sm:p-8">
          <div className="absolute -right-10 -top-16 h-48 w-48
            rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em]
              text-cyan-300">
              Product management system
            </p>
            <h2 className="text-3xl font-black sm:text-4xl">
              Build your inventory. <br className="sm:hidden" />
              <span className="bg-gradient-to-r from-cyan-300
                to-violet-400 bg-clip-text text-transparent">
                Your way.
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
              Add products, organize categories, and track your inventory
              in one beautiful dashboard.
            </p>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              label: "Total Products",
              value: products.length,
              icon: "📦",
              color: "from-blue-500/20 to-cyan-500/5",
            },
            {
              label: "Total Stock Units",
              value: products.reduce((sum, p) => sum + p.stock, 0),
              icon: "📊",
              color: "from-violet-500/20 to-fuchsia-500/5",
            },
            {
              label: "Inventory Value",
              value: `₹${totalValue.toLocaleString("en-IN")}`,
              icon: "💎",
              color: "from-emerald-500/20 to-teal-500/5",
            },
          ].map((stat) => (
            <div key={stat.label}
              className={`rounded-2xl border border-white/10
                bg-gradient-to-br ${stat.color} p-5
                transition duration-300 hover:-translate-y-1
                hover:border-white/20`}>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">{stat.label}</p>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className="mt-3 text-3xl font-extrabold">
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Create form */}
          <section className="rounded-3xl border border-white/10
            bg-white/[0.04] p-5 shadow-2xl sm:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center
                rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600
                text-2xl">
                ＋
              </div>
              <div>
                <h2 className="text-xl font-bold">Add New Product</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Enter your product details below.
                </p>
              </div>
            </div>

            <form onSubmit={addProduct} className="space-y-5">
              <div>
                <label htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-200">
                  Product Name *
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="e.g. Wireless Headphones"
                  maxLength={80}
                  required
                  className="w-full rounded-xl border border-white/10
                    bg-slate-900/80 px-4 py-3 outline-none transition
                    placeholder:text-slate-600 focus:border-cyan-400
                    focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>

              <div>
                <label htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-slate-200">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={updateField}
                  required
                  className="w-full rounded-xl border border-white/10
                    bg-slate-900 px-4 py-3 text-white outline-none
                    focus:border-cyan-400">
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="price"
                    className="mb-2 block text-sm font-semibold text-slate-200">
                    Price (₹) *
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={form.price}
                    onChange={updateField}
                    placeholder="e.g. 999"
                    required
                    className="w-full rounded-xl border border-white/10
                      bg-slate-900/80 px-4 py-3 outline-none
                      focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label htmlFor="stock"
                    className="mb-2 block text-sm font-semibold text-slate-200">
                    Stock Quantity *
                  </label>
                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    step="1"
                    value={form.stock}
                    onChange={updateField}
                    placeholder="e.g. 25"
                    required
                    className="w-full rounded-xl border border-white/10
                      bg-slate-900/80 px-4 py-3 outline-none
                      focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-slate-200">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={updateField}
                  placeholder="Tell us something about this product..."
                  rows={3}
                  maxLength={300}
                  className="w-full resize-y rounded-xl border border-white/10
                    bg-slate-900/80 px-4 py-3 outline-none
                    focus:border-cyan-400"
                />
              </div>

              {message && (
                <div role="status"
                  className={`rounded-xl border p-3 text-sm ${
                    message.startsWith("🎉")
                      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                      : "border-rose-400/30 bg-rose-400/10 text-rose-300"
                  }`}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r
                  from-cyan-500 via-blue-600 to-violet-600 px-5 py-4
                  font-bold shadow-lg shadow-blue-500/20 transition
                  duration-300 hover:-translate-y-0.5 hover:shadow-xl
                  hover:shadow-violet-500/20 active:scale-[0.98]"
              >
                + &nbsp; Add Product
              </button>

              <button
                type="button"
                onClick={() => {
                  setForm(emptyForm);
                  setMessage("");
                }}
                className="w-full rounded-xl border border-white/10
                  px-5 py-3 text-sm font-semibold text-slate-300
                  transition hover:bg-white/5"
              >
                Clear Form
              </button>
            </form>
          </section>

          {/* Product list */}
          <section>
            <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row
              sm:items-center">
              <div>
                <h2 className="text-2xl font-extrabold">Product Catalog</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Your inventory at a glance.
                </p>
              </div>

              <span className="w-fit rounded-full border border-cyan-400/20
                bg-cyan-400/10 px-3 py-1.5 text-xs font-bold text-cyan-300">
                LIVE INVENTORY
              </span>
            </div>

            <div className="mb-4">
              <input
                type="search"
                aria-label="Search products"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="🔎  Search products or categories..."
                className="w-full rounded-xl border border-white/10
                  bg-white/[0.04] px-4 py-3 outline-none
                  focus:border-violet-400"
              />
            </div>

            <div className="space-y-3">
              {visibleProducts.map((product) => (
                <article key={product.id}
                  className="group rounded-2xl border border-white/10
                    bg-white/[0.04] p-4 transition duration-300
                    hover:border-violet-400/40 hover:bg-white/[0.07]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center
                      justify-center rounded-2xl border border-white/10
                      bg-gradient-to-br from-indigo-500/20 to-cyan-500/10
                      text-3xl transition group-hover:scale-105">
                      {product.emoji}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start
                        justify-between gap-2">
                        <h3 className="break-words font-bold">
                          {product.name}
                        </h3>
                        <span className={`rounded-full px-2.5 py-1
                          text-xs font-bold ${
                            product.stock > 0
                              ? "bg-emerald-400/10 text-emerald-300"
                              : "bg-rose-400/10 text-rose-300"
                          }`}>
                          {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-violet-300">
                        {product.category}
                      </p>
                      <p className="mt-2 text-lg font-extrabold">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Stock:{" "}
                        <span className="font-semibold text-cyan-300">
                          {product.stock} units
                        </span>
                      </p>
                      <p className="mt-2 break-words text-xs text-slate-500">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}

              {visibleProducts.length === 0 && (
                <div className="rounded-2xl border border-dashed
                  border-white/15 px-5 py-12 text-center">
                  <div className="mb-3 text-4xl">🔍</div>
                  <p className="font-semibold">No products found</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Try another search or create a new product.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-10 border-t border-white/10 py-6 text-center">
          <p className="text-sm text-slate-400">
            Crafted with <span className="text-rose-400">♥</span>{" "}
            React + Tailwind CSS
          </p>
          <p className="mt-2 text-xs text-slate-600">
            ProductHub · Create Operation Demonstration
          </p>
        </footer>
      </div>
    </main>
  );
}
