import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
	schema: 'prisma/schema.prisma',
	migrations: {
		seed: 'prisma/seed.js',
		path: 'prisma/migrations',
	},
	datasource: {
		url: process.env['DATABASE_URL'],
	},
});
