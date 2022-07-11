module.exports = {
  disableEmoji: false,
  list: [
    "new",
    "typo",
    "theme",
    "fix",
    "remove",
    "append",
    "improve"
  ],
  maxMessageLength: 64,
  minMessageLength: 0,
  questions: ["type", "scope", "subject"],
  scopes: [],
  types: {
    new: {
      description: "New post.",
      emoji: "✨",
      value: "new",
    },
    typo: {
      description: "Fixing typo.",
      emoji: "📝",
      value: "typo",
    },
    theme: {
      description: "Updating the UI and style files.",
      emoji: "💄",
      value: "theme",
    },
    fix: {
      description: "Fixing a bug.",
      emoji: "🐛",
      value: "fix",
    },
    remove: {
      description: "Removing code or files.",
      emoji: "🔥",
      value: "remove",
    },
    append: {
      description: "Append content.",
      emoji: "🧩 ",
      value: "append",
    },
    improve: {
      description: "Code improvement.",
      emoji: "🔨",
      value: "improve",
    },
  },
};
