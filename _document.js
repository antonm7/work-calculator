// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang="he" dir="rtl">
				{' '}
				{/* Adjust lang attribute as needed */}
				<Head>
					<title>מחשבון שעות</title>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
