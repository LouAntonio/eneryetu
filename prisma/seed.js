import 'dotenv/config';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { uuidv7 } from 'uuidv7';

const pool = new pg.Pool({
	connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

function legacySlugify(text) {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.trim();
}

function slugify(text) {
	return text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.trim();
}

const eventTypes = [
	{ name: 'Instalação Solar', slug: 'instalacao-solar' },
	{ name: 'Formação Técnica', slug: 'formacao-tecnica' },
	{ name: 'Feira de Energia', slug: 'feira-de-energia' },
	{ name: 'Projeto Eólico', slug: 'projeto-eolico' },
	{ name: 'Lançamento de Produto', slug: 'lancamento-de-produto' },
	{ name: 'Workshop', slug: 'workshop' },
];

const categories = [
	{ name: 'Notícias', slug: 'noticias' },
	{ name: 'Blog', slug: 'blog' },
	{ name: 'Energia Solar', slug: 'energia-solar' },
	{ name: 'Energia Eólica', slug: 'energia-eolica' },
	{ name: 'Armazenamento', slug: 'armazenamento' },
	{ name: 'Formação', slug: 'formacao' },
];

const events = [
	{
		title: 'Instalação Solar - Luanda',
		subtitle: 'Projeto residencial de 50kW',
		description:
			'Instalação de sistema solar fotovoltaico para condomínio residencial em Luanda.',
		fullDescription:
			'A ENERYETU concluiu a instalação de um sistema solar fotovoltaico de 50kW para um condomínio residencial de luxo em Luanda. O projeto incluiu painéis de alta eficiência, inversores string e sistema de monitorização remota.',
		startDate: new Date('2026-03-15'),
		endDate: new Date('2026-03-20'),
		displayDate: 'MAR · 2026',
		countryName: 'Angola',
		city: 'Luanda',
		venue: 'Condomínio Residencial Kilamba',
		status: 'PUBLICADO',
		featured: true,
		eventTypeSlug: 'instalacao-solar',
	},
	{
		title: 'Workshop de Energia Solar',
		subtitle: 'Formação para instaladores',
		description: 'Workshop prático de instalação de sistemas solares fotovoltaicos.',
		fullDescription:
			'A ENERYETU realizou um workshop de dois dias para 30 instaladores locais, cobrindo desde a dimensionamento de sistemas até a instalação e manutenção de painéis solares.',
		startDate: new Date('2026-04-10'),
		endDate: new Date('2026-04-11'),
		displayDate: 'ABR · 2026',
		countryName: 'Angola',
		city: 'Luanda',
		venue: 'Centro de Formação Técnica',
		status: 'PUBLICADO',
		featured: false,
		eventTypeSlug: 'workshop',
	},
	{
		title: 'Feira de Energia de Angola',
		subtitle: 'ENEX 2026',
		description: 'Principal feira de energia renovável na África Austral.',
		fullDescription:
			'A ENERYETU participou na ENEX 2026, apresentando as suas soluções de energia solar, eólica e armazenamento para o mercado angolano.',
		startDate: new Date('2026-05-20'),
		endDate: new Date('2026-05-22'),
		displayDate: 'MAI · 2026',
		countryName: 'Angola',
		city: 'Luanda',
		venue: 'Feira Internacional de Luanda',
		status: 'PUBLICADO',
		featured: true,
		eventTypeSlug: 'feira-de-energia',
	},
	{
		title: 'Projeto Eólico - Benguela',
		subtitle: 'Parque eólico de 5MW',
		description: 'Desenvolvimento de parque eólico para comunidade rural em Benguela.',
		fullDescription:
			'A ENERYETU está a desenvolver um parque eólico de 5MW para fornecer energia limpa a uma comunidade rural isolada em Benguela.',
		startDate: new Date('2026-06-01'),
		displayDate: 'JUN · 2026',
		countryName: 'Angola',
		city: 'Benguela',
		status: 'RASCUNHO',
		featured: false,
		eventTypeSlug: 'projeto-eolico',
	},
];

const posts = [
	{
		type: 'NOTICIA',
		title: 'ENERYETU conclui instalação solar de 50kW em Luanda',
		excerpt:
			'Sistema fotovoltaico com monitorização remota para condomínio residencial, entregue em cinco dias.',
		content: `
            <p>O projeto incluiu painéis de alta eficiência, inversores string e um sistema de monitorização remota que permite acompanhar a produção em tempo real.</p>
            <h2>Escopo do projeto</h2>
            <ul>
                <li>Potência instalada: 50&nbsp;kWp</li>
                <li>Inversores trifásicos ligados à rede</li>
                <li>Monitorização e relatórios de produção</li>
            </ul>
            <p>A instalação foi concluída dentro do prazo previsto, com a garantia de manutenção a cargo da nossa equipa técnica.</p>
        `,
		status: 'PUBLICADO',
		featured: true,
		categorySlug: 'noticias',
	},
	{
		type: 'NOTICIA',
		title: 'ENERYETU participa na ENEX 2026',
		excerpt:
			'A principal feira de energia renovável da África Austral contou com as soluções solares, eólicas e de armazenamento da ENERYETU.',
		content: `
            <p>A ENERYETU marcou presença na ENEX 2026, apresentando ao mercado angolano as suas soluções de energia solar, eólica e armazenamento.</p>
            <p>Durante os três dias de feira, a equipa recebeu parceiros, fornecedores e clientes interessados em projetos residenciais, comerciais e rurais.</p>
            <blockquote>O interesse em mini-redes rurais e sistemas off-grid foi o destaque desta edição.</blockquote>
            <p>A participação reforça o compromisso da empresa em ligar o fornecimento internacional ao trabalho de campo em Angola.</p>
        `,
		status: 'PUBLICADO',
		featured: false,
		categorySlug: 'noticias',
	},
	{
		type: 'NOTICIA',
		title: 'ENERYETU lança programa de formação técnica para instaladores',
		excerpt:
			'Formação prática em instalação e manutenção de sistemas solares, com certificação e entrega no local.',
		content: `
            <p>A ENERYETU abriu um programa de formação técnica dirigido a instaladores e técnicos de manutenção de sistemas solares.</p>
            <h2>O que o programa oferece</h2>
            <ul>
                <li>Formação prática em equipamento real</li>
                <li>Instrutores certificados</li>
                <li>Certificação reconhecida pelo sector</li>
            </ul>
            <p>As primeiras turmas já estão a decorrer em Luanda. As inscrições para as próximas edições estão abertas através do formulário de carreiras.</p>
        `,
		status: 'PUBLICADO',
		featured: false,
		categorySlug: 'noticias',
	},
	{
		type: 'BLOG',
		title: 'Manutenção preventiva em sistemas solares: o que evita paragens',
		excerpt:
			'Inspeções regulares, limpeza de módulos e análise de desempenho evitam a maior parte das falhas no terreno.',
		content: `
            <p>Grande parte das paragens em sistemas solares pode ser evitada com um plano de manutenção preventiva bem executado.</p>
            <h2>Os pontos mais críticos</h2>
            <ol>
                <li>Limpeza periódica dos módulos</li>
                <li>Verificação de ligações e inversores</li>
                <li>Análise de produção e alarmes</li>
            </ol>
            <p>Na ENERYETU, os contratos de manutenção incluem relatórios de desempenho e resposta prioritária, para que o seu sistema não pare quando menos espera.</p>
        `,
		status: 'PUBLICADO',
		featured: true,
		categorySlug: 'energia-solar',
	},
	{
		type: 'BLOG',
		title: 'Mini-redes off-grid: energia além da rede em Angola',
		excerpt:
			'Como as mini-redes rurais levam energia a comunidades fora do alcance da rede nacional.',
		content: `
            <p>Para comunidades fora do alcance da rede nacional, as mini-redes combinam geração solar ou eólica com armazenamento e distribuição local.</p>
            <h2>Por onde começar</h2>
            <ul>
                <li>Auditoria de carga da comunidade</li>
                <li>Dimensionamento da geração e do banco de baterias</li>
                <li>Modelo de gestão e tarifação local</li>
            </ul>
            <p>Com um parceiro local responsável pela operação, as mini-redes são uma solução sustentável para escolas, centros de saúde e atividades produtivas.</p>
        `,
		status: 'PUBLICADO',
		featured: false,
		categorySlug: 'armazenamento',
	},
	{
		type: 'BLOG',
		title: 'Eólica em Angola: o que considerar antes de investir',
		excerpt:
			'Perfil de vento, escolha do aerogerador e integração com solar e armazenamento decidem o sucesso do projeto.',
		content: `
            <p>Investir em energia eólica exige mais do que escolher um aerogerador: o perfil de vento do local decide tudo.</p>
            <h2>Checklist essencial</h2>
            <ol>
                <li>Medição de vento ao longo de pelo menos um ano</li>
                <li>Dimensionamento híbrido com solar e armazenamento</li>
                <li>Manutenção planeada de componentes mecânicos</li>
            </ol>
            <p>A equipa de engenharia da ENERYETU apoia desde a avaliação do recurso até à entrega e manutenção da central.</p>
        `,
		status: 'PUBLICADO',
		featured: false,
		categorySlug: 'energia-eolica',
	},
];

async function main() {
	console.log('A semear tipos de evento...');
	for (const eventType of eventTypes) {
		const exists = await prisma.eventType.findUnique({ where: { slug: eventType.slug } });
		if (!exists) {
			await prisma.eventType.create({
				data: { id: uuidv7(), ...eventType },
			});
		}
	}

	console.log('A semear categorias...');
	for (const category of categories) {
		const exists = await prisma.category.findUnique({ where: { slug: category.slug } });
		if (!exists) {
			await prisma.category.create({
				data: { id: uuidv7(), ...category },
			});
		}
	}

	console.log('A semear eventos...');
	for (const event of events) {
		const slug = slugify(event.title);
		const legacySlug = legacySlugify(event.title);
		const exists = await prisma.event.findUnique({ where: { slug } });
		if (exists) {
			continue;
		}
		if (legacySlug !== slug) {
			const legacy = await prisma.event.findUnique({ where: { slug: legacySlug } });
			if (legacy) {
				await prisma.event.update({
					where: { id: legacy.id },
					data: { slug },
				});
				console.log(`Slug corrigido: ${legacySlug} -> ${slug}`);
				continue;
			}
		}
		const eventType = await prisma.eventType.findUnique({
			where: { slug: event.eventTypeSlug },
		});
		delete event.eventTypeSlug;
		await prisma.event.create({
			data: {
				id: uuidv7(),
				slug,
				...event,
				eventTypeId: eventType.id,
				publishedAt: event.status === 'PUBLICADO' ? new Date() : null,
			},
		});
	}

	console.log('A semear admin...');
	const oldAdminEmail = 'admin@eneryetu.co.ao';
	const existingOldAdmin = await prisma.user.findUnique({ where: { email: oldAdminEmail } });
	if (existingOldAdmin) {
		await prisma.user.delete({ where: { id: existingOldAdmin.id } });
		console.log('Admin antigo removido: admin@eneryetu.co.ao');
	}

	const adminEmail = 'admin@eneryetu.com';
	const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
	if (!existingAdmin) {
		const bcrypt = (await import('bcrypt')).default;
		await prisma.user.create({
			data: {
				id: uuidv7(),
				name: 'Admin',
				surname: 'ENERYETU',
				email: adminEmail,
				password: await bcrypt.hash('qwerty123!', 10),
				role: 'ADMIN',
			},
		});
		console.log('Admin criado: admin@eneryetu.com / qwerty123!');
	} else {
		console.log('Admin já existe.');
	}

	console.log('A semear posts...');
	const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
	for (const post of posts) {
		const slug = slugify(post.title);
		const legacySlug = legacySlugify(post.title);
		const exists = await prisma.post.findUnique({ where: { slug } });
		if (exists) {
			continue;
		}
		if (legacySlug !== slug) {
			const legacy = await prisma.post.findUnique({ where: { slug: legacySlug } });
			if (legacy) {
				await prisma.post.update({
					where: { id: legacy.id },
					data: { slug },
				});
				console.log(`Slug corrigido: ${legacySlug} -> ${slug}`);
				continue;
			}
		}
		const category = post.categorySlug
			? await prisma.category.findUnique({ where: { slug: post.categorySlug } })
			: null;
		const data = { ...post };
		delete data.categorySlug;
		await prisma.post.create({
			data: {
				id: uuidv7(),
				slug,
				authorId: admin.id,
				categoryId: category?.id ?? null,
				publishedAt: data.status === 'PUBLICADO' ? new Date() : null,
				...data,
			},
		});
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
