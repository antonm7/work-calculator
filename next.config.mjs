/** @type {import('next').NextConfig} */
const nextConfig = {
	i18n: {
		// These are all the locales you want to support in
		// your application
		locales: ['he', 'en'], // Add 'he' for Hebrew, include other locales you support
		// This is the default locale you want to be used when visiting
		// a non-locale prefixed path e.g. `/hello`
		defaultLocale: 'he', // Set 'he' as default locale for Hebrew
		// This is a list of locale domains and the default locale they
		// should handle (these are only required when setting up domain routing)
		// Feel free to remove if not using domains};
	},
};

export default nextConfig;
