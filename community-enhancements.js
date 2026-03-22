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
  return safe.slice(0, maxLength - 1).trim() + "...";
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
    tags: tags,
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
    .map(function(post) {
      return normalizeCommunityPost(post);
    });

  if (state.ui.community.topic === "All") {
    return merged;
  }

  return merged.filter(function(post) {
    return post.tags.includes(state.ui.community.topic) || post.topic === state.ui.community.topic;
  });
}

function getPostById(postId) {
  return getCommunityFeed().find(function(post) {
    return post.id === postId;
  }) || null;
}

function getFeaturedCommunityPosts(feed) {
  const source = feed && feed.length ? feed : getCommunityFeed();
  const featured = [];
  const verified = source.find(function(post) { return post.verifiedVisit; });
  const hot = clone(source).sort(function(a, b) {
    return (b.likes + getCommentCount(b)) - (a.likes + getCommentCount(a));
  })[0];
  const rainy = source.find(function(post) {
    return post.tags.includes("Rainy day backup");
  });

  [verified, hot, rainy].forEach(function(post) {
    if (post && !featured.some(function(item) { return item.id === post.id; })) {
      featured.push(post);
    }
  });

  return featured.slice(0, 3);
}

function renderCommunityAvatar(post) {
  return '<div class="feed-avatar" aria-hidden="true">' + escapeHtml(String((post.user || "P").slice(0, 1)).toUpperCase()) + "</div>";
}

function renderCommunityComposerCard() {
  return '\
    <section class="card community-composer-card">\
      <div class="community-composer-row">\
        <div class="community-composer-avatar" aria-hidden="true">' + escapeHtml(String((getOwnerName() || "P").slice(0, 1)).toUpperCase()) + '</div>\
        <div class="community-composer-copy">\
          <p class="eyebrow">Share a note</p>\
          <h3 class="card-title">Share your pet-friendly day</h3>\
          <p class="card-copy">Cafe tips, stroller notes, route wins, and calm travel tricks.</p>\
        </div>\
      </div>\
      <div class="inline-actions wrap">\
        <button class="primary-button" type="button" data-action="open-create-post">Create Post</button>\
        <span class="helper-text">' + escapeHtml(isGuestMode() ? "Guests can browse. Posting unlocks after login." : "Add a cover image and turn your outing into a useful note.") + '</span>\
      </div>\
    </section>';
}

function renderCommunityFeaturedStrip(feed) {
  const featuredPosts = getFeaturedCommunityPosts(feed);
  if (!featuredPosts.length) {
    return "";
  }

  return '\
    <section class="community-featured-strip">' + featuredPosts.map(function(post, index) {
      const tone = index === 0 ? "verified" : index === 1 ? "hot" : "tip";
      const label = index === 0 ? "Verified visit" : index === 1 ? "Hot this week" : "Rainy day tip";
      return '\
        <button class="community-feature-card ' + tone + '" type="button" data-action="open-post" data-post-id="' + escapeHtml(post.id) + '">\
          <p class="eyebrow">' + escapeHtml(label) + '</p>\
          <strong>' + escapeHtml(post.headline) + '</strong>\
          <span>' + escapeHtml(post.location) + '</span>\
        </button>';
    }).join("") + "\
    </section>";
}

function renderCommunityPostCard(post) {
  const liked = state.community.likedPostIds.includes(post.id);
  const saved = state.saved.postIds.includes(post.id);
  const visibleTags = post.tags.slice(0, 2);

  return '\
    <article class="feed-card community-post-card card">\
      <button class="card-button" type="button" data-action="open-post" data-post-id="' + escapeHtml(post.id) + '">\
        <img class="feed-image community-feed-image" src="' + post.image + '" alt="' + escapeHtml(post.headline) + '">\
      </button>\
      <div class="feed-content-stack">\
        <div class="feed-author-row">\
          ' + renderCommunityAvatar(post) + '\
          <div class="feed-author-copy">\
            <strong>' + escapeHtml(post.user) + " with " + escapeHtml(post.petName) + '</strong>\
            <span>' + escapeHtml(post.location) + '</span>\
          </div>\
          ' + (post.verifiedVisit ? '<span class="badge">Verified visit</span>' : '<span class="badge subtle">Lifestyle note</span>') + '\
        </div>\
        <div class="feed-text-stack">\
          <h3 class="feed-title">' + escapeHtml(post.headline) + '</h3>\
          <p class="feed-excerpt">' + escapeHtml(post.excerpt) + '</p>\
        </div>\
        <div class="tag-row community-tag-row">\
          ' + visibleTags.map(function(tag) {
            return '<span class="mini-pill">' + escapeHtml(tag) + "</span>";
          }).join("") + '\
          ' + (post.visitNote ? '<span class="tip-pill">' + escapeHtml(post.visitNote) + "</span>" : "") + '\
        </div>\
        <div class="feed-actions">\
          <button class="ghost-button" type="button" data-action="toggle-like-post" data-post-id="' + escapeHtml(post.id) + '">' + escapeHtml((liked ? "Liked" : "Like") + " " + (post.likes + (liked ? 1 : 0))) + '</button>\
          <button class="ghost-button" type="button" data-action="open-post" data-post-id="' + escapeHtml(post.id) + '">' + escapeHtml(String(getCommentCount(post)) + " comments") + '</button>\
          <button class="ghost-button" type="button" data-action="toggle-save-post" data-post-id="' + escapeHtml(post.id) + '">' + escapeHtml(saved ? "Saved" : "Save") + '</button>\
        </div>\
      </div>\
    </article>';
}

function renderCommunityCompactMarkup() {
  ensureCommunityComposerState();
  const feed = getCommunityFeed();

  return '\
    <div class="screen">\
      <header class="screen-header">\
        <div class="screen-header-copy">\
          <p>Pet lifestyle community</p>\
          <h2>Community</h2>\
          <span class="screen-header-note">Real pet-friendly notes from local owners.</span>\
        </div>\
        ' + renderHeaderAction("community") + '\
      </header>\
      ' + renderCommunityComposerCard() + '\
      <div class="topic-row">\
        ' + getCommunityTopics().map(function(topic) {
          return '<button class="chip ' + (state.ui.community.topic === topic ? "active" : "") + '" type="button" data-action="set-community-topic" data-topic="' + escapeHtml(topic) + '">' + escapeHtml(topic) + "</button>";
        }).join("") + '\
      </div>\
      <section class="story-row">\
        ' + getCommunityHighlights().map(function(story) {
          return '\
            <button class="story-bubble community-story-bubble" type="button" data-action="set-community-topic" data-topic="' + escapeHtml(story.topic) + '">\
              <div class="story-avatar">' + renderStoryIcon(story.icon) + '</div>\
              <strong>' + escapeHtml(story.title) + '</strong>\
              <span>' + escapeHtml(story.subtitle) + '</span>\
            </button>';
        }).join("") + '\
      </section>\
      ' + renderCommunityFeaturedStrip(feed) + '\
      <section class="feed-list community-feed-list">\
        ' + (feed.length ? feed.map(function(post) {
          return renderCommunityPostCard(post);
        }).join("") : '\
          <div class="empty-state">\
            <strong>No posts match this topic</strong>\
            <span>Try another topic to bring pet-friendly stories and route notes back into view.</span>\
          </div>') + '\
      </section>\
    </div>';
}

function renderPostDetail() {
  const post = getPostById(state.ui.sheet.payload && state.ui.sheet.payload.postId);
  if (!post) {
    return "";
  }

  const liked = state.community.likedPostIds.includes(post.id);
  const saved = state.saved.postIds.includes(post.id);
  const comments = post.commentsPreview && post.commentsPreview.length ? post.commentsPreview : [{ user: "PawPlanet", text: "This post is new. Helpful comments will show here later." }];

  return '\
    <div class="detail-stack">\
      <img class="detail-image" src="' + post.image + '" alt="' + escapeHtml(post.headline) + '">\
      <section class="card detail-card">\
        <div class="feed-author-row">\
          ' + renderCommunityAvatar(post) + '\
          <div class="feed-author-copy">\
            <strong>' + escapeHtml(post.user) + " with " + escapeHtml(post.petName) + '</strong>\
            <span>' + escapeHtml(post.location) + '</span>\
          </div>\
          ' + (post.verifiedVisit ? '<span class="badge">Verified visit</span>' : '<span class="badge subtle">Lifestyle note</span>') + '\
        </div>\
        <div class="feed-text-stack">\
          <h3 class="card-title">' + escapeHtml(post.headline) + '</h3>\
          <p>' + escapeHtml(post.caption) + '</p>\
        </div>\
        <div class="tag-row community-tag-row">\
          ' + post.tags.map(function(tag) {
            return '<span class="mini-pill">' + escapeHtml(tag) + "</span>";
          }).join("") + '\
        </div>\
      </section>\
      <section class="detail-points-grid">\
        <article class="card detail-point-card accent-green">\
          <p class="eyebrow">Best time</p>\
          <strong>' + escapeHtml(post.bestTime || "Earlier, cooler hours") + '</strong>\
          <span>' + escapeHtml(post.visitNote || "Useful timing note from the visit.") + '</span>\
        </article>\
        <article class="card detail-point-card accent-yellow">\
          <p class="eyebrow">Pet policy</p>\
          <strong>' + escapeHtml(post.policyTip || "Ask staff or check community notes on arrival") + '</strong>\
          <span>' + escapeHtml(post.verifiedVisit ? "Verified by community visit." : "Lifestyle note, not official policy.") + '</span>\
        </article>\
        <article class="card detail-point-card accent-green-soft">\
          <p class="eyebrow">What helped</p>\
          <strong>' + escapeHtml(post.tags[0] || "Travel note") + '</strong>\
          <span>' + escapeHtml(post.tags[1] || "A simple tip that made the route smoother.") + '</span>\
        </article>\
      </section>\
      <section class="card detail-card">\
        <div class="summary-row">\
          <div>\
            <p class="eyebrow">Interaction</p>\
            <h3 class="card-title">' + escapeHtml(String(post.likes + (liked ? 1 : 0)) + " likes | " + String(getCommentCount(post)) + " comments") + '</h3>\
          </div>\
        </div>\
        <div class="inline-actions wrap">\
          <button class="secondary-button" type="button" data-action="toggle-like-post" data-post-id="' + escapeHtml(post.id) + '">' + escapeHtml(liked ? "Unlike" : "Like") + '</button>\
          <button class="secondary-button" type="button" data-action="toggle-save-post" data-post-id="' + escapeHtml(post.id) + '">' + escapeHtml(saved ? "Saved" : "Save") + '</button>\
        </div>\
      </section>\
      <section class="card detail-card">\
        <p class="eyebrow">Comment preview</p>\
        <div class="comment-preview-list">\
          ' + comments.slice(0, 3).map(function(comment) {
            return '\
              <article class="comment-preview-item">\
                <strong>' + escapeHtml(comment.user) + '</strong>\
                <span>' + escapeHtml(comment.text) + '</span>\
              </article>';
          }).join("") + '\
        </div>\
      </section>\
    </div>';
}

function renderCreatePostSheet() {
  ensureCommunityComposerState();
  const preview = state.ui.community.draftImagePreview;
  const fileName = state.ui.community.draftImageName;

  return '\
    <form class="sheet-form community-post-form" data-form="create-post">\
      <div class="upload-cover-shell">\
        ' + (preview ? '\
          <img class="upload-cover-preview" src="' + preview + '" alt="Selected post cover preview">' : '\
          <div class="upload-cover-empty">\
            <div class="story-avatar">' + renderStoryIcon("bag") + '</div>\
            <strong>Add a cover image</strong>\
            <span>Choose one photo to make your post feel like a real lifestyle note.</span>\
          </div>') + '\
        <input class="upload-cover-input" id="postImageInput" data-role="post-image-input" name="coverImage" type="file" accept="image/*">\
      </div>\
      <div class="upload-cover-actions">\
        <label class="secondary-button upload-action-label" for="postImageInput">' + (preview ? "Change image" : "Upload cover") + '</label>\
        ' + (preview ? '<button class="ghost-button" type="button" data-action="clear-post-image">Remove</button>' : '<span class="helper-text">Local image preview only for this demo.</span>') + '\
      </div>\
      ' + (fileName ? '<p class="helper-text upload-file-name">' + escapeHtml(fileName) + "</p>" : "") + '\
      <label class="sheet-field">\
        <span>Headline</span>\
        <input type="text" name="headline" placeholder="Summarize your pet-friendly tip">\
      </label>\
      <label class="sheet-field">\
        <span>Caption</span>\
        <textarea name="caption" placeholder="What worked, what to avoid, and what helped your pet feel safe?"></textarea>\
      </label>\
      <div class="sheet-inline">\
        <label class="sheet-field">\
          <span>Location</span>\
          <input type="text" name="location" placeholder="Central, Hong Kong">\
        </label>\
        <label class="sheet-field">\
          <span>Topic</span>\
          <select name="tag">\
            ' + getCommunityTopics().filter(function(item) { return item !== "All"; }).map(function(item) {
              return '<option value="' + escapeHtml(item) + '">' + escapeHtml(item) + "</option>";
            }).join("") + '\
          </select>\
        </label>\
      </div>\
      <label class="sheet-field">\
        <span>Visit note</span>\
        <input type="text" name="visitNote" placeholder="Best before 11 AM / Carrier recommended">\
      </label>\
      <label class="sheet-field">\
        <span>Pet policy or useful tip</span>\
        <textarea name="policyTip" placeholder="Outdoor seating only, stroller helped in lobby, bring water before noon..."></textarea>\
      </label>\
      <button class="primary-button" type="submit">Publish post</button>\
    </form>';
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

  const reader = new FileReader();
  reader.onload = function(loadEvent) {
    state.ui.community.draftImagePreview = String(loadEvent.target && loadEvent.target.result || "");
    state.ui.community.draftImageName = file.name;
    if (state.ui.sheet.type === "createPost") {
      renderSheet();
    }
  };
  reader.onerror = function() {
    showToast("Could not preview this image.", "error");
  };
  reader.readAsDataURL(file);
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
    id: "custom-post-" + Date.now(),
    user: getOwnerName(),
    petName: state.pet.name || "Buddy",
    location: location,
    headline: headline,
    caption: caption,
    excerpt: truncateCommunityText(caption, 110),
    tags: [tag],
    likes: 0,
    comments: 0,
    verifiedVisit: false,
    image: state.ui.community.draftImagePreview || ASSETS.communityTwo,
    imageSourceType: state.ui.community.draftImagePreview ? "upload" : "asset",
    topic: tag,
    visitNote: visitNote,
    policyTip: policyTip,
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
