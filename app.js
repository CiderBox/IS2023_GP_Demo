"use strict";

const STORAGE_KEYS = {
  session: "pawplanetSession",
  user: "pawplanetUser",
  pet: "pawplanetPet",
  saved: "pawplanetSaved",
  planner: "pawplanetPlanner",
  community: "pawplanetCommunity",
  shop: "pawplanetShop",
  health: "pawplanetHealth",
  uiPrefs: "pawplanetUiPrefs"
};

const MAIN_VIEWS = ["home", "discover", "community", "shop", "health", "myProfile"];
const REGION_LABELS = {
  hongkong: "Hong Kong",
  macau: "Macau",
  mainland: "Mainland"
};
const REGION_DEFAULT_CITY = {
  hongkong: "Hong Kong",
  macau: "Macau",
  mainland: "Shenzhen"
};
const DISCOVER_CATEGORIES = ["All", "Cafes", "Parks", "Hotels", "Vets", "Pet Malls"];
const TOPIC_OPTIONS = ["All", "Weekend walk", "Pet-friendly cafe", "Dog stroller", "HK tips", "Macau day trip"];
const SHOP_CATEGORIES = ["All", "Food", "Clothing", "Toys", "Travel", "Health"];
const PLANNER_DESTINATIONS = ["Cafe", "Park", "Hotel", "Mall", "Vet check"];
const MAP_STYLE_OPTIONS = ["Roads", "Terrain"];
const HEALTH_LOG_TYPES = ["Walk", "Meal", "Weight", "Mood"];
const CREATE_POST_ILLUSTRATIONS = ["Cafe", "Park", "Travel", "Cozy"];

const ASSETS = {
  heroDog: "assets/images/home-hero-dog.svg",
  heroCat: "assets/images/home-hero-cat.svg",
  placeCafe: "assets/images/discover-hk-cafe.svg",
  placePark: "assets/images/discover-hk-park.svg",
  placeHotel: "assets/images/discover-macau-hotel.svg",
  communityOne: "assets/images/community-post-1.svg",
  communityTwo: "assets/images/community-post-2.svg",
  shopBowl: "assets/images/shop-bowl.svg",
  shopRaincoat: "assets/images/shop-raincoat.svg",
  profilePet: "assets/images/profile-pet-avatar.svg",
  mapHongKong: "assets/maps/map-hk-central.svg",
  mapMacau: "assets/maps/map-macau.svg",
  mapMainland: "assets/maps/map-mainland.svg",
  markerCafe: "assets/icons/marker-cafe.svg",
  markerVet: "assets/icons/marker-vet.svg",
  markerVerified: "assets/icons/marker-verified.svg"
};

const places = [
  {
    id: "harbour-tails",
    region: "hongkong",
    city: "Hong Kong",
    area: "Central",
    name: "Harbour Tails Cafe",
    category: "Cafes",
    image: ASSETS.placeCafe,
    distance: "0.7 km",
    rating: 4.8,
    verifiedReviews: 124,
    openNow: true,
    badges: ["Verified", "Water bowl available", "Outdoor seating only"],
    address: "18 Stanley Street, Central, Hong Kong",
    description: "A calm brunch stop with shaded terrace seating, compact stroller parking, and very clear pet-entry rules.",
    policy: "Pets stay on leash. Outdoor terrace is pet-friendly. Indoor waiting bench only by staff confirmation.",
    notes: "Great before 11:30. Feels safer for smaller dogs, carrier cats, and owners who want clear rules first.",
    latestReviews: [
      { author: "Lena & Tofu", time: "14 min ago", text: "Staff offered water right away and explained the terrace policy clearly." },
      { author: "Ray", time: "Yesterday", text: "Verified visit. No awkward surprises, and the shaded seats stayed comfortable." }
    ],
    marker: { left: 28, top: 48 },
    nearbyVet: "Central Pet First Aid"
  },
  {
    id: "west-kowloon-paw-promenade",
    region: "hongkong",
    city: "Hong Kong",
    area: "West Kowloon",
    name: "West Kowloon Paw Promenade",
    category: "Parks",
    image: ASSETS.placePark,
    distance: "1.1 km",
    rating: 4.9,
    verifiedReviews: 210,
    openNow: true,
    badges: ["Verified", "Water bowl available", "Vet nearby"],
    address: "Art Park Promenade, West Kowloon, Hong Kong",
    description: "Wide waterfront paths, easy rest stops, and reliable community notes about weather, shade, and nearby care.",
    policy: "Keep pets leashed near the lawn edge. Clean-up stations provided on the promenade loop.",
    notes: "Best at sunset. A very strong trust-first route for calmer city walks.",
    latestReviews: [
      { author: "Mandy", time: "32 min ago", text: "Verified visit. Nice breeze today and the refill station is working." },
      { author: "Jasper", time: "2 days ago", text: "Flat route, good for an older dog, and easy to leave early if needed." }
    ],
    marker: { left: 58, top: 36 },
    nearbyVet: "Jordan Companion Vet"
  },
  {
    id: "sai-kung-paws-rest",
    region: "hongkong",
    city: "Hong Kong",
    area: "Sai Kung",
    name: "Sai Kung Paws Rest",
    category: "Hotels",
    image: ASSETS.placeHotel,
    distance: "6.8 km",
    rating: 4.6,
    verifiedReviews: 73,
    openNow: true,
    badges: ["Verified", "Stroller required", "Outdoor only"],
    address: "14 Pak Sha Wan Pier Road, Sai Kung, Hong Kong",
    description: "A boutique stay with outdoor pet corners and a clearly enforced indoor stroller rule.",
    policy: "Carrier or stroller required in indoor common areas. Outdoor pet lawn closes at 9pm.",
    notes: "Call ahead if your pet is heat-sensitive. Outdoor path is nicest early morning.",
    latestReviews: [
      { author: "Chloe", time: "1 hour ago", text: "Rules were exactly as listed. The welcome kit felt thoughtful." }
    ],
    marker: { left: 78, top: 62 },
    nearbyVet: "Clear Water Bay Animal Care"
  },
  {
    id: "guia-garden-walk",
    region: "macau",
    city: "Macau",
    area: "Macau Peninsula",
    name: "Guia Garden Pet Walk",
    category: "Parks",
    image: ASSETS.placePark,
    distance: "0.9 km",
    rating: 4.7,
    verifiedReviews: 89,
    openNow: true,
    badges: ["Verified", "Water bowl available", "Outdoor only"],
    address: "Guia Hill Footpath, Macau Peninsula",
    description: "A quiet green route with short loops, bench breaks, and good community notes on humid weather timing.",
    policy: "Short leash required on the main hill route. Avoid cycling lane during busier hours.",
    notes: "Cats in carriers are common late afternoon. A gentle option for low-pressure outings.",
    latestReviews: [
      { author: "Kiki", time: "9 min ago", text: "Cloudy today, so the upper loop felt comfortable even with a fluffy dog." }
    ],
    marker: { left: 34, top: 34 },
    nearbyVet: "Peninsula Pet Clinic"
  },
  {
    id: "coloane-seaside-stay",
    region: "macau",
    city: "Macau",
    area: "Coloane",
    name: "Coloane Seaside Stay",
    category: "Hotels",
    image: ASSETS.placeHotel,
    distance: "4.3 km",
    rating: 4.5,
    verifiedReviews: 64,
    openNow: false,
    badges: ["Verified", "Stroller required", "Vet nearby"],
    address: "Rua da Praia, Coloane Village, Macau",
    description: "A calm overnight option for weekend breaks with clear lobby pet rules and seaside access nearby.",
    policy: "Stroller or carrier required in lobby and elevators. Pet amenities are available on request.",
    notes: "Front desk is helpful with vet directions. Elevator space is limited for larger strollers.",
    latestReviews: [
      { author: "Nora", time: "Yesterday", text: "Front desk explained the stroller rule immediately, which saved time." }
    ],
    marker: { left: 64, top: 66 },
    nearbyVet: "Cotai Paws Emergency"
  },
  {
    id: "shenzhen-paws-mall",
    region: "mainland",
    city: "Shenzhen",
    area: "Nanshan",
    name: "Shenzhen Paws Mall",
    category: "Pet Malls",
    image: ASSETS.placeCafe,
    distance: "2.5 km",
    rating: 4.6,
    verifiedReviews: 145,
    openNow: true,
    badges: ["Verified", "Stroller required", "Water bowl available"],
    address: "188 Coastal Avenue, Nanshan, Shenzhen",
    description: "A structured indoor pet mall with stroller-only common areas, cooling corners, and tidy signage.",
    policy: "Stroller required in common corridors. Walking is allowed only in marked zones.",
    notes: "A strong rainy-day fallback if you already packed a stroller or carrier.",
    latestReviews: [
      { author: "Willow", time: "22 min ago", text: "Cooling mats sold on level two and the stroller rule was enforced politely." }
    ],
    marker: { left: 48, top: 44 },
    nearbyVet: "Nanshan Companion Vet"
  },
  {
    id: "zhujiang-vet-express",
    region: "mainland",
    city: "Guangzhou",
    area: "Tianhe",
    name: "Zhujiang Vet Express",
    category: "Vets",
    image: ASSETS.placePark,
    distance: "1.4 km",
    rating: 4.9,
    verifiedReviews: 98,
    openNow: true,
    badges: ["Verified", "Emergency ready", "Open late"],
    address: "22 Huacheng Avenue, Tianhe, Guangzhou",
    description: "A reliable clinic for travel days with late hours, clear intake, and calm waiting zones for anxious pets.",
    policy: "Keep carrier ready in the waiting zone. Travel history questions are required on intake.",
    notes: "Useful backup contact when planning hotter daytime outings.",
    latestReviews: [
      { author: "Kai", time: "Today", text: "Travel note review was quick and the late queue felt calm for an anxious cat." }
    ],
    marker: { left: 64, top: 56 },
    nearbyVet: "On site"
  },
  {
    id: "lotus-leaf-cafe",
    region: "mainland",
    city: "Guangzhou",
    area: "Haizhu",
    name: "Lotus Leaf Pet Cafe",
    category: "Cafes",
    image: ASSETS.placeCafe,
    distance: "3.1 km",
    rating: 4.4,
    verifiedReviews: 57,
    openNow: true,
    badges: ["Verified", "Outdoor seating only", "Water bowl available"],
    address: "9 Xingang Road, Haizhu, Guangzhou",
    description: "A soft-toned courtyard cafe with calm morning airflow and a separate pet snack menu.",
    policy: "Outdoor courtyard only. Bring your own mat for larger dogs during peak hours.",
    notes: "Friendly for cats in strollers. Rain cover helps because seating is partly open.",
    latestReviews: [
      { author: "Ava", time: "2 hours ago", text: "Outdoor-only rule is strict, but the courtyard stayed cool with fans on." }
    ],
    marker: { left: 42, top: 34 },
    nearbyVet: "Pearl River Pet Care"
  }
];

const posts = [
  {
    id: "post-central-sunday",
    user: "Sasha",
    petName: "Tofu",
    location: "Central, Hong Kong",
    caption: "Coffee first, then a short shaded walk before the pavement got too warm. The staff even reminded us where the water bowls are.",
    tags: ["Weekend walk", "Pet-friendly cafe"],
    likes: 182,
    comments: 19,
    verifiedVisit: true,
    image: ASSETS.communityOne
  },
  {
    id: "post-west-kowloon",
    user: "Emi",
    petName: "Cloud",
    location: "West Kowloon, Hong Kong",
    caption: "If your dog gets warm quickly, start by the breeze near the promenade and skip the exposed lawn after noon.",
    tags: ["HK tips", "Weekend walk"],
    likes: 145,
    comments: 11,
    verifiedVisit: true,
    image: ASSETS.communityTwo
  },
  {
    id: "post-macau-ferry",
    user: "Rico",
    petName: "Momo",
    location: "Macau Peninsula",
    caption: "Bring a compact stroller even if your pet usually walks. It made the garden route and hotel lobby rules much smoother.",
    tags: ["Macau day trip", "Dog stroller"],
    likes: 98,
    comments: 8,
    verifiedVisit: false,
    image: ASSETS.communityOne
  },
  {
    id: "post-shenzhen-mall",
    user: "June",
    petName: "Pebble",
    location: "Shenzhen",
    caption: "Rainy-day fallback in Shenzhen: stroller-only inside, but surprisingly calm for a cat in a mesh carrier.",
    tags: ["Dog stroller", "HK tips"],
    likes: 121,
    comments: 14,
    verifiedVisit: true,
    image: ASSETS.communityTwo
  }
];

const products = [
  { id: "travel-bowl", category: "Travel", name: "Foldable Travel Bowl", price: 68, tag: "Hydration", description: "Soft silicone bowl that clips onto a bag for water breaks during walks and ferry transfers.", image: ASSETS.shopBowl },
  { id: "pet-raincoat", category: "Clothing", name: "Pet Raincoat", price: 148, tag: "Rain ready", description: "Light hooded raincoat with leash opening and quick-dry lining for sudden showers.", image: ASSETS.shopRaincoat },
  { id: "calming-wipes", category: "Health", name: "Calming Paw Wipes", price: 82, tag: "After walk", description: "Gentle wipes for paws after wet sidewalks, with a soft chamomile scent.", image: ASSETS.shopBowl },
  { id: "stroller-hooks", category: "Travel", name: "Stroller Hooks Set", price: 56, tag: "Hands-free", description: "Rounded hooks for bowls, wipes, and light shopping bags while moving through pet malls.", image: ASSETS.shopRaincoat },
  { id: "healthy-treats", category: "Food", name: "Healthy Treat Cubes", price: 96, tag: "Vet approved", description: "Small soft treats for calm breaks on the go and easy portion control.", image: ASSETS.shopBowl },
  { id: "cooling-mat", category: "Health", name: "Cooling Rest Mat", price: 188, tag: "Heat care", description: "Portable cooling mat for warmer days, sized for cafe seating or hotel floors.", image: ASSETS.shopRaincoat }
];

const storyHighlights = [
  { id: "story-cafe", title: "Cafe wins", subtitle: "Terrace notes", icon: "cup", topic: "Pet-friendly cafe" },
  { id: "story-vet", title: "Backup vets", subtitle: "Near routes", icon: "cross", topic: "HK tips" },
  { id: "story-pack", title: "Packing", subtitle: "Rain + stroller", icon: "bag", topic: "Dog stroller" },
  { id: "story-cats", title: "Cat stays", subtitle: "Carrier tips", icon: "moon", topic: "Macau day trip" }
];

const plannerTemplates = {
  "Hong Kong": {
    Cafe: {
      headline: "Plan a breezy cafe-to-promenade day",
      route: "Start while the pavement is still cool, then shift to shaded waterfront time before noon crowds.",
      stops: [
        { time: "09:10", title: "Harbour Tails Cafe", note: "Outdoor terrace seating with water bowls and clear pet rules." },
        { time: "10:05", title: "West Kowloon Paw Promenade", note: "Waterfront breeze, flat paths, and nearby seating breaks." },
        { time: "11:20", title: "Central Pet First Aid", note: "Backup clinic contact saved in case heat sensitivity changes the plan." }
      ],
      caution: "Warm stone surfaces build quickly after lunch. Keep walking time short if your pet is heat-sensitive.",
      policy: "Terrace only at the cafe. Promenade leash required near the lawn edge.",
      vet: "Central Pet First Aid"
    },
    Park: {
      headline: "Plan a cooler outdoor reset",
      route: "Keep the outing early, loop through the waterfront first, and pause before any exposed lawn time.",
      stops: [
        { time: "08:20", title: "West Kowloon Paw Promenade", note: "Begin with the breeziest route and use the refill station." },
        { time: "09:15", title: "Shaded bench stop", note: "Short reset for water, wipes, and paw checks." },
        { time: "09:50", title: "Harbour Tails Cafe", note: "Optional cool-down brunch stop before the route gets busier." }
      ],
      caution: "Avoid long midday walks near open concrete sections.",
      policy: "Promenade is leash-only. Outdoor dining remains terrace only.",
      vet: "Jordan Companion Vet"
    }
  }
};

const DEFAULT_STATE = {
  session: {
    mode: "guest",
    authenticated: false,
    currentMainView: "home",
    previousMainView: "home",
    lastLoginAt: "",
    authPromptSeen: false
  },
  user: {
    email: "",
    password: "",
    ownerName: "",
    guestDismissedTips: false,
    preferences: {
      notifications: true,
      locationSharing: true,
      reminders: true
    }
  },
  pet: {
    name: "",
    type: "Dog",
    breed: "",
    size: "Medium",
    age: "",
    city: "Hong Kong",
    mood: "Ready for a calm outing",
    heatSensitivity: "Medium",
    avatarImage: ASSETS.profilePet
  },
  saved: {
    placeIds: [],
    postIds: []
  },
  planner: {
    lastInputs: null,
    lastResult: null,
    history: [],
    lastGuestPreviewSeen: false,
    messages: [],
    draftPrompt: "",
    selectedScenario: "Weekend walk",
    starterPrompts: [
      "Where can I go today?",
      "Plan a cool walk",
      "Suggest a pet-friendly cafe",
      "What should I pack?"
    ]
  },
  community: {
    customPosts: [],
    likedPostIds: [],
    commentCounts: {}
  },
  shop: {
    cart: [],
    guestCart: [],
    guestCartPreviewCount: 0
  },
  health: {
    logs: [
      { id: "seed-log-1", type: "Walk", value: "28 min", note: "Cool promenade loop before noon.", timestamp: offsetTime(-5), label: "Promenade walk" },
      { id: "seed-log-2", type: "Meal", value: "Breakfast", note: "Half pouch plus treats after the walk.", timestamp: offsetTime(-4), label: "Meal note" },
      { id: "seed-log-3", type: "Weight", value: 6.4, note: "Stable after the last checkup.", timestamp: offsetTime(-3), label: "Weight update" },
      { id: "seed-log-4", type: "Mood", value: "Playful", note: "Relaxed in the carrier and curious outdoors.", timestamp: offsetTime(-2), label: "Mood check" },
      { id: "seed-log-5", type: "Walk", value: "18 min", note: "Short rainy-day stroll with raincoat.", timestamp: offsetTime(-1), label: "Evening walk" }
    ],
    reminders: [
      { id: "walk", title: "Next walk", detail: "6:30 PM • Breezy route planned" },
      { id: "vaccine", title: "Vaccine due", detail: "Rabies booster in 12 days" },
      { id: "meal", title: "Meal reminder", detail: "Dinner at 7:15 PM" }
    ],
    currentWeight: 6.4
  },
  uiPrefs: {
    themeVariant: "leaf",
    mapRegion: "hongkong",
    seenIntroCards: []
  }
};

const dom = {};

const state = {
  session: null,
  user: null,
  pet: null,
  saved: null,
  planner: null,
  community: null,
  shop: null,
  health: null,
  uiPrefs: null,
  ui: {
    currentView: "home",
    authMode: "login",
    offline: !navigator.onLine,
    sheet: { type: "", payload: null },
    viewVisited: new Set(["home"]),
    viewLoading: {},
    timers: { review: null, comments: null },
    discover: {
      region: "hongkong",
      category: "All",
      mapStyle: "Roads",
      search: "",
      focusedPlaceId: "harbour-tails"
    },
    community: {
      topic: "All",
      draftIllustration: 0
    },
    shop: {
      category: "All"
    },
    ai: {
      scenario: "Weekend walk",
      promptDraft: "",
      inputMode: "hybrid",
      sampleThreadVisible: true
    },
    aiOverlay: {
      open: false,
      quickPrompt: "",
      lastScrollTop: 0
    },
    plannerInputs: {
      city: "Hong Kong",
      petSize: "Medium",
      heatSensitivity: "Medium",
      destinationType: "Cafe"
    },
    healthLogType: "Walk",
    liveFlags: {
      reviewInjected: false,
      commentBoosted: false
    }
  }
};

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  cacheDom();
  loadState();
  bindGlobalEvents();
  handleGuestEntry();
  syncUiFromState();
  state.ui.viewLoading.home = true;
  renderApp();
  window.setTimeout(() => {
    state.ui.viewLoading.home = false;
    renderApp();
  }, 900);
  startRealtimeSimulations();
}

function cacheDom() {
  dom.offlineBanner = document.getElementById("offlineBanner");
  dom.appScrollRegion = document.getElementById("appScrollRegion");
  dom.bottomNav = document.getElementById("bottomNav");
  dom.communityFab = document.getElementById("communityFab");
  dom.cartBadge = document.getElementById("cartBadge");
  dom.sheetOverlay = document.getElementById("sheetOverlay");
  dom.sheetEyebrow = document.getElementById("sheetEyebrow");
  dom.sheetTitle = document.getElementById("sheetTitle");
  dom.sheetBody = document.getElementById("sheetBody");
  dom.toastStack = document.getElementById("toastStack");
  dom.views = {
    home: document.getElementById("home"),
    discover: document.getElementById("discover"),
    ai: document.getElementById("ai"),
    community: document.getElementById("community"),
    shop: document.getElementById("shop"),
    health: document.getElementById("health"),
    myProfile: document.getElementById("myProfile")
  };
}

function bindGlobalEvents() {
  document.addEventListener("click", handleClick);
  document.addEventListener("input", handleInput);
  document.addEventListener("submit", handleSubmit);
  window.addEventListener("online", handleConnectivityChange);
  window.addEventListener("offline", handleConnectivityChange);
}

function loadState() {
  state.session = loadDomain(STORAGE_KEYS.session, DEFAULT_STATE.session);
  state.user = loadDomain(STORAGE_KEYS.user, DEFAULT_STATE.user);
  state.pet = loadDomain(STORAGE_KEYS.pet, DEFAULT_STATE.pet);
  state.saved = loadDomain(STORAGE_KEYS.saved, DEFAULT_STATE.saved);
  state.planner = loadDomain(STORAGE_KEYS.planner, DEFAULT_STATE.planner);
  state.community = loadDomain(STORAGE_KEYS.community, DEFAULT_STATE.community);
  state.shop = loadDomain(STORAGE_KEYS.shop, DEFAULT_STATE.shop);
  state.health = loadDomain(STORAGE_KEYS.health, DEFAULT_STATE.health);
  state.uiPrefs = loadDomain(STORAGE_KEYS.uiPrefs, DEFAULT_STATE.uiPrefs);

  if (!state.user.email || !state.user.password || !state.session.authenticated) {
    state.session.authenticated = false;
    state.session.mode = "guest";
  } else {
    state.session.mode = "member";
  }
}

function loadDomain(storageKey, defaults) {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return clone(defaults);
    }
    return mergeDeep(clone(defaults), JSON.parse(raw));
  } catch (error) {
    return clone(defaults);
  }
}

function saveState(domainKey) {
  const storageKey = STORAGE_KEYS[domainKey];
  if (!storageKey) {
    return;
  }
  window.localStorage.setItem(storageKey, JSON.stringify(state[domainKey]));
}

function saveAllState() {
  saveState("session");
  saveState("user");
  saveState("pet");
  saveState("saved");
  saveState("planner");
  saveState("community");
  saveState("shop");
  saveState("health");
  saveState("uiPrefs");
}

function handleGuestEntry() {
  if (!state.session.authenticated) {
    state.session.mode = "guest";
    state.session.currentMainView = "home";
    state.ui.currentView = "home";
  } else {
    state.ui.currentView = MAIN_VIEWS.includes(state.session.currentMainView) ? state.session.currentMainView : "home";
  }
}

function syncUiFromState() {
  state.ui.discover.region = state.uiPrefs.mapRegion || normalizeRegion(state.pet.city);
  state.ui.discover.focusedPlaceId = getFirstPlaceIdForRegion(state.ui.discover.region);
  state.ui.plannerInputs.city = state.session.authenticated ? normalizePlannerCity(state.pet.city) : REGION_DEFAULT_CITY[state.ui.discover.region];
  state.ui.plannerInputs.petSize = state.pet.size || "Medium";
  state.ui.plannerInputs.heatSensitivity = state.pet.heatSensitivity || "Medium";
  state.ui.ai.scenario = state.planner.selectedScenario || "Weekend walk";
  state.ui.ai.promptDraft = state.planner.draftPrompt || "";
}

function renderApp() {
  updateOfflineBanner();
  renderHome();
  renderDiscover();
  renderAI();
  renderCommunity();
  renderShop();
  renderHealth();
  renderMyProfile();
  renderSheet();
  updateViewVisibility();
  updateBottomNav();
  updateCartBadge();
  updateFab();
  Object.values(dom.views).forEach((viewNode) => sanitizeDisplayArtifacts(viewNode));
}

function updateOfflineBanner() {
  dom.offlineBanner.hidden = !state.ui.offline;
}

function updateViewVisibility() {
  Object.keys(dom.views).forEach((viewName) => {
    dom.views[viewName].classList.toggle("view-active", viewName === state.ui.currentView);
  });
}

function updateBottomNav() {
  Array.from(dom.bottomNav.querySelectorAll(".nav-button")).forEach((button) => {
    const target = button.dataset.viewTarget;
    const active = state.ui.currentView === target;
    button.classList.toggle("active", active);
  });
}

function updateCartBadge() {
  const count = getCartCount();
  dom.cartBadge.hidden = count === 0;
  dom.cartBadge.textContent = String(count);
}

function updateFab() {
  dom.communityFab.classList.toggle("hidden", state.ui.currentView !== "community");
}

function renderHome() {
  dom.views.home.innerHTML = isViewLoading("home") ? renderSkeleton("home") : renderHomeMarkup();
}

function renderDiscover() {
  dom.views.discover.innerHTML = isViewLoading("discover") ? renderSkeleton("default") : renderDiscoverPageMarkup();
}

function renderAI() {
  dom.views.ai.innerHTML = isViewLoading("ai") ? renderSkeleton("default") : renderAIPageMarkup();
}

function renderCommunity() {
  dom.views.community.innerHTML = isViewLoading("community") ? renderSkeleton("default") : renderCommunityCompactMarkup();
}

function renderShop() {
  dom.views.shop.innerHTML = isViewLoading("shop") ? renderSkeleton("grid") : renderShopCompactMarkup();
}

function renderHealth() {
  dom.views.health.innerHTML = isViewLoading("health") ? renderSkeleton("default") : renderHealthCompactMarkup();
}

function renderMyProfile() {
  dom.views.myProfile.innerHTML = renderMyProfileTabMarkup();
}

function renderHomeMarkup() {
  return isGuestMode() ? renderGuestHome() : renderMemberHomeCompact();
}

function renderGuestHome() {
  const guideSpot = getPlacesByRegion(state.ui.discover.region)[0];
  const socialPost = getCommunityFeed()[0];
  const shopPick = products[0];
  const careHint = state.health.reminders[0];
  const aiPreview = state.planner.lastResult || getAiPreviewResult();

  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>PawPlanet guest mode</p>
          <h2>Pet-friendly city guide</h2>
        </div>
        ${renderAvatarButton()}
      </header>

      <div class="pill-row">
        ${Object.entries(REGION_LABELS).map(([value, label]) => `
          <button class="chip ${state.ui.discover.region === value ? "active" : ""}" type="button" data-action="set-home-region" data-region="${escapeHtml(value)}">${escapeHtml(label)}</button>
        `).join("")}
      </div>

      <section class="hero-card home-hero">
        <div class="hero-grid">
          <div class="hero-media">
            <img class="hero-photo hero-photo-main" src="${ASSETS.heroDog}" alt="Dog-friendly city lifestyle preview">
            <div class="hero-stack">
              <img class="hero-photo hero-photo-small" src="${ASSETS.heroCat}" alt="Cat-friendly travel preview">
              <div class="hero-float-card">
                <strong>Guest first</strong>
                <span>Browse places, stories, and products before signing in.</span>
              </div>
            </div>
          </div>
          <div class="hero-content">
            <span class="eyebrow">Cute, safe, and practical</span>
            <h3 class="hero-title">Plan pet-friendly days without the fragmented search.</h3>
            <p class="card-copy">${escapeHtml(REGION_LABELS[state.ui.discover.region])} preview. Browse first and sign in only when you want personalized planning.</p>
            <div class="hero-actions">
              <button class="primary-button" type="button" data-action="jump-view" data-view="discover">Open Guide</button>
              <button class="secondary-button" type="button" data-action="jump-view" data-view="ai">View AI</button>
            </div>
          </div>
        </div>
      </section>

      ${renderHomeModuleCard({
        eyebrow: "AI preview",
        title: "Structured planning with future chat",
        detailA: aiPreview.headline,
        detailB: "Sign in to generate and ask follow-up questions.",
        image: ASSETS.heroCat,
        actionView: "ai",
        actionLabel: "Open AI"
      })}

      ${renderHomeModuleCard({
        eyebrow: "Guide preview",
        title: guideSpot ? guideSpot.name : "Trusted pet-friendly places",
        detailA: guideSpot ? `${guideSpot.category} | ${guideSpot.distance}` : "Verified spots nearby",
        detailB: guideSpot ? guideSpot.badges[0] : "Policy clarity first",
        image: guideSpot ? guideSpot.image : ASSETS.placeCafe,
        actionView: "discover",
        actionLabel: "Open Guide"
      })}

      ${renderHomeModuleCard({
        eyebrow: "Social preview",
        title: socialPost ? `${socialPost.user} with ${socialPost.petName}` : "Community notes",
        detailA: socialPost ? socialPost.location : "Local pet lifestyle tips",
        detailB: socialPost ? socialPost.tags[0] : "Clean and practical",
        image: socialPost ? socialPost.image : ASSETS.communityOne,
        actionView: "community",
        actionLabel: "Open Social"
      })}

      ${renderHomeModuleCard({
        eyebrow: "Shop preview",
        title: shopPick ? shopPick.name : "Travel essentials",
        detailA: shopPick ? formatPrice(shopPick.price) : "Cute but practical",
        detailB: shopPick ? shopPick.tag : "Travel support",
        image: shopPick ? shopPick.image : ASSETS.shopBowl,
        actionView: "shop",
        actionLabel: "Open Shop"
      })}

      ${renderHomeModuleCard({
        eyebrow: "Care preview",
        title: "Daily care companion",
        detailA: getWeightLabel(),
        detailB: careHint ? careHint.detail : "Preview reminders and chart",
        image: ASSETS.profilePet,
        actionView: "health",
        actionLabel: "Open Care"
      })}
    </div>
  `;
}

function renderMemberHome() {
  const livePlace = getLiveReviewPlace() || getPlacesByRegion(state.ui.discover.region)[0];
  const communityPost = getCommunityFeed()[0];
  const shopPick = products[0];

  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Good ${getDayPart()}, ${escapeHtml(getOwnerName())}</p>
          <h2>${escapeHtml(state.pet.city)} with ${escapeHtml(state.pet.name || "your pet")}</h2>
        </div>
        ${renderAvatarButton()}
      </header>

      <section class="card summary-card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">${escapeHtml(state.pet.type)} profile</p>
            <h3 class="card-title">${escapeHtml(state.pet.name || "Your companion")}</h3>
            <p class="card-copy">${escapeHtml(state.pet.breed || "Ready for a calm city day")}</p>
          </div>
          <span class="badge">${escapeHtml(state.pet.mood || "Relaxed")}</span>
        </div>
        <div class="stat-grid">
          <div class="stat-tile"><strong>City</strong><span>${escapeHtml(state.pet.city)}</span></div>
          <div class="stat-tile"><strong>Weight</strong><span>${getWeightLabel()}</span></div>
          <div class="stat-tile"><strong>Saved places</strong><span>${state.saved.placeIds.length}</span></div>
          <div class="stat-tile"><strong>PawPoints</strong><span>${getPawPoints()}</span></div>
        </div>
      </section>

      <section class="hero-card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">AI Planner</p>
            <h3 class="card-title">Plan a safe day out with your pet</h3>
          </div>
          <span class="badge accent">Live</span>
        </div>
        <p class="card-copy">Structured planning for weather, pet policy, and backup care. Built to be clear, not chat-heavy.</p>
        <div class="planner-grid">
          <div class="planner-chip-block">
            <strong>City</strong>
            <div class="pill-row">${renderPlannerChips("city", ["Hong Kong", "Macau", "Shenzhen", "Guangzhou"], state.ui.plannerInputs.city)}</div>
          </div>
          <div class="planner-chip-block">
            <strong>Pet size</strong>
            <div class="pill-row">${renderPlannerChips("petSize", ["Small", "Medium", "Large"], state.ui.plannerInputs.petSize)}</div>
          </div>
          <div class="planner-chip-block">
            <strong>Heat sensitivity</strong>
            <div class="pill-row">${renderPlannerChips("heatSensitivity", ["Low", "Medium", "High"], state.ui.plannerInputs.heatSensitivity)}</div>
          </div>
          <div class="planner-chip-block">
            <strong>Destination</strong>
            <div class="pill-row">${renderPlannerChips("destinationType", PLANNER_DESTINATIONS, state.ui.plannerInputs.destinationType)}</div>
          </div>
        </div>
        <button class="primary-button" type="button" data-action="generate-plan">Generate Safe Plan</button>
      </section>

      <section class="preview-section">
        <div class="section-header">
          <div>
            <h3 class="section-title">Today at a glance</h3>
            <p class="section-subtitle">Quick reads across trust, care, and lifestyle.</p>
          </div>
        </div>
        <div class="preview-grid">
          <button class="preview-card" type="button" data-action="jump-view" data-view="discover">
            <img class="preview-image" src="${livePlace.image}" alt="Discover update">
            <div class="preview-copy">
              <strong>Discover update</strong>
              <span>${escapeHtml(livePlace.name)} • ${livePlace.liveUpdated ? "Just updated" : "Trusted nearby"}</span>
            </div>
          </button>
          <button class="preview-card" type="button" data-action="jump-view" data-view="community">
            <img class="preview-image" src="${communityPost.image}" alt="Community tip">
            <div class="preview-copy">
              <strong>Community tip</strong>
              <span>${escapeHtml(communityPost.user)} shared a practical route note.</span>
            </div>
          </button>
          <button class="preview-card" type="button" data-action="jump-view" data-view="shop">
            <img class="preview-image" src="${shopPick.image}" alt="Shop pick">
            <div class="preview-copy">
              <strong>Shop pick</strong>
              <span>${escapeHtml(shopPick.name)} • HK$${shopPick.price}</span>
            </div>
          </button>
          <button class="preview-card" type="button" data-action="jump-view" data-view="health">
            <img class="preview-image" src="${ASSETS.heroCat}" alt="Health card">
            <div class="preview-copy">
              <strong>Health today</strong>
              <span>Weight ${getWeightLabel()} • next walk ${escapeHtml(state.health.reminders[0].detail)}</span>
            </div>
          </button>
        </div>
      </section>
    </div>
  `;
}

function renderGuestPreviewBlocks(type, payload) {
  if (type === "discover") {
    return `
      <section class="preview-section">
        <div class="section-header">
          <div>
            <h3 class="section-title">Discover preview</h3>
            <p class="section-subtitle">Trusted places with policy clarity before you go.</p>
          </div>
          <button class="text-link" type="button" data-action="jump-view" data-view="discover">Open</button>
        </div>
        <div class="preview-grid">
          ${payload.map((place) => `
            <button class="preview-card" type="button" data-action="open-place" data-place-id="${escapeHtml(place.id)}">
              <img class="preview-image" src="${place.image}" alt="${escapeHtml(place.name)}">
              <div class="preview-copy">
                <strong>${escapeHtml(place.name)}</strong>
                <span>${escapeHtml(place.city)} • ${place.rating.toFixed(1)} • ${escapeHtml(place.badges[0])}</span>
              </div>
            </button>
          `).join("")}
        </div>
        ${renderDiscoverMapModule({ compact: true })}
      </section>
    `;
  }

  if (type === "community") {
    return `
      <section class="preview-section">
        <div class="section-header">
          <div>
            <h3 class="section-title">Community preview</h3>
            <p class="section-subtitle">Lifestyle notes that support trust, not noise.</p>
          </div>
          <button class="text-link" type="button" data-action="jump-view" data-view="community">Open</button>
        </div>
        <div class="preview-grid">
          ${payload.map((post) => `
            <button class="preview-card" type="button" data-action="open-post" data-post-id="${escapeHtml(post.id)}">
              <img class="preview-image" src="${post.image}" alt="${escapeHtml(post.location)}">
              <div class="preview-copy">
                <strong>${escapeHtml(post.user)} • ${escapeHtml(post.location)}</strong>
                <span>${escapeHtml(post.caption)}</span>
              </div>
            </button>
          `).join("")}
        </div>
      </section>
    `;
  }

  if (type === "shop") {
    return `
      <section class="preview-section">
        <div class="section-header">
          <div>
            <h3 class="section-title">Shop preview</h3>
            <p class="section-subtitle">Cute but practical travel and care essentials.</p>
          </div>
          <button class="text-link" type="button" data-action="jump-view" data-view="shop">Open</button>
        </div>
        <div class="preview-grid">
          ${payload.map((product) => `
            <button class="preview-card" type="button" data-action="open-product" data-product-id="${escapeHtml(product.id)}">
              <img class="preview-image" src="${product.image}" alt="${escapeHtml(product.name)}">
              <div class="preview-copy">
                <strong>${escapeHtml(product.name)}</strong>
                <span>HK$${product.price} • ${escapeHtml(product.tag)}</span>
              </div>
            </button>
          `).join("")}
        </div>
      </section>
    `;
  }

  return `
    <section class="preview-section">
      <div class="section-header">
        <div>
          <h3 class="section-title">Health preview</h3>
          <p class="section-subtitle">A care companion view teachers can understand at a glance.</p>
        </div>
        <button class="text-link" type="button" data-action="jump-view" data-view="health">Open</button>
      </div>
      <section class="card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Members only</p>
            <h3 class="card-title">Track weight, meals, walks, and mood</h3>
          </div>
          <span class="badge lock-badge">Locked</span>
        </div>
        ${renderWeightChart()}
        <button class="primary-button" type="button" data-action="open-health-log" data-type="Weight">Sign in to start logging</button>
      </section>
    </section>
  `;
}

function renderHomeModuleCard(config) {
  return `
    <section class="card preview-module-card">
      <div class="preview-module-layout">
        <img class="preview-image preview-thumb" src="${config.image}" alt="${escapeHtml(config.title)}">
        <div class="preview-copy">
          <p class="eyebrow">${escapeHtml(config.eyebrow)}</p>
          <strong>${escapeHtml(config.title)}</strong>
          <span>${escapeHtml(config.detailA)}</span>
          <span>${escapeHtml(config.detailB)}</span>
        </div>
      </div>
      <button class="secondary-button" type="button" data-action="jump-view" data-view="${escapeHtml(config.actionView)}">${escapeHtml(config.actionLabel)}</button>
    </section>
  `;
}

function renderMemberHomeCompact() {
  const livePlace = getLiveReviewPlace() || getPlacesByRegion(state.ui.discover.region)[0];
  const communityPost = getCommunityFeed()[0];
  const shopPick = products[0];
  const latestPlan = state.planner.lastResult || getAiPreviewResult();
  const careHint = state.health.reminders[0];

  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Good ${getDayPart()}, ${escapeHtml(getOwnerName())}</p>
          <h2>${escapeHtml(state.pet.city)} with ${escapeHtml(state.pet.name || "your pet")}</h2>
        </div>
        ${renderAvatarButton()}
      </header>

      <section class="card summary-card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Pet snapshot</p>
            <h3 class="card-title">${escapeHtml(state.pet.name || "Your companion")}</h3>
            <p class="card-copy">${escapeHtml(state.pet.breed || "Pet profile")} | ${escapeHtml(state.pet.city)}</p>
          </div>
          <span class="badge">${escapeHtml(state.pet.mood || "Relaxed")}</span>
        </div>
        <div class="summary-micro">
          <span class="mini-pill">${getWeightLabel()}</span>
          <span class="mini-pill">${state.saved.placeIds.length} saved</span>
        </div>
      </section>

      ${renderHomeModuleCard({
        eyebrow: "AI snapshot",
        title: latestPlan.headline,
        detailA: state.ui.plannerInputs.destinationType,
        detailB: latestPlan.policy,
        image: ASSETS.heroCat,
        actionView: "ai",
        actionLabel: "Open AI"
      })}

      ${renderHomeModuleCard({
        eyebrow: "Discover live",
        title: livePlace ? livePlace.name : "Trusted nearby",
        detailA: livePlace ? ((livePlace.justUpdated || livePlace.liveUpdated) ? "Just updated" : "Trusted nearby") : "Policy-aware picks",
        detailB: livePlace ? livePlace.badges[0] : "Verified review system",
        image: livePlace ? livePlace.image : ASSETS.placePark,
        actionView: "discover",
        actionLabel: "Open Guide"
      })}

      ${renderHomeModuleCard({
        eyebrow: "Today care",
        title: careHint ? careHint.title : "Care status",
        detailA: getWeightLabel(),
        detailB: careHint ? careHint.detail : escapeHtml(state.pet.mood || "Relaxed"),
        image: ASSETS.profilePet,
        actionView: "health",
        actionLabel: "Open Care"
      })}

      ${renderHomeModuleCard({
        eyebrow: "Social note",
        title: communityPost ? `${communityPost.user} with ${communityPost.petName}` : "Community tips",
        detailA: communityPost ? communityPost.location : "Practical local notes",
        detailB: communityPost ? communityPost.tags[0] : "Lifestyle support",
        image: communityPost ? communityPost.image : ASSETS.communityOne,
        actionView: "community",
        actionLabel: "Open Social"
      })}

      ${renderHomeModuleCard({
        eyebrow: "Shop pick",
        title: shopPick ? shopPick.name : "Travel essentials",
        detailA: shopPick ? formatPrice(shopPick.price) : "Cute but useful",
        detailB: shopPick ? shopPick.tag : "Travel support",
        image: shopPick ? shopPick.image : ASSETS.shopRaincoat,
        actionView: "shop",
        actionLabel: "Open Shop"
      })}
    </div>
  `;
}

function getCommunityFeed() {
  ensureCommunityComposerState();
  const merged = state.community.customPosts
    .concat(getSupplementalCommunityPosts())
    .concat(posts)
    .map((post) => normalizeCommunityPost(post));

  if (state.ui.community.topic === "All") {
    return merged;
  }

  return merged.filter((post) => post.tags.includes(state.ui.community.topic) || post.topic === state.ui.community.topic);
}

function getPostById(postId) {
  return getCommunityFeed().find((post) => post.id === postId) || null;
}

function renderCommunityCompactMarkup() {
  ensureCommunityComposerState();
  const feed = getCommunityFeed();

  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Pet lifestyle community</p>
          <h2>Community</h2>
          <span class="screen-header-note">Real pet-friendly notes from local owners.</span>
        </div>
        ${renderHeaderAction("community")}
      </header>

      ${renderCommunityComposerCard()}

      <div class="topic-row">
        ${getCommunityTopics().map((topic) => `<button class="chip ${state.ui.community.topic === topic ? "active" : ""}" type="button" data-action="set-community-topic" data-topic="${escapeHtml(topic)}">${escapeHtml(topic)}</button>`).join("")}
      </div>

      <section class="story-row">
        ${getCommunityHighlights().map((story) => `
          <button class="story-bubble community-story-bubble" type="button" data-action="set-community-topic" data-topic="${escapeHtml(story.topic)}">
            <div class="story-avatar">${renderStoryIcon(story.icon)}</div>
            <strong>${escapeHtml(story.title)}</strong>
            <span>${escapeHtml(story.subtitle)}</span>
          </button>
        `).join("")}
      </section>

      ${renderCommunityFeaturedStrip(feed)}

      <section class="feed-list community-feed-list">
        ${feed.map((post) => renderCommunityPostCard(post)).join("") || `
          <div class="empty-state">
            <strong>No posts match this topic</strong>
            <span>Try another topic to bring pet-friendly stories and route notes back into view.</span>
          </div>
        `}
      </section>
    </div>
  `;
}

function renderPostDetail() {
  const post = getPostById(state.ui.sheet.payload && state.ui.sheet.payload.postId);
  if (!post) {
    return "";
  }

  const liked = state.community.likedPostIds.includes(post.id);
  const saved = state.saved.postIds.includes(post.id);

  return `
    <div class="detail-stack">
      <img class="detail-image" src="${post.image}" alt="${escapeHtml(post.headline)}">
      <section class="card detail-card">
        <div class="feed-author-row">
          ${renderCommunityAvatar(post)}
          <div class="feed-author-copy">
            <strong>${escapeHtml(post.user)} with ${escapeHtml(post.petName)}</strong>
            <span>${escapeHtml(post.location)}</span>
          </div>
          ${post.verifiedVisit ? '<span class="badge">Verified visit</span>' : '<span class="badge subtle">Lifestyle note</span>'}
        </div>
        <div class="feed-text-stack">
          <h3 class="card-title">${escapeHtml(post.headline)}</h3>
          <p>${escapeHtml(post.caption)}</p>
        </div>
        <div class="tag-row community-tag-row">
          ${post.tags.map((tag) => `<span class="mini-pill">${escapeHtml(tag)}</span>`).join("")}
        </div>
      </section>
      <section class="detail-points-grid">
        <article class="card detail-point-card accent-green">
          <p class="eyebrow">Best time</p>
          <strong>${escapeHtml(post.bestTime || "Earlier, cooler hours")}</strong>
          <span>${escapeHtml(post.visitNote || "Useful timing note from the visit.")}</span>
        </article>
        <article class="card detail-point-card accent-yellow">
          <p class="eyebrow">Pet policy</p>
          <strong>${escapeHtml(post.policyTip || "Ask staff or check community notes on arrival")}</strong>
          <span>${escapeHtml(post.verifiedVisit ? "Verified by community visit." : "Lifestyle note, not official policy.")}</span>
        </article>
        <article class="card detail-point-card accent-green-soft">
          <p class="eyebrow">What helped</p>
          <strong>${escapeHtml(post.tags[0] || "Travel note")}</strong>
          <span>${escapeHtml(post.tags[1] || "A simple tip that made the route smoother.")}</span>
        </article>
      </section>
      <section class="card detail-card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Interaction</p>
            <h3 class="card-title">${post.likes + (liked ? 1 : 0)} likes | ${getCommentCount(post)} comments</h3>
          </div>
        </div>
        <div class="inline-actions wrap">
          <button class="secondary-button" type="button" data-action="toggle-like-post" data-post-id="${escapeHtml(post.id)}">${liked ? "Unlike" : "Like"}</button>
          <button class="secondary-button" type="button" data-action="toggle-save-post" data-post-id="${escapeHtml(post.id)}">${saved ? "Saved" : "Save"}</button>
        </div>
      </section>
      <section class="card detail-card">
        <p class="eyebrow">Comment preview</p>
        <div class="comment-preview-list">
          ${(post.commentsPreview && post.commentsPreview.length ? post.commentsPreview : [{ user: "PawPlanet", text: "This post is new. Helpful comments will show here later." }]).slice(0, 3).map((comment) => `
            <article class="comment-preview-item">
              <strong>${escapeHtml(comment.user)}</strong>
              <span>${escapeHtml(comment.text)}</span>
            </article>
          `).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderCreatePostSheet() {
  ensureCommunityComposerState();
  const preview = state.ui.community.draftImagePreview;
  const fileName = state.ui.community.draftImageName;

  return `
    <form class="sheet-form community-post-form" data-form="create-post">
      <div class="upload-cover-shell">
        ${preview ? `
          <img class="upload-cover-preview" src="${preview}" alt="Selected post cover preview">
        ` : `
          <div class="upload-cover-empty">
            <div class="story-avatar">${renderStoryIcon("bag")}</div>
            <strong>Add a cover image</strong>
            <span>Choose one photo to make your post feel like a real lifestyle note.</span>
          </div>
        `}
        <input class="upload-cover-input" id="postImageInput" data-role="post-image-input" name="coverImage" type="file" accept="image/*">
      </div>
      <div class="upload-cover-actions">
        <label class="secondary-button upload-action-label" for="postImageInput">${preview ? "Change image" : "Upload cover"}</label>
        ${preview ? '<button class="ghost-button" type="button" data-action="clear-post-image">Remove</button>' : '<span class="helper-text">Local image preview only for this demo.</span>'}
      </div>
      ${fileName ? `<p class="helper-text upload-file-name">${escapeHtml(fileName)}</p>` : ""}
      <label class="sheet-field">
        <span>Headline</span>
        <input type="text" name="headline" placeholder="Summarize your pet-friendly tip">
      </label>
      <label class="sheet-field">
        <span>Caption</span>
        <textarea name="caption" placeholder="What worked, what to avoid, and what helped your pet feel safe?"></textarea>
      </label>
      <div class="sheet-inline">
        <label class="sheet-field">
          <span>Location</span>
          <input type="text" name="location" placeholder="Central, Hong Kong">
        </label>
        <label class="sheet-field">
          <span>Topic</span>
          <select name="tag">
            ${getCommunityTopics().filter((item) => item !== "All").map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join("")}
          </select>
        </label>
      </div>
      <label class="sheet-field">
        <span>Visit note</span>
        <input type="text" name="visitNote" placeholder="Best before 11 AM / Carrier recommended">
      </label>
      <label class="sheet-field">
        <span>Pet policy or useful tip</span>
        <textarea name="policyTip" placeholder="Outdoor seating only, stroller helped in lobby, bring water before noon..."></textarea>
      </label>
      <button class="primary-button" type="submit">Publish post</button>
    </form>
  `;
}

function handleCreatePost(form) {
  if (requireAuth("create post")) {
    return;
  }

  ensureCommunityComposerState();
  const data = new FormData(form);
  const headline = String(data.get("headline") || "").trim();
  const caption = String(data.get("caption") || "").trim();
  const location = String(data.get("location") || "").trim();
  const tag = String(data.get("tag") || "").trim();
  const visitNote = String(data.get("visitNote") || "").trim();
  const policyTip = String(data.get("policyTip") || "").trim();

  if (!headline || !caption || !location || !tag) {
    showToast("Add a headline, caption, location, and topic.", "error");
    return;
  }

  state.community.customPosts.unshift({
    id: `custom-post-${Date.now()}`,
    user: getOwnerName(),
    petName: state.pet.name || "Buddy",
    location,
    headline,
    caption,
    excerpt: truncateCommunityText(caption, 110),
    tags: [tag],
    likes: 0,
    comments: 0,
    verifiedVisit: false,
    image: state.ui.community.draftImagePreview || ASSETS.communityTwo,
    imageSourceType: state.ui.community.draftImagePreview ? "upload" : "asset",
    topic: tag,
    visitNote,
    policyTip,
    bestTime: visitNote,
    commentsPreview: []
  });

  saveState("community");
  resetCreatePostDraft();
  closeSheet();
  renderCommunity();
  showToast("Post created in local demo state.", "success");
}

function handleClick(event) {
  const actionNode = event.target.closest("[data-action]");
  const navNode = event.target.closest("[data-view-target]");

  if (navNode) {
    closeAiOverlay(true);
    switchView(navNode.dataset.viewTarget);
    return;
  }

  if (!actionNode) {
    return;
  }

  const action = actionNode.dataset.action;

  switch (action) {
    case "jump-view":
      closeAiOverlay(true);
      switchView(actionNode.dataset.view);
      break;
    case "open-ai-overlay":
      openAiOverlay();
      break;
    case "close-ai-overlay":
      closeAiOverlay();
      break;
    case "use-ai-starter":
      if (requireAuth("ai chat")) {
        return;
      }
      sendAiPrompt(actionNode.dataset.prompt || "");
      break;
    case "open-auth":
      openAuthOverlay(actionNode.dataset.mode || "login", actionNode.dataset.reason || "");
      break;
    case "close-auth-overlay":
      closeAuthOverlay();
      break;
    case "close-sheet":
      closeSheet();
      break;
    case "auth-segment":
      state.ui.authMode = actionNode.dataset.mode || "login";
      renderAuthOverlay();
      break;
    case "toggle-password":
      togglePasswordField(actionNode);
      break;
    case "generate-plan":
      if (requireAuth("ai planner")) {
        return;
      }
      generateSafePlan(state.ui.plannerInputs);
      break;
    case "set-home-region":
      state.ui.discover.region = actionNode.dataset.region;
      state.uiPrefs.mapRegion = state.ui.discover.region;
      state.ui.discover.focusedPlaceId = getFirstPlaceIdForRegion(state.ui.discover.region);
      state.ui.plannerInputs.city = REGION_DEFAULT_CITY[state.ui.discover.region];
      saveState("uiPrefs");
      renderHome();
      renderDiscover();
      renderAI();
      break;
    case "set-planner-input":
      state.ui.plannerInputs[actionNode.dataset.field] = actionNode.dataset.value;
      saveState("planner");
      renderAI();
      break;
    case "set-discover-region":
      state.ui.discover.region = actionNode.dataset.region;
      state.uiPrefs.mapRegion = state.ui.discover.region;
      state.ui.discover.focusedPlaceId = getFirstFilteredPlaceId();
      saveState("uiPrefs");
      renderDiscover();
      break;
    case "set-discover-category":
      state.ui.discover.category = actionNode.dataset.category;
      state.ui.discover.focusedPlaceId = getFirstFilteredPlaceId();
      renderDiscover();
      break;
    case "set-map-style":
      state.ui.discover.mapStyle = actionNode.dataset.style;
      renderDiscover();
      break;
    case "focus-map-place":
      state.ui.discover.focusedPlaceId = actionNode.dataset.placeId;
      renderDiscover();
      break;
    case "map-preview-zoom":
      showToast("Static map preview only. In Kodular this maps to built-in zoom controls.", "info");
      break;
    case "open-place":
      openSheet("placeDetail", { placeId: actionNode.dataset.placeId });
      break;
    case "toggle-save-place":
      if (requireAuth("save place")) {
        return;
      }
      toggleSavedPlace(actionNode.dataset.placeId);
      break;
    case "set-community-topic":
      ensureCommunityComposerState();
      state.ui.community.topic = actionNode.dataset.topic;
      renderCommunity();
      break;
    case "open-post":
      openSheet("postDetail", { postId: actionNode.dataset.postId });
      break;
    case "toggle-like-post":
      if (requireAuth("like post")) {
        return;
      }
      toggleLikedPost(actionNode.dataset.postId);
      break;
    case "toggle-save-post":
      if (requireAuth("save post")) {
        return;
      }
      toggleSavedPost(actionNode.dataset.postId);
      break;
    case "open-create-post":
      if (requireAuth("create post")) {
        return;
      }
      resetCreatePostDraft();
      openSheet("createPost", {});
      break;
    case "clear-post-image":
      clearPostImageDraft();
      break;
    case "cycle-illustration":
      state.ui.community.draftIllustration = (state.ui.community.draftIllustration + 1) % CREATE_POST_ILLUSTRATIONS.length;
      renderSheet();
      break;
    case "set-shop-category":
      state.ui.shop.category = actionNode.dataset.category;
      renderShop();
      break;
    case "open-product":
      openSheet("productDetail", { productId: actionNode.dataset.productId, qty: 1 });
      break;
    case "product-qty":
      if (state.ui.sheet.type === "productDetail" && state.ui.sheet.payload) {
        const nextQty = clamp(Number(state.ui.sheet.payload.qty || 1) + Number(actionNode.dataset.direction || 0), 1, 9);
        state.ui.sheet.payload.qty = nextQty;
        renderSheet();
      }
      break;
    case "add-to-cart":
      addToCart(actionNode.dataset.productId, Number(actionNode.dataset.qty || (state.ui.sheet.payload && state.ui.sheet.payload.qty) || 1));
      break;
    case "open-cart":
      openSheet("cart", {});
      break;
    case "cart-qty":
      changeCartQty(actionNode.dataset.productId, Number(actionNode.dataset.direction || 0));
      break;
    case "remove-cart-item":
      removeCartItem(actionNode.dataset.productId);
      break;
    case "checkout-cart":
      if (requireAuth("checkout")) {
        return;
      }
      if (!state.shop.cart.length) {
        showToast("Your member cart is empty.", "error");
        return;
      }
      state.shop.cart = [];
      saveState("shop");
      openSheet("orderSuccess", {});
      updateCartBadge();
      renderShop();
      break;
    case "open-health-log":
      state.ui.healthLogType = actionNode.dataset.type || "Walk";
      if (requireAuth("health log")) {
        return;
      }
      openSheet("healthLog", {});
      break;
    case "set-health-log-type":
      state.ui.healthLogType = actionNode.dataset.type || "Walk";
      renderSheet();
      break;
    case "open-edit-profile":
      if (requireAuth("edit profile")) {
        return;
      }
      openSheet("editProfile", {});
      break;
    case "toggle-setting":
      if (requireAuth("change settings")) {
        return;
      }
      state.user.preferences[actionNode.dataset.setting] = !state.user.preferences[actionNode.dataset.setting];
      saveState("user");
      renderMyProfile();
      break;
    case "logout":
      handleLogout();
      break;
    case "mock-message":
      showToast(actionNode.dataset.message || "Demo action", "info");
      break;
    default:
      break;
  }
}

function bindGlobalEvents() {
  document.addEventListener("click", handleClick);
  document.addEventListener("input", handleInput);
  document.addEventListener("change", handleChange);
  document.addEventListener("submit", handleSubmit);
  window.addEventListener("online", handleConnectivityChange);
  window.addEventListener("offline", handleConnectivityChange);
}

function handleChange(event) {
  const target = event.target;
  if (target.matches('[data-role="post-image-input"]')) {
    handlePostImageSelect(target);
  }
}

function getCommunityTopics() {
  return [
    "All",
    "Weekend walk",
    "Pet-friendly cafe",
    "Dog stroller",
    "HK tips",
    "Macau day trip",
    "Cat carrier",
    "Rainy day backup"
  ];
}

function getCommunityHighlights() {
  return [
    { id: "story-cafe", title: "Cafe wins", subtitle: "Terrace notes", icon: "cup", topic: "Pet-friendly cafe" },
    { id: "story-vet", title: "Backup vets", subtitle: "Near routes", icon: "cross", topic: "HK tips" },
    { id: "story-pack", title: "Packing", subtitle: "Rain + stroller", icon: "bag", topic: "Dog stroller" },
    { id: "story-cats", title: "Cat stays", subtitle: "Carrier tips", icon: "moon", topic: "Cat carrier" },
    { id: "story-rain", title: "Rainy day", subtitle: "Indoor backup", icon: "moon", topic: "Rainy day backup" }
  ];
}

function ensureCommunityComposerState() {
  state.ui.community = state.ui.community || {};
  if (!getCommunityTopics().includes(state.ui.community.topic)) {
    state.ui.community.topic = "All";
  }
  state.ui.community.draftImagePreview = state.ui.community.draftImagePreview || "";
  state.ui.community.draftImageName = state.ui.community.draftImageName || "";
  state.ui.community.createMode = state.ui.community.createMode || "new";
  state.ui.community.featuredFilter = state.ui.community.featuredFilter || "all";
}

function truncateCommunityText(text, maxLength) {
  const safe = String(text || "").trim();
  if (!safe) {
    return "";
  }
  if (safe.length <= maxLength) {
    return safe;
  }
  return `${safe.slice(0, maxLength - 1).trim()}...`;
}

function deriveCommunityHeadline(post) {
  if (post.headline) {
    return post.headline;
  }
  if ((post.tags || []).includes("Pet-friendly cafe")) {
    return "Cool terrace stop before noon";
  }
  if ((post.tags || []).includes("Dog stroller")) {
    return "Stroller saved this route";
  }
  if ((post.tags || []).includes("Cat carrier")) {
    return "Carrier-friendly calm stop";
  }
  if ((post.tags || []).includes("Rainy day backup")) {
    return "Rainy day backup that still felt easy";
  }
  return truncateCommunityText(post.caption || "Pet-friendly outing note", 42);
}

function getPostExcerpt(post) {
  if (post.excerpt) {
    return post.excerpt;
  }
  return truncateCommunityText(post.caption || "", 110);
}

function getSupplementalCommunityPosts() {
  return [
    {
      id: "post-cat-carrier-hk",
      user: "Lina",
      petName: "Nori",
      location: "Sai Ying Pun, Hong Kong",
      headline: "Carrier-friendly cafe corner that stayed calm",
      caption: "We picked a quieter indoor corner and kept the carrier partly open after ordering. It helped Nori settle while still feeling safe.",
      excerpt: "A calmer indoor stop for cats in carriers when outdoor tables feel too busy.",
      tags: ["Cat carrier", "Pet-friendly cafe"],
      likes: 87,
      comments: 9,
      verifiedVisit: true,
      image: ASSETS.communityTwo,
      imageSourceType: "asset",
      topic: "Cat carrier",
      visitNote: "Best before 11 AM",
      policyTip: "Carrier stayed closed while ordering, then partly open once seated.",
      bestTime: "Before 11 AM",
      commentsPreview: [
        { user: "Miya", text: "This is exactly the kind of cat tip I needed." },
        { user: "Ken", text: "Love the carrier note. Indoor corners matter so much." }
      ]
    },
    {
      id: "post-rainy-backup-macau",
      user: "Terry",
      petName: "Bao",
      location: "Taipa, Macau",
      headline: "Rainy day backup with stroller-ready access",
      caption: "The indoor stop worked well once the weather shifted. A compact stroller made the lobby rule easy and gave Bao a dry reset before heading out again.",
      excerpt: "Good indoor fallback when Macau weather changes fast and you already packed a stroller.",
      tags: ["Rainy day backup", "Dog stroller"],
      likes: 109,
      comments: 13,
      verifiedVisit: false,
      image: ASSETS.communityOne,
      imageSourceType: "asset",
      topic: "Rainy day backup",
      visitNote: "Indoor backup",
      policyTip: "Compact stroller helped with lobby and corridor rules.",
      bestTime: "Rainy afternoons",
      commentsPreview: [
        { user: "Suki", text: "This kind of fallback plan makes the trip feel less risky." },
        { user: "Ray", text: "Indoor backup tips are underrated. Thanks for sharing." }
      ]
    }
  ];
}

function normalizeCommunityPost(post) {
  const tags = Array.isArray(post.tags) && post.tags.length ? post.tags : [post.topic || "Weekend walk"];
  return {
    id: post.id,
    user: post.user || "PawPlanet member",
    petName: post.petName || state.pet.name || "Buddy",
    authorAvatar: post.authorAvatar || "",
    location: post.location || state.pet.city || "Hong Kong",
    headline: deriveCommunityHeadline(post),
    caption: post.caption || "Useful pet-friendly note.",
    excerpt: getPostExcerpt(post),
    tags,
    likes: Number(post.likes || 0),
    comments: Number(post.comments || 0),
    verifiedVisit: Boolean(post.verifiedVisit),
    image: post.image || ASSETS.communityOne,
    imageSourceType: post.imageSourceType || "asset",
    topic: post.topic || tags[0] || "Weekend walk",
    visitNote: post.visitNote || "",
    policyTip: post.policyTip || "",
    bestTime: post.bestTime || post.visitNote || "",
    commentsPreview: Array.isArray(post.commentsPreview) ? post.commentsPreview : []
  };
}

function getCommunityFeed() {
  ensureCommunityComposerState();
  const merged = state.community.customPosts
    .concat(getSupplementalCommunityPosts())
    .concat(posts)
    .map((post) => normalizeCommunityPost(post));

  if (state.ui.community.topic === "All") {
    return merged;
  }

  return merged.filter((post) => post.tags.includes(state.ui.community.topic) || post.topic === state.ui.community.topic);
}

function getPostById(postId) {
  return getCommunityFeed().find((post) => post.id === postId) || null;
}

function getFeaturedCommunityPosts(feed) {
  const source = feed && feed.length ? feed : getCommunityFeed();
  const featured = [];
  const verified = source.find((post) => post.verifiedVisit);
  const hot = clone(source).sort((a, b) => (b.likes + getCommentCount(b)) - (a.likes + getCommentCount(a)))[0];
  const rainy = source.find((post) => post.tags.includes("Rainy day backup"));

  [verified, hot, rainy].forEach((post) => {
    if (post && !featured.some((item) => item.id === post.id)) {
      featured.push(post);
    }
  });

  return featured.slice(0, 3);
}

function renderCommunityAvatar(post) {
  return `
    <div class="feed-avatar" aria-hidden="true">${escapeHtml(String((post.user || "P").slice(0, 1)).toUpperCase())}</div>
  `;
}

function renderCommunityComposerCard() {
  return `
    <section class="card community-composer-card">
      <div class="community-composer-row">
        <div class="community-composer-avatar" aria-hidden="true">${escapeHtml(String((getOwnerName() || "P").slice(0, 1)).toUpperCase())}</div>
        <div class="community-composer-copy">
          <p class="eyebrow">Share a note</p>
          <h3 class="card-title">Share your pet-friendly day</h3>
          <p class="card-copy">Cafe tips, stroller notes, route wins, and calm travel tricks.</p>
        </div>
      </div>
      <div class="inline-actions wrap">
        <button class="primary-button" type="button" data-action="open-create-post">Create Post</button>
        <span class="helper-text">${isGuestMode() ? "Guests can browse. Posting unlocks after login." : "Add a cover image and turn your outing into a useful note."}</span>
      </div>
    </section>
  `;
}

function renderCommunityFeaturedStrip(feed) {
  const featuredPosts = getFeaturedCommunityPosts(feed);
  if (!featuredPosts.length) {
    return "";
  }

  return `
    <section class="community-featured-strip">
      ${featuredPosts.map((post, index) => {
        const tone = index === 0 ? "verified" : index === 1 ? "hot" : "tip";
        const label = index === 0 ? "Verified visit" : index === 1 ? "Hot this week" : "Rainy day tip";
        return `
          <button class="community-feature-card ${tone}" type="button" data-action="open-post" data-post-id="${escapeHtml(post.id)}">
            <p class="eyebrow">${escapeHtml(label)}</p>
            <strong>${escapeHtml(post.headline)}</strong>
            <span>${escapeHtml(post.location)}</span>
          </button>
        `;
      }).join("")}
    </section>
  `;
}

function renderCommunityPostCard(post) {
  const liked = state.community.likedPostIds.includes(post.id);
  const saved = state.saved.postIds.includes(post.id);
  const visibleTags = post.tags.slice(0, 2);
  return `
    <article class="feed-card community-post-card card">
      <button class="card-button" type="button" data-action="open-post" data-post-id="${escapeHtml(post.id)}">
        <img class="feed-image community-feed-image" src="${post.image}" alt="${escapeHtml(post.headline)}">
      </button>
      <div class="feed-content-stack">
        <div class="feed-author-row">
          ${renderCommunityAvatar(post)}
          <div class="feed-author-copy">
            <strong>${escapeHtml(post.user)} with ${escapeHtml(post.petName)}</strong>
            <span>${escapeHtml(post.location)}</span>
          </div>
          ${post.verifiedVisit ? '<span class="badge">Verified visit</span>' : '<span class="badge subtle">Lifestyle note</span>'}
        </div>
        <div class="feed-text-stack">
          <h3 class="feed-title">${escapeHtml(post.headline)}</h3>
          <p class="feed-excerpt">${escapeHtml(post.excerpt)}</p>
        </div>
        <div class="tag-row community-tag-row">
          ${visibleTags.map((tag) => `<span class="mini-pill">${escapeHtml(tag)}</span>`).join("")}
          ${post.visitNote ? `<span class="tip-pill">${escapeHtml(post.visitNote)}</span>` : ""}
        </div>
        <div class="feed-actions">
          <button class="ghost-button" type="button" data-action="toggle-like-post" data-post-id="${escapeHtml(post.id)}">${liked ? "Liked" : "Like"} ${post.likes + (liked ? 1 : 0)}</button>
          <button class="ghost-button" type="button" data-action="open-post" data-post-id="${escapeHtml(post.id)}">${getCommentCount(post)} comments</button>
          <button class="ghost-button" type="button" data-action="toggle-save-post" data-post-id="${escapeHtml(post.id)}">${saved ? "Saved" : "Save"}</button>
        </div>
      </div>
    </article>
  `;
}

function renderCommunityCompactMarkup() {
  ensureCommunityComposerState();
  const feed = getCommunityFeed();

  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Pet lifestyle community</p>
          <h2>Community</h2>
          <span class="screen-header-note">Real pet-friendly notes from local owners.</span>
        </div>
        ${renderHeaderAction("community")}
      </header>

      ${renderCommunityComposerCard()}

      <div class="topic-row">
        ${getCommunityTopics().map((topic) => `<button class="chip ${state.ui.community.topic === topic ? "active" : ""}" type="button" data-action="set-community-topic" data-topic="${escapeHtml(topic)}">${escapeHtml(topic)}</button>`).join("")}
      </div>

      <section class="story-row">
        ${getCommunityHighlights().map((story) => `
          <button class="story-bubble community-story-bubble" type="button" data-action="set-community-topic" data-topic="${escapeHtml(story.topic)}">
            <div class="story-avatar">${renderStoryIcon(story.icon)}</div>
            <strong>${escapeHtml(story.title)}</strong>
            <span>${escapeHtml(story.subtitle)}</span>
          </button>
        `).join("")}
      </section>

      ${renderCommunityFeaturedStrip(feed)}

      <section class="feed-list community-feed-list">
        ${feed.map((post) => renderCommunityPostCard(post)).join("") || `
          <div class="empty-state">
            <strong>No posts match this topic</strong>
            <span>Try another topic to bring pet-friendly stories and route notes back into view.</span>
          </div>
        `}
      </section>
    </div>
  `;
}

function renderPostDetail() {
  const post = getPostById(state.ui.sheet.payload && state.ui.sheet.payload.postId);
  if (!post) {
    return "";
  }

  const liked = state.community.likedPostIds.includes(post.id);
  const saved = state.saved.postIds.includes(post.id);

  return `
    <div class="detail-stack">
      <img class="detail-image" src="${post.image}" alt="${escapeHtml(post.headline)}">
      <section class="card detail-card">
        <div class="feed-author-row">
          ${renderCommunityAvatar(post)}
          <div class="feed-author-copy">
            <strong>${escapeHtml(post.user)} with ${escapeHtml(post.petName)}</strong>
            <span>${escapeHtml(post.location)}</span>
          </div>
          ${post.verifiedVisit ? '<span class="badge">Verified visit</span>' : '<span class="badge subtle">Lifestyle note</span>'}
        </div>
        <div class="feed-text-stack">
          <h3 class="card-title">${escapeHtml(post.headline)}</h3>
          <p>${escapeHtml(post.caption)}</p>
        </div>
        <div class="tag-row community-tag-row">
          ${post.tags.map((tag) => `<span class="mini-pill">${escapeHtml(tag)}</span>`).join("")}
        </div>
      </section>
      <section class="detail-points-grid">
        <article class="card detail-point-card accent-green">
          <p class="eyebrow">Best time</p>
          <strong>${escapeHtml(post.bestTime || "Earlier, cooler hours")}</strong>
          <span>${escapeHtml(post.visitNote || "Useful timing note from the visit.")}</span>
        </article>
        <article class="card detail-point-card accent-yellow">
          <p class="eyebrow">Pet policy</p>
          <strong>${escapeHtml(post.policyTip || "Ask staff or check community notes on arrival")}</strong>
          <span>${escapeHtml(post.verifiedVisit ? "Verified by community visit." : "Lifestyle note, not official policy.")}</span>
        </article>
        <article class="card detail-point-card accent-green-soft">
          <p class="eyebrow">What helped</p>
          <strong>${escapeHtml(post.tags[0] || "Travel note")}</strong>
          <span>${escapeHtml(post.tags[1] || "A simple tip that made the route smoother.")}</span>
        </article>
      </section>
      <section class="card detail-card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Interaction</p>
            <h3 class="card-title">${post.likes + (liked ? 1 : 0)} likes | ${getCommentCount(post)} comments</h3>
          </div>
        </div>
        <div class="inline-actions wrap">
          <button class="secondary-button" type="button" data-action="toggle-like-post" data-post-id="${escapeHtml(post.id)}">${liked ? "Unlike" : "Like"}</button>
          <button class="secondary-button" type="button" data-action="toggle-save-post" data-post-id="${escapeHtml(post.id)}">${saved ? "Saved" : "Save"}</button>
        </div>
      </section>
      <section class="card detail-card">
        <p class="eyebrow">Comment preview</p>
        <div class="comment-preview-list">
          ${(post.commentsPreview && post.commentsPreview.length ? post.commentsPreview : [{ user: "PawPlanet", text: "This post is new. Helpful comments will show here later." }]).slice(0, 3).map((comment) => `
            <article class="comment-preview-item">
              <strong>${escapeHtml(comment.user)}</strong>
              <span>${escapeHtml(comment.text)}</span>
            </article>
          `).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderCreatePostSheet() {
  ensureCommunityComposerState();
  const preview = state.ui.community.draftImagePreview;
  const fileName = state.ui.community.draftImageName;

  return `
    <form class="sheet-form community-post-form" data-form="create-post">
      <div class="upload-cover-shell">
        ${preview ? `
          <img class="upload-cover-preview" src="${preview}" alt="Selected post cover preview">
        ` : `
          <div class="upload-cover-empty">
            <div class="story-avatar">${renderStoryIcon("bag")}</div>
            <strong>Add a cover image</strong>
            <span>Choose one photo to make your post feel like a real lifestyle note.</span>
          </div>
        `}
        <input class="upload-cover-input" id="postImageInput" data-role="post-image-input" name="coverImage" type="file" accept="image/*">
      </div>
      <div class="upload-cover-actions">
        <label class="secondary-button upload-action-label" for="postImageInput">${preview ? "Change image" : "Upload cover"}</label>
        ${preview ? '<button class="ghost-button" type="button" data-action="clear-post-image">Remove</button>' : '<span class="helper-text">Local image preview only for this demo.</span>'}
      </div>
      ${fileName ? `<p class="helper-text upload-file-name">${escapeHtml(fileName)}</p>` : ""}
      <label class="sheet-field">
        <span>Headline</span>
        <input type="text" name="headline" placeholder="Summarize your pet-friendly tip">
      </label>
      <label class="sheet-field">
        <span>Caption</span>
        <textarea name="caption" placeholder="What worked, what to avoid, and what helped your pet feel safe?"></textarea>
      </label>
      <div class="sheet-inline">
        <label class="sheet-field">
          <span>Location</span>
          <input type="text" name="location" placeholder="Central, Hong Kong">
        </label>
        <label class="sheet-field">
          <span>Topic</span>
          <select name="tag">
            ${getCommunityTopics().filter((item) => item !== "All").map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join("")}
          </select>
        </label>
      </div>
      <label class="sheet-field">
        <span>Visit note</span>
        <input type="text" name="visitNote" placeholder="Best before 11 AM / Carrier recommended">
      </label>
      <label class="sheet-field">
        <span>Pet policy or useful tip</span>
        <textarea name="policyTip" placeholder="Outdoor seating only, stroller helped in lobby, bring water before noon..."></textarea>
      </label>
      <button class="primary-button" type="submit">Publish post</button>
    </form>
  `;
}

function handlePostImageSelect(input) {
  ensureCommunityComposerState();
  const file = input.files && input.files[0];
  if (!file) {
    return;
  }

  if (!String(file.type || "").startsWith("image/")) {
    showToast("Choose an image file for the cover.", "error");
    return;
  }

  state.ui.community.draftImagePreview = URL.createObjectURL(file);
  state.ui.community.draftImageName = file.name;

  if (state.ui.sheet.type === "createPost") {
    renderSheet();
  }
}

function clearPostImageDraft() {
  ensureCommunityComposerState();
  state.ui.community.draftImagePreview = "";
  state.ui.community.draftImageName = "";
  if (state.ui.sheet.type === "createPost") {
    renderSheet();
  }
}

function resetCreatePostDraft() {
  ensureCommunityComposerState();
  state.ui.community.draftImagePreview = "";
  state.ui.community.draftImageName = "";
}

function handleCreatePost(form) {
  if (requireAuth("create post")) {
    return;
  }

  ensureCommunityComposerState();
  const data = new FormData(form);
  const headline = String(data.get("headline") || "").trim();
  const caption = String(data.get("caption") || "").trim();
  const location = String(data.get("location") || "").trim();
  const tag = String(data.get("tag") || "").trim();
  const visitNote = String(data.get("visitNote") || "").trim();
  const policyTip = String(data.get("policyTip") || "").trim();

  if (!headline || !caption || !location || !tag) {
    showToast("Add a headline, caption, location, and topic.", "error");
    return;
  }

  state.community.customPosts.unshift({
    id: `custom-post-${Date.now()}`,
    user: getOwnerName(),
    petName: state.pet.name || "Buddy",
    location,
    headline,
    caption,
    excerpt: truncateCommunityText(caption, 110),
    tags: [tag],
    likes: 0,
    comments: 0,
    verifiedVisit: false,
    image: state.ui.community.draftImagePreview || ASSETS.communityTwo,
    imageSourceType: state.ui.community.draftImagePreview ? "upload" : "asset",
    topic: tag,
    visitNote,
    policyTip,
    bestTime: visitNote,
    commentsPreview: []
  });

  saveState("community");
  resetCreatePostDraft();
  closeSheet();
  renderCommunity();
  showToast("Post created in local demo state.", "success");
}

function handleClick(event) {
  const actionNode = event.target.closest("[data-action]");
  const navNode = event.target.closest("[data-view-target]");

  if (navNode) {
    closeAiOverlay(true);
    switchView(navNode.dataset.viewTarget);
    return;
  }

  if (!actionNode) {
    return;
  }

  const action = actionNode.dataset.action;

  switch (action) {
    case "jump-view":
      closeAiOverlay(true);
      switchView(actionNode.dataset.view);
      break;
    case "open-ai-overlay":
      openAiOverlay();
      break;
    case "close-ai-overlay":
      closeAiOverlay();
      break;
    case "use-ai-starter":
      if (requireAuth("ai chat")) {
        return;
      }
      sendAiPrompt(actionNode.dataset.prompt || "");
      break;
    case "open-auth":
      openAuthOverlay(actionNode.dataset.mode || "login", actionNode.dataset.reason || "");
      break;
    case "close-auth-overlay":
      closeAuthOverlay();
      break;
    case "close-sheet":
      closeSheet();
      break;
    case "auth-segment":
      state.ui.authMode = actionNode.dataset.mode || "login";
      renderAuthOverlay();
      break;
    case "toggle-password":
      togglePasswordField(actionNode);
      break;
    case "generate-plan":
      if (requireAuth("ai planner")) {
        return;
      }
      generateSafePlan(state.ui.plannerInputs);
      break;
    case "set-home-region":
      state.ui.discover.region = actionNode.dataset.region;
      state.uiPrefs.mapRegion = state.ui.discover.region;
      state.ui.discover.focusedPlaceId = getFirstPlaceIdForRegion(state.ui.discover.region);
      state.ui.plannerInputs.city = REGION_DEFAULT_CITY[state.ui.discover.region];
      saveState("uiPrefs");
      renderHome();
      renderDiscover();
      renderAI();
      break;
    case "set-planner-input":
      state.ui.plannerInputs[actionNode.dataset.field] = actionNode.dataset.value;
      saveState("planner");
      renderAI();
      break;
    case "set-discover-region":
      state.ui.discover.region = actionNode.dataset.region;
      state.uiPrefs.mapRegion = state.ui.discover.region;
      state.ui.discover.focusedPlaceId = getFirstFilteredPlaceId();
      saveState("uiPrefs");
      renderDiscover();
      break;
    case "set-discover-category":
      state.ui.discover.category = actionNode.dataset.category;
      state.ui.discover.focusedPlaceId = getFirstFilteredPlaceId();
      renderDiscover();
      break;
    case "set-map-style":
      state.ui.discover.mapStyle = actionNode.dataset.style;
      renderDiscover();
      break;
    case "focus-map-place":
      state.ui.discover.focusedPlaceId = actionNode.dataset.placeId;
      renderDiscover();
      break;
    case "map-preview-zoom":
      showToast("Static map preview only. In Kodular this maps to built-in zoom controls.", "info");
      break;
    case "open-place":
      openSheet("placeDetail", { placeId: actionNode.dataset.placeId });
      break;
    case "toggle-save-place":
      if (requireAuth("save place")) {
        return;
      }
      toggleSavedPlace(actionNode.dataset.placeId);
      break;
    case "set-community-topic":
      ensureCommunityComposerState();
      state.ui.community.topic = actionNode.dataset.topic;
      renderCommunity();
      break;
    case "open-post":
      openSheet("postDetail", { postId: actionNode.dataset.postId });
      break;
    case "toggle-like-post":
      if (requireAuth("like post")) {
        return;
      }
      toggleLikedPost(actionNode.dataset.postId);
      break;
    case "toggle-save-post":
      if (requireAuth("save post")) {
        return;
      }
      toggleSavedPost(actionNode.dataset.postId);
      break;
    case "open-create-post":
      if (requireAuth("create post")) {
        return;
      }
      resetCreatePostDraft();
      openSheet("createPost", {});
      break;
    case "clear-post-image":
      clearPostImageDraft();
      break;
    case "cycle-illustration":
      state.ui.community.draftIllustration = (state.ui.community.draftIllustration + 1) % CREATE_POST_ILLUSTRATIONS.length;
      renderSheet();
      break;
    case "set-shop-category":
      state.ui.shop.category = actionNode.dataset.category;
      renderShop();
      break;
    case "open-product":
      openSheet("productDetail", { productId: actionNode.dataset.productId, qty: 1 });
      break;
    case "product-qty":
      if (state.ui.sheet.type === "productDetail" && state.ui.sheet.payload) {
        const nextQty = clamp(Number(state.ui.sheet.payload.qty || 1) + Number(actionNode.dataset.direction || 0), 1, 9);
        state.ui.sheet.payload.qty = nextQty;
        renderSheet();
      }
      break;
    case "add-to-cart":
      addToCart(actionNode.dataset.productId, Number(actionNode.dataset.qty || (state.ui.sheet.payload && state.ui.sheet.payload.qty) || 1));
      break;
    case "open-cart":
      openSheet("cart", {});
      break;
    case "cart-qty":
      changeCartQty(actionNode.dataset.productId, Number(actionNode.dataset.direction || 0));
      break;
    case "remove-cart-item":
      removeCartItem(actionNode.dataset.productId);
      break;
    case "checkout-cart":
      if (requireAuth("checkout")) {
        return;
      }
      if (!state.shop.cart.length) {
        showToast("Your member cart is empty.", "error");
        return;
      }
      state.shop.cart = [];
      saveState("shop");
      openSheet("orderSuccess", {});
      updateCartBadge();
      renderShop();
      break;
    case "open-health-log":
      state.ui.healthLogType = actionNode.dataset.type || "Walk";
      if (requireAuth("health log")) {
        return;
      }
      openSheet("healthLog", {});
      break;
    case "set-health-log-type":
      state.ui.healthLogType = actionNode.dataset.type || "Walk";
      renderSheet();
      break;
    case "open-edit-profile":
      if (requireAuth("edit profile")) {
        return;
      }
      openSheet("editProfile", {});
      break;
    case "toggle-setting":
      if (requireAuth("change settings")) {
        return;
      }
      state.user.preferences[actionNode.dataset.setting] = !state.user.preferences[actionNode.dataset.setting];
      saveState("user");
      renderMyProfile();
      break;
    case "logout":
      handleLogout();
      break;
    case "mock-message":
      showToast(actionNode.dataset.message || "Demo action", "info");
      break;
    default:
      break;
  }
}

function getAuthRoot() {
  if (dom.authOverlay && state.ui.authOverlay && state.ui.authOverlay.open) {
    return dom.authOverlayBody;
  }
  return dom.sheetBody;
}

function setAuthMessage(message) {
  const root = getAuthRoot();
  if (!root) {
    return;
  }
  const node = root.querySelector("[data-auth-message]");
  if (node) {
    node.textContent = message;
  }
}

function openAuthOverlay(mode, reason) {
  state.ui.authMode = mode || state.ui.authMode || "login";
  state.ui.authOverlay = {
    open: true,
    reason: reason || ""
  };

  if (state.ui.sheet.type === "auth") {
    state.ui.sheet = { type: "", payload: null };
  }

  renderAuthOverlay();
  window.setTimeout(() => {
    const input = dom.authOverlayBody ? dom.authOverlayBody.querySelector('input[name="email"]') : null;
    if (input) {
      input.focus();
    }
  }, 40);
}

function closeAuthOverlay() {
  state.ui.authOverlay = {
    open: false,
    reason: ""
  };
  renderAuthOverlay();
}

function renderAuthOverlay() {
  if (!dom.authOverlay || !dom.authOverlayBody) {
    return;
  }

  const isOpen = Boolean(state.ui.authOverlay && state.ui.authOverlay.open);
  dom.authOverlay.classList.toggle("hidden", !isOpen);
  dom.authOverlay.setAttribute("aria-hidden", String(!isOpen));
  dom.authOverlayBody.innerHTML = isOpen ? renderAuthPage() : "";
}

function renderAuthPage() {
  const isRegister = state.ui.authMode === "register";
  const city = REGION_DEFAULT_CITY[state.ui.discover.region];

  return `
    <div class="auth-page">
      <header class="auth-page-header">
        <button class="icon-button" type="button" data-action="close-auth-overlay" aria-label="Close account access">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 18 9 12l6-6"></path>
          </svg>
        </button>
        <div class="auth-page-header-copy">
          <p>Account access</p>
          <h2 id="authOverlayTitle">${isRegister ? "Create your PawPlanet account" : "Login to PawPlanet"}</h2>
        </div>
      </header>
      <div class="auth-page-scroll">
        <section class="card auth-page-hero">
          <img class="auth-page-hero-image" src="${isRegister ? ASSETS.heroDog : ASSETS.heroCat}" alt="${isRegister ? "PawPlanet member setup preview" : "PawPlanet login preview"}">
          <div class="preview-copy">
            <p class="eyebrow">${isRegister ? "Member setup" : "Welcome back"}</p>
            <strong>${isRegister ? "Save trusted places, use Paw AI, and start care logs" : "Continue your pet-friendly planning with your saved profile"}</strong>
            <span>${escapeHtml(getAuthPromptMessage())}</span>
          </div>
        </section>
        <section class="card auth-page-card">
          <div class="segmented-control">
            <button class="segment-button ${isRegister ? "" : "active"}" type="button" data-action="auth-segment" data-mode="login">Login</button>
            <button class="segment-button ${isRegister ? "active" : ""}" type="button" data-action="auth-segment" data-mode="register">Register</button>
          </div>
          <p class="auth-message" data-auth-message>${escapeHtml(getAuthPromptMessage())}</p>
          <form class="sheet-form auth-page-form" data-form="auth" novalidate>
            <label class="sheet-field">
              <span>Email</span>
              <input type="email" name="email" autocomplete="email" value="${escapeHtml(state.user.email || "")}" placeholder="hello@pawplanet.app">
              <small class="field-error" data-error-for="email"></small>
            </label>
            <label class="sheet-field">
              <span>Password</span>
              <div class="input-shell">
                <input type="password" name="password" autocomplete="${isRegister ? "new-password" : "current-password"}" value="${escapeHtml(isRegister ? "" : state.user.password || "")}" placeholder="At least 6 characters">
                <button class="password-toggle" type="button" data-action="toggle-password" aria-label="Show password">${renderEyeIcon(false)}</button>
              </div>
              <small class="field-error" data-error-for="password"></small>
            </label>
            ${isRegister ? `
              <label class="sheet-field">
                <span>Confirm password</span>
                <div class="input-shell">
                  <input type="password" name="confirmPassword" autocomplete="new-password" placeholder="Repeat your password">
                  <button class="password-toggle" type="button" data-action="toggle-password" aria-label="Show password">${renderEyeIcon(false)}</button>
                </div>
                <small class="field-error" data-error-for="confirmPassword"></small>
              </label>
              <label class="sheet-field">
                <span>Pet name</span>
                <input type="text" name="petName" value="${escapeHtml(state.pet.name || "")}" placeholder="Mochi">
                <small class="field-error" data-error-for="petName"></small>
              </label>
              <div class="sheet-inline">
                <label class="sheet-field">
                  <span>Pet type</span>
                  <select name="petType">
                    ${["Dog", "Cat"].map((type) => `<option value="${escapeHtml(type)}" ${state.pet.type === type ? "selected" : ""}>${escapeHtml(type)}</option>`).join("")}
                  </select>
                  <small class="field-error" data-error-for="petType"></small>
                </label>
                <label class="sheet-field">
                  <span>Size</span>
                  <select name="size">
                    ${["Small", "Medium", "Large"].map((size) => `<option value="${escapeHtml(size)}" ${state.pet.size === size ? "selected" : ""}>${escapeHtml(size)}</option>`).join("")}
                  </select>
                  <small class="field-error" data-error-for="size"></small>
                </label>
              </div>
              <label class="sheet-field">
                <span>Breed (optional)</span>
                <input type="text" name="breed" value="${escapeHtml(state.pet.breed || "")}" placeholder="Mini poodle / British shorthair">
                <small class="field-error" data-error-for="breed"></small>
              </label>
              <p class="helper-text">Your city will start as ${escapeHtml(city)} and can be edited later in My Profile.</p>
            ` : ""}
            <button class="primary-button" type="submit">${isRegister ? "Create Account" : "Login"}</button>
          </form>
        </section>
      </div>
    </div>
  `;
}

function renderDiscoverPageMarkup() {
  const filteredPlaces = getFilteredPlaces();
  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Trust-first discovery</p>
          <h2>Discover</h2>
          <span class="screen-header-note">Clear policy notes and trusted reviews before you go.</span>
        </div>
        ${renderHeaderAction("discover")}
      </header>

      <div class="search-shell">
        <span class="search-icon" aria-hidden="true">${renderSearchIcon()}</span>
        <input id="discoverSearchCompact" data-role="discover-search" type="search" value="${escapeHtml(state.ui.discover.search)}" placeholder="Search place, city, or policy">
      </div>

      <div class="pill-row">
        ${Object.entries(REGION_LABELS).map(([value, label]) => `
          <button class="chip ${state.ui.discover.region === value ? "active" : ""}" type="button" data-action="set-discover-region" data-region="${escapeHtml(value)}">${escapeHtml(label)}</button>
        `).join("")}
      </div>

      <div class="pill-row">
        ${DISCOVER_CATEGORIES.map((label) => `
          <button class="chip ${state.ui.discover.category === label ? "active" : ""}" type="button" data-action="set-discover-category" data-category="${escapeHtml(label)}">${escapeHtml(label)}</button>
        `).join("")}
      </div>

      ${renderDiscoverMapModule({ compact: false })}

      <section class="place-list">
        ${filteredPlaces.map((place) => `
          <article class="place-card card">
            <button class="card-button" type="button" data-action="open-place" data-place-id="${escapeHtml(place.id)}">
              <img class="place-image" src="${place.image}" alt="${escapeHtml(place.name)}">
            </button>
            <div class="place-card-header">
              <div>
                <p class="eyebrow">${escapeHtml(place.category)}</p>
                <h3 class="place-title">${escapeHtml(place.name)}</h3>
                <p class="place-meta">${escapeHtml(place.distance)} | ${escapeHtml(place.badges[0])}</p>
              </div>
              <button class="ghost-button" type="button" data-action="toggle-save-place" data-place-id="${escapeHtml(place.id)}">${isGuestMode() ? "Sign in" : (isSavedPlace(place.id) ? "Saved" : "Save")}</button>
            </div>
          </article>
        `).join("") || `
          <div class="empty-state">
            <strong>No places match this filter</strong>
            <span>Try another city or category to bring trusted pet-friendly spots back into view.</span>
          </div>
        `}
      </section>
    </div>
  `;
}

function renderCommunityCompactMarkup() {
  const feed = getCommunityFeed();
  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Pet lifestyle community</p>
          <h2>Community</h2>
          <span class="screen-header-note">Practical pet notes without the social clutter.</span>
        </div>
        ${renderHeaderAction("community")}
      </header>

      <div class="topic-row">
        ${TOPIC_OPTIONS.map((topic) => `
          <button class="chip ${state.ui.community.topic === topic ? "active" : ""}" type="button" data-action="set-community-topic" data-topic="${escapeHtml(topic)}">${escapeHtml(topic)}</button>
        `).join("")}
      </div>

      <section class="story-row">
        ${storyHighlights.map((story) => `
          <button class="story-bubble" type="button" data-action="set-community-topic" data-topic="${escapeHtml(story.topic)}">
            <div class="story-avatar">${renderStoryIcon(story.icon)}</div>
            <strong>${escapeHtml(story.title)}</strong>
            <span>${escapeHtml(story.subtitle)}</span>
          </button>
        `).join("")}
      </section>

      <section class="feed-list">
        ${feed.map((post) => `
          <article class="feed-card card">
            <button class="card-button" type="button" data-action="open-post" data-post-id="${escapeHtml(post.id)}">
              <img class="feed-image" src="${post.image}" alt="${escapeHtml(post.location)}">
            </button>
            <div class="feed-card-header">
              <div>
                <p class="eyebrow">${escapeHtml(post.location)}</p>
                <h3 class="feed-title">${escapeHtml(post.user)} with ${escapeHtml(post.petName)}</h3>
                <p class="feed-location">${escapeHtml(post.tags[0] || "Lifestyle note")}</p>
              </div>
              ${post.verifiedVisit ? '<span class="badge">Verified</span>' : '<span class="badge subtle">Note</span>'}
            </div>
            <div class="feed-actions">
              <button class="ghost-button" type="button" data-action="toggle-like-post" data-post-id="${escapeHtml(post.id)}">${isGuestMode() ? "Like" : (state.community.likedPostIds.includes(post.id) ? "Liked" : "Like")}</button>
              <button class="ghost-button" type="button" data-action="open-post" data-post-id="${escapeHtml(post.id)}">${getCommentCount(post)} comments</button>
              <button class="ghost-button" type="button" data-action="toggle-save-post" data-post-id="${escapeHtml(post.id)}">${state.saved.postIds.includes(post.id) ? "Saved" : "Save"}</button>
            </div>
          </article>
        `).join("")}
      </section>
    </div>
  `;
}

function renderShopCompactMarkup() {
  const filteredProducts = getFilteredProducts();
  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Light pet shopping</p>
          <h2>Shop</h2>
          <span class="screen-header-note">Cute but practical travel and care picks.</span>
        </div>
        ${renderHeaderAction("shop")}
      </header>

      <div class="pill-row">
        ${SHOP_CATEGORIES.map((category) => `
          <button class="chip ${state.ui.shop.category === category ? "active" : ""}" type="button" data-action="set-shop-category" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>
        `).join("")}
      </div>

      <section class="feature-banner card compact-banner">
        <div class="banner-copy">
          <p class="eyebrow">Travel essentials</p>
          <h3 class="card-title">Light, useful pet travel picks</h3>
          <p class="card-copy">For stroller stops, rainy walks, and short stays.</p>
        </div>
        <img class="banner-image" src="${ASSETS.shopRaincoat}" alt="Pet travel accessory preview">
      </section>

      <section class="product-grid">
        ${filteredProducts.map((product) => `
          <article class="product-card card">
            <button class="card-button" type="button" data-action="open-product" data-product-id="${escapeHtml(product.id)}">
              <img class="product-image" src="${product.image}" alt="${escapeHtml(product.name)}">
            </button>
            <div class="product-meta">
              <h3 class="product-title">${escapeHtml(product.name)}</h3>
              <p class="product-tagline">${formatPrice(product.price)}</p>
              <p class="product-tagline">${escapeHtml(product.tag)}</p>
            </div>
            <button class="primary-button small" type="button" data-action="add-to-cart" data-product-id="${escapeHtml(product.id)}">${isGuestMode() ? "Preview" : "Add"}</button>
          </article>
        `).join("")}
      </section>
    </div>
  `;
}

function renderHealthCompactMarkup() {
  return isGuestMode() ? renderGuestHealthCompact() : renderMemberHealthCompact();
}

function renderGuestHealthCompact() {
  const hint = state.health.reminders[0];
  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Care companion preview</p>
          <h2>Health</h2>
          <span class="screen-header-note">A calm care space for daily logs and reminders.</span>
        </div>
        ${renderHeaderAction("health")}
      </header>

      <section class="card">
        <p class="eyebrow">Preview mode</p>
        <h3 class="card-title">Daily care in one calm screen</h3>
        <p class="card-copy">${getWeightLabel()} | ${escapeHtml(hint ? hint.detail : "Sign in to start logging")}</p>
      </section>

      <section class="card chart-card">
        <p class="eyebrow">Sample chart</p>
        <h3 class="card-title">Recent weight trend</h3>
        ${renderWeightChart()}
      </section>

      <section class="quick-actions">
        ${HEALTH_LOG_TYPES.map((type) => `
          <button class="quick-action lock" type="button" data-action="open-health-log" data-type="${escapeHtml(type)}">
            <strong>${escapeHtml(type)}</strong>
            <span>Sign in to add</span>
          </button>
        `).join("")}
      </section>
    </div>
  `;
}

function renderMemberHealthCompact() {
  const logs = getSortedHealthLogs();
  const latest = logs[0];
  const hint = state.health.reminders[0];
  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Pet care companion</p>
          <h2>Health</h2>
          <span class="screen-header-note">Daily care, reminders, and light trend tracking.</span>
        </div>
        ${renderHeaderAction("health")}
      </header>

      <section class="card summary-card">
        <p class="eyebrow">Today care</p>
        <h3 class="card-title">${escapeHtml(hint ? hint.title : "Care status")}</h3>
        <p class="card-copy">${getWeightLabel()} | ${escapeHtml(hint ? hint.detail : state.pet.mood || "Relaxed")}</p>
      </section>

      <section class="card chart-card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Weight chart</p>
            <h3 class="card-title">Recent entries</h3>
          </div>
          <button class="secondary-button" type="button" data-action="open-health-log" data-type="Weight">Add log</button>
        </div>
        ${renderWeightChart()}
      </section>

      <section class="card">
        <p class="eyebrow">Latest log</p>
        <h3 class="card-title">${escapeHtml(latest ? latest.label || latest.type : "No logs yet")}</h3>
        <p class="card-copy">${escapeHtml(latest ? String(latest.value) : "Add a walk, meal, weight, or mood entry")}</p>
      </section>
    </div>
  `;
}

function renderMyProfileTabMarkup() {
  if (isGuestMode()) {
    return `
      <div class="screen profile-screen">
        <header class="screen-header">
          <div class="screen-header-copy">
            <p>Account entry</p>
            <h2>My Profile</h2>
            <span class="screen-header-note">Unlock saves, AI chat, and care logs when you sign in.</span>
          </div>
        </header>

        <section class="card profile-hero refined-profile-hero">
          <img class="profile-hero-image" src="${ASSETS.heroCat}" alt="Guest preview pet lifestyle">
          <div class="profile-preview-copy">
            <p class="eyebrow">Guest mode</p>
            <h3 class="card-title">Browse first, sign in when ready</h3>
            <p class="card-copy">Keep trusted places, ask Paw AI, and start care logging after login.</p>
          </div>
          <div class="profile-cta-grid">
            <button class="primary-button" type="button" data-action="open-auth" data-mode="login" data-reason="profile">Login</button>
            <button class="secondary-button" type="button" data-action="open-auth" data-mode="register" data-reason="profile">Create Account</button>
          </div>
        </section>

        <section class="preview-grid">
          ${getFeatureAccessMap().slice(0, 3).map((item) => `
            <article class="preview-card static">
              <div class="preview-copy">
                <p class="eyebrow">${item.memberOnly ? "Members only" : "Guest access"}</p>
                <strong>${escapeHtml(item.title)}</strong>
                <span>${escapeHtml(item.copy)}</span>
              </div>
            </article>
          `).join("")}
        </section>
      </div>
    `;
  }

  const savedPlaces = state.saved.placeIds.map(getPlaceById).filter(Boolean);
  const savedPosts = state.saved.postIds.map(getPostById).filter(Boolean);
  const preferences = state.user.preferences || {};

  return `
    <div class="screen profile-screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Account and pet details</p>
          <h2>My Profile</h2>
          <span class="screen-header-note">Your pet identity, saved content, and preferences.</span>
        </div>
      </header>

      <section class="card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Owner card</p>
            <h3 class="card-title">${escapeHtml(getOwnerName())}</h3>
            <p class="card-copy">${escapeHtml(state.user.email)} | ${getPawPoints()} PawPoints</p>
          </div>
          <button class="secondary-button" type="button" data-action="open-edit-profile">Edit</button>
        </div>
      </section>

      <section class="card">
        <div class="profile-preview-row">
          <img class="profile-pet-avatar" src="${state.pet.avatarImage || ASSETS.profilePet}" alt="${escapeHtml(state.pet.name || "Pet avatar")}">
          <div>
            <p class="eyebrow">Pet card</p>
            <h3 class="card-title">${escapeHtml(state.pet.name || "Your pet")}</h3>
            <p class="card-copy">${escapeHtml(state.pet.breed || "Pet breed")} | ${escapeHtml(state.pet.size || "Medium")}</p>
            <p class="card-copy">${escapeHtml(state.pet.city)} | ${escapeHtml(state.pet.heatSensitivity)}</p>
          </div>
        </div>
      </section>

      <section class="card">
        <p class="eyebrow">Saved places</p>
        <h3 class="card-title">${savedPlaces.length ? savedPlaces[0].name : "No saved places yet"}</h3>
        <p class="card-copy">${savedPlaces.length ? `${savedPlaces.length} saved | ${savedPlaces[0].badges[0]}` : "Browse Discover and save trusted places."}</p>
      </section>

      <section class="card">
        <p class="eyebrow">Saved posts</p>
        <h3 class="card-title">${savedPosts.length ? savedPosts[0].user : "No saved posts yet"}</h3>
        <p class="card-copy">${savedPosts.length ? `${savedPosts[0].location} | ${savedPosts[0].tags[0]}` : "Save useful community notes to revisit later."}</p>
      </section>

      <section class="card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Preferences</p>
            <h3 class="card-title">Settings</h3>
          </div>
        </div>
        <button class="settings-row" type="button" data-action="toggle-setting" data-setting="notifications">
          <span>Notifications</span>
          <span class="toggle-switch ${preferences.notifications ? "active" : ""}"></span>
        </button>
        <button class="settings-row" type="button" data-action="toggle-setting" data-setting="locationSharing">
          <span>Location</span>
          <span class="toggle-switch ${preferences.locationSharing ? "active" : ""}"></span>
        </button>
        <button class="settings-row" type="button" data-action="toggle-setting" data-setting="reminders">
          <span>Reminders</span>
          <span class="toggle-switch ${preferences.reminders ? "active" : ""}"></span>
        </button>
      </section>

      <button class="secondary-button danger-button" type="button" data-action="logout">Logout</button>
    </div>
  `;
}

function getAiStarterPrompts() {
  return state.planner.starterPrompts && state.planner.starterPrompts.length
    ? state.planner.starterPrompts
    : clone(DEFAULT_STATE.planner.starterPrompts);
}

function openAiOverlay() {
  state.ui.aiOverlay.lastScrollTop = dom.appScrollRegion ? dom.appScrollRegion.scrollTop : 0;
  state.ui.aiOverlay.open = true;
  renderAI();
  window.setTimeout(() => {
    const input = document.getElementById("aiOverlayInput");
    if (input && !isGuestMode()) {
      input.focus();
    }
  }, 40);
}

function closeAiOverlay(silent) {
  if (!state.ui.aiOverlay.open && silent) {
    return;
  }
  state.ui.aiOverlay.open = false;
  renderAI();
  if (!silent && dom.appScrollRegion) {
    dom.appScrollRegion.scrollTo({ top: state.ui.aiOverlay.lastScrollTop || 0, behavior: "smooth" });
  }
}

function renderAiOverlayBody() {
  return `
    <section class="card ai-starter-card">
      <p class="eyebrow">Starter prompts</p>
      <div class="pill-row">
        ${getAiStarterPrompts().map((prompt) => `
          <button class="chip" type="button" data-action="use-ai-starter" data-prompt="${escapeHtml(prompt)}">${escapeHtml(prompt)}</button>
        `).join("")}
      </div>
    </section>
    <section class="ai-thread">
      ${renderAiMessages(getAiMessages())}
    </section>
  `;
}

function renderAiOverlayComposer() {
  if (isGuestMode()) {
    return `
      <div class="ai-overlay-lock">
        <input type="text" value="" placeholder="Sign in to ask Paw AI" disabled>
        <button class="primary-button" type="button" data-action="open-auth" data-mode="login" data-reason="ai chat">Sign in</button>
      </div>
    `;
  }
  return `
    <div class="ai-overlay-input-row">
      <input id="aiOverlayInput" name="prompt" type="text" value="${escapeHtml(state.planner.draftPrompt || "")}" placeholder="Ask about cafes, routes, weather, or pet policies">
      <button class="primary-button" type="submit">Send</button>
    </div>
  `;
}

function renderAiMessages(messages) {
  return messages.map((message) => renderAiMessageBubble(message)).join("");
}

function renderAiMessageBubble(message) {
  return `
    <article class="ai-message ${escapeHtml(message.role)}">
      <div class="ai-message-bubble">
        <strong>${escapeHtml(message.role === "assistant" ? "PawPlanet AI" : "You")}</strong>
        <p>${escapeHtml(message.text)}</p>
        ${message.cards && message.cards.length ? renderAiSuggestionCards(message.cards) : ""}
      </div>
    </article>
  `;
}

function renderAiSuggestionCards(cards) {
  return `
    <div class="ai-suggestion-grid">
      ${cards.map((card) => `
        <div class="ai-suggestion-card">
          <span class="ai-kind-badge">${escapeHtml(card.kind)}</span>
          <strong>${escapeHtml(card.title)}</strong>
          <span>${escapeHtml(card.metaA)}</span>
          <span>${escapeHtml(card.metaB)}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function seedAiConversationIfEmpty() {
  if (state.planner.messages && state.planner.messages.length) {
    return;
  }
  state.planner.messages = buildAiMessagesFromResult(getAiPreviewResult(), state.planner.selectedScenario || "Weekend walk");
}

function createPlannerResult(inputs) {
  const city = normalizePlannerCity(inputs.city);
  const template = (plannerTemplates[city] && plannerTemplates[city][inputs.destinationType]) || null;
  const region = normalizeRegion(city);
  const regionPlaces = getPlacesByRegion(region);
  const fallbackStops = regionPlaces.slice(0, 3).map((place, index) => ({
    time: `${9 + index}:0${index}`,
    title: place.name,
    note: place.badges.slice(0, 2).join(", ")
  }));
  const result = template ? clone(template) : {
    headline: `Plan a calm ${inputs.destinationType.toLowerCase()} route in ${city}`,
    route: "Start early, keep water ready, and favor places with verified policy notes and nearby support.",
    stops: fallbackStops,
    caution: inputs.heatSensitivity === "High" ? "Keep stops short and prioritize indoor cooling or shaded outdoor breaks." : "Check pavement temperature and reduce midday exposure.",
    policy: "Bring a leash or stroller based on the listed venue rule.",
    vet: (regionPlaces[0] && regionPlaces[0].nearbyVet) || "Nearby companion vet"
  };
  result.safetyTips = [
    `${inputs.petSize} pet profile selected for route timing.`,
    `${inputs.heatSensitivity} heat sensitivity applied to walking pace and stop length.`,
    "Pack water, wipes, and a carrier or stroller when rules require it."
  ];
  if (inputs.heatSensitivity === "High") {
    result.caution += " Heat-sensitive mode added extra cooling emphasis.";
  }
  if (inputs.destinationType === "Mall") {
    result.policy = "Stroller likely required in shared corridors. Confirm indoor access before arrival.";
  }
  return result;
}

function buildAiMessagesFromResult(result, scenario) {
  return [
    {
      role: "assistant",
      text: `${scenario}: ${result.headline}. ${result.route}`,
      timestamp: new Date().toISOString(),
      type: "recommendation",
      cards: [
        { kind: "Place", title: result.stops[0].title, metaA: result.stops[0].time, metaB: result.stops[0].note },
        { kind: "Tip", title: "Safety reminder", metaA: result.caution, metaB: result.policy },
        { kind: "Backup", title: result.vet, metaA: "Nearby support", metaB: "Keep this contact ready." }
      ]
    }
  ];
}

function buildAiAssistantReply(prompt) {
  const lower = String(prompt || "").toLowerCase();
  const nextInputs = clone(state.ui.plannerInputs);
  let scenario = "Weekend walk";

  if (lower.includes("cafe")) {
    nextInputs.destinationType = "Cafe";
    scenario = "Cafe stop";
  } else if (lower.includes("rain") || lower.includes("mall")) {
    nextInputs.destinationType = "Mall";
    scenario = "Rainy day backup";
  } else if (lower.includes("hotel")) {
    nextInputs.destinationType = "Hotel";
    scenario = "Hotel check-in";
  } else if (lower.includes("park") || lower.includes("walk") || lower.includes("today")) {
    nextInputs.destinationType = "Park";
    scenario = "Weekend walk";
  }

  if (lower.includes("hot") || lower.includes("heat") || lower.includes("cool")) {
    nextInputs.heatSensitivity = "High";
  }
  if (lower.includes("macau")) {
    nextInputs.city = "Macau";
  } else if (lower.includes("shenzhen")) {
    nextInputs.city = "Shenzhen";
  } else if (lower.includes("guangzhou") || lower.includes("mainland")) {
    nextInputs.city = "Guangzhou";
  } else if (lower.includes("hong kong") || lower.includes("hk")) {
    nextInputs.city = "Hong Kong";
  }

  const result = createPlannerResult(nextInputs);
  state.planner.lastInputs = clone(nextInputs);
  state.planner.lastResult = clone(result);
  state.planner.history = [clone(result)].concat(state.planner.history || []).slice(0, 4);
  state.planner.selectedScenario = scenario;
  saveState("planner");

  return {
    text: `For ${normalizePlannerCity(nextInputs.city)}, I would start with ${result.stops[0].title.toLowerCase()} and keep the route calm and policy-aware. ${getMockAiReply(prompt)}`,
    cards: [
      { kind: "Place", title: result.stops[0].title, metaA: result.stops[0].time, metaB: result.stops[0].note },
      { kind: "Tip", title: "Safety tip", metaA: result.caution, metaB: result.policy },
      { kind: "Pack", title: "What to bring", metaA: "Water, wipes, leash or stroller", metaB: result.safetyTips[2] }
    ]
  };
}

function sendAiPrompt(prompt) {
  const trimmed = String(prompt || "").trim();
  if (!trimmed) {
    showToast("Enter a question first.", "error");
    return;
  }
  if (requireAuth("ai chat")) {
    return;
  }
  const reply = buildAiAssistantReply(trimmed);
  state.planner.draftPrompt = "";
  state.planner.messages = getAiMessages().concat([
    { role: "user", text: trimmed, timestamp: new Date().toISOString(), type: "follow-up" },
    { role: "assistant", text: reply.text, timestamp: new Date().toISOString(), type: "follow-up", cards: reply.cards }
  ]).slice(-8);
  saveState("planner");
  renderAI();
  renderHome();
  showToast("PawPlanet AI replied.", "success");
}

function generateSafePlan(inputs) {
  const result = createPlannerResult(inputs);
  state.planner.lastInputs = clone(inputs);
  state.planner.lastResult = clone(result);
  state.planner.history = [clone(result)].concat(state.planner.history || []).slice(0, 4);
  state.planner.selectedScenario = state.ui.ai.scenario || "Weekend walk";
  state.planner.messages = buildAiMessagesFromResult(result, state.planner.selectedScenario);
  saveState("planner");
  renderHome();
  renderAI();
  return result;
}

function handleAiPromptSubmit(form) {
  const data = new FormData(form);
  const prompt = String(data.get("prompt") || "").trim();
  sendAiPrompt(prompt);
  if (!isGuestMode()) {
    form.reset();
  }
}

function handleProfileSave(form) {
  if (requireAuth("edit profile")) {
    return;
  }
  const data = new FormData(form);
  state.user.ownerName = String(data.get("ownerName") || "").trim() || state.user.ownerName;
  state.pet.name = String(data.get("petName") || "").trim();
  state.pet.type = String(data.get("petType") || "").trim();
  state.pet.size = String(data.get("size") || "").trim();
  state.pet.breed = String(data.get("breed") || "").trim();
  state.pet.age = String(data.get("age") || "").trim();
  state.pet.city = String(data.get("city") || "").trim();
  state.pet.heatSensitivity = String(data.get("heatSensitivity") || "").trim();
  saveState("user");
  saveState("pet");
  closeSheet();
  renderHome();
  renderMyProfile();
  renderAI();
  showToast("Profile updated.", "success");
}

function handleLogout() {
  state.session.authenticated = false;
  state.session.mode = "guest";
  state.ui.currentView = "home";
  state.session.currentMainView = "home";
  state.ui.aiOverlay.open = false;
  closeSheet();
  saveState("session");
  renderApp();
  showToast("Logged out. You are now browsing as a guest.", "info");
}

function sanitizeDisplayArtifacts(root) {
  if (!root || !root.innerHTML) {
    return;
  }
  root.innerHTML = root.innerHTML
    .replace(/鈥\?/g, " - ")
    .replace(/鈥/g, " - ")
    .replace(/閳\?/g, " - ")
    .replace(/閳\?/g, " - ")
    .replace(/&nbsp;/g, " ");
}

function renderAIPageMarkup() {
  return isGuestMode() ? renderGuestAI() : renderMemberAI();
}

function renderGuestAI() {
  const preview = state.planner.lastResult || getAiPreviewResult();
  return `
    <div class="screen ai-screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Safe planning for city pet outings</p>
          <h2>PawPlanet AI</h2>
        </div>
        ${renderAvatarButton()}
      </header>

      <div class="pill-row">
        ${getAiScenarioOptions().map((scenario) => `
          <button class="chip ${state.ui.ai.scenario === scenario ? "active" : ""}" type="button" data-action="set-ai-scenario" data-scenario="${escapeHtml(scenario)}">${escapeHtml(scenario)}</button>
        `).join("")}
      </div>

      <section class="card ai-panel-card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">AI preview</p>
            <h3 class="card-title">Structured planning with future chat</h3>
            <p class="card-copy">${escapeHtml(state.ui.ai.scenario)} | ${escapeHtml(state.ui.plannerInputs.city)}</p>
          </div>
          <span class="badge lock-badge">Members only</span>
        </div>
        <div class="planner-grid planner-grid-tight">
          <div class="planner-chip-block">
            <strong>City</strong>
            <div class="pill-row">${renderPlannerChips("city", ["Hong Kong", "Macau", "Shenzhen", "Guangzhou"], state.ui.plannerInputs.city)}</div>
          </div>
          <div class="planner-chip-block">
            <strong>Pet</strong>
            <div class="pill-row">${renderPlannerChips("petSize", ["Small", "Medium", "Large"], state.ui.plannerInputs.petSize)}</div>
          </div>
          <div class="planner-chip-block">
            <strong>Heat</strong>
            <div class="pill-row">${renderPlannerChips("heatSensitivity", ["Low", "Medium", "High"], state.ui.plannerInputs.heatSensitivity)}</div>
          </div>
          <div class="planner-chip-block">
            <strong>Destination</strong>
            <div class="pill-row">${renderPlannerChips("destinationType", PLANNER_DESTINATIONS, state.ui.plannerInputs.destinationType)}</div>
          </div>
        </div>
        <button class="primary-button" type="button" data-action="open-auth" data-mode="login" data-reason="ai planner">Sign in to Generate</button>
      </section>

      ${renderAiResultCard(preview)}
      ${renderAiStopCards(preview)}
      ${renderAiThread(getAiMessages())}

      <section class="card ai-composer-card locked">
        <p class="eyebrow">Future LLM entry</p>
        <h3 class="card-title">Ask a follow-up question</h3>
        <p class="card-copy">Guests can preview the AI screen. Sign in to simulate the chat layer.</p>
        <button class="secondary-button" type="button" data-action="open-auth" data-mode="login" data-reason="ai chat">Sign in to continue</button>
      </section>
    </div>
  `;
}

function renderMemberAI() {
  const result = state.planner.lastResult || getAiPreviewResult();
  return `
    <div class="screen ai-screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Safe planning for city pet outings</p>
          <h2>PawPlanet AI</h2>
        </div>
        ${renderAvatarButton()}
      </header>

      <div class="pill-row">
        ${getAiScenarioOptions().map((scenario) => `
          <button class="chip ${state.ui.ai.scenario === scenario ? "active" : ""}" type="button" data-action="set-ai-scenario" data-scenario="${escapeHtml(scenario)}">${escapeHtml(scenario)}</button>
        `).join("")}
      </div>

      <section class="card ai-panel-card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Planner input</p>
            <h3 class="card-title">${escapeHtml(state.ui.ai.scenario)}</h3>
            <p class="card-copy">${escapeHtml(state.ui.plannerInputs.city)} | ${escapeHtml(state.ui.plannerInputs.petSize)} | ${escapeHtml(state.ui.plannerInputs.heatSensitivity)}</p>
          </div>
          <button class="primary-button small" type="button" data-action="generate-plan">Generate</button>
        </div>
        <div class="planner-grid planner-grid-tight">
          <div class="planner-chip-block">
            <strong>City</strong>
            <div class="pill-row">${renderPlannerChips("city", ["Hong Kong", "Macau", "Shenzhen", "Guangzhou"], state.ui.plannerInputs.city)}</div>
          </div>
          <div class="planner-chip-block">
            <strong>Pet</strong>
            <div class="pill-row">${renderPlannerChips("petSize", ["Small", "Medium", "Large"], state.ui.plannerInputs.petSize)}</div>
          </div>
          <div class="planner-chip-block">
            <strong>Heat</strong>
            <div class="pill-row">${renderPlannerChips("heatSensitivity", ["Low", "Medium", "High"], state.ui.plannerInputs.heatSensitivity)}</div>
          </div>
          <div class="planner-chip-block">
            <strong>Destination</strong>
            <div class="pill-row">${renderPlannerChips("destinationType", PLANNER_DESTINATIONS, state.ui.plannerInputs.destinationType)}</div>
          </div>
        </div>
      </section>

      ${renderAiResultCard(result)}
      ${renderAiStopCards(result)}
      ${renderAiThread(getAiMessages())}

      <form class="card ai-composer-card" data-form="ai-prompt">
        <p class="eyebrow">Ask AI</p>
        <label class="sheet-field">
          <span>Follow-up</span>
          <input type="text" name="prompt" value="${escapeHtml(state.planner.draftPrompt || "")}" placeholder="Ask about heat, stroller rules, or a backup stop">
        </label>
        <button class="primary-button" type="submit">Ask AI</button>
      </form>
    </div>
  `;
}

function renderAiResultCard(result) {
  return `
    <section class="card ai-result-card">
      <p class="eyebrow">Result summary</p>
      <h3 class="card-title">${escapeHtml(result.headline)}</h3>
      <p class="card-copy">${escapeHtml(result.route)}</p>
      <div class="summary-micro">
        <span class="mini-pill">${escapeHtml(result.stops[0].time)}</span>
        <span class="mini-pill">${escapeHtml(result.policy)}</span>
      </div>
    </section>
  `;
}

function renderAiStopCards(result) {
  return `
    <section class="ai-stop-list">
      ${result.stops.slice(0, 3).map((stop) => `
        <article class="card ai-stop-card">
          <p class="eyebrow">${escapeHtml(stop.time)}</p>
          <h3 class="card-title">${escapeHtml(stop.title)}</h3>
          <p class="card-copy">${escapeHtml(stop.note)}</p>
        </article>
      `).join("")}
    </section>
  `;
}

function renderAiThread(messages) {
  return `
    <section class="card ai-thread-card">
      <div class="summary-row">
        <div>
          <p class="eyebrow">Assistant thread</p>
          <h3 class="card-title">Light conversation layer</h3>
        </div>
      </div>
      <div class="ai-thread-list">
        ${messages.slice(-4).map((message) => `
          <article class="ai-bubble ${message.role}">
            <strong>${escapeHtml(message.role === "assistant" ? "PawPlanet AI" : "You")}</strong>
            <span>${escapeHtml(message.text)}</span>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderDiscoverMarkup() {
  const filteredPlaces = getFilteredPlaces();
  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Trust-first discovery</p>
          <h2>Discover</h2>
        </div>
        ${renderAvatarButton()}
      </header>

      <div class="search-shell">
        <span class="search-icon" aria-hidden="true">${renderSearchIcon()}</span>
        <input id="discoverSearch" data-role="discover-search" type="search" value="${escapeHtml(state.ui.discover.search)}" placeholder="Search place, city, or policy">
      </div>

      <div class="filter-row">
        ${Object.entries(REGION_LABELS).map(([value, label]) => `
          <button class="chip ${state.ui.discover.region === value ? "active" : ""}" type="button" data-action="set-discover-region" data-region="${escapeHtml(value)}">${escapeHtml(label)}</button>
        `).join("")}
      </div>

      <div class="filter-row">
        ${DISCOVER_CATEGORIES.map((label) => `
          <button class="chip ${state.ui.discover.category === label ? "active" : ""}" type="button" data-action="set-discover-category" data-category="${escapeHtml(label)}">${escapeHtml(label)}</button>
        `).join("")}
      </div>

      ${renderDiscoverMapModule({ compact: false })}

      <section class="place-list">
        ${filteredPlaces.map((place) => `
          <article class="place-card card">
            <button class="card-button" type="button" data-action="open-place" data-place-id="${escapeHtml(place.id)}">
              <img class="place-image" src="${place.image}" alt="${escapeHtml(place.name)}">
            </button>
            <div class="place-card-header">
              <div>
                <p class="eyebrow">${escapeHtml(place.city)} • ${escapeHtml(place.category)}</p>
                <h3 class="place-title">${escapeHtml(place.name)}</h3>
                <p class="place-meta">${escapeHtml(place.area)} • ${escapeHtml(place.distance)} away</p>
              </div>
              <button class="ghost-button" type="button" data-action="toggle-save-place" data-place-id="${escapeHtml(place.id)}">${isGuestMode() ? "Sign in" : (isSavedPlace(place.id) ? "Saved" : "Save")}</button>
            </div>
            <div class="review-row">
              <span class="mini-pill">⭐ ${place.rating.toFixed(1)}</span>
              <span class="mini-pill">${place.verifiedReviews} verified reviews</span>
              <span class="mini-pill">${place.openNow ? "Open now" : "Closed now"}</span>
            </div>
            <div class="tag-row">${place.badges.map((badge) => `<span class="badge">${escapeHtml(badge)}</span>`).join("")}</div>
          </article>
        `).join("") || `
          <div class="empty-state">
            <strong>No places match this filter</strong>
            <span>Try another city or category to bring trusted pet-friendly spots back into view.</span>
          </div>
        `}
      </section>
    </div>
  `;
}

function renderDiscoverMapModule(options = {}) {
  const compact = Boolean(options.compact);
  const region = state.ui.discover.region;
  const filteredPlaces = getFilteredPlacesForMap(region).slice(0, compact ? 3 : 5);
  const focused = getFocusedPlace(filteredPlaces);
  return `
    <section class="map-card ${compact ? "compact" : ""}">
      <div class="map-topline">
        <div>
          <p class="eyebrow">${compact ? "Map preview" : "Map module"}</p>
          <h3 class="section-title">${compact ? `Pet-friendly near ${REGION_LABELS[region]}` : "Policy-aware map view"}</h3>
          <p class="section-subtitle">${compact ? `${filteredPlaces.length} trusted spots in preview` : "Styled to feel like a Kodular-ready map panel."}</p>
        </div>
        ${compact ? '<button class="secondary-button" type="button" data-action="jump-view" data-view="discover">Open Discover</button>' : `
          <div class="inline-actions">
            ${MAP_STYLE_OPTIONS.map((style) => `<button class="chip ${state.ui.discover.mapStyle === style ? "active" : ""}" type="button" data-action="set-map-style" data-style="${escapeHtml(style)}">${escapeHtml(style)}</button>`).join("")}
          </div>
        `}
      </div>
      <div class="map-stage ${state.ui.discover.mapStyle.toLowerCase()}">
        <img class="map-image" src="${getMapAsset(region)}" alt="${escapeHtml(REGION_LABELS[region])} map preview">
        <div class="map-overlay">
          <div class="map-legend">
            <span class="mini-pill"><img src="${ASSETS.markerVerified}" alt=""> Verified</span>
            <span class="mini-pill"><img src="${ASSETS.markerCafe}" alt=""> Cafe</span>
            <span class="mini-pill"><img src="${ASSETS.markerVet}" alt=""> Vet</span>
          </div>
          <div class="map-controls">
            <button class="map-control" type="button" data-action="map-preview-zoom">+</button>
            <button class="map-control" type="button" data-action="map-preview-zoom">-</button>
          </div>
          <span class="user-dot" aria-hidden="true"></span>
          ${filteredPlaces.map((place) => `
            <button class="map-marker ${focused && focused.id === place.id ? "active" : ""}" type="button" data-action="focus-map-place" data-place-id="${escapeHtml(place.id)}" style="left:${place.marker.left}%; top:${place.marker.top}%;" aria-label="Focus ${escapeHtml(place.name)}">
              <img src="${getMarkerIcon(place)}" alt="">
            </button>
          `).join("")}
        </div>
        ${focused ? `
          <div class="map-focus">
            <div>
              <p class="eyebrow">${escapeHtml(focused.city)} • ${escapeHtml(focused.category)}</p>
              <strong>${escapeHtml(focused.name)}</strong>
              <span>${escapeHtml(focused.badges.slice(0, 2).join(" • "))}</span>
            </div>
            <button class="ghost-button" type="button" data-action="open-place" data-place-id="${escapeHtml(focused.id)}">Open</button>
          </div>
        ` : ""}
      </div>
    </section>
  `;
}

function renderCommunityMarkup() {
  const feed = getCommunityFeed();
  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Pet lifestyle community</p>
          <h2>Community</h2>
        </div>
        ${renderAvatarButton()}
      </header>

      <div class="topic-row">
        ${TOPIC_OPTIONS.map((topic) => `
          <button class="chip ${state.ui.community.topic === topic ? "active" : ""}" type="button" data-action="set-community-topic" data-topic="${escapeHtml(topic)}">${escapeHtml(topic)}</button>
        `).join("")}
      </div>

      <section class="story-row">
        ${storyHighlights.map((story) => `
          <button class="story-bubble" type="button" data-action="set-community-topic" data-topic="${escapeHtml(story.topic)}">
            <div class="story-avatar">${renderStoryIcon(story.icon)}</div>
            <strong>${escapeHtml(story.title)}</strong>
            <span>${escapeHtml(story.subtitle)}</span>
          </button>
        `).join("")}
      </section>

      <section class="feed-list">
        ${feed.map((post) => `
          <article class="feed-card card">
            <button class="card-button" type="button" data-action="open-post" data-post-id="${escapeHtml(post.id)}">
              <img class="feed-image" src="${post.image}" alt="${escapeHtml(post.location)}">
            </button>
            <div class="feed-card-header">
              <div>
                <p class="eyebrow">${escapeHtml(post.location)}</p>
                <h3 class="feed-title">${escapeHtml(post.user)} with ${escapeHtml(post.petName)}</h3>
                <p class="feed-location">${escapeHtml(post.caption)}</p>
              </div>
              ${post.verifiedVisit ? '<span class="badge">Verified visit</span>' : '<span class="badge subtle">Lifestyle note</span>'}
            </div>
            <div class="tag-row">${post.tags.map((tag) => `<span class="mini-pill">${escapeHtml(tag)}</span>`).join("")}</div>
            <div class="feed-actions">
              <button class="ghost-button" type="button" data-action="toggle-like-post" data-post-id="${escapeHtml(post.id)}">${isGuestMode() ? "Sign in to like" : (state.community.likedPostIds.includes(post.id) ? "Liked" : "Like")} ${post.likes + (state.community.likedPostIds.includes(post.id) ? 1 : 0)}</button>
              <button class="ghost-button" type="button" data-action="open-post" data-post-id="${escapeHtml(post.id)}">Comments ${getCommentCount(post)}</button>
              <button class="ghost-button" type="button" data-action="toggle-save-post" data-post-id="${escapeHtml(post.id)}">${isGuestMode() ? "Sign in to save" : (state.saved.postIds.includes(post.id) ? "Saved" : "Save")}</button>
            </div>
          </article>
        `).join("")}
      </section>
    </div>
  `;
}

function renderShopMarkup() {
  const filteredProducts = getFilteredProducts();
  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Light pet shopping</p>
          <h2>Shop</h2>
        </div>
        <div class="inline-actions">
          <button class="icon-button" type="button" data-action="open-cart" aria-label="Open cart">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 8h13l-1.2 6.5a2 2 0 0 1-2 1.5H9a2 2 0 0 1-2-1.6L5.5 6H3"></path>
              <circle cx="10" cy="19" r="1.5"></circle>
              <circle cx="17" cy="19" r="1.5"></circle>
            </svg>
          </button>
          ${renderAvatarButton()}
        </div>
      </header>

      <div class="pill-row">
        ${SHOP_CATEGORIES.map((category) => `
          <button class="chip ${state.ui.shop.category === category ? "active" : ""}" type="button" data-action="set-shop-category" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>
        `).join("")}
      </div>

      <section class="feature-banner card">
        <div class="banner-copy">
          <p class="eyebrow">Travel essentials</p>
          <h3 class="card-title">Packable picks for humid days, stroller stops, and short hotel stays.</h3>
          <p class="card-copy">Cute, practical, and consistent with the same trust-first travel story in the rest of the app.</p>
        </div>
        <img class="banner-image" src="${ASSETS.shopRaincoat}" alt="Pet travel accessory preview">
      </section>

      <section class="product-grid">
        ${filteredProducts.map((product) => `
          <article class="product-card card">
            <button class="card-button" type="button" data-action="open-product" data-product-id="${escapeHtml(product.id)}">
              <img class="product-image" src="${product.image}" alt="${escapeHtml(product.name)}">
            </button>
            <div class="product-meta">
              <span class="badge subtle">${escapeHtml(product.tag)}</span>
              <h3 class="product-title">${escapeHtml(product.name)}</h3>
              <p class="product-tagline">${escapeHtml(product.description)}</p>
            </div>
            <div class="price-row">
              <strong class="product-price">${formatPrice(product.price)}</strong>
              <button class="primary-button small" type="button" data-action="add-to-cart" data-product-id="${escapeHtml(product.id)}">${isGuestMode() ? "Preview" : "Add"}</button>
            </div>
          </article>
        `).join("")}
      </section>
    </div>
  `;
}

function renderHealthMarkup() {
  return isGuestMode() ? renderGuestHealth() : renderMemberHealth();
}

function renderGuestHealth() {
  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Care companion preview</p>
          <h2>Health</h2>
        </div>
        ${renderAvatarButton()}
      </header>

      <section class="card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Preview mode</p>
            <h3 class="card-title">Track weight, walks, meals, and mood in one calm space.</h3>
          </div>
          <span class="badge lock-badge">Members only</span>
        </div>
        <p class="card-copy">Guests can preview the chart and daily care structure. Sign in to start logging and keep your pet profile synced.</p>
      </section>

      <section class="card chart-card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Sample chart</p>
            <h3 class="card-title">Recent weight trend</h3>
          </div>
          <span class="badge">Stable</span>
        </div>
        ${renderWeightChart()}
      </section>

      <section class="health-grid">
        ${state.health.reminders.map((reminder) => `
          <article class="card detail-card">
            <p class="eyebrow">${escapeHtml(reminder.title)}</p>
            <strong>${escapeHtml(reminder.detail)}</strong>
          </article>
        `).join("")}
      </section>

      <section class="quick-actions">
        ${HEALTH_LOG_TYPES.map((type) => `
          <button class="quick-action lock" type="button" data-action="open-health-log" data-type="${escapeHtml(type)}">
            <strong>${escapeHtml(type)}</strong>
            <span>Sign in to add</span>
          </button>
        `).join("")}
      </section>
    </div>
  `;
}

function renderMemberHealth() {
  const logs = getSortedHealthLogs();
  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Pet care companion</p>
          <h2>Health</h2>
        </div>
        ${renderAvatarButton()}
      </header>

      <section class="card summary-card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Today overview</p>
            <h3 class="card-title">${escapeHtml(state.pet.name || "Your pet")}</h3>
            <p class="card-copy">${escapeHtml(state.pet.mood || "Relaxed")} and ready for a balanced day.</p>
          </div>
          <span class="badge">${getWeightLabel()}</span>
        </div>
        <div class="stat-grid">
          <div class="stat-tile"><strong>Weight</strong><span>${getWeightLabel()}</span></div>
          <div class="stat-tile"><strong>Walks</strong><span>${logs.filter((item) => item.type === "Walk").length}</span></div>
          <div class="stat-tile"><strong>Meals</strong><span>${logs.filter((item) => item.type === "Meal").length}</span></div>
          <div class="stat-tile"><strong>Mood</strong><span>${escapeHtml(state.pet.mood || "Playful")}</span></div>
        </div>
      </section>

      <section class="card chart-card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Weight chart</p>
            <h3 class="card-title">Recent entries</h3>
          </div>
          <button class="secondary-button" type="button" data-action="open-health-log" data-type="Weight">Add log</button>
        </div>
        ${renderWeightChart()}
      </section>

      <section class="health-grid">
        ${state.health.reminders.map((reminder) => `
          <article class="card detail-card">
            <p class="eyebrow">${escapeHtml(reminder.title)}</p>
            <strong>${escapeHtml(reminder.detail)}</strong>
          </article>
        `).join("")}
      </section>

      <section class="quick-actions">
        ${HEALTH_LOG_TYPES.map((type) => `
          <button class="quick-action" type="button" data-action="open-health-log" data-type="${escapeHtml(type)}">
            <strong>${escapeHtml(type)}</strong>
            <span>Log now</span>
          </button>
        `).join("")}
      </section>

      <section class="card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Activity log</p>
            <h3 class="card-title">Latest updates</h3>
          </div>
        </div>
        <div class="health-log-list">
          ${logs.map((entry) => `
            <article class="health-log-item">
              <div>
                <strong>${escapeHtml(entry.label || entry.type)}</strong>
                <p>${escapeHtml(entry.note || "")}</p>
              </div>
              <div class="health-log-meta">
                <span>${escapeHtml(String(entry.value))}</span>
                <small>${escapeHtml(formatTimestamp(entry.timestamp))}</small>
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderMyProfileMarkup() {
  if (isGuestMode()) {
    const featureMap = getFeatureAccessMap();
    return `
      <div class="screen profile-screen">
        <header class="screen-header profile-header">
          <button class="icon-button" type="button" data-action="go-back-main" aria-label="Back to app">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 18 9 12l6-6"></path>
            </svg>
          </button>
          <div class="screen-header-copy">
            <p>Account entry</p>
            <h2>My Profile</h2>
          </div>
        </header>

        <section class="card profile-hero">
          <div class="profile-hero-grid">
            <img class="profile-hero-image" src="${ASSETS.heroCat}" alt="Guest preview pet lifestyle">
            <div class="profile-preview-copy">
              <p class="eyebrow">Guest mode</p>
              <h3 class="card-title">You're browsing as a guest</h3>
              <p class="card-copy">Explore most of the app first. Sign in only when you want AI planning, saves, posting, checkout, or health logging.</p>
            </div>
          </div>
          <div class="profile-cta-grid">
            <button class="primary-button" type="button" data-action="open-auth" data-mode="login" data-reason="profile">Login</button>
            <button class="secondary-button" type="button" data-action="open-auth" data-mode="register" data-reason="profile">Create Account</button>
          </div>
        </section>

        <section class="preview-grid">
          ${featureMap.map((item) => `
            <article class="preview-card static">
              <div class="preview-copy">
                <span class="badge ${item.memberOnly ? "lock-badge" : "subtle"}">${item.memberOnly ? "Members only" : "Guest access"}</span>
                <h3 class="card-title">${escapeHtml(item.title)}</h3>
                <p class="card-copy">${escapeHtml(item.copy)}</p>
              </div>
            </article>
          `).join("")}
        </section>

        <section class="card">
          <div class="summary-row">
            <div>
              <p class="eyebrow">Demo note</p>
              <h3 class="card-title">Student project reference</h3>
            </div>
          </div>
          <p class="card-copy">This demo shows a realistic guest-to-member flow that can later map back into Kodular or App Inventor using screens, arrangements, TinyDB, and bottom sheets.</p>
        </section>

        <section class="card">
          <div class="summary-row">
            <div>
              <p class="eyebrow">Preview pet profile</p>
              <h3 class="card-title">What members unlock</h3>
            </div>
          </div>
          <div class="profile-preview-row">
            <img class="profile-pet-avatar" src="${ASSETS.profilePet}" alt="Pet profile preview">
            <div>
              <strong>Mochi</strong>
              <p>Mini poodle, small size, calm in stroller, happiest on breezy early walks.</p>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  const savedPlaces = state.saved.placeIds.map(getPlaceById).filter(Boolean);
  const savedPosts = state.saved.postIds.map(getPostById).filter(Boolean);
  const preferences = state.user.preferences || {};

  return `
    <div class="screen profile-screen">
      <header class="screen-header profile-header">
        <button class="icon-button" type="button" data-action="go-back-main" aria-label="Back to app">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 18 9 12l6-6"></path>
          </svg>
        </button>
        <div class="screen-header-copy">
          <p>Account and pet details</p>
          <h2>My Profile</h2>
        </div>
      </header>

      <section class="card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Owner card</p>
            <h3 class="card-title">${escapeHtml(getOwnerName())}</h3>
            <p class="card-copy">${escapeHtml(state.user.email)}</p>
          </div>
          <button class="secondary-button" type="button" data-action="open-edit-profile">Edit</button>
        </div>
      </section>

      <section class="card">
        <div class="profile-preview-row">
          <img class="profile-pet-avatar" src="${state.pet.avatarImage || ASSETS.profilePet}" alt="${escapeHtml(state.pet.name || "Pet avatar")}">
          <div>
            <p class="eyebrow">Pet card</p>
            <h3 class="card-title">${escapeHtml(state.pet.name || "Your pet")}</h3>
            <p class="card-copy">${escapeHtml(state.pet.breed || "Pet breed")} | ${escapeHtml(state.pet.size || "Medium")} | ${escapeHtml(state.pet.age || "2")} yrs</p>
          </div>
        </div>
        <div class="stat-grid">
          <div class="stat-tile"><strong>City</strong><span>${escapeHtml(state.pet.city)}</span></div>
          <div class="stat-tile"><strong>Type</strong><span>${escapeHtml(state.pet.type)}</span></div>
          <div class="stat-tile"><strong>Heat</strong><span>${escapeHtml(state.pet.heatSensitivity)}</span></div>
          <div class="stat-tile"><strong>PawPoints</strong><span>${getPawPoints()}</span></div>
        </div>
      </section>

      <section class="card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Saved places</p>
            <h3 class="card-title">Trust-first shortlist</h3>
          </div>
        </div>
        <div class="saved-list">
          ${savedPlaces.length ? savedPlaces.map((place) => `
            <button class="saved-card" type="button" data-action="open-place" data-place-id="${escapeHtml(place.id)}">
              <img class="saved-thumb" src="${place.image}" alt="${escapeHtml(place.name)}">
              <div>
                <strong class="saved-title">${escapeHtml(place.name)}</strong>
                <p class="saved-copy">${escapeHtml(place.city)} | ${escapeHtml(place.badges.slice(0, 2).join(", "))}</p>
              </div>
            </button>
          `).join("") : `
            <div class="empty-state">
              <strong>No saved places yet</strong>
              <span>Browse Discover and save the most reliable pet-friendly spots.</span>
            </div>
          `}
        </div>
      </section>

      <section class="card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Saved posts</p>
            <h3 class="card-title">Community notes worth keeping</h3>
          </div>
        </div>
        <div class="saved-list">
          ${savedPosts.length ? savedPosts.map((post) => `
            <button class="saved-card" type="button" data-action="open-post" data-post-id="${escapeHtml(post.id)}">
              <img class="saved-thumb" src="${post.image}" alt="${escapeHtml(post.location)}">
              <div>
                <strong class="saved-title">${escapeHtml(post.user)} | ${escapeHtml(post.location)}</strong>
                <p class="saved-copy">${escapeHtml(post.caption)}</p>
              </div>
            </button>
          `).join("") : `
            <div class="empty-state">
              <strong>No saved posts yet</strong>
              <span>Save useful community tips when you want to revisit route notes later.</span>
            </div>
          `}
        </div>
      </section>

      <section class="card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Settings</p>
            <h3 class="card-title">Preferences</h3>
          </div>
        </div>
        <button class="settings-row" type="button" data-action="toggle-setting" data-setting="notifications">
          <span>Notifications</span>
          <span class="toggle-switch ${preferences.notifications ? "active" : ""}"></span>
        </button>
        <button class="settings-row" type="button" data-action="toggle-setting" data-setting="locationSharing">
          <span>Location sharing</span>
          <span class="toggle-switch ${preferences.locationSharing ? "active" : ""}"></span>
        </button>
        <button class="settings-row" type="button" data-action="toggle-setting" data-setting="reminders">
          <span>Reminder preferences</span>
          <span class="toggle-switch ${preferences.reminders ? "active" : ""}"></span>
        </button>
      </section>

      <button class="secondary-button danger-button" type="button" data-action="logout">Logout</button>
    </div>
  `;
}

function renderDiscoverPageMarkup() {
  const filteredPlaces = getFilteredPlaces();
  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Trust-first discovery</p>
          <h2>Discover</h2>
        </div>
        ${renderAvatarButton()}
      </header>

      <div class="search-shell">
        <span class="search-icon" aria-hidden="true">${renderSearchIcon()}</span>
        <input id="discoverSearchCompact" data-role="discover-search" type="search" value="${escapeHtml(state.ui.discover.search)}" placeholder="Search place, city, or policy">
      </div>

      <div class="pill-row">
        ${Object.entries(REGION_LABELS).map(([value, label]) => `
          <button class="chip ${state.ui.discover.region === value ? "active" : ""}" type="button" data-action="set-discover-region" data-region="${escapeHtml(value)}">${escapeHtml(label)}</button>
        `).join("")}
      </div>

      <div class="pill-row">
        ${DISCOVER_CATEGORIES.map((label) => `
          <button class="chip ${state.ui.discover.category === label ? "active" : ""}" type="button" data-action="set-discover-category" data-category="${escapeHtml(label)}">${escapeHtml(label)}</button>
        `).join("")}
      </div>

      ${renderDiscoverMapModule({ compact: false })}

      <section class="place-list">
        ${filteredPlaces.map((place) => `
          <article class="place-card card">
            <button class="card-button" type="button" data-action="open-place" data-place-id="${escapeHtml(place.id)}">
              <img class="place-image" src="${place.image}" alt="${escapeHtml(place.name)}">
            </button>
            <div class="place-card-header">
              <div>
                <p class="eyebrow">${escapeHtml(place.category)}</p>
                <h3 class="place-title">${escapeHtml(place.name)}</h3>
                <p class="place-meta">${escapeHtml(place.distance)} | ${escapeHtml(place.badges[0])}</p>
              </div>
              <button class="ghost-button" type="button" data-action="toggle-save-place" data-place-id="${escapeHtml(place.id)}">${isGuestMode() ? "Sign in" : (isSavedPlace(place.id) ? "Saved" : "Save")}</button>
            </div>
          </article>
        `).join("") || `
          <div class="empty-state">
            <strong>No places match this filter</strong>
            <span>Try another city or category to bring trusted pet-friendly spots back into view.</span>
          </div>
        `}
      </section>
    </div>
  `;
}

function renderCommunityCompactMarkup() {
  const feed = getCommunityFeed();
  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Pet lifestyle community</p>
          <h2>Community</h2>
        </div>
        ${renderAvatarButton()}
      </header>

      <div class="topic-row">
        ${TOPIC_OPTIONS.map((topic) => `
          <button class="chip ${state.ui.community.topic === topic ? "active" : ""}" type="button" data-action="set-community-topic" data-topic="${escapeHtml(topic)}">${escapeHtml(topic)}</button>
        `).join("")}
      </div>

      <section class="story-row">
        ${storyHighlights.map((story) => `
          <button class="story-bubble" type="button" data-action="set-community-topic" data-topic="${escapeHtml(story.topic)}">
            <div class="story-avatar">${renderStoryIcon(story.icon)}</div>
            <strong>${escapeHtml(story.title)}</strong>
            <span>${escapeHtml(story.subtitle)}</span>
          </button>
        `).join("")}
      </section>

      <section class="feed-list">
        ${feed.map((post) => `
          <article class="feed-card card">
            <button class="card-button" type="button" data-action="open-post" data-post-id="${escapeHtml(post.id)}">
              <img class="feed-image" src="${post.image}" alt="${escapeHtml(post.location)}">
            </button>
            <div class="feed-card-header">
              <div>
                <p class="eyebrow">${escapeHtml(post.location)}</p>
                <h3 class="feed-title">${escapeHtml(post.user)} with ${escapeHtml(post.petName)}</h3>
                <p class="feed-location">${escapeHtml(post.tags[0] || "Lifestyle note")}</p>
              </div>
              ${post.verifiedVisit ? '<span class="badge">Verified</span>' : '<span class="badge subtle">Note</span>'}
            </div>
            <div class="feed-actions">
              <button class="ghost-button" type="button" data-action="toggle-like-post" data-post-id="${escapeHtml(post.id)}">${isGuestMode() ? "Like" : (state.community.likedPostIds.includes(post.id) ? "Liked" : "Like")}</button>
              <button class="ghost-button" type="button" data-action="open-post" data-post-id="${escapeHtml(post.id)}">${getCommentCount(post)} comments</button>
              <button class="ghost-button" type="button" data-action="toggle-save-post" data-post-id="${escapeHtml(post.id)}">${state.saved.postIds.includes(post.id) ? "Saved" : "Save"}</button>
            </div>
          </article>
        `).join("")}
      </section>
    </div>
  `;
}

function renderShopCompactMarkup() {
  const filteredProducts = getFilteredProducts();
  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Light pet shopping</p>
          <h2>Shop</h2>
        </div>
        <div class="inline-actions">
          <button class="icon-button" type="button" data-action="open-cart" aria-label="Open cart">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 8h13l-1.2 6.5a2 2 0 0 1-2 1.5H9a2 2 0 0 1-2-1.6L5.5 6H3"></path>
              <circle cx="10" cy="19" r="1.5"></circle>
              <circle cx="17" cy="19" r="1.5"></circle>
            </svg>
          </button>
          ${renderAvatarButton()}
        </div>
      </header>

      <div class="pill-row">
        ${SHOP_CATEGORIES.map((category) => `
          <button class="chip ${state.ui.shop.category === category ? "active" : ""}" type="button" data-action="set-shop-category" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>
        `).join("")}
      </div>

      <section class="feature-banner card compact-banner">
        <div class="banner-copy">
          <p class="eyebrow">Travel essentials</p>
          <h3 class="card-title">Light, useful pet travel picks</h3>
          <p class="card-copy">For stroller stops, rainy walks, and short stays.</p>
        </div>
        <img class="banner-image" src="${ASSETS.shopRaincoat}" alt="Pet travel accessory preview">
      </section>

      <section class="product-grid">
        ${filteredProducts.map((product) => `
          <article class="product-card card">
            <button class="card-button" type="button" data-action="open-product" data-product-id="${escapeHtml(product.id)}">
              <img class="product-image" src="${product.image}" alt="${escapeHtml(product.name)}">
            </button>
            <div class="product-meta">
              <h3 class="product-title">${escapeHtml(product.name)}</h3>
              <p class="product-tagline">${formatPrice(product.price)}</p>
              <p class="product-tagline">${escapeHtml(product.tag)}</p>
            </div>
            <button class="primary-button small" type="button" data-action="add-to-cart" data-product-id="${escapeHtml(product.id)}">${isGuestMode() ? "Preview" : "Add"}</button>
          </article>
        `).join("")}
      </section>
    </div>
  `;
}

function renderHealthCompactMarkup() {
  return isGuestMode() ? renderGuestHealthCompact() : renderMemberHealthCompact();
}

function renderGuestHealthCompact() {
  const hint = state.health.reminders[0];
  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Care companion preview</p>
          <h2>Health</h2>
        </div>
        ${renderAvatarButton()}
      </header>

      <section class="card">
        <p class="eyebrow">Preview mode</p>
        <h3 class="card-title">Daily care in one calm screen</h3>
        <p class="card-copy">${getWeightLabel()} | ${escapeHtml(hint ? hint.detail : "Sign in to start logging")}</p>
      </section>

      <section class="card chart-card">
        <p class="eyebrow">Sample chart</p>
        <h3 class="card-title">Recent weight trend</h3>
        ${renderWeightChart()}
      </section>

      <section class="quick-actions">
        ${HEALTH_LOG_TYPES.map((type) => `
          <button class="quick-action lock" type="button" data-action="open-health-log" data-type="${escapeHtml(type)}">
            <strong>${escapeHtml(type)}</strong>
            <span>Sign in to add</span>
          </button>
        `).join("")}
      </section>
    </div>
  `;
}

function renderMemberHealthCompact() {
  const logs = getSortedHealthLogs();
  const latest = logs[0];
  const hint = state.health.reminders[0];
  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Pet care companion</p>
          <h2>Health</h2>
        </div>
        ${renderAvatarButton()}
      </header>

      <section class="card summary-card">
        <p class="eyebrow">Today care</p>
        <h3 class="card-title">${escapeHtml(hint ? hint.title : "Care status")}</h3>
        <p class="card-copy">${getWeightLabel()} | ${escapeHtml(hint ? hint.detail : state.pet.mood || "Relaxed")}</p>
      </section>

      <section class="card chart-card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Weight chart</p>
            <h3 class="card-title">Recent entries</h3>
          </div>
          <button class="secondary-button" type="button" data-action="open-health-log" data-type="Weight">Add log</button>
        </div>
        ${renderWeightChart()}
      </section>

      <section class="card">
        <p class="eyebrow">Latest log</p>
        <h3 class="card-title">${escapeHtml(latest ? latest.label || latest.type : "No logs yet")}</h3>
        <p class="card-copy">${escapeHtml(latest ? String(latest.value) : "Add a walk, meal, weight, or mood entry")}</p>
      </section>
    </div>
  `;
}

function renderMyProfileTabMarkup() {
  if (isGuestMode()) {
    return `
      <div class="screen profile-screen">
        <header class="screen-header">
          <div class="screen-header-copy">
            <p>Account entry</p>
            <h2>My Profile</h2>
          </div>
        </header>

        <section class="card profile-hero">
          <div class="profile-hero-grid">
            <img class="profile-hero-image" src="${ASSETS.heroCat}" alt="Guest preview pet lifestyle">
            <div class="profile-preview-copy">
              <p class="eyebrow">Guest mode</p>
              <h3 class="card-title">Browse first, sign in when ready</h3>
              <p class="card-copy">Save trusted places, generate AI routes, and keep care logs after login.</p>
            </div>
          </div>
          <div class="profile-cta-grid">
            <button class="primary-button" type="button" data-action="open-auth" data-mode="login" data-reason="profile">Login</button>
            <button class="secondary-button" type="button" data-action="open-auth" data-mode="register" data-reason="profile">Create Account</button>
          </div>
        </section>

        <section class="preview-grid">
          ${getFeatureAccessMap().slice(0, 3).map((item) => `
            <article class="preview-card static">
              <div class="preview-copy">
                <p class="eyebrow">${item.memberOnly ? "Members only" : "Guest access"}</p>
                <strong>${escapeHtml(item.title)}</strong>
                <span>${escapeHtml(item.copy)}</span>
              </div>
            </article>
          `).join("")}
        </section>

        <section class="card">
          <p class="eyebrow">Preview account</p>
          <h3 class="card-title">Mochi</h3>
          <p class="card-copy">Mini poodle | calm in stroller | city-friendly weekend routine</p>
        </section>
      </div>
    `;
  }

  const savedPlaces = state.saved.placeIds.map(getPlaceById).filter(Boolean);
  const savedPosts = state.saved.postIds.map(getPostById).filter(Boolean);
  const preferences = state.user.preferences || {};

  return `
    <div class="screen profile-screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Account and pet details</p>
          <h2>My Profile</h2>
        </div>
      </header>

      <section class="card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Owner card</p>
            <h3 class="card-title">${escapeHtml(getOwnerName())}</h3>
            <p class="card-copy">${escapeHtml(state.user.email)} | ${getPawPoints()} PawPoints</p>
          </div>
          <button class="secondary-button" type="button" data-action="open-edit-profile">Edit</button>
        </div>
      </section>

      <section class="card">
        <div class="profile-preview-row">
          <img class="profile-pet-avatar" src="${state.pet.avatarImage || ASSETS.profilePet}" alt="${escapeHtml(state.pet.name || "Pet avatar")}">
          <div>
            <p class="eyebrow">Pet card</p>
            <h3 class="card-title">${escapeHtml(state.pet.name || "Your pet")}</h3>
            <p class="card-copy">${escapeHtml(state.pet.breed || "Pet breed")} | ${escapeHtml(state.pet.size || "Medium")}</p>
            <p class="card-copy">${escapeHtml(state.pet.city)} | ${escapeHtml(state.pet.heatSensitivity)}</p>
          </div>
        </div>
      </section>

      <section class="card">
        <p class="eyebrow">Saved places</p>
        <h3 class="card-title">${savedPlaces.length ? savedPlaces[0].name : "No saved places yet"}</h3>
        <p class="card-copy">${savedPlaces.length ? `${savedPlaces.length} saved | ${savedPlaces[0].badges[0]}` : "Browse Discover and save trusted places."}</p>
      </section>

      <section class="card">
        <p class="eyebrow">Saved posts</p>
        <h3 class="card-title">${savedPosts.length ? savedPosts[0].user : "No saved posts yet"}</h3>
        <p class="card-copy">${savedPosts.length ? `${savedPosts[0].location} | ${savedPosts[0].tags[0]}` : "Save useful community notes to revisit later."}</p>
      </section>

      <section class="card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Preferences</p>
            <h3 class="card-title">Settings</h3>
          </div>
        </div>
        <button class="settings-row" type="button" data-action="toggle-setting" data-setting="notifications">
          <span>Notifications</span>
          <span class="toggle-switch ${preferences.notifications ? "active" : ""}"></span>
        </button>
        <button class="settings-row" type="button" data-action="toggle-setting" data-setting="locationSharing">
          <span>Location</span>
          <span class="toggle-switch ${preferences.locationSharing ? "active" : ""}"></span>
        </button>
        <button class="settings-row" type="button" data-action="toggle-setting" data-setting="reminders">
          <span>Reminders</span>
          <span class="toggle-switch ${preferences.reminders ? "active" : ""}"></span>
        </button>
      </section>

      <button class="secondary-button danger-button" type="button" data-action="logout">Logout</button>
    </div>
  `;
}

function renderSheet() {
  const type = state.ui.sheet.type;
  if (!type) {
    dom.sheetOverlay.classList.add("hidden");
    dom.sheetOverlay.setAttribute("aria-hidden", "true");
    dom.sheetEyebrow.textContent = "";
    dom.sheetTitle.textContent = "Details";
    dom.sheetBody.innerHTML = "";
    return;
  }

  let eyebrow = "Details";
  let title = "Details";
  let body = "";

  switch (type) {
    case "auth":
      eyebrow = "Account access";
      title = state.ui.authMode === "register" ? "Create your PawPlanet account" : "Login to PawPlanet";
      body = renderAuthSheet();
      break;
    case "planner":
      eyebrow = "AI Planner";
      title = "Safe day-out plan";
      body = renderPlannerSheet();
      break;
    case "placeDetail":
      eyebrow = "Discover";
      title = "Place details";
      body = renderPlaceDetail();
      break;
    case "postDetail":
      eyebrow = "Community";
      title = "Post details";
      body = renderPostDetail();
      break;
    case "createPost":
      eyebrow = "Community";
      title = "Create a post";
      body = renderCreatePostSheet();
      break;
    case "productDetail":
      eyebrow = "Shop";
      title = "Product details";
      body = renderProductDetail();
      break;
    case "cart":
      eyebrow = "Shop";
      title = "Cart summary";
      body = renderCartSheet();
      break;
    case "healthLog":
      eyebrow = "Health";
      title = `${state.ui.healthLogType} log`;
      body = renderHealthLogSheet();
      break;
    case "editProfile":
      eyebrow = "My Profile";
      title = "Edit profile";
      body = renderEditProfileSheet();
      break;
    case "orderSuccess":
      eyebrow = "Shop";
      title = "Order placed";
      body = renderOrderSuccessSheet();
      break;
    default:
      body = "";
  }

  dom.sheetEyebrow.textContent = eyebrow;
  dom.sheetTitle.textContent = title;
  dom.sheetBody.innerHTML = body;
  sanitizeDisplayArtifacts(dom.sheetBody);
  dom.sheetOverlay.classList.remove("hidden");
  dom.sheetOverlay.setAttribute("aria-hidden", "false");
}

function renderAuthSheet() {
  const isRegister = state.ui.authMode === "register";
  const city = REGION_DEFAULT_CITY[state.ui.discover.region];
  return `
    <div class="auth-sheet">
      <div class="segmented-control">
        <button class="segment-button ${isRegister ? "" : "active"}" type="button" data-action="auth-segment" data-mode="login">Login</button>
        <button class="segment-button ${isRegister ? "active" : ""}" type="button" data-action="auth-segment" data-mode="register">Register</button>
      </div>
      <p class="auth-message" data-auth-message>${escapeHtml(getAuthPromptMessage())}</p>
      <form class="sheet-form" data-form="auth" novalidate>
        <label class="sheet-field">
          <span>Email</span>
          <input type="email" name="email" autocomplete="email" value="${escapeHtml(state.user.email || "")}" placeholder="hello@pawplanet.app">
          <small class="field-error" data-error-for="email"></small>
        </label>
        <label class="sheet-field">
          <span>Password</span>
          <div class="input-shell">
            <input type="password" name="password" autocomplete="${isRegister ? "new-password" : "current-password"}" value="${escapeHtml(isRegister ? "" : state.user.password || "")}" placeholder="At least 6 characters">
            <button class="password-toggle" type="button" data-action="toggle-password" aria-label="Show password">${renderEyeIcon(false)}</button>
          </div>
          <small class="field-error" data-error-for="password"></small>
        </label>
        ${isRegister ? `
          <label class="sheet-field">
            <span>Confirm password</span>
            <div class="input-shell">
              <input type="password" name="confirmPassword" autocomplete="new-password" placeholder="Repeat your password">
              <button class="password-toggle" type="button" data-action="toggle-password" aria-label="Show password">${renderEyeIcon(false)}</button>
            </div>
            <small class="field-error" data-error-for="confirmPassword"></small>
          </label>
          <label class="sheet-field">
            <span>Pet name</span>
            <input type="text" name="petName" value="${escapeHtml(state.pet.name || "")}" placeholder="Mochi">
            <small class="field-error" data-error-for="petName"></small>
          </label>
          <div class="sheet-inline">
            <label class="sheet-field">
              <span>Pet type</span>
              <select name="petType">
                ${["Dog", "Cat"].map((type) => `<option value="${escapeHtml(type)}" ${state.pet.type === type ? "selected" : ""}>${escapeHtml(type)}</option>`).join("")}
              </select>
              <small class="field-error" data-error-for="petType"></small>
            </label>
            <label class="sheet-field">
              <span>Size</span>
              <select name="size">
                ${["Small", "Medium", "Large"].map((size) => `<option value="${escapeHtml(size)}" ${state.pet.size === size ? "selected" : ""}>${escapeHtml(size)}</option>`).join("")}
              </select>
              <small class="field-error" data-error-for="size"></small>
            </label>
          </div>
          <label class="sheet-field">
            <span>Breed</span>
            <input type="text" name="breed" value="${escapeHtml(state.pet.breed || "")}" placeholder="Mini poodle / British shorthair">
            <small class="field-error" data-error-for="breed"></small>
          </label>
          <p class="helper-text">City will start as ${escapeHtml(city)} and can be edited later in My Profile.</p>
        ` : ""}
        <button class="primary-button" type="submit">${isRegister ? "Create Account" : "Login"}</button>
      </form>
    </div>
  `;
}

function renderPlannerSheet() {
  const result = state.ui.sheet.payload || state.planner.lastResult;
  if (!result) {
    return `
      <div class="empty-state">
        <strong>No plan generated yet</strong>
        <span>Set your planner inputs on Home and generate a structured route.</span>
      </div>
    `;
  }

  return `
    <div class="planner-route">
      <section class="card detail-card">
        <p class="eyebrow">Route summary</p>
        <h3 class="card-title">${escapeHtml(result.headline)}</h3>
        <p class="card-copy">${escapeHtml(result.route)}</p>
      </section>
      <section class="planner-stops">
        ${result.stops.map((stop) => `
          <article class="planner-stop card">
            <span class="badge accent">${escapeHtml(stop.time)}</span>
            <strong>${escapeHtml(stop.title)}</strong>
            <p>${escapeHtml(stop.note)}</p>
          </article>
        `).join("")}
      </section>
      <section class="info-card card">
        <p class="eyebrow">Weather caution</p>
        <strong>${escapeHtml(result.caution)}</strong>
      </section>
      <section class="info-card card">
        <p class="eyebrow">Safety tips</p>
        <ul class="detail-list">
          ${result.safetyTips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}
        </ul>
      </section>
      <section class="info-card card">
        <p class="eyebrow">Backup vet</p>
        <strong>${escapeHtml(result.vet)}</strong>
      </section>
      <section class="info-card card">
        <p class="eyebrow">Policy reminder</p>
        <strong>${escapeHtml(result.policy)}</strong>
      </section>
    </div>
  `;
}

function renderPlaceDetail() {
  const place = getPlaceById(state.ui.sheet.payload && state.ui.sheet.payload.placeId);
  if (!place) {
    return "";
  }
  return `
    <div class="detail-stack">
      <img class="detail-image" src="${place.image}" alt="${escapeHtml(place.name)}">
      <section class="card detail-card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">${escapeHtml(place.city)} | ${escapeHtml(place.category)}</p>
            <h3 class="card-title">${escapeHtml(place.name)}</h3>
            <p class="card-copy">${escapeHtml(place.address)}</p>
          </div>
          <span class="badge ${place.openNow ? "accent" : "subtle"}">${place.openNow ? "Open now" : "Closed now"}</span>
        </div>
        <div class="tag-row">${place.badges.map((badge) => `<span class="mini-pill">${escapeHtml(badge)}</span>`).join("")}</div>
      </section>
      <section class="card detail-card">
        <p class="eyebrow">Pet policy</p>
        <p>${escapeHtml(place.policy)}</p>
      </section>
      <section class="card detail-card">
        <p class="eyebrow">Why people trust it</p>
        <p>${escapeHtml(place.description)}</p>
        <p>${escapeHtml(place.notes)}</p>
      </section>
      <section class="detail-actions">
        <button class="secondary-button" type="button" data-action="mock-message" data-message="Directions preview opened. In Kodular this maps to a Map marker or directions intent.">Directions</button>
        <button class="secondary-button" type="button" data-action="mock-message" data-message="Call action preview. In Kodular this maps to a phone intent.">Call</button>
        <button class="primary-button" type="button" data-action="toggle-save-place" data-place-id="${escapeHtml(place.id)}">${isGuestMode() ? "Sign in to save" : (isSavedPlace(place.id) ? "Saved place" : "Save place")}</button>
      </section>
      <section class="card detail-card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Latest reviews</p>
            <h3 class="card-title">${place.verifiedReviews} verified notes</h3>
          </div>
          ${place.justUpdated ? '<span class="badge accent">Just updated</span>' : ""}
        </div>
        ${place.latestReviews.map((review) => `
          <article class="detail-review">
            <strong>${escapeHtml(review.author)}</strong>
            <small>${escapeHtml(review.time)}</small>
            <p>${escapeHtml(review.text)}</p>
          </article>
        `).join("")}
      </section>
    </div>
  `;
}

function renderPostDetail() {
  const post = getPostById(state.ui.sheet.payload && state.ui.sheet.payload.postId);
  if (!post) {
    return "";
  }
  const liked = state.community.likedPostIds.includes(post.id);
  const saved = state.saved.postIds.includes(post.id);
  return `
    <div class="detail-stack">
      <img class="detail-image" src="${post.image}" alt="${escapeHtml(post.location)}">
      <section class="card detail-card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">${escapeHtml(post.location)}</p>
            <h3 class="card-title">${escapeHtml(post.user)} with ${escapeHtml(post.petName)}</h3>
          </div>
          ${post.verifiedVisit ? '<span class="badge">Verified visit</span>' : '<span class="badge subtle">Lifestyle note</span>'}
        </div>
        <p>${escapeHtml(post.caption)}</p>
        <div class="tag-row">${post.tags.map((tag) => `<span class="mini-pill">${escapeHtml(tag)}</span>`).join("")}</div>
      </section>
      <section class="card detail-card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Interaction</p>
            <h3 class="card-title">${post.likes + (liked ? 1 : 0)} likes | ${getCommentCount(post)} comments</h3>
          </div>
        </div>
        <div class="inline-actions wrap">
          <button class="secondary-button" type="button" data-action="toggle-like-post" data-post-id="${escapeHtml(post.id)}">${liked ? "Unlike" : "Like"}</button>
          <button class="secondary-button" type="button" data-action="toggle-save-post" data-post-id="${escapeHtml(post.id)}">${saved ? "Saved" : "Save"}</button>
        </div>
      </section>
    </div>
  `;
}

function renderCreatePostSheet() {
  return `
    <form class="sheet-form" data-form="create-post">
      <div class="story-avatar create-post-illustration" data-action="cycle-illustration">${renderStoryIcon(CREATE_POST_ILLUSTRATIONS[state.ui.community.draftIllustration].toLowerCase())}</div>
      <p class="helper-text">Tap the illustration to cycle through simple lifestyle placeholders.</p>
      <label class="sheet-field">
        <span>Caption</span>
        <textarea name="caption" placeholder="Share a useful pet-friendly tip or travel note."></textarea>
      </label>
      <div class="sheet-inline">
        <label class="sheet-field">
          <span>Location</span>
          <input type="text" name="location" placeholder="Central, Hong Kong">
        </label>
        <label class="sheet-field">
          <span>Tag</span>
          <select name="tag">
            ${TOPIC_OPTIONS.filter((item) => item !== "All").map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join("")}
          </select>
        </label>
      </div>
      <button class="primary-button" type="submit">Publish post</button>
    </form>
  `;
}

function renderProductDetail() {
  const product = getProductById(state.ui.sheet.payload && state.ui.sheet.payload.productId);
  const qty = clamp(Number((state.ui.sheet.payload && state.ui.sheet.payload.qty) || 1), 1, 9);
  if (!product) {
    return "";
  }
  return `
    <div class="detail-stack">
      <img class="detail-image" src="${product.image}" alt="${escapeHtml(product.name)}">
      <section class="card detail-card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">${escapeHtml(product.category)} | ${escapeHtml(product.tag)}</p>
            <h3 class="card-title">${escapeHtml(product.name)}</h3>
          </div>
          <strong class="product-price">${formatPrice(product.price)}</strong>
        </div>
        <p>${escapeHtml(product.description)}</p>
      </section>
      <section class="card detail-card">
        <p class="eyebrow">Quantity</p>
        <div class="qty-control">
          <button class="map-control" type="button" data-action="product-qty" data-direction="-1">-</button>
          <strong>${qty}</strong>
          <button class="map-control" type="button" data-action="product-qty" data-direction="1">+</button>
        </div>
        <button class="primary-button" type="button" data-action="add-to-cart" data-product-id="${escapeHtml(product.id)}" data-qty="${qty}">${isGuestMode() ? "Preview in cart" : "Add to cart"}</button>
      </section>
    </div>
  `;
}

function renderCartSheet() {
  const details = getCartDetails();
  const isGuest = isGuestMode();
  if (!details.length) {
    return `
      <div class="empty-state">
        <strong>Your cart is empty</strong>
        <span>${isGuest ? "Add a few products to preview the shopping flow. Checkout will ask you to sign in." : "Add a few travel or care items to build a light order."}</span>
      </div>
    `;
  }

  return `
    <div class="cart-list">
      ${isGuest ? '<div class="auth-message">Guest preview cart. You can browse, but checkout requires login.</div>' : ""}
      ${details.map((item) => `
        <article class="cart-item card">
          <img class="saved-thumb" src="${item.product.image}" alt="${escapeHtml(item.product.name)}">
          <div class="cart-item-copy">
            <strong>${escapeHtml(item.product.name)}</strong>
            <p>${escapeHtml(item.product.tag)}</p>
            <span>${formatPrice(item.product.price)}</span>
          </div>
          <div class="cart-row">
            <div class="qty-control compact">
              <button class="map-control" type="button" data-action="cart-qty" data-product-id="${escapeHtml(item.product.id)}" data-direction="-1">-</button>
              <strong>${item.qty}</strong>
              <button class="map-control" type="button" data-action="cart-qty" data-product-id="${escapeHtml(item.product.id)}" data-direction="1">+</button>
            </div>
            <button class="ghost-button" type="button" data-action="remove-cart-item" data-product-id="${escapeHtml(item.product.id)}">Remove</button>
          </div>
        </article>
      `).join("")}
      <section class="card detail-card">
        <div class="summary-row">
          <strong>Total</strong>
          <strong>${formatPrice(getCartTotal())}</strong>
        </div>
        <button class="primary-button" type="button" data-action="checkout-cart">${isGuest ? "Sign in to checkout" : "Place demo order"}</button>
      </section>
    </div>
  `;
}

function renderHealthLogSheet() {
  return `
    <div class="health-log-sheet">
      <div class="pill-row">
        ${HEALTH_LOG_TYPES.map((type) => `
          <button class="chip ${state.ui.healthLogType === type ? "active" : ""}" type="button" data-action="set-health-log-type" data-type="${escapeHtml(type)}">${escapeHtml(type)}</button>
        `).join("")}
      </div>
      <form class="sheet-form" data-form="health-log">
        ${renderHealthFields(state.ui.healthLogType)}
        <button class="primary-button" type="submit">Save log</button>
      </form>
    </div>
  `;
}

function renderEditProfileSheet() {
  return `
    <form class="sheet-form" data-form="edit-profile">
      <label class="sheet-field">
        <span>Owner name</span>
        <input type="text" name="ownerName" value="${escapeHtml(getOwnerName())}">
      </label>
      <label class="sheet-field">
        <span>Pet name</span>
        <input type="text" name="petName" value="${escapeHtml(state.pet.name || "")}">
      </label>
      <div class="sheet-inline">
        <label class="sheet-field">
          <span>Type</span>
          <select name="petType">
            ${["Dog", "Cat"].map((type) => `<option value="${escapeHtml(type)}" ${state.pet.type === type ? "selected" : ""}>${escapeHtml(type)}</option>`).join("")}
          </select>
        </label>
        <label class="sheet-field">
          <span>Size</span>
          <select name="size">
            ${["Small", "Medium", "Large"].map((size) => `<option value="${escapeHtml(size)}" ${state.pet.size === size ? "selected" : ""}>${escapeHtml(size)}</option>`).join("")}
          </select>
        </label>
      </div>
      <label class="sheet-field">
        <span>Breed</span>
        <input type="text" name="breed" value="${escapeHtml(state.pet.breed || "")}">
      </label>
      <div class="sheet-inline">
        <label class="sheet-field">
          <span>Age</span>
          <input type="number" min="0" step="1" name="age" value="${escapeHtml(state.pet.age || "")}">
        </label>
        <label class="sheet-field">
          <span>City</span>
          <select name="city">
            ${["Hong Kong", "Macau", "Shenzhen", "Guangzhou"].map((city) => `<option value="${escapeHtml(city)}" ${state.pet.city === city ? "selected" : ""}>${escapeHtml(city)}</option>`).join("")}
          </select>
        </label>
      </div>
      <label class="sheet-field">
        <span>Heat sensitivity</span>
        <select name="heatSensitivity">
          ${["Low", "Medium", "High"].map((item) => `<option value="${escapeHtml(item)}" ${state.pet.heatSensitivity === item ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}
        </select>
      </label>
      <button class="primary-button" type="submit">Save changes</button>
    </form>
  `;
}

function renderOrderSuccessSheet() {
  return `
    <div class="empty-state">
      <strong>Order submitted</strong>
      <span>Your demo order is confirmed. In a Kodular rebuild this state can map to a checkout success screen or confirmation card.</span>
      <button class="primary-button" type="button" data-action="close-sheet">Back to app</button>
    </div>
  `;
}

function renderHealthFields(type) {
  switch (type) {
    case "Walk":
      return `
        <label class="sheet-field">
          <span>Walk minutes</span>
          <input type="number" name="value" min="1" step="1" placeholder="25">
        </label>
        <label class="sheet-field">
          <span>Walk note</span>
          <textarea name="note" placeholder="Breezy route, shaded path, easy water stop."></textarea>
        </label>
      `;
    case "Meal":
      return `
        <label class="sheet-field">
          <span>Meal name</span>
          <input type="text" name="value" placeholder="Dinner">
        </label>
        <label class="sheet-field">
          <span>Meal note</span>
          <textarea name="note" placeholder="Half pouch and healthy treat cubes."></textarea>
        </label>
      `;
    case "Weight":
      return `
        <label class="sheet-field">
          <span>Weight (kg)</span>
          <input type="number" name="value" min="0.1" step="0.1" placeholder="6.5">
        </label>
        <label class="sheet-field">
          <span>Weight note</span>
          <textarea name="note" placeholder="Stable after morning walk."></textarea>
        </label>
      `;
    default:
      return `
        <label class="sheet-field">
          <span>Mood</span>
          <select name="value">
            ${["Playful", "Calm", "Sleepy", "Anxious"].map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join("")}
          </select>
        </label>
        <label class="sheet-field">
          <span>Mood note</span>
          <textarea name="note" placeholder="Relaxed in the carrier and comfortable with short stops."></textarea>
        </label>
      `;
  }
}

function renderWeightChart() {
  const points = getWeightLogs().slice(-6);
  const values = points.map((item) => Number(item.value));
  const min = Math.min.apply(null, values);
  const max = Math.max.apply(null, values);
  const range = Math.max(max - min, 0.6);
  const width = 320;
  const height = 160;
  const path = points.map((item, index) => {
    const x = 20 + ((width - 40) / Math.max(points.length - 1, 1)) * index;
    const y = 18 + ((height - 40) * (1 - ((Number(item.value) - min) / range)));
    return `${index === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");

  return `
    <div class="chart-wrap">
      <svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Weight chart">
        <line x1="20" y1="${height - 20}" x2="${width - 20}" y2="${height - 20}" class="chart-axis"></line>
        <line x1="20" y1="18" x2="20" y2="${height - 20}" class="chart-axis"></line>
        <path d="${path}" class="chart-line"></path>
        ${points.map((item, index) => {
          const x = 20 + ((width - 40) / Math.max(points.length - 1, 1)) * index;
          const y = 18 + ((height - 40) * (1 - ((Number(item.value) - min) / range)));
          return `
            <circle cx="${x}" cy="${y}" r="4" class="chart-point"></circle>
            <text x="${x}" y="${height - 4}" text-anchor="middle" class="chart-label">${escapeHtml(formatShortDate(item.timestamp))}</text>
          `;
        }).join("")}
      </svg>
    </div>
  `;
}

function renderSkeleton(type) {
  if (type === "grid") {
    return `
      <div class="screen skeleton-grid">
        <div class="skeleton-block tall"></div>
        <div class="skeleton-grid-two">
          <div class="skeleton-block"></div>
          <div class="skeleton-block"></div>
          <div class="skeleton-block"></div>
          <div class="skeleton-block"></div>
        </div>
      </div>
    `;
  }

  if (type === "home") {
    return `
      <div class="screen skeleton-grid">
        <div class="skeleton-block header"></div>
        <div class="skeleton-block hero"></div>
        <div class="skeleton-block medium"></div>
        <div class="skeleton-block medium"></div>
      </div>
    `;
  }

  return `
    <div class="screen skeleton-grid">
      <div class="skeleton-block header"></div>
      <div class="skeleton-block medium"></div>
      <div class="skeleton-block medium"></div>
      <div class="skeleton-block medium"></div>
    </div>
  `;
}

function handleClick(event) {
  const actionNode = event.target.closest("[data-action]");
  const navNode = event.target.closest("[data-view-target]");

  if (navNode) {
    switchView(navNode.dataset.viewTarget);
    return;
  }

  if (!actionNode) {
    return;
  }

  const action = actionNode.dataset.action;

  switch (action) {
    case "jump-view":
      switchView(actionNode.dataset.view);
      break;
    case "open-profile":
      switchView("myProfile");
      break;
    case "go-back-main":
      switchView(state.session.previousMainView || state.session.currentMainView || "home");
      break;
    case "open-auth":
      openSheet("auth", { mode: actionNode.dataset.mode || "login", reason: actionNode.dataset.reason || "" });
      break;
    case "close-sheet":
      closeSheet();
      break;
    case "auth-segment":
      state.ui.authMode = actionNode.dataset.mode || "login";
      renderSheet();
      break;
    case "toggle-password":
      togglePasswordField(actionNode);
      break;
    case "generate-plan":
      if (requireAuth("ai planner")) {
        return;
      }
      generateSafePlan(state.ui.plannerInputs);
      break;
    case "set-home-region":
      state.ui.discover.region = actionNode.dataset.region;
      state.uiPrefs.mapRegion = state.ui.discover.region;
      state.ui.discover.focusedPlaceId = getFirstPlaceIdForRegion(state.ui.discover.region);
      state.ui.plannerInputs.city = REGION_DEFAULT_CITY[state.ui.discover.region];
      saveState("uiPrefs");
      renderHome();
      renderAI();
      renderDiscover();
      break;
    case "set-planner-input":
      state.ui.plannerInputs[actionNode.dataset.field] = actionNode.dataset.value;
      if (actionNode.dataset.field === "destinationType") {
        state.ui.ai.scenario = getScenarioForDestination(actionNode.dataset.value);
        state.planner.selectedScenario = state.ui.ai.scenario;
      }
      saveState("planner");
      renderHome();
      renderAI();
      break;
    case "set-ai-scenario":
      state.ui.ai.scenario = actionNode.dataset.scenario || "Weekend walk";
      applyScenarioToPlanner(state.ui.ai.scenario);
      state.planner.selectedScenario = state.ui.ai.scenario;
      saveState("planner");
      renderAI();
      break;
    case "set-discover-region":
      state.ui.discover.region = actionNode.dataset.region;
      state.uiPrefs.mapRegion = state.ui.discover.region;
      state.ui.discover.focusedPlaceId = getFirstFilteredPlaceId();
      saveState("uiPrefs");
      renderDiscover();
      break;
    case "set-discover-category":
      state.ui.discover.category = actionNode.dataset.category;
      state.ui.discover.focusedPlaceId = getFirstFilteredPlaceId();
      renderDiscover();
      break;
    case "set-map-style":
      state.ui.discover.mapStyle = actionNode.dataset.style;
      renderDiscover();
      break;
    case "focus-map-place":
      state.ui.discover.focusedPlaceId = actionNode.dataset.placeId;
      renderDiscover();
      break;
    case "map-preview-zoom":
      showToast("Static map preview only. In Kodular this maps to built-in zoom controls.", "info");
      break;
    case "open-place":
      openSheet("placeDetail", { placeId: actionNode.dataset.placeId });
      break;
    case "toggle-save-place":
      if (requireAuth("save place")) {
        return;
      }
      toggleSavedPlace(actionNode.dataset.placeId);
      break;
    case "set-community-topic":
      state.ui.community.topic = actionNode.dataset.topic;
      renderCommunity();
      break;
    case "open-post":
      openSheet("postDetail", { postId: actionNode.dataset.postId });
      break;
    case "toggle-like-post":
      if (requireAuth("like post")) {
        return;
      }
      toggleLikedPost(actionNode.dataset.postId);
      break;
    case "toggle-save-post":
      if (requireAuth("save post")) {
        return;
      }
      toggleSavedPost(actionNode.dataset.postId);
      break;
    case "open-create-post":
      if (requireAuth("create post")) {
        return;
      }
      openSheet("createPost", {});
      break;
    case "cycle-illustration":
      state.ui.community.draftIllustration = (state.ui.community.draftIllustration + 1) % CREATE_POST_ILLUSTRATIONS.length;
      renderSheet();
      break;
    case "set-shop-category":
      state.ui.shop.category = actionNode.dataset.category;
      renderShop();
      break;
    case "open-product":
      openSheet("productDetail", { productId: actionNode.dataset.productId, qty: 1 });
      break;
    case "product-qty":
      if (state.ui.sheet.type === "productDetail" && state.ui.sheet.payload) {
        const nextQty = clamp(Number(state.ui.sheet.payload.qty || 1) + Number(actionNode.dataset.direction || 0), 1, 9);
        state.ui.sheet.payload.qty = nextQty;
        renderSheet();
      }
      break;
    case "add-to-cart":
      addToCart(actionNode.dataset.productId, Number(actionNode.dataset.qty || (state.ui.sheet.payload && state.ui.sheet.payload.qty) || 1));
      break;
    case "open-cart":
      openSheet("cart", {});
      break;
    case "cart-qty":
      changeCartQty(actionNode.dataset.productId, Number(actionNode.dataset.direction || 0));
      break;
    case "remove-cart-item":
      removeCartItem(actionNode.dataset.productId);
      break;
    case "checkout-cart":
      if (requireAuth("checkout")) {
        return;
      }
      if (!state.shop.cart.length) {
        showToast("Your member cart is empty.", "error");
        return;
      }
      state.shop.cart = [];
      saveState("shop");
      openSheet("orderSuccess", {});
      updateCartBadge();
      renderShop();
      break;
    case "open-health-log":
      state.ui.healthLogType = actionNode.dataset.type || "Walk";
      if (requireAuth("health log")) {
        return;
      }
      openSheet("healthLog", {});
      break;
    case "set-health-log-type":
      state.ui.healthLogType = actionNode.dataset.type || "Walk";
      renderSheet();
      break;
    case "open-edit-profile":
      if (requireAuth("edit profile")) {
        return;
      }
      openSheet("editProfile", {});
      break;
    case "toggle-setting":
      if (requireAuth("change settings")) {
        return;
      }
      state.user.preferences[actionNode.dataset.setting] = !state.user.preferences[actionNode.dataset.setting];
      saveState("user");
      renderMyProfile();
      break;
    case "logout":
      handleLogout();
      break;
    case "mock-message":
      showToast(actionNode.dataset.message || "Demo action", "info");
      break;
    default:
      break;
  }
}

function handleInput(event) {
  const target = event.target;
  if (target.matches('[data-role="discover-search"]')) {
    state.ui.discover.search = target.value.trim();
    state.ui.discover.focusedPlaceId = getFirstFilteredPlaceId();
    renderDiscover();
    return;
  }

  const authForm = target.closest('[data-form="auth"]');
  if (authForm) {
    const validation = validateAuthForm(state.ui.authMode);
    writeFieldErrors(validation.errors);
  }
}

function handleSubmit(event) {
  const form = event.target.closest("form");
  if (!form) {
    return;
  }

  event.preventDefault();

  switch (form.dataset.form) {
    case "auth":
      if (state.ui.authMode === "register") {
        handleRegister(form);
      } else {
        handleLogin(form);
      }
      break;
    case "create-post":
      handleCreatePost(form);
      break;
    case "health-log":
      handleHealthLog(form);
      break;
    case "ai-prompt":
      handleAiPromptSubmit(form);
      break;
    case "edit-profile":
      handleProfileSave(form);
      break;
    default:
      break;
  }
}

function handleConnectivityChange() {
  state.ui.offline = !navigator.onLine;
  updateOfflineBanner();
  if (state.ui.offline) {
    clearLiveTimers();
  } else {
    startRealtimeSimulations();
  }
}

function switchView(viewName, options = {}) {
  if (!viewName || !dom.views[viewName]) {
    return;
  }

  const firstVisit = !state.ui.viewVisited.has(viewName);
  if (state.ui.currentView && state.ui.currentView !== viewName) {
    state.session.previousMainView = state.ui.currentView;
  }
  state.ui.currentView = viewName;
  state.session.currentMainView = viewName;
  state.ui.viewVisited.add(viewName);
  saveState("session");

  if (firstVisit && !options.skipLoading) {
    state.ui.viewLoading[viewName] = true;
    renderApp();
    window.setTimeout(() => {
      state.ui.viewLoading[viewName] = false;
      renderApp();
    }, viewName === "home" ? 900 : 500);
  } else {
    renderApp();
  }

  dom.appScrollRegion.scrollTo({ top: 0, behavior: "smooth" });
}

function isViewLoading(viewName) {
  return Boolean(state.ui.viewLoading[viewName]);
}

function openSheet(type, payload) {
  if (type === "auth") {
    openAuthOverlay((payload && payload.mode) || "login", (payload && payload.reason) || "");
    return;
  }
  state.ui.sheet = { type, payload: payload || {} };
  renderSheet();
}

function closeSheet() {
  state.ui.sheet = { type: "", payload: null };
  renderSheet();
}

function showToast(message, type) {
  const toast = document.createElement("div");
  toast.className = `toast ${type || "info"}`;
  toast.textContent = message;
  dom.toastStack.appendChild(toast);
  window.setTimeout(() => {
    toast.classList.add("toast-leave");
    window.setTimeout(() => toast.remove(), 180);
  }, 2400);
}

function isGuestMode() {
  return !state.session.authenticated || state.session.mode === "guest";
}

function requireAuth(actionName) {
  if (!isGuestMode()) {
    return false;
  }
  state.session.authPromptSeen = true;
  saveState("session");
  showToast("Sign in to continue.", "info");
  openAuthOverlay(state.user.email ? "login" : "register", actionName || "");
  return true;
}

function getFeatureAccessMap() {
  return [
    { title: "Trusted place saves", copy: "Keep reliable cafes, parks, hotels, and vets for later.", memberOnly: true },
    { title: "Structured AI plans", copy: "Generate safe, policy-aware city routes with backup vet notes.", memberOnly: true },
    { title: "Health tracking", copy: "Log weight, walks, meals, and mood over time.", memberOnly: true },
    { title: "Guest browsing", copy: "Explore the home preview, map, community, and shop before signing in.", memberOnly: false }
  ];
}

function validateAuthForm(mode) {
  const values = getAuthFormValues();
  const errors = {};

  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email.";
  }

  if (!values.password || values.password.length < 6) {
    errors.password = "Use at least 6 characters.";
  }

  if (mode === "register") {
    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match.";
    }
    if (!values.petName) {
      errors.petName = "Enter your pet name.";
    }
    if (!values.petType) {
      errors.petType = "Select a pet type.";
    }
    if (!values.size) {
      errors.size = "Select a size.";
    }
  }

  return { values, errors, valid: !Object.keys(errors).length };
}

function getAuthFormValues() {
  const root = getAuthRoot();
  const form = root ? root.querySelector('[data-form="auth"]') : null;
  if (!form) {
    return {};
  }
  const data = new FormData(form);
  return {
    email: String(data.get("email") || "").trim(),
    password: String(data.get("password") || "").trim(),
    confirmPassword: String(data.get("confirmPassword") || "").trim(),
    petName: String(data.get("petName") || "").trim(),
    petType: String(data.get("petType") || "").trim(),
    breed: String(data.get("breed") || "").trim(),
    size: String(data.get("size") || "").trim()
  };
}

function writeFieldErrors(errors) {
  const root = getAuthRoot();
  if (!root) {
    return;
  }
  Array.from(root.querySelectorAll("[data-error-for]")).forEach((node) => {
    const key = node.dataset.errorFor;
    node.textContent = errors[key] || "";
  });
}

function handleRegister() {
  const validation = validateAuthForm("register");
  writeFieldErrors(validation.errors);
  if (!validation.valid) {
    showToast("Please fix the highlighted fields.", "error");
    return;
  }

  state.user.email = validation.values.email;
  state.user.password = validation.values.password;
  state.user.ownerName = state.user.ownerName || deriveOwnerName(validation.values.email);
  state.pet.name = validation.values.petName;
  state.pet.type = validation.values.petType;
  state.pet.breed = validation.values.breed;
  state.pet.size = validation.values.size;
  state.pet.city = REGION_DEFAULT_CITY[state.ui.discover.region];
  state.pet.heatSensitivity = state.pet.heatSensitivity || "Medium";
  state.session.authenticated = true;
  state.session.mode = "member";
  state.session.lastLoginAt = new Date().toISOString();
  absorbGuestCartIntoMemberCart();
  saveAllState();
  closeAuthOverlay();
  state.ui.viewLoading.home = true;
  renderApp();
  window.setTimeout(() => {
    state.ui.viewLoading.home = false;
    renderApp();
  }, 900);
  showToast("Account created. Member features are now unlocked.", "success");
}

function handleLogin() {
  const validation = validateAuthForm("login");
  writeFieldErrors(validation.errors);
  if (!validation.valid) {
    showToast("Please fix the highlighted fields.", "error");
    return;
  }

  if (!state.user.email || !state.user.password) {
    setAuthMessage("No saved account found yet. Switch to Register to create one.");
    showToast("No saved account found. Create one first.", "error");
    return;
  }

  if (validation.values.email !== state.user.email || validation.values.password !== state.user.password) {
    setAuthMessage("Email or password does not match the saved demo account.");
    showToast("Login failed. Check your email and password.", "error");
    return;
  }

  state.session.authenticated = true;
  state.session.mode = "member";
  state.session.lastLoginAt = new Date().toISOString();
  absorbGuestCartIntoMemberCart();
  saveAllState();
  closeAuthOverlay();
  state.ui.viewLoading.home = true;
  renderApp();
  window.setTimeout(() => {
    state.ui.viewLoading.home = false;
    renderApp();
  }, 900);
  showToast("Welcome back. Member tools are ready.", "success");
}

function absorbGuestCartIntoMemberCart() {
  if (!state.shop.guestCart.length) {
    return;
  }
  state.shop.guestCart.forEach((guestItem) => {
    const existing = state.shop.cart.find((item) => item.productId === guestItem.productId);
    if (existing) {
      existing.qty += guestItem.qty;
    } else {
      state.shop.cart.push({ productId: guestItem.productId, qty: guestItem.qty });
    }
  });
  state.shop.guestCart = [];
  state.shop.guestCartPreviewCount = 0;
}

function togglePasswordField(button) {
  const input = button.parentElement && button.parentElement.querySelector("input");
  if (!input) {
    return;
  }
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const hidden = input.type === "password";
  input.type = hidden ? "text" : "password";
  button.innerHTML = renderEyeIcon(hidden);
  try {
    input.setSelectionRange(start, end);
  } catch (error) {
    return;
  }
}

function generateSafePlan(inputs) {
  const city = normalizePlannerCity(inputs.city);
  const template = (plannerTemplates[city] && plannerTemplates[city][inputs.destinationType]) || null;
  const region = normalizeRegion(city);
  const regionPlaces = getPlacesByRegion(region);
  const fallbackStops = regionPlaces.slice(0, 3).map((place, index) => ({
    time: `${9 + index}:0${index}`,
    title: place.name,
    note: place.badges.slice(0, 2).join(", ")
  }));

  const result = template ? clone(template) : {
    headline: `Plan a calm ${inputs.destinationType.toLowerCase()} route in ${city}`,
    route: `Start early, keep water ready, and favor places with verified policy notes and nearby support.`,
    stops: fallbackStops,
    caution: inputs.heatSensitivity === "High" ? "Keep stops short and prioritize indoor cooling or shaded outdoor breaks." : "Check pavement temperature and reduce midday exposure.",
    policy: "Bring a leash or stroller based on the listed venue rule.",
    vet: (regionPlaces[0] && regionPlaces[0].nearbyVet) || "Nearby companion vet"
  };

  result.safetyTips = [
    `${inputs.petSize} pet profile selected for route timing.`,
    `${inputs.heatSensitivity} heat sensitivity applied to walking pace and stop length.`,
    "Pack water, wipes, and a carrier or stroller when rules require it."
  ];

  if (inputs.heatSensitivity === "High") {
    result.caution += " Heat-sensitive mode added extra cooling emphasis.";
  }

  if (inputs.destinationType === "Mall") {
    result.policy = "Stroller likely required in shared corridors. Confirm indoor access before arrival.";
  }

  state.planner.lastInputs = clone(inputs);
  state.planner.lastResult = clone(result);
  state.planner.history = [clone(result)].concat(state.planner.history).slice(0, 4);
  state.planner.selectedScenario = state.ui.ai.scenario;
  state.planner.messages = buildAiMessagesFromResult(result, state.ui.ai.scenario);
  saveState("planner");
  renderHome();
  renderAI();
}

function startRealtimeSimulations() {
  if (state.ui.offline) {
    return;
  }
  clearLiveTimers();

  if (!state.ui.liveFlags.reviewInjected) {
    state.ui.timers.review = window.setTimeout(() => {
      injectLiveReview();
    }, 8000);
  }

  if (!state.ui.liveFlags.commentBoosted) {
    state.ui.timers.comments = window.setTimeout(() => {
      boostLiveComments();
    }, 5200);
  }
}

function clearLiveTimers() {
  if (state.ui.timers.review) {
    window.clearTimeout(state.ui.timers.review);
    state.ui.timers.review = null;
  }
  if (state.ui.timers.comments) {
    window.clearTimeout(state.ui.timers.comments);
    state.ui.timers.comments = null;
  }
}

function injectLiveReview() {
  if (state.ui.liveFlags.reviewInjected) {
    return;
  }
  const place = getPlaceById("harbour-tails") || places[0];
  if (!place) {
    return;
  }
  place.latestReviews.unshift({
    author: "New verified report",
    time: "Just now",
    text: "Terrace seating is still pet-friendly this afternoon and staff confirmed water bowls are available."
  });
  place.latestReviews = place.latestReviews.slice(0, 4);
  place.verifiedReviews += 1;
  place.justUpdated = true;
  place.liveUpdated = true;
  state.ui.liveFlags.reviewInjected = true;
  renderHome();
  renderDiscover();
  if (state.ui.sheet.type === "placeDetail" && state.ui.sheet.payload && state.ui.sheet.payload.placeId === place.id) {
    renderSheet();
  }
  showToast("New verified review added near Central.", "success");
}

function boostLiveComments() {
  if (state.ui.liveFlags.commentBoosted) {
    return;
  }
  const post = posts[0];
  if (!post) {
    return;
  }
  state.community.commentCounts[post.id] = getCommentCount(post) + 1;
  state.ui.liveFlags.commentBoosted = true;
  saveState("community");
  renderCommunity();
}

function addToCart(productId, qty) {
  const quantity = clamp(Number(qty || 1), 1, 9);
  const targetKey = isGuestMode() ? "guestCart" : "cart";
  const target = state.shop[targetKey];
  const existing = target.find((item) => item.productId === productId);

  if (existing) {
    existing.qty += quantity;
  } else {
    target.push({ productId, qty: quantity });
  }

  if (isGuestMode()) {
    state.shop.guestCartPreviewCount += quantity;
  }

  saveState("shop");
  updateCartBadge();
  renderShop();
  if (state.ui.sheet.type === "productDetail") {
    closeSheet();
  }
  showToast(isGuestMode() ? "Added to guest preview cart." : "Added to cart.", "success");
}

function changeCartQty(productId, delta) {
  const target = isGuestMode() ? state.shop.guestCart : state.shop.cart;
  const item = target.find((entry) => entry.productId === productId);
  if (!item) {
    return;
  }
  item.qty = clamp(item.qty + delta, 0, 99);
  if (!item.qty) {
    const next = target.filter((entry) => entry.productId !== productId);
    if (isGuestMode()) {
      state.shop.guestCart = next;
    } else {
      state.shop.cart = next;
    }
  }
  saveState("shop");
  updateCartBadge();
  renderSheet();
}

function removeCartItem(productId) {
  if (isGuestMode()) {
    state.shop.guestCart = state.shop.guestCart.filter((entry) => entry.productId !== productId);
  } else {
    state.shop.cart = state.shop.cart.filter((entry) => entry.productId !== productId);
  }
  saveState("shop");
  updateCartBadge();
  renderSheet();
}

function getCartDetails() {
  const source = isGuestMode() ? state.shop.guestCart : state.shop.cart;
  return source.map((item) => ({
    qty: item.qty,
    product: getProductById(item.productId)
  })).filter((entry) => entry.product);
}

function getCartCount() {
  const source = isGuestMode() ? state.shop.guestCart : state.shop.cart;
  return source.reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal() {
  return getCartDetails().reduce((sum, item) => sum + item.qty * item.product.price, 0);
}

function handleCreatePost(form) {
  if (requireAuth("create post")) {
    return;
  }
  const data = new FormData(form);
  const caption = String(data.get("caption") || "").trim();
  const location = String(data.get("location") || "").trim();
  const tag = String(data.get("tag") || "").trim();

  if (!caption || !location || !tag) {
    showToast("Add a caption, location, and tag.", "error");
    return;
  }

  const visuals = [ASSETS.communityOne, ASSETS.communityTwo];
  state.community.customPosts.unshift({
    id: `custom-post-${Date.now()}`,
    user: getOwnerName(),
    petName: state.pet.name || "Buddy",
    location,
    caption,
    tags: [tag],
    likes: 0,
    comments: 0,
    verifiedVisit: false,
    image: visuals[state.ui.community.draftIllustration % visuals.length]
  });
  saveState("community");
  closeSheet();
  renderCommunity();
  showToast("Post created in local demo state.", "success");
}

function handleHealthLog(form) {
  if (requireAuth("health log")) {
    return;
  }
  const data = new FormData(form);
  const value = String(data.get("value") || "").trim();
  const note = String(data.get("note") || "").trim();
  if (!value) {
    showToast("Add a value before saving.", "error");
    return;
  }

  const entry = {
    id: `health-${Date.now()}`,
    type: state.ui.healthLogType,
    value: state.ui.healthLogType === "Weight" ? Number(value) : value,
    note,
    timestamp: new Date().toISOString(),
    label: `${state.ui.healthLogType} update`
  };

  state.health.logs.unshift(entry);
  if (state.ui.healthLogType === "Weight") {
    state.health.currentWeight = Number(value);
  }
  if (state.ui.healthLogType === "Mood") {
    state.pet.mood = value;
    saveState("pet");
  }
  saveState("health");
  closeSheet();
  renderHealth();
  renderHome();
  showToast("Health log saved.", "success");
}

function handleAiPromptSubmit(form) {
  if (requireAuth("ai chat")) {
    return;
  }
  const data = new FormData(form);
  const prompt = String(data.get("prompt") || "").trim();
  if (!prompt) {
    showToast("Enter a follow-up question first.", "error");
    return;
  }

  state.planner.draftPrompt = "";
  state.planner.messages = getAiMessages().concat([
    { role: "user", text: prompt, timestamp: new Date().toISOString(), type: "follow-up" },
    { role: "assistant", text: getMockAiReply(prompt), timestamp: new Date().toISOString(), type: "follow-up" }
  ]).slice(-6);
  saveState("planner");
  renderAI();
  form.reset();
  showToast("Mock AI reply added.", "success");
}

function handleProfileSave(form) {
  if (requireAuth("edit profile")) {
    return;
  }
  const data = new FormData(form);
  state.user.ownerName = String(data.get("ownerName") || "").trim() || state.user.ownerName;
  state.pet.name = String(data.get("petName") || "").trim();
  state.pet.type = String(data.get("petType") || "").trim();
  state.pet.size = String(data.get("size") || "").trim();
  state.pet.breed = String(data.get("breed") || "").trim();
  state.pet.age = String(data.get("age") || "").trim();
  state.pet.city = String(data.get("city") || "").trim();
  state.pet.heatSensitivity = String(data.get("heatSensitivity") || "").trim();
  saveState("user");
  saveState("pet");
  closeSheet();
  renderHome();
  renderAI();
  renderMyProfile();
  showToast("Profile updated.", "success");
}

function handleLogout() {
  state.session.authenticated = false;
  state.session.mode = "guest";
  state.ui.currentView = "home";
  state.session.currentMainView = "home";
  closeSheet();
  saveState("session");
  renderApp();
  showToast("Logged out. You are now browsing as a guest.", "info");
}

function getFilteredPlaces() {
  return places.filter((place) => {
    const matchesRegion = place.region === state.ui.discover.region;
    const matchesCategory = state.ui.discover.category === "All" || place.category === state.ui.discover.category;
    const term = state.ui.discover.search.toLowerCase();
    const matchesSearch = !term || `${place.name} ${place.area} ${place.city} ${place.badges.join(" ")}`.toLowerCase().includes(term);
    return matchesRegion && matchesCategory && matchesSearch;
  });
}

function getFilteredPlacesForMap(region) {
  return places.filter((place) => {
    if (place.region !== region) {
      return false;
    }
    if (state.ui.discover.category !== "All" && place.category !== state.ui.discover.category) {
      return false;
    }
    const term = state.ui.discover.search.toLowerCase();
    if (!term) {
      return true;
    }
    return `${place.name} ${place.area} ${place.city}`.toLowerCase().includes(term);
  });
}

function getPlacesByRegion(region) {
  return places.filter((place) => place.region === region);
}

function getCommunityFeed() {
  const merged = state.community.customPosts.concat(posts);
  if (state.ui.community.topic === "All") {
    return merged;
  }
  return merged.filter((post) => post.tags.includes(state.ui.community.topic));
}

function getFilteredProducts() {
  if (state.ui.shop.category === "All") {
    return products;
  }
  return products.filter((product) => product.category === state.ui.shop.category);
}

function getSortedHealthLogs() {
  return clone(state.health.logs).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

function getWeightLogs() {
  const weights = getSortedHealthLogs().filter((entry) => entry.type === "Weight").reverse();
  if (weights.length) {
    return weights;
  }
  return [{ value: state.health.currentWeight || 6.4, timestamp: new Date().toISOString() }];
}

function getWeightLabel() {
  return `${Number(state.health.currentWeight || 0).toFixed(1)} kg`;
}

function toggleSavedPlace(placeId) {
  if (state.saved.placeIds.includes(placeId)) {
    state.saved.placeIds = state.saved.placeIds.filter((id) => id !== placeId);
    showToast("Place removed from saved list.", "info");
  } else {
    state.saved.placeIds.push(placeId);
    showToast("Place saved.", "success");
  }
  saveState("saved");
  renderDiscover();
  renderMyProfile();
  if (state.ui.sheet.type === "placeDetail") {
    renderSheet();
  }
}

function toggleLikedPost(postId) {
  const liked = state.community.likedPostIds.includes(postId);
  if (liked) {
    state.community.likedPostIds = state.community.likedPostIds.filter((id) => id !== postId);
  } else {
    state.community.likedPostIds.push(postId);
  }
  saveState("community");
  renderCommunity();
  if (state.ui.sheet.type === "postDetail") {
    renderSheet();
  }
}

function toggleSavedPost(postId) {
  if (state.saved.postIds.includes(postId)) {
    state.saved.postIds = state.saved.postIds.filter((id) => id !== postId);
    showToast("Post removed from saved list.", "info");
  } else {
    state.saved.postIds.push(postId);
    showToast("Post saved.", "success");
  }
  saveState("saved");
  renderCommunity();
  renderMyProfile();
  if (state.ui.sheet.type === "postDetail") {
    renderSheet();
  }
}

function getAuthPromptMessage() {
  const reason = (state.ui.authOverlay && state.ui.authOverlay.reason) || (state.ui.sheet.payload && state.ui.sheet.payload.reason);
  if (reason) {
    return `Sign in to continue with ${reason}. Guests can keep browsing the rest of the demo.`;
  }
  return "Guests can browse first. Sign in when you want to unlock saved data, AI planning, posting, checkout, or health logs.";
}

function getFocusedPlace(list) {
  const source = list || getFilteredPlacesForMap(state.ui.discover.region);
  return source.find((place) => place.id === state.ui.discover.focusedPlaceId) || source[0] || null;
}

function getFirstPlaceIdForRegion(region) {
  const first = getPlacesByRegion(region)[0];
  return first ? first.id : "";
}

function getFirstFilteredPlaceId() {
  const first = getFilteredPlaces()[0] || getFilteredPlacesForMap(state.ui.discover.region)[0];
  return first ? first.id : "";
}

function getMapAsset(region) {
  if (region === "macau") {
    return ASSETS.mapMacau;
  }
  if (region === "mainland") {
    return ASSETS.mapMainland;
  }
  return ASSETS.mapHongKong;
}

function getMarkerIcon(place) {
  if (place.category === "Vets") {
    return ASSETS.markerVet;
  }
  if (place.category === "Cafes") {
    return ASSETS.markerCafe;
  }
  return ASSETS.markerVerified;
}

function getPlaceById(placeId) {
  return places.find((place) => place.id === placeId) || null;
}

function getPostById(postId) {
  return getCommunityFeed().find((post) => post.id === postId) || posts.find((post) => post.id === postId) || state.community.customPosts.find((post) => post.id === postId) || null;
}

function getProductById(productId) {
  return products.find((product) => product.id === productId) || null;
}

function isSavedPlace(placeId) {
  return state.saved.placeIds.includes(placeId);
}

function getCommentCount(post) {
  return state.community.commentCounts[post.id] || post.comments;
}

function getLiveReviewPlace() {
  return places.find((place) => place.justUpdated) || null;
}

function getAiScenarioOptions() {
  return ["Weekend walk", "Cafe stop", "Rainy day backup", "Hotel check-in"];
}

function getAiPreviewResult() {
  return state.planner.lastResult || {
    headline: "Plan a calm cafe-to-park route",
    route: "Start early, keep the outing shaded, and keep a backup vet nearby.",
    stops: [
      { time: "09:10", title: "Harbour Tails Cafe", note: "Terrace-only seating and water bowls." },
      { time: "10:00", title: "West Kowloon Paw Promenade", note: "Flat path with calmer breezes." },
      { time: "11:10", title: "Central Pet First Aid", note: "Backup stop if heat or policy changes." }
    ],
    policy: "Carrier or stroller where indoor rules require it.",
    caution: "Keep pavement time short after late morning.",
    vet: "Central Pet First Aid"
  };
}

function getAiMessages() {
  if (state.planner.messages && state.planner.messages.length) {
    return state.planner.messages;
  }
  return buildAiMessagesFromResult(getAiPreviewResult(), state.ui.ai.scenario);
}

function buildAiMessagesFromResult(result, scenario) {
  return [
    {
      role: "assistant",
      text: `${scenario}: ${result.headline}`,
      timestamp: new Date().toISOString(),
      type: "summary"
    },
    {
      role: "assistant",
      text: `Policy reminder: ${result.policy}`,
      timestamp: new Date().toISOString(),
      type: "policy"
    }
  ];
}

function applyScenarioToPlanner(scenario) {
  if (scenario === "Weekend walk") {
    state.ui.plannerInputs.destinationType = "Park";
    return;
  }
  if (scenario === "Cafe stop") {
    state.ui.plannerInputs.destinationType = "Cafe";
    return;
  }
  if (scenario === "Rainy day backup") {
    state.ui.plannerInputs.destinationType = "Mall";
    return;
  }
  state.ui.plannerInputs.destinationType = "Hotel";
}

function getScenarioForDestination(destination) {
  if (destination === "Park") {
    return "Weekend walk";
  }
  if (destination === "Cafe") {
    return "Cafe stop";
  }
  if (destination === "Mall") {
    return "Rainy day backup";
  }
  return "Hotel check-in";
}

function getMockAiReply(prompt) {
  const lower = prompt.toLowerCase();
  if (lower.includes("heat")) {
    return "Keep the route shorter, shift the first stop earlier, and prioritize indoor or shaded segments.";
  }
  if (lower.includes("stroller") || lower.includes("carrier")) {
    return "Bring the stroller for mall and hotel segments, and keep a leash ready for outdoor-only stops.";
  }
  if (lower.includes("vet")) {
    return "The closest backup contact remains Central Pet First Aid for this route.";
  }
  return "I would keep the current route, but shorten the second stop and confirm the policy before leaving.";
}

function renderAvatarButton() {
  return `
    <button class="avatar-button" type="button" data-action="open-profile" aria-label="Open My Profile">
      <img src="${state.pet.avatarImage || ASSETS.profilePet}" alt="">
    </button>
  `;
}

function renderPlannerChips(field, options, current) {
  return options.map((item) => `
    <button class="chip ${current === item ? "active" : ""}" type="button" data-action="set-planner-input" data-field="${escapeHtml(field)}" data-value="${escapeHtml(item)}">${escapeHtml(item)}</button>
  `).join("");
}

function renderStoryIcon(icon) {
  switch (icon) {
    case "cup":
    case "cafe":
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 7h9v6a4 4 0 0 1-4 4H9a3 3 0 0 1-3-3z"></path><path d="M15 9h1.5a2.5 2.5 0 0 1 0 5H15"></path><path d="M7 20h8"></path></svg>';
    case "cross":
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>';
    case "bag":
    case "travel":
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8h10l1 11H6L7 8z"></path><path d="M9 9V7a3 3 0 0 1 6 0v2"></path></svg>';
    case "moon":
    case "cozy":
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.5 3.5A8.5 8.5 0 1 0 20 15 7 7 0 0 1 16.5 3.5z"></path></svg>';
    case "park":
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 7 11h3l-2 4 6-6h-3z"></path><path d="M6 20h12"></path></svg>';
    default:
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7"></circle></svg>';
  }
}

function renderSearchIcon() {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"></circle><path d="m16 16 4 4"></path></svg>';
}

function renderEyeIcon(open) {
  if (open) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
  }
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3 21 21"></path><path d="M10.6 6.2A11.4 11.4 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-4.2 4.7"></path><path d="M6.4 6.8C3.8 8.3 2 12 2 12a16.4 16.4 0 0 0 8.5 5.8"></path><path d="M9.9 9.9A3 3 0 0 0 14 14"></path></svg>';
}

function normalizeRegion(city) {
  const value = String(city || "").toLowerCase();
  if (value.includes("macau")) {
    return "macau";
  }
  if (value.includes("shenzhen") || value.includes("guangzhou") || value.includes("mainland")) {
    return "mainland";
  }
  return "hongkong";
}

function normalizePlannerCity(city) {
  const value = String(city || "");
  if (value === "Hong Kong" || value === "Macau" || value === "Shenzhen" || value === "Guangzhou") {
    return value;
  }
  return REGION_LABELS[normalizeRegion(value)];
}

function getOwnerName() {
  return state.user.ownerName || deriveOwnerName(state.user.email) || "Guest";
}

function deriveOwnerName(email) {
  return String(email || "").split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (match) => match.toUpperCase()).trim();
}

function getDayPart() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "morning";
  }
  if (hour < 18) {
    return "afternoon";
  }
  return "evening";
}

function getPawPoints() {
  return 120 + state.saved.placeIds.length * 20 + state.saved.postIds.length * 10 + state.health.logs.length * 2;
}

function formatPrice(amount) {
  return `HK$${Number(amount).toFixed(0)}`;
}

function formatTimestamp(value) {
  const date = new Date(value);
  return date.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

function formatShortDate(value) {
  const date = new Date(value);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function sanitizeDisplayArtifacts(root) {
  if (!root || !root.innerHTML) {
    return;
  }
  root.innerHTML = root.innerHTML
    .replace(/鈥\?/g, " - ")
    .replace(/鈥/g, " - ");
}

function sanitizeDisplayArtifacts(root) {
  if (!root || !root.innerHTML) {
    return;
  }
  root.innerHTML = root.innerHTML
    .replace(/鈥\?/g, " - ")
    .replace(/鈥/g, " - ");
}

function sanitizeDisplayArtifacts(root) {
  if (!root || !root.innerHTML) {
    return;
  }
  root.innerHTML = root.innerHTML
    .replace(/—/g, " - ")
    .replace(/–/g, " - ")
    .replace(/&nbsp;/g, " ");
}

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function mergeDeep(target, source) {
  const output = Array.isArray(target) ? target.slice() : Object.assign({}, target);
  if (!source || typeof source !== "object") {
    return output;
  }
  Object.keys(source).forEach((key) => {
    const srcValue = source[key];
    if (Array.isArray(srcValue)) {
      output[key] = srcValue.slice();
      return;
    }
    if (srcValue && typeof srcValue === "object") {
      output[key] = mergeDeep(output[key] || {}, srcValue);
      return;
    }
    output[key] = srcValue;
  });
  return output;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function offsetTime(dayOffset) {
  const date = new Date();
  date.setDate(date.getDate() + Number(dayOffset || 0));
  return date.toISOString();
}

function cacheDom() {
  dom.offlineBanner = document.getElementById("offlineBanner");
  dom.appScrollRegion = document.getElementById("appScrollRegion");
  dom.bottomNav = document.getElementById("bottomNav");
  dom.contextFab = document.getElementById("contextFab");
  dom.contextFabLabel = document.getElementById("contextFabLabel");
  dom.cartBadge = document.getElementById("cartBadge");
  dom.sheetOverlay = document.getElementById("sheetOverlay");
  dom.sheetEyebrow = document.getElementById("sheetEyebrow");
  dom.sheetTitle = document.getElementById("sheetTitle");
  dom.sheetBody = document.getElementById("sheetBody");
  dom.toastStack = document.getElementById("toastStack");
  dom.aiOverlay = document.getElementById("aiOverlay");
  dom.aiOverlayBody = document.getElementById("aiOverlayBody");
  dom.aiOverlayComposer = document.getElementById("aiOverlayComposer");
  dom.authOverlay = document.getElementById("authOverlay");
  dom.authOverlayBody = document.getElementById("authOverlayBody");
  dom.views = {
    home: document.getElementById("home"),
    discover: document.getElementById("discover"),
    community: document.getElementById("community"),
    shop: document.getElementById("shop"),
    health: document.getElementById("health"),
    myProfile: document.getElementById("myProfile")
  };
}

function handleGuestEntry() {
  if (!state.session.authenticated) {
    state.session.authenticated = false;
    state.session.mode = "guest";
    state.session.currentMainView = "home";
    state.ui.currentView = "home";
    return;
  }
  state.session.mode = "member";
  state.ui.currentView = MAIN_VIEWS.includes(state.session.currentMainView) ? state.session.currentMainView : "home";
  state.session.currentMainView = state.ui.currentView;
}

function syncUiFromState() {
  state.ui.discover.region = state.uiPrefs.mapRegion || normalizeRegion(state.pet.city);
  state.ui.discover.focusedPlaceId = getFirstPlaceIdForRegion(state.ui.discover.region);
  state.ui.plannerInputs.city = state.session.authenticated ? normalizePlannerCity(state.pet.city) : REGION_DEFAULT_CITY[state.ui.discover.region];
  state.ui.plannerInputs.petSize = state.pet.size || "Medium";
  state.ui.plannerInputs.heatSensitivity = state.pet.heatSensitivity || "Medium";
  state.ui.ai.scenario = state.planner.selectedScenario || "Weekend walk";
  state.ui.ai.promptDraft = state.planner.draftPrompt || "";
  state.ui.aiOverlay.open = false;
  state.ui.authOverlay = state.ui.authOverlay || { open: false, reason: "" };
  state.planner.starterPrompts = state.planner.starterPrompts && state.planner.starterPrompts.length
    ? state.planner.starterPrompts
    : clone(DEFAULT_STATE.planner.starterPrompts);
}

function renderApp() {
  updateOfflineBanner();
  renderHome();
  renderDiscover();
  renderCommunity();
  renderShop();
  renderHealth();
  renderMyProfile();
  renderSheet();
  updateViewVisibility();
  updateBottomNav();
  updateCartBadge();
  updateFab();
  renderAI();
  renderAuthOverlay();
  Object.values(dom.views).forEach((viewNode) => sanitizeDisplayArtifacts(viewNode));
  sanitizeDisplayArtifacts(dom.aiOverlayBody);
  sanitizeDisplayArtifacts(dom.authOverlayBody);
  sanitizeDisplayArtifacts(dom.sheetBody);
}

function renderAI() {
  seedAiConversationIfEmpty();
  if (!dom.aiOverlay) {
    return;
  }
  dom.aiOverlay.classList.toggle("hidden", !state.ui.aiOverlay.open);
  dom.aiOverlay.classList.toggle("open", state.ui.aiOverlay.open);
  dom.aiOverlay.setAttribute("aria-hidden", String(!state.ui.aiOverlay.open));
  dom.aiOverlayBody.innerHTML = renderAiOverlayBody();
  dom.aiOverlayComposer.className = `ai-overlay-composer${isGuestMode() ? " locked" : ""}`;
  dom.aiOverlayComposer.innerHTML = renderAiOverlayComposer();
}

function updateFab() {
  if (!dom.contextFab) {
    return;
  }
  if (state.ui.aiOverlay.open) {
    dom.contextFab.classList.add("hidden");
    return;
  }
  if (state.ui.currentView === "home") {
    dom.contextFab.classList.remove("hidden", "fab-community");
    dom.contextFab.classList.add("fab-ai");
    dom.contextFab.dataset.action = "open-ai-overlay";
    dom.contextFab.setAttribute("aria-label", "Open PawPlanet AI");
    dom.contextFab.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v4M12 17v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M3 12h4M17 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"></path><circle cx="12" cy="12" r="4"></circle></svg><span>Ask AI</span>';
    return;
  }
  if (state.ui.currentView === "community") {
    dom.contextFab.classList.remove("hidden", "fab-ai");
    dom.contextFab.classList.add("fab-community");
    dom.contextFab.dataset.action = "open-create-post";
    dom.contextFab.setAttribute("aria-label", "Create a new post");
    dom.contextFab.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg><span>Post</span>';
    return;
  }
  dom.contextFab.classList.add("hidden");
}

function handleInput(event) {
  const target = event.target;
  if (target.matches('[data-role="discover-search"]')) {
    state.ui.discover.search = target.value.trim();
    state.ui.discover.focusedPlaceId = getFirstFilteredPlaceId();
    renderDiscover();
    return;
  }

  if (target.matches('#aiOverlayInput')) {
    state.planner.draftPrompt = target.value;
    saveState("planner");
    return;
  }

  const authForm = target.closest('[data-form="auth"]');
  if (authForm) {
    const validation = validateAuthForm(state.ui.authMode);
    writeFieldErrors(validation.errors);
  }
}

function handleSubmit(event) {
  const form = event.target.closest("form");
  if (!form) {
    return;
  }

  event.preventDefault();

  switch (form.dataset.form) {
    case "auth":
      if (state.ui.authMode === "register") {
        handleRegister(form);
      } else {
        handleLogin(form);
      }
      break;
    case "create-post":
      handleCreatePost(form);
      break;
    case "health-log":
      handleHealthLog(form);
      break;
    case "ai-prompt":
    case "ai-overlay":
      handleAiPromptSubmit(form);
      break;
    case "edit-profile":
      handleProfileSave(form);
      break;
    default:
      break;
  }
}

function handleClick(event) {
  const actionNode = event.target.closest("[data-action]");
  const navNode = event.target.closest("[data-view-target]");

  if (navNode) {
    closeAiOverlay(true);
    switchView(navNode.dataset.viewTarget);
    return;
  }

  if (!actionNode) {
    return;
  }

  const action = actionNode.dataset.action;

  switch (action) {
    case "jump-view":
      closeAiOverlay(true);
      switchView(actionNode.dataset.view);
      break;
    case "open-ai-overlay":
      openAiOverlay();
      break;
    case "close-ai-overlay":
      closeAiOverlay();
      break;
    case "use-ai-starter":
      if (requireAuth("ai chat")) {
        return;
      }
      sendAiPrompt(actionNode.dataset.prompt || "");
      break;
    case "open-auth":
      openAuthOverlay(actionNode.dataset.mode || "login", actionNode.dataset.reason || "");
      break;
    case "close-auth-overlay":
      closeAuthOverlay();
      break;
    case "close-sheet":
      closeSheet();
      break;
    case "auth-segment":
      state.ui.authMode = actionNode.dataset.mode || "login";
      renderAuthOverlay();
      break;
    case "toggle-password":
      togglePasswordField(actionNode);
      break;
    case "generate-plan":
      if (requireAuth("ai planner")) {
        return;
      }
      generateSafePlan(state.ui.plannerInputs);
      break;
    case "set-home-region":
      state.ui.discover.region = actionNode.dataset.region;
      state.uiPrefs.mapRegion = state.ui.discover.region;
      state.ui.discover.focusedPlaceId = getFirstPlaceIdForRegion(state.ui.discover.region);
      state.ui.plannerInputs.city = REGION_DEFAULT_CITY[state.ui.discover.region];
      saveState("uiPrefs");
      renderHome();
      renderDiscover();
      renderAI();
      break;
    case "set-planner-input":
      state.ui.plannerInputs[actionNode.dataset.field] = actionNode.dataset.value;
      saveState("planner");
      renderAI();
      break;
    case "set-discover-region":
      state.ui.discover.region = actionNode.dataset.region;
      state.uiPrefs.mapRegion = state.ui.discover.region;
      state.ui.discover.focusedPlaceId = getFirstFilteredPlaceId();
      saveState("uiPrefs");
      renderDiscover();
      break;
    case "set-discover-category":
      state.ui.discover.category = actionNode.dataset.category;
      state.ui.discover.focusedPlaceId = getFirstFilteredPlaceId();
      renderDiscover();
      break;
    case "set-map-style":
      state.ui.discover.mapStyle = actionNode.dataset.style;
      renderDiscover();
      break;
    case "focus-map-place":
      state.ui.discover.focusedPlaceId = actionNode.dataset.placeId;
      renderDiscover();
      break;
    case "map-preview-zoom":
      showToast("Static map preview only. In Kodular this maps to built-in zoom controls.", "info");
      break;
    case "open-place":
      openSheet("placeDetail", { placeId: actionNode.dataset.placeId });
      break;
    case "toggle-save-place":
      if (requireAuth("save place")) {
        return;
      }
      toggleSavedPlace(actionNode.dataset.placeId);
      break;
    case "set-community-topic":
      state.ui.community.topic = actionNode.dataset.topic;
      renderCommunity();
      break;
    case "open-post":
      openSheet("postDetail", { postId: actionNode.dataset.postId });
      break;
    case "toggle-like-post":
      if (requireAuth("like post")) {
        return;
      }
      toggleLikedPost(actionNode.dataset.postId);
      break;
    case "toggle-save-post":
      if (requireAuth("save post")) {
        return;
      }
      toggleSavedPost(actionNode.dataset.postId);
      break;
    case "open-create-post":
      if (requireAuth("create post")) {
        return;
      }
      openSheet("createPost", {});
      break;
    case "cycle-illustration":
      state.ui.community.draftIllustration = (state.ui.community.draftIllustration + 1) % CREATE_POST_ILLUSTRATIONS.length;
      renderSheet();
      break;
    case "set-shop-category":
      state.ui.shop.category = actionNode.dataset.category;
      renderShop();
      break;
    case "open-product":
      openSheet("productDetail", { productId: actionNode.dataset.productId, qty: 1 });
      break;
    case "product-qty":
      if (state.ui.sheet.type === "productDetail" && state.ui.sheet.payload) {
        const nextQty = clamp(Number(state.ui.sheet.payload.qty || 1) + Number(actionNode.dataset.direction || 0), 1, 9);
        state.ui.sheet.payload.qty = nextQty;
        renderSheet();
      }
      break;
    case "add-to-cart":
      addToCart(actionNode.dataset.productId, Number(actionNode.dataset.qty || (state.ui.sheet.payload && state.ui.sheet.payload.qty) || 1));
      break;
    case "open-cart":
      openSheet("cart", {});
      break;
    case "cart-qty":
      changeCartQty(actionNode.dataset.productId, Number(actionNode.dataset.direction || 0));
      break;
    case "remove-cart-item":
      removeCartItem(actionNode.dataset.productId);
      break;
    case "checkout-cart":
      if (requireAuth("checkout")) {
        return;
      }
      if (!state.shop.cart.length) {
        showToast("Your member cart is empty.", "error");
        return;
      }
      state.shop.cart = [];
      saveState("shop");
      openSheet("orderSuccess", {});
      updateCartBadge();
      renderShop();
      break;
    case "open-health-log":
      state.ui.healthLogType = actionNode.dataset.type || "Walk";
      if (requireAuth("health log")) {
        return;
      }
      openSheet("healthLog", {});
      break;
    case "set-health-log-type":
      state.ui.healthLogType = actionNode.dataset.type || "Walk";
      renderSheet();
      break;
    case "open-edit-profile":
      if (requireAuth("edit profile")) {
        return;
      }
      openSheet("editProfile", {});
      break;
    case "toggle-setting":
      if (requireAuth("change settings")) {
        return;
      }
      state.user.preferences[actionNode.dataset.setting] = !state.user.preferences[actionNode.dataset.setting];
      saveState("user");
      renderMyProfile();
      break;
    case "logout":
      handleLogout();
      break;
    case "mock-message":
      showToast(actionNode.dataset.message || "Demo action", "info");
      break;
    default:
      break;
  }
}

function switchView(viewName, options = {}) {
  if (!viewName || !dom.views[viewName]) {
    return;
  }

  const shouldPromptAuth = viewName === "myProfile" && isGuestMode() && !options.skipAuthPrompt;
  const firstVisit = !state.ui.viewVisited.has(viewName);
  if (state.ui.currentView && state.ui.currentView !== viewName) {
    state.session.previousMainView = state.ui.currentView;
  }
  closeAiOverlay(true);
  state.ui.currentView = viewName;
  state.session.currentMainView = viewName;
  state.ui.viewVisited.add(viewName);
  saveState("session");

  if (firstVisit && !options.skipLoading && !shouldPromptAuth) {
    state.ui.viewLoading[viewName] = true;
    renderApp();
    window.setTimeout(() => {
      state.ui.viewLoading[viewName] = false;
      renderApp();
    }, viewName === "home" ? 900 : 500);
  } else {
    renderApp();
  }

  if (shouldPromptAuth) {
    openAuthOverlay(state.user.email ? "login" : "register", "your profile");
  }

  dom.appScrollRegion.scrollTo({ top: 0, behavior: "smooth" });
}

function renderHeaderAction(viewName) {
  if (viewName !== "shop") {
    return "";
  }
  return `
    <button class="icon-button" type="button" data-action="open-cart" aria-label="Open cart">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 8h13l-1.2 6.5a2 2 0 0 1-2 1.5H9a2 2 0 0 1-2-1.6L5.5 6H3"></path>
        <circle cx="10" cy="19" r="1.5"></circle>
        <circle cx="17" cy="19" r="1.5"></circle>
      </svg>
    </button>
  `;
}

function renderHomeMarkup() {
  return isGuestMode() ? renderGuestHome() : renderMemberHomeCompact();
}

function renderGuestHome() {
  const guideSpot = getPlacesByRegion(state.ui.discover.region)[0];
  const socialPost = getCommunityFeed()[0];
  const shopPick = products[0];
  const careHint = state.health.reminders[0];
  return `
    <div class="screen home-screen">
      <header class="screen-header screen-header-solo">
        <div class="screen-header-copy">
          <p>PawPlanet</p>
          <h2>Pet-friendly city guide</h2>
          <span class="screen-header-note">Guest mode | ${escapeHtml(REGION_LABELS[state.ui.discover.region])}</span>
        </div>
      </header>

      <div class="pill-row home-region-row">
        ${Object.entries(REGION_LABELS).map(([value, label]) => `
          <button class="chip ${state.ui.discover.region === value ? "active" : ""}" type="button" data-action="set-home-region" data-region="${escapeHtml(value)}">${escapeHtml(label)}</button>
        `).join("")}
      </div>

      <section class="hero-card home-hero-card">
        <img class="hero-cover" src="${ASSETS.heroDog}" alt="Pet-friendly city lifestyle preview">
        <div class="hero-body">
          <p class="eyebrow">Cute, safe, and practical</p>
          <h3 class="home-hero-heading">Plan pet-friendly days without the fragmented search.</h3>
          <p class="card-copy">${escapeHtml(REGION_LABELS[state.ui.discover.region])} preview with trusted places, local tips, and light shopping before you sign in.</p>
          <div class="hero-actions">
            <button class="primary-button" type="button" data-action="jump-view" data-view="discover">Open Guide</button>
            <button class="secondary-button" type="button" data-action="open-ai-overlay">Ask Paw AI</button>
          </div>
        </div>
      </section>

      <div class="home-module-grid">
        ${renderHomeModuleCard({
          eyebrow: "Guide",
          title: guideSpot ? guideSpot.name : "Trusted nearby",
          detailA: guideSpot ? `${guideSpot.category} | ${guideSpot.distance}` : "Verified places nearby",
          detailB: guideSpot ? guideSpot.badges[0] : "Policy clarity first",
          image: guideSpot ? guideSpot.image : ASSETS.placeCafe,
          actionView: "discover",
          actionLabel: "Open Guide"
        })}
        ${renderHomeModuleCard({
          eyebrow: "Social",
          title: socialPost ? `${socialPost.user} with ${socialPost.petName}` : "Community notes",
          detailA: socialPost ? socialPost.location : "Local pet tips",
          detailB: socialPost ? socialPost.tags[0] : "Lifestyle support",
          image: socialPost ? socialPost.image : ASSETS.communityOne,
          actionView: "community",
          actionLabel: "Open Social"
        })}
        ${renderHomeModuleCard({
          eyebrow: "Shop",
          title: shopPick ? shopPick.name : "Travel essentials",
          detailA: shopPick ? formatPrice(shopPick.price) : "Cute but useful",
          detailB: shopPick ? shopPick.tag : "Travel support",
          image: shopPick ? shopPick.image : ASSETS.shopRaincoat,
          actionView: "shop",
          actionLabel: "Open Shop"
        })}
        ${renderHomeModuleCard({
          eyebrow: "Care",
          title: careHint ? careHint.title : "Daily care",
          detailA: getWeightLabel(),
          detailB: careHint ? careHint.detail : "Preview health logs and reminders",
          image: ASSETS.profilePet,
          actionView: "health",
          actionLabel: "Open Care"
        })}
      </div>
    </div>
  `;
}

function renderDiscoverPageMarkup() {
  const filteredPlaces = getFilteredPlaces();
  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Trust-first discovery</p>
          <h2>Discover</h2>
          <span class="screen-header-note">Clear policy notes and trusted reviews before you go.</span>
        </div>
        ${renderHeaderAction("discover")}
      </header>
      <div class="search-shell">
        <span class="search-icon" aria-hidden="true">${renderSearchIcon()}</span>
        <input id="discoverSearchCompact" data-role="discover-search" type="search" value="${escapeHtml(state.ui.discover.search)}" placeholder="Search place, city, or policy">
      </div>
      <div class="pill-row">
        ${Object.entries(REGION_LABELS).map(([value, label]) => `<button class="chip ${state.ui.discover.region === value ? "active" : ""}" type="button" data-action="set-discover-region" data-region="${escapeHtml(value)}">${escapeHtml(label)}</button>`).join("")}
      </div>
      <div class="pill-row">
        ${DISCOVER_CATEGORIES.map((label) => `<button class="chip ${state.ui.discover.category === label ? "active" : ""}" type="button" data-action="set-discover-category" data-category="${escapeHtml(label)}">${escapeHtml(label)}</button>`).join("")}
      </div>
      ${renderDiscoverMapModule({ compact: false })}
      <section class="place-list">
        ${filteredPlaces.map((place) => `
          <article class="place-card card">
            <button class="card-button" type="button" data-action="open-place" data-place-id="${escapeHtml(place.id)}">
              <img class="place-image" src="${place.image}" alt="${escapeHtml(place.name)}">
            </button>
            <div class="place-card-header">
              <div>
                <p class="eyebrow">${escapeHtml(place.category)}</p>
                <h3 class="place-title">${escapeHtml(place.name)}</h3>
                <p class="place-meta">${escapeHtml(place.distance)} | ${escapeHtml(place.badges[0])}</p>
              </div>
              <button class="ghost-button" type="button" data-action="toggle-save-place" data-place-id="${escapeHtml(place.id)}">${isGuestMode() ? "Sign in" : (isSavedPlace(place.id) ? "Saved" : "Save")}</button>
            </div>
          </article>
        `).join("") || `<div class="empty-state"><strong>No places match this filter</strong><span>Try another city or category to bring trusted pet-friendly spots back into view.</span></div>`}
      </section>
    </div>
  `;
}

function renderCommunityCompactMarkup() {
  const feed = getCommunityFeed();
  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Pet lifestyle community</p>
          <h2>Community</h2>
          <span class="screen-header-note">Practical pet notes without the social clutter.</span>
        </div>
        ${renderHeaderAction("community")}
      </header>
      <div class="topic-row">
        ${TOPIC_OPTIONS.map((topic) => `<button class="chip ${state.ui.community.topic === topic ? "active" : ""}" type="button" data-action="set-community-topic" data-topic="${escapeHtml(topic)}">${escapeHtml(topic)}</button>`).join("")}
      </div>
      <section class="story-row">
        ${storyHighlights.map((story) => `<button class="story-bubble" type="button" data-action="set-community-topic" data-topic="${escapeHtml(story.topic)}"><div class="story-avatar">${renderStoryIcon(story.icon)}</div><strong>${escapeHtml(story.title)}</strong><span>${escapeHtml(story.subtitle)}</span></button>`).join("")}
      </section>
      <section class="feed-list">
        ${feed.map((post) => `
          <article class="feed-card card">
            <button class="card-button" type="button" data-action="open-post" data-post-id="${escapeHtml(post.id)}">
              <img class="feed-image" src="${post.image}" alt="${escapeHtml(post.location)}">
            </button>
            <div class="feed-card-header">
              <div>
                <p class="eyebrow">${escapeHtml(post.location)}</p>
                <h3 class="feed-title">${escapeHtml(post.user)} with ${escapeHtml(post.petName)}</h3>
                <p class="feed-location">${escapeHtml(post.tags[0] || "Lifestyle note")}</p>
              </div>
              ${post.verifiedVisit ? '<span class="badge">Verified</span>' : '<span class="badge subtle">Note</span>'}
            </div>
            <div class="feed-actions">
              <button class="ghost-button" type="button" data-action="toggle-like-post" data-post-id="${escapeHtml(post.id)}">${isGuestMode() ? "Like" : (state.community.likedPostIds.includes(post.id) ? "Liked" : "Like")}</button>
              <button class="ghost-button" type="button" data-action="open-post" data-post-id="${escapeHtml(post.id)}">${getCommentCount(post)} comments</button>
              <button class="ghost-button" type="button" data-action="toggle-save-post" data-post-id="${escapeHtml(post.id)}">${state.saved.postIds.includes(post.id) ? "Saved" : "Save"}</button>
            </div>
          </article>
        `).join("")}
      </section>
    </div>
  `;
}

function renderShopCompactMarkup() {
  const filteredProducts = getFilteredProducts();
  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Light pet shopping</p>
          <h2>Shop</h2>
          <span class="screen-header-note">Cute but practical travel and care picks.</span>
        </div>
        ${renderHeaderAction("shop")}
      </header>
      <div class="pill-row">
        ${SHOP_CATEGORIES.map((category) => `<button class="chip ${state.ui.shop.category === category ? "active" : ""}" type="button" data-action="set-shop-category" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join("")}
      </div>
      <section class="feature-banner card compact-banner">
        <div class="banner-copy">
          <p class="eyebrow">Travel essentials</p>
          <h3 class="card-title">Light, useful pet travel picks</h3>
          <p class="card-copy">For stroller stops, rainy walks, and short stays.</p>
        </div>
        <img class="banner-image" src="${ASSETS.shopRaincoat}" alt="Pet travel accessory preview">
      </section>
      <section class="product-grid">
        ${filteredProducts.map((product) => `
          <article class="product-card card">
            <button class="card-button" type="button" data-action="open-product" data-product-id="${escapeHtml(product.id)}">
              <img class="product-image" src="${product.image}" alt="${escapeHtml(product.name)}">
            </button>
            <div class="product-meta">
              <h3 class="product-title">${escapeHtml(product.name)}</h3>
              <p class="product-tagline">${formatPrice(product.price)}</p>
              <p class="product-tagline">${escapeHtml(product.tag)}</p>
            </div>
            <button class="primary-button small" type="button" data-action="add-to-cart" data-product-id="${escapeHtml(product.id)}">${isGuestMode() ? "Preview" : "Add"}</button>
          </article>
        `).join("")}
      </section>
    </div>
  `;
}

function renderHealthCompactMarkup() {
  return isGuestMode() ? renderGuestHealthCompact() : renderMemberHealthCompact();
}

function renderGuestHealthCompact() {
  const hint = state.health.reminders[0];
  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Care companion preview</p>
          <h2>Health</h2>
          <span class="screen-header-note">A calm care space for daily logs and reminders.</span>
        </div>
        ${renderHeaderAction("health")}
      </header>
      <section class="card">
        <p class="eyebrow">Preview mode</p>
        <h3 class="card-title">Daily care in one calm screen</h3>
        <p class="card-copy">${getWeightLabel()} | ${escapeHtml(hint ? hint.detail : "Sign in to start logging")}</p>
      </section>
      <section class="card chart-card">
        <p class="eyebrow">Sample chart</p>
        <h3 class="card-title">Recent weight trend</h3>
        ${renderWeightChart()}
      </section>
      <section class="quick-actions">
        ${HEALTH_LOG_TYPES.map((type) => `<button class="quick-action lock" type="button" data-action="open-health-log" data-type="${escapeHtml(type)}"><strong>${escapeHtml(type)}</strong><span>Sign in to add</span></button>`).join("")}
      </section>
    </div>
  `;
}

function renderMemberHealthCompact() {
  const logs = getSortedHealthLogs();
  const latest = logs[0];
  const hint = state.health.reminders[0];
  return `
    <div class="screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Pet care companion</p>
          <h2>Health</h2>
          <span class="screen-header-note">Daily care, reminders, and light trend tracking.</span>
        </div>
        ${renderHeaderAction("health")}
      </header>
      <section class="card summary-card">
        <p class="eyebrow">Today care</p>
        <h3 class="card-title">${escapeHtml(hint ? hint.title : "Care status")}</h3>
        <p class="card-copy">${getWeightLabel()} | ${escapeHtml(hint ? hint.detail : state.pet.mood || "Relaxed")}</p>
      </section>
      <section class="card chart-card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Weight chart</p>
            <h3 class="card-title">Recent entries</h3>
          </div>
          <button class="secondary-button" type="button" data-action="open-health-log" data-type="Weight">Add log</button>
        </div>
        ${renderWeightChart()}
      </section>
      <section class="card">
        <p class="eyebrow">Latest log</p>
        <h3 class="card-title">${escapeHtml(latest ? latest.label || latest.type : "No logs yet")}</h3>
        <p class="card-copy">${escapeHtml(latest ? String(latest.value) : "Add a walk, meal, weight, or mood entry")}</p>
      </section>
    </div>
  `;
}

function renderMyProfileTabMarkup() {
  if (isGuestMode()) {
    return `
      <div class="screen profile-screen">
        <header class="screen-header">
          <div class="screen-header-copy">
            <p>Account entry</p>
            <h2>My Profile</h2>
            <span class="screen-header-note">Unlock saves, AI chat, and care logs when you sign in.</span>
          </div>
        </header>
        <section class="card profile-hero refined-profile-hero">
          <img class="profile-hero-image" src="${ASSETS.heroCat}" alt="Guest preview pet lifestyle">
          <div class="profile-preview-copy">
            <p class="eyebrow">Guest mode</p>
            <h3 class="card-title">Browse first, sign in when ready</h3>
            <p class="card-copy">Keep trusted places, ask Paw AI, and start care logging after login.</p>
          </div>
          <div class="profile-cta-grid">
            <button class="primary-button" type="button" data-action="open-auth" data-mode="login" data-reason="profile">Login</button>
            <button class="secondary-button" type="button" data-action="open-auth" data-mode="register" data-reason="profile">Create Account</button>
          </div>
        </section>
        <section class="preview-grid">
          ${getFeatureAccessMap().slice(0, 3).map((item) => `<article class="preview-card static"><div class="preview-copy"><p class="eyebrow">${item.memberOnly ? "Members only" : "Guest access"}</p><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.copy)}</span></div></article>`).join("")}
        </section>
      </div>
    `;
  }
  const savedPlaces = state.saved.placeIds.map(getPlaceById).filter(Boolean);
  const savedPosts = state.saved.postIds.map(getPostById).filter(Boolean);
  const preferences = state.user.preferences || {};
  return `
    <div class="screen profile-screen">
      <header class="screen-header">
        <div class="screen-header-copy">
          <p>Account and pet details</p>
          <h2>My Profile</h2>
          <span class="screen-header-note">Your pet identity, saved content, and preferences.</span>
        </div>
      </header>
      <section class="card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Owner card</p>
            <h3 class="card-title">${escapeHtml(getOwnerName())}</h3>
            <p class="card-copy">${escapeHtml(state.user.email)} | ${getPawPoints()} PawPoints</p>
          </div>
          <button class="secondary-button" type="button" data-action="open-edit-profile">Edit</button>
        </div>
      </section>
      <section class="card">
        <div class="profile-preview-row">
          <img class="profile-pet-avatar" src="${state.pet.avatarImage || ASSETS.profilePet}" alt="${escapeHtml(state.pet.name || "Pet avatar")}">
          <div>
            <p class="eyebrow">Pet card</p>
            <h3 class="card-title">${escapeHtml(state.pet.name || "Your pet")}</h3>
            <p class="card-copy">${escapeHtml(state.pet.breed || "Pet breed")} | ${escapeHtml(state.pet.size || "Medium")}</p>
            <p class="card-copy">${escapeHtml(state.pet.city)} | ${escapeHtml(state.pet.heatSensitivity)}</p>
          </div>
        </div>
      </section>
      <section class="card">
        <p class="eyebrow">Saved places</p>
        <h3 class="card-title">${savedPlaces.length ? savedPlaces[0].name : "No saved places yet"}</h3>
        <p class="card-copy">${savedPlaces.length ? `${savedPlaces.length} saved | ${savedPlaces[0].badges[0]}` : "Browse Discover and save trusted places."}</p>
      </section>
      <section class="card">
        <p class="eyebrow">Saved posts</p>
        <h3 class="card-title">${savedPosts.length ? savedPosts[0].user : "No saved posts yet"}</h3>
        <p class="card-copy">${savedPosts.length ? `${savedPosts[0].location} | ${savedPosts[0].tags[0]}` : "Save useful community notes to revisit later."}</p>
      </section>
      <section class="card">
        <div class="summary-row">
          <div>
            <p class="eyebrow">Preferences</p>
            <h3 class="card-title">Settings</h3>
          </div>
        </div>
        <button class="settings-row" type="button" data-action="toggle-setting" data-setting="notifications"><span>Notifications</span><span class="toggle-switch ${preferences.notifications ? "active" : ""}"></span></button>
        <button class="settings-row" type="button" data-action="toggle-setting" data-setting="locationSharing"><span>Location</span><span class="toggle-switch ${preferences.locationSharing ? "active" : ""}"></span></button>
        <button class="settings-row" type="button" data-action="toggle-setting" data-setting="reminders"><span>Reminders</span><span class="toggle-switch ${preferences.reminders ? "active" : ""}"></span></button>
      </section>
      <button class="secondary-button danger-button" type="button" data-action="logout">Logout</button>
    </div>
  `;
}

function buildAiMessagesFromResult(result, scenario) {
  return [{
    role: "assistant",
    text: `${scenario}: ${result.headline}. ${result.route}`,
    timestamp: new Date().toISOString(),
    type: "recommendation",
    cards: [
      { kind: "Place", title: result.stops[0].title, metaA: result.stops[0].time, metaB: result.stops[0].note },
      { kind: "Tip", title: "Safety reminder", metaA: result.caution, metaB: result.policy },
      { kind: "Backup", title: result.vet, metaA: "Nearby support", metaB: "Keep this contact ready." }
    ]
  }];
}

function generateSafePlan(inputs) {
  const result = createPlannerResult(inputs);
  state.planner.lastInputs = clone(inputs);
  state.planner.lastResult = clone(result);
  state.planner.history = [clone(result)].concat(state.planner.history || []).slice(0, 4);
  state.planner.selectedScenario = state.ui.ai.scenario || "Weekend walk";
  state.planner.messages = buildAiMessagesFromResult(result, state.planner.selectedScenario);
  saveState("planner");
  renderHome();
  renderAI();
  return result;
}

function handleAiPromptSubmit(form) {
  const data = new FormData(form);
  const prompt = String(data.get("prompt") || "").trim();
  sendAiPrompt(prompt);
  if (!isGuestMode()) {
    form.reset();
  }
}

function handleProfileSave(form) {
  if (requireAuth("edit profile")) {
    return;
  }
  const data = new FormData(form);
  state.user.ownerName = String(data.get("ownerName") || "").trim() || state.user.ownerName;
  state.pet.name = String(data.get("petName") || "").trim();
  state.pet.type = String(data.get("petType") || "").trim();
  state.pet.size = String(data.get("size") || "").trim();
  state.pet.breed = String(data.get("breed") || "").trim();
  state.pet.age = String(data.get("age") || "").trim();
  state.pet.city = String(data.get("city") || "").trim();
  state.pet.heatSensitivity = String(data.get("heatSensitivity") || "").trim();
  saveState("user");
  saveState("pet");
  closeSheet();
  renderHome();
  renderMyProfile();
  renderAI();
  showToast("Profile updated.", "success");
}

function handleLogout() {
  state.session.authenticated = false;
  state.session.mode = "guest";
  state.ui.currentView = "home";
  state.session.currentMainView = "home";
  state.ui.aiOverlay.open = false;
  closeSheet();
  saveState("session");
  renderApp();
  showToast("Logged out. You are now browsing as a guest.", "info");
}

function sanitizeDisplayArtifacts(root) {
  if (!root || !root.innerHTML) {
    return;
  }
  root.innerHTML = root.innerHTML
    .replace(/鈥\?/g, " - ")
    .replace(/鈥/g, " - ")
    .replace(/閳\?/g, " - ")
    .replace(/閳\?/g, " - ")
    .replace(/&nbsp;/g, " ");
}

function renderHomeModuleCard(config) {
  return `
    <article class="card preview-module-card">
      <div class="preview-module-layout">
        <img class="preview-image preview-thumb" src="${config.image}" alt="${escapeHtml(config.title)}">
        <div class="preview-copy">
          <p class="eyebrow">${escapeHtml(config.eyebrow)}</p>
          <strong>${escapeHtml(config.title)}</strong>
          <span>${escapeHtml(config.detailA)}</span>
          <span>${escapeHtml(config.detailB)}</span>
        </div>
      </div>
      <button class="secondary-button" type="button" data-action="jump-view" data-view="${escapeHtml(config.actionView)}">${escapeHtml(config.actionLabel)}</button>
    </article>
  `;
}

function renderMemberHomeCompact() {
  const livePlace = getLiveReviewPlace() || getPlacesByRegion(state.ui.discover.region)[0];
  const communityPost = getCommunityFeed()[0];
  const shopPick = products[0];
  const careHint = state.health.reminders[0];
  return `
    <div class="screen home-screen">
      <header class="screen-header screen-header-solo">
        <div class="screen-header-copy">
          <p>Good ${getDayPart()}, ${escapeHtml(getOwnerName())}</p>
          <h2>Plan today for ${escapeHtml(state.pet.name || "your pet")}</h2>
          <span class="screen-header-note">${escapeHtml(state.pet.city)} | ${escapeHtml(state.pet.mood || "Relaxed")}</span>
        </div>
      </header>

      <section class="card summary-card home-summary-card">
        <p class="eyebrow">Pet snapshot</p>
        <h3 class="card-title">${escapeHtml(state.pet.name || "Your companion")}</h3>
        <p class="card-copy">${escapeHtml(state.pet.breed || "Pet profile")} | ${escapeHtml(state.pet.city)}</p>
        <div class="summary-micro">
          <span class="mini-pill">${getWeightLabel()}</span>
          <span class="mini-pill">${state.saved.placeIds.length} saved</span>
        </div>
      </section>

      <div class="home-module-grid">
        ${renderHomeModuleCard({
          eyebrow: "Guide live",
          title: livePlace ? livePlace.name : "Trusted nearby",
          detailA: livePlace ? livePlace.distance : "Verified nearby",
          detailB: livePlace ? livePlace.badges[0] : "Policy-aware route",
          image: livePlace ? livePlace.image : ASSETS.placePark,
          actionView: "discover",
          actionLabel: "Open Guide"
        })}
        ${renderHomeModuleCard({
          eyebrow: "Social",
          title: communityPost ? `${communityPost.user} with ${communityPost.petName}` : "Community notes",
          detailA: communityPost ? communityPost.location : "Trusted local tips",
          detailB: communityPost ? communityPost.tags[0] : "Lifestyle support",
          image: communityPost ? communityPost.image : ASSETS.communityOne,
          actionView: "community",
          actionLabel: "Open Social"
        })}
        ${renderHomeModuleCard({
          eyebrow: "Shop",
          title: shopPick ? shopPick.name : "Travel essentials",
          detailA: shopPick ? formatPrice(shopPick.price) : "Useful picks",
          detailB: shopPick ? shopPick.tag : "Travel support",
          image: shopPick ? shopPick.image : ASSETS.shopBowl,
          actionView: "shop",
          actionLabel: "Open Shop"
        })}
        ${renderHomeModuleCard({
          eyebrow: "Care",
          title: careHint ? careHint.title : "Care status",
          detailA: getWeightLabel(),
          detailB: careHint ? careHint.detail : escapeHtml(state.pet.mood || "Relaxed"),
          image: ASSETS.profilePet,
          actionView: "health",
          actionLabel: "Open Care"
        })}
      </div>
    </div>
  `;
}
