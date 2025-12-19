import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Index } from './page/Index';
import { CreatePost } from './page/CreatePost';
import { EditPost } from './page/EditPost';
import { Post } from './page/Post';
import { PATHS } from './shared/config/paths';

/**
 * Main Application Shell.
 * Implements strict routing structure using React Router v7.
 */
const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.INDEX} element={<Index />} />
        <Route path={PATHS.CREATE} element={<CreatePost />} />
        <Route path={PATHS.EDIT} element={<EditPost />} />
        <Route path={PATHS.POST} element={<Post />} />
        
        {/* Fallback for undefined sectors */}
        <Route path="*" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
