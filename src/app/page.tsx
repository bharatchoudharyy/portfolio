import { Starfield } from "@/components/starfield";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Into } from "@/components/into";
import { Contact } from "@/components/contact";
import { Reveal } from "@/components/reveal";

export const revalidate = 600;

export default function Home() {
	return (
		<>
			<Starfield />
			<Nav />
			<main className="relative z-10">
				<Hero />
				<Reveal>
					<About />
				</Reveal>
				<Reveal>
					<Projects />
				</Reveal>
				<Reveal>
					<Experience />
				</Reveal>
				<Reveal>
					<Into />
				</Reveal>
				<Reveal>
					<Contact />
				</Reveal>
			</main>
			<Footer />
		</>
	);
}
