import type { Metadata } from "next"

import { Footer } from "@/components/Footer"
import { SubpageHeader } from "@/components/SubpageHeader"
import { ExternalLink } from "@/components/ui/ExternalLink"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { GAMES_CONTACT, gamesData } from "@/data/gamesData"

const game = gamesData.find((g) => g.slug === "metroway")!

const updated = new Date(`${game.privacyUpdated}T00:00:00Z`).toLocaleDateString("en-GB", {
	day: "numeric",
	month: "long",
	year: "numeric",
	timeZone: "UTC",
})

export const metadata: Metadata = {
	title: "Metroway Privacy Policy — Pritam Mukherjee",
	description:
		"What Metroway stores on your device, what Google AdMob collects in the free version, and the choices you have.",
	alternates: { canonical: "/games/metroway/privacy" },
}

/** One summary row per kind of data, in the shape the store privacy forms ask for. */
const dataRows = [
	{
		data: "Game progress, scores, settings",
		where: "Your device only",
		purpose: "Saving your game",
		shared: "No",
	},
	{
		data: "Advertising ID (AAID / IDFA)",
		where: "Google AdMob",
		purpose: "Showing and measuring ads; personalised ads only with consent",
		shared: "With Google",
	},
	{
		data: "IP address, approximate location from it",
		where: "Google AdMob",
		purpose: "Ad delivery, fraud prevention, consent region",
		shared: "With Google",
	},
	{
		data: "Device and app info, ad interactions",
		where: "Google AdMob",
		purpose: "Ad delivery, measurement, diagnostics",
		shared: "With Google",
	},
	{
		data: "Purchase of Metroway Plus",
		where: "Apple or Google",
		purpose: "Payment and restoring your purchase",
		shared: "No (we never see payment details)",
	},
] as const

function Section({ id, n, title, children }: { id: string; n: string; title: string; children: React.ReactNode }) {
	return (
		<section id={id} className="grid gap-x-10 gap-y-4 border-t border-line py-12 md:grid-cols-[14rem_1fr]">
			<h2 className="flex items-baseline gap-3 text-h3 font-medium tracking-tight text-fg">
				<span className="font-mono text-label text-accent">{n}</span>
				{title}
			</h2>
			<div className="max-w-prose space-y-4 leading-relaxed text-fg-dim">{children}</div>
		</section>
	)
}

function Mail() {
	return (
		<a href={`mailto:${GAMES_CONTACT}`} className="sweep text-accent">
			{GAMES_CONTACT}
		</a>
	)
}

export default function MetrowayPrivacyPage() {
	return (
		<div className="relative z-10">
			<SubpageHeader
				crumbs={[
					{ href: "/games", label: "Games" },
					{ href: "/games/metroway/privacy", label: "Metroway privacy" },
				]}
			/>
			<main className="shell pb-section pt-16 md:pt-24">
				<SectionHeader index="01" label="Metroway · Privacy policy" />

				<h1 className="mt-14 max-w-[20ch] text-h1 font-medium tracking-tight text-fg">
					Your game stays on your phone.
				</h1>
				<p className="mt-6 max-w-prose text-lede text-fg-dim">
					Metroway has no accounts, no analytics and no servers of its own. The only data that leaves
					your device is what Google&apos;s ad service collects in the free version, after you have
					been asked for consent where the law requires it. This page explains exactly what that is and how to control it.
				</p>
				<p className="mt-6 font-mono text-meta text-fg-faint">
					Last updated <time dateTime={game.privacyUpdated}>{updated}</time>
				</p>

				{/* The short version: what a reviewer or a player actually wants to know. */}
				<div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2">
					{[
						["No account", "You never sign up or give us your name, email or contacts."],
						["Saved locally", "Progress, scores and settings live in the app's storage on your device."],
						["Ads are opt-in", "One kind of ad: a video you choose to watch for a second chance."],
						["Plus removes ads", "With Metroway Plus the game never starts the ad SDK and sends nothing to ad networks."],
					].map(([title, body]) => (
						<div key={title} className="bg-bg p-6">
							<p className="font-mono text-label uppercase text-accent">{title}</p>
							<p className="mt-3 text-fg-dim">{body}</p>
						</div>
					))}
				</div>

				<div className="mt-16">
					<Section id="who" n="01" title="Who we are">
						<p>
							Metroway is made by Pritam Mukherjee, an independent developer (&ldquo;we&rdquo;,
							&ldquo;us&rdquo;). We are responsible for the game and for this policy. For anything here,
							write to <Mail />.
						</p>
						<p>
							This policy covers the Metroway apps for iOS and Android. It does not cover the App Store,
							Google Play or Google&apos;s services, which have their own policies, linked below.
						</p>
					</Section>

					<Section id="device" n="02" title="What stays on your device">
						<p>
							The game saves your unlocked maps, best scores and stars, settings (sound, haptics,
							accessibility), tutorial progress and whether you own Metroway Plus. This file is stored in
							the app&apos;s private storage on your device. It is never uploaded to us, and we have no way
							to read it.
						</p>
						<p>
							Your platform may include this file in your own device backups (iCloud or Google). Those
							backups are controlled by you and by Apple or Google, not by us.
						</p>
					</Section>

					<Section id="ads" n="03" title="Ads in the free version">
						<p>
							The free version can show one kind of ad: an optional rewarded video, offered when your
							network collapses. You decide whether to watch it. There are no banners and no ads during
							play.
						</p>
						<p>
							Ads are served by <strong className="font-medium text-fg">Google AdMob</strong>. In the free
							version the ad SDK starts when the game opens, after the consent step below, and loads one
							ad in the background so it is ready if you want it. While it runs, Google may collect your device&apos;s advertising identifier (AAID on
							Android, IDFA on iOS when you allow tracking), your IP address and the approximate location
							derived from it, device and app information (model, OS version, language, app version) and
							how you interact with ads. Google uses this to deliver and measure ads, to prevent fraud,
							and, only where you have agreed, to personalise ads.
						</p>
						<p>
							<strong className="font-medium text-fg">Consent comes first.</strong> If you are in the
							European Economic Area, the UK or Switzerland, the game shows Google&apos;s consent form
							before any ad is requested, and you can refuse personalised ads. In US states with privacy
							laws, you can opt out of the use of your data for targeted advertising. On iOS, Apple asks
							whether the game may track you; if you say no, your IDFA is not shared. Without consent you
							can still watch ads, but they are not personalised.
						</p>
						<p>
							You can change your choice at any time in{" "}
							<strong className="font-medium text-fg">Settings → More → Privacy options</strong> (shown
							where the law requires it). Read how Google uses this data:{" "}
							<ExternalLink href="https://policies.google.com/technologies/partner-sites">
								How Google uses information from apps that use its services
							</ExternalLink>{" "}
							and the{" "}
							<ExternalLink href="https://policies.google.com/privacy">Google Privacy Policy</ExternalLink>
							.
						</p>
					</Section>

					<Section id="purchases" n="04" title="Purchases">
						<p>
							Metroway Plus is a one-time purchase handled entirely by the App Store or Google Play. We
							never see your name, card or billing address. The game only receives a confirmation that
							the purchase is valid, which it checks on your device so it can restore Plus after a
							reinstall.
						</p>
					</Section>

					<Section id="not" n="05" title="What we don't do">
						<ul className="list-none space-y-2">
							{[
								"We don't run analytics, tracking or crash-reporting services.",
								"We don't ask for your location, contacts, photos, camera or microphone.",
								"We don't sell your personal information.",
								"We don't have servers that receive data from the game.",
							].map((line) => (
								<li key={line} className="flex gap-3">
									<span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
									{line}
								</li>
							))}
						</ul>
						<p>
							The Android app asks for internet access (to load ads and check purchases), vibration (for
							haptics, which you can turn off) and the advertising ID permission used by AdMob. The
							Google ad and Play Billing libraries built into the game also declare standard system
							permissions: network state, wake lock, foreground service, basic phone state and billing.
							None of these let the game read your phone number, contacts, location or files.
						</p>
					</Section>

					<Section id="summary" n="06" title="Data at a glance">
						<div className="-mx-1 overflow-x-auto">
							<table className="w-full min-w-[34rem] border-collapse text-left text-[0.9375rem]">
								<thead>
									<tr className="border-b border-line-hi font-mono text-label uppercase text-fg-faint">
										<th scope="col" className="py-3 pr-4 font-normal">Data</th>
										<th scope="col" className="py-3 pr-4 font-normal">Held by</th>
										<th scope="col" className="py-3 pr-4 font-normal">Why</th>
										<th scope="col" className="py-3 font-normal">Shared</th>
									</tr>
								</thead>
								<tbody>
									{dataRows.map((row) => (
										<tr key={row.data} className="border-b border-line align-top">
											<th scope="row" className="py-3 pr-4 font-normal text-fg">{row.data}</th>
											<td className="py-3 pr-4">{row.where}</td>
											<td className="py-3 pr-4">{row.purpose}</td>
											<td className="py-3">{row.shared}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<p className="text-meta text-fg-faint">
							Rows marked Google AdMob apply only to the free version.
						</p>
					</Section>

					<Section id="choices" n="07" title="Your choices and rights">
						<ul className="list-none space-y-2">
							{[
								["Change ad consent", "Settings → More → Privacy options, where available."],
								["Limit tracking", "iOS: Settings → Privacy & Security → Tracking. Android: Settings → Google → Ads, to reset or delete your advertising ID."],
								["Remove ads entirely", "Buy Metroway Plus; the game then never starts the ad SDK."],
								["Delete your data", "Uninstalling the game deletes everything it saved."],
							].map(([title, body]) => (
								<li key={title} className="flex gap-3">
									<span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
									<span>
										<span className="text-fg">{title}.</span> {body}
									</span>
								</li>
							))}
						</ul>
						<p>
							Depending on where you live (for example under the GDPR, the UK GDPR, the California CCPA or
							India&apos;s DPDP Act), you may have the right to access, correct, delete or object to the
							use of your personal data, to withdraw consent, and to complain to your data protection
							authority. Because we hold no personal data about you, most requests are answered by the
							steps above or by Google, but we are happy to help: write to <Mail />. We reply within 30
							days.
						</p>
						<p>
							Where the GDPR applies, ads are personalised only on the basis of your consent. Non-personalised
							ad delivery and fraud prevention rely on legitimate interests, which you can object to.
						</p>
					</Section>

					<Section id="children" n="08" title="Children">
						<p>
							Metroway is a general-audience game and is not directed at children under 13 (or the
							minimum age in your country). We do not knowingly collect personal data from children. If
							you believe a child has used the free version and want ad data handled differently, contact
							us and we will help.
						</p>
					</Section>

					<Section id="retention" n="09" title="Retention, transfers and security">
						<p>
							Data saved by the game stays on your device until you uninstall it. Google keeps ad data
							according to its own retention policy and may process it in the United States and other
							countries, under safeguards such as the EU Standard Contractual Clauses.
						</p>
						<p>
							The game talks to Google and the app stores only over encrypted connections, and keeps no
							copy of anything elsewhere.
						</p>
					</Section>

					<Section id="changes" n="10" title="Changes to this policy">
						<p>
							If the game starts handling data differently, this page will be updated before the change
							ships, and the date at the top will change. Significant changes will also be noted in the
							app&apos;s release notes.
						</p>
					</Section>

					<Section id="contact" n="11" title="Contact">
						<p>
							Pritam Mukherjee
							<br />
							<Mail />
						</p>
					</Section>
				</div>
			</main>
			<Footer />
		</div>
	)
}
