import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6';
import Providers from './components/layout/Providers';
import { useEffect } from 'react';
import { ActiveRouteProvider } from './components/context/ActiveRouteContext/ActiveRouteContext';
import { forceChakraDarkTheme } from './utils/utils';

import SidebarLayout from './components/layout/SidebarLayout';
import LandingIntro from './pages/LandingIntro';
import LibraryHome from './pages/LibraryHome';
import CategoryPage from './pages/CategoryPage';
import ShowcasePage from './pages/ShowcasePage';
import FavoritesPage from './pages/FavoritesPage';
import ProPage from './pages/ProPage';
import ProSectionPage from './pages/ProSectionPage';

function AppContent() {
  return (
    <>
      <Providers>
        <Routes>
          <Route exact path="/" element={<LandingIntro />} />
          <Route
            exact
            path="/library"
            element={
              <SidebarLayout>
                <LibraryHome />
              </SidebarLayout>
            }
          />
          <Route exact path="/showcase" element={<ShowcasePage />} />
          <Route exact path="/pro" element={<ProPage />} />
          <Route
            path="/pro/:section"
            element={
              <SidebarLayout hideProCard>
                <ProSectionPage />
              </SidebarLayout>
            }
          />
          <Route
            path="/:category/:subcategory"
            element={
              <SidebarLayout>
                <CategoryPage />
              </SidebarLayout>
            }
          />

          <Route
            path="/favorites"
            element={
              <SidebarLayout>
                <FavoritesPage />
              </SidebarLayout>
            }
          />
        </Routes>
      </Providers>
    </>
  );
}

export default function App() {
  useEffect(() => {
    forceChakraDarkTheme();
  }, []);

  return (
    <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <NuqsAdapter>
        <ActiveRouteProvider>
          <AppContent />
        </ActiveRouteProvider>
      </NuqsAdapter>
    </Router>
  );
}
