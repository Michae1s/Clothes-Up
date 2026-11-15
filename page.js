 "use client";

import { useMemo, useState } from "react";

const products = [
  { id: 1, brand: "NIKE", name: "에어포스 1 '07", category: "신발", gender: "공용", icon: "👟", prices: [{ store: "무신사", price: 119000 }, { store: "4910", price: 115000 }, { store: "KREAM", price: 109000 }, { store: "애슬러", price: 125000 }], affiliateUrl: "" },
  { id: 2, brand: "ADIDAS", name: "삼바 OG", category: "신발", gender: "공용", icon: "👟", prices: [{ store: "무신사", price: 109000 }, { store: "4910", price: 105000 }, { store: "KREAM", price: 99000 }], affiliateUrl: "" },
  { id: 3, brand: "THISISNEVERTHAT", name: "로고 후드 스웨트셔츠", category: "상의", gender: "공용", icon: "👕", prices: [{ store: "무신사", price: 79000 }, { store: "4910", price: 72000 }, { store: "애슬러", price: 76000 }], affiliateUrl: "" },
  { id: 4, brand: "NEW BALANCE", name: "530 스니커즈", category: "신발", gender: "공용", icon: "👟", prices: [{ store: "무신사", price: 99000 }, { store: "KREAM", price: 89000 }, { store: "애슬러", price: 95000 }], affiliateUrl: "" },
  { id: 5, brand: "MUSINSA STANDARD", name: "와이드 데님 팬츠", category: "하의", gender: "남성", icon: "👖", prices: [{ store: "무신사", price: 39900 }, { store: "4910", price: 42900 }], affiliateUrl: "" },
  { id: 6, brand: "ADIDAS", name: "파이어버드 트랙탑", category: "아우터", gender: "여성", icon: "🧥", prices: [{ store: "무신사", price: 99000 }, { store: "4910", price: 92000 }, { store: "KREAM", price: 89000 }], affiliateUrl: "" },
  { id: 7, brand: "ASICS", name: "젤-1130", category: "신발", gender: "공용", icon: "👟", prices: [{ store: "무신사", price: 119000 }, { store: "KREAM", price: 114000 }, { store: "4910", price: 122000 }], affiliateUrl: "" },
  { id: 8, brand: "NEW BALANCE", name: "574 클래식", category: "신발", gender: "공용", icon: "👟", prices: [{ store: "무신사", price: 109000 }, { store: "4910", price: 105000 }], affiliateUrl: "" },
  { id: 9, brand: "NIKE", name: "클럽 플리스 후드", category: "상의", gender: "남성", icon: "🧥", prices: [{ store: "무신사", price: 79000 }, { store: "4910", price: 72000 }, { store: "애슬러", price: 75000 }], affiliateUrl: "" },
  { id: 10, brand: "MUSINSA STANDARD", name: "우먼즈 와이드 데님", category: "하의", gender: "여성", icon: "👖", prices: [{ store: "무신사", price: 39900 }, { store: "4910", price: 42900 }, { store: "애슬러", price: 45000 }], affiliateUrl: "" },
  { id: 11, brand: "ADIDAS", name: "파이어버드 팬츠", category: "하의", gender: "공용", icon: "👖", prices: [{ store: "무신사", price: 69000 }, { store: "4910", price: 65000 }], affiliateUrl: "" },
  { id: 12, brand: "ASICS", name: "젤-카야노 14", category: "신발", gender: "공용", icon: "👟", prices: [{ store: "무신사", price: 179000 }, { store: "KREAM", price: 169000 }], affiliateUrl: "" }
];

const won = (n) => `${n.toLocaleString("ko-KR")}원`;
const categories = ["전체", "상의", "하의", "신발", "아우터", "가방", "액세서리"];
const genders = ["전체", "남성", "여성", "공용"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState("전체");
  const [category, setCategory] = useState("전체");
  const [brand, setBrand] = useState("전체");
  const [sort, setSort] = useState("low");
  const [selected, setSelected] = useState(null);

  const brands = useMemo(() => ["전체", ...new Set(products.map(p => p.brand))], []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter(p =>
      (gender === "전체" || p.gender === gender || p.gender === "공용") &&
      (category === "전체" || p.category === category) &&
      (brand === "전체" || p.brand === brand) &&
      (!q || `${p.brand} ${p.name} ${p.category} ${p.gender}`.toLowerCase().includes(q))
    );
    return [...list].sort((a, b) => {
      const pa = Math.min(...a.prices.map(x => x.price));
      const pb = Math.min(...b.prices.map(x => x.price));
      if (sort === "high") return pb - pa;
      if (sort === "name") return a.name.localeCompare(b.name, "ko");
      return pa - pb;
    });
  }, [query, gender, category, brand, sort]);

  const clearFilters = () => { setQuery(""); setGender("전체"); setCategory("전체"); setBrand("전체"); setSort("low"); };

  return (
    <>
      <header className="topbar">
        <a className="logo" href="#" aria-label="Clothes-Up 홈">CLOTHES<span>-UP</span></a>
        <span className="topnote">FIND IT. COMPARE IT. WEAR IT.</span>
      </header>
      <main className="shell">
        <section className="hero">
          <div className="eyebrow">YOUR FASHION PRICE GUIDE</div>
          <h1>원하는 패션,<br/><em>가격까지 한눈에.</em></h1>
          <p>여러 패션 플랫폼의 상품을 한곳에서 찾고, 판매처별 가격을 비교해 보세요.</p>
          <div className="search">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && e.currentTarget.blur()} placeholder="브랜드 또는 상품명을 검색해 보세요" aria-label="상품 검색"/>
            {query && <button className="clear" onClick={() => setQuery("")}>지우기</button>}
          </div>
          <div className="hero-meta"><span>통합 검색</span><span>카테고리 검색</span><span>최저가 정렬</span></div>
        </section>

        <div className="ad-placeholder"><span>AD</span><div><b>광고 영역</b><small>광고 파트너 승인 후 광고가 표시됩니다.</small></div></div>

        <section className="browse">
          <div className="section-title"><div><p className="eyebrow dark">DISCOVER YOUR STYLE</p><h2>상품 둘러보기</h2></div><span className="result-count">{filtered.length}개 상품</span></div>
          <div className="gender-tabs" role="group" aria-label="성별 필터">
            {genders.map(g => <button key={g} className={gender === g ? "active" : ""} onClick={() => setGender(g)}>{g}</button>)}
          </div>
          <div className="filters">
            <label>카테고리<select value={category} onChange={e => setCategory(e.target.value)}>{categories.map(c => <option key={c}>{c}</option>)}</select></label>
            <label>브랜드<select value={brand} onChange={e => setBrand(e.target.value)}>{brands.map(b => <option key={b}>{b}</option>)}</select></label>
            <label>정렬<select value={sort} onChange={e => setSort(e.target.value)}><option value="low">최저가순</option><option value="high">최고가순</option><option value="name">상품명순</option></select></label>
            <button className="reset" onClick={clearFilters}>필터 초기화 ↺</button>
          </div>

          <div className="product-grid">
            {filtered.map((p, i) => {
              const best = Math.min(...p.prices.map(x => x.price));
              return <article className="product-card" key={p.id}>
                <button className="product-open" onClick={() => setSelected(p)} aria-label={`${p.name} 가격 비교 보기`}>
                  <div className={`product-art art-${(i % 4) + 1}`}><span>{p.icon}</span><small>{p.brand}</small></div>
                  <div className="product-info"><div className="brand">{p.brand}</div><h3>{p.name}</h3><div className="best-price">{won(best)}<small>~</small></div><p className="store-count">{p.prices.length}개 판매처 가격 비교 · 데모</p><div className="tags"><span>{p.gender}</span><span>{p.category}</span></div></div>
                </button>
                <button className="compare-btn" onClick={() => setSelected(p)}>판매처 가격 비교 <span>↗</span></button>
              </article>;
            })}
            {filtered.length === 0 && <div className="empty">검색 결과가 없습니다. 검색어나 필터를 바꿔 보세요.</div>}
          </div>
        </section>

        <div className="ad-placeholder lower"><span>AD</span><div><b>광고 영역</b><small>실제 광고 스크립트는 승인 후 연결합니다.</small></div></div>

        <section className="notice">
          <b>현재 버전 안내</b>
          <p>현재 상품명과 가격은 화면 기능을 확인하기 위한 샘플 데이터입니다. 실제 판매처의 실시간 가격·재고·상품 이미지가 아닙니다. 정식 운영 전 판매처의 공식 API 또는 허가된 제휴 상품 피드를 연결해야 합니다.</p>
        </section>
      </main>
      <footer><b>CLOTHES-UP</b><span>YOUR STYLE, YOUR CHOICE.</span><p>상품 구매 및 결제는 각 판매처에서 진행됩니다.</p><small>제휴 링크가 적용되면 해당 링크를 통한 구매에서 수수료를 받을 수 있습니다.</small></footer>

      {selected && <div className="modal-backdrop" role="presentation" onMouseDown={e => e.target === e.currentTarget && setSelected(null)}>
        <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <button className="modal-close" onClick={() => setSelected(null)} aria-label="닫기">×</button>
          <p className="eyebrow dark">PRICE COMPARISON · DEMO</p>
          <h2 id="modal-title">{selected.brand}</h2><h3>{selected.name}</h3>
          <p className="modal-caption">판매처별 샘플 가격 · 실제 구매 전 판매처에서 가격과 옵션을 확인하세요.</p>
          {[...selected.prices].sort((a,b) => a.price-b.price).map((s, i) => <div className="seller-row" key={s.store}><span>{s.store}{i === 0 && <b className="lowest">최저가 예시</b>}</span><strong>{won(s.price)}</strong></div>)}
          <div className="affiliate-note">제휴 링크는 공식 제휴 승인 및 추적 URL 발급 후 연결됩니다.</div>
          <button className="modal-done" onClick={() => setSelected(null)}>확인</button>
        </section>
      </div>}
    </>
  );
}
