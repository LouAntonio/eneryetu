import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const srcDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');

const SHIM = {
	'components/Header.tsx': '../lib/routing',
	'components/Footer.tsx': '../lib/routing',
	'components/CtaBand.tsx': '../lib/routing',
	'components/ScrollToTop.tsx': '../lib/routing',
	'views/Home.tsx': '../lib/routing',
	'views/Training.tsx': '../lib/routing',
	'views/NotFound.tsx': '../lib/routing',
	'views/media/PostDetail.tsx': '../../lib/routing',
	'views/media/EventDetail.tsx': '../../lib/routing',
	'views/media/Feed.tsx': '../../lib/routing',
	'views/media/Events.tsx': '../../lib/routing',
	'views/media/MediaLayout.tsx': '../../lib/routing',
	'views/media/shared.tsx': '../../lib/routing',
	'views/admin/Posts.tsx': '../../lib/routing',
	'views/admin/Events.tsx': '../../lib/routing',
	'views/admin/EventForm.tsx': '../../lib/routing',
	'views/admin/PostForm.tsx': '../../lib/routing',
	'views/admin/Login.tsx': '../../lib/routing',
	'components/admin/Sidebar.tsx': '../../lib/routing',
};

function walk(dir, acc = []) {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) walk(full, acc);
		else if (/\.tsx$/.test(entry)) acc.push(full);
	}
	return acc;
}

let useClientCount = 0;
for (const dir of ['components', 'contexts', 'views']) {
	for (const file of walk(join(srcDir, dir))) {
		let content = readFileSync(file, 'utf8');
		if (!content.startsWith("'use client'")) {
			content = "'use client';\n\n" + content;
			useClientCount++;
			writeFileSync(file, content, 'utf8');
		}
	}
}

let importCount = 0;
for (const [rel, shim] of Object.entries(SHIM)) {
	const target = join(srcDir, rel);
	if (!existsSync(target)) continue;
	let content = readFileSync(target, 'utf8');
	if (content.includes("from 'react-router-dom'")) {
		content = content.replaceAll("from 'react-router-dom'", `from '${shim}'`);
		writeFileSync(target, content, 'utf8');
		importCount++;
	}
}

console.log(`'use client' added: ${useClientCount}, router imports swapped: ${importCount}`);
