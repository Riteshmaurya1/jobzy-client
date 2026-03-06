import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
            <Navbar />

            <div id="privacy-policy" className="max-w-4xl mx-auto px-6 py-32 md:py-40">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">JobZy Privacy Policy</h1>
                <p className="text-lg mb-12 text-gray-600 dark:text-gray-400">Last Modified: January 25, 2026</p>
                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                            JobZy respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our Services or visit our website at <a href="https://jobzyin.vercel.app" className="text-violet-600 hover:underline">https://jobzyin.vercel.app</a>
                        </p>
                        <p className="leading-relaxed mt-4 text-gray-700 dark:text-gray-300">
                            By using our Services, you agree to this Privacy Policy. Please check this page periodically for updates.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">What Information We Collect</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                            <li>Name, email address, phone number</li>
                            <li>Resume and professional documents</li>
                            <li>Job preferences and application history</li>
                            <li>Account login information</li>
                            <li>Usage data and IP address</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                            <li>To provide and improve our Services</li>
                            <li>To organize your job search</li>
                            <li>To connect you with employers and organizations</li>
                            <li>To send you notifications and updates</li>
                            <li>To process payments</li>
                            <li>To comply with laws</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">How We Share Your Information</h2>
                        <p className="leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
                            We do not share your data without your permission. We only share your information when:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                            <li>You give us explicit consent to share with employers or organizations</li>
                            <li>We are required by law</li>
                            <li>An organization you joined invites you (your data goes to them)</li>
                        </ul>
                        <p className="leading-relaxed mt-4 font-medium text-gray-900 dark:text-white">
                            We never sell your personal data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>
                        <p className="leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
                            You can:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                            <li>Update your privacy settings anytime</li>
                            <li>Make your profile private</li>
                            <li>Opt out of marketing emails</li>
                            <li>Delete your account and data</li>
                        </ul>
                        <p className="leading-relaxed mt-4 text-gray-700 dark:text-gray-300">
                            Contact us at <a href="mailto:support@jobzy.com" className="text-violet-600 hover:underline">support@jobzy.com</a> to exercise these rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                        <p className="leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
                            We use industry-standard security measures to protect your information:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                            <li>Encrypted storage</li>
                            <li>Secure authentication</li>
                            <li>Access restrictions for authorized personnel</li>
                        </ul>
                        <p className="leading-relaxed mt-4 text-gray-700 dark:text-gray-300">
                            Keep your password confidential. We are not responsible for unauthorized access due to your negligence.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                            We use third-party service providers to help run our platform (authentication, payments, hosting, email, analytics). These providers are obligated to keep your data private.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Children</h2>
                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                            Our Services are not for children under 18. We do not knowingly collect data from children. If you believe we have, please contact us immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Business Changes</h2>
                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                            If we are acquired or go out of business, your information may be transferred to the acquiring company. We will notify you of material changes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                            We may update this policy. We will post changes here with the updated date. Your continued use means you accept the changes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                            For questions about this Privacy Policy:
                        </p>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                            Website: <a href="https://jobzyin.vercel.app" className="text-violet-600 hover:underline">https://jobzyin.vercel.app</a>
                        </p>
                    </section>

                    <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
                        <p className="text-center font-medium text-gray-900 dark:text-white">
                            JobZy is committed to protecting your privacy.
                        </p>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
