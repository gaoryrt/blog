module.exports = {
  disableEmoji: false,
  list: [
    "feat",
    "docs",
    "style",
    "fix",
    "revert",
    "append",
    "improve"
  ],
  maxMessageLength: 64,
  minMessageLength: 0,
  questions: ["type", "scope", "subject"],
  scopes: [],
  types: {
    feat: {
      description: "New post.",
      emoji: "✨",
      value: "new",
    },
    docs: {
      description: "Fixing typo.",
      emoji: "📝",
      value: "typo",
    },
    style: {
      description: "Updating the UI and style files.",
      emoji: "💄",
      value: "theme",
    },
    fix: {
      description: "Fixing a bug.",
      emoji: "🐛",
      value: "fix",
    },
    revert: {
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
