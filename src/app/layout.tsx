import type { Metadata } from 'next';
// import { SafeArea } from 'antd-mobile'
import './globals.css';

export const metadata: Metadata = {
  title: 'm-note',
  description: 'a simply notebook',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-cmn-Hans">
      <body>
        {/* <SafeArea position='top' /> */}
        {children}
        {/* <SafeArea position='bottom' /> */}
      </body>
    </html>
  );
}
