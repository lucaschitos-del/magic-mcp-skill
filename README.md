# Magic MCP Skill for Claude Code

Generate production-ready UI components from natural language using [21st.dev Magic](https://21st.dev/magic).

## Install

```bash
npx magic-mcp-skill
```

The installer will:
1. Add `.claude/skills/magic-mcp/SKILL.md` to your project
2. Configure `.mcp.json` with your API key

### With API key inline

```bash
npx magic-mcp-skill --api-key YOUR_KEY
```

## Usage

Once installed, just ask Claude:

> "Build me a glassmorphism pricing card with 3 tiers"
> "Add a responsive navbar with dark mode toggle"
> "Create a data table with sorting and pagination"

Claude will automatically use the Magic MCP to generate the component.

## Get an API Key

[21st.dev/magic/console](https://21st.dev/magic/console)

## What's Installed

| File | Purpose |
|------|-------|
| `.claude/skills/magic-mcp/SKILL.md` | Tells Claude when and how to use Magic |
| `.mcp.json` | Connects Claude Code to the Magic MCP server |
