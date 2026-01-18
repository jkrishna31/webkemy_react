import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const pkgPath = path.resolve(process.cwd(), "package.json");

if (!fs.existsSync(pkgPath)) {
  console.error("❌ package.json not found");
  process.exit(1);
}

const args = process.argv.slice(2);

const FLAGS = {
  deps: args.includes("--deps"),
  dev: args.includes("--dev"),
  all: args.includes("--all"),
  dryRun: args.includes("--dry-run"),
  sequential: args.includes("--sequential"),
};

// default behavior: dependencies only
if (!FLAGS.deps && !FLAGS.dev && !FLAGS.all) {
  FLAGS.deps = true;
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

const packages = [];

if (FLAGS.all || FLAGS.deps) {
  packages.push(
    ...Object.keys(pkg.dependencies || {}).map(name => ({
      name,
      dev: false,
    }))
  );
}

if (FLAGS.all || FLAGS.dev) {
  packages.push(
    ...Object.keys(pkg.devDependencies || {}).map(name => ({
      name,
      dev: true,
    }))
  );
}

if (packages.length === 0) {
  console.log("ℹ️ No packages found to update");
  process.exit(0);
}

const install = (cmd) => {
  console.log(`➡️ ${cmd}`);
  if (!FLAGS.dryRun) {
    execSync(cmd, { stdio: "inherit" });
  }
};

console.log(`🔄 Updating ${depNames.length} dependencies to latest...\n`);

if (FLAGS.sequential) {
  // safer, one-by-one installs
  for (const { name, dev } of packages) {
    const cmd = `npm install ${name}@latest${dev ? " -D" : ""}`;
    install(cmd);
  }
} else {
  // faster, single command
  const deps = packages.filter(p => !p.dev).map(p => `${p.name}@latest`);
  const devDeps = packages.filter(p => p.dev).map(p => `${p.name}@latest`);

  if (deps.length) {
    install(`npm install ${deps.join(" ")}`);
  }
  if (devDeps.length) {
    install(`npm install -D ${devDeps.join(" ")}`);
  }
}

console.log("\n✅ All dependencies processed");
