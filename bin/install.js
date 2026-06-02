#!/usr/bin/env node

import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cwd = process.cwd();
const args = process.argv.slice(2);

const apiKeyFlag = args.find(a => a.startsWith('--api-key='))?.split('=')[1]
  || args[args.indexOf('--api-key') + 1];

console.log('\nMagic MCP Skill Installer\n');

// Install SKILL.md
const skillDir = join(cwd, '.claude', 'skills', 'magic-mcp');
const skillSrc = join(__dirname, '..', 'skill', 'SKILL.md');
const skillDest = join(skillDir, 'SKILL.md');

mkdirSync(skillDir, { recursive: true });
copyFileSync(skillSrc, skillDest);
console.log('  ✓ Installed .claude/skills/magic-mcp/SKILL.md');

// Configure .mcp.json
async function getApiKey() {
  if (apiKeyFlag) return apiKeyFlag;

  const mcpPath = join(cwd, '.mcp.json');
  if (existsSync(mcpPath)) {
    const existing = JSON.parse(readFileSync(mcpPath, 'utf8'));
    if (existing?.mcpServers?.magic?.env?.TWENTY_FIRST_API_KEY) {
      console.log('  ✓ Magic MCP already configured in .mcp.json');
      return null;
    }
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question('  Enter your 21st.dev API key (or press Enter to skip): ', answer => {
      rl.close();
      resolve(answer.trim() || null);
    });
  });
}

const apiKey = await getApiKey();

if (apiKey) {
  const mcpPath = join(cwd, '.mcp.json');
  let config = {};

  if (existsSync(mcpPath)) {
    try { config = JSON.parse(readFileSync(mcpPath, 'utf8')); } catch {}
  }

  config.mcpServers = config.mcpServers || {};
  config.mcpServers.magic = {
    command: 'npx',
    args: ['-y', '@21st-dev/magic@latest'],
    env: { TWENTY_FIRST_API_KEY: apiKey }
  };

  writeFileSync(mcpPath, JSON.stringify(config, null, 2) + '\n');
  console.log('  ✓ Configured .mcp.json');
} else if (!apiKeyFlag) {
  console.log('  ℹ  Skipped .mcp.json — add your key later:');
  console.log('     https://21st.dev/magic/console\n');
}

console.log('\n  Magic MCP skill ready!');
console.log('  Restart Claude Code, then try: "Build me a hero section"\n');
