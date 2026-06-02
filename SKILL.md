---
name: magic-mcp
description: "Generate production-ready UI components instantly from natural language using 21st.dev Magic. Actions: create, build, generate, design, make, add. Elements: button, card, navbar, sidebar, modal, form, table, hero, dashboard, landing page, component. Stacks: React, Next.js, TypeScript, Tailwind CSS. Trigger on any request to build or generate a UI component."
---

# Magic MCP — AI UI Component Builder

Generates production-ready, TypeScript-safe UI components from natural language descriptions using the 21st.dev component library.

## When to Use

Trigger this skill whenever the user asks to:
- Create, build, generate, or design a UI component
- Add a button, card, navbar, modal, form, hero section, or any visual element
- Build a landing page, dashboard, or any front-end view
- Get a styled, ready-to-use React/Next.js/Tailwind component

## How to Use

Call the `21st_magic_component_builder` tool with a clear component description:

```
21st_magic_component_builder({
  message: "<natural language description of the component>",
  searchQuery: "<short keywords for component search>"
})
```

### Tips for Better Results

- **Be specific** — include style, color, behavior, and stack context
  - Good: `"A glassmorphism pricing card with 3 tiers, highlighted middle tier, dark background, Next.js + Tailwind"`
  - Too vague: `"a pricing component"`
- **Include stack** — mention React, Next.js, Tailwind, shadcn/ui if relevant
- **Describe interactions** — hover states, animations, click behavior
- **Specify theme** — dark/light mode, brand colors, style keywords

## Example Prompts

| Request | Tool Call |
|---------|----------|
| "Add a navbar with logo and nav links" | `message: "Responsive navbar with logo on left, nav links center, CTA button right, sticky on scroll, dark mode"` |
| "Create a hero section" | `message: "Hero section with large headline, subtitle, two CTA buttons, animated gradient background, React + Tailwind"` |
| "Build a data table" | `message: "Sortable data table with pagination, search input, row selection checkboxes, shadcn/ui style"` |
| "Make a login form" | `message: "Clean login form with email/password fields, remember me checkbox, forgot password link, Google OAuth button"` |

## Setup

This skill requires the Magic MCP server configured in `.mcp.json`:

```json
{
  "mcpServers": {
    "magic": {
      "command": "npx",
      "args": ["-y", "@21st-dev/magic@latest"],
      "env": {
        "TWENTY_FIRST_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

Get your API key at 21st.dev/magic/console.

## Workflow

1. User requests a UI component
2. Call `21st_magic_component_builder` with a detailed description
3. Present the generated component code
4. Offer to refine or extend (add dark mode, make it responsive, add animations)
