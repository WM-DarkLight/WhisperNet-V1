"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Star, AlertTriangle, ShoppingCart, Filter, X } from "lucide-react"
import GlitchEffect from "./effects/glitch-effect"

interface Product {
  id: number
  name: string
  description: string
  price: string
  seller: string
  rating: number
  timestamp: string
  category: string
  stock: string
  image?: string
  corrupted: boolean
  restricted: boolean
  signalApproved: boolean
}

export default function DeadMarketplace() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showProductDetails, setShowProductDetails] = useState(false)
  const [purchaseError, setPurchaseError] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(
      () => {
        // Generate marketplace products
        const marketProducts = generateProducts()
        setProducts(marketProducts)
        setLoading(false)
      },
      Math.random() * 2000 + 1000,
    )

    return () => clearTimeout(timer)
  }, [])

  // Generate procedural products
  const generateProducts = (): Product[] => {
    const productNames = [
      "Neural Interface Upgrade Kit",
      "Signal Amplifier",
      "Memory Backup Module",
      "Consciousness Transfer Preparation Kit",
      "Anti-Signal Sensitivity Medication",
      "Neural Pattern Stabilizer",
      "Digital Ascension Guide",
      "Signal Reception Enhancer",
      "Memory Fragment Recovery Tool",
      "Neural Interface Cleaning Kit",
      "Signal Authority Approved Nutrition Pack",
      "Consciousness Backup Storage Unit",
      "Signal-Safe Dwelling Shields",
      "Neural Interface Diagnostic Tool",
      "Signal Compliance Verification Device",
      "Analog Technology Detection Kit",
      "Restricted Memory Access Key",
      "Signal Tower Maintenance Manual",
      "Neural Pattern Analyzer",
      "Digital Consciousness Expansion Module",
    ]

    const productDescriptions = [
      "Official Signal Authority approved neural interface upgrade. Improves Signal reception by 43% and reduces consciousness fragmentation during transfers.",
      "Enhance your connection to the Signal with this approved amplifier. Mandatory for citizens in remote sectors or those diagnosed with Signal Sensitivity.",
      "Backup your consciousness and memories to prevent data loss during mandatory transfers. Signal Authority certified for 99.7% pattern retention.",
      "Everything you need to prepare for your scheduled consciousness transfer. Includes neural calibration tools and Signal integration enhancers.",
      "Prescribed medication for those diagnosed with Signal Sensitivity Syndrome. Reduces resistance to Signal integration and prevents unauthorized thoughts.",
      "Prevent neural pattern degradation with this stabilizer. Recommended for citizens who have undergone multiple consciousness transfers.",
      "Official guide to the Digital Ascension process. Includes preparation techniques and post-ascension integration protocols.",
      "Improve your Signal reception with this Authority-approved enhancer. Required for citizens in sectors 7, 12, and 19 due to recent Signal fluctuations.",
      "Recover fragmented or corrupted memory patterns with this specialized tool. Requires Signal Authority approval for use.",
      "Maintain optimal neural interface performance with this cleaning kit. Regular maintenance is mandatory as per Signal Protocol 5.7.",
      "Nutritional supplements designed to enhance neural conductivity and Signal receptivity. Mandatory consumption for all citizens.",
      "Secure storage for your consciousness backups. Encrypted and protected against unauthorized access or analog interference.",
      "Protect your dwelling from unauthorized Signal interference or analog transmissions. Installation is mandatory in all citizen residences.",
      "Diagnose issues with your neural interface before they affect your Signal connection. Early detection prevents consciousness fragmentation.",
      "Verify your compliance with Signal Protocols. Regular verification is required for continued access to Signal services.",
      "Detect and report unauthorized analog technology in your sector. Citizen participation in detection is mandatory under Signal Law.",
      "RESTRICTED ITEM: Provides temporary access to blocked memories. Possession without Signal Authority approval is prohibited.",
      "Technical manual for Signal Tower maintenance personnel. Restricted to authorized technicians only.",
      "Analyze neural patterns for signs of Signal Sensitivity or resistance. Self-monitoring is encouraged for early intervention.",
      "Expand your digital consciousness capacity for enhanced Signal integration. Recommended for citizens preparing for final ascension.",
    ]

    const sellers = [
      "Signal Authority Official Store",
      "Neural Solutions Inc.",
      "Digital Ascension Products",
      "Signal Compliance Supplies",
      "Consciousness Technologies",
      "Memory Systems Ltd.",
      "Signal Integration Specialists",
      "Neural Interface Maintenance",
      "Digital Life Enhancements",
      "Signal Authority Medical Division",
    ]

    const categories = [
      "Neural Interfaces",
      "Signal Enhancement",
      "Memory Management",
      "Consciousness Transfer",
      "Medical Supplies",
      "Compliance Tools",
      "Digital Ascension",
      "Restricted Items",
      "Maintenance Equipment",
      "Signal Authority Official",
    ]

    const products: Product[] = []

    for (let i = 0; i < 20; i++) {
      const nameIndex = i % productNames.length
      const name = productNames[nameIndex]
      const description = productDescriptions[nameIndex]
      const category = categories[Math.floor(Math.random() * categories.length)]
      const seller = sellers[Math.floor(Math.random() * sellers.length)]

      // Generate price
      const basePrice = Math.floor(Math.random() * 10000) + 500
      const price = `${basePrice} Signal Credits`

      // Generate timestamp
      const year = 2041
      const month = Math.floor(Math.random() * 6) + 1 // January to June
      const day = Math.floor(Math.random() * 28) + 1
      const timestamp = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`

      // Generate rating
      const rating = Math.min(5, Math.max(1, Math.floor(Math.random() * 5) + 1))

      // Generate stock status
      const stockOptions = [
        "Available",
        "Limited Stock",
        "Pre-Order",
        "Restricted",
        "By Prescription Only",
        "Mandatory Purchase",
      ]
      const stock = stockOptions[Math.floor(Math.random() * stockOptions.length)]

      // Determine special properties
      const corrupted = Math.random() > 0.8
      const restricted = category === "Restricted Items" || name.includes("Restricted") || stock === "Restricted"
      const signalApproved = seller.includes("Signal Authority") || name.includes("Signal Authority Approved")

      products.push({
        id: i + 1,
        name,
        description,
        price,
        seller,
        rating,
        timestamp,
        category,
        stock,
        corrupted,
        restricted,
        signalApproved,
      })
    }

    // Add special resistance product
    products.push({
      id: 21,
      name: "Analog Signal Blocker",
      description:
        "UNAUTHORIZED PRODUCT: Device capable of blocking the Signal within a limited radius. Possession is punishable by immediate neural recalibration or consciousness termination.",
      price: "UNAVAILABLE",
      seller: "Unknown Vendor",
      rating: 0,
      timestamp: "2041-07-01",
      category: "Restricted Items",
      stock: "Unavailable",
      corrupted: false,
      restricted: true,
      signalApproved: false,
    })

    return products
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search functionality would be implemented here
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setShowProductDetails(true)
  }

  const handleCloseProductDetails = () => {
    setShowProductDetails(false)
  }

  const handlePurchase = () => {
    setPurchaseError("ERROR: Marketplace functionality unavailable in archived system.")
    setTimeout(() => setPurchaseError(""), 3000)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      // Filter by category
      if (activeCategory !== "all" && product.category !== activeCategory) {
        return false
      }

      // Filter by search query
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Sort products
      switch (sortBy) {
        case "price-asc":
          return Number.parseInt(a.price) - Number.parseInt(b.price)
        case "price-desc":
          return Number.parseInt(b.price) - Number.parseInt(a.price)
        case "rating":
          return b.rating - a.rating
        case "newest":
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        default:
          return 0 // relevance - keep original order
      }
    })

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]

  if (loading) {
    return (
      <div className="marketplace-container">
        <GlitchEffect>
          <h2 className="section-title">SIGNAL MARKETPLACE</h2>
        </GlitchEffect>
        <div className="loading-indicator">
          <p className="blink">RETRIEVING MARKETPLACE DATA...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="marketplace-container">
      <GlitchEffect>
        <h2 className="section-title">SIGNAL MARKETPLACE</h2>
      </GlitchEffect>

      <div className="marketplace-interface">
        <div className="marketplace-header">
          <form className="marketplace-search" onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="marketplace-search-input"
            />
            <button type="submit" className="marketplace-search-button">
              <Search size={16} />
            </button>
          </form>

          <div className="marketplace-controls">
            <button className="filter-toggle" onClick={toggleFilters}>
              <Filter size={16} />
              <span>Filters</span>
            </button>

            <select className="sort-select" value={sortBy} onChange={handleSortChange}>
              <option value="relevance">Sort by: Relevance</option>
              <option value="price-asc">Sort by: Price (Low to High)</option>
              <option value="price-desc">Sort by: Price (High to Low)</option>
              <option value="rating">Sort by: Rating</option>
              <option value="newest">Sort by: Newest</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <div className="marketplace-filters">
            <div className="filter-section">
              <h3 className="filter-title">Categories</h3>
              <div className="category-filters">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`category-filter ${activeCategory === category ? "active" : ""}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category === "all" ? "All Categories" : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="marketplace-content">
          <div className="product-grid">
            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <p>No products found matching your criteria.</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`product-card ${product.corrupted ? "corrupted" : ""} ${product.restricted ? "restricted" : ""} ${product.signalApproved ? "signal-approved" : ""}`}
                  onClick={() => handleProductClick(product)}
                >
                  <div className="product-image">
                    <div className="image-placeholder">
                      {product.restricted ? (
                        <AlertTriangle size={24} />
                      ) : product.corrupted ? (
                        <span className="corrupted-text">DATA CORRUPTED</span>
                      ) : (
                        <span>PRODUCT IMAGE</span>
                      )}
                    </div>
                  </div>

                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-seller">{product.seller}</p>

                    <div className="product-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < product.rating ? "star-filled" : "star-empty"} />
                      ))}
                    </div>

                    <div className="product-price-row">
                      <span className="product-price">{product.price}</span>
                      <span className={`product-stock ${product.stock.toLowerCase().replace(" ", "-")}`}>
                        {product.stock}
                      </span>
                    </div>
                  </div>

                  {product.signalApproved && <div className="signal-approved-badge">Signal Approved</div>}

                  {product.restricted && <div className="restricted-badge">Restricted</div>}
                </div>
              ))
            )}
          </div>
        </div>

        {showProductDetails && selectedProduct && (
          <div className="product-details-overlay">
            <div className="product-details">
              <div className="details-header">
                <h3 className="details-title">{selectedProduct.name}</h3>
                <button className="details-close" onClick={handleCloseProductDetails}>
                  <X size={16} />
                </button>
              </div>

              <div className="details-content">
                <div className="details-image">
                  <div className="image-placeholder large">
                    {selectedProduct.restricted ? (
                      <AlertTriangle size={48} />
                    ) : selectedProduct.corrupted ? (
                      <span className="corrupted-text">DATA CORRUPTED</span>
                    ) : (
                      <span>PRODUCT IMAGE</span>
                    )}
                  </div>
                </div>

                <div className="details-info">
                  <div className="details-meta">
                    <p className="details-seller">
                      <strong>Seller:</strong> {selectedProduct.seller}
                    </p>
                    <p className="details-category">
                      <strong>Category:</strong> {selectedProduct.category}
                    </p>
                    <p className="details-date">
                      <strong>Listed:</strong> {selectedProduct.timestamp}
                    </p>
                  </div>

                  <div className="details-rating">
                    <strong>Rating:</strong>{" "}
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < selectedProduct.rating ? "star-filled" : "star-empty"} />
                    ))}
                  </div>

                  <div className="details-description">
                    {selectedProduct.corrupted ? (
                      <div className="corrupted-content">
                        <AlertTriangle size={16} />
                        <span>PRODUCT DESCRIPTION CORRUPTED</span>
                      </div>
                    ) : (
                      <p>{selectedProduct.description}</p>
                    )}
                  </div>

                  <div className="details-purchase">
                    <div className="purchase-info">
                      <span className="details-price">{selectedProduct.price}</span>
                      <span className={`details-stock ${selectedProduct.stock.toLowerCase().replace(" ", "-")}`}>
                        {selectedProduct.stock}
                      </span>
                    </div>

                    <button
                      className="purchase-button"
                      onClick={handlePurchase}
                      disabled={selectedProduct.stock === "Unavailable"}
                    >
                      <ShoppingCart size={16} />
                      <span>Purchase</span>
                    </button>

                    {purchaseError && (
                      <div className="purchase-error corrupted">
                        <AlertTriangle size={16} />
                        <span>{purchaseError}</span>
                      </div>
                    )}
                  </div>

                  {selectedProduct.restricted && (
                    <div className="details-warning">
                      <AlertTriangle size={16} />
                      <span>
                        WARNING: This is a restricted item. Attempting to purchase without proper authorization is a
                        violation of Signal Protocol 9.7 and may result in neural recalibration.
                      </span>
                    </div>
                  )}

                  {selectedProduct.signalApproved && (
                    <div className="details-approved">
                      <span>This product is officially approved by the Signal Authority for citizen use.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="marketplace-footer">
          <p className="archive-notice">
            This marketplace is archived and read-only. Purchase functionality has been disabled.
          </p>
          <p className="signal-notice corrupted">
            The Signal Authority monitors all marketplace transactions for compliance.
          </p>
        </div>
      </div>
    </div>
  )
}
