import "./globals.css";

export const metadata = {
  title: "CLOTHES-UP | 패션 가격 비교",
  description: "여러 패션 판매처의 상품과 가격을 한눈에 비교해 보세요."
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
