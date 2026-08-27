import 'dotenv/config';
import { PrismaClient, Status } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { uuidv7 } from 'uuidv7';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	max: 5,
});
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const products = [
	{
		title: 'Equipamentos de perfuração',
		slug: 'equipamentos-de-perfuracao',
		blurb: 'Brocas, tricones, PDC e acessórios para perfuração onshore e offshore.',
		description: '<p>Fornecemos equipamentos de perfuração de alta performance para operações onshore e offshore. A nossa gama inclui brocas tricones, PDC, acessórios e ferramentas de perfuração certificadas pelas normas API e ISO.</p>',
		coverImage: 'https://images.unsplash.com/photo-1648369000096-109763c11e8e?q=80&w=800&auto=format&fit=crop',
		sortOrder: 1,
	},
	{
		title: 'Válvulas e conexões',
		slug: 'valvulas-e-conexoes',
		blurb: 'Válvulas de esfera, gaveta, globo, retenção e conexões forjadas API 6A/6D.',
		description: '<p>Oferecemos uma completa gama de válvulas industriais — esfera, gaveta, globo, retenção — e conexões forjadas em conformidade com as normas API 6A e 6D. Soluções para oleodutos, gasodutos e processos industriais.</p>',
		coverImage: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=800&auto=format&fit=crop',
		sortOrder: 2,
	},
	{
		title: 'Bombas e compressores',
		slug: 'bombas-e-compressores',
		blurb: 'Bombas centrífugas, alternativas, de diafragma e compressores de ar/gás.',
		description: '<p>Soluções completas em bombas e compressores para sector industrial. Bombas centrífugas, alternativas, de diafragma e compressores de ar e gás para aplicações em refinarias, petroquímicas e mineração.</p>',
		coverImage: 'https://images.unsplash.com/photo-1578356058390-f58c575337a2?q=80&w=800&auto=format&fit=crop',
		sortOrder: 3,
	},
	{
		title: 'Instrumentação e controle',
		slug: 'instrumentacao-e-controle',
		blurb: 'Transmissores de pressão, temperatura, nível, vazão e sistemas SCADA.',
		description: '<p>Sistemas de instrumentação e automação industrial. Transmissores de pressão, temperatura, nível e vazão, controladores lógicos programáveis (PLC), sistemas SCADA e soluções de controle de processos.</p>',
		coverImage: 'https://images.unsplash.com/photo-1633155617309-6201a8096e8a?q=80&w=800&auto=format&fit=crop',
		sortOrder: 4,
	},
	{
		title: 'Materiais e consumíveis',
		slug: 'materiais-e-consumiveis',
		blurb: 'Tubos, flanges, juntas, parafusos, lubrificantes, químicos e EPIs.',
		description: '<p>Fornecimento de materiais e consumíveis industriais: tubos, flanges, juntas, parafusos de alta resistência, lubrificantes industriais, produtos químicos e equipamentos de protecção individual (EPI).</p>',
		coverImage: 'https://images.unsplash.com/photo-1690508313456-bf8c851e8319?q=80&w=800&auto=format&fit=crop',
		sortOrder: 5,
	},
	{
		title: 'Equipamentos de segurança',
		slug: 'equipamentos-de-seguranca',
		blurb: 'Sistemas de detecção de gás, supressão de incêndio, EPR e sinalização.',
		description: '<p>Equipamentos e sistemas de segurança industrial: detecção de gases tóxicos e combustíveis, sistemas de supressão de incêndio, equipamento de protecção respiratória (EPR) e sinalização de segurança.</p>',
		coverImage: 'https://images.unsplash.com/photo-1722183704200-e96339975ba4?q=80&w=800&auto=format&fit=crop',
		sortOrder: 6,
	},
];

async function main() {
	console.log('Seeding products...');

	for (const product of products) {
		await prisma.product.upsert({
			where: { slug: product.slug },
			create: {
				id: uuidv7(),
				...product,
				status: Status.PUBLICADO,
				featured: false,
			},
			update: {
				title: product.title,
				blurb: product.blurb,
				description: product.description,
				coverImage: product.coverImage,
				sortOrder: product.sortOrder,
			},
		});
		console.log(`  ✓ ${product.title}`);
	}

	console.log('Done!');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
