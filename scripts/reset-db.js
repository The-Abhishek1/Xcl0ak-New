#!/usr/bin/env node
/**
 * reset-db.js — Full Supabase/Prisma reset
 *
 * Usage:
 *   node scripts/reset-db.js           # clear all DB tables
 *   node scripts/reset-db.js --storage # also wipe Supabase Storage files
 *   node scripts/reset-db.js --full    # DB + storage + re-seed
 */
const { PrismaClient } = require('@prisma/client')
const { execSync }     = require('child_process')
const readline         = require('readline')

const ARGS       = process.argv.slice(2)
const DO_STORAGE = ARGS.includes('--storage') || ARGS.includes('--full')
const DO_SEED    = ARGS.includes('--full')
const prisma     = new PrismaClient()

// Delete in FK-safe order
const MODELS = [
  'cTFSolve','cTFChallenge',
  'exploitVote','comment','exploit',
  'chatMessage','notification',
  'threatEvent','newsArticle','cVECache',
  'adminUser','user',
]

async function confirm(msg) {
  const rl = readline.createInterface({ input:process.stdin, output:process.stdout })
  return new Promise(r => rl.question(`${msg} (yes/no): `, a => { rl.close(); r(a.trim().toLowerCase()==='yes') }))
}

async function clearTables() {
  console.log('\nClearing tables...')
  for (const m of MODELS) {
    try {
      const res = await prisma[m].deleteMany({})
      console.log(`  ✓ ${m}: ${res.count} rows deleted`)
    } catch(e) { console.log(`  - ${m}: ${e.message?.slice(0,60)}`) }
  }
}

async function clearStorage() {
  console.log('\nClearing Supabase Storage...')
  // Load env
  try { require('dotenv').config({path:'.env.local'}); require('dotenv').config({path:'.env'}) } catch{}
  const URL = process.env.NEXT_PUBLIC_SUPABASE_URL
  const KEY = process.env.SUPABASE_SERVICE_KEY
  if (!URL || !KEY) { console.log('  ✗ Supabase env vars not found'); return }

  for (const bucket of ['xcloak-files']) {
    try {
      const list = await fetch(`${URL}/storage/v1/object/list/${bucket}`, {
        method:'POST',
        headers:{Authorization:`Bearer ${KEY}`,'Content-Type':'application/json'},
        body: JSON.stringify({prefix:'',limit:1000}),
      }).then(r=>r.json())
      if (!Array.isArray(list)||list.length===0) { console.log(`  ${bucket}: empty`); continue }
      await fetch(`${URL}/storage/v1/object/${bucket}`, {
        method:'DELETE',
        headers:{Authorization:`Bearer ${KEY}`,'Content-Type':'application/json'},
        body: JSON.stringify({prefixes:list.map(f=>f.name)}),
      })
      console.log(`  ✓ ${bucket}: ${list.length} files deleted`)
    } catch(e) { console.log(`  ✗ ${bucket}: ${e.message}`) }
  }
}

async function main() {
  console.log('\n⚠  XCloak Reset Tool')
  console.log('  DB tables : will be cleared')
  console.log(`  Storage   : ${DO_STORAGE?'will be cleared':'skipped (add --storage)'}`)
  console.log(`  Re-seed   : ${DO_SEED?'yes':'no (run node prisma/seed.js after)'}`)

  if (!await confirm('\nDelete ALL data?')) { console.log('Aborted.'); return }

  await clearTables()
  if (DO_STORAGE) await clearStorage()

  console.log('\n✅ Done.')
  if (DO_SEED) { console.log('\nRe-seeding...'); execSync('node prisma/seed.js',{stdio:'inherit'}) }
  else console.log('\nRun: node prisma/seed.js')

  await prisma.$disconnect()
}
main().catch(e=>{console.error(e);prisma.$disconnect();process.exit(1)})
