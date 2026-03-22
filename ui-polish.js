function renderSectionHeader(config) {
  return `
    <div class="section-lead">
      <p>${escapeHtml(config.eyebrow || "")}</p>
      <h3 class="section-title">${escapeHtml(config.title || "")}</h3>
      ${config.subtitle ? `<span class="section-meta">${escapeHtml(config.subtitle)}</span>` : ""}
    </div>
  `;
}

function renderEditorialHero(config) {
  return `
    <section class="card editorial-hero-card ${escapeHtml(config.tone || "")}">
      <div class="editorial-hero-media">
        <img src="${escapeHtml(config.image)}" alt="${escapeHtml(config.alt || config.title || "Hero preview")}">
      </div>
      <div class="editorial-hero-copy">
        <p class="eyebrow">${escapeHtml(config.eyebrow || "")}</p>
        <h3>${escapeHtml(config.title || "")}</h3>
        <p class="card-copy hero-copy-refined">${escapeHtml(config.copy || "")}</p>
        <div class="hero-actions">
          ${config.primaryAction ? `<button class="primary-button" type="button" data-action="${escapeHtml(config.primaryAction.action)}"${config.primaryAction.view ? ` data-view="${escapeHtml(config.primaryAction.view)}"` : ""}>${escapeHtml(config.primaryAction.label)}</button>` : ""}
          ${config.secondaryAction ? `<button class="secondary-button" type="button" data-action="${escapeHtml(config.secondaryAction.action)}"${config.secondaryAction.view ? ` data-view="${escapeHtml(config.secondaryAction.view)}"` : ""}>${escapeHtml(config.secondaryAction.label)}</button>` : ""}
        </div>
      </div>
    </section>
  `;
}

function renderSupportCard(config) {
  return `
    <article class="card support-card ${escapeHtml(config.tone || "teal")}">
      <div class="support-card-head">
        <div class="support-card-icon" aria-hidden="true">${config.icon || "GO"}</div>
        <p class="eyebrow">${escapeHtml(config.eyebrow || "")}</p>
      </div>
      <h3 class="card-title">${escapeHtml(config.title || "")}</h3>
      <p class="support-card-meta">${escapeHtml(config.meta || "")}</p>
      <span class="helper-text">${escapeHtml(config.detail || "")}</span>
      ${config.actionLabel ? `<button class="ghost-button" type="button" data-action="${escapeHtml(config.action || "jump-view")}"${config.view ? ` data-view="${escapeHtml(config.view)}"` : ""}>${escapeHtml(config.actionLabel)}</button>` : ""}
    </article>
  `;
}

function renderHighlightCard(config) {
  return `
    <section class="card polish-highlight-card ${escapeHtml(config.tone || "blue")}">
      <p class="eyebrow">${escapeHtml(config.eyebrow || "")}</p>
      <h3 class="card-title">${escapeHtml(config.title || "")}</h3>
      <p class="card-copy">${escapeHtml(config.copy || "")}</p>
      ${config.actionLabel ? `<div class="inline-actions"><button class="${config.primary ? "primary-button" : "secondary-button"}" type="button" data-action="${escapeHtml(config.action || "jump-view")}"${config.view ? ` data-view="${escapeHtml(config.view)}"` : ""}>${escapeHtml(config.actionLabel)}</button></div>` : ""}
    </section>
  `;
}

function renderModuleCard(config) {
  return `
    <article class="card refined-module-card ${escapeHtml(config.tone || "")}">
      <img class="module-media" src="${escapeHtml(config.image)}" alt="${escapeHtml(config.title || "Module preview")}">
      <div class="module-copy">
        <p class="eyebrow">${escapeHtml(config.eyebrow || "")}</p>
        <h3 class="card-title">${escapeHtml(config.title || "")}</h3>
        <p class="module-meta">${escapeHtml(config.meta || "")}</p>
        <button class="secondary-button" type="button" data-action="${escapeHtml(config.action || "jump-view")}"${config.view ? ` data-view="${escapeHtml(config.view)}"` : ""}>${escapeHtml(config.actionLabel || "Open")}</button>
      </div>
    </article>
  `;
}

function renderGuidePlaceCard(place) {
  const saveLabel = isGuestMode() ? "Sign in" : (isSavedPlace(place.id) ? "Saved" : "Save");
  return `
    <article class="card guide-place-card">
      <button class="card-button" type="button" data-action="open-place" data-place-id="${escapeHtml(place.id)}">
        <img src="${escapeHtml(place.image)}" alt="${escapeHtml(place.name)}">
      </button>
      <div class="guide-place-copy">
        <div class="guide-place-head">
          <div>
            <p class="eyebrow">${escapeHtml(place.category)}</p>
            <h3 class="card-title">${escapeHtml(place.name)}</h3>
            <p class="guide-place-meta">${escapeHtml(place.distance)} | ${escapeHtml(place.rating)} stars</p>
          </div>
          <span class="guide-place-badge">${escapeHtml(place.badges[0] || "Verified")}</span>
        </div>
        <div class="guide-place-foot">
          <span class="helper-text">${escapeHtml(String(place.verifiedReviews) + " verified reviews")}</span>
          <button class="ghost-button" type="button" data-action="toggle-save-place" data-place-id="${escapeHtml(place.id)}">${escapeHtml(saveLabel)}</button>
        </div>
      </div>
    </article>
  `;
}

function renderHomeMarkup() {
  return isGuestMode() ? renderGuestHome() : renderMemberHomeCompact();
}

function renderGuestHome() {
  const region = state.ui.discover.region;
  const regionLabel = REGION_LABELS[region];
  const guideSpot = getPlacesByRegion(region)[0] || places[0];
  const previewResult = getAiPreviewResult();
  const browseCard = getFeatureAccessMap().find(function(item) { return !item.memberOnly; }) || getFeatureAccessMap()[0];

  return `
    <div class="screen home-screen polish-stack">
      <header class="screen-header screen-header-solo">
        <div class="screen-header-copy">
          <p>PawPlanet</p>
          <h2>Plan softer city days for your pet.</h2>
          <span class="screen-header-note">Guest mode | ${escapeHtml(regionLabel)}</span>
        </div>
      </header>

      <div class="pill-row home-region-row">
        ${Object.entries(REGION_LABELS).map(function(entry) {
          return `<button class="chip ${state.ui.discover.region === entry[0] ? "active" : ""}" type="button" data-action="set-home-region" data-region="${escapeHtml(entry[0])}">${escapeHtml(entry[1])}</button>`;
        }).join("")}
      </div>

      ${renderEditorialHero({
        image: ASSETS.heroDog,
        alt: "Pet-friendly day out preview",
        eyebrow: "Editorial preview",
        title: "Trusted routes, calmer stops, and clearer pet policies.",
        copy: `${regionLabel} browsing starts with verified places, lighter planning, and practical tips before you sign in.`,
        primaryAction: { action: "jump-view", view: "discover", label: "Open Guide" },
        secondaryAction: { action: "open-ai-overlay", label: "Ask Paw AI" }
      })}

      <div class="support-grid">
        ${renderSupportCard({
          tone: "green",
          icon: "OK",
          eyebrow: "Trusted discovery",
          title: guideSpot ? guideSpot.name : "Trusted nearby",
          meta: guideSpot ? `${guideSpot.category} | ${guideSpot.distance}` : "Policy-aware local places",
          detail: guideSpot ? guideSpot.badges[0] : "Verified reviews first",
          action: "jump-view",
          view: "discover",
          actionLabel: "View guide"
        })}
        ${renderSupportCard({
          tone: "teal",
          icon: "AI",
          eyebrow: "Guest browsing",
          title: previewResult.headline,
          meta: previewResult.stops[0].title,
          detail: browseCard ? browseCard.copy : "Browse first and unlock saves later.",
          action: "open-ai-overlay",
          actionLabel: "Preview AI"
        })}
      </div>

      <section class="section-group">
        ${renderSectionHeader({
          eyebrow: "Explore next",
          title: "Move through each module with less clutter",
          subtitle: "A cleaner layout for guide browsing, stories, shopping, and care."
        })}
        <div class="refined-module-grid">
          ${renderModuleCard({
            eyebrow: "Guide",
            title: "Policy-first places",
            meta: guideSpot ? `${guideSpot.name} | ${guideSpot.badges[0]}` : "Verified nearby spots",
            image: guideSpot ? guideSpot.image : ASSETS.placeCafe,
            view: "discover",
            actionLabel: "Open Guide"
          })}
          ${renderModuleCard({
            eyebrow: "Social",
            title: "Local pet stories",
            meta: "See how owners handle cafes, stroller routes, and calm backups.",
            image: ASSETS.communityOne,
            view: "community",
            actionLabel: "Open Social"
          })}
          ${renderModuleCard({
            eyebrow: "Shop",
            title: "Useful travel picks",
            meta: "Light accessories for rain, carriers, and quick city stops.",
            image: ASSETS.shopRaincoat,
            view: "shop",
            actionLabel: "Open Shop"
          })}
          ${renderModuleCard({
            eyebrow: "Care",
            title: "Gentle care logs",
            meta: "Preview daily weight, meal, walk, and mood tracking in one view.",
            image: ASSETS.profilePet,
            view: "health",
            actionLabel: "Open Care"
          })}
        </div>
      </section>
    </div>
  `;
}

function renderMemberHomeCompact() {
  const livePlace = getLiveReviewPlace() || getPlacesByRegion(state.ui.discover.region)[0] || places[0];
  const communityPost = getCommunityFeed()[0];
  const shopPick = getFilteredProducts()[0] || products[0];
  const careHint = state.health.reminders[0];
  const previewResult = getAiPreviewResult();

  return `
    <div class="screen home-screen polish-stack">
      <header class="screen-header screen-header-solo">
        <div class="screen-header-copy">
          <p>Good ${escapeHtml(getDayPart())}, ${escapeHtml(getOwnerName())}</p>
          <h2>Today feels easier with one calm plan.</h2>
          <span class="screen-header-note">${escapeHtml(state.pet.city)} | ${escapeHtml(state.pet.mood || "Relaxed")}</span>
        </div>
      </header>

      <section class="card member-summary-card">
        <div class="member-summary-layout">
          <div class="member-summary-copy">
            <p class="eyebrow">Today summary</p>
            <h3 class="card-title">${escapeHtml(state.pet.name || "Your companion")}</h3>
            <p class="card-copy">${escapeHtml(state.pet.breed || state.pet.type || "Pet profile")} | ${escapeHtml(state.pet.city)}</p>
            <div class="info-pill-row">
              <span class="info-pill">${escapeHtml(getWeightLabel())}</span>
              <span class="info-pill">${escapeHtml(state.pet.mood || "Relaxed mood")}</span>
            </div>
          </div>
          <div class="member-summary-media">
            <img src="${escapeHtml(state.pet.avatarImage || ASSETS.profilePet)}" alt="${escapeHtml(state.pet.name || "Pet avatar")}">
          </div>
        </div>
      </section>

      <div class="support-grid">
        ${renderSupportCard({
          tone: "teal",
          icon: "AI",
          eyebrow: "AI snapshot",
          title: previewResult.headline,
          meta: previewResult.stops[0].title,
          detail: previewResult.policy,
          action: "open-ai-overlay",
          actionLabel: "Open AI"
        })}
        ${renderSupportCard({
          tone: "green",
          icon: "DAY",
          eyebrow: "Today care",
          title: careHint ? careHint.title : "Daily care",
          meta: getWeightLabel(),
          detail: careHint ? careHint.detail : (state.pet.mood || "Relaxed"),
          action: "jump-view",
          view: "health",
          actionLabel: "Open Care"
        })}
      </div>

      ${renderHighlightCard({
        tone: "blue",
        eyebrow: "Live guide",
        title: livePlace ? livePlace.name : "Trusted nearby",
        copy: livePlace ? `${livePlace.distance} | ${livePlace.badges[0]} | ${livePlace.verifiedReviews} verified reviews` : "Browse trusted pet-friendly places with policy clarity first.",
        action: "jump-view",
        view: "discover",
        actionLabel: "Open Guide"
      })}

      <section class="section-group">
        ${renderSectionHeader({
          eyebrow: "Keep moving",
          title: "Switch into social notes or useful shopping",
          subtitle: "The home view now stays focused on today, not a crowded dashboard."
        })}
        <div class="refined-module-grid">
          ${renderModuleCard({
            eyebrow: "Social",
            title: communityPost ? communityPost.headline : "Community notes",
            meta: communityPost ? communityPost.location : "Practical pet-owner stories nearby",
            image: communityPost ? communityPost.image : ASSETS.communityOne,
            view: "community",
            actionLabel: "Open Social"
          })}
          ${renderModuleCard({
            eyebrow: "Shop",
            title: shopPick ? shopPick.name : "Travel essentials",
            meta: shopPick ? `${formatPrice(shopPick.price)} | ${shopPick.tag}` : "Travel-ready pet picks",
            image: shopPick ? shopPick.image : ASSETS.shopBowl,
            view: "shop",
            actionLabel: "Open Shop"
          })}
        </div>
      </section>
    </div>
  `;
}

function renderDiscoverPageMarkup() {
  const filteredPlaces = typeof getFilteredPlaces === "function" ? getFilteredPlaces() : getPlacesByRegion(state.ui.discover.region);

  return `
    <div class="screen guide-page-stack">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Trust-first discovery</p>
          <h2>Discover</h2>
          <span class="screen-header-note">Map, policies, and reviews stay readable before you commit to a place.</span>
        </div>
        ${renderHeaderAction("discover")}
      </header>

      ${renderHighlightCard({
        tone: "blue",
        eyebrow: "Policy clarity first",
        title: `Browse ${REGION_LABELS[state.ui.discover.region]} with less guesswork`,
        copy: "Each card stays simple in the feed while policy details, latest reviews, and callouts move into the detail sheet."
      })}

      <div class="search-shell">
        <span class="search-icon" aria-hidden="true">${renderSearchIcon()}</span>
        <input id="discoverSearchCompact" data-role="discover-search" type="search" value="${escapeHtml(state.ui.discover.search)}" placeholder="Search place, city, or policy">
      </div>

      <div class="pill-row">
        ${Object.entries(REGION_LABELS).map(function(entry) {
          return `<button class="chip ${state.ui.discover.region === entry[0] ? "active" : ""}" type="button" data-action="set-discover-region" data-region="${escapeHtml(entry[0])}">${escapeHtml(entry[1])}</button>`;
        }).join("")}
      </div>

      <div class="pill-row">
        ${DISCOVER_CATEGORIES.map(function(category) {
          return `<button class="chip ${state.ui.discover.category === category ? "active" : ""}" type="button" data-action="set-discover-category" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`;
        }).join("")}
      </div>

      ${renderDiscoverMapModule({ compact: false })}

      <section class="guide-place-list">
        ${filteredPlaces.length ? filteredPlaces.map(renderGuidePlaceCard).join("") : `
          <div class="empty-state">
            <strong>No places match this filter</strong>
            <span>Try another city or category to bring trusted pet-friendly spots back into view.</span>
          </div>
        `}
      </section>
    </div>
  `;
}

function renderShopCompactMarkup() {
  const filteredProducts = getFilteredProducts();

  return `
    <div class="screen shop-page-stack">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Light pet shopping</p>
          <h2>Shop</h2>
          <span class="screen-header-note">A calmer storefront for practical travel, comfort, and health picks.</span>
        </div>
        ${renderHeaderAction("shop")}
      </header>

      <section class="card polish-shop-banner">
        <div class="summary-row">
          <div class="banner-copy">
            <p class="eyebrow">Featured kit</p>
            <h3 class="card-title">Travel-ready picks for quick city outings</h3>
            <p class="card-copy">Rain layers, lightweight bowls, cooling support, and items that stay easy to rebuild in Kodular.</p>
            <div class="trust-chip-row">
              <span class="trust-chip">Travel-ready</span>
              <span class="trust-chip blue">Vet-friendly</span>
              <span class="trust-chip pink">Heat-care</span>
            </div>
          </div>
          <img class="banner-image" src="${escapeHtml(ASSETS.shopRaincoat)}" alt="Travel-ready product preview">
        </div>
      </section>

      <div class="pill-row">
        ${SHOP_CATEGORIES.map(function(category) {
          return `<button class="chip ${state.ui.shop.category === category ? "active" : ""}" type="button" data-action="set-shop-category" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`;
        }).join("")}
      </div>

      <section class="product-grid">
        ${filteredProducts.map(function(product) {
          return `
            <article class="product-card card">
              <button class="card-button" type="button" data-action="open-product" data-product-id="${escapeHtml(product.id)}">
                <img class="product-image" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">
              </button>
              <div class="product-meta">
                <p class="eyebrow">${escapeHtml(product.category)}</p>
                <h3 class="product-title">${escapeHtml(product.name)}</h3>
                <p class="product-tagline">${escapeHtml(formatPrice(product.price))}</p>
                <p class="product-tagline">${escapeHtml(product.tag)}</p>
              </div>
              <button class="primary-button small" type="button" data-action="add-to-cart" data-product-id="${escapeHtml(product.id)}">${isGuestMode() ? "Preview" : "Add"}</button>
            </article>
          `;
        }).join("")}
      </section>
    </div>
  `;
}

function renderGuestHealthPolished() {
  return `
    <div class="screen health-page-stack">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Care companion preview</p>
          <h2>Health</h2>
          <span class="screen-header-note">A calmer care area with one hero, one chart, and lighter action blocks.</span>
        </div>
        ${renderHeaderAction("health")}
      </header>

      ${renderHighlightCard({
        tone: "green",
        eyebrow: "Today care",
        title: "Preview daily health without the crowded dashboard",
        copy: `${getWeightLabel()} | Sign in when you want to add walks, meals, mood, or weight changes.`,
        action: "open-auth",
        actionLabel: "Sign in to log",
        primary: true
      })}

      <section class="card chart-card">
        ${renderSectionHeader({
          eyebrow: "Sample trend",
          title: "Recent weight line",
          subtitle: "Minimal, calm, and easy to rebuild as a basic chart module later."
        })}
        ${renderWeightChart()}
      </section>

      <div class="polish-quick-grid">
        ${HEALTH_LOG_TYPES.map(function(type) {
          return `<button class="polish-quick-card" type="button" data-action="open-health-log" data-type="${escapeHtml(type)}"><strong>${escapeHtml(type)}</strong><span>Sign in to add a real log entry.</span></button>`;
        }).join("")}
      </div>
    </div>
  `;
}

function renderMemberHealthPolished() {
  const logs = getSortedHealthLogs();
  const latest = logs[0];
  const hint = state.health.reminders[0];

  return `
    <div class="screen health-page-stack">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Pet care companion</p>
          <h2>Health</h2>
          <span class="screen-header-note">One calm fold for today, one chart, and one clear place to keep logging.</span>
        </div>
        ${renderHeaderAction("health")}
      </header>

      <section class="card member-summary-card">
        <div class="member-summary-layout">
          <div class="member-summary-copy">
            <p class="eyebrow">Today care</p>
            <h3 class="card-title">${escapeHtml(hint ? hint.title : "Care status")}</h3>
            <p class="card-copy">${escapeHtml(getWeightLabel())} | ${escapeHtml(hint ? hint.detail : (state.pet.mood || "Relaxed"))}</p>
            <div class="info-pill-row">
              <span class="info-pill">${escapeHtml(state.pet.city)}</span>
              <span class="info-pill">${escapeHtml(state.pet.mood || "Relaxed")}</span>
            </div>
          </div>
          <div class="member-summary-media">
            <img src="${escapeHtml(state.pet.avatarImage || ASSETS.profilePet)}" alt="${escapeHtml(state.pet.name || "Pet avatar")}">
          </div>
        </div>
      </section>

      <section class="card chart-card">
        <div class="summary-row">
          ${renderSectionHeader({
            eyebrow: "Weight trend",
            title: "Recent entries",
            subtitle: "A single chart keeps the page feeling mature and calm."
          })}
          <button class="secondary-button" type="button" data-action="open-health-log" data-type="Weight">Add log</button>
        </div>
        ${renderWeightChart()}
      </section>

      <div class="polish-quick-grid">
        ${HEALTH_LOG_TYPES.map(function(type) {
          return `<button class="polish-quick-card" type="button" data-action="open-health-log" data-type="${escapeHtml(type)}"><strong>${escapeHtml(type)}</strong><span>${escapeHtml(type === "Weight" ? "Track changes with the chart." : `Add today's ${type.toLowerCase()} note.`)}</span></button>`;
        }).join("")}
      </div>

      ${renderHighlightCard({
        tone: "teal",
        eyebrow: "Latest log",
        title: latest ? (latest.label || latest.type) : "No logs yet",
        copy: latest ? `${latest.value} | ${formatShortDate(latest.timestamp)}` : "Add a walk, meal, weight, or mood entry to start the log history."
      })}
    </div>
  `;
}

function renderHealthCompactMarkup() {
  return isGuestMode() ? renderGuestHealthPolished() : renderMemberHealthPolished();
}

function renderGuestProfilePolished() {
  const features = getFeatureAccessMap().slice(0, 3);

  return `
    <div class="screen profile-page-stack">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Account entry</p>
          <h2>My Profile</h2>
          <span class="screen-header-note">The account page now feels more like a real landing area, not just a utility screen.</span>
        </div>
      </header>

      <section class="card profile-hero-card">
        <img class="profile-hero-image" src="${escapeHtml(ASSETS.heroCat)}" alt="Guest preview pet lifestyle">
        <div class="profile-hero-copy">
          <div>
            <p class="eyebrow">Guest mode</p>
            <h3 class="card-title">Browse first, then unlock the personal layer</h3>
            <p class="card-copy">Save trusted places, ask Paw AI with context, and turn daily care into a steady routine once you sign in.</p>
          </div>
          <div class="profile-cta-grid">
            <button class="primary-button" type="button" data-action="open-auth" data-mode="login" data-reason="profile">Login</button>
            <button class="secondary-button" type="button" data-action="open-auth" data-mode="register" data-reason="profile">Create Account</button>
          </div>
        </div>
      </section>

      ${renderHighlightCard({
        tone: "pink",
        eyebrow: "Why join",
        title: "Keep the same clean shell, then unlock personal actions",
        copy: "This page stays simple in Kodular: one hero, a few support cards, and clear actions for login or registration."
      })}

      <div class="profile-support-grid">
        ${features.map(function(item, index) {
          return renderSupportCard({
            tone: index === 0 ? "teal" : index === 1 ? "green" : "blue",
            icon: item.memberOnly ? "VIP" : "NOW",
            eyebrow: item.memberOnly ? "Members only" : "Guest access",
            title: item.title,
            meta: item.copy,
            detail: item.memberOnly ? "Unlock after login." : "Available now while browsing."
          });
        }).join("")}
      </div>
    </div>
  `;
}

function renderMemberProfilePolished() {
  const savedPlaces = state.saved.placeIds.map(getPlaceById).filter(Boolean);
  const savedPosts = state.saved.postIds.map(getPostById).filter(Boolean);
  const preferences = state.user.preferences || {};
  const topPlace = savedPlaces[0];
  const topPost = savedPosts[0];

  return `
    <div class="screen profile-page-stack">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Account and pet details</p>
          <h2>My Profile</h2>
          <span class="screen-header-note">Owner, pet, saved content, and preferences are grouped with clearer visual layers.</span>
        </div>
      </header>

      <section class="card member-summary-card">
        <div class="member-summary-layout">
          <div class="member-summary-copy">
            <p class="eyebrow">Owner card</p>
            <h3 class="card-title">${escapeHtml(getOwnerName())}</h3>
            <p class="card-copy">${escapeHtml(state.user.email)} | ${escapeHtml(String(getPawPoints()) + " PawPoints")}</p>
            <div class="info-pill-row">
              <span class="info-pill">${escapeHtml(state.pet.city)}</span>
              <span class="info-pill">${escapeHtml(state.pet.size || "Medium")}</span>
            </div>
          </div>
          <div class="member-summary-media">
            <img src="${escapeHtml(state.pet.avatarImage || ASSETS.profilePet)}" alt="${escapeHtml(state.pet.name || "Pet avatar")}">
          </div>
        </div>
        <div class="inline-actions">
          <button class="secondary-button" type="button" data-action="open-edit-profile">Edit profile</button>
        </div>
      </section>

      <div class="profile-support-grid">
        ${renderSupportCard({
          tone: "green",
          icon: "P",
          eyebrow: "Pet card",
          title: state.pet.name || "Your pet",
          meta: `${state.pet.breed || state.pet.type || "Pet profile"} | ${state.pet.size || "Medium"}`,
          detail: `${state.pet.city} | ${state.pet.heatSensitivity || "Moderate"}`
        })}
        ${renderSupportCard({
          tone: "blue",
          icon: "VIP",
          eyebrow: "Saved content",
          title: `${savedPlaces.length} places | ${savedPosts.length} posts`,
          meta: topPlace ? topPlace.name : "Build your saved list over time",
          detail: topPost ? topPost.headline : "Useful posts and trusted places stay here."
        })}
      </div>

      ${renderHighlightCard({
        tone: "teal",
        eyebrow: "Saved places",
        title: topPlace ? topPlace.name : "No saved places yet",
        copy: topPlace ? `${topPlace.distance} | ${topPlace.badges[0]}` : "Browse Discover and save trusted places for later."
      })}

      ${renderHighlightCard({
        tone: "blue",
        eyebrow: "Saved posts",
        title: topPost ? topPost.headline : "No saved posts yet",
        copy: topPost ? `${topPost.location} | ${topPost.tags[0]}` : "Keep useful community notes and revisit them later."
      })}

      <section class="card">
        ${renderSectionHeader({
          eyebrow: "Preferences",
          title: "Settings",
          subtitle: "Stay consistent with three clear toggles instead of a long settings wall."
        })}
        <button class="settings-row" type="button" data-action="toggle-setting" data-setting="notifications"><span>Notifications</span><span class="toggle-switch ${preferences.notifications ? "active" : ""}"></span></button>
        <button class="settings-row" type="button" data-action="toggle-setting" data-setting="locationSharing"><span>Location</span><span class="toggle-switch ${preferences.locationSharing ? "active" : ""}"></span></button>
        <button class="settings-row" type="button" data-action="toggle-setting" data-setting="reminders"><span>Reminders</span><span class="toggle-switch ${preferences.reminders ? "active" : ""}"></span></button>
      </section>

      <button class="secondary-button danger-button" type="button" data-action="logout">Logout</button>
    </div>
  `;
}

function renderMyProfileTabMarkup() {
  return isGuestMode() ? renderGuestProfilePolished() : renderMemberProfilePolished();
}

if (typeof renderApp === "function") {
  renderApp();
}
