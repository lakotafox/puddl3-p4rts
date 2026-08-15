import Navbar from '../landingnew/Navbar/Navbar';
import Sidebar from '../../components/navs/Sidebar';

// The upstream right rail (ProCard + SponsorsCard) is removed for foxbits.
// Dropping the <aside> alone is not enough — .category-wrapper reserves
// --right-panel-width via padding-right, so that variable is zeroed in
// gallery/src/demo.css or the preview stays pushed to the left.
export default function SidebarLayout({ children }) {
  return (
    <main className="app-container">
      <Navbar showDocs />
      <section className="category-wrapper">
        <Sidebar />
        {children}
      </section>
    </main>
  );
}
