import "../styles/globals.css";

export const metadata = {
  title: 'Hospital Authentication System',
  description: 'Login and signup system for hospital staff',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
